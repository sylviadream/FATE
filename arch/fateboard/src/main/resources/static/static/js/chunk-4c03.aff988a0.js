(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4c03"],{"7Qib":function(t,a,n){"use strict";n.d(a,"e",function(){return c}),n.d(a,"b",function(){return d}),n.d(a,"c",function(){return p}),n.d(a,"d",function(){return b}),n.d(a,"a",function(){return h});n("jWXv"),n("rfXi"),n("gDS+");var e=n("P2sY"),o=n.n(e),s=n("GQeE"),i=n.n(s),r=n("EJiy"),l=n.n(r);function c(t,a){if(0===arguments.length)return null;var n=a||"{y}-{m}-{d} {h}:{i}:{s}",e=void 0;"object"===(void 0===t?"undefined":l()(t))?e=t:("string"==typeof t&&/^[0-9]+$/.test(t)&&(t=parseInt(t)),"number"==typeof t&&10===t.toString().length&&(t*=1e3),e=new Date(t));var o={y:e.getFullYear(),m:e.getMonth()+1,d:e.getDate(),h:e.getHours(),i:e.getMinutes(),s:e.getSeconds(),a:e.getDay()};return n.replace(/{(y|m|d|h|i|s|a)+}/g,function(t,a){var n=o[a];return"a"===a?["日","一","二","三","四","五","六"][n]:(t.length>0&&n<10&&(n="0"+n),n||0)})}function d(t){var a=Math.floor(t/3600),n=Math.floor(t/60%60),e=Math.floor(t%60),o=function(t){return t<1?"00":t<10?"0"+t:t.toString()};return(a=o(a))+":"+(n=o(n))+":"+(e=o(e))}function p(t,a,n){var e=this,o=(arguments.length>3&&void 0!==arguments[3]&&arguments[3],window.location.origin.replace(/http|https/g,"ws")),s=new WebSocket(o+t);return s.onopen=a,s.onmessage=n,s.onerror=function(){e.initWebSocket(t,s)},s.onclose=function(){},s}function b(t,a){var n=[{prop:"name",label:a}],e=!0,s=[];for(var r in t){var l=t[r];if(e)i()(l).forEach(function(t){n.push({prop:t,label:t})}),e=!1;var c=o()({name:r},l);s.push(c)}return{header:n,data:s}}function h(t){if(!t&&"object"!==(void 0===t?"undefined":l()(t)))throw new Error("error arguments","deepClone");var a=t.constructor===Array?[]:{};return i()(t).forEach(function(n){t[n]&&"object"===l()(t[n])?a[n]=h(t[n]):a[n]=t[n]}),a}},"7z+L":function(t,a,n){var e=n("gYtT");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);(0,n("SZ7m").default)("12b0fd0e",e,!0,{})},"9g82":function(t,a,n){"use strict";n.r(a);var e=n("m1cH"),o=n.n(e),s=n("GQeE"),i=n.n(s),r=n("Yulh"),l={tooltip:{formatter:"{a} <br/>{b} : {c}%"},series:[{title:{show:!1},name:"业务指标",type:"gauge",detail:{show:!0,formatter:"{value}%",offsetCenter:[0,"30%"],fontWeight:"lighter",fontSize:13},axisLine:{lineStyle:{color:[[.3,"#67e0e3"],[.7,"#37a2da"],[1,"#0abd00"]],width:20}},pointer:{show:!0},data:[{value:0,name:"完成率"}]}]},c=n("lAiS"),d=n("bZCS"),p=n("7Qib"),b=n("dv4G"),h={components:{EchartContainer:r.a},data:function(){return{jobOptions:l,graphOptions:c.a,dataset:{dataset:"",target:"",columns:"",row:"",partner:"",pnr_dataset:""},jobStatus:"waiting...",datasetLoading:!0,logLoading:!1,jobTimer:null,logWebsocket:null,jobWebsocket:null,logsMap:{all:{list:[],length:0},error:{list:[],length:0},warning:{list:[],length:0},info:{list:[],length:0},debug:{list:[],length:0}},jobId:this.$route.query.jobId,DAGData:null,gaugeInstance:null,elapsed:"",currentLogTab:"all"}},mounted:function(){var t=this;Object(b.e)(this.jobId).then(function(a){t.datasetLoading=!1,t.dataset=a.data.dataset}),Object(b.d)(this.jobId).then(function(a){t.DAGData=a.data}),i()(this.logsMap).forEach(function(a){var n="all"===a?"default":a;t.logWebsocket=Object(p.c)("/log/"+t.jobId+"/default/"+n,function(t){},function(n){var e=JSON.parse(n.data);t.logsMap[a].list.push(e),"all"!==a&&(t.logsMap[a].length=e.lineNum)})}),this.jobWebsocket=Object(p.c)("/websocket/progress/"+this.jobId,function(t){},function(a){if("faied"!==t.jobStatus&&"complete"!==t.jobStatus){var n=JSON.parse(a.data),e=n.process,o=n.status,s=n.time;"running"===o&&(t.elapsed=Object(p.b)(s),t.jobStatus="running...",t.jobOptions.series[0].pointer.show=!0,t.jobOptions.series[0].detail.show=!0,t.jobOptions.series[0].data[0].value=e,t.gaugeInstance.setOption(t.jobOptions,!0))}})},beforeDestroy:function(){clearInterval(this.jobTimer),this.closeWebsocket()},methods:{getJobEchartInstance:function(t){this.gaugeInstance=t},closeWebsocket:function(){console.log("close Websocket"),this.logWebsocket.close(),this.jobWebsocket.close()},killJob:function(){var t=this;console.log(this.jobWebsocket),this.$confirm("You can't undo this action","Are you sure you want to kill this job?",{confirmButtonText:"Sure",cancelButtonText:"Cancel",type:"warning"}).then(function(){t.jobStatus="faied"}).catch(function(){console.log("cancel kill")})},completeJob:function(){this.jobStatus="complete"},getGraphEchartInstance:function(t){var a=this,n=null;n=window.setInterval(function(){if(a.DAGData){window.clearInterval(n);var e=Object(d.a)(a.DAGData),o=e.dataList,s=e.linksList;a.graphOptions.series[0].data=o,a.graphOptions.series[0].links=s,t.setOption(a.graphOptions,!0),t.on("click",{dataType:"node"},function(t){console.log(t)})}},100)},toDetails:function(t){this.$router.push({path:"/details",query:{jobId:t,from:"Dashboard"}})},switchLogTab:function(t){this.currentLogTab=t},logOnMousewheel:function(t){var a=this,n=this.logsMap[this.currentLogTab].list[0];if(n){var e=n.lineNum-1;if(e>0&&0===t.target.parentNode.parentNode.scrollTop&&(t.wheelDelta>0||t.detail>0)){var s=e-10>1?e-10:1;if(!this.logLoading){this.logLoading=!0;window.setTimeout(function(){Object(b.g)({componentId:"default",jobId:a.jobId,begin:s,end:e}).then(function(t){var n=[];t.data.map(function(t){t&&n.push(t)}),a.logsMap[a.currentLogTab].list=[].concat(n,o()(a.logsMap[a.currentLogTab].list)),a.logLoading=!1}).catch(function(){a.logLoading=!1})},1e3)}}}}}},u=(n("lJfc"),n("KHd+")),f=Object(u.a)(h,function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"dashboard-container bg-dark app-container"},[n("h3",{staticClass:"app-title flex space-between"},[n("span",[t._v("Dashboard")]),t._v(" "),n("p",[t._v("Job: "),n("span",{staticClass:"text-primary pointer",on:{click:function(a){t.toDetails(t.jobId)}}},[t._v(t._s(t.jobId))])])]),t._v(" "),n("el-row",{staticClass:"dash-board-list",attrs:{gutter:24}},[n("el-col",{attrs:{span:8}},[n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.datasetLoading,expression:"datasetLoading"}],staticClass:"col dataset-info shadow"},[n("h3",{staticClass:"list-title"},[t._v("DATASET INFO")]),t._v(" "),n("el-row",{staticClass:"dataset-row",attrs:{gutter:4}},[n("el-col",{staticClass:"dataset-title",attrs:{span:6,offset:2}},[t._v("GUEST")]),t._v(" "),n("el-col",{attrs:{span:8}},[n("div",{staticClass:"dataset-item"},[n("p",{staticClass:"name"},[t._v("dataset")]),t._v(" "),n("p",{staticClass:"value"},[t._v(t._s(t.dataset.dataset))])]),t._v(" "),n("div",{staticClass:"dataset-item"},[n("p",{staticClass:"name"},[t._v("columns")]),t._v(" "),n("p",{staticClass:"value"},[t._v(t._s(t.dataset.columns))])])]),t._v(" "),n("el-col",{attrs:{span:8}},[n("div",{staticClass:"dataset-item"},[n("p",{staticClass:"name"},[t._v("target")]),t._v(" "),n("p",{staticClass:"value"},[t._v(t._s(t.dataset.target))])]),t._v(" "),n("div",{staticClass:"dataset-item"},[n("p",{staticClass:"name"},[t._v("rows")]),t._v(" "),n("p",{staticClass:"value"},[t._v(t._s(t.dataset.row))])])])],1),t._v(" "),n("el-row",{staticClass:"dataset-row",attrs:{gutter:4}},[n("el-col",{staticClass:"dataset-title",attrs:{span:6,offset:2}},[t._v("HOST")]),t._v(" "),n("el-col",{attrs:{span:8}},[n("div",{staticClass:"dataset-item"},[n("p",{staticClass:"name"},[t._v("partner")]),t._v(" "),n("p",{staticClass:"value"},[t._v(t._s(t.dataset.partner))])])]),t._v(" "),n("el-col",{attrs:{span:8}},[n("div",{staticClass:"dataset-item"},[n("p",{staticClass:"name"},[t._v("pnr-dataset")]),t._v(" "),n("p",{staticClass:"value"},[t._v(t._s(t.dataset.pnr_dataset))])])])],1)],1)]),t._v(" "),n("el-col",{attrs:{span:8}},[n("div",{staticClass:"col job flex-center justify-center shadow"},[n("h3",{staticClass:"list-title"},[t._v("JOB")]),t._v(" "),"faied"===t.jobStatus||"complete"===t.jobStatus?n("div",{staticClass:"job-end-container flex flex-col flex-center"},["faied"===t.jobStatus?n("i",{staticClass:"el-icon-circle-close job-icon icon-error",staticStyle:{color:"#ff6464"}}):n("i",{staticClass:"el-icon-circle-check job-icon icon-error",staticStyle:{color:"#24b68b"}}),t._v(" "),n("ul",{staticClass:"job-info flex space-around flex-wrap w-100"},[n("li",[n("p",{staticClass:"name"},[t._v("status")]),t._v(" "),n("p",{staticClass:"value"},[t._v(t._s(t.jobStatus))])]),t._v(" "),n("li",[n("p",{staticClass:"name"},[t._v("duration")]),t._v(" "),n("p",{staticClass:"value"},[t._v("00:30:35")])])]),t._v(" "),n("el-button",{attrs:{type:"primary",round:""},on:{click:function(a){t.toDetails(t.jobId)}}},[t._v("VIEW THIS JOB")])],1):n("div",{staticClass:"echarts-container"},[t.elapsed?n("div",{staticClass:"elapsed"},[n("p",{staticClass:"elapsed-title"},[t._v("elapsed")]),t._v(" "),n("p",{staticClass:"elapsed-time text-primary"},[t._v(t._s(t.elapsed))])]):t._e(),t._v(" "),n("echart-container",{class:"echarts",attrs:{options:t.jobOptions},on:{getEchartInstance:t.getJobEchartInstance}}),t._v(" "),n("div",{staticClass:"bottom-wrapper w-100 flex flex-col flex-center"},[n("span",{staticClass:"status"},[t._v(t._s(t.jobStatus))]),t._v(" "),n("div",{staticClass:"flex space-around",staticStyle:{width:"100%"}},[n("el-button",{staticClass:"btn text-primary",attrs:{round:""},on:{click:t.killJob}},[t._v("KILL")])],1)])],1)])]),t._v(" "),n("el-col",{attrs:{span:8}},[n("div",{directives:[{name:"loading",rawName:"v-loading",value:!t.DAGData,expression:"!DAGData"}],staticClass:"col graph flex-center justify-center shadow"},[n("h3",{staticClass:"list-title"},[t._v("GRAPH")]),t._v(" "),t.DAGData?n("div",{staticClass:"wrapper w-100",style:{"min-height":60*t.DAGData.componentList.length+"px"}},[n("echart-container",{class:"echarts",attrs:{options:t.graphOptions},on:{getEchartInstance:t.getGraphEchartInstance}})],1):t._e()])])],1),t._v(" "),n("div",{staticClass:"log-wrapper shadow"},[n("h3",{staticClass:"title"},[t._v("LOG")]),t._v(" "),n("ul",{staticClass:"tab-bar flex"},t._l(Object.keys(t.logsMap),function(a,e){return n("li",{key:e,staticClass:"tab-btn",class:{"tab-btn-active":t.currentLogTab===a},on:{click:function(n){t.switchLogTab(a)}}},[n("span",{staticClass:"text"},[t._v(t._s(a))]),t._v(" "),"all"!==a?n("span",{staticClass:"count",class:[a]},[t._v(t._s(t.logsMap[a].length))]):t._e()])})),t._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.logLoading,expression:"logLoading"}],staticClass:"log-container",on:{mousewheel:t.logOnMousewheel}},[n("ul",{staticClass:"log-list overflow-hidden"},t._l(t.logsMap[t.currentLogTab].list,function(a,e){return n("li",{key:e},[n("div",{staticClass:"flex"},[n("span",{staticStyle:{color:"#999","margin-right":"5px"}},[t._v(t._s(a.lineNum))]),t._v(" "),n("span",[t._v(" "+t._s(a.content))])])])}))])])],1)},[],!1,null,null,null);f.options.__file="index.vue";a.default=f.exports},TJnn:function(t,a,n){"use strict";var e=n("7z+L");n.n(e).a},Yulh:function(t,a,n){"use strict";var e=n("MT78"),o=n.n(e),s={props:{className:{type:String,default:""},id:{type:String,default:""},options:{type:Object,default:function(){return{}}}},data:function(){return{echarts:o.a,echartInstance:null}},mounted:function(){this.initChart()},beforeDestroy:function(){this.echartInstance&&(this.echartInstance.dispose(),this.echartInstance=null,window.removeEventListener("resize",this.resize))},methods:{initChart:function(){this.echartInstance=this.echarts.init(this.$refs.myEchart),window.addEventListener("resize",this.resize),this.$emit("getEchartInstance",this.echartInstance),this.$emit("getEchart",this.echarts),this.echartInstance.setOption(this.options)},resize:function(){this.echartInstance.resize()}}},i=(n("TJnn"),n("KHd+")),r=Object(i.a)(s,function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"myEchart",class:this.className,attrs:{id:this.id}})},[],!1,null,null,null);r.options.__file="index.vue";a.a=r.exports},bZCS:function(t,a,n){"use strict";a.a=function(t){var a=t.dependencies,n=t.componentList,e=0,o=0,s=[],i=[],r=[],l=[];n.forEach(function(t){l.push(t.componentName)});for(var c=function(t){var c=a[n[t].componentName],d="#333";if("faied"===n[t].status?d="#ff6464":"running"===n[t].status?d="#494ece":"success"===n[t].status&&(d="#24b68b"),c){for(var p=0;p<c.length;p++)r.push({target:t,source:l.indexOf(c[p])});var b=null;i.forEach(function(t){for(var a=0;a<c.length;a++)t.name===c[a]&&(b?t.level<b.level&&(b=t):b=t)}),b&&e<=b.level?(++e,s.push(o),o=1):++o,t===n.length-1&&s.push(o)}else++o;i.push({name:n[t].componentName,level:e,index:o,label:{color:d,borderColor:d}})},d=0;d<n.length;d++)c(d);var p=Math.max.apply(Math,s),b=10*(p-1),h=0;return i.map(function(t,a){var n=s[t.level],e=0;e=n===p?10*(t.index-1)*7:b/(n+1)*t.index*7,t.x=e;for(var o=a;o>=0;o--)if(i[o].level===t.level){++h;break}t.y=10*(t.level+h)}),{dataList:i,linksList:r}}},dv4G:function(t,a,n){"use strict";n.d(a,"a",function(){return o}),n.d(a,"b",function(){return s}),n.d(a,"f",function(){return i}),n.d(a,"e",function(){return r}),n.d(a,"d",function(){return l}),n.d(a,"c",function(){return c}),n.d(a,"g",function(){return d});var e=n("t3Un");function o(t){return Object(e.a)({url:"/job/query/all",method:"get",params:t})}function s(t){return Object(e.a)({url:"/job/query/status",method:"get",params:t})}function i(t){return Object(e.a)({url:"/job/v1/pipeline/job/stop",method:"post",data:{job_id:t}})}function r(t){return Object(e.a)({url:"/job/query/"+t,method:"get"})}function l(t){return Object(e.a)({url:"/v1/pipeline/dag/dependencies",method:"post",data:{job_id:t}})}function c(t){return Object(e.a)({url:"/v1/tracking/component/parameters",method:"post",data:t})}function d(t){var a=t.componentId,n=t.jobId,o=t.begin,s=t.end,i=t.type,r=void 0===i?"default":i;return Object(e.a)({url:"/queryLogWithSize/"+a+"/"+n+"/"+r+"/"+o+"/"+s+"  ",method:"get"})}},gYtT:function(t,a,n){(t.exports=n("I1BE")(!1)).push([t.i,"\n.default-echart {\n  width: 75vw;\n  height: 75vh;\n}\n",""])},lAiS:function(t,a,n){"use strict";a.a={tooltip:{},series:[{type:"graph",layout:"none",roam:!1,label:{show:!0,color:"#333",borderWidth:1,borderRadius:2,borderColor:"#333",padding:5,lineHeight:20},symbol:"roundRect",symbolSize:[60,20],symbolOffset:[0,0],edgeSymbol:["circle","arrow"],edgeSymbolSize:[6,10],data:[],links:[],itemStyle:{color:"transparent"},lineStyle:{normal:{opacity:.9,width:1,curveness:0}}}]}},lJfc:function(t,a,n){"use strict";var e=n("p9cb");n.n(e).a},p9cb:function(t,a,n){var e=n("xWUn");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);(0,n("SZ7m").default)("01df6e23",e,!0,{})},xWUn:function(t,a,n){(t.exports=n("I1BE")(!1)).push([t.i,'@charset "UTF-8";\n.dashboard-container {\n  height: 100%;\n}\n.dashboard-container .dash-board-list {\n    /*仪表盘job进度图*/\n}\n.dashboard-container .dash-board-list .col {\n      height: 330px;\n      background: #fff;\n}\n.dashboard-container .dash-board-list .col .list-title {\n        height: 40px;\n        padding-top: 20px;\n        font-size: 18px;\n        color: #534c77;\n        text-indent: 24px;\n}\n.dashboard-container .dash-board-list .col .echarts-container {\n        width: 100%;\n        height: 100%;\n        position: relative;\n}\n.dashboard-container .dash-board-list .dataset-info {\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n}\n.dashboard-container .dash-board-list .dataset-info .dataset-row {\n        margin-top: 30px;\n}\n.dashboard-container .dash-board-list .dataset-info .dataset-row:first-of-type {\n          margin-top: 32px;\n}\n.dashboard-container .dash-board-list .dataset-info .dataset-row .dataset-title {\n          font-size: 16px;\n          font-weight: bold;\n          color: #7f7d8e;\n}\n.dashboard-container .dash-board-list .dataset-info .dataset-row .dataset-item {\n          margin-bottom: 20px;\n}\n.dashboard-container .dash-board-list .dataset-info .dataset-row .dataset-item .name {\n            margin-bottom: 6px;\n            color: #bbbbc8;\n}\n.dashboard-container .dash-board-list .dataset-info .dataset-row .dataset-item .value {\n            color: #7f7d8e;\n            font-weight: bold;\n            overflow: hidden;\n            white-space: nowrap;\n            text-overflow: ellipsis;\n}\n.dashboard-container .dash-board-list .job .echarts {\n      width: 100%;\n      height: 290px;\n      /*top: 5%;*/\n}\n.dashboard-container .dash-board-list .job .elapsed {\n      position: absolute;\n      top: 0;\n      right: 16px;\n}\n.dashboard-container .dash-board-list .job .elapsed .elapsed-title {\n        margin-right: 14px;\n        margin-bottom: 6px;\n        color: #bbbbc8;\n        text-align: right;\n}\n.dashboard-container .dash-board-list .job .elapsed .elapsed-time {\n        height: 28px;\n        width: 88px;\n        background: #f8f8fa;\n        text-align: center;\n        line-height: 28px;\n        border-radius: 28px;\n        font-size: 16px;\n}\n.dashboard-container .dash-board-list .job .job-end-container {\n      height: 290px;\n}\n.dashboard-container .dash-board-list .job .job-end-container .job-icon {\n        margin-top: 35px;\n        margin-bottom: 36px;\n        font-size: 50px;\n}\n.dashboard-container .dash-board-list .job .job-end-container .job-info > li {\n        width: 28%;\n        padding: 0 5%;\n        margin-bottom: 20px;\n}\n.dashboard-container .dash-board-list .job .job-end-container .job-info > li .name {\n          font-size: 12px;\n          color: #999;\n}\n.dashboard-container .dash-board-list .job .bottom-wrapper {\n      position: absolute;\n      bottom: 85px;\n      left: 0;\n}\n.dashboard-container .dash-board-list .job .bottom-wrapper .status {\n        margin-bottom: 5px;\n        font-size: 14px;\n}\n.dashboard-container .dash-board-list .job .bottom-wrapper .btn {\n        padding: 5px 25px;\n}\n.dashboard-container .graph {\n    overflow: auto;\n}\n.dashboard-container .graph .wrapper {\n      height: 290px;\n}\n.dashboard-container .graph .wrapper .echarts {\n        width: 100%;\n        height: 100%;\n}\n.dashboard-container .log-wrapper {\n    margin: 24px 0;\n    padding: 24px;\n    background: #fff;\n}\n.dashboard-container .log-wrapper .title {\n      padding-top: 20px;\n      margin-bottom: 15px;\n      font-size: 18px;\n      color: #534c77;\n}\n.dashboard-container .log-wrapper .tab-bar {\n      margin-bottom: 18px;\n}\n.dashboard-container .log-wrapper .tab-bar .tab-btn {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        margin-right: 24px;\n        padding: 0 5px;\n        background: #f8f8fa;\n        line-height: 26px;\n        border-radius: 26px;\n        cursor: pointer;\n}\n.dashboard-container .log-wrapper .tab-bar .tab-btn .text {\n          padding: 0 10px;\n          font-size: 16px;\n          font-weight: bold;\n          color: #7f7d8e;\n}\n.dashboard-container .log-wrapper .tab-bar .tab-btn .count {\n          min-width: 16px;\n          height: 16px;\n          padding: 0 5px;\n          border-radius: 16px;\n          line-height: 16px;\n          text-align: center;\n          color: #fff;\n}\n.dashboard-container .log-wrapper .tab-bar .tab-btn .error {\n          background: #ff6464;\n}\n.dashboard-container .log-wrapper .tab-bar .tab-btn .warning {\n          background: #ff5d93;\n}\n.dashboard-container .log-wrapper .tab-bar .tab-btn .info {\n          background: #ffd70d;\n}\n.dashboard-container .log-wrapper .tab-bar .tab-btn .debug {\n          background: #24b68b;\n}\n.dashboard-container .log-wrapper .tab-bar .tab-btn:hover {\n          background: #494ece;\n}\n.dashboard-container .log-wrapper .tab-bar .tab-btn:hover .text {\n            color: #fff;\n}\n.dashboard-container .log-wrapper .tab-bar .tab-btn-active {\n        background: #494ece;\n}\n.dashboard-container .log-wrapper .tab-bar .tab-btn-active .text {\n          color: #fff;\n}\n.dashboard-container .log-wrapper .log-container {\n      height: 280px;\n      padding: 24px;\n      background: #f8f8fa;\n      overflow: auto;\n}\n.dashboard-container .log-wrapper .log-container .log-list > li {\n        /*height: 25px;*/\n        line-height: 25px;\n        text-indent: 10px;\n}\n',""])}}]);