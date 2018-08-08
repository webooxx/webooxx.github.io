---
title: 在access_log中查询作弊请求
date: 2017-05-31 11:48:16
tags: linux,sh,http,日志,access_log
---

## 引子

有个业务有投票功能，没有做用户限定（登录用户才可以投票），果然有人刷票了，服务器是一个集群，有4个单元，有近30天的访问日志要去查询。


先看看日志文件：

````sh
ls -al acc*

# 结果输出

access_log           
...            
access_log.20170529  access_log.20170530
````
## 一、vim access_log 分析具体请求

得到一个正则

````js
%s/expo_praise\/id\/417//gn
````

## 二、  grep 查询并且统计

可以看到当天的日志里面有86个请求

````sh
grep 'expo_praise/id/417' access_log  | wc -l

# 结果输出

86
````


## 三、 组合命令，统计每天的日志

版本1: 直接列出所有结果

````sh
find . -name "acc*" -exec grep -c "expo_praise/id/417"  {} \;

# 结果输出

86
0
...
281
870
878
729
````

版本2: 把文件名也输出出来
````sh
find . -name "acc*" | xargs  grep -c "expo_praise/id/417"

# 结果输出

/access_log:86
./access_log.20170509:0
...
./access_log.20170527:281
./access_log.20170528:870
./access_log.20170529:878
./access_log.20170530:729
````

另一种笨一点的实现，想直接给出个csv格式，后续方便用excel看到图表


````sh
find . -name "acc*" | awk '{print "echo -n "$0" && echo -n , && cat " $0 " | grep \"expo_praise/id/417\" | wc -l "}' | sh

# 结果输出

/access_log,86
./access_log.20170509,0
...
./access_log.20170527,281
./access_log.20170528,870
./access_log.20170529,878
./access_log.20170530,729
````
## 四、 命令总览&技巧总结

- find
  - find 命令可以直接 -exec 执行一条命令
  - {} 花括号是find的每行记录？
  - 命令格式结尾需要 \\;
- xargs
- grep
  - grep 可以直接使用 -c 获得匹配结果行数统计
- awk
  - 如果匹配出来的结果要再次进行处理的话，使用管道都不好使，最好就是拼好所有的命令最后管道给sh执行

如下，awk 不带 sh 的结果：

````sh
find . -name "acc*"   | awk '{print "echo -n "$0" && echo -n , &&  cat " $0 " | grep \"expo_praise/id/417\" | wc -l "}'

# 结果输出

echo -n ./access_log && echo -n , &&  cat ./access_log | grep "expo_praise/id/417" | wc -l                         
echo -n ./access_log.20170509 && echo -n , &&  cat ./access_log.20170509 | grep "expo_praise/id/417" | wc -l
...      
echo -n ./access_log.20170530 && echo -n , &&  cat ./access_log.20170530 | grep "expo_praise/id/417" | wc -l
````

 这种思路非常棒，先得到一个 sh 的内容再去执行！
