

function compare(propertyName) { 
	return function (object1, object2) { 
	var value1 = object1[propertyName]; 
	var value2 = object2[propertyName]; 
	if (value2 < value1) { 
	return -1; 
	} 
	else if (value2 > value1) { 
	return 1; 
	} 
	else { 
	return 0; 
	} 
	} 
} 

var load = function () {

		var imgs = [
'img/arrow-left.png',
'img/arrow-right.png',
'img/arrow.png',
'img/back-img.png',
'img/backtogame.png',
'img/bear.png',
// 'img/bg-0.jpg',
// 'img/bg-06.jpg',
// 'img/bg-1.jpg',
// 'img/bg-2.jpg',
// 'img/bg-3.jpg',
// 'img/bg-4.jpg',
// 'img/bg-5.jpg',
// 'img/bg-7.jpg',
// 'img/bg-8.jpg',
// 'img/bg-9.jpg',
'img/button-info.png',
'img/button-revert.png',
'img/button-test.png',
'img/deadline.png',
'img/help.png',
'img/icon.jpg',
'img/line.png',
'img/paper.png',
'img/qrcode-text.png',
'img/qrcode.png',
'img/rule.png',
'img/save.png',
'img/selected.png',
'img/testing.png',
'img/title-2x.png'
		];

		var max = imgs.length;
		var loaded = 0;

	    function checkLoad() {

	    	loaded+=1;

	        $('#rate').text(  (( (loaded / max)*10000 / 100)>>0 ) + '%' );

	        if(max  > loaded){
	        	$('<img style="display:none">').attr('src', imgs.pop() ).on('load', checkLoad);
	        }else{
	        	$('#loading').remove();
	        }
	    }
	    $('<img>').attr('src', imgs.pop() ).on('load', checkLoad);
	}
	$('#rate').text( '1%' );

	setTimeout(load,200);

