---
layout: post
title: 'Tianchi first opencv(1/n)'
date: 2020-09-14
author: lczxxx123
cover: '/assets/img/posts/IMG_1479.jpg'
tags: ML tianchi opencv
---
<img src='/assets/img/posts/IMG_1479.jpg' align='center' width = "30%" />

> [零基础入门CV - 街景字符编码识别](https://tianchi.aliyun.com/competition/entrance/531795/introduction)

> 这次来做第二题。

#### 准备
论坛里的指南还挺详细的，本来还打算直接上mnist的模型，~~先按照论坛做一下吧。~~

不大行，题解是torch的，要研究的是tf的，不对口啊

只能硬着头皮上了。

### tf-docker 哪里搞
ai脊柱大赛这里有[手把手的热心教学，爱了](https://tianchi.aliyun.com/competition/entrance/531796/tab/205)

注意事项：baseline代码示例中使用的TensorFlow版本为1.15

处理训练集与测试集图片数据
```bash
1.1 下载镜像：docker pull registry.cn-shanghai.aliyuncs.com/tcc-public/intel_az:0.1
1.2 进入docker ：docker run -it registry.cn-shanghai.aliyuncs.com/tcc-public/intel_az:0.1 bash
1.3 进入目录 /opt/work/BF16_examples/tensorflow/tianchi_spines2020/samples/tianchi
1.4 修改文件dataproduce.py, trainPath="/path/to/training/data/folder", jsonPath="/path/to/training/data/annotation.json", resultfile="/opt/work/BF16_examples/tensorflow/tianchi_spines2020/data/sample_result.csv"
1.5 运行dataproduce.py生成训练集csv文件: python dataproduce.py
1.6 修改文件dataproduce.py, trainPath="/path/to/validation/data/folder", jsonPath="/path/to/validation/data/annotation.json", resultfile="/opt/work/BF16_examples/tensorflow/tianchi_spines2020/data/sample_result_val.csv"
1.7 运行dataproduce.py生成测试集csv文件: python dataproduce.py
生成训练集与测试集的npy文件:运行generate_ndarray_data.py: python generate_ndarray_data.py
训练模型:运行train_spines_orca.py: python train_spines_orca.py
```
~~这个markdownstyle的配色是真丑~~

>CPU赛道镜像中包含基于Analytics Zoo的改写的初赛baseline代码。该代码利用了阿里云提供的基于第三代智能英特尔® 至强® 可扩展处理器的bfloat16指令加速，可以加速选手模型的训练。Analytics Zoo支持TensorFlow和PyTorch，选手可以根据自己熟悉的框架来查看相应的baseline代码，并根据下面提供的相应命令行直接运行baseline代码。

不知道能不能在本地跑，不带英特尔cpu应该只是不触发加速吧。

等这个做完去下tf官方的吧`docker pull tensorflow/tensorflow:1.15.0-py3`

[tensorflow的baseline](https://tianchi.aliyun.com/forum/postDetail?spm=5176.12586969.1002.78.46026015UoLTtk&postId=118958)

>先mark上，脊柱的后面做吧。

### 回到街景字符编码识别上