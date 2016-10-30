/**
 * H5类对象
 */
var H5 = function( ){

	
	this.el = $('<div class="h5_wrap">').appendTo('body').hide();
	this.page = [];

	/**
	 * 新增一个页
	 * @param {String} name 页的名称，会以 h5_page_$name 的形式添加在对应页DOM的className上
	 * @return {H5}    H5对象，可以重复使用对象内的方法20
	 */
	this.addPage = function ( name ) {

		var count = this.el.find('.h5_page').size();
		var page = $('<div class="h5_page h5_page_'+count+' section" id="h5_page_'+count+'">');
		if(name){
			page.addClass('h5_page_'+name);
		}
		
		

		page.on('onLeave',function(){
			$(this).find('.h5_component').trigger('onLeave');
		}).on('onLoad',function(){
			$(this).find('.h5_component').trigger('onLoad');
		})
		this.page.push(page);
		this.el.append(page);


		this.addComponent('slide_up',{
				bg:'imgs/slide_up.png',
				css:{left:0,bottom:-20,width:'100%',height:'20px',zIndex:999},
				animateIn:{bottom:0,opacity:1},
				animateOut:{bottom:-20,opacity:0},
				delay:500
			})
		return this;
	}
	/**
	 * 新增一个组件
	 * @param {String} name 组件的名称
	 * @param {Object} cfg  组建的参数，如果没有指定 cfg.page 则以 H5 对象中最后一页为 Page
	 * @return {H5}    H5对象，可以重复使用对象内的方法
	 */
	this.addComponent = function ( name , cfg ) {

		var cfg  = cfg || {};
		cfg = $.extend(  {
			page : this.page.slice(-1)[0],
			type : 'base',
			text : '',
		}, cfg )

		var component ;
		switch (cfg.type ) {
			case 'bar' :
				component = new H5ComponentBar(name ,cfg);	//	柱图（水平）
			break;
			case 'bar_v' :
				component = new H5ComponentBar_v(name ,cfg);	//	柱图（vertical 垂直）
			break;
			case 'pie' :
				component = new H5ComponentPie(name ,cfg);	//	饼图
			break;
			case 'ring' :
				component = new H5ComponentRing(name ,cfg);	//	环图
			break;
			case 'point' :
				component = new H5ComponentPoint(name ,cfg);	//	散点图
			break;
			case 'polyline':
				component = new H5ComponentPolyline(name ,cfg);	//	散点图
			break;
			case 'radar':
				component = new H5ComponentRadar(name ,cfg);	//	散点图
			break;
			default :
				component = new H5ComponentBase(name ,cfg);	//	基本的图文组件
		} 

		cfg.page.append(component);
		return this;
	}
	/**
	 * H5对象初始化呈现
	 * @param  {Array} resources 需要加载的图片列表，加载完成后才会展现界面
	 * @return {H5}    H5对象
	 */
	this.imgs = null;
	this.imgs_count = 0;
	this.loader = function( resources ,base) {
		
		if( this.imgs ===null ){
			this.imgs = resources;
			this.base = base || 0;
			window._h5_object= this;

			for(  s in resources){
				var img = new Image;
				img.onload = function(){
					_h5_object.loader(1);
				}
				img.src = resources[s];
			}
			$('#rate').text( ((this.imgs_count / this.imgs.length * 100 )>>0) + '%');
		}
		if( resources == 1 ){
			this.imgs_count++;
			$('#rate').text( ((this.imgs_count / this.imgs.length * 100 )>>0) + '%');
		}
		if( this.imgs_count < this.imgs.length  ){
			return true;
		}

		$('.loading').remove();

		this.fullpage = this.el.fullpage({
			css3: true,
			verticalCentered:false,
	        onLeave:function(index , nextIndex , direction){
	        	$(this).parent().find('.h5_page').eq(index-1).trigger('onLeave');
	        	
	        },
	        afterLoad:function( anchorLink , index ){
				$(this).parent().find('.h5_page').eq(index-1).trigger('onLoad');
	        }
    	});

		this.page[0].trigger('onLoad');
		this.el.show();
		$.fn.fullpage.moveTo( this.base );
	}
	return this;
}



