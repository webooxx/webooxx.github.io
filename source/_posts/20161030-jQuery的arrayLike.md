---
title: jQuery的arrayLike
date:  2011-12-08 17:45:00
tags: [JS,小工具,jQuery,jQuery原理]
---

jquery的链式调用很是喜欢，想模拟一个，发现了一个很奇特的事。

那就是jquery查询DOM返回的是一个[]

````javascript
$('body')
[
<body>​…​</body>​
]
````

仔细检查了$这个函数。

````javascript
jQuery = function( selector, context ) {
        return new jQuery.fn.init( selector, context );
}

jQuery.fn = jQuery.prototype = {
    init: function( selector, context ) {
....
````

再检查 $.fn 时就囧了。

$.fn 返回的是 []
 。。。
仔细把无用的属性排除后


````
a = {
    length: 0,
    splice: [].splice
}
````

a 也是一个 [] 了~

网上一搜索 arrayLike 发现还是有蛮多的资料。。
