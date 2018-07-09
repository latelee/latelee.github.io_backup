---
layout: post
title: 
category : 技术笔记
tags : 
---
MQTT是一套协议，mosquitto是其实现的开源库（常用的）。本文介绍mosquitto在ubuntu 16.04上的编译。
<!-- more -->

## 依赖库

安装依赖库：
```
sudo apt-get install uuid-dev
```
修改config.mk文件，禁止ssl库：
```
#WITH_TLS:=yes
```
注：config.mk有许多编译配置选项，最好了解。

修改client目录的Makefile，只要静态编译。
```
all : static #mosquitto_pub mosquitto_sub
```
输入`make -j4`就可以编译了，得到的mosquitto在src目录，mosquitto_pub和mosquitto_sub在client目录。

服务器运行：
```
mosquitto -c mosquitto.conf 
```
客户端（订阅或发布消息）：
```
mosquitto_sub -v -t "hello" -h 192.168.1.20 -p 1883

mosquitto_pub -t "hello" -m "ffff" -h 192.168.1.20
```
注：服务器和客户端可在同一个机器，也可不同。只要指定IP即可。

## 小结
mosquitto编译过程相对比较简单。uuid库是必须的，如果使用ssl，则需要依赖openssl库。

=====

另一篇 源码分析

mosquitto_sub流程：
主文件sub_client.c
```
main
--> 参数：client_config_load
--> 初始化库：mosquitto_lib_init
--> 产生ID：client_id_generate
--> 创建mosq结构体：mosquitto_new
--> ??? mosquitto_connect_with_flags_callback_set
--> 设置回调函数mosquitto_message_callback_set，最终调用print_message，亦即mosquitto_sub -v -t "xxx"时得到的信息
--> 连接服务器：client_connect
--> 循环等待消息：mosquitto_loop_forever
--> 如退出，清除：mosquitto_destroy，mosquitto_lib_cleanup
```
