---
layout: post
title: 
keywords: 
category: nodejs
tags : [nodejs]
---
本文介绍笔者使用nodejs开发的环境，以及编码风格。

<!-- more -->

## 环境
笔者在linux、windows都安装了nodejs，还安装了pm2。在windows平台，使用cmd终端或git bash运行node或npm命令。但更多时候是使用vs code的终端，因为可以一边编写代码，一边跑程序，非常方便。  
下面是笔者vs code截图：  
![](https://raw.githubusercontent.com/latelee/latelee.github.io/master/assets/nodejs/nodejs-workshop.png)  

## 编码风格
nodejs使用的是java风格，不过笔者从事c/c++开发很多年，已经固化了一些风格，特别是大括号`{}`和`if..else..`的位置。曾与同事讨论多回，也尝试向标准的js靠拢，但发现编码效率很低。于是决定改回原来的风格。简述如下：  
* 大括号：单独一行
* if语句：单独一行
* 文件名称：小写+下划线。特殊术语除外。  
* 函数名、变量名：小写+大写，不使用下划线。  
* 类名：大写
* 全局变量：添加前缀`g_`
* 注释：使用中文，只写为何如此实现，而不是说明代码语句所做的事。
* 主入口函数所在文件名：使用main.js。

李迟  2019.2.5 周二