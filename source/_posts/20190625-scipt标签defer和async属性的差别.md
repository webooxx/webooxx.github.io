---
layout: post
title: scipt标签defer和async属性的差别
tags:
  - JS
originContent: |-
  async属性表示script内容下载执行和文档的内容没啥关系，我脚本下载好了就自己开始执行了，咱们两异步并行。

  deffer属性也是可以让脚本异步并行下载，不同的是，即使脚本下载完成了，也要等到DOMContentLoaded之后再开始执行。


  ![async与deffer](/images/deffer-async.jpg)
categories:
  - 每日Tips
toc: true
date: 2019-06-25 09:50:00
---

async属性表示script内容下载执行和文档的内容没啥关系，我脚本下载好了就自己开始执行了，咱俩异步并行。

deffer属性也是可以让脚本异步并行下载，不同的是，即使脚本下载完成了，也要等到DOMContentLoaded之后再开始执行。

具体流程见下图


![async与deffer](/images/deffer-async.jpg)
