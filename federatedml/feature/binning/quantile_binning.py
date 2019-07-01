#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#  Copyright 2019 The FATE Authors. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

import functools

from federatedml.feature.binning.base_binning import Binning
from federatedml.feature.quantile_summaries import QuantileSummaries, SparseQuantileSummaries
from federatedml.statistic import data_overview


class QuantileBinning(Binning):
    """
    After quantile binning, the numbers of elements in each binning are equal.

    The result of this algorithm has the following deterministic bound:
    If the data_instances has N elements and if we request the quantile at probability `p` up to error
    `err`, then the algorithm will return a sample `x` from the data so that the *exact* rank
    of `x` is close to (p * N).
    More precisely,

    {{{
      floor((p - 2 * err) * N) <= rank(x) <= ceil((p + 2 * err) * N)
    }}}

    This method implements a variation of the Greenwald-Khanna algorithm (with some speed
    optimizations).
    """

    def __init__(self, params, party_name='Base', abnormal_list=None):
        super(QuantileBinning, self).__init__(params, party_name, abnormal_list)
        self.summary_dict = None

    def fit_split_points(self, data_instances):
        """
        Apply the binning method

        Parameters
        ----------
        data_instances : DTable
            The input data

        Returns
        -------
        split_points : dict.
            Each value represent for the split points for a feature. The element in each row represent for
            the corresponding split point.
            e.g.
            split_points = {'x1': [0.1, 0.2, 0.3, 0.4 ...],    # The first feature
                            'x2': [1, 2, 3, 4, ...],           # The second feature
                            ...]                         # Other features

        """
        self._init_cols(data_instances)
        percent_value = 1.0 / self.bin_num

        # calculate the split points
        percentile_rate = [i * percent_value for i in range(1, self.bin_num)]
        is_sparse = data_overview.is_sparse_data(data_instances)

        if self.summary_dict is None:
            f = functools.partial(self.approxiQuantile,
                                  params=self.params,
                                  abnormal_list=self.abnormal_list,
                                  cols_dict=self.cols_dict,
                                  header=self.header,
                                  is_sparse=is_sparse)
            summary_dict = data_instances.mapPartitions(f)
            summary_dict = summary_dict.reduce(self.merge_summary_dict)
            if is_sparse:
                total_count = data_instances.count()
                for _, summary_obj in summary_dict.items():
                    summary_obj.set_total_count(total_count)

            self.summary_dict = summary_dict
        else:
            summary_dict = self.summary_dict
        split_points = {}
        for col_name, summary in summary_dict.items():
            split_point = []
            for percen_rate in percentile_rate:
                s_p = summary.query(percen_rate)
                if s_p not in split_point:
                    split_point.append(s_p)
            split_points[col_name] = split_point
        self._show_split_points(split_points)
        self.split_points = split_points
        return split_points

    @staticmethod
    def approxiQuantile(data_instances, params, cols_dict, abnormal_list, header, is_sparse):
        """
        Calculates each quantile information

        Parameters
        ----------
        data_instances : DTable
            The input data

        cols_dict: dict
            Record key, value pairs where key is cols' name, and value is cols' index.

        params : FeatureBinningParam object,
                Parameters that user set.

        abnormal_list: list, default: None
            Specify which columns are abnormal so that will not static when traveling.

        header: list,
            Storing the header information.

        is_sparse: bool
            Specify whether data_instance is in sparse type

        Returns
        -------
        summary_dict: dict
            {'col_name1': summary1,
             'col_name2': summary2,
             ...
             }

        """

        summary_dict = {}
        if not is_sparse:
            # feature_nums = len(one_piece.features)
            for col_name, col_index in cols_dict.items():
                quantile_summaries = QuantileSummaries(compress_thres=params.compress_thres,
                                                       head_size=params.head_size,
                                                       error=params.error,
                                                       abnormal_list=abnormal_list)
                summary_dict[col_name] = quantile_summaries
        else:

            for col_name, col_index in cols_dict.items():
                quantile_summaries = SparseQuantileSummaries(compress_thres=params.compress_thres,
                                                             head_size=params.head_size,
                                                             error=params.error,
                                                             abnormal_list=abnormal_list)
                # quantile_summaries.set_zeros_num(total_len)
                summary_dict[col_name] = quantile_summaries

        QuantileBinning.insert_datas(data_instances, summary_dict, cols_dict, header, is_sparse)
        return summary_dict

    @staticmethod
    def insert_datas(data_instances, summary_dict, cols_dict, header, is_sparse):

        for iter_key, instant in data_instances:
            if not is_sparse:
                if type(instant).__name__ == 'Instance':
                    features = instant.features
                else:
                    features = instant
                for col_name, summary in summary_dict.items():
                    col_index = cols_dict[col_name]
                    summary.insert(features[col_index])
            else:
                data_generator = instant.features.get_all_data()
                for col_idx, col_value in data_generator:
                    col_name = header[col_idx]
                    summary = summary_dict[col_name]
                    summary.insert(col_value)

    @staticmethod
    def merge_summary_dict(s_dict1, s_dict2):
        if s_dict1 is None and s_dict2 is None:
            return None
        if s_dict1 is None:
            return s_dict2
        if s_dict2 is None:
            return s_dict1

        new_dict = {}
        for col_name, summary1 in s_dict1.items():
            summary2 = s_dict2.get(col_name)
            summary1.merge(summary2)
            new_dict[col_name] = summary1
        return new_dict

    def query_quantile_point(self, data_instances, cols, query_points):
        self.cols = cols
        self._init_cols(data_instances)

        is_sparse = data_overview.is_sparse_data(data_instances)
        if self.summary_dict is None:
            f = functools.partial(self.approxiQuantile,
                                  cols_dict=self.cols_dict,
                                  params=self.params,
                                  header=self.header,
                                  abnormal_list=self.abnormal_list,
                                  is_sparse=is_sparse)
            summary_dict = data_instances.mapPartitions(f)
            summary_dict = summary_dict.reduce(self.merge_summary_dict)
            self.summary_dict = summary_dict
        else:
            summary_dict = self.summary_dict

        if isinstance(query_points, (int, float)):
            query_dict = {}
            for col_name in cols:
                query_dict[col_name] = query_points
        elif isinstance(query_points, dict):
            query_dict = query_points
        else:
            raise ValueError("query_points has wrong type, should be a float, int or dict")

        result = {}
        for col_name, query_point in query_dict.items():
            summary = summary_dict[col_name]
            result[col_name] = summary.query(query_point)
        return result
