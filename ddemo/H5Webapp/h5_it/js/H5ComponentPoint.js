//	散点图
var H5ComponentPoint = function(name , cfg){
	var component = new H5ComponentBase(name ,cfg);

	var base = cfg.data[0][1]	//以第一个为100%;

	$.each(cfg.data,function(idx,item){
		

		var point = $('<div class="point point_'+idx+'"><div class="name">'+item[0]+'<div class="per">'+item[1]*100+'%</div></div></div>')

		var per = (item[1]/base*100 + '').substr(0,3)+'%';
		point
			.width( per )
			.height( per )

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
		component.find('.point').removeClass('point_focus').css('transition','');
		$(this).addClass('point_focus');
		return false;
	}).eq(0).addClass('point_focus');
	return component;
}