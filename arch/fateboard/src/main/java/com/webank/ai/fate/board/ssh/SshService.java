package com.webank.ai.fate.board.ssh;

import com.google.common.base.Preconditions;
import com.google.common.collect.Maps;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.webank.ai.fate.board.pojo.SshInfo;
import com.webank.ai.fate.board.utils.Dict;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

/**
 * @Description TODO
 * @Author kaideng
 **/
@Service
public class SshService implements InitializingBean {

    Logger logger = LoggerFactory.getLogger(SshService.class);

    public SshInfo getSSHInfo(String ip) {
        return this.sshInfoMap.get(ip);
    }


    public void load(InputStream inputStream) throws IOException {

        Properties properties = new Properties();
        properties.load(inputStream);

        Set<String> sets = properties.stringPropertyNames();

        sets.forEach(key -> {
            try {
                String values = properties.getProperty(key);
                SshInfo sshInfo = new SshInfo();
                String[] params = values.split("\\|");
                sshInfo.setIp(key);
                if (params.length > 0) {
                    sshInfo.setUser(params[0]);
                    sshInfo.setPassword(params[1]);
                    sshInfo.setPort(new Integer(params[2]));
                }
                sshInfoMap.put(key, sshInfo);
            } catch (Exception e) {
                e.printStackTrace();
                logger.error("parse ssh info error", e);
            }
        });
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        String filePath = System.getProperty(Dict.SSH_CONFIG_FILE);
        if (filePath ==null||"".equals(filePath)) {
            ClassPathResource classPathResource = new ClassPathResource("ssh.properties");
            load(classPathResource.getInputStream());
        } else {
            File file = new File(filePath+"/ssh.properties");
            Preconditions.checkArgument(file.exists() && file.isFile());
            load(new FileInputStream(file));
        }
        ;
    }

    Map<String, SshInfo> sshInfoMap = Maps.newHashMap();


    static Map<String, Session> sessionMap = Maps.newHashMap();

    public ChannelExec executeCmd(Session session, String cmd) throws Exception {

        Preconditions.checkArgument(session != null, "ssh session is null");
        Preconditions.checkArgument(cmd != null);
        Channel channel = null;

        try {

            if (session.isConnected()) {
                channel = session.openChannel("exec");
                logger.info("prepare to execute cmd {}", cmd);
                ((ChannelExec) channel).setCommand(cmd);
                channel.setInputStream(null);
                channel.connect();
            }

        } catch (Exception e) {

            logger.error("ssh execute cmd {} error", cmd);

            e.printStackTrace();
            channel.disconnect();

            throw e;

        }

        return (ChannelExec) channel;

    }

    public Session connect(SshInfo sshInfo) throws Exception {
        Preconditions.checkArgument(sshInfo != null, "sshInfo is null");


        return this.connect(sshInfo.getUser(), sshInfo.getPassword(), sshInfo.getIp(), new Integer(sshInfo.getPort()));

    }

    public Session connect(String user, String passwd, String host, int port) throws Exception {


        String sessionKey = new StringBuilder().append(user).append("_").append(host).append("_").append(port).toString();
        Session session = sessionMap.get(sessionKey);

        if (session != null && !session.isConnected()) {
            sessionMap.remove(sessionKey);
        }

        if (session != null && session.isConnected()) {
            return session;
        } else {
            JSch jsch = new JSch();
            session = jsch.getSession(user, host, port);
            if (session == null) {
                throw new Exception("session is null");
            }
            session.setPassword(passwd);
            java.util.Properties config = new java.util.Properties();
            //第一次登陆
            config.put("StrictHostKeyChecking", "no");
            session.setConfig(config);
            try {
                session.connect(30000);
            } catch (Exception e) {
                e.printStackTrace();
                throw new Exception("连接远程端口无效或用户名密码错误");
            }

            sessionMap.put(sessionKey, session);
        }
        return session;
    }


}
