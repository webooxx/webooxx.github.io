<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<title>玩配色测运势 | 你在圣诞会收获什么？</title>
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<link rel="stylesheet" type="text/css" href="js/swiper.css">

	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
	<meta content="yes" name="apple-mobile-web-app-capable">
	<meta content="black" name="apple-mobile-web-app-status-bar-style">
	<meta content="telephone=no" name="format-detection"> 

</head>

<body id="body">


<div id="loading">

	<div class="spinner">
	    <div class="double-bounce1"></div>
	    <div class="double-bounce2"></div>
	    <div id="rate">&nbsp;</div>
	</div>

</div>

<div class="panel panel-init">
	
	
	<div class="help" ></div>
	<div class="mask" ></div>

	<div class="panel-init-wrap">
		
		<div class="panel-init__header">
			<a href="javascript:void(0);" class="panel-init__button-info"></a>
			<a href="javascript:void(0);" class="panel-init__button-test"></a>
		</div>

		<div class="panel-init__paper">
			<div class="panel-init__canvas">
				<canvas width="468" height="694" id="canvas-init" class="canvas-component canvas-init"></canvas>
			</div>
		</div>
		<div class="panel-init__tools">
		</div>
	</div>

	<div class="panel-init__colors">
		<a class="panel-init__colors__arrow-left"></a>
		<a class="panel-init__colors__arrow-right"></a>
		<div class="swiper-container panel-init__colors__container">
    		<div class="swiper-wrapper panel-init__colors__wrap">
    		</div>
    	</div>
	</div>
	

</div>

<div class="panel panel-info">
<section id="info">

    <section class="info-title">
        <img class="info-title-img" src="img/title-2x.png" alt="title">
    </section>
    <hr class="info-hr">
    <section>
        <img class="info-desc-img" src="img/rule.png">
        <img class="info-bear-img" src="img/bear.png">
    </section>
    <hr class="info-hr">
    <section class="info-bottom">
        <img src="img/qrcode-text.png" class="info-bottom-qrcode-text">
        <img src="img/qrcode.png" class="info-bottom-qrcode">
        <a href="javascript:void(0)" onclick="$('.panel-init').triggerHandler('displayPanel')" class="info-a">
            <img src="img/backtogame.png"  class="info-a-img">
        </a>
        <img src="img/deadline.png" class="info-bottom-deadline">
    </section>
    <section class="info-arrow"></section>
    
</section>
</div>

<div class="panel panel-test">

	
	<div class="save" style="display: none;"></div>

	<img src="img/icon.jpg" class="img" id="canvas-img">
	
</div>
<img src="img/l1.png" id="flash" style="display: none;">

<script type="text/javascript" src="js/zepto.min.js"></script>
<script type="text/javascript" src="js/swiper.min.js"></script>
<?php 
	// $arr = array('bear','blue','bobo','tietie','wang');
$arr = array('tietie');
	$idx = rand(0,count($arr)-1);
	echo '<script type="text/javascript" src="js/draw-'.$arr[$idx].'.js"></script>';
?>

<script type="text/javascript" src="js/index.min.js"></script>



<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?4f2dd498a4b01d4acebcf97ebacc7023";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();


</script>
</body>
</html>
