---  
layout: post  
category : docker容器  
tags : [docker]  
---  

<!-- more -->

## 背景

## 操作
先查看core大小：
```
$ ulimit -a | grep core
core file size          (blocks, -c) 0
```

设置：
```
$ulimit -c unlimited
```

再查看：
```
$ ulimit -a | grep core
core file size          (blocks, -c) unlimited
```

设置路径
```
$ sudo echo 'core.%t.%e.%p' | sudo tee /proc/sys/kernel/core_pattern
```

运行镜像：
```
docker run -v /home:/home  -it latelee/myserver bash
```
进入对应的程序目录：
```
# cd /home/latelee/docker/test/myserver/
```

运行有段错误的测试程序：
```
# ./myserver
Segmentation fault (core dumped)
```

查看是否产生：
```
# ls
Dockerfile  core.1535079291.myserver.11  entrypoint.sh  config.ini  myserver
```
生成的coredump文件为`core.1535079291.myserver.11`

## core设置永久生效
编辑`/etc/security/limits.conf`文件，修改core相关的配置项，如下：

```
*               soft    core            unlimited
root            hard    core            unlimited
```

编辑/etc/sysctl.conf文件，在文件最后添加：

```
kernel.core_pattern = core.%t.%e.%p
```
注：以上2个文件均需root权限打开。


## 小结
0、程序必须使用-g编译，即程序是带有调试信息的，否则，即使有coredump，也看不出问题所在。  
1、先在宿主机上执行`ulimit -c unlimited`，并且设置生成coredump路径。  
2、再在docker容器里执行程序。  

## 经验
1、网上有说法提到在`docker run`时带`--ulimit core=-1 --security-opt seccomp=unconfined`参数，经验证，带与不带都可以生成coredump文件。由于笔者一般使用`docker-compose`来编排容器，这个还不知道怎么写到`docker-compose.yml`文件，所以暂不使用。  
2、关于设置coredump文件路径，建议在/tmp或单独挂载的目录，上文仅是演示，没有实际指导意义。    