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
		line = $(line);
		if(style){
			line.css('color',item[2]);
		}

		component.append(line);
	})
	
	return component;
}