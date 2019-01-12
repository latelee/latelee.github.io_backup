---
layout: post
title: 
keywords: 
category : 网络
tags : [网络]
---
我记录的一些redis使用笔记
<!-- more -->

测试：
服务端：
docker pull redis
docker run -p 6379:6379 -d redis

客户端：
docker pull redis
docker run --rm -it redis bash

# redis-cli -h 192.168.31.212 -p 6379


使用docket部署，方便，默认端口6379。

安全性怎么保证？限制IP（微服务中不好做），添加密码

集群如何做？

哈希crc16(key)%16384设计的好处？2^14 = 16384

value长度限制？

MySQL如何与redis保持数据一致性？


扩展思考：
每种服务单独有的数据库？这种设计好还是不好？