/**
 * 基本组件（图像和文本块）
 *  - 实例化后直接返回一个 DOM
 *  - 共享基本的 h5_component_base 样式类
 *  - 有2个事件入口，afterLoad、onLeave；
 */
var H5ComponentBase = function( name , cfg ){

	var cfg = cfg ||{};
 	var id = 'h5_c_' + Math.random();
 	var cls = 'h5_component_'+$.trim(cfg.type);	//	载入离开时会有对应样式改变,根据类型
 	var component  = $('<div class="h5_component '+cls+' h5_component_name_'+$.trim(name)+'" id='+id+'>');

 	cfg.text && component.text(cfg.text);

 	cfg.className && component.addClass(cfg.className);
 	cfg.css && component.css( cfg.css );
	cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');
 	cfg.width && component.width(cfg.width/2);
 	cfg.height && component.height(cfg.height/2);
 	if(cfg.center){
 		component.css({marginLeft:( cfg.width/4 * -1 )+'px',left:'50%'});
 	}
	
	if(cfg.onclick){
		component.on('click',cfg.onclick)
	}
 	//	当载入或者
	component
	.on('onLoad',function (evt) {
		cfg.delay && component.delay(cfg.delay);
		$(this).removeClass(cls+'_leave').addClass(cls+'_load');
		cfg.animateIn && $(this).animate( cfg.animateIn );
		evt.stopPropagation();
		return false;
	}).on('onLeave',function (evt) {
		$(this).removeClass(cls+'_load').addClass(cls+'_leave');
		cfg.animateOut && $(this).animate( cfg.animateOut );
		evt.stopPropagation();
		return false;
	});
	component.trigger('onLeave');
	return component;
}
// 饼状图
var H5ComponentPie = function( name ,cfg ){
	var component = new H5ComponentBase(name ,cfg);
	
	var per_count=0;
	var w = component.width()/2;

	//	输出每一条数据
	$.each(cfg.data,function(idx,item){

		var per = item[1] * 100;
		
		var pie = $('<div class="pie pie_per_'+per+'">');


		//	大于 50 的，使用2个 DOM 来操作
		if( per >= 50){
			
			var half_left = $('<div class="half left"></div>');
			var left_cover = $('<div class="cover"></div>');

			half_left.css('clip','rect(0, '+w+'px, auto, 0)');
			left_cover.css('clip','rect(0, '+w+'px, auto, 0)').css('-webkit-transform','rotate(0deg)')

			half_left.append(left_cover);


			var half_right = $('<div class="half right"></div>');
			var right_cover = $('<div class="cover"></div>');
			var deg = (item[1] * 360);

			half_right.css('clip','rect(0, '+w+'px, auto, 0)');
			right_cover.css('clip','rect(0, '+w+'px, auto, 0)').css('-webkit-transform','rotate('+deg+'deg) translateZ(0) ')
			half_right.append(right_cover);

			pie.append(half_left);
			pie.append(half_right);
		}else{
			//	小于 50 的，使用1个 DOM 来操作
			var half_left = $('<div class="half left"></div>');
			var left_cover = $('<div class="cover"></div>');

			var deg =  -180+(item[1] * 360);

			half_left.css('clip','rect(0, '+w+'px, auto, 0)');
			left_cover.css('clip','rect(0, '+w+'px, auto, 0)').css('-webkit-transform','rotate('+deg+'deg) translateZ(0) ')

			half_left.append(left_cover);
			pie.append(half_left);
		}

		// 如果有自定义颜色
		if(item[2]){
			pie.find('.cover').css('background-color',item[2]);
		}

		// 旋转调整这个数据的位置
		var deg = per_count*3.6;
		per_count+=per;
		pie.css('-webkit-transform','translateZ(0) rotate('+deg+'deg)');

		component.append(pie);
	});
	
	var deg_count = 0;
	var top_count = 0;

	//	输出所有的数据文本标注信息
	$.each(cfg.data,function(idx,item){

		per = item[1]*100;
		//	标注
		var mark  = $('<div class="mark"><div class="text"><div class="name">'+item[0]+'</div><div class="per">'+per+'%</div></div></div>');

		var deg = item[1]*360;
		
		var rotate  = (deg/2+deg_count-60);
		mark.css('-webkit-transform','translateZ(0) rotate('+rotate+'deg)');
		mark.find('.text').css('-webkit-transform','translateZ(0) rotate('+rotate*-1+'deg)');

		if(item[3]){
			mark.css('margin-top',item[3]+'px');
		}
		if(item[2]){
			mark.find('.text').css('background-color',item[2]);
		}

		deg_count += deg;
		component.append(mark);
	})

	//	动画层
	var animate = $('<div class="pie pie_pie_animate">');

	var half_left = $('<div class="half left"></div>');
	var left_cover = $('<div class="cover"></div>');

	half_left.css('clip','rect(0, '+w+'px, auto, 0)');
	left_cover.css('clip','rect(0, '+w+'px, auto, 0)')

	half_left.append(left_cover);

	var half_right = $('<div class="half right"></div>');
	var right_cover = $('<div class="cover"></div>');

	half_right.css('clip','rect(0, '+w+'px, auto, 0)');
	right_cover.css('clip','rect(0, '+w+'px, auto, 0)');

	half_right.append(right_cover);

	animate.append(half_left);
	animate.append(half_right);

	// animate.find('.cover').css('background-color',cfg.data[0][2] || '#000');
	component.append(animate);
	return component;
}

