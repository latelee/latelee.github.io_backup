---
layout: post
title: 
keywords: 
category: 技术笔记
tags : [notes]
---
本文记录windows VS 2015环境、ubuntu16.04系统编译openssl-1.0.1t。
<!-- more -->

## 准备工作

MinGW、VS 2015和openssl下载从略。  

下载nmake，放到MinGW的任意bin目录下。


## windows
```
perl Configure VC-WIN64A
ms\do_win64a
nmake -f ms\ntdll.mak
cd out32dll
..\ms\test
```

## ubuntu 16.04 64bit
编译命令：
```
./Configure linux-x86_64 --prefix=/home/latelee/bin/openssl-bin
make depend
make -j
make install
```
得到的静态库位于`/home/latelee/bin/openssl-bin`目录。