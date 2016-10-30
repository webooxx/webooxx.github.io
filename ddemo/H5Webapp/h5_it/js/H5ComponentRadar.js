
//  雷达图
var H5ComponentRadar = function(name , cfg){
    var component = new H5ComponentBase(name ,cfg);

    var w = component.width()*2;
    var h = component.height()*2;

    var r = w/2;    //  半径

    //  加入画布 - 网格背景层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#e0e0e0";

    var step = cfg.data.length; //  多画一列，标点从第1列开始
    var deg = 360/step;         //  每个角度的间隔

    
    //  圆心坐标是(a,b)，半径为r，deg = [1~360];
    //  圆上每个点的 
        //  X坐标 = a + Math.sin(2*Math.PI / deg) * r 
        //  Y坐标 = b + Math.cos(2*Math.PI / deg) * r 

    //  绘制分面 - 从大到小（10份）
    var style = false;
    for(var s=10;s>0;s--){
        
        ctx.beginPath();
        for(var i=0;i<step+1;i++){
            //  坐标计算
            var x = r + Math.sin( (2*Math.PI / 360) * deg *i ) * r*s/10;
            var y = r + Math.cos( (2*Math.PI / 360) * deg *i ) * r*s/10;
            ctx.lineTo(x, y);
        }
        ctx.fillStyle = (style=!style) ? '#99c0ff':'#f1f9ff';
        ctx.fill();
        ctx.closePath();    //  保证路径合拢
    }

    ctx.stroke();

    //  绘制伞骨 （根据项目的个数） & 文本
    ctx.beginPath();
    for(var i=0;i<step;i++){

        //  坐标计算
        var x = r + Math.sin( (2*Math.PI / 360) * deg *i ) * r;
        var y = r + Math.cos( (2*Math.PI / 360) * deg *i ) * r;


        ctx.moveTo(r,r);
        ctx.lineTo(x, y);
        var per = $('<div class="per">'+ (cfg.data[i][1]*100+'').substr(0,4)+'%</div>');
        var text = $('<div class="text">'+cfg.data[i][0]+'</div>').css('opacity',0).css('transition','all .5s '+.1*i+'s');
        // var text_w = 12*cfg.data[i][0].length;

        // text.append(per);
        // text.width(text_w);

        if( cfg.data[i][2] ){
            text.css('color',cfg.data[i][2]);
        }

        if(x > w/2){    //  在右边,左对齐
            text.css('left',x/2 +5)
        }else{      //  在左边
            text.css('right',(w-x)/2 +5)
        }

        if(y > h/2){
            text.css('top',y/2+5)    
        }else{
            text.css('bottom',(h-y)/2+5)
        }
        component.append(text);
    }
    ctx.stroke();
    

    //  加入画布 - 数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    var coe = cfg.data[0][1] > .5 ? 1 : 2;  //  如果第一个数据小于.5，则全部*2显示

    //  绘制折线文本数据 - 放在函数中，方便动画调用
    var draw = function( per ){
        //  清理画布
        ctx.clearRect(0, 0, w, h);
        var per = per || 1;
        

        ctx.beginPath();
        ctx.strokeStyle ='#f00';

        //  输出折线
        for(var i=0;i<step;i++){

            //  坐标计算
            var x = r + Math.sin( (2*Math.PI / 360) * deg *i ) * r*cfg.data[i][1]*coe*per;
            var y = r + Math.cos( (2*Math.PI / 360) * deg *i ) * r*cfg.data[i][1]*coe*per;

            ctx.lineTo(x, y);
        }
        
        ctx.closePath();    //  保证路径合拢
        ctx.stroke();


        //  输出折线定点&文字
        ctx.strokeStyle = "#338ded";
        ctx.font = "20px 微软雅黑";     
        for(var i=0;i<step;i++){

            //  坐标计算
            var x = r + Math.sin( (2*Math.PI / 360) * deg *i ) * r*cfg.data[i][1]*coe*per;
            var y = r + Math.cos( (2*Math.PI / 360) * deg *i ) * r*cfg.data[i][1]*coe*per;

            ctx.moveTo(x, y);
            
            ctx.beginPath();
            ctx.fillStyle="#ff7676";    //  可以用 canvas 也可以用 html ，哪个方便用哪个
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
        if(per >=1 ){
            component.find('.text').css('opacity',1)
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