// 环状图
var H5ComponentRing  = function( name , cfg){
	cfg.type = 'pie';
	if(cfg.data.length > 1){
		cfg.data = [cfg.data[0]];	//	环状图只有一个数据
	}
	var obj = new H5ComponentPie(name,cfg);	//	直接改造饼状图
	var mask  = $('<div class="ring_mask">');

	obj.addClass('h5_component_ring')
	obj.append(mask);

	obj.find('.mark,.text').removeAttr('style');
	obj.find('.text').css('color',cfg.data[0][2]);

	return obj;
}
// 柱状图
var H5ComponentBar = function( name ,cfg ){
	var component = new H5ComponentBase(name ,cfg);
	
	$.each(cfg.data,function(idx,item){
		
		var per = item[1]*100 + '%';
		width = per;
		if(cfg.data[0][1] < .5){
			width= item[1]*200+'%';
		}
		var style = item[2] ? 'style="background-color:'+item[2]+'"' :'';
		var line = '<div class="line line_'+idx+'"><div class="name">'+item[0]+'</div>\
		<div class="rate" style="width:'+width+'"><div class="bg" '+style+'></div></div><div class="per">'+per+'</div></div>';
		component.append(line);
	})
	
	return component;
}
//	柱状图-垂直
var H5ComponentBar_v = function(name , cfg){
	var obj  = new H5ComponentBar(name,cfg);
	obj.addClass('h5_component_bar_v');
	var w = (100 / cfg.data.length )>>0;
	obj.find('.line').width(w+'%');

	//	把 width 分配到 height
	$.each(obj.find('.rate'),function(){
		var w = $(this).css('width');
		$(this).width('').height(w);	
	})
	return obj;
}
//	散点图
var H5ComponentPoint = function(name , cfg){
	var component = new H5ComponentBase(name ,cfg);

	var base = cfg.data[0][1]	//以第一个为100%;

	$.each(cfg.data,function(idx,item){
		

		var point = $('<div class="point point_'+idx+'"><div class="name">'+item[0]+'<div class="per">'+item[1]*100+'%</div></div></div>')

		point
			.width( item[1]/base*100+'%')
			.height( item[1]/base*100+'%');

		if(item[2]){
			point.css('background-color',item[2]);
		}
		if( item[3] && item[4] ){
			point.css({left:item[3]+'px',top:item[4]+'px'})
		}
		point.css('transition','all 1s '+ (.5*idx) +'s')
		component.append(point);
	})

	//	事件
	component.find('.point').on('click',function(){
		component.find('.point').removeClass('point_focus');
		$(this).addClass('point_focus');
	}).eq(0).addClass('point_focus');
	return component;
}

