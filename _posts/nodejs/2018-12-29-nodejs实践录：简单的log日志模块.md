---
layout: post
title: 
keywords: 
category: nodejs
tags : [nodejs]
---
本文封装一个简单的日志模块，提供时间戳和日志等级。比较简单，直接上代码。  

<!-- more -->

## 源码
```
var fs =require('fs');

// TODO 等级由外部传入，或是宏定义，或是设置参数
const L_DEBUG = 3;
const L_INFO = 2;
const L_WARN = 1;
const L_ERR = 0;

var g_level = L_DEBUG;

// 获取当前时间戳
function getTimestamp()
{
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var msec = now.getMilliseconds();
    return "[" + y + "-" + (m < 10 ? "0" + m : m) + 
            "-" + (d < 10 ? "0" + d : d) + 
            " " + (hour < 10 ? "0" + hour : hour) + 
            ":" + (min < 10 ? "0" + min : min) + 
            ":" + (sec < 10 ? "0" + sec : sec) + 
            "." + (msec < 100 ? (msec < 10 ? "00" + msec : '0' + msec) : msec) + "] ";
}

function print(fmt, ...extras)
{
    console.log(getTimestamp(), fmt, ...extras);
}

// 以追加的形式写到文件
// 注：如果写入内容不一致，最好自行转换成一致再调用
function write(filename, fmt)
{
    fs.writeFile(filename, getTimestamp() + fmt + '\r\n', {flag:'a', encoding:'utf-8', mode:'0644'}, function(err){});
}

function writex(filename, fmt)
{
    fs.writeFile(filename, fmt + '\r\n', {flag:'a', encoding:'utf-8', mode:'0644'}, function(err){});
}

function setDebugLevel(level)
{
    g_level = level;
}

function debug(fmt, ...extras)
{
    if (g_level >= L_DEBUG)
    {
        console.log(fmt, ...extras);
    }
}

function info(fmt, ...extras)
{
    if (g_level >= L_INFO)
    {
        console.log(fmt, ...extras);
    }
}

function warn(fmt, ...extras)
{
    if (g_level >= L_WARN)
    {
        console.log(fmt, ...extras);
    }
}

function err(fmt, ...extras)
{
    if (g_level >= L_ERR)
    {
        console.log(fmt, ...extras);
    }
}

// 导出名与函数名相同，可用此方法
module.exports = {
    print,
    write,
    writex,
    setDebugLevel,
    debug,
    info,
    warn,
    err,
}
```

## 使用
引入模块：  
```
// 由于笔者的库都位于工程的lib目录，所以如下使用，
// 在实际中一定要注意引入的相对路径的正确性。
const log = require('./lib/log.js')

var ret = sth();
log.print('ret: ', ret);
```

## 小结
本文的封装接口比较简单，不具备日志备份等功能，后续将使用已有日志模块进行研究。  

李迟 2019.2.24 周日 晚