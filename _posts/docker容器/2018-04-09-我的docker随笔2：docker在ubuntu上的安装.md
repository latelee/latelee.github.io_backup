---  
layout: post  
category : docker容器  
tags : [docker]  
---  
本文介绍Docker在linux系统的安装过程，由于笔者一直使用ubuntu系统，所以以此为使用平台，具体是ubuntu 16.04，64位系统。
docker这几年发展十分迅速，自去年（2017年）开始，docker基本上每个月都发行一个版本，之前的版本号是数字，现在已经改为年份+月份的形式，即YY.MM的形式。如笔者第一次安装docker的版本是17.09，即2017年9月份发布的版本。写这个文章时，已经到了18.04版本，——而18.05-dev也在开发中了。docker有2个版本：docker-ce（社区版，Docker Community Edition）、docker-ee（企业版，Docker Enterprise Edition），我们一般使用docker-ce即可满足大部分应用场合。<!-- more -->

# 最简单方案方式
ubuntu仓库已经有了docker软件源，因此可以直接用apt-get命令安装。
1、更新源
```
sudo apt-get update
```
2、安装
```
sudo apt-get install docker.io
```
注意，这种方式安装的版本较低。笔者在安装这个命令安装时，版本号为1.13。
# 官方推荐安装方式
1、更新源
```
sudo apt-get update
```

2、设置apt可以通过https使用源
```
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
```

3、添加docker官方的GPG key
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

4、检查是添加的key是否正确。即检测是否有9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88 指纹（fingerprint）
```
$ sudo apt-key fingerprint 0EBFCD88
```
本机输出：
```
pub   4096R/0EBFCD88 2017-02-22
      Key fingerprint = 9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid                  Docker Release (CE deb) <docker@docker.com>
sub   4096R/F273FCD8 2017-02-22
```

5、添加stable仓库
```
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

6、安装docker：
```
sudo apt-get update 
sudo apt-get install docker-ce
```

7、检测docker版本
```
# docker -v
Docker version 17.09.0-ce, build afdb6d4
```
看到版本号信息，说明已经成功安装了。

# 国内镜像安装
docker很多资源都在国外服务器，因此，访问时可能会比较慢（甚至无法访问），国内很多提供docker服务厂商拥有镜像资源，因此，如果无法按官方说明安装成功的话，那么可使用国内镜像安装，版本基本上都是最新的。
1、更新源
```
# apt-get update
```
安装curl：
```
# apt-get install curl -y
```

2、安装
```
# curl -sSL https://get.daocloud.io/docker | sh
```
输出信息如下：
```
# Executing docker install script, commit: 490beaa
+ sh -c apt-get update -qq >/dev/null
+ sh -c apt-get install -y -qq apt-transport-https ca-certificates curl software-properties-common >/dev/null
+ sh -c curl -fsSL "https://download.docker.com/linux/ubuntu/gpg"; | apt-key add -qq - >/dev/null
+ sh -c echo "deb [arch=amd64] https://download.docker.com/linux/ubuntu xenial edge" > /etc/apt/sources.list.d/docker.list
+ [ ubuntu = debian ]
+ sh -c apt-get update -qq >/dev/null
+ sh -c apt-get install -y -qq docker-ce >/dev/null
+ sh -c docker version
Client:
Version:      17.10.0-ce
API version:  1.33
Go version:   go1.8.3
Git commit:   f4ffd25
Built:        Tue Oct 17 19:04:16 2017
OS/Arch:      linux/amd64
Server:
Version:      17.10.0-ce
API version:  1.33 (minimum version 1.12)
Go version:   go1.8.3
Git commit:   f4ffd25
Built:        Tue Oct 17 19:02:56 2017
OS/Arch:      linux/amd64
Experimental: false
If you would like to use Docker as a non-root user, you should now consider
adding your user to the "docker" group with something like:
  sudo usermod -aG docker your-user
Remember that you will have to log out and back in for this to take effect!
WARNING: Adding a user to the "docker" group will grant the ability to run
         containers which can be used to obtain root privileges on the
         docker host.
         Refer to https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface
         for more information.
```
打印上述信息说明已经成功安装docker。

# 添加用户到docker组
如果使用普通用户执行docker命令，会出现错误，如下：
```
$ docker ps
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/v1.32/containers/json: dial unix /var/run/docker.sock: connect: permission denied
```
这是因为普通用户权限不够造成的。先看一下出错信息`/var/run/docker.sock`文件的权限。
```
$ ll /var/run/docker.sock
srw-rw---- 1 root docker 0 Dec 23 15:12 /var/run/docker.sock=
```
该文件权限为root，所属docker组。因此，解决方法是将普通用户添加到docker组，命令如下：
```
sudo gpasswd -a ${USER} docker
sudo newgrp - docker
```
为了确保结果正常，最好重新登陆一次系统。  
完成后，在后续使用docker时，就不需要频繁切换到root用户了。

李迟 2018.4.9