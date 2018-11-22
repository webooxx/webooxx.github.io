
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


        if(cfg.data[i-1]){

            var per = $('<div class="per">'+ (cfg.data[i-1][1]*100+'').substr(0,4)+'%</div>');
            var text = $('<div class="text">'+cfg.data[i-1][0]+'</div>').css('opacity',1).css('transition','all .5s '+.1*i+'s');
            var text_w = 12*cfg.data[i-1][0].length;
            text.css('width',text_w).css('bottom',-20).css('left',x/2-text_w/2);
            if( cfg.data[i-1][2] ){
                text.css('color',cfg.data[i-1][2]);
            }
            component.append(text);
        }

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
		ctx.strokeStyle = "#ff8878";
	    
		ctx.font = "20px 微软雅黑";

		var row_w = w/(cfg.data.length+1);
		var coe = cfg.data[0][1] > .5 ? 1 : 2;	//	如果第一个数据小于.5，则全部*2显示

		ctx.moveTo(row_w,h-cfg.data[0][1]*h*coe*per);	//	移动到第一个点的位置

		var x = 0;
		var y =0

        for(i in cfg.data){
            var item = cfg.data[i];
            x = row_w+row_w*i;              //  x 轴 为每列的标准位置
            y = h-item[1]*h*coe*per;        //  y 轴 为标准值*当前的数据，坐标系是反的，所以 h-
            ctx.lineTo(x,y);
        }

        ctx.stroke();

		//	绘制阴影
		ctx.lineTo(x, h);
	    ctx.lineTo(row_w,h);
	    ctx.fillStyle = "rgba(255, 136, 120,.2)";
	    ctx.closePath();
	    ctx.fill();

        //  绘制圆点 & 数值
        for(i in cfg.data){
            var item = cfg.data[i];
            x = row_w+row_w*i;              //  x 轴 为每列的标准位置
            y = h-item[1]*h*coe*per;        //  y 轴 为标准值*当前的数据，坐标系是反的，所以 h-
                ctx.beginPath();
                ctx.fillStyle="#fff";
                ctx.arc(x,y,5,0,2*Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.fillStyle=item[2]?item[2]:"#595959";
                ctx.fillText( ((item[1]*100)>>0)+'%', x-10,y-10    );
        }

        if(per>=1){
            component.find('.text').css('opacity',1);
        }
    }

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
                draw(s)
            },i*10)
        }
        component.find('.text').css('opacity',0);
    })
	return component;
}
