---  
layout: post  
title: 
keywords:   
category : docker容器  
tags : [docker]  
---  
## 背景及分析
MySQL容器启动时，会自动创建一些必要的数据库，比如mysql。这是官方默认的做法。但是，我们还需要创建自定义的数据库。

一般做法是，启动容器并挂载数据目录后，使用MySQL客户端连接服务器，再手动输入sql语句创建（或导入.sql文件），另外还可以直接在容器内创建（方法同上），由于挂载了数据目录，因此可持久化保存。这些方法在部署数据库比较繁琐，不方便。

如果能在MySQL容器启动时，自动执行我们自己的.sql文件，就不需要那么麻烦了，其实MySQL容器的启动脚本已经考虑了这种场合。通过MySQL镜像构建脚本docker-entrypoint.sh（参考：https://github.com/docker-library/mysql/blob/fc3e856313423dc2d6a8d74cfd6b678582090fc7/5.7/docker-entrypoint.sh
），发现如下语句：
```
for f in /docker-entrypoint-initdb.d/*; do
    process_init_file "$f" "${mysql[@]}"
done
```
process_init_file函数定义如下：
```
process_init_file() {
	local f="$1"; shift
	local mysql=( "$@" )

	case "$f" in
		*.sh)     echo "$0: running $f"; . "$f" ;;
		*.sql)    echo "$0: running $f"; "${mysql[@]}" < "$f"; echo ;;
		*.sql.gz) echo "$0: running $f"; gunzip -c "$f" | "${mysql[@]}"; echo ;;
		*)        echo "$0: ignoring $f" ;;
	esac
	echo
}
```
从中知道，将需要执行的文件（如.sh或.sql）放到/docker-entrypoint-initdb.d目录下，那么docker-entrypoint.sh就会自动执行。明白了原理，解决方案就十分简单了。

## 解决方案

### Dockerfile
内容如下：
```
FROM mysql:5.7
COPY sql/*.sql /docker-entrypoint-initdb.d/
```
为了方便起见，所有.sql文件都放到Dockerfile同级的sql目录。

### 准备好sql文件
下面是测试用的.sql文件，文件名为test.sql，内容如下：
```
-- 创建db_test数据库
create database `db_test` default character set utf8 collate utf8_general_ci;
 
use db_test;
 
-- 创建用户表
DROP TABLE IF EXISTS `user`;
 
CREATE TABLE `user` (
 `id` bigint(20) NOT NULL,
 `email` varchar(255) DEFAULT NULL,
 `first_name` varchar(255) DEFAULT NULL,
 `last_name` varchar(255) DEFAULT NULL,
 `username` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
 
-- 插入数据
INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `username`)
VALUES(0,'li@latelee.org','Late','Lee','latelee');
```

### 创建镜像
```
docker build -t mysqltest .
```

### 容器启动
docker-compose.yml文件内容如下：
```
version: '2'
services:
  database: 
    image: mysqltest
    #image: singula/mysql
    container_name: mysql
    ports:
      - "3406:3306"
    volumes:
      - ./mysql_data:/var/lib/mysql
      - /home:/home
    environment:
      MYSQL_ROOT_PASSWORD: 123456
```
使用下列命令启动：
```
docker-compose up -d
```


## 实践指导
在.sql脚本中，也可以创建账号、密码，这样就不用在docker-compose文件指定环境变量了。起到了一定的保护作用。
