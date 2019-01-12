---
layout: post
title: 
keywords: 
category: nodejs
tags : [nodejs]
---
本文讲述ubuntu 16.04 64bit系统中，nodejs环境的搭建。

<!-- more -->

## 更新源
命令如下：
```
sudo apt-get update
sudo apt-get install -y python-software-properties software-properties-common
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
```

## 安装
命令如下：  
```
sudo apt-get install -y nodejs nodejs-legacy npm
```

更新npm源为taobao：  
```
sudo npm config set registry https://registry.npm.taobao.org
sudo npm config list
```

更新node最新版本：  
```
sudo n stable
sudo node -v
```

## 测试
