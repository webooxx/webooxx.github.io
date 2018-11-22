/**
 * H5类对象
 */
var H5 = function( ){

	this.id = ( 'h5_' + Math.random() ).replace('.','_');
	this.el = $('<div class="h5" id='+this.id+'>').appendTo('body').hide();
	this.page = [];
	

	/**
	 * 新增一个页
	 * @param {String} name 页的名称，会以 h5_page_$name 的形式添加在对应页DOM的className上
	 * @return {H5}    H5对象，可以重复使用对象内的方法
	 */
	this.addPage = function ( name ,text ) {

		var count = this.el.find('.h5_page').size();
		var page = $('<div class="h5_page h5_page_'+count+' section" id="h5_page_'+count+'">');

		if(name){
			page.addClass('h5_page_'+name);
		}
		if(text){
			page.text(text);
		}
		page.on('onLeave',function(){
			$(this).find('.h5_component').trigger('onLeave');
		}).on('onLoad',function(){
			$(this).find('.h5_component').trigger('onLoad');
		})
		this.page.push(page);
		this.el.append(page);

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
			type : 'firstPage',
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
	 * @param  {Array}	images 需要加载的图片列表，加载完成后才会展现界面
	 * @param  {Int} 	firstPage 要呈现的第一个页面（可以用于调试）
	 * @return {H5}    	H5对象
	 */
	this.loader = function( images , firstPage ) {
		
		
		//	第一次进入
		if( this._images === undefined ){
			
			var id = this.id;

			this.loader_init_loading_view();			//	初始化 loading 的视图

			this._images = (images || [] ).length;			//	存储要加载的资源
			this._loaded = 0;

			this._firstPage = firstPage || 1 ;
			window[id]= this;							//	把当前对象存储在全局对象 window 中

			for(  s in images ){
				var img = new Image;
				img.onload = function(){
					window[id].loader(1);				//	从 window 中拿到当前对象，反复执行 this.loader 方法，注意参数为数字 1
				}
				img.src = images[s];
			}
			$('#rate').text( '0%');			//	初始化进度
			return  this;
		}else{
			//	某个图片加载完成后进入	--> 更新进度
			this._loaded++;
			$('#rate').text( ( ( this._loaded / this._images * 100 ) >>0 ) + '%');
		}

		//	如果资源还没加载完，就跳出不继续执行	
		if( this._loaded < this._images  ){
			return this;
		}
		
		//	如果资源加载完成了
		$('#loading').remove();

		this.fullpage = this.el.fullpage({	//	把所有 page 初始化为 fullpage 风格（允许切换）
			css3: true,
			verticalCentered:false,
	        onLeave:function(index , nextIndex , direction){	//	同时设置当页面移入和移出的事件
	        	$(this).parent().find('.h5_page').eq(index-1).trigger('onLeave');
	        	
	        },
	        afterLoad:function( anchorLink , index ){
				$(this).parent().find('.h5_page').eq(index-1).trigger('onLoad');
	        }
    	});
    	if(this._firstPage == 1){
    		this.page[0].trigger('onLoad');
    	}
		this.el.show();
		$.fn.fullpage.moveTo( this._firstPage );	// fullpage 第一页是 1，moveTo 0 会到最后一页
	}

	//	初始化加载器的 loading 视图
	this.loader_init_loading_view = function(){
		var html = '<div class="loading" id="loading">\
					    <div class="double-bounce1"></div>\
					    <div class="double-bounce2"></div>\
					    <div id="rate">0%</div>\
					</div>';
		$('body').append(html);
	}
	return this;
}