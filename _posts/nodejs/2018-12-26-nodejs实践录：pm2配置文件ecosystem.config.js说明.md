---
layout: post
title: 
keywords: 
category: nodejs
tags : [nodejs]
---
本文介绍pm2配置文件`ecosystem.config.js`。
`ecosystem.config.js`是pm2默认的配置文件，这个文件可以改为其它名称。本文统一使用默认名称。  

<!-- more -->
`ecosystem.config.js`的官方说明，请移步`http://pm2.keymetrics.io/docs/usage/application-declaration/`查阅。  

## 生成ecosystem.config.js文件
在工程目录输入：  
```
$ pm2 ecosystem
File E:\project\newworld\nodejs\test\log_test\ecosystem.config.js generated

```

## 解释
默认的配置文件如下：
```
module.exports = {
  apps : [{
    name: 'API',
    script: 'app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
```
下面解释主要的字段。
* apps: 应用程序列表，pm2可以管理多个程序。

## 集群模式的配置文件
配置文件示例如下：  
```
module.exports = {
  // APP是一个数组，可以有多个
  // 参数参考：https://pm2.io/doc/en/runtime/reference/ecosystem-file/
  apps : [
  {
    name: 'app',
    script: 'app.js',
    args: 'null',
    instances: 2,  // 集群实例，可以只有一个，这样表现上与fork无异，但可以用scale
    exec_mode: "cluster", // 集群模式，如不指定，默认为fork
    autorestart: false,
    min_uptime: "60s",
    max_restarts: 3,
    watch: false,
    //error_file: "./logs/app-err.log",
    //out_file: "./logs/app-out.log",
    log: "./logs/app.log",
    //log_date_format: "YYYY-MM-DD HH:mm Z", // pm2 log添加日期
    max_memory_restart: '1G',
    //listen_timeout: 3000,
    kill_timeout: 3000,
    // wait_ready: true,
    env:
    {
      NODE_ENV: 'development'
    },
    env_production:
    {
      NODE_ENV: 'production'
    }
  }
  ],

  // 部署，暂未使用，不用理
  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};

```