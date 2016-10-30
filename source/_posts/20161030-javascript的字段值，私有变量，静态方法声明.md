---
title: javascript的字段值，私有变量，静态方法声明
date: 2012-02-21 14:30:00
tags: [JS,面向对象]
---

````javascript
function newClass(){
    this.firstName = "Frank";    
        //    声明了一个实例字段，必须 new 本对象后， new newClass().firstName 才能访问。
        //    newClass.firstName 无法访问
    var lastName="Zammetti";    
        //    声明了一个私有变量，只能在本对象内部访问；
    this.getLastName =  function(){    
        //    声明了一个实例字段，是一个匿名函数，作用域在当前对象内。
        //    相对于 new newClass() 的对象说，这个匿名函数在其内部
        return lastName;
    }
    this.getId =  function(){    
        return this.id;             
        //    无法获得值，因为this指向的nc没有id这个属性。
        //    return id 也无法得到，因为在匿名函数内，匿名函数外都没有 id 这个变量
    }
}
newClass.id = 1;            //    声明对象一个静态方法；无法被实例出来；
newClass.prototype.pid = 9;    //    在原型链上声明一个属性，实例后可以获得

var nc = new newClass();    //    返回实例对象
alert(nc.firstName);        //    得到实例对象的一个字段
alert(nc.lastName);
alert(nc.getLastName());     //    执行实例对象的一个方法
alert(nc.id);                 //
alert(nc.getId());             //    执行实例对象的一个方法，无法获得newClass.id的值
alert(nc.pid);                 //    虽然没有声明，但是可以通过原型链得到这个字段属性
````
