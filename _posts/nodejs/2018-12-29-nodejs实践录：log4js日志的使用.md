---
layout: post
title: 
keywords: 
category: nodejs
tags : [nodejs]
---
本文介绍log4js的使用，log4js的名头很响，关注已久，但一直没使用过。去年最后一天，公司线上服务进行宕机，引起了甲方高层领导的严重关切。其根本原因是日志文件过大，超过了服务器分区——因为开发人员只顾写大量日志，并没有删除。此事虽不关已，但也算是一个教训。  
因此，寻找一个好的日志系统，在项目开发中十分重要，本文着重的是实践，关于log4js不过多说明。  

<!-- more -->

## 安装
使用npm安装，命令如下：  
```
npm install log4js
```
本文安装的版本为`4.0.2`。网上有些资料没有明确标明log4js的版本，导致个别函数或参数不对应，无法在新版本上使用，因此，在实际中，一定要注意版本的对应性。  

## 简单示例
### 代码
log4js的使用比较简单。看一下官方的示例：  
```
const log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Comté.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');
```
将代码版本保存为log_test.js，用node运行之，终端无任何输出。在当前目录得到文件`cheese.log`，其内容如下：  
```
[2019-02-24T23:24:00.156] [ERROR] cheese - Cheese is too ripe!
[2019-02-24T23:24:00.160] [FATAL] cheese - Cheese was breeding ground for listeria.
```
### 解释
代码首先引入log4js库，然后调用`log4js.configure()`进行配置，定义了一个名为`cheese`的输出源，不同的输出源，可以设置不同的文件名、等级等许多参数。注意，上面配置 的等级为`error`，只有`error`、`fatal`等级的日志才会输出。  
使用时，调用`log4js.getLogger('cheese')`得到实例`logger`，log4js提供了`trace`、`debug`、`info`、`warn`、`error`、`fatal`等不同等级的接口，可以根据需要调用，笔者常用的是`debug`、`info`、`error`这三个函数。

## 实践示例
上面的示例过于简单，这里分享一下稍微具备项目实战的示例。  
功能：项目中有不同的模块，根据模块名区分日志文件，不同模块日志不能混合。日志文件每天备份一次。能与pm2集群模块集成。输出文件同时，也输出到终端中。  
代码如下：  
```
/*
文件名：log_utils.js
对log4js的简单封装
实践：不同的模块使用不同的日志文件，配置在configure进行。
使用时，调用getLogger获取不同的appender，写入不同的日志文件。
将日志写入文件，然后使用tail -f xx.txt可实时查看，即使进行备份，也不影响
知识点：
每天备份：pattern为.yyyy-MM-dd.txt
每小时：pattern为.yyyy-MM-dd-mm.txt

*/
const log4js = require('log4js');

log4js.configure(
{
  appenders:
  {
    console:
    {
        type: 'console',
    },
    datelog:
    {
        type: 'dateFile',
        filename: 'logs/mylog',
        pattern: ".yyyy-MM-dd.txt",
        // alwaysIncludePattern: true,
        // maxLogSize: 10, // 无效
        // backups: 5, // 无效
        compress: true,
        daysToKeep: 2,
    },
    datelog2:
    {
        type: 'dateFile',
        filename: 'logs/youlog',
        pattern: ".yyyy-MM-dd.txt",
        compress: true,
        daysToKeep: 2,
    },
    // more...
  },
  categories:
  {
      default:
      {
          appenders: ['console'],
          level: 'debug',
      },
      datelog:
      {
          // 指定为上面定义的appender，如果不指定，无法写入
          appenders: ['console', 'datelog'],
          level: 'debug', // 指定等级
      },
      datelog2:
      {
          appenders: ['console', 'datelog2'],
          level: 'debug',
      },
      // more...
  },
  
  // for pm2...
  pm2: true,
  disableClustering: true, // not sure...
}
);


function getLogger(type)
{
    return log4js.getLogger(type);
}

module.exports = {
    getLogger,
}
```
代码以库的形式提供，使用示例如下：  
```
const log4js = require('../lib/log_utils.js'); // 引入库
const logger = log4js.getLogger('datelog'); // 获取指定的输出源
logger.info('hello world'); // 打印
```

## 小结
在编写时，发现无法在pm2的集群模式下正常输出，后来参考官方资料才解决，在配置函数中添加`pm2: true,`即可解决。 
网上有很多关于log4js的文章，但代码片段无法在新的版本上运行。建议直接参考官方示例来编写。  
如果项目的模块过多而又要区分不同的日志文件，配置时，`appenders`和`categories`的编写会非常麻烦，该问题后续再研究。  

## 参考资料
[https://log4js-node.github.io/log4js-node/clustering.html](https://log4js-node.github.io/log4js-node/clustering.html)

李迟 2019.2.24 周日 夜