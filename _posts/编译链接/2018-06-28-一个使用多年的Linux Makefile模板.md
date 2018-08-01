---
layout: post
title: 
category : 编译链接
tags : [Makefile]
---
许久以前，一直使用自己总结的Makefile模板，这个模板也是基于现有资料整理而成的。
<!-- more -->

## 内容
Makefile完全内容如下：
```
# !!!=== cross compile...
CROSS_COMPILE ?= 

CC  = $(CROSS_COMPILE)gcc
CXX = $(CROSS_COMPILE)g++
AR  = $(CROSS_COMPILE)ar

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
CFLAGS += -Wall -Wfatal-errors

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
DEFS    += -DFUCK

CFLAGS  += $(DEFS)

LIBS    += 

LDFLAGS += $(LIBS)

# !!!===
INC1 = ./
INC2 = ./inc
INC3 = 
INCDIRS := -I$(INC1) -I$(INC2)

# !!!===
CFLAGS += $(INCDIRS)

# !!!===
LDFLAGS += -lpthread -lrt

DYNC_FLAGS += -fpic -shared

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

# ok for c/c++
OBJ = $(patsubst %.c,%.o, $(patsubst %.cpp,%.o, $(SRC))) 


# !!!===
# in case all .c/.cpp need g++...
# CC = $(CXX)

ifeq ($(V),1)
Q=
NQ=true
else
Q=
NQ=echo
endif

###############################################################################

all: $(target)

$(target): $(OBJ)

ifeq ($(suffix $(target)), .so)
	@$(NQ) "Generating dynamic lib file..." $(notdir $(target))
	$(Q)$(CXX) $(CFLAGS) $^ -o $(target) $(LDFLAGS) $(DYNC_FLAGS)
else ifeq ($(suffix $(target)), .a)
	@$(NQ) "Generating static lib file..." $(notdir $(target))
	$(Q)$(AR) $(ARFLAGS) -o $(target) $^
else
	@$(NQ) "Generating executable file..." $(notdir $(target))
	$(Q)$(CXX) $(CFLAGS) $^ -o $(target) $(LDFLAGS)
endif

# make all .c or .cpp
%.o: %.c
	@$(NQ) "Compiling: " $(addsuffix .c, $(basename $(notdir $@)))
	$(Q)$(CC) $(CFLAGS) -c $< -o $@

%.o: %.cpp
	@$(NQ) "Compiling: " $(addsuffix .cpp, $(basename $(notdir $@)))
	$(Q)$(CXX) $(CFLAGS) -c $< -o $@

clean:
	@$(NQ) "Cleaning..."
	$(Q)$(RM) $(target)
	@find . -iname '*.o' -o -iname '*.bak' -o -iname '*.d' | xargs rm -f

.PHONY: all clean
```
## 使用
这个Makefile适用于一个目录或只有几个目录的情况，支持生成可执行程序、静态库、动态库。只需少许修改即可使用，如果是只有一个目录，无需任何修改，将其放到目录下，直接输入make即可编译生成a.out。所有要修改的地方均使用`!!!===`来注明。

要注意，Makefile使用的是Tab键，如果不是的话，会提示错误，如：`Makefile:81: *** missing separator.  Stop.`。


## 小结
曾经想过构建一套完整的脚本系统，用于大型复杂的软件项目，但是，几经尝试，都不如意，就放弃了，选择从最简单的入手。然后根据实际项目，稍作修改即可应用。

李迟 2018.6.28