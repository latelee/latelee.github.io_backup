---
layout: post
title: 
category : 编译链接
tags : [Makefile]
---
以前写的Makefile，有一些地方不够人性化，头文件或源码文件比较多的情况，要手动输入很多个地方。这次参考了一些资料，完善一下。
<!-- more -->
## 存在问题

原来的做法：
```
# !!!===
INC1 = ./
INC2 = ./inc
INC3 = 
INCDIRS := -I$(INC1) -I$(INC2)

# !!!===
# source file(s), including c file(s) or cpp file(s)
# you can also use $(wildcard *.c), etc.
SRC_DIR = .
SRC_DIR1 = 
SRC_DIR2 = 
SRC_DIR3 = 

# ok for c/c++
SRC = $(wildcard $(SRC_DIR)/*.c $(SRC_DIR)/*.cpp)
SRC+=$(wildcard $(SRC_DIR1)/*.c $(SRC_DIR1)/*.cpp)
SRC+=$(wildcard $(SRC_DIR2)/*.c $(SRC_DIR2)/*.cpp)
SRC+=$(wildcard $(SRC_DIR3)/*.c $(SRC_DIR3)/*.cpp)
```
从上面内容看到，如果有多个头文件、源码路径的话，要分别添加2个地方。这样工作量比较多。

## 改进
无意间看到一篇文章：https://spin.atomicobject.com/2016/08/26/makefile-c-projects/，上面提到了用find命令查找，比较好解决上述问题。

头文件部分改为：
```
# !!!===
# include head file directory here
INC = ./inc
INC := $(shell find $(INC) -type d)
INCDIRS := $(addprefix -I, $(INC))
```
这样，只需要在INC给定头文件所在目录即可，其它不需要修改了。使用find加上-type d表示将指定目录下所有子目录都作为头文件目录。这样有好有不好，如果目录太多，又不是一定存在头文件，则在编译时会带很多路径。解决此问题也简单，将所有头文件放到inc目录，该目录也可以分不同子目录存放头文件，这是一种折中的方法，在实际中也这样使用。

源码目录改为：
```
SRC_DIRS = . 
SRCS := $(shell find $(SRC_DIRS) -name '*.cpp' -or -name '*.c')
```
这样修改，可以搜索当前目录下所有子目录的源码文件，包括.c和.cpp文件。

这种做法的好处是，不需要考虑太多的目录层次，但是正因为如此，所有的目录都会被搜索到。

## 引申应用
由前面引申出来的思考：如果不想搜索所有目录，那就要一一指定哪些目录需要编译了。那么，相应的修改如下：
```
INC = ./inc ../3rdparty/zlib/inc  # 一一指定哪些是真正的头文件
INCDIRS := $(addprefix -I, $(INC))

SRC_DIRS = . ./foo ./bar ./main # 一一指定哪些是真正要编译的目录
SRCS := $(shell find $(SRC_DIRS) -maxdepth 1 -name '*.cpp' -or -name '*.c') # 这里使用-maxdepth 1只搜索一层目录
```

## 小结
虽然本次只是修改了一点内容，但便捷性大大提高，而且，即使是多个目录的工程，只要目录设计合适，只需要一个Makefile即可完成编译工作，无须额外的子Makefile。以上涉及的目录，仅做示例而已，具体根据实际情况修改。详细参考https://github.com/latelee/Makefile_templet提交记录。

李迟 2018.6.29