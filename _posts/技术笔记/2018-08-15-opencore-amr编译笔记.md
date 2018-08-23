---
layout: post
title: 
keywords: 
category: 技术笔记
tags : [notes]
---
opencore-amr编译笔记
<!-- more -->

## 文件说明：
库项目位于：https://sourceforge.net/projects/opencore-amr/files/?source=navbar。  
其中amr编码、解码按采样率又分别8K、16K。
对于8K而言，直接使用opencore-amr例子中的编码、解码即可（即amrnb-enc.c和amrnb-dec.c文件）。
对于16K，解码使用opencore-amr例子的amrwb-dec.c文件。但是，编码则使用vo-amrwbenc库源码目录下的amrwb-enc.c文件。

## opencore-amr下载及编译
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

https://nchc.dl.sourceforge.net/project/opencore-amr/vo-amrwbenc/vo-amrwbenc-0.1.3.tar.gz
