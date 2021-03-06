---
layout: post
title: 'Tianchi docker'
date: 2020-09-13
author: lczxxx123
cover: '/assets/img/posts/IMG_0505.jpg'
tags: ML tianchi docker
---
<img src='/assets/img/posts/IMG_0505.jpg' align='center' width = "30%" />
> 感觉还是有个比赛会有动力点 [官网](https://tianchi.aliyun.com/)

## 入门

先做一个[docker练习场](https://tianchi.aliyun.com/competition/entrance/231759/tab/174)

## Docker
[Ubuntu 20.04 LTS 安装 Docker](https://blog.csdn.net/netgc/article/details/105902354)

[官网介绍：Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

### 卸载旧的 + 装依赖
```bash
$ sudo apt-get remove docker docker-engine docker.io containerd runc
$ sudo apt-get update
```

### 装新的仓库，本来的仓库不够
```bash
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo apt-key fingerprint 0EBFCD88
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```
然后开始装
```bash
$ apt-cache madison docker-ce

  docker-ce | 5:18.09.1~3-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
  docker-ce | 5:18.09.0~3-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
  docker-ce | 18.06.1~ce~3-0~ubuntu       | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
  docker-ce | 18.06.0~ce~3-0~ubuntu       | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
```
选一个版本号<VERSION_STRING> = 5:18.09.1~3-0~ubuntu-xenial
```bash
$ sudo apt-get install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io
```
### 如果网不行，添加镜像
echo没权限的话可以直接`sudo vim`
```bash
sudo echo '
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://reg-mirror.qiniu.com",
    "https://registry.docker-cn.com"
  ]
}
' > /etc/docker/daemon.json
```
### Test
```bash
$ sudo docker run hello-world
```

## 开写

<img src='/assets/img/posts/wxjt_20200913223549.png' align='left' width = "100%" />

### 找到一个靠谱的[代码](https://tianchi.aliyun.com/forum/postDetail?postId=96684)

```python
import json
import pandas as pd
result = {
    "Q1": "Hello world",
    "Q2": 1,
    "Q3": [1]
}
df = pd.read_csv('/tcdata/num_list.csv', header=None)
result['Q2'] = int(df.sum()[0])
x = list(df.sort_values(df.columns[0], ascending = False)[df.columns[0]].values[0: 10])
result['Q3'] = [int(a) for a in x]
print(result)
with open('result.json', 'w') as f:
    json.dump(result, f)
```
得学习一下pd的使用了，应该可以省掉很多事情

### 提交
<img src='/assets/img/posts/133cefac9fd9244db21d9ea5278bde2.png' align='left' width = "100%" />

提交完成。生成入口脚本run.sh，放置于镜像工作目录。运行后生成结果result.json放置于工作目录（与run.sh同目录），评分系统将根据result.json进行打分。

### 好久没用docker了，借这个机会回忆了一下

1. `docker image ls` 和 `docker ps -a` 看一下**image和容器**

2. 要**删除**image需要 `docker stop 容器Id` + `docker rm 容器Id` + `docker image rm imageId` 

3. 创建并**进入**容器去操作：
`docker run -i -t imageId /bin/bash`

4. **进入***已有*容器：
`docker attach 容器Id`

5. 修改完容器后**提交**为image
`docker commit -m "upload python.py" 容器Id 仓库:版本号`

6. **拷贝**东西：
`docker cp xxx xxx`，docker地址为`容器Id:地址`

### Dockerfile
RUN多个命令的时候记得用`&&` 或者`; `分割开命令

```bash
FROM centos
RUN yum install wget
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz"
RUN tar -xvf redis.tar.gz
以上执行会创建 3 层镜像。可简化为以下格式：
FROM centos
RUN yum install wget \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && tar -xvf redis.tar.gz
```
