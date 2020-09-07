---
layout: post
title: 'Hello Jekyll'
date: 2020-09-06
author: lczxxx123
cover: '/assets/img/posts/IMG_3653.jpg'
tags: jekyll
---

> 找了很久终于找到一个基本符合心理预期的 [kaeyleo/jekyll-theme-H2O](https://github.com/kaeyleo/jekyll-theme-H2O)

> readme的步骤也算很清晰了

### Welcome

希望一个月后这个网页没有荒废掉 🙄
### Note


1. 当用自己域名的时候记得在/CNAME添加域名，不然解析会不成功
2. bundle install出现版本问题的时候如果有gem.lock的直接到gem.lock里面去更改版本
3. 出现找不到路径 _**git -l -z**_ 什么的是因为没有安装命令行git命令，根据错误日志可以定位到相关的gem配置行号

## 更改

1.给除了index.html之外都加上头图

{% raw %}
    style="{% if page.header-img %}background: url({{ page.header-img \| relative_url }}) no-repeat center center; background-size: cover;{% endif %}"
{% endraw %}

加上这个就行，就可以通过在页面头部加入header-img属性来添加头图,所以在jekyll中，page代表当前页面，页面的域var在最开头进行了定义，下面用两个花括号进行引用。