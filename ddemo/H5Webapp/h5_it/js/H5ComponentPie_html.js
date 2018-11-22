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