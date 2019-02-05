---
layout: post
title: 
keywords: 
category: nodejs
tags : [nodejs]
---
本文讲述ubuntu 16.04 64bit系统中，nodejs环境的搭建。

<!-- more -->

## 安装
**此章节已失效**
更新源，命令如下：
```
sudo apt-get update
sudo apt-get install -y python-software-properties software-properties-common
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
```
安装命令如下：  
```
sudo apt-get install -y nodejs nodejs-legacy npm
```

## 安装
安装旧版本：  
```
sudo apt-get install nodejs
sudo apt install nodejs-legacy
sudo apt install npm
```

## 更新npm源为taobao：  
```
npm config set registry https://registry.npm.taobao.org
npm config list // 查看是否生效
```

出现`metrics-registry = "https://registry.npm.taobao.org/"`表示已设置成功

## 更新node最新版本：
命令如下：  

```
sudo n stable
```
如果没有n命令，则安装之：  
```
sudo npm install -g n
```
再执行`sudo n stable`

查看版本：  
```
node -v
v11.6.0
npm -v
6.5.0-next.0

```

## 测试
test.js文件内容如下：
```
console.log("hello nodejs");
```
运行结果如下：  
```
node test.js 
hello nodejs
```

## 安装pm2
pm2可以高效地管理nodejs应用。安装命令如下：  
```
npm install pm2 -g
```

查看安装版本：  
```
pm2 --version
3.2.9
```
pm2的使用，将在后文陆续介绍。  

## 排错
查看npm版本时出现：  
```
$ npm -v
module.js:328
    throw err;
    ^

Error: Cannot find module '../lib/npm.js'
    at Function.Module._resolveFilename (module.js:326:15)
    at Function.Module._load (module.js:277:25)
    at Module.require (module.js:354:17)
    at require (internal/module.js:12:17)
    at /usr/local/bin/npm:26:13
    at Object.<anonymous> (/usr/local/bin/npm:76:3)
    at Module._compile (module.js:410:26)
    at Object.Module._extensions..js (module.js:417:10)
    at Module.load (module.js:344:32)
    at Function.Module._load (module.js:301:12)
```
网上有说法要重启电脑。一次操作中执行`sudo n stable`更新nmp，再查看版本，又正常了。
```
$ npm -v
6.5.0-next.0
```


李迟  2019.2.5 周二