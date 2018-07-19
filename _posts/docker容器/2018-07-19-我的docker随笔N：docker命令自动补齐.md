---  
layout: post  
category : docker容器  
tags : [docker]  
---  
## 背景
在我自己制作并安装的ubuntu16.04系统上（参考笔者网站关于debootstrap的文章），无法使用docker自动补齐功能，即输入docker命令后，按Tab键无法列出子命令（或参数）的候选项。于是在网上找了些资料，实现了这个功能，形成本文。
<!-- more -->

## 机制
Linux系统许多命令都会提供该命令自身的命令补齐脚本，在安装命令时会自动安装自动补齐脚本——如果有的话。该机制在Linux中被称为bash-complete。在`/usr/share/bash-completion/completions`目录下有许多命令自动补齐的脚本，可自行查阅。与docker有关的，有2个：docker和docker-compose。如下：
```
# ls  /usr/share/bash-completion/completions/docker*
/usr/share/bash-completion/completions/docker  /usr/share/bash-completion/completions/docker-compose
```
自动补齐需要依赖工具bash-complete，如果没有，则需要手动安装，命令如下：
```
sudo apt-get install -y bash-completion
```
安装成功后，得到文件为 `/usr/share/bash-completion/bash_completion`，如果没有这个文件，则系统上没有安装这个工具。

## 实践
让配置脚本生效的方法是执行`source xxx`命令，先执行`source /usr/share/bash-completion/completions/docker  `，再输入`docker`，然后按2次Tab键，提示错误如下：
```
docker bash: _get_comp_words_by_ref: command not found
bash: [: : integer expression expected
bash: [: : integer expression expected
bash: [: : integer expression expected
bash: _get_comp_words_by_ref: command not found
bash: [: : integer expression expected
bash: [: : integer expression expected
bash: [: : integer expression expected
```
注：第一行的docker，实际是输入的命令，其它是按Tab键的输出信息。

前面已经安装了`bash_completion`，于是想到执行
```
source /usr/share/bash-completion/bash_completion
```
再次尝试，发现可以正常列出docker的子命令，示例如下：
```
$ docker 
attach     cp         export     import     login      pause      push       run        stack      system     version
build      create     help       info       logout     plugin     rename     save       start      tag        volume
commit     diff       history    inspect    logs       port       restart    search     stats      top        wait
config     events     image      kill       network    ps         rm         secret     stop       unpause    
container  exec       images     load       node       pull       rmi        service    swarm      update 
```
试试docker-compose命令，如下：
```
# docker-compose  (注：此处按2次Tab键)
build    config   down     exec     kill     pause    ps       push     rm       scale    stop     up       
bundle   create   events   help     logs     port     pull     restart  run      start    unpause  version 
```
尝试容器名称的自动补齐功能：
```
# docker logs latelee- (注：输入latelee-后按2次Tab键)
latelee-wordpress    latelee-apache     latelee-mysql        
latelee-zentao  latelee-gitlab  latelee-jenkins 
```
至此，docker、docker-compose自动补齐功能已完成。类似地，对于k8s，也有相应的命令补齐功能，不过k8s是另外的话题了。

## 小结
Linux的大量命令让人望而生畏，但如果掌握了Tab键功能，则可减少大量命令输入工作，提高效率。
