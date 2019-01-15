---
layout: post
title: 
keywords: 
category: 答网友问
tags : [notes]
---
日，网友不会飞的骆驼问了我一个问题。在嵌入式Linux系统中执行./a.out时，提示：
```
```
如何解决？
<!-- more -->

## 问题重现


## 其它扩展
曾经也遇到过此类问题，写在此，作为一个扩展知识点。查看交叉编译器版本，提示信息如下：
```
latelee@ubuntu:~$ arm-linux-gcc --version
-bash: /home/latelee/bin/gcc-4.6.2-glibc-2.13-linaro-multilib-2011.12/fsl-linaro-toolchain/bin/arm-linux-gcc: No such file or directory
```

用file命令查看文件属性如下：
```
/home/latelee/bin/gcc-4.6.2-glibc-2.13-linaro-multilib-2011.12/fsl-linaro-toolchain/bin/arm-fsl-linux-gnueabi-gcc: ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux.so.2, for GNU/Linux 2.6.0, stripped
```
可以看到解析器为`/lib/ld-linux.so.2`，但这个文件并不存在，所以无法找到。  
这个问题很典型，是因为在64位系统中执行32位程序造成的（除交叉编译器外，其它程序亦然）。如何解决？安装32位库即可，命令如下：  
```
sudo apt-get install -y lib32ncurses5 lib32z1
```
安装完毕后，系统上有/lib/ld-linux.so.2文件。重新执行前面的命令即可显示正常的版本号。  