//	折线图
var H5ComponentPolyline = function(name , cfg){
	var component = new H5ComponentBase(name ,cfg);

 	var w = component.width()*2;
 	var h = component.height()*2;

 	//	加入画布 - 网格背景层
	var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    //	绘制网格 - 水平线
    var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#AAAAAA";
    for(var i=0;i<step+1;i++){
        var y = h/step*i;	//	移动 垂直 y轴，画 -
		ctx.moveTo(0,y);
        ctx.lineTo(w,y);
    }
    //	绘制网格 - 垂直线（根据项目的个数）
    step = cfg.data.length+1;	//	多画一列，标点从第1列开始
	for(var i=0;i<step+1;i++){
		var x = w/step*i;	//	移动 水平 x轴，画 |
	    ctx.moveTo(x,0);
	    ctx.lineTo(x, w);

	}  
    ctx.stroke();
    

	//	加入画布 - 数据层
	var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    //	绘制折现数据 - 放在函数中，方便动画调用
    var draw = function( per ){
    	//	清理画布
    	ctx.clearRect(0, 0, w, h);
    	var per = per || 1;
	    //	绘制折线数据
	    ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#338ded";
	    
		ctx.font = "bold 24px 微软雅黑";

		var row_w = w/(cfg.data.length+1);
		var coe = cfg.data[0][1] > .5 ? 1 : 2;	//	如果第一个数据小于.5，则全部*2显示

		ctx.moveTo(row_w,h-cfg.data[0][1]*h*coe*per);	//	移动到第一个点的位置

		var x = 0;
		var y =0
		$.each(cfg.data,function(i,item){
			
			x = row_w+row_w*i;			//	x 轴 为每列的标准位置
			y = h-item[1]*h*coe*per;		//	y 轴 为标准值*当前的数据，坐标系是反的，所以 h-
		    ctx.lineTo(x,y);

		})    
		ctx.stroke();

		//	绘制阴影
		ctx.lineTo(x, h);
	    ctx.lineTo(row_w,h);
	    ctx.fillStyle = "rgba(50,141,234,.5)";
	    ctx.closePath();
	    ctx.fill();

	    //	文字
	    ctx.beginPath();
		$.each(cfg.data,function(i,item){
			
			x = row_w+row_w*i;			//	x 轴 为每列的标准位置
			y = h-item[1]*h*coe*per;		//	y 轴 为标准值*当前的数据，坐标系是反的，所以 h-
		    ctx.moveTo(x,y);
		    
			ctx.fillStyle = item[2]?item[2]:"#343434";
	        ctx.fillText( item[0]+' '+((item[1]*100)>>0)+'%', x-30,  y - 20);

		})  
		ctx.closePath();
    }

    component.on('onLoad',function(){
    	var s = 0;
    	for(i=0;i<100;i++){
			setTimeout(function(){
				s+=.01;
				draw(s)
			},i*10)
    	}
    });

	return component;
}

