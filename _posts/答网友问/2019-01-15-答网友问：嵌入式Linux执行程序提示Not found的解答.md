---
layout: post
title: 
keywords: 
category: 答网友问
tags : [notes]
---
某日，网友不会飞的骆驼问了我一个问题。在嵌入式Linux系统中执行./a.out时，提示找不到，信息如下：  
```
$ ./a.out 
-sh: ./a.out: not found
```
找了点资料，帮解决了。  
<!-- more -->

## 问题重现
我在板子上重现了问题。的确如上所述。  
使用file命令查看a.out属性，信息如下：  
```
file ./a.out 
./a.out: ELF 32-bit LSB executable, ARM, EABI5 version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux-armhf.so.3, for GNU/Linux 2.6.32, BuildID[sha1]=89b9b01541d4f84bfba73ce649cdd2982bb3840e, stripped
```
从信息上看，a.out是32位ARM系统程序，动态链接，解析器为/lib/ld-linux-armhf.so.3。但是，在板子上查看该文件：  
```
$ ls /lib/ld-linux*
/lib/ld-linux.so.3
```
可以看到只有ld-linux.so.3，找不到前面提到的ld-linux-armhf.so.3，所以执行程序时提示not found。  
造成这个问题的原因是：板子上的系统所用的链接器版本，与编译程序的交叉编译器的链接器版本不一致。先试试将交叉编译器的链接器拷贝到板子系统中，再次执行：  
```
$ ./a.out 
./a.out: /lib/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by ./a.out)
```
提示信息变化了，但还是出错，是因为c++库的版本号不对应。即a.out使用的版本是GLIBCXX_3.4.21，但系统上的c++动态库没有这个版本号。在板子上查找这个库，信息如下：  
```
$ ll  /lib/libstdc\+\+.so.6*
lrwxrwxrwx    1 root     root            19 Jan 21  2017 /lib/libstdc++.so.6 -> libstdc++.so.6.0.16
-rwxr-xr-x    1 root     root       1044441 Oct 15 09:57 /lib/libstdc++.so.6.0.16
```
从中得到，c++库版本为6.0.16(姑且这么认为)。  
再在交叉编译器目录中查找，已精简的信息如下：  
```
$ ll ./sysroots/usr/lib/libstdc++*
./sysroots/usr/lib/libstdc++.so -> libstdc++.so.6.0.21*
lrwxrwxrwx 1 latelee latelee      19 Jan 14 08:23 ./sysroots/usr/lib/libstdc++.so.6 -> libstdc++.so.6.0.21*
-rwxr-xr-x 1 latelee latelee 1240644 Jun 20  2018 ./sysroots/usr/lib/libstdc++.so.6.0.21*
```
可以看到，c++库的版本为6.0.21。这样，更能印证版本不匹配的问题了。  

## 解决办法
确认清楚板子系统使用哪个版本的编译器，再使用这个版本编译程序源码即可。在实践中，u-boot、kernel、busybox以及应用层，必须统一使用一套相同的编译器，否则，会出现各种问题。  
（注：也不一定要必须，但是，统一一个版本的话，将减少很多不必要的麻烦）  

## 其它扩展
之前曾经也遇到过此类问题，写在此，作为一个扩展知识点。查看交叉编译器版本，提示信息如下：
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

李迟 2019.1.15 中午