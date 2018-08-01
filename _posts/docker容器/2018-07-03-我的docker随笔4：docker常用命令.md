---  
layout: post  
category : docker容器  
tags : [docker]  
---  
学习docker，必须要熟练掌握docker命令，如果基础不牢的话，是无法进一步提高的。docker有很多命令，但常用的却不多。本文结合实际情况讲讲常用的命令。<!-- more -->

在开始之前，必须要清楚，docker镜像是一个静态概念，而容器则是一个动态概念，有些类似程序，可执行的二进制文件，仅是一个文件，不管运行不运行，它都在那里（除非删除了），但只有运行了，才是真正的“程序”，才能发挥其作用。同样，只有运行了镜像，将其变成容器，才是真正运行这个“镜像”，达到相应的目的。

## docker权限管理
默认情况下，大部分docker命令只允许root权限用户使用，普通用户无法执行。为了使得普通用户也能使用docker命令。需要配置权限。具体参考前面文章介绍。
## docker程序
输入docker，按1次Tab键，可看出有很多以`docker`开头的命令，如下：
```
$ docker
docker                  docker-containerd-ctr   docker-init             docker-runc             
docker-compose          docker-containerd-shim  docker-machine          docker-swarm            
docker-containerd       dockerd                 docker-proxy   
```
其中常用的有客户端`docker`、服务端`dockerd`（注：在docker后加`d`表示是守护进程-daemon）、编排工具`docker-compose`（上篇文章已安装了），其它暂时用不到。
服务端程序dockerd提供着所有的docker服务，查询其运行状态如下：
```
$ ps -ef |grep dockerd 
root       1893      1  0 7月13 ?       00:57:05 /usr/bin/dockerd -H fd://
```
该进程由/etc/init.d/docker管理启动、停止操作。如果停止这个进程，很多docker命令将无法使用。

对于大部分应用来说，“docker命令”指的就是使用`docker`这个命令，即亦是docker客户端的操作。docker客户端可以连接其它主机的docker服务端，这个在`docker in docker`场合中可能会使用到，后续会有文章介绍。

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
对于已制作好镜像（或从其它仓库拉取的镜像），可以用`docker push`上传到自己的镜像仓库。首先要登陆对应的仓库，默认是hub.docker.com。使用命令`docker login`，输入账号和密码即可。如果登陆阿里云仓库，命令如下：
```
sudo docker login --username=latelee@163.com registry.cn-hangzhou.aliyuncs.com # 这是笔者的账号
```


上传镜像需要2个步骤，首先对镜像打标签，使用`docker tag`命令，然后使用`docker push`上传到仓库，默认是hub.docker.com。
比如将busybox上传到hub.docker.com。
```
docker tag busybox latelee/busybox
docker push latelee/busybox
```
关于阿里云仓库的使用，后续文章介绍。

对于不涉及机密的docker镜像，建议使用Dockerfile+自动构建的方式来保证，这样不需要自己创建。

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

### 导出导入镜像
在一台主机上制作了镜像，就可以利用导出导入功能，将其迁移到另一台主机（当然，也只可以使用仓库的pull形式，但要依赖镜像仓库）。

将镜像保存到本地目录：
```
docker save -o file.tar image:tag
```
示例：
```
docker save -o ubuntu16.04_20170703.tar ubuntu:16.04
```
注意，压缩包是tar格式，不是tar.bz2格式，如果要研究该压缩包，则可以解压，解压使用tar xf xxx.tar形式。解压后得到的内容包括很多层，这里就不涉及了。
在另一台主机上导入，使用命令格式：
docker load -i file.tar
示例如下：
docker load –I ubuntu16.04_1017.tar
导入之后，使用docker images可查看镜像信息。

### 其它常用的命令

停止所有容器：
```
docker stop $(docker ps -aq)

```
删除所有容器(如果正在运行，则不会被删除)：
```
docker rm $(docker ps -aq)
```

删除所有包括latelee关键字的镜像：
```
docker rmi $(docker images | grep latelee | awk '{print $3}')  # awk的作用是得到三列（第三列即为镜像ID）
```
删除所有标记为none的镜像：
```
docker rmi $(docker images | grep none | awk '{print $3 }')
```

本文所有命令均已测试通过，但仅保证在发文之时或延后一段时间有效。但命令本质是一样的。

李迟 2018.7.3