$(function () {

	var initColors = function(){

		//	初始化色盘
		var arrColor = ['e94441','e94966','f3a7d7','f3a7b3','f08643','f5c126','f4e5da','e1b390','e09d60','84563a','a0534d','000000','22522a','4b8237','79a32c','93d3e0','83c3f4','354b8b'];
		var html = [];
		for(i=0;i<arrColor.length;i++){
			var color = arrColor[i];
			html.push('<div class="swiper-slide" ><a class="panel-init__colors__item" style="background-color:#'+color+'" data-color="'+color+'"></a></div>');
		}
		$('.panel-init__colors__wrap').html(html.join(''));

		//	调整色盘容器宽度可以放下整数的颜色
		$('.panel-init__colors__container').each(function(){
			$(this).width( $(this).width() - $(this).width()% 60 );
		})

		var colorSwiper = new Swiper('.swiper-container',{
			loop:true,
			slidesPerGroup:6,
			slidesPerView: 6,
		});

		//	翻页处理
		$('.panel-init__colors__arrow-left').on('click', function(e){
			e.preventDefault()
			colorSwiper.swipePrev()
		})
		$('.panel-init__colors__arrow-right').on('click', function(e){
			e.preventDefault()
			colorSwiper.swipeNext()
		})

		// 颜色选中
		$(document).on('touchstart','.panel-init__colors__item',function(){
			$('.panel-init__colors__item').removeClass('panel-init__colors__item_status_selected');
			$(this).addClass('panel-init__colors__item_status_selected');
		});

		$('.panel-init__colors__item').eq(6).addClass('panel-init__colors__item_status_selected');
	}

	var initPaperMargin = function(){

		var warpHeight = $('.panel-init-wrap').height() ;
		var headerHeight = $('.panel-init__header').height() ;
		var paperHeight = $('.panel-init__paper').height() ;
		var toolsHeight = $('.panel-init__tools').height() ;
		var colorsHeight = $('.panel-init__colors').height();

		$('.panel-init__paper').css('margin-top',(warpHeight-headerHeight-paperHeight-toolsHeight-colorsHeight)/2 );

	}



	
	var component = draw($('.panel-init__canvas'),$('#canvas-init')[0]);


	var hashComponentColor = function( component , max){

			var colors = [];
			for(i=0;i<component.length;i++){
				colors.push(component[i].fillStyle);
			}
			var int = 0;
			colors = colors.join('').replace(/#FFFFFF/g,'').replace(/#/g,'');
			for(i=0;i<colors.length;i++){
				int += colors.charCodeAt(i)	;
			}
			return  int%max;
	}


		$('.panel-init__paper').on('touchstart',function(e){


			//	点击指示器
			if($(
					e.target).hasClass('panel-init__colors__arrow-right')
					||$(e.target).hasClass('panel-init__button-test')
					||$(e.target).hasClass('panel-init__button-info')
				){
				return true;
			}


			if($(e.target).hasClass('panel-init__colors__item')){
				
				var color ='#'+ $(e.target).attr('data-color');
				var cTip = $('<div class="colorTip">').css('background-color',color);
				setTimeout(function(){
					 $('.panel-init').append(cTip);
				},20);
				setTimeout(function(){
					 $(cTip).remove();
				},1020);

				// var o = $(e.target).offset();
				// var x = o.left + o.width/2;
				// var y = o.top + o.height/2;

				// console.log(o,$(e.target));
			}
			var x = e.changedTouches[0].pageX;
			var y = e.changedTouches[0].pageY	

			// console.log(x,y);
				
			
			var tip = $('<div class="tapTip">').css('left',x+'px').css('top',y+'px');
			setTimeout(function(){
				 $('.panel-init').append(tip);
			},100);
			setTimeout(function(){
				 $(tip).remove();
			},1100);



		})
	//	画图初始页
	$('.panel-init')
		.on('displayPanel',function(){
			$('body').css("overflow",'hidden').css('background-image','');;
			$('.panel').hide();
			$(this).show();

		})
		.on('init',function(){
			//	各种初始化操作(一次性)
			initColors();
			initPaperMargin();
		})
		
		//	小熊点击处理
		.on('touchend',function(e){
			//	如果是从 颜色上拖起的
			var pos = {
				x : e.changedTouches[0].pageX,
				y : e.changedTouches[0].pageY,
			}
			//	元素位置
			var offset = $('.panel-init__canvas').offset();
			var min_x = offset.left;
			var max_x = min_x + offset.width;
			var min_y = offset.top;
			var max_y = min_y + offset.height;

			var isTap = ( pos.x >= min_x && pos.x <= max_x && pos.y >= min_y && pos.y <= max_y );

			var posForCanvas = {
				x: pos.x-min_x,
				y: pos.y-min_y
			}

			//	元素组件检测
			if(isTap && $('.panel-init__colors__item_status_selected').size() ){
				// console.log('canvas is tap !');
				var touchComponent = [];
				for(i=0;i<component.length;i++){

					if(component[i].data && component[i].isTap( posForCanvas )){
						touchComponent.push(component[i]);
					}
				}
				touchComponent = touchComponent.length ? touchComponent[0].logicalAnalysisComponent(touchComponent) : [];
				if(touchComponent.length>0){
					var color = $('.panel-init__colors__item_status_selected').attr('data-color') || 'FFFFFF';
					for(i=0;i<touchComponent.length;i++){
						touchComponent[i].changeColor('#'+color);
					}
					touchComponent[0].callUpdate();
				}
			}
		})
		.triggerHandler('init');

	$('.panel-init .help').on('touchend',function(e){
		$(this).remove();
		e.stopPropagation();
		e.preventDefault();
		return false;
	})

	$('.panel-test')
		.on('displayPanel',function(){



			// return false;
			//	定义图
			var i =hashComponentColor(component,10)

			var canvas = $('<canvas>')[0];
			var context = canvas.getContext("2d");
//750 × 1206

	    	canvas.width = context.width = 750;
	    	canvas.height = context.height = 1206;

	    	var bgImg = new Image;
	    	bgImg.src="img/bg-"+i+'.jpg';


	    	$(bgImg).on('load', function(){

	    		context.drawImage(bgImg,0, 0,750, 1206,0, 0, 750, 1206)

	    		// 输出小熊
	    		// $('#canvas-init')[0].getContext("2d").fillStyle='rgba(255,0,0,.5)';
	    		// $('#canvas-init')[0].getContext("2d").fillRect(0,0, 234*2, 347*2);

				context.drawImage($('#canvas-init')[0],0,0, 234*2, 347*2,154, 318, 234*2, 347*2)
				

				$.post('u.php',{img:canvas.toDataURL()},function(x){

					var x = eval( '('+x+')');
					if(x.state == 'SUCCESS'){
						$('#canvas-img').attr('src',x.url);
					}else{
						$('#canvas-img').attr('src',canvas.toDataURL("image/png"));
					}
					$('#canvas-img').on('load',function(){

							$('.mask').remove();
							$('.panel').hide();
							$('.panel-test').show();
							$('body').css("overflow",'auto').css('background-image','');;

						
					})
				})
	    	})


		});

	//	按钮处理
	//	上一步
	// $('.panel-init__button-revert').on('click',function(){

	// 	if(canvasHistory.length >= 1){
	// 		var canvas = canvasHistory.splice(-1,1)[0];
	// 		var canvas_init = $('#canvas-init')[0];
 	// 			canvas_context = canvas_init.getContext("2d");
	// 		canvas_context.clearRect(0, 0, 234*2, 347*2);
	// 		canvas_context.drawImage(canvas,0, 0, 234*2, 347*2,0, 0, 234*2, 347*2)
	// 		$('.panel-init__button-revert').triggerHandler('updateStatus');
	// 	}
	// 	return false;
	// }).on('updateStatus',function(){
	// 	$(this).css('opacity',canvasHistory.length >= 1 ? 1 : .3)
	// }).triggerHandler('updateStatus');
	$('.panel-test .save').show().on('touchend',function(){
		$(this).remove();
	});
	$('.panel-info').on('displayPanel',function(){
			$('.panel').hide();
			$(this).show();
			$('body').css("overflow",'auto').css('background-image','url("img/back-img.png");');
		})
	//.triggerHandler('displayPanel')

	//	开始测试
	$('.panel-init__button-test').on('click',function(){
		$('.mask').show();
		$('.panel-test').triggerHandler('displayPanel');
		return false;
	})	
		//	我要小熊
	$('.panel-init__button-info').on('click',function(){
		$('.panel-info').triggerHandler('displayPanel');
		return false;
	})
		//	返回
	$('.panel-info__button-back').on('click',function(){
		return false;
	});


	
})