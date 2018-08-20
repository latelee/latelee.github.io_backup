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
tar zxf boost_1_67_0.tar.gz
```
编译：
```
cd boost_1_67_0/
./bootstrap.sh --prefix=/home/latelee/bin/boost
./b2
```
安装：
```
./b2 install
```

## 遇到问题
```
gcc.compile.c++ bin.v2/libs/iostreams/build/gcc-5.4.0/release/link-static/threading-multi/bzip2.o
libs/iostreams/src/bzip2.cpp:20:56: fatal error: bzlib.h: No such file or directory
compilation terminated.
```
解决，安装libbz2-dev库：
```
sudo apt-get install libbz2-dev
```

另外遇到下面问题：
```
./boost/atomic/atomic.hpp:166:16: error: ‘uintptr_t’ was not declared in this scope
 typedef atomic<uintptr_t> atomic_uintptr_t;
                ^
./boost/atomic/atomic.hpp:166:25: error: template argument 1 is invalid
 typedef atomic<uintptr_t> atomic_uintptr_t;
```
原来使用的boost库太旧，用最新的版本解决。
