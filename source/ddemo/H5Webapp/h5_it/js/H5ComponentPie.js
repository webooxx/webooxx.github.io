// 饼状图
var H5ComponentPie = function( name ,cfg ){
	var component = new H5ComponentBase(name ,cfg);
	
	var per_count=0;
	var w = component.width()*2;
	var h = w;
	var r = w/2;

	//	加入底层
	var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = w;
    component.append(cns);
	ctx.beginPath();
	ctx.fillStyle="#eee";
	ctx.strokeStyle = "#eee";
	ctx.lineWidth = 1;
	ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
	ctx.stroke();


	//	绘制数据
	var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = w;
    component.append(cns);

	var colors = ['red','green','blue','orange','gray'];	//预备定义一些颜色备用

    
    var sAngle = 1.5 * Math.PI;		// 设置起始角度在12点
    var eAngle = 0;					// 结束角度
    var aAngle = Math.PI*2;			// 100% 的圆的结束角度；2π弧度=360度

    for(i in cfg.data){
    	
    	var item = cfg.data[i];

    	var color = item[2] || (item[2] = colors.pop());
		ctx.beginPath();
		ctx.lineWidth = .01;
        ctx.fillStyle = color;
        
        ctx.moveTo(r,r);						//	移动到圆心（重要!!!）
        eAngle = sAngle+aAngle*item[1];			//	结束点 = 起点角度 + 360*当前角度数据（百分制）
        ctx.arc(r,r,r,sAngle,eAngle);

        ctx.fill();
        ctx.stroke();
        
       
        sAngle = eAngle;						//	把结束的角度重新设置为当前角度
    }

    //	输出文字
    
		//	圆心坐标是(a,b)，半径为r，deg = [1~360];
        //	圆上每个点的 
        	//	X坐标 = a + Math.sin(2*Math.PI / deg) * r 
        	//	Y坐标 = b + Math.cos(2*Math.PI / deg) * r 

	var nAngle = 0;								// 设置起始位置在12点
 	var sAngle = 1 * Math.PI;
 	var sum=0;
 	var abs = 0;
 	var grid={left:[],bottom:[],top:[]};

     for(i in cfg.data){
     	
     	var item = cfg.data[i];
		

		sum=sum+item[1];
		nAngle = sAngle - aAngle*(sum-item[1]/2);

		var x = r + Math.sin( nAngle ) * r;
		var y = r + Math.cos( nAngle ) * r;


		var per = $('<div class="per">'+ (cfg.data[i][1]*100+'').substr(0,4)+'%</div>');
		var text = $('<div class="text">'+cfg.data[i][0]+'</div>');
		var text_w = 12*cfg.data[i][0].length;

		text.append(per)
		    .width(text_w)
		    .css('width',text_w)
		   	.css('color',item[2])
			.attr('id',( 'h5_c_pie_text_id_'+i+'_'+ Math.random() ).replace('.','_') )
		   	.css('opacity',0)
		   	.css('transition','opacity .5s '+.1*i+'s');
		   	

        if(x > w/2){    //  在右边,左对齐
            text.css('left',x/2 +abs)
        }else{      //  在左边
            text.css('right',(w-x)/2 +abs)
        }
        if(y > h/2){
            text.css('top',y/2+abs)

        }else{
            text.css('bottom',(h-y)/2+abs)
        }
		component.append(text);
     }
     

	//	加入蒙版层
	var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = w;
    component.append(cns);
	ctx.beginPath();
	ctx.fillStyle="#eee";
	ctx.strokeStyle = "#eee";
	ctx.lineWidth = 1;

	//	绘制进度动画
	var draw = function( per ){

		ctx.clearRect(0, 0, w, w);
		ctx.beginPath();
        ctx.moveTo(r,r);
        if(per<=0){
        	ctx.arc(r,r,r,0,2*Math.PI);
        }else{
        	ctx.arc(r,r,r,0+sAngle,2*Math.PI*per+sAngle,true);
        }
        ctx.fill();
		ctx.stroke();

        if(per >=1 ){
        	ctx.clearRect(0, 0, w, w);	
            component.find('.text').css('opacity',1);
            $.each(component.find('.text'),function(i,text){
				H5ComponentPie.reSort.call( text,component.find('.text') );
            })
            
        }
	}
	draw(0);	//	立即绘制一个leave 的样式

    component.on('onLoad',function(){
        var s = 0;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s)
            },i*10+(cfg.delay||0) + 500)
        }
    });
    component.on('onLeave',function(){
        var s = 1;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s);
            },i*10)
        }
        component.find('.text').css('opacity',0);
    })
	return component;
}

/**
 * 静态方法，把所有元素进行排序，使其不会重叠
 * this 指向一个Jquery元素序列
 */
H5ComponentPie.reSort = function( list ){

	var pos = {};
	var id = $(this).attr('id')	;
	var me = $(this);
	var bottom_max = me.offset().top;
	var bottom_min = me.offset().top-$(this).outerHeight();
	
	$.each(list,function(i,item){

		var item_bottom_max = $(this).offset().top;
		var item_bottom_min = $(this).offset().top-$(this).outerHeight();

		if( id == $(this).attr('id')){
			return true;
		}

		if(item_bottom_max>bottom_min&&item_bottom_min<bottom_max){
			var bottom = parseInt(me.css('bottom'));
			var top = parseInt(me.css('top'));
			if(me.css('bottom')!='auto'){
				 $(item).css('bottom',bottom+30)
			}else{
				 $(item).css('top',top+30)
			}
		}
	})
}