//	雷达图
var H5ComponentRadar = function(name , cfg){
	var component = new H5ComponentBase(name ,cfg);

 	var w = component.width()*2;
 	var h = component.height()*2;

 	var r = w/2;	//	半径

 	//	加入画布 - 网格背景层
	var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

	ctx.lineWidth = 1;
	ctx.strokeStyle = "#AAAAAA";

    var step = cfg.data.length;	//	多画一列，标点从第1列开始
    var deg = 360/step;			//	每个角度的间隔

	//	绘制分面 - 从大到小（10份）
	var style = false;
	for(var s=10;s>0;s--){
		
		ctx.beginPath();
		for(var i=0;i<step+1;i++){
			//	坐标计算
			var x = r + Math.sin( (2*Math.PI / 360) * deg *i ) * r*s/10;
			var y = r + Math.cos( (2*Math.PI / 360) * deg *i ) * r*s/10;
		    ctx.lineTo(x, y);
		}
		ctx.fillStyle = (style=!style) ? 'rgba(50,141,234,1)':'rgba(255,255,255,1)';
		ctx.fill();
		ctx.closePath();	//	保证路径合拢
		
	}
	ctx.stroke();

	//	绘制伞骨 （根据项目的个数）
    ctx.beginPath();
	for(var i=0;i<step+1;i++){

		//	坐标计算
		var x = r + Math.sin( (2*Math.PI / 360) * deg *i ) * r;
		var y = r + Math.cos( (2*Math.PI / 360) * deg *i ) * r;

	    ctx.moveTo(r,r);
	    ctx.lineTo(x, y);
	    
	}
	ctx.stroke();
	

	//	加入画布 - 数据层
	var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
	var coe = cfg.data[0][1] > .5 ? 1 : 2;	//	如果第一个数据小于.5，则全部*2显示

    //	绘制折现数据 - 放在函数中，方便动画调用
    var draw = function( per ){
    	//	清理画布
    	ctx.clearRect(0, 0, w, h);
    	var per = per || 1;
	    

	    ctx.beginPath();
	    ctx.strokeStyle ='#f00';

		for(var i=0;i<step;i++){

			//	坐标计算
			var x = r + Math.sin( (2*Math.PI / 360) * deg *i ) * r*cfg.data[i][1]*coe*per;
			var y = r + Math.cos( (2*Math.PI / 360) * deg *i ) * r*cfg.data[i][1]*coe*per;

		    ctx.lineTo(x, y);
		}
		
		ctx.closePath();	//	保证路径合拢
		ctx.stroke();


		ctx.strokeStyle = "#338ded";
		ctx.font = "bold 24px 微软雅黑";		
		for(var i=0;i<step;i++){

			//	坐标计算
			var x = r + Math.sin( (2*Math.PI / 360) * deg *i ) * r*cfg.data[i][1]*coe*per;
			var y = r + Math.cos( (2*Math.PI / 360) * deg *i ) * r*cfg.data[i][1]*coe*per;

		    ctx.moveTo(x, y);
		    
			ctx.beginPath();
			ctx.fillStyle="#f00";
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();

			var item = cfg.data[i];
			ctx.fillStyle= item[2]?item[2]:"#000";
			ctx.fillText( item[0]+' '+((item[1]*100)>>0)+'%', x +( i>step/2 ? -160 : -20),  y + ( i>step/2 ? 0 : 40));

		}
		
    }
    component.on('onLoad',function(){
    	var s = 0;
    	for(i=0;i<100;i++){
			setTimeout(function(){
				s+=.01;
				draw(s)
			},i*10)
    	}
    });

	return component;
}

