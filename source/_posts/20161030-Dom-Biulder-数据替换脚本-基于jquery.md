---
title: Dom Biulder 数据替换脚本 基于jquery
date: 2011-03-02 09:30:00
tags: [JS,小工具,jQuery]
---

这个函数其实可以写在makeDome里面，目前只是变量替换，以后实现语法分析就能对数组、对象进行支持了。

````javascript
//语法：$.makeDom( str,data,reg)
//参数：str 字符格式的带有标记的原始文本, data {name:value} ,reg 可选的替换模式
//返回：string
// 2011-02-28 XZH   目前只实现了字符变量的传递。数组、循环还需要努力啊。

$.dataReg = function(str,data,reg){

　　var reg = reg || /\%([a-z]+)\%/g ;

　　var rep = function(){

　　return typeof data[arguments[1]] == 'string' ? data[arguments[1]]  : arguments[0] ;

　　}

　　return str.replace(reg,rep);

}
````
````javascript
//配合上文的makeDom示例2   
 var d = {
      username:'用户名',
      userinfo: '用户信息'
 }
 $('.baseinfo').text( $.dataReg( $('.baseinfo').text(),d ) );
 ````



 差点忘了，还有 $('.baseinfo')的dom结构

 ````
 {tag:'span',cls:'baseinfo',txt:'%username%在线',nvs:{title:'%userinfo%'}}
 ````
