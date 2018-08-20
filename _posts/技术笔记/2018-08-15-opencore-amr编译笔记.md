---
layout: post
title: 
keywords: 
category: 技术笔记
tags : [notes]
---
opencore-amr编译笔记
<!-- more -->
## 下载及编译
下载地址：<https://sourceforge.net/projects/opencore-amr/files/opencore-amr/opencore-amr-0.1.5.tar.gz/download>。本文下载的是opencore-amr-0.1.5.tar.gz。

解压：
```
tar jxf opencore-amr-0.1.5.tar.gz
```
编译：
```
./configure --prefix=/home/latelee/bin/amr
make
```
安装：
```
make install
```

## ARM的编译

编译：
```
./configure --host=arm-linux-gnueabihf --prefix=/home/latelee/bin/amr-arm
make
```

安装：
```
make install
```
