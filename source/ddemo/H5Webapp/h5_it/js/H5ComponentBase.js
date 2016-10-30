/**
 * 基本组件（图像和文本块）
 *  - 实例化后直接返回一个 DOM
 *  - 共享基本的 h5_component_base 样式类
 *  - 有2个事件入口，afterLoad、onLeave；
 */
var H5ComponentBase = function( name , cfg ){

	var cfg = cfg ||{};
 	var id = ( 'h5_c_'  + Math.random() ).replace('.','_');
 	var cls = 'h5_component_'+$.trim(cfg.type);	//	载入离开时会有对应样式改变,根据类型
 	var component  = $('<div class="h5_component  h5_component_name_'+$.trim(name)+' '+cls+'" id='+id+'>');

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


	if(cfg.scaleBase){
		var w = $('body').width();
		var h = $('body').height();
		var s = 1;
		if(cfg.scaleBase.w && cfg.scaleBase.h){
			s = Math.min(w / cfg.scaleBase.w , h/ cfg.scaleBase.h ) + '';
		}else{
			s = ( cfg.scaleBase.w ? w/cfg.scaleBase.w  : h/ cfg.scaleBase.h ) +'';
		}
		s = s.substr(0,3)
		component.css('transform','scale('+s+')');
	}
 	//	当载入或者
	component
	.on('onLoad',function (evt) {

		setTimeout(function(){
			component.removeClass(cls+'_leave').addClass(cls+'_load');
			cfg.animateIn && component.animate( cfg.animateIn );
		},cfg.delay||0);

		evt.stopPropagation();
		
		return false;
	}).on('onLeave',function (evt) {
		component.removeClass(cls+'_load').addClass(cls+'_leave');
		cfg.animateOut && component.animate( cfg.animateOut );
		evt.stopPropagation();
		return false;
	});
	component.trigger('onLeave');
	return component;
}