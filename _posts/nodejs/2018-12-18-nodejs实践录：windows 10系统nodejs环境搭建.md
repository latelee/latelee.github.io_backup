---
layout: post
title: 
keywords: 
category: nodejs
tags : [nodejs]
---
本文讲述windows 10 64bit系统中，nodejs环境的搭建。

<!-- more -->

## 安装
下载地址为：https://nodejs.org/zh-cn/download/， 下载安装包为`node-v10.15.0-x64.msi`。  
双击，根据提示安装。默认已设置好PATH。  

## 更新npm源为taobao：  
```
npm config set registry https://registry.npm.taobao.org
npm config list // 查看是否生效
```

出现`metrics-registry = "https://registry.npm.taobao.org/"`表示已设置成功

## 查看版本
打开cmd命令终端：  
```
C:\Users\Late Lee>npm -v
6.4.1

C:\Users\Late Lee>node -v
v10.15.0
```
建议使用git bash来操作nodejs程序。

## 安装pm2
pm2可以高效地管理nodejs应用。安装命令如下：  
```
npm install pm2 -g
```

查看安装版本：  
```
pm2 --version
3.2.9
```

李迟  2019.2.5 周二