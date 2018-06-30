---
layout: post
title: 
category : 技术笔记
tags : 
---
MQTT是一套协议，mosquitto是其实现的开源库（常用的）。本文介绍mosquitto在ubuntu 16.04上的使用。
<!-- more -->

## 安装

安装服务端：
```
sudo apt-get install mosquitto
```
成功后，得到mosquitto和mosquitto_passwd两个可执行程序，同时创建/etc/mosquitto/目录，其下有配置文件和认证证书，本文暂未涉及。

安装客户端：
```
sudo apt-get install mosquitto-clients
```
成功后，得到mosquitto_pub和mosquitto_sub，其中，mosquitto_pub用于发布消息，mosquitto_sub用于订阅消息。

## 使用
在同一台机器上测试。订阅消息：
```
$ mosquitto_sub -v -t "hello"
hello this is hello world  # 收到的消息
```
-t: 订阅主题，此处为hello，只有发布的消息是hello主题才能接受到。如果希望订阅所有消息，使用“#”。

-v: 打印订阅消息，包括主题和消息体。

-d：如果希望看到更详细的调试信息，使用此选项。

发布消息：
```
$ mosquitto_pub -d -t "hello" -m "this is hello world"
Client mosqpub/12383-zhijun sending CONNECT
Client mosqpub/12383-zhijun received CONNACK
Client mosqpub/12383-zhijun sending PUBLISH (d0, q0, r0, m1, 'hello', ... (19 bytes))
Client mosqpub/12383-zhijun sending DISCONNECT
```

不同机器测试。订阅消息命令相同，发布消息命令如下：
```
$ mosquitto_pub -d -h 172.18.18.18 -t "hello" -m "this is hello world"
Client mosqpub/21072-u-master sending CONNECT
Client mosqpub/21072-u-master received CONNACK
Client mosqpub/21072-u-master sending PUBLISH (d0, q0, r0, m1, 'hello', ... (19 bytes))
Client mosqpub/21072-u-master sending DISCONNECT
```
-d：打印详细的调试信息。

-h: 指定要连接的MQTT服务器，此处为172.18.18.18。

-t: 订阅主题，此处为hello。

-m：消息体。

## 小结
MQTT协议目前还没有理解得很透，网上例子非常简单，感受不出其优势，但很多资料都说这个协议很好，暂时没有体会到。
