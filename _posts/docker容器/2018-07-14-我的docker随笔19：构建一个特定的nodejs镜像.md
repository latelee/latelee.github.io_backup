---  
layout: post  
category : docker容器  
tags : [docker]  
---  
## 背景
某网友项目对区块链交易进行测试。测试脚本需要在nodejs环境中运行，脚本有server.js、package.json，主要依赖包为web3（当然还是其它的）。为方便测试，较好的解决方案是利用docker搭建环境。本文在ubuntu 16.04上进行实验。
<!-- more -->

## 尝试
https://hub.docker.com/上已经有了nodejs官方容器，最新版本为10.5.0。使用命令
```
docker pull node:alpine
```
拉取镜像，备用。注：为节省镜像体积，使用alpine版本。

创建Dockerfile文件，内容如下：
```
FROM node:alpine
 
# Create app directory
RUN mkdir -p /home/Service
WORKDIR /home/Service
 
# Bundle app source
COPY . /home/Service
RUN npm install
 
CMD [ "npm", "start" ]
```
Dockerfile最后一行表示在启动容器时运行npm start命令，该命令会自动找server.js文件。如是其它名称，则需修改，本文不提。
server.js和package.json两文件与Dockerfile同一目录。使用命令
```
docker build -t mynode .
```
构建docker镜像。注：其中-t mynode表示构建后的镜像名称，可用docker images查看。

然而构建失败，提示信息如下：
```
Step 5/6 : RUN npm install
 ---> Running in f99a9f66b07d
npm WARN deprecated fs-promise@2.0.3: Use mz or fs-extra^3.0 with Promise Support
npm WARN deprecated tar.gz@1.0.7: ⚠️  WARNING ⚠️ tar.gz module has been deprecated and your application is vulnerable. Please use tar module instead: https://npmjs.com/tar
npm ERR! code ENOGIT
npm ERR! Error while executing:
npm ERR! undefined ls-remote -h -t git://github.com/frozeman/WebSocket-Node.git
npm ERR! 
npm ERR! undefined
npm ERR! No git binary found in $PATH
npm ERR! 
npm ERR! Failed using git.
npm ERR! Please check if you have git installed and in your PATH.
```
从前面的错误信息看，以为Promise和web3版本有问题，经查package.json文件，web3版本为1.0.0-beta.34，已是最新版本。Promise也无太问题，继续看错误，提示容器没有git（因为要用git下载WebSocket-Node）。换另一思路，先进入node:alpine容器内，再手动调用npm start。启动容器命令：
```
docker run -it -v /home:/home node:alpine sh
```
-v /home:/home表示挂载主机的/home目录到容器的/home目录，方便测试（因为js文件在/home目录下）。结果如旧。

## 换nodejs版本
后与网友确认nodejs版本为8.11.2，但dockerhub上只有8.11.3，先确认是否版本问题，拉取镜像：
```
docker pull node:8.11.3-alpine
```
做法如上，但依然出错，问题不在此。（注：这个仅是为了记录当时解决问题的过程）

## 继续换思路
回至问题原因，是没有安装git。于是考虑使用ubuntu镜像，但该镜像需要安装git，继而考虑在本地主机下载nodejs依赖包。在server.js目录下执行：
```
npm install
```
发现安装过程还是有问题（具体信息未及时记录，但提示了node/nodejs版本过低）。

## 更新node

更新命令：
```
npm install npm@latest -g
n stable
```

## 更新nodejs
查看nodejs版本：
```
$ nodejs -v
v4.2.6
```

卸载nodejs
```
$ sudo apt remove nodejs
```

新加文件：/etc/apt/sources.list.d/nodesource.list，在该文件写入：
```
deb https://deb.nodesource.com/node_6.x xenial main
deb-src https://deb.nodesource.com/node_6.x xenial main
```
保存文件。然后下载gpg key：
```
curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
```
更新源：
```
sudo apt-get update
```
查看nodejs备选版本：
```
sudo apt-cache policy nodejs
nodejs:
  Installed: 6.14.3-1nodesource1
  Candidate: 6.14.3-1nodesource1
  Version table:
 *** 6.14.3-1nodesource1 500
        500 https://deb.nodesource.com/node_6.x xenial/main amd64 Packages
        100 /var/lib/dpkg/status
     4.2.6~dfsg-1ubuntu4.1 500
        500 http://mirrors.cloud.aliyuncs.com/ubuntu xenial-updates/universe amd64 Packages
     4.2.6~dfsg-1ubuntu4 500
        500 http://mirrors.cloud.aliyuncs.com/ubuntu xenial/universe amd64 Packages
```
安装nodejs：
```
sudo apt-get install nodejs
```
查看nodejs版本：
```
nodejs -v
v6.14.3
```

## 继续尝试
更新node、nodejs后，在主机的server.js目录下执行：
```
npm install
```
安装的依赖包存放在node_modules目录下。运行npm start，可看到正常的运行结果。说明依赖包已经完全安装成功。

## 打包docker
由于server.js依赖的包在node_modules目录下，因此，可以将这个目录先打包到镜像的/home/Service目录，然后以此作为基础镜像，再将server.js和package.json拷贝到/home/Service目录，就能完成docker环境的搭建。Dockerfile内容与前面相差不大。
构建好的docker镜像可用
```
docker pull latelee/node
```
拉取。

李迟 2018.6.26
