---
title: Dom Builder - 基于jquery
date: 2011-02-25 14:12:00
tags: [JS,小工具,jQuery]
---

搜索了下，貌似只有prototype的dom builder ；貌似项目的IM用的是JQ的，所以为JQ写了个DOM BIULDER。


效率上考虑，如果要更快的话可以替换掉 操作DOM对象的函数

1. 对象创建   $('<'+tpl.tag+'>'),返回一个 jq 格式的dom对象，换成 document.createElement  就行
2. 对象添加  $(obj).appendTo(parent) 将obj添加至parent，同时返回obj，这个可能不能直接用原生的 appendChild 方法，得自己去做一个
3. 文本创建 $(obj).text( string ) 替换 createTextNode
4. 样式添加 $(obj).addClass( string )
5. 属性添加 $(obj).attr( json )



## 实现代码

````javascript
//语法：$.makeDom( json)  
//参数：JSON格式的对象  
//返回：jquery格式的dom对象  
// 2011-02-25 XZH

$.makeDom = function (d){
 var parent;
 var s= function s(d,parent){
  var c = $( '<'+d.tag+'>' );
  if(d.cls){c.addClass(d.cls);}
  if(d.txt){c.text(d.txt);}
  if(d.nvs){c.attr(d.nvs);}
  if(!parent){var parent=c;}
  else{var parent=c.appendTo(parent);}
  if(d.children){for(var i=0;d.children[i];i++){s(d.children[i],parent);}}
  return parent;
 };
 return s(d);
}
````

## 参数约定：

```` javascript
 { tag:'标签',cls:'快速样式',txt:'文本内容', nvs:{名:值,名:值} ,children:[ {...} ] }
````

## 示例：

```` javascript
talkbox  =  {
     tag:'div',cls:'talkbox',
     children:[
      {
       tag:'div',cls:'titlebar',
       children:[
        {tag:'div',cls:'avatar'},
        {tag:'div',cls:'ctrlbtns'},
        {tag:'div',cls:'talktitle'}
       ]
      },
      {tag:'div',cls:'viewmsgarea'},
      {tag:'div',cls:'toolsbar'},
      {tag:'textarea',cls:'inputmsgarea',txt:'在此输入消息'},
      {tag:'input',cls:'sendmsgbutton',namevalue:{type:'button',value:'发送消息'} }
     ]
    }


$.makeDom( talkbox )
````

## 返回：

````html
[<div class=​"talkbox">​
<div class=​"titlebar">​…​</div>​
<div class=​"viewmsgarea">​</div>​
<div class=​"toolsbar">​</div>​
<textarea class=​"inputmsgarea">​在此输入消息​</textarea>​
<input class=​"sendmsgbutton">​
</div>​]
````
