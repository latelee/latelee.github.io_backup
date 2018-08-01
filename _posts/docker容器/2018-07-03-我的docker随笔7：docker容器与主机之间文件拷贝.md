---  
layout: post  
category : docker容器  
tags : [docker]  
---  
## 背景
Docker提供cp命令，用于主机和容器之间相互拷贝。
<!-- more -->

## docker cp命令
下面所有示例的命令都是在主机进行的。

命令形式如下：
```
docker cp <主机目录或文件的路径> <容器ID:容器路径>
```
示例：
运行一个容器，假设其ID为267888e2e9ec。将当前目录的demo文件拷贝到容器根目录：
```
docker cp demo/ 267888e2e9ec:/
```
再在这个容器修改demo文件的内容，再将其拷贝到主机（在当前目录，文件夹为demo_tmp）：
```
docker cp 267888e2e9ec:/demo demo_tmp
```


## 小结
有时候，容器内没有vim或vi工具，又无法联网下载，则可以使用`docker cp`命令实现修改文件的目的。

李迟 2018.7.26 中午