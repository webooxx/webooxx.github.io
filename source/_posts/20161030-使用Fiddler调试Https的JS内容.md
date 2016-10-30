---
title: 使用Fiddler调试Https的JS内容
date: 2012-10-18 15:37:00
tags: [WEB开发,调试工具,fiddler]
---
要抓取走HTTPS的JS内容，Fiddler必须解密HTTPS流量。但是，浏览器将会检查数字证书，并发现会话遭到窃听。为了骗过浏览器，Fiddler通过使用另一个数字证书重新加密HTTPS流量。Fiddler被配置为解密HTTPS流量后，会自动生成一个名为DO_NOT_TRUST_FiddlerRoot的CA证书，并使用该CA颁发每个域名的TLS证书。若DO_NOT_TRUST_FiddlerRoot证书被列入浏览器或其他软件的信任CA名单内，则浏览器或其他软件就会认为HTTPS会话是可信任的、而不会再弹出“证书错误”警告。

![fillder工具栏](/images/fiddler-1.jpg)
![fillder工具栏](/images/fiddler-2.jpg)

点完，ok 之后，会弹出一个框提示你是否安装证书，直接确定就好了。
