---
layout: post
title: 
category : 编译链接
tags : [Makefile]
---
上一文章的Makefile，存在一个比较大的问题，那就是生成可执行的二进制文件时，会链接所有的目标文件（.o文件），这样的后果是，二进制文件体积比较大，经过调查，发现静态链接可以解决此问题。
<!-- more -->
## Makefile内容
在原来基础上，添加中间临时静态库libfoobar.a（编译规则为libtarget)，编译生成该库时，要将main.cpp（或包括main函数的文件）排除掉，否则统出错。接着将此静态库与main.o一起链接生成a.out。要特别注意的是，libfoobar.a必须在其它链接库前面，否则链接会报错。另外，由于libfoobar.a是临时使用的，最后会将其删除。

Makefile完全内容如下：
```
# (C) Copyleft 2011 2012 2013 2014 2015 2016 2017 2018
# Late Lee(li@latelee.org) from http://www.latelee.org
# 
# A simple Makefile for *ONE* project(c or/and cpp file) in *ONE* or *MORE* directory
#
# note: 
# you can put head file(s) in 'include' directory, so it looks 
# a little neat.
#
# usage: 
#        $ make
#        $ make V=1     # verbose ouput
#        $ make CROSS_COMPILE=arm-arago-linux-gnueabi-  # cross compile for ARM, etc.
#        $ make debug=y # debug
#
# log
#       2013-05-14 sth about debug...
#       2016-02-29 sth for c/c++ multi diretory
#       2017-04-17 -s for .a/.so if no debug
#       2017-05-05 Add V for verbose ouput
###############################################################################

# !!!=== cross compile...
CROSS_COMPILE ?= 

MKDIR_P ?= mkdir -p

CC  = $(CROSS_COMPILE)gcc
CXX = $(CROSS_COMPILE)g++
AR  = $(CROSS_COMPILE)ar

# !!!===
# in case all .c/.cpp need g++...
# CC = $(CXX)

ARFLAGS = -cr
RM     = -rm -rf
MAKE   = make

CFLAGS  = 
LDFLAGS = 
DEFS    =
LIBS    =

# !!!===
# target executable file or .a or .so
target = a.out

# !!!===
# compile flags
CFLAGS += -Wall -Wfatal-errors -MMD

# !!!=== pkg-config here
#CFLAGS += $(shell pkg-config --cflags --libs glib-2.0 gattlib)
#LDFLAGS += $(shell pkg-config --cflags --libs glib-2.0 gattlib)

#****************************************************************************
# debug can be set to y to include debugging info, or n otherwise
debug  = y

#****************************************************************************

ifeq ($(debug), y)
    CFLAGS += -ggdb -rdynamic
else
    CFLAGS += -O2 -s
endif

# !!!===
# Macros define here
DEFS    += -DJIMKENT

CFLAGS  += $(DEFS)
CXXFLAGS = $(CFLAGS)

LIBS    += 

LDFLAGS += $(LIBS)

# !!!===
# include head file directory here
INC = ./include ./inc
# or try this
#INC := $(shell find $(INC) -type d)

# !!!===
# build directory
BUILD_DIR ?= #./build/

# !!!===
# source file(s), including ALL c file(s) or cpp file(s)
# just need the directory.
SRC_DIRS = . foo bar crc hello
# or try this
#SRC_DIRS = ./ 
#SRC_DIRS += ../outbox

# !!!===
# gcc/g++ compile flags
CFLAGS += $(INCDIRS)
CXXFLAGS += -std=c++11

# !!!===
# gcc/g++ link flags
LDFLAGS += -lpthread -lrt

DYNC_FLAGS += -fpic -shared

INCDIRS := $(addprefix -I, $(INC))

SRCS := $(shell find $(SRC_DIRS) -maxdepth 1 -name '*.cpp' -or -name '*.c' | grep -v main.cpp)
#SRCS := $(shell find $(SRC_DIRS) -name '*.cpp' -or -name '*.c')

OBJS = $(patsubst %.c,$(BUILD_DIR)%.o, $(patsubst %.cpp,$(BUILD_DIR)%.o, $(SRCS))) 

DEPS := $(OBJS:.o=.d)

ifeq ($(V),1)
Q=
NQ=true
else
Q=@
NQ=echo
endif

###############################################################################

# internal lib name, just ignore it
libtarget=libfoobar.a

all: $(BUILD_DIR)$(target)

# generate target, we need main.o here
$(BUILD_DIR)$(target): $(BUILD_DIR)$(libtarget) main.o
	@$(NQ) "Generating executable file..." $(notdir $(target))
	$(Q)$(CXX) $(CXXFLAGS) $^ -o $(target) $(BUILD_DIR)$(libtarget) $(LDFLAGS)
	@rm -rf $(BUILD_DIR)$(libtarget)

$(BUILD_DIR)$(libtarget): $(OBJS)
ifeq ($(suffix $(libtarget)), .so)
	@$(NQ) "Generating dynamic lib file..." $(notdir $(libtarget))
	$(Q)$(CXX) $(CXXFLAGS) $^ -o $(libtarget) $(LDFLAGS) $(DYNC_FLAGS)
else ifeq ($(suffix $(libtarget)), .a)
	@$(NQ) "Generating static lib file..." $(notdir $(libtarget))
	$(Q)$(AR) $(ARFLAGS) -o $(libtarget) $^
else
	@$(NQ) "Generating executable file..." $(notdir $(libtarget))
	$(Q)$(CXX) $(CXXFLAGS) $^ -o $(libtarget) $(LDFLAGS)
endif

# make all .c or .cpp
$(BUILD_DIR)%.o: %.c
	@$(MKDIR_P) $(dir $@)
	@$(NQ) "Compiling: " $(basename $(notdir $@)).c
	$(Q)$(CC) $(CFLAGS) -c $< -o $@

$(BUILD_DIR)%.o: %.cpp
	@$(MKDIR_P) $(dir $@)
	@$(NQ) "Compiling: " $(basename $(notdir $@)).cpp
	$(Q)$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	@$(NQ) "Cleaning..."
	$(Q)$(RM) $(OBJS) $(target) $(DEPS)
# delete build directory if needed
ifneq ($(BUILD_DIR),)
	$(Q)$(RM) $(BUILD_DIR)
endif
# use 'grep -v soapC.o' to skip the file
	@find . -iname '*.o' -o -iname '*.bak' -o -iname '*.d' | xargs rm -f

.PHONY: all clean

-include $(DEPS)
```
## 小结
经验实践，这个Makefile模板相对来说比较方便使用，修改的地方也不多。一个大工程，只需要一个Makefile，不用维护子Makefile，而且在生成可执行文件体积上有所兼顾。当然，诸如kernel、uboot这类项目，因为内含各种平台不同的代码，其复杂程度决定了无法用简单Makefile来编译。

以上，详细参考https://github.com/latelee/Makefile_templet工程的mult_dir_project_new1目录。。

李迟 2018.6.30