// 实际代码编写部分
var ppt ; 
$(function(){

	var imgs = ['imgs/description_bg.gif','imgs/face_logo.png',
	'imgs/page_bg.png','imgs/tail_logo.png','imgs/face_bg.png',
	'imgs/face_slogan.png','imgs/page_caption_bg.png','imgs/tail_share.png',
	'imgs/face_img_left.png','imgs/footer.png','imgs/slide_up.png','imgs/tail_slogan.png',
	'imgs/face_img_right.png','imgs/p1_people.png','imgs/tail_back.png'];

	ppt = new H5();
	ppt

		.addPage('face')
			.addComponent('topic', {
					center:true,
					width:395,
					height:130,
					css:{top:140,opacity:0},
					bg:'imgs/face_logo.png',
					animateIn:{top:140,opacity:1},
					animateOut:{top:0,opacity:0},
					delay:1000
				})
			.addComponent('slogan', {
					center:true,
					width:365,
					height:99,
					css:{top:220,opacity:0},
					bg:'imgs/face_slogan.png',
					animateIn:{left:'50%',opacity:1},
					animateOut:{left:'0%',opacity:0},
					delay:1500
				})
			.addComponent('face_img_left', {
					width:370,height:493,
					bg:'imgs/face_img_left.png',
					css:{left:-50, bottom:-50,opacity:0},
					animateIn:{left:0,bottom:0,opacity:1},
					animateOut:{left:-50,bottom:-50,opacity:0}
				})
			.addComponent('face_img_right',{
				width:276,height:449,
				bg:'imgs/face_img_right.png',
				css:{right:-50,bottom:-50,opacity:0},
				animateIn:{right:0,bottom:0,opacity:1},
				animateOut:{right:-50,bottom:-50,opacity:0},
				delay:500
			})

		.addPage()
			.addComponent('caption',{text:'核心理念'})
			.addComponent('text',{
				width:500,height:30,
				center:true,
				text:'慕课网=只学有用的',
				css:{opacity:0,top:140,textAlign:'center',color:'red',fontSize:'26px'},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
			})
			.addComponent('description',{

				bg:'imgs/description_bg.gif',
				center:true,
				width:481,height:295,
				css:{top:240,opacity:0,padding:'15px 10px 10px 10px',color:'#fff',fontSize:'15px',lineHeight:'18px',textAlign:'justify'},
				text:'2013年，慕课网的诞生引领中国IT职业从教育进入新时代；\
						高质量实战课程、全新教学模式、实时互动学习，以领先优势打造行业品牌；\
						迄今为止，慕课网已成为中国规模最大、互动性最高的IT技能学习平台。',
				animateIn:{top:200,opacity:1},
				animateOut:{top:240,opacity:0},
				delay:1000
			})
			.addComponent('people',{

				bg:'imgs/p1_people.png',
				center:true,
				width:515,height:305,
				css:{bottom:40,opacity:1},
				animateIn:{bottom:40,opacity:1},
				animateOut:{bottom:0,opacity:0},
				delay:500
			})
		.addPage()
			.addComponent('caption',{text:'课程方向分布'})
			.addComponent('msg',{
				text:'前端开发课程占到40%',
				css:{opacity:0,top:140,textAlign:'center',width:'100%',color:'#ff7676'},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
			})
			.addComponent('radar',{
				type:'radar',
				data:[['前端开发',.4,'#ff0000'],['移动开发',.2],['后端开发',.29],['图像处理',.1],['数据处理',.01]],
				width:530,
				height:530,
				center:true,
				css:{top:200},
				animateIn:{opacity:1,top:200},
				animateOut:{opacity:0,top:100},
			})
		.addPage()
			.addComponent('caption',{text:'课程方向分布'})
			.addComponent('msg',{
				text:'前端开发课程占到40%',
				css:{opacity:0,top:140,textAlign:'center',width:'100%',color:'#ff7676'},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
			})
			.addComponent('polyline',{
				type:'polyline',
				data:[['前端开发',.4,'#ff0000'],['移动开发',.2],['后端开发',.29],['图像处理',.1],['数据处理',.01]],
				width:530,
				height:300,
				center:true,
				css:{top:200},
				animateIn:{opacity:1,top:200},
				animateOut:{opacity:0,top:100},
			})

		.addPage()
			.addComponent('caption',{text:'移动开发课程资源'})

			.addComponent('pie',{
				type:'pie',
				data:[['Android',.71,'#ff7676'],['IOS',.25,'#5ddbd8'],['Cocos2d-x',.02,'#99c1ff'],['Unity-3D',.02,'#ffad69',20]],//
				css:{top:200},
				width:300,
				height:300,
				center:true,
			})
			.addComponent('msg',{
				text:'移动开发课程资源 Android 占 71%',
				css:{opacity:0,bottom:80,textAlign:'center',width:'100%',color:'#ff7676'},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
				delay:1500
			})
			
		.addPage()
			.addComponent('caption',{text:'前端开发课程资源'})
			.addComponent('bar',{
				type:'bar',
				data:[['JavaScript',.32,'#ff7676'],['HTML/CSS',.21],['CSS3',.1],['HTML5',.1],['jQuery',.04],['Bootstrap',.02],['AngularJS',.02]],
				width:530,
				height:600,
				center:true,
				css:{top:200},
				animateIn:{opacity:1,top:200},
				animateOut:{opacity:0,top:100},
				delay:500
			})
			.addComponent('msg',{
				text:'前端开发课程资源 Javascript 占 32%',
				css:{opacity:0,bottom:80,textAlign:'center',width:'100%',color:'#ff7676'},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
				delay:1500
			})

		.addPage()
			.addComponent('caption',{text:'后端开发课程资源'})
			.addComponent('bar_v',{
				type:'bar_v',
				data:[['Java',.46,'#ff7676'],['PHP',.30],['Go',.015],['C++',.046],['C',.04],['Python',.02],['Linux',.02]],
				width:530,
				height:400,
				center:true,
				css:{top:200},
				animateIn:{opacity:1,top:200},
				animateOut:{opacity:0,top:100},
			})
			.addComponent('msg',{
				text:'后端开发课程资源 Java 占 46%',
				css:{opacity:0,bottom:80,textAlign:'center',width:'100%',color:'#ff7676'},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
				delay:1500
			})

		.addPage()
			.addComponent('caption',{text:'课程报名人数过万'})
			.addComponent('ring',{
				type:'ring',
				data:[['总课程',.64,'#ff7676']],
				width:300,
				height:300,
				center:true,
				css:{top:120},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
			})

			.addComponent('msg',{
				text:'不同课程报名人数超过一万占比',
				css:{opacity:0,top:300,textAlign:'center',width:'100%',color:'#ff7676'},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
				delay:500
			})
			.addComponent('ring',{
				type:'ring',
				data:[['前端开发',.43,'#ffad69']],
				width:140,
				height:140,
				css:{top:350,left:30,fontSize:'12px'},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
				className:'h5_component_ring_less',
			})
			.addComponent('ring',{
				type:'ring',
				data:[['后端开发',.281,'#ffad69']],
				width:140,
				height:140,
				css:{top:350,fontSize:'12px'},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
				center:true,
				className:'h5_component_ring_less',
			})
			.addComponent('ring',{
				type:'ring',
				data:[['移动开发',.22,'#ffad69']],
				width:140,
				height:140,
				css:{top:350,right:30,fontSize:'12px'},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
				className:'h5_component_ring_less',
			})
			.addComponent('ring',{
				type:'ring',
				data:[['数据处理',.04,'#ffad69']],
				width:140,
				height:140,
				css:{top:450,left:70,fontSize:'12px'},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
				className:'h5_component_ring_less',
			})
			.addComponent('ring',{
				type:'ring',
				data:[['图像处理',.02,'#ffad69']],
				width:140,
				height:140,
				css:{top:450,right:70,fontSize:'12px'},
				animateIn:{opacity:1},
				animateOut:{opacity:0},
				className:'h5_component_ring_less',
			})
		
		.addPage()
			.addComponent('caption',{text:'课程难度分布'})
			.addComponent('point',{
				type:'point',
				data:[['中级',.45,'#ff7676'],['初级',.25,'#ffa3a4',-50,-90],['高级',.35,'#99c1ff',60,-150]],
				css:{top:300},
				width:300,
				height:300,
				center:true,
			})

		.addPage('tail')
				.addComponent('back', {
					width:52,
					height:50,
					bg:'imgs/tail_back.png',
					center:true,
					onclick :function(){$.fn.fullpage.moveTo(1);}
				})
				.addComponent('share', {
					width:128,
					height:120,
					bg:'imgs/tail_share.png',
					css:{top:10,right:20,opacity:0},
					animateIn:{opacity:1},
					animateOut:{opacity:0},
					delay:1500
				})
				.addComponent('logo', {
					center:true,
					width:359,
					height:129,
					css:{top:210},
					bg:'imgs/tail_logo.png',
					animateIn:{top:210,opacity:1},
					animateOut:{top:240,opacity:0},
				})
				.addComponent('slogan', {
					center:true,
					width:314,
					height:46,
					css:{top:280},
					bg:'imgs/tail_slogan.png',
					animateIn:{left:'50%',opacity:1},
					animateOut:{left:'0%',opacity:0},
					delay:500
				})
				
		.loader( imgs  , 1 );
})