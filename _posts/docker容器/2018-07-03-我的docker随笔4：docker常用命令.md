---  
layout: post  
category : docker容器  
tags : [docker]  
---  
学习docker，必须要熟练掌握docker命令，如果基础不牢的话，是无法进一步提高的。docker有很多命令，但常用的却不多。本文结合实际情况讲讲常用的命令。<!-- more -->

在开始之前，必须要清楚，docker镜像是一个静态概念，而容器则是一个动态概念，有些类似程序，可执行的二进制文件，仅是一个文件，不管运行不运行，它都在那里（除非删除了），但只有运行了，才是真正的“程序”，才能发挥其作用。同样，只有运行了镜像，将其变成容器，才是真正运行这个“镜像”，达到相应的目的。

## docker权限管理
默认情况下，大部分docker命令只允许root权限用户使用，普通用户无法执行。为了使得普通用户也能使用docker命令。需要配置权限。具体参考前面文章介绍。

## docker服务相关
停止docker：
```
/etc/init.d/docker stop
或
service docker stop
```
启动docker：
```
/etc/init.d/docker start
或
service docker start
```
重新启动docker：
```
/etc/init.d/docker restart
或
service docker restart
```
## docker客户端相关
### 拉取镜像
Docker官网（dockerhub）或其它网站有许多已经做好的镜像文件，使用docker pull命令可以直接将其拉取到本地使用（而不需要自己创建）：
```
docker pull image-name:tag  
```
如：
```
docker pull busybox # dockerhub官方镜像
docker pull latelee/busybox # 笔者托管在dockerhub上的镜像
docker pull nvidia/cuda:8.0  # nvida官方镜像
docker pull registry.cn-hangzhou.aliyuncs.com/latelee/wordpress # 笔者托管在阿里云仓库的镜像
```
注意，默认使用latest标签，此时不需要输入latest也可以。如要指定版本，则需要带标签。
默认情况下，下载的是dockerhub官方镜像，地址：https://hub.docker.com/。如果下载其它网站的镜像，镜像地址需要改变。至于具体镜像地址，一般提供镜像服务的网站都给出说明。

### 创建镜像
上面说的是已有的镜像，如果要自己创建镜像，则要自己编写Dockerfile，然后使用docker build命令，命令示例如下：
```
docker build -t myimage .
```
关于镜像的创建，在后续文章中会继续介绍。

### 上传镜像


### 运行镜像(变成容器)
一般运行镜像命令为：
```
docker run -itd 镜像名称
```
上面命令比较简单，其变化形式有：
* 指定容器名称
```
docker run --name 容器名称 -itd 镜像名称
```
* 需要挂载目录
```
docker run --name 容器名称 -v /home:/home -itd 镜像名称
```
其中-v表示挂载，前一目录为主机目录，后一目录为容器内目录，注意，如果挂载的容器目录已存在内容则会被覆盖，但由于内容是在镜像内的，所以不会被删除，只是本次运行的容器没有而已。
* 需要映射端口
```
docker run --name 容器名称 -p 8080:80 -itd 镜像名称
```
其中-p前一个端口表示主机端口，后一个端口表示容器内部端口。注意，主机端口不能被重复占用。


停止容器使用命令：
```
docker stop 容器ID/容器名称
```
删除容器命令：
```
docker rm 容器ID/容器名称
```
注意，删除的容器必须是已经停止的，如果要强行删除，则需要添加-f选项。

另外也可以用`docker start`来启动镜像，但笔者实际使用的比较少。

### 进入容器
运行已经在运行的镜像（用于容器在后台启动，而又想进入该容器交互界面）：
```
docker exec -it 容器ID/容器名称 bash
docker exec -it 容器ID/容器名称 sh
```
注意，以上的“bash”或“sh”是运行容器首先执行的命令，前面给出的示例没有注明，是因为每个docker镜像都有默认的启动执行命令，详细在后文讲述。
在执行docker exec 时，可以自行使用要执行的命令，比如：
```
# 查看正在运行的myubuntu内核版本号
docker exec -it myubuntu uname -a
Linux 6f15602f0338 4.13.0-38-generic #43~16.04.1-Ubuntu SMP Wed Mar 14 17:48:43 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux
# 查看根目录文件列表
docker exec -it myubuntu ls
```
这些命令的执行结果，与进入该容器再执行相同命令的结果，是一样的，但可以减少进入容器这一步骤，在实际中非常有用。

### 删除镜像
删除镜像使用如下命令：
```
docker rmi 镜像名称
```
注意，`docker rm`是删除容器，而`docker rmi`是删除镜像，两者操作的对象是不一样的。

### 主机与容器之间的拷贝

### 其它常用的

停止所有容器：
```
docker stop $(docker ps -aq)

```
删除所有容器(如果正在运行，则不会被删除)：
```
docker rm $(docker ps -aq)
```

本文所有命令均已测试通过，但仅保证在发文之时或延后一段时间有效。但命令本质是一样的。

李迟 2018.7.3