---  
layout: post  
category : docker容器  
tags : [docker]  
---  
由前文知，运行容器的命令比较简单，但是，当有复杂的应用时，比如设置环境变量、挂载目录、映射端口，命令就变得比较长了。如果有多个docker镜像同时配置使用的话，单独执行`docker run`会显示比较麻烦。
因此，本文就介绍多容器编排的一个简单工具：docker-compose。
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

## 运行

## 实际例子

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
笔者几乎都使用docker-compose启动容器。这种方式加上自建docker镜像（后文将讲述），将大大提高效率。如部署禅道系统。使用笔者构建好的配置文件，直接下载
https://github.com/latelee/docker-compose/tree/master/zentao，进入该目录，运行`docker-compose up -d`，即可在9070端口访问禅道页面。其过程十分方便，因为所有的一切环境，已经在docker中完成了。

李迟 2018.7.3
