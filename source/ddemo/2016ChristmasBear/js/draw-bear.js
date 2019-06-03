
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

// var canvasHistory = [];

var draw = function(wrap,canvas_init){

	var component = [];
	window.component = component;
	var id_idx = 0;
	var canvas_context = canvas_init.getContext("2d");

	//	把component 绘制到 canvas 中 && 历史记录中
	var drawComponentToCanvas = function(){
		canvas_context.clearRect(0, 0, 234*2, 347*2);
		for(i=0;i<component.length;i++){
			canvas_context.drawImage(component[i].canvas, 0, 0, 234*2, 347*2,0, 0, 234*2, 347*2);
		}

		//	记录历史
		// var history_canvas = $('<canvas>')[0];
		// var history_context = history_canvas.getContext("2d");
	 //    history_canvas.width = history_context.width = 234*2;
	 //    history_canvas.height = history_context.height = 347*2;
		// history_context.drawImage(canvas_init,0, 0, 234*2, 347*2,0, 0, 234*2, 347*2)
		
		// canvasHistory.push(history_canvas);

		// $('.panel-init').append(history_canvas);

		// if(canvasHistory.length > 51){
		// 	canvasHistory = canvasHistory.slice(0,1).concat(canvasHistory.slice(2,51));
		// }
		// $('.panel-init__button-revert').triggerHandler('updateStatus');
	}

	//	根据当前的索引
	var getComponentData = function(id){
		var map = {};

		map['2']= {name : '腰带',x:109,y:530,w:220,h:66,zIndex:2};
        map['3']= {name : '腰带扣',x:191,y:548,w:54,h:50,zIndex:3};
        map['4']= {name : '帽子',x:140,y:3,w:297,h:208,zIndex:2};
        map['5']= {name : '脸',x:4,y:86,w:426,h:349,zIndex:1};
        map['6']= {name : '左手套',x:59,y:550,w:54,h:54,zIndex:0};
        map['7']= {name : '右手套',x:323,y:545,w:47,h:54,zIndex:0};
        map['8']= {name : '衣服',x:96,y:444,w:244,h:90,zIndex:0};
        map['9']= {name : '左鞋子',x:122,y:650,w:90,h:40,zIndex:0};
        map['10']= {name : '右鞋子',x:224,y:650,w:94,h:38,zIndex:0};
        map['11']= {name : '短裤',x:111,y:566,w:214,h:52,zIndex:0};
        map['12']= {name : '左腿',x:122,y:607,w:86,h:24,zIndex:1};
        map['13']= {name : '右腿',x:230,y:607,w:86,h:24,zIndex:1};
        map['14']= {name : '肚皮',x:178,y:456,w:75,h:94,zIndex:9};

		return map[id] || null;
	}

	//	模拟画布对象
	var oCtx  = function( id ,data){

		var canvas = $('<canvas id="'+id+'" class="hide canvas-component '+id+'">')[0];
		var context = canvas.getContext("2d");

		context.strokeStyle="ff0000";
		context.miterLimit=4;
		context.lineWidth=10;


	    canvas.width = context.width = 234*2;
	    canvas.height = context.height = 347*2;

	    this.x = 0;
	    this.y = 0;
	    this.w = 0;
	    this.h = 0;

	    this.context = context;
	    this.canvas = canvas;
	    this.data = data || null;
	    this.zIndex = data ? data.zIndex : 0;
	    this.name = data ? data.name : 'unknow name';
		
    	if(data){
    		// console.log(data);
			$(canvas).attr('data-name',data.name);
    	}

	    this.list_x = [];
	    this.list_y = [];

	    this.orderList = []; // 绘制序列化命令

	    //	录制样式
	    this.recodingOrder = function(name,args){

	    	if(name=='stroke'){
	    		return this;	
	    	}
	    	this.orderList.push([name,args||[]]);

	    	if(name=='save'){
	    		if(this.data){
	    			this.fillStyle = this.data.color || 'rgba(0,0,0,0)';
	    		}
	    		this.playOrder();
	    	}
	    }
	    //	绘制样式
	    this.playOrder = function(){
	    	this.context.clearRect(0,0,999,999);
	    	this.context.fillStyle = this.fillStyle;
	    	for(i=0;i<this.orderList.length;i++){
	    		var name = this.orderList[i][0];
	    		var args = this.orderList[i][1];
	    		this.context[name].apply(this.context,args)
	    	}
	    }


	    //	更改自身的颜色，并且触发全局 canvas 更新
	    this.changeColor = function(color){
	    	if(color != '#FFFFFF' && color == this.fillStyle){
	    		color = '#FFFFFF';
	    	}
	    	this.fillStyle = color;
	    	this.playOrder();
			// drawComponentToCanvas();
	    }

	    //	分析获得合理的组件
	    this.logicalAnalysisComponent = function(data){
	    	data =  data.sort( compare('zIndex') )[0];
	    	// console.log(data,data.name);
			return [data];
	    }

		//	位置,鼠标过来翻译要 * 2
		this.isTap = function(pos){
			var min_x = this.data.x;
			var min_y = this.data.y;

			var max_x = min_x + this.data.w;
			var max_y = min_y + this.data.h;

			var isTap = ( pos.x*2 >= min_x && pos.x*2 <= max_x && pos.y*2 >= min_y && pos.y*2 <= max_y );
			// isTap && console.log('component  ' + this.data.name +' is tap? ', isTap);
			return isTap;
		}

		this.callUpdate = function(){
			drawComponentToCanvas();
		}

		wrap.append(canvas);
		component.push(this); //  if 特定序列，才进入  component 
		return this;
	}


	//	生成一个模拟画布对象
	var getCtx = function(w,h){
		var i = id_idx++;
		var id = 'canvas_component_'+i;
		var ctx_ = new oCtx(id,getComponentData(i));
		return ctx_;
	}


	ctx = getCtx();


	ctx.fillStyle="#B57A52";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[279.7,547.7])
	ctx.recodingOrder('bezierCurveTo',[279.7,547.7,285,567.9000000000001,284.2,581.5])
	ctx.recodingOrder('bezierCurveTo',[284.2,581.5,284.4,586.1,291.8,582.5])
	ctx.recodingOrder('bezierCurveTo',[291.8,582.5,304.8,582.5,295.1,547.6])
	ctx.recodingOrder('bezierCurveTo',[295.2,547.7,296.1,545.4,279.7,547.7])
	ctx.recodingOrder('closePath')
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');

	ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#B57A52";
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[150,547.4])
	ctx.recodingOrder('bezierCurveTo',[150,547.4,145.4,571.8,146,584.4])
	ctx.recodingOrder('bezierCurveTo',[146,584.4,133.5,584.8,131.5,575.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[131.5,575.6999999999999,129.1,557.0999999999999,136.6,545.6999999999999])
	ctx.recodingOrder('lineTo',[150,547.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');

	ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#96633C";
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[111.2,532.8])
	ctx.recodingOrder('bezierCurveTo',[111.2,532.8,119,543.5,132.8,546.5])
	ctx.recodingOrder('lineTo',[135,547.7])
	ctx.recodingOrder('bezierCurveTo',[135,547.7,130.2,574.7,134.4,580.7])
	ctx.recodingOrder('bezierCurveTo',[134.4,580.7,139,585,144.3,584.6])
	ctx.recodingOrder('lineTo',[145.8,584.6])
	ctx.recodingOrder('bezierCurveTo',[145.8,584.6,146.70000000000002,556.6,149.9,548.6])
	ctx.recodingOrder('bezierCurveTo',[149.9,548.6,191.60000000000002,552.5,200.10000000000002,552.6])
	ctx.recodingOrder('bezierCurveTo',[200.10000000000002,552.6,180.50000000000003,576.1,197.50000000000003,592.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[197.50000000000003,592.8000000000001,219.80000000000004,604.0000000000001,241.50000000000003,589.2])
	ctx.recodingOrder('bezierCurveTo',[241.50000000000003,589.2,252.50000000000003,575.1,236.00000000000003,551.3000000000001])
	ctx.recodingOrder('lineTo',[261.20000000000005,547.4000000000001])
	ctx.recodingOrder('lineTo',[279.70000000000005,549.1000000000001])
	ctx.recodingOrder('bezierCurveTo',[279.70000000000005,549.1000000000001,283.90000000000003,558.0000000000001,285.1,580.0000000000001])
	ctx.recodingOrder('bezierCurveTo',[285.1,580.0000000000001,285.1,586.0000000000001,288.90000000000003,583.7000000000002])
	ctx.recodingOrder('bezierCurveTo',[288.90000000000003,583.7000000000002,300.70000000000005,582.9000000000002,298.40000000000003,568.0000000000001])
	ctx.recodingOrder('lineTo',[294.70000000000005,547.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[294.70000000000005,547.4000000000001,316.30000000000007,545.8000000000001,326.40000000000003,534.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[326.40000000000003,534.8000000000001,337.50000000000006,555.9000000000001,317.90000000000003,567.3000000000001])
	ctx.recodingOrder('lineTo',[301.20000000000005,576.9000000000001])
	ctx.recodingOrder('lineTo',[298.50000000000006,579.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[298.50000000000006,579.3000000000001,296.6000000000001,584.8000000000001,288.00000000000006,587.1])
	ctx.recodingOrder('lineTo',[279.70000000000005,585.6])
	ctx.recodingOrder('lineTo',[240.20000000000005,593.5])
	ctx.recodingOrder('bezierCurveTo',[240.20000000000005,593.5,230.40000000000003,599.9,216.10000000000005,599.4])
	ctx.recodingOrder('lineTo',[192.20000000000005,594.1999999999999])
	ctx.recodingOrder('lineTo',[150.20000000000005,586.3])
	ctx.recodingOrder('lineTo',[145.90000000000003,587.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[145.90000000000003,587.0999999999999,136.50000000000003,588.3,131.50000000000003,580.8])
	ctx.recodingOrder('bezierCurveTo',[131.50000000000003,580.8,112.50000000000003,573.5999999999999,109.60000000000002,557.4])
	ctx.recodingOrder('bezierCurveTo',[109.6,557.3,106,544.5,111.2,532.8])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();//

	ctx.fillStyle="#F5C126";
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[195.2,588.3])
	ctx.recodingOrder('bezierCurveTo',[204.1,600.5,231.6,600.1999999999999,239.7,588.3])
	ctx.recodingOrder('bezierCurveTo',[248.1,576,244.89999999999998,556.3,231,549.5])
	ctx.recodingOrder('bezierCurveTo',[222.7,545.5,212.2,545.4,204.3,550.2])
	ctx.recodingOrder('bezierCurveTo',[190.9,558.3,185.9,575.4,195.2,588.3])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#E94441";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[137.9,82.2])
	ctx.recodingOrder('bezierCurveTo',[137.9,82.2,193.4,14.799999999999997,297.4,3.1000000000000085])
	ctx.recodingOrder('bezierCurveTo',[297.4,3.1000000000000085,376.59999999999997,-3.8999999999999915,407.2,69.80000000000001])
	ctx.recodingOrder('bezierCurveTo',[407.2,69.80000000000001,434.8,119.4,432.3,201.4])
	ctx.recodingOrder('bezierCurveTo',[432.3,201.4,422.3,205.70000000000002,412.2,211.70000000000002])
	ctx.recodingOrder('lineTo',[408.7,203.60000000000002])
	ctx.recodingOrder('bezierCurveTo',[408.7,203.60000000000002,422.4,194.50000000000003,419.2,175.20000000000002])
	ctx.recodingOrder('bezierCurveTo',[419.2,175.20000000000002,417,160.4,411.09999999999997,156.00000000000003])
	ctx.recodingOrder('bezierCurveTo',[405.2,151.60000000000002,394.49999999999994,148.60000000000002,354.09999999999997,145.40000000000003])
	ctx.recodingOrder('bezierCurveTo',[317.3,142.5,235,124.5,137.9,82.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();

	ctx.fillStyle="#E1B391";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[103.2,110.8])
	ctx.recodingOrder('bezierCurveTo',[103.8,108.89999999999999,99.8,112.5,98.3,113.3])
	ctx.recodingOrder('lineTo',[98.5,113.1])
	ctx.recodingOrder('bezierCurveTo',[98.5,89.3,62,73.1,37.1,99.1])
	ctx.recodingOrder('bezierCurveTo',[12.3,125.1,26.200000000000003,154.8,49.900000000000006,161.5])
	ctx.recodingOrder('bezierCurveTo',[46.900000000000006,165.5,43.7,169.6,41.00000000000001,174.2])
	ctx.recodingOrder('bezierCurveTo',[-26.79999999999999,288.29999999999995,-4.29999999999999,399.9,132.1,428])
	ctx.recodingOrder('lineTo',[133,428.4])
	ctx.recodingOrder('bezierCurveTo',[158.9,433.79999999999995,192.5,435.09999999999997,217.5,435])
	ctx.recodingOrder('lineTo',[216.8,435])
	ctx.recodingOrder('bezierCurveTo',[241.70000000000002,435.1,275.40000000000003,433.7,301.3,428.4])
	ctx.recodingOrder('lineTo',[302.2,428])
	ctx.recodingOrder('bezierCurveTo',[426.9,403.3,456.4,307.2,408.9,203.9])
	ctx.recodingOrder('bezierCurveTo',[408.9,203.9,367.29999999999995,223.4,232.89999999999998,189.20000000000002])
	ctx.recodingOrder('bezierCurveTo',[232.89999999999998,189.20000000000002,138.59999999999997,161.00000000000003,109.99999999999997,129.8])
	ctx.recodingOrder('bezierCurveTo',[109.8,129.7,99.5,122.6,103.2,110.8])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();//

	ctx.fillStyle="#E94441"
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[63,548.9])
	ctx.recodingOrder('bezierCurveTo',[63,548.9,54.6,587.1999999999999,79.7,598.4])
	ctx.recodingOrder('bezierCurveTo',[79.7,598.4,96.6,606.6999999999999,111.2,599.8])
	ctx.recodingOrder('lineTo',[115.10000000000001,571.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[115.1,571.1,86.8,571.7,63,548.9])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#E94441";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[367.5,545.9])
	ctx.recodingOrder('bezierCurveTo',[367.5,545.9,346.5,565,322.4,569.4])
	ctx.recodingOrder('lineTo',[326.5,599.3])
	ctx.recodingOrder('bezierCurveTo',[326.5,599.3,357.2,600,368.4,572])
	ctx.recodingOrder('bezierCurveTo',[368.4,571.9,372.7,561.8,367.5,545.9])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();//

	ctx.fillStyle="#E94441";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[126.1,444.4])
	ctx.recodingOrder('bezierCurveTo',[126.1,444.4,99.5,488.4,96.3,511])
	ctx.recodingOrder('lineTo',[110.39999999999999,521])
	ctx.recodingOrder('bezierCurveTo',[110.39999999999999,521,115.89999999999999,510.6,120.3,511])
	ctx.recodingOrder('bezierCurveTo',[120.3,511,118.3,526,126.1,529.2])
	ctx.recodingOrder('bezierCurveTo',[126.1,529.2,153.6,543.5,177.5,526])
	ctx.recodingOrder('bezierCurveTo',[177.5,526,201.8,517.2,201.8,459.6])
	ctx.recodingOrder('lineTo',[203.5,458.1])
	ctx.recodingOrder('lineTo',[235.3,458.1])
	ctx.recodingOrder('bezierCurveTo',[235.3,458.1,232.8,497,248.3,518.1])
	ctx.recodingOrder('bezierCurveTo',[248.3,518.1,285.8,546,317.4,525.3000000000001])
	ctx.recodingOrder('lineTo',[318.2,514.6])
	ctx.recodingOrder('lineTo',[323.2,518.7])
	ctx.recodingOrder('lineTo',[340.3,507.20000000000005])
	ctx.recodingOrder('bezierCurveTo',[340.3,507.20000000000005,326.6,469.30000000000007,310.1,444.40000000000003])
	ctx.recodingOrder('bezierCurveTo',[310.1,444.40000000000003,216.90000000000003,469.3,135.20000000000002,448.70000000000005])
	ctx.recodingOrder('lineTo',[126.1,444.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();//

	ctx.fillStyle="#E94441";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[120.2,651.2])
	ctx.recodingOrder('bezierCurveTo',[120.2,651.2,125.4,667.4000000000001,123,677.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[120.6,688.4000000000001,127.2,689.3000000000001,127.2,689.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[127.2,689.3000000000001,203.3,694.2,209.2,683.5000000000001])
	ctx.recodingOrder('bezierCurveTo',[215.1,672.8000000000001,210.79999999999998,650.9000000000001,210.79999999999998,650.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[210.79999999999998,650.9000000000001,172.2,663.3,120.2,651.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();//

	ctx.fillStyle="#E94441";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[226.6,650.9])
	ctx.recodingOrder('bezierCurveTo',[226.6,650.9,219.7,679.9,232.4,687])
	ctx.recodingOrder('bezierCurveTo',[232.4,687,264.3,693.4,305.8,687])
	ctx.recodingOrder('bezierCurveTo',[305.8,687,324.1,686.3,317.40000000000003,678.5])
	ctx.recodingOrder('bezierCurveTo',[317.40000000000003,678.5,311.40000000000003,677.1,314.3,672.5])
	ctx.recodingOrder('bezierCurveTo',[317.2,667.8,316.1,651.6,316.1,651.6])
	ctx.recodingOrder('bezierCurveTo',[316.1,651.6,278,661.5,226.6,650.9])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();//

	ctx.fillStyle="#E94441";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[114.9,566.8])
	ctx.recodingOrder('bezierCurveTo',[114.9,566.8,110.30000000000001,591.8,111.4,603.0999999999999])
	ctx.recodingOrder('lineTo',[112.30000000000001,606.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[112.30000000000001,606.1999999999999,133.60000000000002,603.9999999999999,160.3,611.3])
	ctx.recodingOrder('bezierCurveTo',[187,618.5999999999999,211.8,617.6999999999999,211.8,617.6999999999999])
	ctx.recodingOrder('lineTo',[212.9,607.4])
	ctx.recodingOrder('lineTo',[226.70000000000002,607.4])
	ctx.recodingOrder('lineTo',[229.8,617.6])
	ctx.recodingOrder('bezierCurveTo',[229.8,617.6,256.7,615.2,273.90000000000003,611.4])
	ctx.recodingOrder('bezierCurveTo',[291.1,607.6,325.70000000000005,606.1999999999999,325.70000000000005,606.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[325.70000000000005,606.1999999999999,325.20000000000005,581.9,319.40000000000003,565.4999999999999])
	ctx.recodingOrder('lineTo',[298.1,575.3999999999999])
	ctx.recodingOrder('bezierCurveTo',[298.1,575.3999999999999,296.3,584.7999999999998,284.40000000000003,585.0999999999999])
	ctx.recodingOrder('lineTo',[279.90000000000003,584.3999999999999])
	ctx.recodingOrder('lineTo',[241.50000000000003,591.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[241.50000000000003,591.5999999999999,232.30000000000004,597.5999999999999,217.90000000000003,597.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[203.50000000000003,596.5999999999999,195.30000000000004,592.1999999999999,195.30000000000004,592.1999999999999])
	ctx.recodingOrder('lineTo',[146.10000000000002,584.3])
	ctx.recodingOrder('bezierCurveTo',[146,584.4,123.5,578.7,114.9,566.8])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();//

	ctx.fillStyle="#E1B391";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[121,605.4])
	ctx.recodingOrder('lineTo',[125.8,631])
	ctx.recodingOrder('bezierCurveTo',[125.8,631,185.3,634.7,209.1,631])
	ctx.recodingOrder('lineTo',[207.1,616.8])
	ctx.recodingOrder('bezierCurveTo',[207.1,616.8,174.5,616.3,150.2,610.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[125.89999999999998,603.8999999999999,121,605.4,121,605.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();//

	ctx.fillStyle="#E1B391";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[231,617.5])
	ctx.recodingOrder('lineTo',[229.7,630.6])
	ctx.recodingOrder('bezierCurveTo',[229.7,630.6,304,632.8000000000001,314.2,629.8000000000001])
	ctx.recodingOrder('lineTo',[317.8,606.2])
	ctx.recodingOrder('bezierCurveTo',[317.8,606.2,288.40000000000003,608.2,269.90000000000003,612.1])
	ctx.recodingOrder('bezierCurveTo',[251.40000000000003,616,231,617.5,231,617.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();//

	ctx.fillStyle="#E1B391";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[226.2,511])
	ctx.recodingOrder('bezierCurveTo',[233.2,540.5,261.4,546.2,261.4,546.2])
	ctx.recodingOrder('lineTo',[233.59999999999997,551.1])
	ctx.recodingOrder('bezierCurveTo',[219.99999999999997,542.3000000000001,202.69999999999996,551.5,202.69999999999996,551.5])
	ctx.recodingOrder('lineTo',[172.79999999999995,546.8])
	ctx.recodingOrder('bezierCurveTo',[197.09999999999997,538.8,205.89999999999995,515.6999999999999,205.89999999999995,515.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[216.49999999999994,499.29999999999995,211.79999999999995,457.29999999999995,211.79999999999995,457.29999999999995])
	ctx.recodingOrder('lineTo',[222.89999999999995,457.29999999999995])
	ctx.recodingOrder('bezierCurveTo',[222.9,457.3,217.7,481.3,226.2,511])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
ctx.recodingOrder('save'); ctx = getCtx();//

	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[425.9,267.7])
	ctx.recodingOrder('bezierCurveTo',[426.2,268.4,437.59999999999997,268.59999999999997,442.9,266.7])
	ctx.recodingOrder('bezierCurveTo',[451,263.9,456.29999999999995,259.7,459.4,254.89999999999998])
	ctx.recodingOrder('bezierCurveTo',[475.4,229.79999999999998,444.59999999999997,186.09999999999997,410.5,213.09999999999997])
	ctx.recodingOrder('bezierCurveTo',[410.5,213.1,424.7,245.2,425.9,267.7])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[432.7,271.5])
	ctx.recodingOrder('bezierCurveTo',[430.9,271.5,429.09999999999997,271.4,427.2,271.1])
	ctx.recodingOrder('bezierCurveTo',[425.5,270.90000000000003,424.3,269.3,424.5,267.6])
	ctx.recodingOrder('bezierCurveTo',[424.7,265.90000000000003,426.4,264.70000000000005,428,264.90000000000003])
	ctx.recodingOrder('bezierCurveTo',[432.9,265.6,437.6,265.20000000000005,441.7,263.8])
	ctx.recodingOrder('bezierCurveTo',[448.7,261.40000000000003,453.7,257.8,456.59999999999997,253.3])
	ctx.recodingOrder('bezierCurveTo',[464.49999999999994,241,459.4,224.3,449.9,215.3])
	ctx.recodingOrder('bezierCurveTo',[445.09999999999997,210.70000000000002,432,201.5,414.09999999999997,214.20000000000002])
	ctx.recodingOrder('bezierCurveTo',[412.7,215.20000000000002,410.7,214.9,409.7,213.50000000000003])
	ctx.recodingOrder('bezierCurveTo',[408.7,212.10000000000002,409,210.10000000000002,410.4,209.10000000000002])
	ctx.recodingOrder('bezierCurveTo',[425.4,198.40000000000003,441.7,199.00000000000003,454.09999999999997,210.8])
	ctx.recodingOrder('bezierCurveTo',[465.4,221.5,471.4,241.60000000000002,461.7,256.7])
	ctx.recodingOrder('bezierCurveTo',[458,262.5,451.9,266.9,443.59999999999997,269.8])
	ctx.recodingOrder('bezierCurveTo',[440.4,270.9,436.6,271.5,432.7,271.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#80413A";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[96.3,514.1])
	ctx.recodingOrder('bezierCurveTo',[96,514.1,95.7,514.1,95.3,513.9])
	ctx.recodingOrder('bezierCurveTo',[93.7,513.4,92.7,511.59999999999997,93.3,510])
	ctx.recodingOrder('bezierCurveTo',[101.5,484.5,114.4,460.5,123.8,444.9])
	ctx.recodingOrder('bezierCurveTo',[124.7,443.4,126.6,442.9,128.1,443.79999999999995])
	ctx.recodingOrder('bezierCurveTo',[129.6,444.69999999999993,130.1,446.59999999999997,129.2,448.09999999999997])
	ctx.recodingOrder('bezierCurveTo',[120,463.5,107.3,487,99.3,512])
	ctx.recodingOrder('bezierCurveTo',[98.8,513.3,97.6,514.1,96.3,514.1])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#80413A";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[340.3,510.3])
	ctx.recodingOrder('bezierCurveTo',[339,510.3,337.8,509.5,337.3,508.2])
	ctx.recodingOrder('bezierCurveTo',[328.90000000000003,483.59999999999997,316.40000000000003,460.8,307.3,446])
	ctx.recodingOrder('bezierCurveTo',[306.40000000000003,444.5,306.90000000000003,442.6,308.3,441.7])
	ctx.recodingOrder('bezierCurveTo',[309.8,440.8,311.7,441.3,312.6,442.7])
	ctx.recodingOrder('bezierCurveTo',[321.8,457.8,334.6,481.09999999999997,343.1,506.2])
	ctx.recodingOrder('bezierCurveTo',[343.70000000000005,507.8,342.8,509.59999999999997,341.1,510.2])
	ctx.recodingOrder('bezierCurveTo',[340.9,510.3,340.6,510.3,340.3,510.3])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#80413A";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[209.2,633])
	ctx.recodingOrder('bezierCurveTo',[207.6,633,206.2,631.8,206.1,630.2])
	ctx.recodingOrder('bezierCurveTo',[205.7,626.2,205.29999999999998,622.4000000000001,204.9,618.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[204.70000000000002,617.1,205.9,615.5000000000001,207.70000000000002,615.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[209.4,615.1,211.00000000000003,616.3000000000001,211.20000000000002,618.0000000000001])
	ctx.recodingOrder('bezierCurveTo',[211.60000000000002,621.6000000000001,212.00000000000003,625.5000000000001,212.4,629.5000000000001])
	ctx.recodingOrder('bezierCurveTo',[212.6,631.2000000000002,211.3,632.8000000000001,209.6,632.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[209.4,633,209.3,633,209.2,633])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#80413A";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[124.9,633.8])
	ctx.recodingOrder('bezierCurveTo',[123.4,633.8,122.10000000000001,632.6999999999999,121.80000000000001,631.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[121.10000000000001,627.5999999999999,120.50000000000001,624.0999999999999,120.00000000000001,620.9999999999999])
	ctx.recodingOrder('lineTo',[119.50000000000001,617.7999999999998])
	ctx.recodingOrder('bezierCurveTo',[118.90000000000002,614.1999999999998,118.30000000000001,610.5999999999998,117.90000000000002,606.7999999999998])
	ctx.recodingOrder('bezierCurveTo',[117.70000000000002,605.0999999999998,118.90000000000002,603.4999999999999,120.60000000000002,603.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[122.30000000000003,603.0999999999998,123.90000000000002,604.2999999999998,124.10000000000002,605.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[124.60000000000002,609.6999999999999,125.10000000000002,613.2999999999998,125.70000000000002,616.6999999999999])
	ctx.recodingOrder('lineTo',[126.20000000000002,619.9])
	ctx.recodingOrder('bezierCurveTo',[126.70000000000002,622.9,127.30000000000001,626.4,128.00000000000003,630])
	ctx.recodingOrder('bezierCurveTo',[128.30000000000004,631.7,127.20000000000003,633.3,125.50000000000003,633.7])
	ctx.recodingOrder('bezierCurveTo',[125.3,633.8,125.1,633.8,124.9,633.8])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#80413A";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[229.7,633.8])
	ctx.recodingOrder('bezierCurveTo',[229.6,633.8,229.5,633.8,229.39999999999998,633.8])
	ctx.recodingOrder('bezierCurveTo',[227.7,633.5999999999999,226.39999999999998,632.0999999999999,226.59999999999997,630.4])
	ctx.recodingOrder('bezierCurveTo',[226.99999999999997,626.1,227.49999999999997,621.9,227.89999999999998,618.1])
	ctx.recodingOrder('bezierCurveTo',[228.09999999999997,616.4,229.7,615.2,231.39999999999998,615.4])
	ctx.recodingOrder('bezierCurveTo',[233.09999999999997,615.6,234.29999999999998,617.1999999999999,234.2,618.9])
	ctx.recodingOrder('bezierCurveTo',[233.79999999999998,622.6999999999999,233.29999999999998,626.8,232.89999999999998,631])
	ctx.recodingOrder('bezierCurveTo',[232.7,632.6,231.3,633.8,229.7,633.8])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#80413A";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[314.2,633])
	ctx.recodingOrder('bezierCurveTo',[314,633,313.8,633,313.59999999999997,632.9])
	ctx.recodingOrder('bezierCurveTo',[311.9,632.6,310.79999999999995,631,311.09999999999997,629.3])
	ctx.recodingOrder('bezierCurveTo',[311.7,626.0999999999999,312.2,623,312.7,620.3])
	ctx.recodingOrder('lineTo',[313.3,616.9])
	ctx.recodingOrder('bezierCurveTo',[313.8,613.6999999999999,314.3,610.5,314.8,607.1])
	ctx.recodingOrder('bezierCurveTo',[315,605.4,316.6,604.2,318.3,604.4])
	ctx.recodingOrder('bezierCurveTo',[320,604.6,321.2,606.1999999999999,321,607.9])
	ctx.recodingOrder('bezierCurveTo',[320.6,611.4,320.1,614.6999999999999,319.5,618])
	ctx.recodingOrder('lineTo',[318.9,621.4])
	ctx.recodingOrder('bezierCurveTo',[318.4,624.1999999999999,317.9,627.3,317.29999999999995,630.5])
	ctx.recodingOrder('bezierCurveTo',[317,631.9,315.7,633,314.2,633])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[117.9,427.3])
	ctx.recodingOrder('bezierCurveTo',[110,459.90000000000003,204.8,456.5,219.10000000000002,456.5])
	ctx.recodingOrder('bezierCurveTo',[239.60000000000002,456.6,265.40000000000003,454.3,285.40000000000003,449.8])
	ctx.recodingOrder('bezierCurveTo',[295.8,447.40000000000003,325.50000000000006,444.40000000000003,320.1,422.8])
	ctx.recodingOrder('bezierCurveTo',[320.1,422.8,240.20000000000002,445.90000000000003,119.50000000000003,425.90000000000003])
	ctx.recodingOrder('lineTo',[117.9,427.3])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#80413A";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[212.2,436.5])
	ctx.recodingOrder('bezierCurveTo',[172.1,436.5,126.1,433.9,84.89999999999999,416.8])
	ctx.recodingOrder('bezierCurveTo',[70.1,410.7,56.89999999999999,402.8,45.69999999999999,393.40000000000003])
	ctx.recodingOrder('bezierCurveTo',[17.5,369.5,1.4,334.6,0.3,295])
	ctx.recodingOrder('bezierCurveTo',[-0.8,256,11.9,213.1,36.9,171])
	ctx.recodingOrder('bezierCurveTo',[38.9,167.6,41.199999999999996,164.5,43.4,161.5])
	ctx.recodingOrder('bezierCurveTo',[32.3,156.9,23.799999999999997,147.6,20.7,136.3])
	ctx.recodingOrder('bezierCurveTo',[16.9,122.50000000000001,21.5,108.00000000000001,33.4,95.4])
	ctx.recodingOrder('bezierCurveTo',[46.2,82,66.9,79.6,79.5,85.1])
	ctx.recodingOrder('bezierCurveTo',[92.4,90.69999999999999,97.3,101.19999999999999,99,107.1])
	ctx.recodingOrder('bezierCurveTo',[99.6,106.8,100.3,106.5,100.9,106.1])
	ctx.recodingOrder('bezierCurveTo',[102.4,105.3,104.30000000000001,105.89999999999999,105.10000000000001,107.5])
	ctx.recodingOrder('bezierCurveTo',[105.9,109,105.30000000000001,110.9,103.7,111.7])
	ctx.recodingOrder('bezierCurveTo',[101.7,112.7,99.9,113.60000000000001,98.2,114.5])
	ctx.recodingOrder('bezierCurveTo',[97.3,115,96.2,115,95.3,114.5])
	ctx.recodingOrder('bezierCurveTo',[94.39999999999999,114,93.8,113.1,93.7,112.1])
	ctx.recodingOrder('bezierCurveTo',[93.60000000000001,111.5,91.8,97.3,77,90.89999999999999])
	ctx.recodingOrder('bezierCurveTo',[66.3,86.3,48.8,88.3,37.9,99.69999999999999])
	ctx.recodingOrder('bezierCurveTo',[27.5,110.6,23.5,122.89999999999999,26.7,134.6])
	ctx.recodingOrder('bezierCurveTo',[29.599999999999998,145.2,38.2,153.79999999999998,49.3,156.9])
	ctx.recodingOrder('bezierCurveTo',[50.3,157.20000000000002,51.099999999999994,157.9,51.4,158.9])
	ctx.recodingOrder('bezierCurveTo',[51.7,159.9,51.6,161,50.9,161.8])
	ctx.recodingOrder('lineTo',[50.199999999999996,162.8])
	ctx.recodingOrder('bezierCurveTo',[47.49999999999999,166.4,44.599999999999994,170.10000000000002,42.199999999999996,174.20000000000002])
	ctx.recodingOrder('bezierCurveTo',[17.8,215.2,5.5,257,6.5,294.8])
	ctx.recodingOrder('bezierCurveTo',[7.5,332.7,22.9,365.9,49.7,388.5])
	ctx.recodingOrder('bezierCurveTo',[60.400000000000006,397.5,73,405.1,87.2,411])
	ctx.recodingOrder('bezierCurveTo',[128.5,428.1,175.2,430.4,215.2,430.2])
	ctx.recodingOrder('bezierCurveTo',[215.29999999999998,430.2,215.29999999999998,430.2,215.29999999999998,430.2])
	ctx.recodingOrder('lineTo',[215.99999999999997,430.2])
	ctx.recodingOrder('bezierCurveTo',[216.69999999999996,430.2,217.39999999999998,430.2,218.09999999999997,430.2])
	ctx.recodingOrder('bezierCurveTo',[263.09999999999997,430.2,298.5,425.9,329.29999999999995,416.59999999999997])
	ctx.recodingOrder('bezierCurveTo',[357.09999999999997,408.2,379.4,394.9,395.59999999999997,376.99999999999994])
	ctx.recodingOrder('bezierCurveTo',[410.7,360.29999999999995,420.49999999999994,338.99999999999994,424.09999999999997,315.3999999999999])
	ctx.recodingOrder('bezierCurveTo',[427.59999999999997,291.99999999999994,425.4,266.2999999999999,417.49999999999994,239.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[414.19999999999993,227.7999999999999,409.99999999999994,216.2999999999999,404.8999999999999,204.99999999999991])
	ctx.recodingOrder('bezierCurveTo',[404.19999999999993,203.39999999999992,404.8999999999999,201.5999999999999,406.49999999999994,200.89999999999992])
	ctx.recodingOrder('bezierCurveTo',[408.09999999999997,200.19999999999993,409.8999999999999,200.89999999999992,410.59999999999997,202.49999999999991])
	ctx.recodingOrder('bezierCurveTo',[415.79999999999995,214.0999999999999,420.09999999999997,225.89999999999992,423.49999999999994,237.39999999999992])
	ctx.recodingOrder('bezierCurveTo',[431.69999999999993,265.49999999999994,433.8999999999999,292.0999999999999,430.19999999999993,316.3999999999999])
	ctx.recodingOrder('bezierCurveTo',[426.3999999999999,341.19999999999993,415.99999999999994,363.69999999999993,400.0999999999999,381.29999999999995])
	ctx.recodingOrder('bezierCurveTo',[383.0999999999999,400.09999999999997,359.8999999999999,414.09999999999997,330.9999999999999,422.69999999999993])
	ctx.recodingOrder('bezierCurveTo',[298.9999999999999,432.29999999999995,262.4999999999999,436.69999999999993,215.4999999999999,436.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[214.5,436.5,213.3,436.5,212.2,436.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#F0D4C1";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[77.9,119.4])
	ctx.recodingOrder('bezierCurveTo',[74.5,104,54.4,95,44,112.3])
	ctx.recodingOrder('bezierCurveTo',[38.7,121.1,42.7,137.2,59.2,140])
	ctx.recodingOrder('bezierCurveTo',[62.2,134.1,68.4,125.9,77.9,119.4])
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[78.1,289.1])
	ctx.recodingOrder('bezierCurveTo',[68.19999999999999,350.70000000000005,153.7,359.40000000000003,162.3,301])
	ctx.recodingOrder('bezierCurveTo',[172,235.9,88.5,223.8,78.1,289.1])
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#590C10";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[145,294.2])
	ctx.recodingOrder('bezierCurveTo',[145,305.5,137.6,314.59999999999997,128.5,314.59999999999997])
	ctx.recodingOrder('bezierCurveTo',[119.4,314.59999999999997,112,305.49999999999994,112,294.2])
	ctx.recodingOrder('bezierCurveTo',[112,282.9,119.4,273.8,128.5,273.8])
	ctx.recodingOrder('bezierCurveTo',[137.6,273.8,145,282.9,145,294.2])
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[353.3,289])
	ctx.recodingOrder('bezierCurveTo',[363.1,350.5,277.8,359.3,269.1,300.9])
	ctx.recodingOrder('bezierCurveTo',[259.4,235.9,342.9,223.8,353.3,289])
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#590C10";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[319.9,294.2])
	ctx.recodingOrder('bezierCurveTo',[319.9,305.5,312.5,314.59999999999997,303.4,314.59999999999997])
	ctx.recodingOrder('bezierCurveTo',[294.29999999999995,314.59999999999997,286.9,305.49999999999994,286.9,294.2])
	ctx.recodingOrder('bezierCurveTo',[286.9,282.9,294.29999999999995,273.8,303.4,273.8])
	ctx.recodingOrder('bezierCurveTo',[312.5,273.8,319.9,282.9,319.9,294.2])
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[137.9,82.2])
	ctx.recodingOrder('bezierCurveTo',[121,81.2,100.2,97.60000000000001,102.60000000000001,116])
	ctx.recodingOrder('bezierCurveTo',[104.2,128.3,118.80000000000001,137.8,128.10000000000002,144])
	ctx.recodingOrder('bezierCurveTo',[151.00000000000003,159.2,177.20000000000002,170.4,203.10000000000002,179.6])
	ctx.recodingOrder('bezierCurveTo',[236.10000000000002,191.29999999999998,270.40000000000003,199.2,305.1,203])
	ctx.recodingOrder('bezierCurveTo',[323.3,205,342.8,208,361.6,208.4])
	ctx.recodingOrder('bezierCurveTo',[375,208.70000000000002,403,210.8,413.3,200.5])
	ctx.recodingOrder('bezierCurveTo',[421.8,192,420.7,173.7,416.3,163.7])
	ctx.recodingOrder('bezierCurveTo',[413.1,156.5,406.6,150.39999999999998,398.8,149.5])
	ctx.recodingOrder('bezierCurveTo',[397.5,149.3,401.2,149.3,400.5,150.5])
	ctx.recodingOrder('bezierCurveTo',[312.4,143.6,225.5,121.3,145,84.8])
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#F8F5E3";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[214.4,319])
	ctx.recodingOrder('bezierCurveTo',[186.70000000000002,319,152.9,335.7,152.9,366.4])
	ctx.recodingOrder('bezierCurveTo',[152.9,391,181.4,410.7,214.2,410.7])
	ctx.recodingOrder('bezierCurveTo',[247.39999999999998,410.7,275.5,394.5,275.5,366.5])
	ctx.recodingOrder('bezierCurveTo',[275.6,336.5,241.3,319,214.4,319])
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#7A1D1E";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[208.9,337.3])
	ctx.recodingOrder('bezierCurveTo',[216.20000000000002,331.6,228.9,336.3,228.20000000000002,341.40000000000003])
	ctx.recodingOrder('bezierCurveTo',[227.9,344.00000000000006,222.20000000000002,348.90000000000003,217.20000000000002,350.8])
	ctx.recodingOrder('bezierCurveTo',[217.1,350.9,201.5,343,208.9,337.3])
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[113,571.1])
	ctx.recodingOrder('bezierCurveTo',[100.2,570.3000000000001,87.6,566.5,76.5,560.1])
	ctx.recodingOrder('bezierCurveTo',[71.4,557.2,66.6,553.6,63,548.9])
	ctx.recodingOrder('bezierCurveTo',[57.7,542,55.4,532.9,57,524.3])
	ctx.recodingOrder('bezierCurveTo',[57.9,519,61.6,507.79999999999995,68.1,506.9])
	ctx.recodingOrder('bezierCurveTo',[78.1,505.59999999999997,88.6,507.9,97.19999999999999,513.3])
	ctx.recodingOrder('bezierCurveTo',[102.1,516.5,106.49999999999999,520.6999999999999,111.39999999999999,523.8])
	ctx.recodingOrder('bezierCurveTo',[111.39999999999999,523.8,104.1,544.0999999999999,109.8,558.6999999999999])
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[322.9,569.4])
	ctx.recodingOrder('bezierCurveTo',[334.7,566.1,346,561.3,356.5,555.1])
	ctx.recodingOrder('bezierCurveTo',[366.9,549,376.7,538.3000000000001,376.6,525.5])
	ctx.recodingOrder('bezierCurveTo',[376.6,517.8,373,510,366.6,505.8])
	ctx.recodingOrder('bezierCurveTo',[358.20000000000005,500.3,349.90000000000003,503.6,341.90000000000003,507.7])
	ctx.recodingOrder('bezierCurveTo',[334.50000000000006,511.5,327.1,515.7,319.70000000000005,519.6])
	ctx.recodingOrder('bezierCurveTo',[319.70000000000005,519.6,331.50000000000006,523.4,328.1,551.2])
	ctx.recodingOrder('lineTo',[320.70000000000005,566.9000000000001])
	ctx.recodingOrder('lineTo',[322.9,569.4])
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[113,574.2])
	ctx.recodingOrder('bezierCurveTo',[112.9,574.2,112.9,574.2,112.8,574.2])
	ctx.recodingOrder('bezierCurveTo',[99.5,573.4000000000001,86.4,569.4000000000001,74.9,562.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[68.60000000000001,559.1,63.800000000000004,555.2,60.50000000000001,550.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[54.70000000000001,543.4000000000001,52.2,533.2,53.800000000000004,523.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[55.300000000000004,515.6000000000001,59.00000000000001,509.30000000000007,64.60000000000001,505.7000000000001])
	ctx.recodingOrder('bezierCurveTo',[69.80000000000001,502.4000000000001,76.4,501.7000000000001,83.70000000000002,503.6000000000001])
	ctx.recodingOrder('bezierCurveTo',[90.40000000000002,505.4000000000001,96.20000000000002,508.9000000000001,101.80000000000001,512.2])
	ctx.recodingOrder('lineTo',[112.00000000000001,518.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[113.50000000000001,519.2,114.00000000000001,521.1,113.10000000000001,522.6])
	ctx.recodingOrder('bezierCurveTo',[112.2,524.1,110.30000000000001,524.6,108.80000000000001,523.7])
	ctx.recodingOrder('lineTo',[98.60000000000001,517.6])
	ctx.recodingOrder('bezierCurveTo',[93.30000000000001,514.5,87.9,511.20000000000005,82.10000000000001,509.6])
	ctx.recodingOrder('bezierCurveTo',[76.50000000000001,508.1,71.80000000000001,508.5,68.00000000000001,510.90000000000003])
	ctx.recodingOrder('bezierCurveTo',[63.90000000000001,513.5,61.20000000000002,518.3000000000001,60.000000000000014,524.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[58.600000000000016,532.6000000000001,60.70000000000002,540.9000000000001,65.40000000000002,547.0000000000001])
	ctx.recodingOrder('bezierCurveTo',[68.30000000000003,550.8000000000001,72.30000000000003,554.1000000000001,78.00000000000001,557.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[88.70000000000002,563.6000000000001,100.80000000000001,567.2,113.10000000000002,568.0000000000001])
	ctx.recodingOrder('bezierCurveTo',[114.80000000000003,568.1000000000001,116.10000000000002,569.6000000000001,116.00000000000003,571.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[116,572.9,114.6,574.2,113,574.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[98.9,606.2])
	ctx.recodingOrder('bezierCurveTo',[90.7,606.2,82.60000000000001,604,75.60000000000001,599.7])
	ctx.recodingOrder('bezierCurveTo',[72.00000000000001,597.5,69.00000000000001,594.9000000000001,66.60000000000001,592.1])
	ctx.recodingOrder('bezierCurveTo',[56.10000000000001,579.3000000000001,57.10000000000001,560.5,58.70000000000001,547.4])
	ctx.recodingOrder('bezierCurveTo',[58.90000000000001,545.6999999999999,60.50000000000001,544.5,62.20000000000001,544.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[63.90000000000001,544.9,65.10000000000001,546.4999999999999,64.9,548.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[63.400000000000006,560.0999999999999,62.400000000000006,577.1999999999999,71.4,588.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[73.30000000000001,590.3999999999999,75.80000000000001,592.4999999999999,78.80000000000001,594.3999999999999])
	ctx.recodingOrder('bezierCurveTo',[87.80000000000001,599.8999999999999,99.00000000000001,601.4999999999999,109.50000000000001,598.4999999999999])
	ctx.recodingOrder('bezierCurveTo',[111.20000000000002,597.9999999999999,112.90000000000002,598.9999999999999,113.40000000000002,600.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[113.90000000000002,602.4,112.90000000000002,604.0999999999999,111.20000000000002,604.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[107.2,605.6,103,606.2,98.9,606.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[322.4,572.5])
	ctx.recodingOrder('bezierCurveTo',[321,572.5,319.79999999999995,571.6,319.4,570.2])
	ctx.recodingOrder('bezierCurveTo',[318.9,568.5,319.9,566.8000000000001,321.59999999999997,566.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[333.09999999999997,563.1,344.2,558.4000000000001,354.49999999999994,552.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[363.49999999999994,547.0000000000001,373.09999999999997,537.2,373.09999999999997,525.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[373.09999999999997,518.5000000000001,369.7,511.80000000000007,364.49999999999994,508.30000000000007])
	ctx.recodingOrder('bezierCurveTo',[357.99999999999994,504.00000000000006,351.69999999999993,505.9000000000001,342.8999999999999,510.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[339.0999999999999,512.4000000000001,335.3999999999999,514.4000000000001,331.5999999999999,516.4000000000001])
	ctx.recodingOrder('lineTo',[324.69999999999993,520.1000000000001])
	ctx.recodingOrder('bezierCurveTo',[323.19999999999993,520.9000000000001,321.29999999999995,520.3000000000002,320.49999999999994,518.8000000000002])
	ctx.recodingOrder('bezierCurveTo',[319.69999999999993,517.3000000000002,320.29999999999995,515.4000000000002,321.79999999999995,514.6000000000001])
	ctx.recodingOrder('lineTo',[328.59999999999997,510.90000000000015])
	ctx.recodingOrder('bezierCurveTo',[332.4,508.8000000000001,336.2,506.8000000000001,339.99999999999994,504.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[348.29999999999995,500.5000000000001,357.8999999999999,496.5000000000001,367.8999999999999,503.0000000000001])
	ctx.recodingOrder('bezierCurveTo',[374.8999999999999,507.60000000000014,379.2999999999999,516.2000000000002,379.2999999999999,525.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[379.2999999999999,539.7,368.0999999999999,551.5000000000001,357.5999999999999,557.6])
	ctx.recodingOrder('bezierCurveTo',[346.7999999999999,563.9,335.19999999999993,568.8000000000001,323.19999999999993,572.2])
	ctx.recodingOrder('bezierCurveTo',[323,572.5,322.7,572.5,322.4,572.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[327.3,602.4])
	ctx.recodingOrder('bezierCurveTo',[327,602.4,326.8,602.4,326.5,602.4])
	ctx.recodingOrder('bezierCurveTo',[324.8,602.4,323.4,600.9,323.4,599.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[323.4,597.4999999999999,324.79999999999995,596.0999999999999,326.5,596.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[327,596.0999999999999,327,596.0999999999999,327.3,596.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[333.90000000000003,596.0999999999999,340.40000000000003,594.8,346,592.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[354.5,588.3,361.2,581.5999999999999,364.5,573.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[368.2,564.9,366.9,558.4,365,549.4])
	ctx.recodingOrder('lineTo',[364.4,546.5])
	ctx.recodingOrder('bezierCurveTo',[364.09999999999997,544.8,365.2,543.2,366.9,542.8])
	ctx.recodingOrder('bezierCurveTo',[368.59999999999997,542.4,370.2,543.5999999999999,370.59999999999997,545.3])
	ctx.recodingOrder('lineTo',[371.2,548.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[373.09999999999997,557.4999999999999,374.8,565.5999999999999,370.3,576.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[366.40000000000003,585.4999999999999,358.5,593.4999999999999,348.6,597.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[342.1,600.9,334.8,602.4,327.3,602.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[161,693.9])
	ctx.recodingOrder('bezierCurveTo',[150.6,693.9,140.2,693.4,129.9,692.3])
	ctx.recodingOrder('bezierCurveTo',[128.20000000000002,692.0999999999999,122.5,691.1999999999999,119.60000000000001,687.5])
	ctx.recodingOrder('bezierCurveTo',[118.4,685.9,117.9,684,118.2,682])
	ctx.recodingOrder('bezierCurveTo',[118.5,680,119.60000000000001,678.6,120.4,677.4])
	ctx.recodingOrder('bezierCurveTo',[120.80000000000001,676.8,121.2,676.1999999999999,121.4,675.8])
	ctx.recodingOrder('bezierCurveTo',[121.9,674.6999999999999,121.60000000000001,673.1999999999999,121.30000000000001,671.1999999999999])
	ctx.recodingOrder('lineTo',[118.4,655.4])
	ctx.recodingOrder('bezierCurveTo',[118.10000000000001,653.6999999999999,119.2,652.1,120.9,651.8])
	ctx.recodingOrder('bezierCurveTo',[122.60000000000001,651.5,124.2,652.5999999999999,124.5,654.3])
	ctx.recodingOrder('lineTo',[127.4,670.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[127.80000000000001,672.3,128.3,675.3,127.10000000000001,678.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[126.60000000000001,679.4,125.9,680.3,125.30000000000001,681.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[124.80000000000001,681.8,124.30000000000001,682.4999999999999,124.20000000000002,682.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[124.20000000000002,683.1999999999999,124.20000000000002,683.3999999999999,124.40000000000002,683.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[125.20000000000002,684.8,127.70000000000002,685.8,130.40000000000003,685.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[152.80000000000004,688.3999999999999,175.50000000000003,688.0999999999999,197.80000000000004,685.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[200.90000000000003,684.8,203.80000000000004,684.3,205.60000000000005,682.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[207.50000000000006,680.8,208.20000000000005,677.6999999999999,208.60000000000005,674.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[209.70000000000005,666.9,209.90000000000006,658.9999999999999,209.00000000000006,651.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[208.80000000000007,649.3999999999999,210.10000000000005,647.8,211.80000000000007,647.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[213.50000000000006,647.4999999999999,215.10000000000008,648.8,215.20000000000007,650.4999999999999])
	ctx.recodingOrder('bezierCurveTo',[216.10000000000008,658.8999999999999,215.90000000000006,667.2999999999998,214.70000000000007,675.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[214.10000000000008,679.5999999999999,213.10000000000008,684.0999999999999,209.70000000000007,687.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[206.50000000000009,690.0999999999999,202.40000000000006,690.9,198.40000000000006,691.4])
	ctx.recodingOrder('bezierCurveTo',[186.2,693.1,173.6,693.9,161,693.9])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[269.1,692.4])
	ctx.recodingOrder('bezierCurveTo',[259.20000000000005,692.4,249.50000000000003,692,238.00000000000003,691.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[235.00000000000003,690.9999999999999,232.10000000000002,690.5999999999999,229.40000000000003,689.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[222.00000000000003,685.0999999999999,221.50000000000003,674.9,221.40000000000003,671.4999999999999])
	ctx.recodingOrder('bezierCurveTo',[221.10000000000002,664.7999999999998,221.30000000000004,658.0999999999999,222.00000000000003,651.3999999999999])
	ctx.recodingOrder('bezierCurveTo',[222.20000000000002,649.6999999999998,223.80000000000004,648.3999999999999,225.40000000000003,648.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[227.10000000000002,648.8,228.40000000000003,650.3,228.20000000000005,651.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[227.50000000000006,658.2999999999998,227.30000000000004,664.7999999999998,227.60000000000005,671.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[227.90000000000006,677.8,229.50000000000006,681.8999999999999,232.40000000000006,683.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[234.00000000000006,684.4999999999999,236.10000000000005,684.6999999999999,238.40000000000006,684.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[260.30000000000007,686.5999999999999,275.70000000000005,686.2999999999998,298.30000000000007,685.2999999999998])
	ctx.recodingOrder('lineTo',[298.9000000000001,685.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[311.80000000000007,684.7999999999998,313.9000000000001,682.5999999999998,314.2000000000001,681.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[314.3000000000001,681.7999999999998,314.2000000000001,681.1999999999999,313.6000000000001,680.3999999999999])
	ctx.recodingOrder('bezierCurveTo',[313.00000000000006,679.4999999999999,311.80000000000007,678.7999999999998,310.7000000000001,678.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[309.2000000000001,677.5999999999998,308.5000000000001,675.8999999999999,309.1000000000001,674.3999999999999])
	ctx.recodingOrder('bezierCurveTo',[311.80000000000007,667.1999999999998,312.9000000000001,659.0999999999999,314.00000000000006,651.2999999999998])
	ctx.recodingOrder('lineTo',[314.20000000000005,649.6999999999998])
	ctx.recodingOrder('bezierCurveTo',[314.40000000000003,647.9999999999998,316.00000000000006,646.7999999999998,317.70000000000005,646.9999999999998])
	ctx.recodingOrder('bezierCurveTo',[319.40000000000003,647.1999999999998,320.6,648.7999999999997,320.40000000000003,650.4999999999998])
	ctx.recodingOrder('lineTo',[320.20000000000005,652.0999999999998])
	ctx.recodingOrder('bezierCurveTo',[319.20000000000005,659.3999999999997,318.20000000000005,666.8999999999997,315.90000000000003,673.9999999999998])
	ctx.recodingOrder('bezierCurveTo',[317.00000000000006,674.6999999999998,318.1,675.6999999999998,318.90000000000003,676.9999999999998])
	ctx.recodingOrder('bezierCurveTo',[321.1,680.4999999999998,320.6,683.1999999999998,319.70000000000005,684.7999999999997])
	ctx.recodingOrder('bezierCurveTo',[317.00000000000006,689.9999999999998,307.80000000000007,691.0999999999997,299.1,691.4999999999998])
	ctx.recodingOrder('lineTo',[298.5,691.4999999999998])
	ctx.recodingOrder('bezierCurveTo',[287.6,692.1,278.3,692.4,269.1,692.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#80413A";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[219,611.6])
	ctx.recodingOrder('bezierCurveTo',[206.6,611.6,193.8,609.3000000000001,181.5,604.7])
	ctx.recodingOrder('bezierCurveTo',[179.9,604.1,179.1,602.3000000000001,179.7,600.7])
	ctx.recodingOrder('bezierCurveTo',[180.29999999999998,599.1,182.1,598.3000000000001,183.7,598.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[208.6,608.2,235.2,607.5000000000001,256.79999999999995,597.0000000000001])
	ctx.recodingOrder('bezierCurveTo',[258.4,596.2000000000002,260.19999999999993,596.9000000000001,260.99999999999994,598.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[261.79999999999995,600.0000000000001,261.09999999999997,601.8000000000001,259.59999999999997,602.6000000000001])
	ctx.recodingOrder('bezierCurveTo',[247.1,608.5,233.3,611.6,219,611.6])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[196,654.5])
	ctx.recodingOrder('bezierCurveTo',[208.2,653.3,221.2,649.6,214.8,635.9])
	ctx.recodingOrder('bezierCurveTo',[210.60000000000002,627,197.8,630.5,189.4,631.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[170,632.8,150.3,632.9,130.8,631.4])
	ctx.recodingOrder('bezierCurveTo',[126.9,631.1,122.80000000000001,630.8,119.20000000000002,632.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[113.20000000000002,634.4999999999999,112.60000000000002,642.0999999999999,115.20000000000002,646.8])
	ctx.recodingOrder('bezierCurveTo',[118.60000000000002,653,127.80000000000001,654.1999999999999,135.60000000000002,654.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[155.7,655.4,175.9,656.4,196,654.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[296.7,655.5])
	ctx.recodingOrder('bezierCurveTo',[307,655.1,324.8,654,323.59999999999997,639.1])
	ctx.recodingOrder('bezierCurveTo',[323.29999999999995,635.3000000000001,320.49999999999994,631.6,316.7,630.9])
	ctx.recodingOrder('bezierCurveTo',[315.59999999999997,630.6999999999999,314.5,630.6999999999999,313.3,630.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[288.2,631.4,263.7,632.0999999999999,238.5,630.8])
	ctx.recodingOrder('bezierCurveTo',[234.3,630.5999999999999,229.8,630.4,226,632.3])
	ctx.recodingOrder('bezierCurveTo',[213.9,638.3,221.3,651.5999999999999,231.4,653.4])
	ctx.recodingOrder('bezierCurveTo',[253,657.2,274.9,656.3,296.7,655.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[170.6,658.7])
	ctx.recodingOrder('bezierCurveTo',[158.9,658.7,147.2,658.1,135.8,657.6])
	ctx.recodingOrder('bezierCurveTo',[127.30000000000001,657.2,116.9,655.8000000000001,112.80000000000001,648.2])
	ctx.recodingOrder('bezierCurveTo',[110.80000000000001,644.5,110.4,639.7,111.80000000000001,635.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[113.00000000000001,632.7,115.30000000000001,630.3000000000001,118.50000000000001,629.1000000000001])
	ctx.recodingOrder('bezierCurveTo',[122.70000000000002,627.5000000000001,127.20000000000002,627.8000000000002,131.3,628.1000000000001])
	ctx.recodingOrder('bezierCurveTo',[147.4,629.3000000000002,162,629.3000000000002,177.5,629.2000000000002])
	ctx.recodingOrder('lineTo',[187.8,629.2000000000002])
	ctx.recodingOrder('bezierCurveTo',[189.5,629.2000000000002,191.70000000000002,629.0000000000001,194,628.9000000000002])
	ctx.recodingOrder('bezierCurveTo',[203.6,628.2000000000002,215.6,627.3000000000002,218.2,634.8000000000002])
	ctx.recodingOrder('bezierCurveTo',[220.2,640.5000000000002,220,645.3000000000002,217.6,649.0000000000002])
	ctx.recodingOrder('bezierCurveTo',[213.6,655.2000000000003,204.79999999999998,656.8000000000002,196.79999999999998,657.6000000000003])
	ctx.recodingOrder('lineTo',[196.79999999999998,657.6000000000003])
	ctx.recodingOrder('bezierCurveTo',[188,658.4,179.3,658.7,170.6,658.7])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('moveTo',[126.1,634.2])
	ctx.recodingOrder('bezierCurveTo',[124.1,634.2,122.3,634.4000000000001,120.69999999999999,635])
	ctx.recodingOrder('bezierCurveTo',[119.29999999999998,635.6,118.19999999999999,636.6,117.69999999999999,638.1])
	ctx.recodingOrder('bezierCurveTo',[116.89999999999999,640.2,117.19999999999999,643.1,118.29999999999998,645.2])
	ctx.recodingOrder('bezierCurveTo',[120.89999999999998,650,129.2,651,136.1,651.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[155.79999999999998,652.3000000000001,176.2,653.3000000000001,196.1,651.4000000000001])
	ctx.recodingOrder('lineTo',[196.1,651.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[201.79999999999998,650.8000000000001,209.7,649.6000000000001,212.29999999999998,645.7])
	ctx.recodingOrder('bezierCurveTo',[213.6,643.7,213.6,640.7,212.29999999999998,636.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[211.29999999999998,634.0000000000001,199.49999999999997,634.8000000000001,194.49999999999997,635.2])
	ctx.recodingOrder('bezierCurveTo',[191.99999999999997,635.4000000000001,189.69999999999996,635.6,187.79999999999998,635.6])
	ctx.recodingOrder('lineTo',[177.49999999999997,635.6])
	ctx.recodingOrder('bezierCurveTo',[161.89999999999998,635.7,147.09999999999997,635.7,130.99999999999997,634.5])
	ctx.recodingOrder('bezierCurveTo',[129.3,634.3,127.6,634.2,126.1,634.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[268,659.4])
	ctx.recodingOrder('bezierCurveTo',[255.5,659.4,243,658.6999999999999,230.6,656.5])
	ctx.recodingOrder('bezierCurveTo',[223.5,655.2,217.4,649.3,216.5,642.8])
	ctx.recodingOrder('bezierCurveTo',[215.7,637.3,218.6,632.4,224.3,629.5])
	ctx.recodingOrder('bezierCurveTo',[229,627.2,234.4,627.4,238.3,627.7])
	ctx.recodingOrder('bezierCurveTo',[262,629,284.7,628.4000000000001,308.70000000000005,627.7])
	ctx.recodingOrder('lineTo',[312.50000000000006,627.6])
	ctx.recodingOrder('bezierCurveTo',[313.70000000000005,627.6,315.1000000000001,627.5,316.50000000000006,627.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[321.50000000000006,628.8000000000001,325.40000000000003,633.4000000000001,325.90000000000003,638.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[326.3,643.5000000000001,325.1,647.5000000000001,322.3,650.6])
	ctx.recodingOrder('bezierCurveTo',[316,657.7,303.1,658.3000000000001,296.1,658.5])
	ctx.recodingOrder('lineTo',[296.1,658.5])
	ctx.recodingOrder('bezierCurveTo',[286.9,659,277.5,659.4,268,659.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('moveTo',[234.3,633.8])
	ctx.recodingOrder('bezierCurveTo',[231.60000000000002,633.8,229.20000000000002,634.0999999999999,227.10000000000002,635.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[223.70000000000002,636.8,222.3,639.0999999999999,222.70000000000002,641.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[223.3,645.7999999999998,227.3,649.5999999999999,231.70000000000002,650.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[252.8,654.0999999999998,274.70000000000005,653.1999999999998,295.90000000000003,652.2999999999998])
	ctx.recodingOrder('lineTo',[295.90000000000003,652.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[301.90000000000003,652.0999999999998,313.1,651.5999999999998,317.6,646.4999999999999])
	ctx.recodingOrder('bezierCurveTo',[319.20000000000005,644.6999999999999,319.90000000000003,642.2999999999998,319.6,639.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[319.40000000000003,636.6999999999998,317.5,634.2999999999998,315.3,633.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[314.5,633.6999999999998,313.6,633.7999999999998,312.6,633.7999999999998])
	ctx.recodingOrder('lineTo',[308.8,633.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[284.6,634.5999999999999,261.8,635.1999999999998,237.9,633.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[236.7,633.8,235.4,633.8,234.3,633.8])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[129.1,677.9])
	ctx.recodingOrder('bezierCurveTo',[127.6,677.9,126.19999999999999,676.8,126,675.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[125.7,673.4999999999999,126.9,671.9,128.6,671.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[140.1,669.8999999999999,151.7,669.3999999999999,163.3,669.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[165,670.0999999999999,166.4,671.5999999999999,166.3,673.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[166.20000000000002,674.9999999999999,164.9,676.2999999999998,163,676.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[151.9,675.6999999999998,140.6,676.2999999999998,129.6,677.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[129.4,677.9,129.2,677.9,129.1,677.9])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="rgba(0,0,0,0)";
	ctx.strokeStyle="#824139";
	ctx.lineWidth=1.0984;
	ctx.lineCap="round";
	ctx.lineJoin="round";
	ctx.miterLimit="10";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[129.1,675.2])
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[275.4,677.1])
	ctx.recodingOrder('bezierCurveTo',[273.9,677.1,272.5,676,272.29999999999995,674.4])
	ctx.recodingOrder('bezierCurveTo',[272.09999999999997,672.6999999999999,273.29999999999995,671.1,274.99999999999994,670.9])
	ctx.recodingOrder('bezierCurveTo',[285.19999999999993,669.4,295.69999999999993,669.1,305.99999999999994,669.8])
	ctx.recodingOrder('bezierCurveTo',[307.69999999999993,669.9,308.99999999999994,671.4,308.8999999999999,673.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[308.7999999999999,674.8,307.19999999999993,676.0999999999999,305.5999999999999,675.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[295.69999999999993,675.2999999999998,285.69999999999993,675.6999999999999,275.8999999999999,677.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[275.7,677.1,275.6,677.1,275.4,677.1])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[327.7,588.6])
	ctx.recodingOrder('bezierCurveTo',[326.09999999999997,588.6,324.8,587.4,324.59999999999997,585.9])
	ctx.recodingOrder('bezierCurveTo',[324.4,584.1999999999999,325.59999999999997,582.6,327.29999999999995,582.4])
	ctx.recodingOrder('bezierCurveTo',[330.69999999999993,582,333.99999999999994,580.1999999999999,336.19999999999993,577.6])
	ctx.recodingOrder('bezierCurveTo',[337.29999999999995,576.3000000000001,339.29999999999995,576.1,340.5999999999999,577.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[341.8999999999999,578.4000000000001,342.0999999999999,580.4000000000001,340.8999999999999,581.7])
	ctx.recodingOrder('bezierCurveTo',[337.5999999999999,585.5,332.8999999999999,588,327.99999999999994,588.6])
	ctx.recodingOrder('bezierCurveTo',[327.9,588.6,327.8,588.6,327.7,588.6])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[105.4,589.5])
	ctx.recodingOrder('bezierCurveTo',[102.10000000000001,589.5,98.7,589,95.60000000000001,588.1])
	ctx.recodingOrder('bezierCurveTo',[93.9,587.6,93.00000000000001,585.9,93.4,584.2])
	ctx.recodingOrder('bezierCurveTo',[93.9,582.5,95.60000000000001,581.6,97.30000000000001,582])
	ctx.recodingOrder('bezierCurveTo',[101.4,583.2,105.80000000000001,583.4,110.00000000000001,582.8])
	ctx.recodingOrder('bezierCurveTo',[111.70000000000002,582.5999999999999,113.30000000000001,583.6999999999999,113.60000000000001,585.4])
	ctx.recodingOrder('bezierCurveTo',[113.9,587.1,112.7,588.6999999999999,111.00000000000001,589])
	ctx.recodingOrder('bezierCurveTo',[109.1,589.3,107.2,589.5,105.4,589.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[235.1,553.6])
	ctx.recodingOrder('bezierCurveTo',[233.5,553.6,232.1,552.4,232,550.7])
	ctx.recodingOrder('bezierCurveTo',[231.9,549,233.1,547.5,234.9,547.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[244.4,546.5000000000001,253.8,545.2,262.6,543.5000000000001])
	ctx.recodingOrder('bezierCurveTo',[264.3,543.1000000000001,265.90000000000003,544.3000000000001,266.3,546.0000000000001])
	ctx.recodingOrder('bezierCurveTo',[266.6,547.7000000000002,265.5,549.3000000000001,263.8,549.7000000000002])
	ctx.recodingOrder('bezierCurveTo',[254.70000000000002,551.5000000000001,245.20000000000002,552.8000000000002,235.4,553.6000000000001])
	ctx.recodingOrder('bezierCurveTo',[235.2,553.6,235.1,553.6,235.1,553.6])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[201.8,554.2])
	ctx.recodingOrder('bezierCurveTo',[201.8,554.2,201.70000000000002,554.2,201.70000000000002,554.2])
	ctx.recodingOrder('bezierCurveTo',[189.3,553.7,177.10000000000002,552.4000000000001,165.60000000000002,550.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[163.90000000000003,550.0000000000001,162.8,548.4000000000001,163.10000000000002,546.7])
	ctx.recodingOrder('bezierCurveTo',[163.40000000000003,545,165.10000000000002,543.9000000000001,166.70000000000002,544.2])
	ctx.recodingOrder('bezierCurveTo',[177.9,546.2,189.8,547.5,201.90000000000003,548])
	ctx.recodingOrder('bezierCurveTo',[203.60000000000002,548.1,205.00000000000003,549.5,204.90000000000003,551.3])
	ctx.recodingOrder('bezierCurveTo',[204.8,552.9,203.4,554.2,201.8,554.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[131.5,581.2])
	ctx.recodingOrder('bezierCurveTo',[131.1,581.2,130.6,581.1,130.2,580.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[120.89999999999999,576.6000000000001,114.29999999999998,571.7,110.49999999999999,566.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[102.69999999999999,555.3000000000001,106.39999999999999,537.4000000000001,108.29999999999998,530.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[108.69999999999999,528.6,110.39999999999998,527.6,112.09999999999998,528.1])
	ctx.recodingOrder('bezierCurveTo',[113.79999999999998,528.5,114.79999999999998,530.3000000000001,114.29999999999998,531.9])
	ctx.recodingOrder('bezierCurveTo',[110.79999999999998,545,111.19999999999999,556.6,115.59999999999998,562.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[118.69999999999997,567.0999999999999,124.69999999999997,571.4,132.79999999999998,575.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[134.39999999999998,575.9,135.1,577.8,134.29999999999998,579.4])
	ctx.recodingOrder('bezierCurveTo',[133.8,580.5,132.7,581.2,131.5,581.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[197.6,596.2])
	ctx.recodingOrder('bezierCurveTo',[197.5,596.2,197.4,596.2,197.4,596.2])
	ctx.recodingOrder('bezierCurveTo',[180.1,594.9000000000001,162.5,591.7,145.10000000000002,586.5])
	ctx.recodingOrder('bezierCurveTo',[143.40000000000003,586,142.50000000000003,584.3,143.00000000000003,582.6])
	ctx.recodingOrder('bezierCurveTo',[143.50000000000003,580.9000000000001,145.30000000000004,580,146.90000000000003,580.5])
	ctx.recodingOrder('bezierCurveTo',[163.90000000000003,585.5,181.00000000000003,588.7,197.90000000000003,590])
	ctx.recodingOrder('bezierCurveTo',[199.60000000000002,590.1,200.90000000000003,591.6,200.80000000000004,593.4])
	ctx.recodingOrder('bezierCurveTo',[200.6,594.9,199.2,596.2,197.6,596.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[238.4,595.4])
	ctx.recodingOrder('bezierCurveTo',[236.8,595.4,235.5,594.1999999999999,235.3,592.6])
	ctx.recodingOrder('bezierCurveTo',[235.10000000000002,590.9,236.3,589.3000000000001,238.10000000000002,589.1])
	ctx.recodingOrder('bezierCurveTo',[253.70000000000002,587.3000000000001,268.90000000000003,583.7,283.20000000000005,578.5])
	ctx.recodingOrder('bezierCurveTo',[284.80000000000007,577.9,286.6,578.7,287.20000000000005,580.4])
	ctx.recodingOrder('bezierCurveTo',[287.80000000000007,582,287.00000000000006,583.8,285.30000000000007,584.4])
	ctx.recodingOrder('bezierCurveTo',[270.50000000000006,589.8,254.80000000000007,593.5,238.70000000000007,595.4])
	ctx.recodingOrder('bezierCurveTo',[238.7,595.4,238.5,595.4,238.4,595.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[299.5,578.3])
	ctx.recodingOrder('bezierCurveTo',[298.3,578.3,297.2,577.5999999999999,296.7,576.5])
	ctx.recodingOrder('bezierCurveTo',[296,574.9,296.59999999999997,573.1,298.2,572.3])
	ctx.recodingOrder('bezierCurveTo',[300.2,571.4,302.2,570.4,304.09999999999997,569.4])
	ctx.recodingOrder('bezierCurveTo',[310.4,566.1999999999999,323.4,559.5,325.79999999999995,552.3])
	ctx.recodingOrder('bezierCurveTo',[326.9,549.0999999999999,326.09999999999997,544.0999999999999,325.4,539.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[325,537.1999999999999,324.7,534.9,324.59999999999997,532.8])
	ctx.recodingOrder('bezierCurveTo',[324.49999999999994,529.5999999999999,324.2,526.5,323.09999999999997,523.9])
	ctx.recodingOrder('bezierCurveTo',[321.99999999999994,521.5,320.09999999999997,519.6999999999999,318.09999999999997,519.4])
	ctx.recodingOrder('bezierCurveTo',[316.4,519.1,315.2,517.6,315.49999999999994,515.8])
	ctx.recodingOrder('bezierCurveTo',[315.79999999999995,514.0999999999999,317.3999999999999,512.9,319.09999999999997,513.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[323.2,513.8,326.99999999999994,516.9999999999999,328.9,521.4])
	ctx.recodingOrder('bezierCurveTo',[330.4,525,330.7,528.6999999999999,330.9,532.5])
	ctx.recodingOrder('bezierCurveTo',[331,534.4,331.29999999999995,536.5,331.7,538.7])
	ctx.recodingOrder('bezierCurveTo',[332.5,543.8000000000001,333.4,549.6,331.8,554.2])
	ctx.recodingOrder('bezierCurveTo',[328.8,563.1,317.40000000000003,569.6,307,574.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[305,575.9000000000001,302.9,576.9000000000001,300.9,577.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[300.4,578.2,299.9,578.3,299.5,578.3])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[281.8,587.5])
	ctx.recodingOrder('bezierCurveTo',[280.7,587.5,279.6,586.9,279,585.8])
	ctx.recodingOrder('bezierCurveTo',[278.2,584.3,278.8,582.4,280.4,581.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[280.59999999999997,581.4999999999999,281.2,580.4999999999999,280.79999999999995,577.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[280.69999999999993,576.9999999999999,280.69999999999993,575.8999999999999,280.49999999999994,574.3999999999999])
	ctx.recodingOrder('bezierCurveTo',[280.09999999999997,568.6999999999998,279.19999999999993,556.9999999999999,277.19999999999993,549.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[276.69999999999993,548.1999999999998,277.69999999999993,546.4999999999999,279.29999999999995,545.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[280.99999999999994,545.4999999999999,282.69999999999993,546.4999999999999,283.19999999999993,548.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[285.49999999999994,555.8,286.29999999999995,568.0999999999999,286.79999999999995,573.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[286.9,575.2999999999998,286.99999999999994,576.2999999999998,286.99999999999994,576.7999999999998])
	ctx.recodingOrder('bezierCurveTo',[287.59999999999997,582.0999999999998,286.29999999999995,585.4999999999999,283.19999999999993,587.0999999999998])
	ctx.recodingOrder('bezierCurveTo',[282.7,587.4,282.2,587.5,281.8,587.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[282.7,589])
	ctx.recodingOrder('bezierCurveTo',[281.2,589,279.9,588,279.59999999999997,586.5])
	ctx.recodingOrder('bezierCurveTo',[279.29999999999995,584.8,280.4,583.2,282.09999999999997,582.8])
	ctx.recodingOrder('bezierCurveTo',[291.9,580.9,293.79999999999995,578.5,294.09999999999997,578])
	ctx.recodingOrder('bezierCurveTo',[296.29999999999995,574.4,295.49999999999994,561.9,292.09999999999997,548.3])
	ctx.recodingOrder('bezierCurveTo',[291.7,546.5999999999999,292.7,544.9,294.4,544.5])
	ctx.recodingOrder('bezierCurveTo',[296,544.1,297.79999999999995,545.1,298.2,546.8])
	ctx.recodingOrder('bezierCurveTo',[299.7,552.9,304.3,573.4,299.4,581.3])
	ctx.recodingOrder('bezierCurveTo',[297.29999999999995,584.8,292,587.3,283.29999999999995,588.9])
	ctx.recodingOrder('bezierCurveTo',[283.1,589,282.9,589,282.7,589])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[251.4,478.8])
	ctx.recodingOrder('lineTo',[245.1,478.8])
	ctx.recodingOrder('bezierCurveTo',[243.4,478.8,242,477.40000000000003,242,475.7])
	ctx.recodingOrder('bezierCurveTo',[242,473.99999999999994,243.4,472.59999999999997,245.1,472.59999999999997])
	ctx.recodingOrder('lineTo',[251.4,472.59999999999997])
	ctx.recodingOrder('bezierCurveTo',[253.1,472.59999999999997,254.5,473.99999999999994,254.5,475.7])
	ctx.recodingOrder('bezierCurveTo',[254.5,477.40000000000003,253.1,478.8,251.4,478.8])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[221,459.6])
	ctx.recodingOrder('bezierCurveTo',[219.7,476.3,219.6,493.40000000000003,224.7,509.40000000000003])
	ctx.recodingOrder('bezierCurveTo',[229.29999999999998,524.1,236.7,537.6,251.79999999999998,543.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[266.7,548.9000000000001,283.09999999999997,549.0000000000001,298.5,545.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[306.4,544.3000000000001,332.2,537.4000000000001,324,523.6000000000001])
	ctx.recodingOrder('bezierCurveTo',[322.5,521.0000000000001,320.7,518.1000000000001,317.7,518.3000000000002])
	ctx.recodingOrder('bezierCurveTo',[317.2,521.7000000000002,312.09999999999997,526.7000000000002,309,528.2000000000002])
	ctx.recodingOrder('bezierCurveTo',[305.9,529.8000000000002,302.4,530.2000000000002,298.9,530.6000000000001])
	ctx.recodingOrder('bezierCurveTo',[287.4,531.6000000000001,275.7,530.9000000000001,264.29999999999995,528.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[262.59999999999997,528.0000000000001,260.9,527.6000000000001,259.29999999999995,526.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[255.79999999999995,525.4000000000001,252.99999999999994,522.5000000000001,250.59999999999997,519.5000000000001])
	ctx.recodingOrder('bezierCurveTo',[246.39999999999998,514.2000000000002,243.19999999999996,508.10000000000014,241.09999999999997,501.7000000000001])
	ctx.recodingOrder('bezierCurveTo',[237.89999999999998,491.6000000000001,237.49999999999997,480.8000000000001,237.19999999999996,470.2000000000001])
	ctx.recodingOrder('bezierCurveTo',[237.09999999999997,467.0000000000001,236.99999999999997,463.9000000000001,236.89999999999995,460.7000000000001])
	ctx.recodingOrder('bezierCurveTo',[236.89999999999995,460.0000000000001,236.79999999999995,459.2000000000001,236.29999999999995,458.7000000000001])
	ctx.recodingOrder('bezierCurveTo',[235.79999999999995,458.2000000000001,234.99999999999994,458.1000000000001,234.29999999999995,458.1000000000001])
	ctx.recodingOrder('bezierCurveTo',[229.3,458,226,459.1,221,459.6])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[255.6,506])
	ctx.recodingOrder('lineTo',[249.9,506])
	ctx.recodingOrder('bezierCurveTo',[248.20000000000002,506,246.8,504.6,246.8,502.9])
	ctx.recodingOrder('bezierCurveTo',[246.8,501.2,248.20000000000002,499.79999999999995,249.9,499.79999999999995])
	ctx.recodingOrder('lineTo',[255.6,499.79999999999995])
	ctx.recodingOrder('bezierCurveTo',[257.3,499.79999999999995,258.7,501.19999999999993,258.7,502.9])
	ctx.recodingOrder('bezierCurveTo',[258.7,504.6,257.3,506,255.6,506])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[217.7,600.3])
	ctx.recodingOrder('bezierCurveTo',[210.1,600.3,202.39999999999998,598.8,197.2,595.9])
	ctx.recodingOrder('bezierCurveTo',[195.1,594.6999999999999,193.29999999999998,593,191.79999999999998,590.9])
	ctx.recodingOrder('bezierCurveTo',[191.79999999999998,590.9,191.79999999999998,590.9,191.79999999999998,590.9])
	ctx.recodingOrder('bezierCurveTo',[187.2,584.3,186.6,574.6999999999999,187.99999999999997,568.1])
	ctx.recodingOrder('bezierCurveTo',[190.09999999999997,558.6,196.79999999999998,550.3000000000001,205.59999999999997,546.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[213.69999999999996,542.6,223.99999999999997,542.9000000000001,232.59999999999997,547.1])
	ctx.recodingOrder('bezierCurveTo',[240.09999999999997,550.7,245.19999999999996,556.8000000000001,246.89999999999998,564.1])
	ctx.recodingOrder('bezierCurveTo',[250.79999999999998,580.4,246.7,592.2,235.2,597.2])
	ctx.recodingOrder('bezierCurveTo',[230.4,599.2,224.1,600.3,217.7,600.3])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('moveTo',[196.9,587.2])
	ctx.recodingOrder('bezierCurveTo',[197.9,588.6,199,589.6,200.20000000000002,590.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[208.10000000000002,594.7,223.8,595.2,232.60000000000002,591.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[243.3,586.5000000000001,242.90000000000003,574.6,240.70000000000002,565.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[239.4,559.9000000000001,235.50000000000003,555.4000000000001,229.70000000000002,552.6000000000001])
	ctx.recodingOrder('bezierCurveTo',[222.8,549.2000000000002,214.50000000000003,549.0000000000001,208.00000000000003,551.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[201.00000000000003,555.1000000000001,195.60000000000002,561.8000000000001,193.90000000000003,569.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[192.9,574.6,193.5,582.4,196.9,587.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[148.2,587.5])
	ctx.recodingOrder('bezierCurveTo',[147.7,587.5,147.2,587.4,146.79999999999998,587.2])
	ctx.recodingOrder('bezierCurveTo',[143.7,585.6,142.39999999999998,582.1,142.99999999999997,576.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[143.09999999999997,576.4000000000001,143.09999999999997,575.4000000000001,143.19999999999996,574.1000000000001])
	ctx.recodingOrder('bezierCurveTo',[143.59999999999997,568.4000000000001,144.49999999999997,556.6000000000001,146.59999999999997,548.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[147.09999999999997,547.2,148.79999999999995,546.2,150.49999999999997,546.7])
	ctx.recodingOrder('bezierCurveTo',[152.19999999999996,547.2,153.19999999999996,548.9000000000001,152.69999999999996,550.5])
	ctx.recodingOrder('bezierCurveTo',[150.69999999999996,557.7,149.89999999999995,569,149.49999999999997,574.5])
	ctx.recodingOrder('bezierCurveTo',[149.39999999999998,575.9,149.29999999999998,577,149.29999999999998,577.6])
	ctx.recodingOrder('bezierCurveTo',[148.99999999999997,580.6,149.49999999999997,581.5,149.7,581.6])
	ctx.recodingOrder('bezierCurveTo',[151.2,582.4,151.79999999999998,584.3000000000001,151.1,585.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[150.5,586.9,149.4,587.5,148.2,587.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[147.3,589])
	ctx.recodingOrder('bezierCurveTo',[147.10000000000002,589,146.9,589,146.70000000000002,588.9])
	ctx.recodingOrder('bezierCurveTo',[138.00000000000003,587.1999999999999,132.70000000000002,584.8,130.60000000000002,581.3])
	ctx.recodingOrder('bezierCurveTo',[125.40000000000002,572.9,130.90000000000003,550.1999999999999,132.10000000000002,545.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[132.50000000000003,543.9999999999999,134.20000000000002,542.9999999999999,135.90000000000003,543.4999999999999])
	ctx.recodingOrder('bezierCurveTo',[137.60000000000002,543.8999999999999,138.60000000000002,545.5999999999999,138.10000000000002,547.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[134.50000000000003,561.0999999999998,133.60000000000002,574.2999999999998,135.90000000000003,577.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[136.20000000000005,578.4999999999999,138.10000000000002,580.8999999999999,147.90000000000003,582.7999999999998])
	ctx.recodingOrder('bezierCurveTo',[149.60000000000002,583.0999999999998,150.70000000000005,584.7999999999998,150.40000000000003,586.4999999999999])
	ctx.recodingOrder('bezierCurveTo',[150.1,588,148.7,589,147.3,589])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[211.7,620.9])
	ctx.recodingOrder('bezierCurveTo',[189.89999999999998,620.9,166.1,617.6,140.89999999999998,611])
	ctx.recodingOrder('bezierCurveTo',[133.49999999999997,609.1,123.79999999999998,608.3,111.39999999999998,608.6])
	ctx.recodingOrder('bezierCurveTo',[110.79999999999998,608.7,109.69999999999997,608.3000000000001,109.09999999999998,607.7])
	ctx.recodingOrder('bezierCurveTo',[108.49999999999999,607.1,108.19999999999997,606.3000000000001,108.19999999999997,605.5])
	ctx.recodingOrder('bezierCurveTo',[108.19999999999997,597.5,109.49999999999997,588.7,110.69999999999997,580.1])
	ctx.recodingOrder('bezierCurveTo',[111.29999999999997,576.2,111.79999999999997,572.4,112.19999999999997,568.9])
	ctx.recodingOrder('bezierCurveTo',[112.39999999999998,567.1999999999999,113.99999999999997,566,115.69999999999997,566.1])
	ctx.recodingOrder('bezierCurveTo',[117.39999999999998,566.3000000000001,118.69999999999997,567.8000000000001,118.49999999999997,569.6])
	ctx.recodingOrder('bezierCurveTo',[118.09999999999997,573.2,117.49999999999997,577.1,116.99999999999997,581])
	ctx.recodingOrder('bezierCurveTo',[115.99999999999997,588.2,114.89999999999998,595.6,114.59999999999997,602.3])
	ctx.recodingOrder('bezierCurveTo',[126.09999999999997,602.1999999999999,135.29999999999995,603.0999999999999,142.59999999999997,605])
	ctx.recodingOrder('bezierCurveTo',[166.19999999999996,611.1,188.59999999999997,614.4,208.99999999999997,614.7])
	ctx.recodingOrder('bezierCurveTo',[209.09999999999997,614.2,209.09999999999997,613.7,209.19999999999996,613.2])
	ctx.recodingOrder('bezierCurveTo',[209.39999999999995,611.7,209.59999999999997,610.3000000000001,209.69999999999996,609.2])
	ctx.recodingOrder('bezierCurveTo',[209.89999999999995,607.5,211.39999999999995,606.2,213.09999999999997,606.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[214.79999999999995,606.6000000000001,216.09999999999997,608.1000000000001,215.89999999999998,609.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[215.79999999999998,611.0000000000001,215.59999999999997,612.6,215.39999999999998,614.1])
	ctx.recodingOrder('bezierCurveTo',[215.2,615.6,214.99999999999997,617,214.89999999999998,618.1])
	ctx.recodingOrder('bezierCurveTo',[214.7,619.6,213.3,620.9,211.7,620.9])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[210.8,459.5])
	ctx.recodingOrder('bezierCurveTo',[211.3,474.9,211.8,490.6,207.8,505.5])
	ctx.recodingOrder('bezierCurveTo',[204.3,518.4,196.60000000000002,532.9,184.3,539.2])
	ctx.recodingOrder('bezierCurveTo',[170,546.5,152,547.7,136.5,544.6])
	ctx.recodingOrder('bezierCurveTo',[124.8,542.3000000000001,110.4,537.4,109.3,524.5])
	ctx.recodingOrder('bezierCurveTo',[108.89999999999999,519.7,114.8,512.6,120,512.3])
	ctx.recodingOrder('bezierCurveTo',[121.6,513.8,120.4,515.5999999999999,120.4,517.8])
	ctx.recodingOrder('bezierCurveTo',[120.5,522.8,123.80000000000001,527.3,128,529.8])
	ctx.recodingOrder('bezierCurveTo',[132.3,532.4,137.3,533.1999999999999,142.3,533.4])
	ctx.recodingOrder('bezierCurveTo',[148.10000000000002,533.6,154,533,159.70000000000002,531.6])
	ctx.recodingOrder('bezierCurveTo',[173.8,528,187.10000000000002,518.5,191.8,504.70000000000005])
	ctx.recodingOrder('bezierCurveTo',[194.8,496.00000000000006,196.10000000000002,485.80000000000007,197,476.6])
	ctx.recodingOrder('bezierCurveTo',[197.6,470.3,197.2,464,198.5,457.8])
	ctx.recodingOrder('bezierCurveTo',[202.3,458,207.2,458.7,210.8,459.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[228.1,620.9])
	ctx.recodingOrder('bezierCurveTo',[227.29999999999998,620.9,226.5,620.6,226,620])
	ctx.recodingOrder('bezierCurveTo',[225.4,619.4,225,618.6,225,617.7])
	ctx.recodingOrder('bezierCurveTo',[225,616.8000000000001,224.8,615.5,224.7,614.2])
	ctx.recodingOrder('bezierCurveTo',[224.5,612.6,224.29999999999998,611,224.29999999999998,609.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[224.29999999999998,608.2,225.7,606.8000000000001,227.39999999999998,606.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[229.09999999999997,606.8000000000001,230.49999999999997,608.2,230.49999999999997,609.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[230.49999999999997,610.8000000000001,230.69999999999996,612.1000000000001,230.79999999999998,613.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[230.79999999999998,613.7,230.89999999999998,614.0000000000001,230.89999999999998,614.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[244.49999999999997,613.4000000000001,257.7,611.1000000000001,270.59999999999997,608.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[288.2,605.7,304.9,602.8000000000001,322.29999999999995,603.0000000000001])
	ctx.recodingOrder('bezierCurveTo',[321.9,593.4000000000001,320.59999999999997,584.6000000000001,317.29999999999995,566.0000000000001])
	ctx.recodingOrder('bezierCurveTo',[316.99999999999994,564.3000000000001,318.09999999999997,562.7000000000002,319.79999999999995,562.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[321.49999999999994,562.1000000000001,323.09999999999997,563.2,323.4,564.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[327.2,585.9000000000001,328.29999999999995,594.8000000000001,328.59999999999997,606.1000000000001])
	ctx.recodingOrder('bezierCurveTo',[328.59999999999997,607.0000000000001,328.29999999999995,607.8000000000002,327.7,608.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[327.09999999999997,609.0000000000001,326.2,609.4000000000001,325.4,609.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[307.5,608.7,290.09999999999997,611.7,271.7,614.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[257.7,617.3000000000001,243.29999999999998,619.8000000000001,228.29999999999998,620.7])
	ctx.recodingOrder('bezierCurveTo',[228.2,620.9,228.2,620.9,228.1,620.9])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#F5C126";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[178.9,475])
	ctx.recodingOrder('bezierCurveTo',[176.8,477.4,177.20000000000002,481.5,179.70000000000002,483.5])
	ctx.recodingOrder('bezierCurveTo',[182.20000000000002,485.4,186.4,484.7,188.10000000000002,482])
	ctx.recodingOrder('bezierCurveTo',[189.80000000000004,479.3,188.70000000000002,475.3,185.8,473.8])
	ctx.recodingOrder('bezierCurveTo',[183.6,472.6,180.6,473.1,178.9,475])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#F5C126";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[182.4,501.9])
	ctx.recodingOrder('bezierCurveTo',[182.1,500.09999999999997,180.9,498.5,178.6,497.79999999999995])
	ctx.recodingOrder('bezierCurveTo',[172.4,495.99999999999994,167,505.49999999999994,173.1,508.9])
	ctx.recodingOrder('bezierCurveTo',[178.7,512,183.1,506.3,182.4,501.9])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[183,486.9])
	ctx.recodingOrder('bezierCurveTo',[181.3,486.9,179.6,486.4,178.2,485.4])
	ctx.recodingOrder('bezierCurveTo',[176.5,484.09999999999997,175.29999999999998,482,175.1,479.7])
	ctx.recodingOrder('bezierCurveTo',[174.9,477.4,175.6,475.09999999999997,177,473.5])
	ctx.recodingOrder('lineTo',[178.7,475.1])
	ctx.recodingOrder('lineTo',[177,473.5])
	ctx.recodingOrder('bezierCurveTo',[179.4,470.9,183.6,470.1,186.7,471.7])
	ctx.recodingOrder('bezierCurveTo',[188.6,472.7,190.1,474.5,190.7,476.8])
	ctx.recodingOrder('bezierCurveTo',[191.29999999999998,479,191,481.40000000000003,189.89999999999998,483.2])
	ctx.recodingOrder('bezierCurveTo',[188.7,485,186.79999999999998,486.4,184.49999999999997,486.8])
	ctx.recodingOrder('bezierCurveTo',[184.1,486.8,183.6,486.9,183,486.9])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('moveTo',[183.3,475.5])
	ctx.recodingOrder('bezierCurveTo',[182.3,475.5,181.3,475.9,180.70000000000002,476.6])
	ctx.recodingOrder('bezierCurveTo',[180.10000000000002,477.20000000000005,179.8,478.20000000000005,179.9,479.20000000000005])
	ctx.recodingOrder('bezierCurveTo',[180,480.20000000000005,180.4,481.1,181.1,481.6])
	ctx.recodingOrder('bezierCurveTo',[181.79999999999998,482.1,182.7,482.3,183.79999999999998,482.1])
	ctx.recodingOrder('bezierCurveTo',[184.79999999999998,481.90000000000003,185.6,481.40000000000003,186.1,480.70000000000005])
	ctx.recodingOrder('bezierCurveTo',[186.6,480.00000000000006,186.7,479.00000000000006,186.4,478.00000000000006])
	ctx.recodingOrder('bezierCurveTo',[186.1,477.00000000000006,185.5,476.20000000000005,184.8,475.80000000000007])
	ctx.recodingOrder('bezierCurveTo',[184.3,475.6,183.8,475.5,183.3,475.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[176.3,512.2])
	ctx.recodingOrder('bezierCurveTo',[174.9,512.2,173.4,511.80000000000007,172,511.00000000000006])
	ctx.recodingOrder('bezierCurveTo',[168.5,509.00000000000006,167.2,505.1000000000001,168.8,501.20000000000005])
	ctx.recodingOrder('bezierCurveTo',[170.3,497.50000000000006,174.5,494.30000000000007,179.20000000000002,495.6])
	ctx.recodingOrder('bezierCurveTo',[182.20000000000002,496.5,184.20000000000002,498.6,184.70000000000002,501.6])
	ctx.recodingOrder('bezierCurveTo',[184.70000000000002,501.6,184.70000000000002,501.6,184.70000000000002,501.6])
	ctx.recodingOrder('bezierCurveTo',[185.3,505,183.60000000000002,508.8,180.70000000000002,510.8])
	ctx.recodingOrder('bezierCurveTo',[179.4,511.7,177.9,512.2,176.3,512.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('moveTo',[177.1,500])
	ctx.recodingOrder('bezierCurveTo',[175.4,500,173.79999999999998,501.4,173.2,503])
	ctx.recodingOrder('bezierCurveTo',[172.79999999999998,504,172.39999999999998,505.8,174.29999999999998,506.9])
	ctx.recodingOrder('bezierCurveTo',[175.7,507.7,176.99999999999997,507.7,178.1,506.9])
	ctx.recodingOrder('bezierCurveTo',[179.5,505.9,180.4,503.9,180.1,502.29999999999995])
	ctx.recodingOrder('bezierCurveTo',[179.9,501.19999999999993,179.2,500.4,178,500.09999999999997])
	ctx.recodingOrder('bezierCurveTo',[177.7,500,177.4,500,177.1,500])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[203.5,568.9])
	ctx.recodingOrder('bezierCurveTo',[203.5,568.1999999999999,203.7,567.6,204,566.9])
	ctx.recodingOrder('bezierCurveTo',[204.5,565.5,205.4,564.8,206.5,564.6])
	ctx.recodingOrder('bezierCurveTo',[207.5,564.5,208.4,564.8000000000001,209.3,565.7])
	ctx.recodingOrder('bezierCurveTo',[210.10000000000002,566.4000000000001,210.5,567.2,210.60000000000002,568])
	ctx.recodingOrder('bezierCurveTo',[211.10000000000002,571.3,210.20000000000002,573.2,207.90000000000003,573.7])
	ctx.recodingOrder('bezierCurveTo',[206.40000000000003,574.1,205.20000000000005,573.6,204.30000000000004,572.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[203.6,571.2,203.3,570,203.5,568.9])
	ctx.recodingOrder('fill',["evenodd"])
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[210.5,562])
	ctx.recodingOrder('bezierCurveTo',[210.5,560.7,210.7,559.5,211.4,558.6])
	ctx.recodingOrder('bezierCurveTo',[212,557.6,212.8,557.2,213.8,557.1])
	ctx.recodingOrder('bezierCurveTo',[214.70000000000002,557.1,215.60000000000002,557.5,216.3,558.4])
	ctx.recodingOrder('bezierCurveTo',[217,559.3,217.4,560.4,217.4,561.8])
	ctx.recodingOrder('bezierCurveTo',[217.4,563.0999999999999,217.1,564.3,216.5,565.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[215.9,566.1999999999999,215.1,566.5999999999999,214.1,566.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[213.2,566.6999999999999,212.29999999999998,566.3,211.6,565.4])
	ctx.recodingOrder('bezierCurveTo',[210.9,564.5,210.6,563.4,210.5,562])
	ctx.recodingOrder('fill',["evenodd"])
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[220.6,559])
	ctx.recodingOrder('bezierCurveTo',[221.5,557.9,222.4,557.5,223.29999999999998,557.6])
	ctx.recodingOrder('bezierCurveTo',[224.2,557.8000000000001,224.99999999999997,558.3000000000001,225.7,559.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[226.39999999999998,560.3000000000001,226.7,561.2,226.5,562.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[226.4,563.5000000000001,225.9,564.5000000000001,225.2,565.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[224.29999999999998,566.4000000000001,223.29999999999998,566.9000000000001,222.2,566.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[221,566.7,220.2,566.1,219.7,565.2])
	ctx.recodingOrder('bezierCurveTo',[219.29999999999998,564.4000000000001,219.1,563.3000000000001,219.2,562.1])
	ctx.recodingOrder('bezierCurveTo',[219.3,561,219.8,560,220.6,559])
	ctx.recodingOrder('fill',["evenodd"])
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[228.8,578.4])
	ctx.recodingOrder('lineTo',[229.20000000000002,578.8])
	ctx.recodingOrder('bezierCurveTo',[229.50000000000003,579.1999999999999,229.8,579.5999999999999,230.10000000000002,580])
	ctx.recodingOrder('bezierCurveTo',[230.8,581.5,230.8,583.1,230.10000000000002,584.9])
	ctx.recodingOrder('bezierCurveTo',[229.40000000000003,586.6999999999999,227.70000000000002,587.6999999999999,225.10000000000002,587.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[224.3,587.6999999999999,223.40000000000003,587.5999999999999,222.50000000000003,587.4999999999999])
	ctx.recodingOrder('lineTo',[221.40000000000003,587.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[221.00000000000003,587.1999999999998,220.40000000000003,587.0999999999998,219.80000000000004,586.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[218.50000000000003,586.8999999999999,217.20000000000005,586.9999999999999,216.00000000000003,587.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[214.80000000000004,587.5999999999998,213.50000000000003,587.7999999999998,212.20000000000002,587.8999999999999])
	ctx.recodingOrder('lineTo',[210.60000000000002,587.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[210.00000000000003,587.8999999999999,209.40000000000003,587.7999999999998,208.8,587.4999999999999])
	ctx.recodingOrder('bezierCurveTo',[207.5,586.8999999999999,206.60000000000002,585.5999999999999,206.10000000000002,583.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[205.60000000000002,582.0999999999999,206.00000000000003,580.4999999999999,207.3,578.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[207.9,578.0999999999999,208.70000000000002,577.3999999999999,209.60000000000002,576.7999999999998])
	ctx.recodingOrder('bezierCurveTo',[209.70000000000002,576.6999999999998,210.20000000000002,576.1999999999998,211.20000000000002,575.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[212.20000000000002,574.2999999999998,213.00000000000003,573.2999999999998,213.60000000000002,572.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[214.40000000000003,570.7999999999998,215.70000000000002,569.8999999999999,217.40000000000003,569.6999999999998])
	ctx.recodingOrder('bezierCurveTo',[219.40000000000003,569.3999999999999,221.10000000000002,570.2999999999998,222.60000000000002,572.3999999999999])
	ctx.recodingOrder('bezierCurveTo',[223.60000000000002,573.6999999999998,224.90000000000003,575.0999999999999,226.70000000000002,576.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[227.3,577.4,228.1,578,228.8,578.4])
	ctx.recodingOrder('fill',["evenodd"])
	ctx.recodingOrder('stroke');
	
	ctx.recodingOrder('save'); ctx = getCtx();
	ctx.fillStyle="#FFFFFF";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[232.3,569.8])
	ctx.recodingOrder('bezierCurveTo',[232.3,571.1999999999999,232.3,572.1999999999999,232.10000000000002,572.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[231.70000000000002,574.1999999999999,230.70000000000002,574.9999999999999,229.10000000000002,575.0999999999999])
	ctx.recodingOrder('bezierCurveTo',[227.50000000000003,575.1999999999999,226.3,574.8,225.70000000000002,573.8])
	ctx.recodingOrder('bezierCurveTo',[225.3,573.1999999999999,225.10000000000002,572.1999999999999,225.10000000000002,570.9])
	ctx.recodingOrder('bezierCurveTo',[225.00000000000003,567.8,226.10000000000002,566.1999999999999,228.3,566.1])
	ctx.recodingOrder('bezierCurveTo',[229.60000000000002,566.1,230.60000000000002,566.5,231.4,567.6])
	ctx.recodingOrder('bezierCurveTo',[232,568.3,232.3,569.1,232.3,569.8])
	ctx.recodingOrder('fill',["evenodd"])
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[279.6,551.1])
	ctx.recodingOrder('bezierCurveTo',[269.6,551.1,260.20000000000005,549.5,251.60000000000002,546.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[233.70000000000002,539.5000000000001,226.50000000000003,522.6,222.70000000000002,510.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[217.3,493.1000000000001,217.70000000000002,474.9000000000001,218.9,459.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[219,457.7000000000001,220.6,456.4000000000001,222.3,456.5000000000001])
	ctx.recodingOrder('bezierCurveTo',[224,456.60000000000014,225.3,458.10000000000014,225.20000000000002,459.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[224.10000000000002,474.80000000000007,223.60000000000002,492.30000000000007,228.70000000000002,508.5000000000001])
	ctx.recodingOrder('bezierCurveTo',[234.20000000000002,526.1000000000001,242.00000000000003,535.9000000000001,253.9,540.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[267,545.3000000000001,282.5,546.2,298.9,542.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[306.9,541.2,313.2,539.0000000000001,317.7,536.5000000000001])
	ctx.recodingOrder('bezierCurveTo',[320.9,534.7000000000002,323.2,531.9000000000001,323.8,529.1000000000001])
	ctx.recodingOrder('bezierCurveTo',[324.3,526.9000000000001,323.7,524.6000000000001,322,522.4000000000001])
	ctx.recodingOrder('bezierCurveTo',[320.9,521.0000000000001,319.2,519.9000000000001,317.5,519.6000000000001])
	ctx.recodingOrder('bezierCurveTo',[315.8,519.3000000000002,314.7,517.7000000000002,315,516.0000000000001])
	ctx.recodingOrder('bezierCurveTo',[315.3,514.3000000000001,317,513.2000000000002,318.6,513.5000000000001])
	ctx.recodingOrder('bezierCurveTo',[322,514.1000000000001,325.1,516.0000000000001,327.1,518.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[329.8,522.5000000000001,330.8,526.5000000000001,329.90000000000003,530.5000000000001])
	ctx.recodingOrder('bezierCurveTo',[328.90000000000003,535.1000000000001,325.6,539.3000000000001,320.8,542.0000000000001])
	ctx.recodingOrder('bezierCurveTo',[315.8,544.9000000000001,308.8,547.2000000000002,300.2,549.0000000000001])
	ctx.recodingOrder('bezierCurveTo',[293,550.3,286.2,551.1,279.6,551.1])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[288.3,535.3])
	ctx.recodingOrder('bezierCurveTo',[281.40000000000003,535.3,274.6,534.4,268,532.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[245.3,526.3999999999999,238.4,511.0999999999999,235,490.19999999999993])
	ctx.recodingOrder('bezierCurveTo',[233.2,479.19999999999993,232.6,467.8999999999999,233.1,456.79999999999995])
	ctx.recodingOrder('bezierCurveTo',[233.2,455.09999999999997,234.5,453.79999999999995,236.4,453.79999999999995])
	ctx.recodingOrder('bezierCurveTo',[238.1,453.9,239.5,455.29999999999995,239.4,457.09999999999997])
	ctx.recodingOrder('bezierCurveTo',[238.9,467.79999999999995,239.5,478.59999999999997,241.20000000000002,489.29999999999995])
	ctx.recodingOrder('bezierCurveTo',[244.3,508.9,250.00000000000003,521.3,269.6,526.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[284.20000000000005,530.6999999999999,300,529.9,314.1,524.4])
	ctx.recodingOrder('bezierCurveTo',[310.8,498.29999999999995,305.40000000000003,476.4,296.20000000000005,452])
	ctx.recodingOrder('bezierCurveTo',[295.6,450.4,296.40000000000003,448.6,298.00000000000006,448])
	ctx.recodingOrder('bezierCurveTo',[299.6000000000001,447.4,301.40000000000003,448.2,302.00000000000006,449.8])
	ctx.recodingOrder('bezierCurveTo',[311.50000000000006,475,317.00000000000006,497.6,320.40000000000003,525.1])
	ctx.recodingOrder('bezierCurveTo',[320.40000000000003,527.7,318.70000000000005,529.7,316.3,530.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[307.5,533.6,297.9,535.3,288.3,535.3])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[207.2,460.4])
	ctx.recodingOrder('bezierCurveTo',[173.1,460.4,130.39999999999998,457.9,117.79999999999998,442])
	ctx.recodingOrder('bezierCurveTo',[114.39999999999998,437.7,113.29999999999998,432.7,114.69999999999999,427.2])
	ctx.recodingOrder('bezierCurveTo',[115.1,425.5,116.79999999999998,424.5,118.49999999999999,424.9])
	ctx.recodingOrder('bezierCurveTo',[120.19999999999999,425.29999999999995,121.19999999999999,427,120.79999999999998,428.7])
	ctx.recodingOrder('bezierCurveTo',[119.89999999999998,432.3,120.59999999999998,435.4,122.69999999999999,438.09999999999997])
	ctx.recodingOrder('bezierCurveTo',[131.5,449.2,162.5,454.49999999999994,214.7,454.09999999999997])
	ctx.recodingOrder('lineTo',[218.89999999999998,454.09999999999997])
	ctx.recodingOrder('bezierCurveTo',[241.2,454.29999999999995,266.09999999999997,451.7,284.5,447.49999999999994])
	ctx.recodingOrder('bezierCurveTo',[285.7,447.19999999999993,287.1,446.99999999999994,288.6,446.69999999999993])
	ctx.recodingOrder('bezierCurveTo',[296.90000000000003,445.0999999999999,310.8,442.3999999999999,315.6,434.79999999999995])
	ctx.recodingOrder('bezierCurveTo',[317.40000000000003,431.9,317.8,428.49999999999994,316.8,424.4])
	ctx.recodingOrder('bezierCurveTo',[316.40000000000003,422.7,317.40000000000003,421,319.1,420.59999999999997])
	ctx.recodingOrder('bezierCurveTo',[320.8,420.09999999999997,322.5,421.2,322.90000000000003,422.9])
	ctx.recodingOrder('bezierCurveTo',[324.40000000000003,428.7,323.70000000000005,433.9,321.00000000000006,438.2])
	ctx.recodingOrder('bezierCurveTo',[314.70000000000005,448.09999999999997,299.20000000000005,451.09999999999997,289.90000000000003,452.9])
	ctx.recodingOrder('bezierCurveTo',[288.40000000000003,453.2,287.1,453.4,286.00000000000006,453.7])
	ctx.recodingOrder('bezierCurveTo',[267.1000000000001,458,241.60000000000005,460.4,219.00000000000006,460.5])
	ctx.recodingOrder('lineTo',[214.90000000000006,460.5])
	ctx.recodingOrder('bezierCurveTo',[212.2,460.4,209.7,460.4,207.2,460.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[155.3,550.8])
	ctx.recodingOrder('bezierCurveTo',[153.5,550.8,151.60000000000002,550.6999999999999,149.8,550.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[137.5,549.5999999999999,124.70000000000002,547.6999999999999,114.50000000000001,539.5999999999999])
	ctx.recodingOrder('bezierCurveTo',[108.70000000000002,534.9999999999999,106.30000000000001,527.3,108.50000000000001,520.3999999999999])
	ctx.recodingOrder('bezierCurveTo',[109.00000000000001,518.9999999999999,111.50000000000001,511.59999999999985,116.60000000000001,509.39999999999986])
	ctx.recodingOrder('bezierCurveTo',[118.7,508.4999999999999,120.9,508.59999999999985,123.00000000000001,509.59999999999985])
	ctx.recodingOrder('bezierCurveTo',[124.60000000000001,510.39999999999986,125.20000000000002,512.1999999999998,124.40000000000002,513.7999999999998])
	ctx.recodingOrder('bezierCurveTo',[123.60000000000002,515.3999999999999,121.80000000000003,515.9999999999999,120.20000000000002,515.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[119.70000000000002,514.9999999999999,119.40000000000002,515.0999999999998,119.00000000000001,515.1999999999998])
	ctx.recodingOrder('bezierCurveTo',[117.30000000000001,515.8999999999999,115.30000000000001,519.3999999999999,114.40000000000002,522.2999999999998])
	ctx.recodingOrder('bezierCurveTo',[113.00000000000001,526.6999999999998,114.60000000000002,531.7999999999998,118.30000000000003,534.6999999999998])
	ctx.recodingOrder('bezierCurveTo',[127.10000000000002,541.6999999999998,138.8,543.4999999999998,150.10000000000002,544.3999999999999])
	ctx.recodingOrder('bezierCurveTo',[164.40000000000003,545.4999999999999,178.00000000000003,541.8999999999999,187.60000000000002,534.4999999999999])
	ctx.recodingOrder('bezierCurveTo',[196.40000000000003,527.6999999999999,202.8,517.3999999999999,206.20000000000002,504.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[210.10000000000002,490.09999999999985,209.60000000000002,474.59999999999985,209.10000000000002,459.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[209.00000000000003,457.9999999999999,210.40000000000003,456.4999999999999,212.10000000000002,456.4999999999999])
	ctx.recodingOrder('bezierCurveTo',[213.90000000000003,456.2999999999999,215.3,457.7999999999999,215.3,459.4999999999999])
	ctx.recodingOrder('bezierCurveTo',[215.8,474.89999999999986,216.4,490.89999999999986,212.20000000000002,506.39999999999986])
	ctx.recodingOrder('bezierCurveTo',[208.4,520.3999999999999,201.20000000000002,531.8999999999999,191.3,539.4999999999999])
	ctx.recodingOrder('bezierCurveTo',[182,546.8,169.1,550.8,155.3,550.8])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[150,537.6])
	ctx.recodingOrder('bezierCurveTo',[139.9,537.6,127.9,535.7,121.5,529.6])
	ctx.recodingOrder('bezierCurveTo',[117.7,525.9,116.4,521.1,117.7,515.7])
	ctx.recodingOrder('bezierCurveTo',[123,494.90000000000003,128.5,473.40000000000003,136.9,453.1])
	ctx.recodingOrder('bezierCurveTo',[137.6,451.5,139.4,450.70000000000005,141,451.40000000000003])
	ctx.recodingOrder('bezierCurveTo',[142.6,452.1,143.4,453.90000000000003,142.7,455.50000000000006])
	ctx.recodingOrder('bezierCurveTo',[134.5,475.40000000000003,129.1,496.70000000000005,123.79999999999998,517.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[122.99999999999999,520.5000000000001,123.59999999999998,523.0000000000001,125.79999999999998,525.1])
	ctx.recodingOrder('bezierCurveTo',[133.1,532.1,154.39999999999998,532.5,162.7,530])
	ctx.recodingOrder('bezierCurveTo',[175.89999999999998,526,186.89999999999998,515.5,191.5,502.5])
	ctx.recodingOrder('bezierCurveTo',[194.1,495.2,194.7,487.3,195.3,479.6])
	ctx.recodingOrder('lineTo',[197,459])
	ctx.recodingOrder('bezierCurveTo',[197.1,457.3,198.7,456,200.4,456.1])
	ctx.recodingOrder('bezierCurveTo',[202.1,456.20000000000005,203.4,457.8,203.3,459.5])
	ctx.recodingOrder('lineTo',[201.60000000000002,480.1])
	ctx.recodingOrder('bezierCurveTo',[200.90000000000003,488.20000000000005,200.3,496.6,197.50000000000003,504.6])
	ctx.recodingOrder('bezierCurveTo',[192.30000000000004,519.5,179.70000000000002,531.5,164.60000000000002,536.1])
	ctx.recodingOrder('bezierCurveTo',[161.5,536.9,156,537.6,150,537.6])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[432.4,204.6])
	ctx.recodingOrder('bezierCurveTo',[432.4,204.6,432.4,204.6,432.4,204.6])
	ctx.recodingOrder('bezierCurveTo',[430.59999999999997,204.6,429.29999999999995,203.2,429.29999999999995,201.4])
	ctx.recodingOrder('bezierCurveTo',[430.6,42.9,356.6,13.3,324.8,7.9])
	ctx.recodingOrder('bezierCurveTo',[281,0.5,236.5,19.4,213.9,31.3])
	ctx.recodingOrder('bezierCurveTo',[179.5,49.400000000000006,155.5,66.7,140.3,84.2])
	ctx.recodingOrder('bezierCurveTo',[139.20000000000002,85.5,137.20000000000002,85.60000000000001,135.9,84.5])
	ctx.recodingOrder('bezierCurveTo',[134.6,83.4,134.4,81.4,135.6,80.1])
	ctx.recodingOrder('bezierCurveTo',[151.29999999999998,61.99999999999999,175.89999999999998,44.199999999999996,211,25.699999999999996])
	ctx.recodingOrder('bezierCurveTo',[234.3,13.399999999999995,280.2,-6.100000000000005,325.9,1.6999999999999957])
	ctx.recodingOrder('bezierCurveTo',[359.29999999999995,7.299999999999995,437,38.099999999999994,435.59999999999997,201.5])
	ctx.recodingOrder('bezierCurveTo',[435.5,203.2,434.1,204.6,432.4,204.6])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[411.1,159.2])
	ctx.recodingOrder('bezierCurveTo',[410.90000000000003,159.2,410.8,159.2,410.6,159.2])
	ctx.recodingOrder('bezierCurveTo',[408.90000000000003,158.89999999999998,407.70000000000005,157.29999999999998,408,155.6])
	ctx.recodingOrder('bezierCurveTo',[412.4,127.69999999999999,400.3,94.1,387.3,74.69999999999999])
	ctx.recodingOrder('bezierCurveTo',[386.3,73.29999999999998,386.7,71.29999999999998,388.2,70.39999999999999])
	ctx.recodingOrder('bezierCurveTo',[389.59999999999997,69.39999999999999,391.59999999999997,69.8,392.59999999999997,71.19999999999999])
	ctx.recodingOrder('bezierCurveTo',[406.29999999999995,91.6,418.99999999999994,126.99999999999999,414.29999999999995,156.6])
	ctx.recodingOrder('bezierCurveTo',[414,158.1,412.7,159.2,411.1,159.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#824139";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[378.1,211.9])
	ctx.recodingOrder('bezierCurveTo',[373.8,211.9,369.6,211.8,365.90000000000003,211.6])
	ctx.recodingOrder('lineTo',[361.50000000000006,211.5])
	ctx.recodingOrder('bezierCurveTo',[347.1000000000001,211.2,332.30000000000007,209.4,318.1000000000001,207.7])
	ctx.recodingOrder('bezierCurveTo',[313.6000000000001,207.2,309.1000000000001,206.6,304.7000000000001,206.1])
	ctx.recodingOrder('bezierCurveTo',[269.6000000000001,202.2,235.1000000000001,194.29999999999998,202.0000000000001,182.5])
	ctx.recodingOrder('bezierCurveTo',[170.40000000000012,171.3,146.30000000000013,159.8,126.30000000000011,146.5])
	ctx.recodingOrder('bezierCurveTo',[116.10000000000011,139.7,101.2000000000001,129.8,99.50000000000011,116.3])
	ctx.recodingOrder('bezierCurveTo',[98.40000000000012,107.89999999999999,101.60000000000011,99.19999999999999,108.30000000000011,92])
	ctx.recodingOrder('bezierCurveTo',[116.20000000000012,83.5,127.90000000000012,78.4,138.1000000000001,79])
	ctx.recodingOrder('bezierCurveTo',[139.8000000000001,79.1,141.1000000000001,80.6,141.0000000000001,82.3])
	ctx.recodingOrder('bezierCurveTo',[140.90000000000012,84,139.40000000000012,85.3,137.7000000000001,85.2])
	ctx.recodingOrder('bezierCurveTo',[129.4000000000001,84.7,119.60000000000011,89,112.8000000000001,96.2])
	ctx.recodingOrder('bezierCurveTo',[107.3000000000001,102.10000000000001,104.8000000000001,108.9,105.6000000000001,115.4])
	ctx.recodingOrder('bezierCurveTo',[107.0000000000001,126.10000000000001,120.40000000000009,135,129.3000000000001,141])
	ctx.recodingOrder('bezierCurveTo',[149.2000000000001,154.3,172.8000000000001,165.5,203.9000000000001,176.5])
	ctx.recodingOrder('bezierCurveTo',[236.60000000000008,188.1,270.6000000000001,195.9,305.2000000000001,199.8])
	ctx.recodingOrder('bezierCurveTo',[309.6000000000001,200.3,314.1000000000001,200.8,318.6000000000001,201.4])
	ctx.recodingOrder('bezierCurveTo',[332.7000000000001,203.1,347.30000000000007,204.9,361.4000000000001,205.20000000000002])
	ctx.recodingOrder('lineTo',[365.9000000000001,205.3])
	ctx.recodingOrder('bezierCurveTo',[379.6000000000001,205.70000000000002,402.5000000000001,206.5,410.9000000000001,198.20000000000002])
	ctx.recodingOrder('bezierCurveTo',[418.2000000000001,190.9,417.2000000000001,173.9,413.2000000000001,164.90000000000003])
	ctx.recodingOrder('bezierCurveTo',[407.8000000000001,152.70000000000005,398.3000000000001,151.90000000000003,385.2000000000001,150.80000000000004])
	ctx.recodingOrder('bezierCurveTo',[381.1000000000001,150.40000000000003,377.1000000000001,150.10000000000005,373.0000000000001,149.80000000000004])
	ctx.recodingOrder('bezierCurveTo',[361.5000000000001,148.90000000000003,349.60000000000014,148.00000000000003,337.9000000000001,146.10000000000005])
	ctx.recodingOrder('bezierCurveTo',[315.9000000000001,142.50000000000006,293.7000000000001,138.00000000000006,272.0000000000001,132.50000000000006])
	ctx.recodingOrder('bezierCurveTo',[227.90000000000012,121.40000000000006,184.7000000000001,106.20000000000006,143.5000000000001,87.60000000000005])
	ctx.recodingOrder('bezierCurveTo',[141.90000000000012,86.90000000000005,141.2000000000001,85.00000000000006,141.90000000000012,83.50000000000006])
	ctx.recodingOrder('bezierCurveTo',[142.6000000000001,81.90000000000006,144.5000000000001,81.20000000000006,146.0000000000001,81.90000000000006])
	ctx.recodingOrder('bezierCurveTo',[186.90000000000012,100.40000000000006,229.80000000000013,115.40000000000006,273.5000000000001,126.50000000000006])
	ctx.recodingOrder('bezierCurveTo',[295.0000000000001,131.90000000000006,317.0000000000001,136.50000000000006,338.8000000000001,140.00000000000006])
	ctx.recodingOrder('bezierCurveTo',[350.2000000000001,141.80000000000007,362.0000000000001,142.70000000000005,373.40000000000015,143.60000000000005])
	ctx.recodingOrder('bezierCurveTo',[377.50000000000017,143.90000000000006,381.60000000000014,144.20000000000005,385.60000000000014,144.60000000000005])
	ctx.recodingOrder('bezierCurveTo',[399.10000000000014,145.80000000000004,411.90000000000015,146.90000000000006,418.8000000000001,162.50000000000006])
	ctx.recodingOrder('bezierCurveTo',[423.5000000000001,173.20000000000005,424.90000000000015,193.10000000000005,415.2000000000001,202.80000000000007])
	ctx.recodingOrder('bezierCurveTo',[407.7,210.5,392,211.9,378.1,211.9])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[317.3,196.3])
	ctx.recodingOrder('bezierCurveTo',[317,196.3,316.7,196.3,316.40000000000003,196.20000000000002])
	ctx.recodingOrder('bezierCurveTo',[314.70000000000005,195.70000000000002,313.8,194.00000000000003,314.3,192.3])
	ctx.recodingOrder('lineTo',[316,186.60000000000002])
	ctx.recodingOrder('bezierCurveTo',[316.5,184.90000000000003,318.2,184.00000000000003,319.9,184.50000000000003])
	ctx.recodingOrder('bezierCurveTo',[321.59999999999997,185.00000000000003,322.5,186.70000000000002,322,188.40000000000003])
	ctx.recodingOrder('lineTo',[320.3,194.10000000000002])
	ctx.recodingOrder('bezierCurveTo',[319.9,195.4,318.7,196.3,317.3,196.3])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[329.3,196.9])
	ctx.recodingOrder('bezierCurveTo',[329.3,196.9,329.2,196.9,329.2,196.9])
	ctx.recodingOrder('bezierCurveTo',[327.5,196.8,326.09999999999997,195.4,326.2,193.6])
	ctx.recodingOrder('lineTo',[326.5,187.9])
	ctx.recodingOrder('bezierCurveTo',[326.6,186.20000000000002,327.9,185,329.8,184.9])
	ctx.recodingOrder('bezierCurveTo',[331.5,185,332.90000000000003,186.4,332.8,188.20000000000002])
	ctx.recodingOrder('lineTo',[332.5,193.9])
	ctx.recodingOrder('bezierCurveTo',[332.4,195.5,331,196.9,329.3,196.9])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[339.8,198.9])
	ctx.recodingOrder('bezierCurveTo',[338.1,198.9,336.7,197.5,336.7,195.8])
	ctx.recodingOrder('lineTo',[336.7,189.5])
	ctx.recodingOrder('bezierCurveTo',[336.7,187.8,338.09999999999997,186.4,339.8,186.4])
	ctx.recodingOrder('bezierCurveTo',[341.50000000000006,186.4,342.90000000000003,187.8,342.90000000000003,189.5])
	ctx.recodingOrder('lineTo',[342.90000000000003,195.8])
	ctx.recodingOrder('bezierCurveTo',[342.9,197.5,341.5,198.9,339.8,198.9])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[349.7,200.5])
	ctx.recodingOrder('bezierCurveTo',[348.4,200.5,347.3,199.7,346.8,198.5])
	ctx.recodingOrder('bezierCurveTo',[345.90000000000003,196.1,345.40000000000003,193.5,345.6,190.9])
	ctx.recodingOrder('bezierCurveTo',[345.70000000000005,189.20000000000002,347,187.8,348.90000000000003,187.9])
	ctx.recodingOrder('bezierCurveTo',[350.6,188,352.00000000000006,189.5,351.90000000000003,191.20000000000002])
	ctx.recodingOrder('bezierCurveTo',[351.8,192.9,352.1,194.60000000000002,352.70000000000005,196.20000000000002])
	ctx.recodingOrder('bezierCurveTo',[353.30000000000007,197.8,352.50000000000006,199.60000000000002,350.90000000000003,200.3])
	ctx.recodingOrder('bezierCurveTo',[350.4,200.5,350,200.5,349.7,200.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[360.7,200])
	ctx.recodingOrder('bezierCurveTo',[359.4,200,358.2,199.2,357.8,197.9])
	ctx.recodingOrder('bezierCurveTo',[357.1,195.9,356.8,193.8,357.1,191.70000000000002])
	ctx.recodingOrder('bezierCurveTo',[357.3,190.00000000000003,358.90000000000003,188.8,360.6,189.00000000000003])
	ctx.recodingOrder('bezierCurveTo',[362.3,189.20000000000002,363.5,190.80000000000004,363.3,192.50000000000003])
	ctx.recodingOrder('bezierCurveTo',[363.2,193.60000000000002,363.3,194.70000000000002,363.7,195.70000000000002])
	ctx.recodingOrder('bezierCurveTo',[364.3,197.3,363.5,199.10000000000002,361.8,199.70000000000002])
	ctx.recodingOrder('bezierCurveTo',[361.4,199.9,361,200,360.7,200])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[373.1,201])
	ctx.recodingOrder('bezierCurveTo',[371.70000000000005,201,370.40000000000003,200.1,370.1,198.7])
	ctx.recodingOrder('lineTo',[369.1,195])
	ctx.recodingOrder('bezierCurveTo',[368.70000000000005,193.3,369.6,191.4,371.3,190.9])
	ctx.recodingOrder('bezierCurveTo',[373,190.5,374.6,191.20000000000002,375.1,192.9])
	ctx.recodingOrder('lineTo',[375.20000000000005,193.4])
	ctx.recodingOrder('lineTo',[376.20000000000005,197.1])
	ctx.recodingOrder('bezierCurveTo',[376.70000000000005,198.79999999999998,375.70000000000005,200.5,374.00000000000006,200.9])
	ctx.recodingOrder('bezierCurveTo',[373.7,201,373.4,201,373.1,201])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[385.8,200.4])
	ctx.recodingOrder('bezierCurveTo',[384.90000000000003,200.4,384,200,383.40000000000003,199.3])
	ctx.recodingOrder('bezierCurveTo',[382.1,197.70000000000002,381.90000000000003,195.5,382.90000000000003,193.70000000000002])
	ctx.recodingOrder('bezierCurveTo',[383.8,192.20000000000002,385.70000000000005,191.70000000000002,387.20000000000005,192.50000000000003])
	ctx.recodingOrder('bezierCurveTo',[388.50000000000006,193.20000000000002,389.00000000000006,194.70000000000002,388.70000000000005,196.00000000000003])
	ctx.recodingOrder('bezierCurveTo',[389.30000000000007,197.30000000000004,388.90000000000003,198.80000000000004,387.80000000000007,199.70000000000002])
	ctx.recodingOrder('bezierCurveTo',[387.2,200.2,386.5,200.4,385.8,200.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[398.8,199.4])
	ctx.recodingOrder('bezierCurveTo',[398,199.4,397.2,199.1,396.6,198.5])
	ctx.recodingOrder('bezierCurveTo',[395.3,197.3,394.40000000000003,195.6,394,193.8])
	ctx.recodingOrder('bezierCurveTo',[393.6,192.10000000000002,394.7,190.4,396.4,190.10000000000002])
	ctx.recodingOrder('bezierCurveTo',[398.09999999999997,189.8,399.79999999999995,190.8,400.09999999999997,192.50000000000003])
	ctx.recodingOrder('bezierCurveTo',[400.2,193.00000000000003,400.49999999999994,193.60000000000002,400.9,193.90000000000003])
	ctx.recodingOrder('bezierCurveTo',[402.2,195.10000000000002,402.2,197.10000000000002,401,198.30000000000004])
	ctx.recodingOrder('bezierCurveTo',[400.5,199.1,399.7,199.4,398.8,199.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[408.2,196.3])
	ctx.recodingOrder('bezierCurveTo',[407.4,196.3,406.59999999999997,196,406,195.4])
	ctx.recodingOrder('lineTo',[404.1,193.6])
	ctx.recodingOrder('bezierCurveTo',[402.8,192.4,402.8,190.4,404,189.2])
	ctx.recodingOrder('bezierCurveTo',[405.2,187.89999999999998,407.2,187.89999999999998,408.4,189.1])
	ctx.recodingOrder('lineTo',[410.29999999999995,190.9])
	ctx.recodingOrder('bezierCurveTo',[411.59999999999997,192.1,411.59999999999997,194.1,410.4,195.3])
	ctx.recodingOrder('bezierCurveTo',[409.9,196,409,196.3,408.2,196.3])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[112,119])
	ctx.recodingOrder('bezierCurveTo',[112,119,112,119,112,119])
	ctx.recodingOrder('bezierCurveTo',[110.2,119,108.8,117.5,108.9,115.8])
	ctx.recodingOrder('bezierCurveTo',[109,112.89999999999999,110.7,110.2,113.2,108.89999999999999])
	ctx.recodingOrder('bezierCurveTo',[114.7,108.1,116.60000000000001,108.69999999999999,117.4,110.19999999999999])
	ctx.recodingOrder('bezierCurveTo',[118.2,111.69999999999999,117.60000000000001,113.6,116.10000000000001,114.39999999999999])
	ctx.recodingOrder('bezierCurveTo',[115.60000000000001,114.69999999999999,115.2,115.3,115.2,115.89999999999999])
	ctx.recodingOrder('bezierCurveTo',[115.1,117.7,113.7,119,112,119])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[117.7,125.3])
	ctx.recodingOrder('bezierCurveTo',[117.3,125.3,116.9,125.2,116.5,125.1])
	ctx.recodingOrder('bezierCurveTo',[114.9,124.39999999999999,114.1,122.6,114.8,121])
	ctx.recodingOrder('bezierCurveTo',[115.7,118.8,117.2,116.9,119.1,115.5])
	ctx.recodingOrder('bezierCurveTo',[120.5,114.5,122.5,114.8,123.5,116.2])
	ctx.recodingOrder('bezierCurveTo',[124.5,117.60000000000001,124.2,119.60000000000001,122.8,120.60000000000001])
	ctx.recodingOrder('bezierCurveTo',[121.8,121.30000000000001,121.1,122.30000000000001,120.6,123.4])
	ctx.recodingOrder('bezierCurveTo',[120.1,124.5,118.9,125.3,117.7,125.3])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[125.2,131.4])
	ctx.recodingOrder('bezierCurveTo',[123.8,131.4,122.5,130.4,122.2,129])
	ctx.recodingOrder('bezierCurveTo',[121.8,127.3,122.8,125.6,124.5,125.2])
	ctx.recodingOrder('bezierCurveTo',[124.7,125.10000000000001,124.9,125,125,124.8])
	ctx.recodingOrder('bezierCurveTo',[125.9,123.3,127.8,122.8,129.3,123.6])
	ctx.recodingOrder('bezierCurveTo',[130.8,124.5,131.3,126.39999999999999,130.5,127.89999999999999])
	ctx.recodingOrder('bezierCurveTo',[129.5,129.6,127.9,130.79999999999998,126,131.29999999999998])
	ctx.recodingOrder('bezierCurveTo',[125.7,131.4,125.4,131.4,125.2,131.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[133.5,138.4])
	ctx.recodingOrder('bezierCurveTo',[132.4,138.4,131.3,137.8,130.7,136.8])
	ctx.recodingOrder('bezierCurveTo',[129.89999999999998,135.3,130.39999999999998,133.4,131.89999999999998,132.60000000000002])
	ctx.recodingOrder('bezierCurveTo',[132.2,130.90000000000003,133.79999999999998,129.8,135.39999999999998,130.10000000000002])
	ctx.recodingOrder('bezierCurveTo',[137.09999999999997,130.40000000000003,138.29999999999998,131.90000000000003,137.99999999999997,133.70000000000002])
	ctx.recodingOrder('bezierCurveTo',[137.69999999999996,135.60000000000002,136.59999999999997,137.20000000000002,134.89999999999998,138.10000000000002])
	ctx.recodingOrder('bezierCurveTo',[134.5,138.3,134,138.4,133.5,138.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[243.3,451.7])
	ctx.recodingOrder('bezierCurveTo',[241.70000000000002,451.7,240.3,450.5,240.20000000000002,448.8])
	ctx.recodingOrder('lineTo',[239.9,445.6])
	ctx.recodingOrder('bezierCurveTo',[239.70000000000002,443.90000000000003,241,442.40000000000003,242.70000000000002,442.20000000000005])
	ctx.recodingOrder('bezierCurveTo',[244.4,442.1,245.9,443.30000000000007,246.10000000000002,445.00000000000006])
	ctx.recodingOrder('lineTo',[246.40000000000003,448.20000000000005])
	ctx.recodingOrder('bezierCurveTo',[246.60000000000002,449.90000000000003,245.30000000000004,451.40000000000003,243.60000000000002,451.6])
	ctx.recodingOrder('bezierCurveTo',[243.5,451.7,243.4,451.7,243.3,451.7])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[255.2,450.1])
	ctx.recodingOrder('bezierCurveTo',[254.6,450.1,254.1,450,253.6,449.6])
	ctx.recodingOrder('bezierCurveTo',[252.5,448.90000000000003,251.7,447.8,251.29999999999998,446.5])
	ctx.recodingOrder('bezierCurveTo',[250.99999999999997,445.2,251.2,443.8,251.89999999999998,442.7])
	ctx.recodingOrder('bezierCurveTo',[252.79999999999998,441.2,254.7,440.8,256.2,441.7])
	ctx.recodingOrder('bezierCurveTo',[257.3,442.4,257.9,443.8,257.59999999999997,445])
	ctx.recodingOrder('bezierCurveTo',[258.4,446,258.49999999999994,447.4,257.79999999999995,448.6])
	ctx.recodingOrder('bezierCurveTo',[257.3,449.6,256.2,450.1,255.2,450.1])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[265.1,449.1])
	ctx.recodingOrder('bezierCurveTo',[263.90000000000003,449.1,262.8,448.5,262.3,447.40000000000003])
	ctx.recodingOrder('lineTo',[261.3,445.3])
	ctx.recodingOrder('bezierCurveTo',[260.5,443.8,261.1,441.90000000000003,262.7,441.1])
	ctx.recodingOrder('bezierCurveTo',[264.2,440.3,266.09999999999997,440.90000000000003,266.9,442.5])
	ctx.recodingOrder('lineTo',[268,444.6])
	ctx.recodingOrder('bezierCurveTo',[268.8,446.20000000000005,268.1,448,266.6,448.8])
	ctx.recodingOrder('bezierCurveTo',[266,449,265.6,449.1,265.1,449.1])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[277.1,448.6])
	ctx.recodingOrder('bezierCurveTo',[275.90000000000003,448.6,274.8,448,274.3,446.90000000000003])
	ctx.recodingOrder('lineTo',[273.3,444.8])
	ctx.recodingOrder('bezierCurveTo',[272.5,443.3,273.1,441.40000000000003,274.7,440.6])
	ctx.recodingOrder('bezierCurveTo',[276.2,439.8,278.09999999999997,440.40000000000003,278.9,442])
	ctx.recodingOrder('lineTo',[280,444.1])
	ctx.recodingOrder('bezierCurveTo',[280.8,445.70000000000005,280.1,447.5,278.6,448.3])
	ctx.recodingOrder('bezierCurveTo',[278,448.5,277.6,448.6,277.1,448.6])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[288.1,446])
	ctx.recodingOrder('bezierCurveTo',[286.70000000000005,446,285.40000000000003,445.1,285.1,443.6])
	ctx.recodingOrder('lineTo',[284.3,440.40000000000003])
	ctx.recodingOrder('bezierCurveTo',[283.90000000000003,438.70000000000005,284.90000000000003,437.00000000000006,286.6,436.6])
	ctx.recodingOrder('bezierCurveTo',[288.3,436.20000000000005,290,437.20000000000005,290.40000000000003,438.90000000000003])
	ctx.recodingOrder('lineTo',[291.20000000000005,442.1])
	ctx.recodingOrder('bezierCurveTo',[291.6,443.8,290.6,445.5,288.90000000000003,445.90000000000003])
	ctx.recodingOrder('bezierCurveTo',[288.6,445.9,288.3,446,288.1,446])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[298,441.8])
	ctx.recodingOrder('bezierCurveTo',[297.2,441.8,296.4,441.5,295.8,440.90000000000003])
	ctx.recodingOrder('lineTo',[295.2,440.3])
	ctx.recodingOrder('bezierCurveTo',[294,439.1,294,437.1,295.2,435.90000000000003])
	ctx.recodingOrder('bezierCurveTo',[296.4,434.70000000000005,298.4,434.70000000000005,299.59999999999997,435.90000000000003])
	ctx.recodingOrder('lineTo',[300.09999999999997,436.40000000000003])
	ctx.recodingOrder('bezierCurveTo',[301.29999999999995,437.6,301.29999999999995,439.6,300.09999999999997,440.8])
	ctx.recodingOrder('bezierCurveTo',[299.6,441.5,298.8,441.8,298,441.8])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[134,444.4])
	ctx.recodingOrder('bezierCurveTo',[132.4,444.4,131,443.2,130.9,441.59999999999997])
	ctx.recodingOrder('bezierCurveTo',[130.70000000000002,439.59999999999997,131.4,437.49999999999994,132.9,435.99999999999994])
	ctx.recodingOrder('bezierCurveTo',[134.1,434.79999999999995,136.1,434.69999999999993,137.3,435.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[138.5,437.0999999999999,138.60000000000002,439.0999999999999,137.4,440.2999999999999])
	ctx.recodingOrder('bezierCurveTo',[137.20000000000002,440.4999999999999,137.20000000000002,440.6999999999999,137.20000000000002,440.8999999999999])
	ctx.recodingOrder('bezierCurveTo',[137.4,442.5999999999999,136.10000000000002,444.19999999999993,134.4,444.2999999999999])
	ctx.recodingOrder('bezierCurveTo',[134.2,444.4,134.1,444.4,134,444.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[144.4,446.5])
	ctx.recodingOrder('bezierCurveTo',[142.70000000000002,446.5,141.3,445.1,141.3,443.4])
	ctx.recodingOrder('lineTo',[141.3,440.79999999999995])
	ctx.recodingOrder('bezierCurveTo',[141.3,439.09999999999997,142.70000000000002,437.69999999999993,144.4,437.69999999999993])
	ctx.recodingOrder('bezierCurveTo',[146.1,437.69999999999993,147.5,439.0999999999999,147.5,440.79999999999995])
	ctx.recodingOrder('lineTo',[147.5,443.4])
	ctx.recodingOrder('bezierCurveTo',[147.6,445.1,146.2,446.5,144.4,446.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[348,551.5])
	ctx.recodingOrder('bezierCurveTo',[347,551.5,346.1,551,345.5,550.2])
	ctx.recodingOrder('lineTo',[342.4,546])
	ctx.recodingOrder('bezierCurveTo',[341.4,544.6,341.7,542.6,343.09999999999997,541.6])
	ctx.recodingOrder('bezierCurveTo',[344.49999999999994,540.6,346.49999999999994,540.9,347.49999999999994,542.3000000000001])
	ctx.recodingOrder('lineTo',[350.59999999999997,546.5000000000001])
	ctx.recodingOrder('bezierCurveTo',[351.59999999999997,547.9000000000001,351.29999999999995,549.9000000000001,349.9,550.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[349.3,551.3,348.7,551.5,348,551.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[355.4,545.7])
	ctx.recodingOrder('bezierCurveTo',[354.5,545.7,353.59999999999997,545.3000000000001,352.9,544.5])
	ctx.recodingOrder('lineTo',[350.4,541.3])
	ctx.recodingOrder('bezierCurveTo',[349.29999999999995,539.9,349.5,538,350.9,536.9])
	ctx.recodingOrder('bezierCurveTo',[352.29999999999995,535.8,354.2,536,355.29999999999995,537.4])
	ctx.recodingOrder('lineTo',[357.79999999999995,540.6])
	ctx.recodingOrder('bezierCurveTo',[358.9,542,358.69999999999993,543.9,357.29999999999995,545])
	ctx.recodingOrder('bezierCurveTo',[356.8,545.5,356.1,545.7,355.4,545.7])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[362.7,538.4])
	ctx.recodingOrder('bezierCurveTo',[362.09999999999997,538.4,361.59999999999997,538.3,361.09999999999997,537.9])
	ctx.recodingOrder('lineTo',[358.49999999999994,536.3])
	ctx.recodingOrder('bezierCurveTo',[356.99999999999994,535.4,356.49999999999994,533.5,357.3999999999999,532])
	ctx.recodingOrder('bezierCurveTo',[357.3999999999999,532,357.3999999999999,531.9,357.49999999999994,531.9])
	ctx.recodingOrder('bezierCurveTo',[357.49999999999994,531.9,357.59999999999997,531.8,357.59999999999997,531.8])
	ctx.recodingOrder('bezierCurveTo',[358.59999999999997,530.4,360.49999999999994,530,361.9,530.9])
	ctx.recodingOrder('lineTo',[364.4,532.6])
	ctx.recodingOrder('bezierCurveTo',[365.79999999999995,533.5,366.2,535.5,365.29999999999995,536.9])
	ctx.recodingOrder('bezierCurveTo',[364.8,537.9,363.8,538.4,362.7,538.4])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[366.9,530.7])
	ctx.recodingOrder('bezierCurveTo',[366.59999999999997,530.7,366.29999999999995,530.7,366,530.6])
	ctx.recodingOrder('lineTo',[364,530])
	ctx.recodingOrder('bezierCurveTo',[362.3,529.5,361.4,527.7,361.9,526.1])
	ctx.recodingOrder('bezierCurveTo',[362.4,524.4,364.2,523.5,365.79999999999995,524])
	ctx.recodingOrder('lineTo',[367.9,524.6])
	ctx.recodingOrder('bezierCurveTo',[369.5,525.1,370.5,526.9,370,528.5])
	ctx.recodingOrder('bezierCurveTo',[369.5,529.8,368.2,530.7,366.9,530.7])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[366.3,521.8])
	ctx.recodingOrder('bezierCurveTo',[365.8,521.8,365.3,521.6999999999999,364.8,521.4])
	ctx.recodingOrder('lineTo',[363.8,520.9])
	ctx.recodingOrder('bezierCurveTo',[362.3,520.1,361.7,518.1999999999999,362.5,516.6999999999999])
	ctx.recodingOrder('bezierCurveTo',[363.3,515.1999999999999,365.2,514.5999999999999,366.7,515.4])
	ctx.recodingOrder('lineTo',[367.8,516])
	ctx.recodingOrder('bezierCurveTo',[369.3,516.8,369.90000000000003,518.7,369,520.3])
	ctx.recodingOrder('bezierCurveTo',[368.5,521.2,367.4,521.8,366.3,521.8])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[64.5,529.5])
	ctx.recodingOrder('bezierCurveTo',[63.9,529.5,63.2,529.3,62.7,528.9])
	ctx.recodingOrder('bezierCurveTo',[61.300000000000004,527.9,60.900000000000006,525.9,61.900000000000006,524.5])
	ctx.recodingOrder('lineTo',[63,523])
	ctx.recodingOrder('bezierCurveTo',[64,521.6,66,521.3,67.4,522.2])
	ctx.recodingOrder('bezierCurveTo',[68.80000000000001,523.2,69.10000000000001,525.2,68.10000000000001,526.6])
	ctx.recodingOrder('lineTo',[67.00000000000001,528.1])
	ctx.recodingOrder('bezierCurveTo',[66.5,529.1,65.5,529.5,64.5,529.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[65.5,540.5])
	ctx.recodingOrder('bezierCurveTo',[65.3,540.5,65.2,540.5,65,540.5])
	ctx.recodingOrder('bezierCurveTo',[63.3,540.2,62.1,538.6,62.4,536.9])
	ctx.recodingOrder('bezierCurveTo',[62.8,534.6,64.2,532.6,66.2,531.6])
	ctx.recodingOrder('bezierCurveTo',[67.7,530.8000000000001,69.60000000000001,531.4,70.4,532.9])
	ctx.recodingOrder('bezierCurveTo',[71.2,534.4,70.60000000000001,536.3,69.10000000000001,537.1])
	ctx.recodingOrder('bezierCurveTo',[68.80000000000001,537.2,68.60000000000001,537.6,68.50000000000001,537.9])
	ctx.recodingOrder('bezierCurveTo',[68.3,539.4,67,540.5,65.5,540.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[70.4,548.5])
	ctx.recodingOrder('bezierCurveTo',[69.5,548.5,68.60000000000001,548.1,68,547.3])
	ctx.recodingOrder('bezierCurveTo',[66.9,546,67.1,544,68.5,542.9])
	ctx.recodingOrder('lineTo',[70.5,541.3])
	ctx.recodingOrder('bezierCurveTo',[71.8,540.1999999999999,73.8,540.4,74.9,541.8])
	ctx.recodingOrder('bezierCurveTo',[76,543.0999999999999,75.80000000000001,545.0999999999999,74.4,546.1999999999999])
	ctx.recodingOrder('lineTo',[72.4,547.8])
	ctx.recodingOrder('bezierCurveTo',[71.8,548.2,71.1,548.5,70.4,548.5])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[78.6,554.6])
	ctx.recodingOrder('bezierCurveTo',[76.89999999999999,554.6,75.5,553.3000000000001,75.5,551.6])
	ctx.recodingOrder('bezierCurveTo',[75.4,548.8000000000001,77.4,546.3000000000001,80.1,545.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[81.8,545.4000000000001,83.39999999999999,546.6,83.8,548.2])
	ctx.recodingOrder('bezierCurveTo',[84.1,549.8000000000001,83.2,551.3000000000001,81.7,551.8000000000001])
	ctx.recodingOrder('bezierCurveTo',[81.6,553.3,80.3,554.6,78.6,554.6])
	ctx.recodingOrder('bezierCurveTo',[78.7,554.6,78.6,554.6,78.6,554.6])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[87.5,559.3])
	ctx.recodingOrder('bezierCurveTo',[87.1,559.3,86.7,559.1999999999999,86.3,559])
	ctx.recodingOrder('bezierCurveTo',[84.7,558.3,84,556.5,84.6,554.9])
	ctx.recodingOrder('lineTo',[86.19999999999999,551.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[86.89999999999999,549.5999999999999,88.69999999999999,548.9,90.29999999999998,549.4999999999999])
	ctx.recodingOrder('bezierCurveTo',[91.89999999999998,550.1999999999999,92.59999999999998,551.9999999999999,91.99999999999999,553.5999999999999])
	ctx.recodingOrder('lineTo',[90.39999999999999,557.3])
	ctx.recodingOrder('bezierCurveTo',[89.9,558.6,88.7,559.3,87.5,559.3])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[284.2,651.8])
	ctx.recodingOrder('bezierCurveTo',[282.7,651.8,281.3,650.6999999999999,281.09999999999997,649.0999999999999])
	ctx.recodingOrder('lineTo',[280.59999999999997,645.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[280.29999999999995,644.2999999999998,281.49999999999994,642.6999999999999,283.2,642.3999999999999])
	ctx.recodingOrder('bezierCurveTo',[284.9,642.0999999999999,286.5,643.2999999999998,286.8,644.9999999999999])
	ctx.recodingOrder('lineTo',[287.3,648.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[287.6,649.9,286.40000000000003,651.4999999999999,284.7,651.8])
	ctx.recodingOrder('bezierCurveTo',[284.6,651.8,284.4,651.8,284.2,651.8])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[294.4,650.2])
	ctx.recodingOrder('bezierCurveTo',[293.2,650.2,292.09999999999997,649.5,291.59999999999997,648.4000000000001])
	ctx.recodingOrder('lineTo',[290.59999999999997,646.3000000000001])
	ctx.recodingOrder('bezierCurveTo',[289.9,644.7,290.49999999999994,642.9000000000001,292.09999999999997,642.1])
	ctx.recodingOrder('bezierCurveTo',[293.7,641.3000000000001,295.49999999999994,642,296.29999999999995,643.6])
	ctx.recodingOrder('lineTo',[297.29999999999995,645.7])
	ctx.recodingOrder('bezierCurveTo',[297.99999999999994,647.3000000000001,297.4,649.1,295.79999999999995,649.9000000000001])
	ctx.recodingOrder('bezierCurveTo',[295.3,650.1,294.8,650.2,294.4,650.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[305.8,649.8])
	ctx.recodingOrder('bezierCurveTo',[304.7,650.1999999999999,303.40000000000003,649.9,302.6,649])
	ctx.recodingOrder('lineTo',[301,647.3])
	ctx.recodingOrder('bezierCurveTo',[299.8,646,299.9,644.0999999999999,301.1,642.9])
	ctx.recodingOrder('bezierCurveTo',[302.40000000000003,641.6999999999999,304.3,641.8,305.5,643])
	ctx.recodingOrder('lineTo',[307.1,644.7])
	ctx.recodingOrder('bezierCurveTo',[308.3,646,308.20000000000005,647.9000000000001,307,649.1])
	ctx.recodingOrder('bezierCurveTo',[306.6,649.4,306.2,649.7,305.8,649.8])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[313.5,647.1])
	ctx.recodingOrder('bezierCurveTo',[312.5,647.1,311.5,646.7,310.7,645.9])
	ctx.recodingOrder('bezierCurveTo',[309.7,644.9,309.3,643.5,309.59999999999997,642.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[309.99999999999994,640.4999999999999,311.59999999999997,639.4999999999999,313.4,639.8])
	ctx.recodingOrder('bezierCurveTo',[314.29999999999995,640,315,640.5,315.4,641.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[316.09999999999997,641.5999999999999,316.59999999999997,642.3,316.79999999999995,643.1999999999999])
	ctx.recodingOrder('bezierCurveTo',[317.19999999999993,644.9,316.09999999999997,646.5999999999999,314.4,646.9999999999999])
	ctx.recodingOrder('bezierCurveTo',[314.1,647,313.8,647.1,313.5,647.1])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[124.6,646])
	ctx.recodingOrder('bezierCurveTo',[122.89999999999999,646,121.5,644.6,121.5,642.9])
	ctx.recodingOrder('lineTo',[121.5,641.9])
	ctx.recodingOrder('bezierCurveTo',[121.5,640.1999999999999,122.9,638.8,124.6,638.8])
	ctx.recodingOrder('bezierCurveTo',[126.3,638.8,127.69999999999999,640.1999999999999,127.69999999999999,641.9])
	ctx.recodingOrder('lineTo',[127.69999999999999,642.9])
	ctx.recodingOrder('bezierCurveTo',[127.7,644.6,126.3,646,124.6,646])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[133,648.6])
	ctx.recodingOrder('bezierCurveTo',[131.3,648.6,129.9,647.2,129.9,645.5])
	ctx.recodingOrder('lineTo',[129.9,642.9])
	ctx.recodingOrder('bezierCurveTo',[129.9,641.1999999999999,131.3,639.8,133,639.8])
	ctx.recodingOrder('bezierCurveTo',[134.7,639.8,136.1,641.1999999999999,136.1,642.9])
	ctx.recodingOrder('lineTo',[136.1,645.5])
	ctx.recodingOrder('bezierCurveTo',[136.1,647.2,134.7,648.6,133,648.6])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[140.8,649.7])
	ctx.recodingOrder('bezierCurveTo',[139.10000000000002,649.7,137.70000000000002,648.3000000000001,137.70000000000002,646.6])
	ctx.recodingOrder('lineTo',[137.70000000000002,645])
	ctx.recodingOrder('bezierCurveTo',[137.70000000000002,643.3,139.10000000000002,641.9,140.8,641.9])
	ctx.recodingOrder('bezierCurveTo',[142.5,641.9,143.9,643.3,143.9,645])
	ctx.recodingOrder('lineTo',[143.9,646.6])
	ctx.recodingOrder('bezierCurveTo',[143.9,648.3,142.5,649.7,140.8,649.7])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[149.7,650.2])
	ctx.recodingOrder('bezierCurveTo',[148.39999999999998,650.2,147.29999999999998,649.4000000000001,146.79999999999998,648.2])
	ctx.recodingOrder('lineTo',[146.2,646.7])
	ctx.recodingOrder('bezierCurveTo',[145.6,645.1,146.39999999999998,643.3000000000001,148,642.6])
	ctx.recodingOrder('bezierCurveTo',[149.6,642,151.4,642.8000000000001,152.1,644.4])
	ctx.recodingOrder('lineTo',[152.7,645.9])
	ctx.recodingOrder('bezierCurveTo',[153.29999999999998,647.5,152.5,649.3,150.89999999999998,650])
	ctx.recodingOrder('bezierCurveTo',[150.5,650.1,150.1,650.2,149.7,650.2])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[437.5,263.3])
	ctx.recodingOrder('bezierCurveTo',[437.1,263.3,436.6,263.2,436.2,263])
	ctx.recodingOrder('bezierCurveTo',[433,261.5,431,258.1,431.09999999999997,254.6])
	ctx.recodingOrder('bezierCurveTo',[431.2,252.9,432.7,251.5,434.4,251.6])
	ctx.recodingOrder('bezierCurveTo',[436.09999999999997,251.7,437.5,253.2,437.4,254.9])
	ctx.recodingOrder('bezierCurveTo',[437.29999999999995,255.8,438,256.9,438.79999999999995,257.3])
	ctx.recodingOrder('bezierCurveTo',[440.4,258,441.09999999999997,259.90000000000003,440.29999999999995,261.5])
	ctx.recodingOrder('bezierCurveTo',[439.8,262.7,438.7,263.3,437.5,263.3])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[446.8,258])
	ctx.recodingOrder('bezierCurveTo',[445.90000000000003,258,445,257.6,444.40000000000003,256.8])
	ctx.recodingOrder('lineTo',[441.20000000000005,252.9])
	ctx.recodingOrder('bezierCurveTo',[440.1,251.6,440.30000000000007,249.6,441.6,248.5])
	ctx.recodingOrder('bezierCurveTo',[443,247.4,444.90000000000003,247.6,446,248.9])
	ctx.recodingOrder('lineTo',[449.2,252.8])
	ctx.recodingOrder('bezierCurveTo',[450.3,254.10000000000002,450.09999999999997,256.1,448.8,257.2])
	ctx.recodingOrder('bezierCurveTo',[448.2,257.8,447.5,258,446.8,258])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[453.9,248.6])
	ctx.recodingOrder('bezierCurveTo',[453.5,248.6,453.09999999999997,248.5,452.7,248.29999999999998])
	ctx.recodingOrder('lineTo',[449.5,246.89999999999998])
	ctx.recodingOrder('bezierCurveTo',[447.9,246.2,447.2,244.39999999999998,447.9,242.79999999999998])
	ctx.recodingOrder('bezierCurveTo',[448.59999999999997,241.2,450.4,240.49999999999997,452,241.2])
	ctx.recodingOrder('lineTo',[455.2,242.6])
	ctx.recodingOrder('bezierCurveTo',[456.8,243.29999999999998,457.5,245.1,456.8,246.7])
	ctx.recodingOrder('bezierCurveTo',[456.2,247.9,455.1,248.6,453.9,248.6])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	
	

	ctx.recodingOrder('save'); ctx = getCtx();//


	ctx.fillStyle="#EFEAE9";
	
	ctx.recodingOrder('beginPath');
	ctx.recodingOrder('moveTo',[454.4,237.7])
	ctx.recodingOrder('bezierCurveTo',[452.79999999999995,237.7,451.29999999999995,237.1,450.09999999999997,236])
	ctx.recodingOrder('bezierCurveTo',[448.9,234.8,448.79999999999995,232.8,449.99999999999994,231.6])
	ctx.recodingOrder('bezierCurveTo',[451.19999999999993,230.4,453.09999999999997,230.29999999999998,454.3999999999999,231.5])
	ctx.recodingOrder('bezierCurveTo',[455.99999999999994,230.9,457.7999999999999,231.8,458.3999999999999,233.4])
	ctx.recodingOrder('bezierCurveTo',[458.99999999999994,235,458.0999999999999,236.8,456.49999999999994,237.4])
	ctx.recodingOrder('bezierCurveTo',[455.8,237.6,455.1,237.7,454.4,237.7])
	ctx.recodingOrder('closePath');
	ctx.recodingOrder('fill');
	ctx.recodingOrder('stroke');
	ctx.recodingOrder('save'); 
	
	
	drawComponentToCanvas();

	return component;
}