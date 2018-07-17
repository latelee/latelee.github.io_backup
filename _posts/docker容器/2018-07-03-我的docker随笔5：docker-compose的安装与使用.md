---  
layout: post  
category : docker容器  
tags : [docker]  
---  
由前文知，运行容器的命令比较简单，但是，当有复杂的应用时，比如设置环境变量、挂载目录、映射端口，命令就变得比较长了。如果有多个docker镜像同时配置使用的话，单独执行`docker run`会显示比较麻烦。因此，本文就介绍多容器编排的一个简单工具：docker-compose。
<!-- more -->

## 安装
安装方法如下：
```
sudo apt-get install -y docker-compose
```
本文安装的版本如下：
```
$ docker-compose --version
docker-compose version 1.21.2, build a133471
```

## docker-compose.yml内容
docker-compose默认使用的配置文件为docker-compose.yml，其内容示例如下，大多数英文名称，是固定内容，中文说明是根据实际情况变化的内容。
```
version: '2' # 固定，表示其版本为2
services: # 固定，表示容器服务
    gitlab: # 容器名称，根据实际修改
        image: latelee/gitlab # 镜像名，如果不存在，则从网络下载
        container_name: gitlab  # 容器名，在运行名称是唯一的
        restart: always # 开启此选项，在机器重启后，会自动启动这些容器，否则，就要手动启动容器
        volumes: # 挂载数据卷，对应docker run命令的-v选项。
            - /mnt/gitlab_data/config:/etc/gitlab
        ports: # 端口映射
            - "80:80"
        networks: # 指定的网络，也可以不指定，必须与networks名称一致
            - mygitlab-jenkins-net
    jenkins：# 容器名称，根据实际修改，格式与前述一样
    ...
networks: # 固定，对网络配置，如无则不需要
    mygitlab-jenkins-net: # 自定义的网络名称
        driver: bridge  # 桥接方式
```
根据笔者经验，yml文件对格式检查十分严格，必须要对齐，如上面的image、container_name等，必须对对齐，不能多一空格或少一空格。否则会提示莫名其妙的错误。

## 运行、停止
在docker-compose.yml同级目录，执行如下命令运行：
```
docker-compose up -d
```
如果配置文件不是docker-compose.yml，则需要使用-f来指定，如下：
```
docker-compose -f foobar.yml up -d 
```
以上命令，使用-d表示在后台运行docker容器，执行后，终端只打启动信息，不会打印容器内的日志。如果要显示日志，则要将-d去掉。
```
docker-compose up
```

停止命令：
```
docker-compose down
```
重启命令：
```
docker-compose restart
```
注意，如果同时要运行多个容器，修改其中部分容器时，可以使用restart来重启，这样仅启动有修改的容器，但是根据经验，有时会有意想不到的情况出现，因此，最好还是先停止再启动。
如果要查看运行状态，执行：
```
docker-compose ps
```
当然，也可以使用`docker ps`来查看，本质上没区别。

## 实际例子
下面以一个经典的CICD组件为例进行说明，docker-compose.yml内容如下：
```
# gitlab & jenkins
# Powered by Late Lee <li@latelee.org>
#
# yml版本为2
version: '2'
services:
    # 第一个容器gitlab
    gitlab:
        # 镜像名，如果不存在，则从网络下载，本文假设使用本地的镜像
        image: latelee/gitlab
        # 容器名，在运行名称是唯一的
        container_name: gitlab
        restart: always
        # 挂载数据卷
        volumes:
            - /mnt/gitlab_data/config:/etc/gitlab
            - /mnt/gitlab_data/logs:/var/log/gitlab
            - /mnt/gitlab_data/data:/var/opt/gitlab
        # 端口映射
        ports:
            - "80:80"
            - "9443:443"
            - "2222:22"
        # 主机名 这个IP改为自己的主机IP
        hostname: "172.18.18.18"
        # 启动时执行的命令
        #command: /assets/wrapper
        # 自定义的网络（见下[网络配置]）
        networks:
            - mygitlab-jenkins-net
    # 第二个容器jenkins
    jenkins:
        image:  latelee/jenkins:maven
        container_name: jenkins
        restart: always
        volumes:
            # 使用主机的docker服务(因为要在jenkins容器中运行docker)
            - /var/run/docker.sock:/var/run/docker.sock
            # 使用数据盘的目录作为jenkins的工作目录
            - /mnt/jenkins_home:/var/jenkins_home
        ports:
            # 端口映射
            - "9080:8080"
            - "50000:50000"
        networks:
            - mygitlab-jenkins-net
# 网络配置
networks:
    mygitlab-jenkins-net: # 自定义的网络名称
        driver: bridge  # 桥接方式
```
执行`docker-compose up -d`启动gitlab和jenkins容器。成功后，可以在浏览器上输入主机IP访问gitlab的页面。注意，gitlab和jenkins比较吃内存，最好在4GB以上内存的机器上运行，否则会很卡。


## 使用经验
### 在docker-compose.yml中构建镜像。
在docker-compose.yml文件，在image前面加上build字段，指定Dockerfile所在目录，那么在运行`docker-compose up`时，就会自动构建。示例文件如下：
```
version: "2"
services:
  apache:
    build: httpd
    image: httpd:alpine
    container_name: httpd
    volumes:
    #   - /home:/home
       - ./apache2/htdocs:/usr/local/apache2/htdocs
    ports:
      - 80:80
```
运行后，最后提示信息如下：
``` 
Successfully httpd:alpine
WARNING: Image for service singula-oh-accessserver was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
```
从提示信息知道，如果镜像不存在则自动创建，否则需要调用`docker-compose build`或`docker-compose up --build`

## 小结
笔者在工作中几乎都使用docker-compose启动容器。这种方式加上自建docker镜像（后文将讲述），将大大提高效率。如部署禅道系统。使用笔者构建好的配置文件，直接下载
<https://github.com/latelee/docker-compose/tree/master/zentao>，进入该目录，运行`docker-compose up -d`，即可在9070端口访问禅道页面。其过程十分方便，因为所有的一切环境，已经在docker中完成了。笔者的docker-compose仓库地址：<https://github.com/latelee/docker-compose>。


李迟 2018.7.3
