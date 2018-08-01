---
layout: post
title: 
keywords: 
category : 网络
tags : [网络]
---
本文介绍利用github pages搭建jekyll博客系统的过程。
<!-- more -->

## 简介
基于github pages+jekyll搭建博客，是一种比较方便部署的方式，有几个好处：

1、在本地编写文章后，直接推送到github仓库，即可完成文章的发布。

2、文章使用markdown编写，目前很多博客系统都支持markdown，通用性好。

3、免费空间托管。

4、如拥有自己的域名，可通过cname方式，将自己域名与github pages地址进行映射，从而形成自己的博客网站。如果同一个域名设置了二级域名cname映射，理论可拥有很多很多个博客网站。

## 创建步骤
* 首先要申请注册github账号（地址：<https://github.com>），然后建立名为<主页名称>.github.io的仓库，如本文注册的账号是lierch，则要创建的仓库名称为lierch.github.io。注意，主页名与github账号名必须要完全一致，才能使用xxx.github.io的形式，否则无法使用这种形式，也无法使用域名cname来映射（但是，即使不是这种形式，也能访问，但地址要修改）。

* 克隆别人现成的jekyll主题模板到这个仓库，或者fork别人的模板仓库，比如本文使用的模板是<https://github.com/Gabriel-Chen/Nice_Blog>。网上有很多jekyll模板供下载。
* 根据实际情况修改模板文件（下文将提到）。
* 编写markdown格式的文件，根据主题不同，该文件所在目录不同，一般都会有_posts目录下。然后将所有的修改提交到自己的github仓库（常规的git操作步骤），稍等片刻，即可在https://<主页名称>.github.io/上看到博客内容。比如https://lierch.github.io/
* 注意，文章名称必须以“年-月-日-文章名.md”命名（月、日要补齐2位，比如“2018-05-13-搭建github pages+jekyll博客”），且“-”必须是英文字符。文章为markdonw格式，内容必须按markdonw格式要求编写。否则无法解析。
* 设置cname域名，该操作需要在域名后台自行设置，比如阿里云或腾讯云域名后台，本文在后台设置latelee.org域名的二级域名i为lierch.github.io。

## jekyll相关
jekyll首页：<https://jekyllrb.com/>。jekyll主题：<http://jekyllthemes.org/>

## 整改模板
不同人喜爱不同，对于模板，少不了会自己修改一翻，具体到网上搜索，本文有空再补充。
* 修改_config.yml文件，将网站名称、URL和其它信息改为自己的。
* 
# 小结
笔者使用本文的方法建立了很多个网站，其中一之是：<https://i.latelee.org>，源码仓库为：<https://github.com/lierch/lierch.github.io>。欢迎访问使用，但勿将里面的文章作它用。