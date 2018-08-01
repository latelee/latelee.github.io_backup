---  
layout: post  
category : docker容器  
tags : [docker]  
---  
MySQL操作实例
<!-- more -->
运行容器，root密码为123456，镜像为singula/mysql
```
run --name hi-mysql -e MYSQL_ROOT_PASSWORD=123456 -d singula/mysql
```

进入容器：
```
docker exec -it hi-mysql  bash
```

在容器中进入mysql命令行：
```
mysql -uroot -p123456
```
成功提示：
```
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 11
Server version: 5.7.20 MySQL Community Server (GPL)

Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 
```
在`mysql> `后即可输入sql语句。sql语句使用分号“;”作为结束符号。

查看数据库：
```
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)
```

创建数据库，名称为singula：
```
mysql> CREATE DATABASE singula;

```
选择singula数据库：
```
mysql> USE singula;
```

创建数据表user：
```
mysql> CREATE TABLE `user` (
 `id` bigint(20) NOT NULL,
 `email` varchar(255) DEFAULT NULL,
 `first_name` varchar(255) DEFAULT NULL,
 `last_name` varchar(255) DEFAULT NULL,
 `username` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

查看user数据表字段内容：
```
mysql> DESC user;
+------------+--------------+------+-----+---------+-------+
| Field      | Type         | Null | Key | Default | Extra |
+------------+--------------+------+-----+---------+-------+
| id         | bigint(20)   | NO   | PRI | NULL    |       |
| email      | varchar(255) | YES  |     | NULL    |       |
| first_name | varchar(255) | YES  |     | NULL    |       |
| last_name  | varchar(255) | YES  |     | NULL    |       |
| username   | varchar(255) | YES  |     | NULL    |       |
+------------+--------------+------+-----+---------+-------+
5 rows in set (0.02 sec)
```

往user表插入数据：
```
mysql> INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `username`)
VALUES(0,'li@latelee.org','Late','Lee','latelee');
```

查看已经插入了的数据：
```
mysql>  SELECT * FROM user;
+----+----------------+------------+-----------+----------+
| id | email          | first_name | last_name | username |
+----+----------------+------------+-----------+----------+
|  0 | li@latelee.org | Late       | Lee       | latelee  |
+----+----------------+------------+-----------+----------+
1 row in set (0.00 sec)
```

删除user表所有数据：
```
mysql> DELETE FROM user;
```

删除user数据表：
```
mysql> DROP TABLE user;
```

删除数据库singula：
```
mysql> DROP DATABASE singula;
```

退出mysql命令行：
```
exit
```

退出容器：
```
exit
```
