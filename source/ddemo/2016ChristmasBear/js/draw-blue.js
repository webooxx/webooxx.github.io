

// var canvasHistory = [];

var draw = function(wrap,canvas_init){

	var component = [];
	window.c=component;
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

		map['1']= {name : '帽子',x:13,y:96,w:444,h:393,zIndex:7};

		map['2']= {name : '犄角',x:212,y:3,w:63,h:130,zIndex:0};
		
		map['3']= {name : '脸',x:82,y:217,w:303,h:261,zIndex:8};

		map['4']= {name : '嘴巴',x:166,y:368,w:123,h:68,zIndex:9};

		map['5']= {name : '围巾',x:251,y:505,w:53,h:75,zIndex:11};

		map['10']= {name : '手+脚',x:114,y:491,w:249,h:141,zIndex:1};
		
		map['11']= {name : '左鞋',x:165,y:648,w:62,h:38};
		map['12']= {name : '右鞋',x:246,y:647,w:61,h:40};
		map['27']= {name : '肚子',x:149,y:499,w:173,h:115,zIndex:3};


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

		// context.scale(.7,.7);
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

			if(this.data){
				//	 if debug
				// this.context.fillStyle='rgba(255,0,0,.5)';
				// this.context.fillRect(this.data.x,this.data.y,this.data.w,this.data.h);

			}


	    }


	    //	更改自身的颜色，并且触发全局 canvas 更新
	    this.changeColor = function(color){
	    	if(color != '#FFFFFF' && color == this.fillStyle){
	    		color = '#FFFFFF';
	    	}
	    	this.fillStyle = color;
	    	this.playOrder();
			drawComponentToCanvas();
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


	//	正式内容 =>>




 ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[-66.706,617.538]);
ctx.recodingOrder('bezierCurveTo',[-64.75,617.538,-64.75,614.504,-66.706,614.504]);
ctx.recodingOrder('bezierCurveTo',[-68.662,614.504,-68.662,617.538,-66.706,617.538]);
ctx.recodingOrder('lineTo',[-66.706,617.538]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[411.759,430.046]);
ctx.recodingOrder('bezierCurveTo',[393.14,449.461,360.045,467.225,337.14,473.93399999999997]);
ctx.recodingOrder('bezierCurveTo',[285.884,488.94899999999996,241.031,491.429,188.35799999999998,485.72299999999996]);
ctx.recodingOrder('bezierCurveTo',[151.79999999999998,481.76199999999994,115.33699999999997,474.15799999999996,83.72299999999997,453.10499999999996]);
ctx.recodingOrder('bezierCurveTo',[57.16299999999997,435.417,35.84499999999997,409.183,24.74199999999997,378.693]);
ctx.recodingOrder('bezierCurveTo',[12.28299999999997,344.483,10.812999999999969,306.589,16.702999999999967,270.798]);
ctx.recodingOrder('bezierCurveTo',[24.36699999999997,224.226,45.53099999999996,185.481,78.50899999999996,152.668]);
ctx.recodingOrder('bezierCurveTo',[115.17399999999995,116.18700000000001,166.34199999999996,99.72200000000001,217.42199999999997,96.09]);
ctx.recodingOrder('bezierCurveTo',[226.42999999999998,95.449,205.76099999999997,108.421,217.41999999999996,122.642]);
ctx.recodingOrder('bezierCurveTo',[224.03699999999995,132.197,277.61699999999996,143.974,274.056,111.607]);
ctx.recodingOrder('bezierCurveTo',[274.056,103.754,269.671,96.63,274.90299999999996,97.285]);
ctx.recodingOrder('bezierCurveTo',[391.558,111.864,438.86799999999994,208.529,449.12699999999995,247.864]);
ctx.recodingOrder('bezierCurveTo',[465.512,310.68,457.298,382.56,411.759,430.046]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#EA6812";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[266.056,130.14]);
ctx.recodingOrder('bezierCurveTo',[271.17499999999995,127.53999999999999,275.349,123.64999999999999,275.59999999999997,117.50499999999998]);
ctx.recodingOrder('bezierCurveTo',[275.59999999999997,117.50499999999998,275.013,111.95699999999998,274.78999999999996,109.22699999999998]);
ctx.recodingOrder('bezierCurveTo',[272.104,76.41199999999998,269.39199999999994,43.598999999999975,266.69199999999995,10.784999999999982]);
ctx.recodingOrder('bezierCurveTo',[265.93499999999995,1.5799999999999823,258.52099999999996,2.0649999999999817,255.33599999999996,9.763999999999982]);
ctx.recodingOrder('bezierCurveTo',[248.37299999999996,26.59199999999998,213.14399999999995,111.91499999999998,212.99799999999996,112.82099999999998]);
ctx.recodingOrder('bezierCurveTo',[212.58499999999995,115.39299999999999,213.03399999999996,118.00299999999999,214.54099999999997,120.55999999999999]);
ctx.recodingOrder('bezierCurveTo',[217.41299999999995,125.43199999999999,223.03499999999997,129.022,228.37299999999996,130.61399999999998]);
ctx.recodingOrder('bezierCurveTo',[239.579,133.953,255.312,135.597,266.056,130.14]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#92D2DF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[232.949,217.329]);
ctx.recodingOrder('bezierCurveTo',[232.949,217.329,160.178,211.40900000000002,109.45900000000002,271.46500000000003]);
ctx.recodingOrder('bezierCurveTo',[58.74000000000004,331.5210000000001,70.67700000000002,468.15200000000004,211.36900000000003,476.833]);
ctx.recodingOrder('bezierCurveTo',[352.06000000000006,485.514,388.048,413.27500000000003,384.72,340.06600000000003]);
ctx.recodingOrder('bezierCurveTo',[381.391,266.858,311.829,216.465,232.949,217.329]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#F7C8CA";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[198.932,431.239]);
ctx.recodingOrder('bezierCurveTo',[188.31099999999998,427.928,178.24499999999998,421.79699999999997,172.041,412.565]);
ctx.recodingOrder('bezierCurveTo',[163.575,399.962,163.405,380.366,178.482,372.782]);
ctx.recodingOrder('bezierCurveTo',[187.795,368.09799999999996,199.32,368.962,208.599,373.71]);
ctx.recodingOrder('bezierCurveTo',[215.421,377.198,223.33999999999997,377.738,230.873,377.281]);
ctx.recodingOrder('bezierCurveTo',[242.232,376.597,252.244,369.51800000000003,263.93399999999997,369.007]);
ctx.recodingOrder('bezierCurveTo',[273.41599999999994,368.591,281.80899999999997,373.549,286.15,381.933]);
ctx.recodingOrder('bezierCurveTo',[296.936,402.76099999999997,275.024,424.569,256.981,431.302]);
ctx.recodingOrder('bezierCurveTo',[238.678,438.133,217.365,436.986,198.932,431.239]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E53D3A";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[154.85,481.648]);
ctx.recodingOrder('bezierCurveTo',[154.85,481.648,152.255,498.389,167.272,504.95000000000005]);
ctx.recodingOrder('bezierCurveTo',[182.289,511.51200000000006,221.541,517.4140000000001,256.824,512.1980000000001]);
ctx.recodingOrder('lineTo',[262.36,577.5680000000001]);
ctx.recodingOrder('bezierCurveTo',[262.36,577.5680000000001,290.8,572.5810000000001,300.986,566.4900000000001]);
ctx.recodingOrder('bezierCurveTo',[300.986,566.4900000000001,300.194,530.0670000000001,294.239,506.4570000000001]);
ctx.recodingOrder('bezierCurveTo',[294.239,506.4570000000001,319.515,498.7400000000001,319.75199999999995,488.5440000000001]);
ctx.recodingOrder('lineTo',[316.768,479.3230000000001]);
ctx.recodingOrder('bezierCurveTo',[316.768,479.324,261.85,498.005,154.85,481.648]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#2B5E30";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[151.702,637.282]);
ctx.recodingOrder('lineTo',[142.202,648.862]);
ctx.recodingOrder('lineTo',[148.635,662.038]);
ctx.recodingOrder('lineTo',[153.235,660.921]);
ctx.recodingOrder('lineTo',[159.134,665.72]);
ctx.recodingOrder('lineTo',[167.9,659.308]);
ctx.recodingOrder('lineTo',[160.507,641.434]);
ctx.recodingOrder('lineTo',[151.702,637.282]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#2B5E30";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[320.905,636.756]);
ctx.recodingOrder('lineTo',[330.794,649.995]);
ctx.recodingOrder('lineTo',[325.144,661.422]);
ctx.recodingOrder('lineTo',[320.449,661.335]);
ctx.recodingOrder('lineTo',[313.72200000000004,665.8480000000001]);
ctx.recodingOrder('lineTo',[306.73800000000006,661.59]);
ctx.recodingOrder('lineTo',[310.14400000000006,641.489]);
ctx.recodingOrder('bezierCurveTo',[310.144,641.487,317.084,642.255,320.905,636.756]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#F4B81D";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[322.175,630.79]);
ctx.recodingOrder('bezierCurveTo',[320.999,628.353,318.333,627.504,315.402,627.887]);
ctx.recodingOrder('bezierCurveTo',[312.106,628.318,310.25,631.155,309.46799999999996,634.16]);
ctx.recodingOrder('bezierCurveTo',[309.18499999999995,635.2479999999999,309.015,636.395,309.24799999999993,637.495]);
ctx.recodingOrder('bezierCurveTo',[309.7249999999999,639.748,311.96199999999993,641.413,314.26399999999995,641.484]);
ctx.recodingOrder('bezierCurveTo',[319.43199999999996,641.644,323.5679999999999,637.443,322.68799999999993,632.421]);
ctx.recodingOrder('bezierCurveTo',[322.581,631.813,322.407,631.27,322.175,630.79]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#F4B81D";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[153.164,630.79]);
ctx.recodingOrder('bezierCurveTo',[154.33999999999997,628.353,157.006,627.504,159.93699999999998,627.887]);
ctx.recodingOrder('bezierCurveTo',[163.23299999999998,628.318,165.08899999999997,631.155,165.87099999999998,634.16]);
ctx.recodingOrder('bezierCurveTo',[166.15399999999997,635.2479999999999,166.32399999999998,636.395,166.09099999999998,637.495]);
ctx.recodingOrder('bezierCurveTo',[165.61399999999998,639.748,163.37699999999998,641.413,161.075,641.484]);
ctx.recodingOrder('bezierCurveTo',[155.90699999999998,641.644,151.771,637.443,152.65099999999998,632.421]);
ctx.recodingOrder('bezierCurveTo',[152.758,631.813,152.932,631.27,153.164,630.79]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#92D2DF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[153.909,493.923]);
ctx.recodingOrder('bezierCurveTo',[153.909,493.923,112.768,544.595,115.08599999999998,585.384]);
ctx.recodingOrder('bezierCurveTo',[115.08599999999998,585.384,114.49899999999998,600.618,134.45,602.897]);
ctx.recodingOrder('bezierCurveTo',[134.45,602.897,150.73499999999999,602.586,159.40099999999998,585.3810000000001]);
ctx.recodingOrder('lineTo',[162.29399999999998,590.508]);
ctx.recodingOrder('bezierCurveTo',[162.29399999999998,590.508,162.10799999999998,618.4590000000001,165.754,628.4820000000001]);
ctx.recodingOrder('bezierCurveTo',[165.754,628.4820000000001,198.218,635.6160000000001,222.141,629.7280000000001]);
ctx.recodingOrder('bezierCurveTo',[222.141,629.7280000000001,221.755,617.994,224.909,613.7500000000001]);
ctx.recodingOrder('bezierCurveTo',[224.909,613.7500000000001,238.20499999999998,614.9080000000001,246.701,614.0410000000002]);
ctx.recodingOrder('bezierCurveTo',[246.701,614.0410000000002,251.013,620.8370000000002,250.37199999999999,630.5050000000001]);
ctx.recodingOrder('bezierCurveTo',[250.37199999999999,630.5050000000001,287.08299999999997,631.6930000000001,306.739,624.6000000000001]);
ctx.recodingOrder('bezierCurveTo',[306.739,624.6000000000001,310.14599999999996,603.0670000000001,308.77099999999996,587.2880000000001]);
ctx.recodingOrder('bezierCurveTo',[308.77099999999996,587.2880000000001,313.811,579.0990000000002,316.76899999999995,575.1380000000001]);
ctx.recodingOrder('bezierCurveTo',[316.76899999999995,575.1380000000001,320.72799999999995,600.4640000000002,346.05999999999995,597.6530000000001]);
ctx.recodingOrder('bezierCurveTo',[346.05999999999995,597.6530000000001,365.31899999999996,595.2670000000002,362.85599999999994,571.7220000000001]);
ctx.recodingOrder('bezierCurveTo',[360.3929999999999,548.1770000000001,339.11099999999993,511.1580000000001,319.75299999999993,491.1690000000001]);
ctx.recodingOrder('bezierCurveTo',[319.75299999999993,491.1690000000001,317.7989999999999,496.5680000000001,311.42999999999995,501.0400000000001]);
ctx.recodingOrder('bezierCurveTo',[311.42999999999995,501.0400000000001,329.69899999999996,538.3650000000001,315.21299999999997,573.936]);
ctx.recodingOrder('bezierCurveTo',[315.21299999999997,573.936,302.34399999999994,612.058,250.37099999999998,612.616]);
ctx.recodingOrder('bezierCurveTo',[198.39800000000002,613.174,181.36399999999998,607.025,158.38199999999998,581.2669999999999]);
ctx.recodingOrder('bezierCurveTo',[158.38199999999998,581.2669999999999,135.19299999999998,555.64,159.629,501.57699999999994]);
ctx.recodingOrder('lineTo',[153.909,493.923]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E53D3A";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[165.94,651.34]);
ctx.recodingOrder('bezierCurveTo',[167.82399999999998,658.229,169.71699999999998,665.114,171.621,671.9970000000001]);
ctx.recodingOrder('bezierCurveTo',[169.011,672.331,167.287,675.2940000000001,167.717,677.8900000000001]);
ctx.recodingOrder('bezierCurveTo',[168.14700000000002,680.4860000000001,170.24800000000002,682.5620000000001,172.645,683.6480000000001]);
ctx.recodingOrder('bezierCurveTo',[175.042,684.7340000000002,177.721,684.9880000000002,180.345,685.1730000000001]);
ctx.recodingOrder('bezierCurveTo',[190.745,685.9060000000001,201.204,685.7760000000001,211.582,684.7850000000001]);
ctx.recodingOrder('bezierCurveTo',[215.285,684.431,219.166,683.8950000000001,222.142,681.6640000000001]);
ctx.recodingOrder('bezierCurveTo',[230.862,675.1260000000001,226.664,657.113,225.023,648.1740000000001]);
ctx.recodingOrder('bezierCurveTo',[225.023,648.1740000000001,216.507,654.873,192.50799999999998,653.133]);
ctx.recodingOrder('lineTo',[165.94,651.34]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E53D3A";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[246.555,651.31]);
ctx.recodingOrder('bezierCurveTo',[247.58700000000002,656.948,246.368,662.7339999999999,246.412,668.4649999999999]);
ctx.recodingOrder('bezierCurveTo',[246.45600000000002,674.1969999999999,248.25900000000001,680.5729999999999,253.276,683.3459999999999]);
ctx.recodingOrder('bezierCurveTo',[255.202,684.411,257.41200000000003,684.8279999999999,259.588,685.1639999999999]);
ctx.recodingOrder('bezierCurveTo',[272.064,687.0909999999999,284.875,686.8309999999999,297.26300000000003,684.3979999999999]);
ctx.recodingOrder('bezierCurveTo',[299.612,683.9369999999999,302.08000000000004,683.3259999999999,303.766,681.627]);
ctx.recodingOrder('bezierCurveTo',[306.644,678.7239999999999,305.608,673.0369999999999,301.891,671.3359999999999]);
ctx.recodingOrder('bezierCurveTo',[305.459,663.8929999999999,307.302,655.6289999999999,307.23400000000004,647.3749999999999]);
ctx.recodingOrder('bezierCurveTo',[307.232,647.375,288.823,651.31,246.555,651.31]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[134.881,605.328]);
ctx.recodingOrder('bezierCurveTo',[131.027,605.328,127.215,604.476,123.673,602.7479999999999]);
ctx.recodingOrder('bezierCurveTo',[118.413,600.188,114.694,595.4799999999999,112.913,589.1339999999999]);
ctx.recodingOrder('bezierCurveTo',[108.39699999999999,573.0329999999999,116.345,546.8439999999999,134.167,519.0779999999999]);
ctx.recodingOrder('bezierCurveTo',[142.052,506.79199999999986,148.291,497.11499999999984,153.275,489.55899999999986]);
ctx.recodingOrder('bezierCurveTo',[154.16,488.20999999999987,155.973,487.8319999999999,157.332,488.72599999999983]);
ctx.recodingOrder('bezierCurveTo',[158.68099999999998,489.61699999999985,159.051,491.43399999999986,158.16,492.78299999999984]);
ctx.recodingOrder('bezierCurveTo',[153.186,500.32399999999984,146.968,509.97999999999985,139.093,522.2449999999999]);
ctx.recodingOrder('bezierCurveTo',[122.16199999999999,548.6239999999999,114.47999999999999,573.0369999999999,118.55199999999999,587.5519999999999]);
ctx.recodingOrder('bezierCurveTo',[119.886,592.31,122.46799999999999,595.6499999999999,126.234,597.4839999999999]);
ctx.recodingOrder('bezierCurveTo',[133.18699999999998,600.872,141.535,599.862,148.55599999999998,594.781]);
ctx.recodingOrder('bezierCurveTo',[152.01399999999998,592.281,154.09199999999998,588.0759999999999,155.509,580.7139999999999]);
ctx.recodingOrder('bezierCurveTo',[155.81599999999997,579.1229999999999,157.368,578.084,158.93599999999998,578.3939999999999]);
ctx.recodingOrder('bezierCurveTo',[160.52399999999997,578.6989999999998,161.56599999999997,580.2349999999999,161.259,581.8239999999998]);
ctx.recodingOrder('bezierCurveTo',[160.113,587.7719999999998,158.02499999999998,595.1619999999998,151.99399999999997,599.5259999999998]);
ctx.recodingOrder('bezierCurveTo',[146.683,603.365,140.73,605.328,134.881,605.328]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[342.236,600.581]);
ctx.recodingOrder('bezierCurveTo',[336.74199999999996,600.581,331.11699999999996,598.904,325.961,595.5840000000001]);
ctx.recodingOrder('bezierCurveTo',[318.091,590.514,315.759,580.5770000000001,313.88300000000004,569.9730000000001]);
ctx.recodingOrder('bezierCurveTo',[313.60100000000006,568.379,314.66400000000004,566.8610000000001,316.25800000000004,566.5770000000001]);
ctx.recodingOrder('bezierCurveTo',[317.831,566.3190000000001,319.372,567.3580000000001,319.65400000000005,568.9520000000001]);
ctx.recodingOrder('bezierCurveTo',[321.62300000000005,580.1000000000001,323.80500000000006,587.2270000000001,329.13300000000004,590.6590000000001]);
ctx.recodingOrder('bezierCurveTo',[336.586,595.4610000000001,345.17400000000004,596.0340000000001,352.09600000000006,592.1770000000001]);
ctx.recodingOrder('bezierCurveTo',[355.85100000000006,590.0890000000002,358.31500000000005,586.5260000000002,359.41300000000007,581.5840000000002]);
ctx.recodingOrder('bezierCurveTo',[362.76200000000006,566.5410000000002,353.57500000000005,542.0550000000002,334.84100000000007,516.0900000000001]);
ctx.recodingOrder('bezierCurveTo',[327.84100000000007,506.39200000000017,322.02400000000006,498.35100000000017,317.1600000000001,491.71900000000016]);
ctx.recodingOrder('bezierCurveTo',[316.2070000000001,490.4150000000002,316.48800000000006,488.5810000000002,317.7950000000001,487.62600000000015]);
ctx.recodingOrder('bezierCurveTo',[319.0920000000001,486.67000000000013,320.9200000000001,486.95100000000014,321.8880000000001,488.25600000000014]);
ctx.recodingOrder('bezierCurveTo',[326.7530000000001,494.8990000000001,332.5800000000001,502.95000000000016,339.5900000000001,512.6640000000001]);
ctx.recodingOrder('bezierCurveTo',[359.2870000000001,539.9650000000001,368.8390000000001,566.2060000000001,365.1300000000001,582.8590000000002]);
ctx.recodingOrder('bezierCurveTo',[363.6720000000001,589.4110000000002,360.1510000000001,594.4030000000001,354.9430000000001,597.2990000000002]);
ctx.recodingOrder('bezierCurveTo',[351.001,599.492,346.663,600.581,342.236,600.581]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[306.743,627.53]);
ctx.recodingOrder('bezierCurveTo',[306.644,627.53,306.545,627.525,306.451,627.514]);
ctx.recodingOrder('bezierCurveTo',[304.84200000000004,627.355,303.66400000000004,625.92,303.821,624.311]);
ctx.recodingOrder('bezierCurveTo',[304.946,612.981,305.62300000000005,600.5070000000001,305.84200000000004,587.24]);
ctx.recodingOrder('bezierCurveTo',[305.86800000000005,585.638,307.17600000000004,584.3580000000001,308.76900000000006,584.3580000000001]);
ctx.recodingOrder('bezierCurveTo',[308.7850000000001,584.3580000000001,308.80100000000004,584.3580000000001,308.8160000000001,584.3580000000001]);
ctx.recodingOrder('bezierCurveTo',[310.4360000000001,584.3870000000001,311.7220000000001,585.7170000000001,311.6960000000001,587.3340000000001]);
ctx.recodingOrder('bezierCurveTo',[311.47800000000007,600.763,310.7900000000001,613.398,309.6540000000001,624.8900000000001]);
ctx.recodingOrder('bezierCurveTo',[309.503,626.4,308.227,627.53,306.743,627.53]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[250.371,633.433]);
ctx.recodingOrder('bezierCurveTo',[248.761,633.433,247.449,632.131,247.44400000000002,630.519]);
ctx.recodingOrder('bezierCurveTo',[247.43400000000003,628.605,247.39200000000002,626.738,247.293,624.939]);
ctx.recodingOrder('bezierCurveTo',[247.106,621.598,246.64700000000002,618.726,245.934,616.4]);
ctx.recodingOrder('bezierCurveTo',[245.46,614.8539999999999,246.32999999999998,613.215,247.877,612.742]);
ctx.recodingOrder('bezierCurveTo',[249.45000000000002,612.2579999999999,251.059,613.1379999999999,251.538,614.682]);
ctx.recodingOrder('bezierCurveTo',[252.387,617.461,252.929,620.801,253.137,624.611]);
ctx.recodingOrder('bezierCurveTo',[253.246,626.504,253.288,628.47,253.298,630.4879999999999]);
ctx.recodingOrder('bezierCurveTo',[253.308,632.1049999999999,252.006,633.4229999999999,250.386,633.433]);
ctx.recodingOrder('bezierCurveTo',[250.381,633.433,250.376,633.433,250.371,633.433]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[222.143,632.657]);
ctx.recodingOrder('bezierCurveTo',[220.523,632.657,219.216,631.345,219.216,629.7270000000001]);
ctx.recodingOrder('bezierCurveTo',[219.216,628.0740000000001,219.258,626.488,219.357,624.9900000000001]);
ctx.recodingOrder('bezierCurveTo',[219.633,620.7450000000001,220.128,617.3130000000001,220.873,614.4980000000002]);
ctx.recodingOrder('bezierCurveTo',[221.29,612.9410000000001,222.88299999999998,611.9900000000001,224.456,612.4200000000002]);
ctx.recodingOrder('bezierCurveTo',[226.024,612.8370000000002,226.951,614.4380000000002,226.539,616.0030000000002]);
ctx.recodingOrder('bezierCurveTo',[225.88799999999998,618.4430000000002,225.451,621.5080000000002,225.201,625.3700000000001]);
ctx.recodingOrder('bezierCurveTo',[225.112,626.7480000000002,225.071,628.2080000000001,225.071,629.7270000000001]);
ctx.recodingOrder('bezierCurveTo',[225.07,631.345,223.762,632.657,222.143,632.657]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="rgba(0,0,0,0)";
ctx.strokeStyle="#814139";
ctx.lineWidth=1.0984;
ctx.lineCap="round";
ctx.lineJoin="round";
ctx.miterLimit="10";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[174.613,680.414]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[165.75,631.412]);
ctx.recodingOrder('bezierCurveTo',[164.318,631.412,163.068,630.36,162.854,628.9010000000001]);
ctx.recodingOrder('bezierCurveTo',[161.068,616.576,159.89600000000002,602.9860000000001,159.365,588.5050000000001]);
ctx.recodingOrder('bezierCurveTo',[159.30800000000002,586.8880000000001,160.568,585.5310000000001,162.18300000000002,585.4710000000001]);
ctx.recodingOrder('bezierCurveTo',[163.71400000000003,585.4370000000001,165.15600000000003,586.6720000000001,165.22000000000003,588.2910000000002]);
ctx.recodingOrder('bezierCurveTo',[165.741,602.5610000000001,166.89700000000002,615.9430000000002,168.65800000000002,628.0620000000001]);
ctx.recodingOrder('bezierCurveTo',[168.88700000000003,629.6610000000002,167.77800000000002,631.1480000000001,166.179,631.3800000000001]);
ctx.recodingOrder('bezierCurveTo',[166.031,631.402,165.891,631.412,165.75,631.412]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[168.861,403.772]);
ctx.recodingOrder('bezierCurveTo',[162.00199999999998,405.92699999999996,154.703,407.08799999999997,147.13299999999998,407.08799999999997]);
ctx.recodingOrder('bezierCurveTo',[116.08099999999999,407.08799999999997,83.59999999999998,391.30499999999995,81.56599999999999,362.46]);
ctx.recodingOrder('bezierCurveTo',[77.94899999999998,311.181,106.27699999999999,274.58099999999996,106.27699999999999,274.58099999999996]);
ctx.recodingOrder('bezierCurveTo',[117.61299999999999,266.64599999999996,131.92499999999998,262.275,147.13299999999998,262.275]);
ctx.recodingOrder('bezierCurveTo',[187.123,262.275,219.53999999999996,294.69599999999997,219.53999999999996,334.68499999999995]);
ctx.recodingOrder('bezierCurveTo',[219.53999999999996,348.43999999999994,215.70399999999995,361.2989999999999,209.04299999999995,372.25199999999995]);
ctx.recodingOrder('bezierCurveTo',[209.04299999999995,372.25199999999995,187.06099999999995,364.20199999999994,177.06399999999996,374.1929999999999]);
ctx.recodingOrder('bezierCurveTo',[163.068,382.868,168.861,403.772,168.861,403.772]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[290.004,401.923]);
ctx.recodingOrder('bezierCurveTo',[298.32300000000004,405.255,307.404,407.088,316.913,407.088]);
ctx.recodingOrder('bezierCurveTo',[356.901,407.088,385.918,380.32000000000005,385.918,334.685]);
ctx.recodingOrder('bezierCurveTo',[385.918,324.549,381.661,315.37,378.543,306.855]);
ctx.recodingOrder('bezierCurveTo',[375.28000000000003,297.944,373.021,289.78700000000003,366.909,283.236]);
ctx.recodingOrder('bezierCurveTo',[354.628,270.07099999999997,337.179,262.275,316.912,262.275]);
ctx.recodingOrder('bezierCurveTo',[276.92199999999997,262.275,244.50699999999998,294.69599999999997,244.50699999999998,334.68499999999995]);
ctx.recodingOrder('bezierCurveTo',[244.50699999999998,347.48299999999995,247.82699999999997,359.50699999999995,253.65499999999997,369.93899999999996]);
ctx.recodingOrder('bezierCurveTo',[253.65499999999997,369.93899999999996,271.445,362.92299999999994,282.753,375.88699999999994]);
ctx.recodingOrder('bezierCurveTo',[294.061,388.851,290.004,401.923,290.004,401.923]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[181.98,332.816]);
ctx.recodingOrder('bezierCurveTo',[181.98,345.88899999999995,171.38299999999998,356.488,158.308,356.488]);
ctx.recodingOrder('bezierCurveTo',[145.23499999999999,356.488,134.63899999999998,345.888,134.63899999999998,332.816]);
ctx.recodingOrder('bezierCurveTo',[134.63899999999998,319.74199999999996,145.236,309.145,158.308,309.145]);
ctx.recodingOrder('bezierCurveTo',[171.383,309.145,181.98,319.741,181.98,332.816]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[333.881,332.816]);
ctx.recodingOrder('bezierCurveTo',[333.881,345.88899999999995,323.28,356.488,310.20599999999996,356.488]);
ctx.recodingOrder('bezierCurveTo',[297.13399999999996,356.488,286.537,345.888,286.537,332.816]);
ctx.recodingOrder('bezierCurveTo',[286.537,319.74199999999996,297.13399999999996,309.145,310.20599999999996,309.145]);
ctx.recodingOrder('bezierCurveTo',[323.28,309.145,333.881,319.741,333.881,332.816]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[230.336,438.893]);
ctx.recodingOrder('bezierCurveTo',[220.102,438.893,209.447,437.27599999999995,199.062,434.03599999999994]);
ctx.recodingOrder('lineTo',[199.062,434.03599999999994]);
ctx.recodingOrder('bezierCurveTo',[186.72400000000002,430.18699999999995,176.621,423.14099999999996,170.61,414.19599999999997]);
ctx.recodingOrder('bezierCurveTo',[164.991,405.83399999999995,162.959,395.077,165.30800000000002,386.12199999999996]);
ctx.recodingOrder('bezierCurveTo',[167.18800000000002,378.96899999999994,171.63000000000002,373.45099999999996,178.16200000000003,370.16399999999993]);
ctx.recodingOrder('bezierCurveTo',[187.78700000000003,365.3259999999999,200.33800000000002,365.6819999999999,210.93100000000004,371.10099999999994]);
ctx.recodingOrder('bezierCurveTo',[216.24800000000005,373.81699999999995,223.05000000000004,374.89199999999994,231.69500000000005,374.3539999999999]);
ctx.recodingOrder('bezierCurveTo',[236.84000000000006,374.0439999999999,241.75700000000006,372.2919999999999,246.95500000000004,370.43799999999993]);
ctx.recodingOrder('bezierCurveTo',[252.58000000000004,368.43299999999994,258.39700000000005,366.35999999999996,264.80300000000005,366.07899999999995]);
ctx.recodingOrder('bezierCurveTo',[275.17800000000005,365.62799999999993,284.87500000000006,371.16999999999996,289.75000000000006,380.58599999999996]);
ctx.recodingOrder('bezierCurveTo',[293.5930000000001,387.99999999999994,293.9580000000001,396.23699999999997,290.8070000000001,404.405]);
ctx.recodingOrder('bezierCurveTo',[285.3070000000001,418.667,270.4700000000001,429.76599999999996,259.00700000000006,434.044]);
ctx.recodingOrder('bezierCurveTo',[250.345,437.276,240.554,438.893,230.336,438.893]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[200.8,428.443]);
ctx.recodingOrder('bezierCurveTo',[220.357,434.539,240.824,434.58299999999997,256.954,428.555]);
ctx.recodingOrder('bezierCurveTo',[267.23,424.722,280.495,414.871,285.338,402.299]);
ctx.recodingOrder('bezierCurveTo',[287.906,395.64599999999996,287.64000000000004,389.245,284.552,383.279]);
ctx.recodingOrder('bezierCurveTo',[280.677,375.81,273.427,371.568,265.06300000000005,371.933]);
ctx.recodingOrder('bezierCurveTo',[259.53200000000004,372.173,254.38100000000006,374.01099999999997,248.92300000000006,375.956]);
ctx.recodingOrder('bezierCurveTo',[243.56400000000005,377.867,238.02200000000005,379.841,232.04900000000006,380.20300000000003]);
ctx.recodingOrder('bezierCurveTo',[222.30500000000006,380.78900000000004,214.53900000000007,379.523,208.26400000000007,376.31800000000004]);
ctx.recodingOrder('bezierCurveTo',[199.31100000000006,371.735,188.78000000000006,371.38300000000004,180.79700000000008,375.39900000000006]);
ctx.recodingOrder('bezierCurveTo',[175.80700000000007,377.90700000000004,172.4120000000001,382.12800000000004,170.97400000000007,387.61000000000007]);
ctx.recodingOrder('bezierCurveTo',[169.0420000000001,394.98800000000006,170.76600000000008,403.9220000000001,175.47400000000007,410.9320000000001]);
ctx.recodingOrder('bezierCurveTo',[180.739,418.772,189.738,424.993,200.8,428.443]);
ctx.recodingOrder('lineTo',[200.8,428.443]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[228.002,412.991]);
ctx.recodingOrder('bezierCurveTo',[215.28900000000002,412.991,203.097,409.027,194.62400000000002,402.205]);
ctx.recodingOrder('bezierCurveTo',[193.36400000000003,401.18899999999996,193.16500000000002,399.346,194.181,398.08799999999997]);
ctx.recodingOrder('bezierCurveTo',[195.197,396.83,197.04500000000002,396.635,198.30100000000002,397.643]);
ctx.recodingOrder('bezierCurveTo',[213.602,409.97299999999996,242.64300000000003,411.78499999999997,261.475,394.82]);
ctx.recodingOrder('bezierCurveTo',[262.673,393.739,264.53200000000004,393.83799999999997,265.61,395.036]);
ctx.recodingOrder('bezierCurveTo',[266.69300000000004,396.239,266.594,398.091,265.391,399.174]);
ctx.recodingOrder('bezierCurveTo',[254.72,408.788,241.09,412.991,228.002,412.991]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[233.939,615.549]);
ctx.recodingOrder('bezierCurveTo',[225.95,615.549,216.87199999999999,614.708,207.112,612.341]);
ctx.recodingOrder('bezierCurveTo',[205.54399999999998,611.961,204.575,610.378,204.956,608.8050000000001]);
ctx.recodingOrder('bezierCurveTo',[205.33599999999998,607.235,206.899,606.2370000000001,208.492,606.6490000000001]);
ctx.recodingOrder('bezierCurveTo',[239.97,614.2840000000001,263.698,605.2970000000001,264.687,604.9120000000001]);
ctx.recodingOrder('bezierCurveTo',[266.208,604.3210000000001,267.89,605.0760000000001,268.478,606.5810000000001]);
ctx.recodingOrder('bezierCurveTo',[269.06100000000004,608.0890000000002,268.317,609.7870000000001,266.807,610.3720000000002]);
ctx.recodingOrder('bezierCurveTo',[266.057,610.664,253.162,615.549,233.939,615.549]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[294.052,504.791]);
ctx.recodingOrder('bezierCurveTo',[299.666,503.331,305.461,501.677,311.43800000000005,499.812]);
ctx.recodingOrder('bezierCurveTo',[312.463,499.66700000000003,312.23300000000006,501.721,312.62200000000007,502.676]);
ctx.recodingOrder('bezierCurveTo',[317.01500000000004,513.4639999999999,320.31200000000007,524.771,321.44500000000005,536.395]);
ctx.recodingOrder('bezierCurveTo',[324.31700000000006,565.86,311.1530000000001,594.102,283.12700000000007,605.913]);
ctx.recodingOrder('bezierCurveTo',[270.69900000000007,611.1510000000001,257.1670000000001,613.64,243.73500000000007,614.246]);
ctx.recodingOrder('bezierCurveTo',[225.08500000000006,615.088,206.30700000000007,611.918,188.84500000000008,605.4069999999999]);
ctx.recodingOrder('bezierCurveTo',[157.2450000000001,593.6249999999999,144.98100000000008,563.1239999999999,150.80700000000007,531.4189999999999]);
ctx.recodingOrder('bezierCurveTo',[152.49400000000009,522.2399999999999,155.33700000000007,513.3069999999999,158.85400000000007,504.67199999999985]);
ctx.recodingOrder('bezierCurveTo',[159.27600000000007,503.63599999999985,159.70800000000008,502.60299999999984,160.14900000000006,501.5749999999999]);
ctx.recodingOrder('bezierCurveTo',[160.14900000000006,501.5749999999999,191.87400000000005,521.0909999999999,257.51300000000003,512.1089999999999]);
ctx.recodingOrder('lineTo',[262.36100000000005,577.5709999999999]);
ctx.recodingOrder('lineTo',[300.987,566.4929999999999]);
ctx.recodingOrder('lineTo',[294.052,504.791]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[237.382,617.304]);
ctx.recodingOrder('bezierCurveTo',[220.648,617.304,203.45600000000002,614.174,187.306,608.151]);
ctx.recodingOrder('bezierCurveTo',[156.55200000000002,596.6859999999999,140.892,566.3589999999999,147.412,530.8889999999999]);
ctx.recodingOrder('bezierCurveTo',[149.18800000000002,521.1969999999999,152.303,511.2309999999999,156.93800000000002,500.4249999999999]);
ctx.recodingOrder('bezierCurveTo',[157.579,498.9379999999999,159.29700000000003,498.2559999999999,160.787,498.8859999999999]);
ctx.recodingOrder('bezierCurveTo',[162.27100000000002,499.5239999999999,162.959,501.2449999999999,162.323,502.7319999999999]);
ctx.recodingOrder('bezierCurveTo',[157.865,513.1329999999999,154.87,522.6899999999999,153.173,531.9469999999999]);
ctx.recodingOrder('bezierCurveTo',[147.1,564.9819999999999,160.964,592.0789999999998,189.348,602.6619999999999]);
ctx.recodingOrder('bezierCurveTo',[206.702,609.131,225.24200000000002,612.122,243.09,611.3179999999999]);
ctx.recodingOrder('bezierCurveTo',[257.324,610.6749999999998,270.24,607.9479999999999,281.474,603.2139999999998]);
ctx.recodingOrder('bezierCurveTo',[306.962,592.4699999999998,320.967,566.9759999999999,318.014,536.6779999999999]);
ctx.recodingOrder('bezierCurveTo',[316.957,525.8399999999999,313.921,514.5539999999999,308.728,502.1749999999999]);
ctx.recodingOrder('bezierCurveTo',[308.103,500.6829999999999,308.806,498.96699999999987,310.301,498.34199999999987]);
ctx.recodingOrder('bezierCurveTo',[311.78,497.71699999999987,313.50399999999996,498.41499999999985,314.134,499.90999999999985]);
ctx.recodingOrder('bezierCurveTo',[319.55,512.8389999999998,322.72700000000003,524.6789999999999,323.84700000000004,536.1119999999999]);
ctx.recodingOrder('bezierCurveTo',[327.00300000000004,568.5589999999999,311.264,597.0149999999999,283.74500000000006,608.6109999999999]);
ctx.recodingOrder('bezierCurveTo',[271.8760000000001,613.6189999999999,258.2830000000001,616.4989999999999,243.35100000000006,617.1729999999999]);
ctx.recodingOrder('bezierCurveTo',[241.371,617.26,239.382,617.304,237.382,617.304]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[224.002,516.853]);
ctx.recodingOrder('bezierCurveTo',[211.11700000000002,516.853,198.258,515.8399999999999,185.655,513.8299999999999]);
ctx.recodingOrder('bezierCurveTo',[179.14000000000001,512.7879999999999,172.244,511.3949999999999,166.015,508.2989999999999]);
ctx.recodingOrder('bezierCurveTo',[155.47299999999998,503.06299999999993,149.83399999999997,492.12799999999993,151.974,481.0919999999999]);
ctx.recodingOrder('bezierCurveTo',[152.28099999999998,479.49799999999993,153.85399999999998,478.47799999999995,155.40599999999998,478.77399999999994]);
ctx.recodingOrder('bezierCurveTo',[156.99399999999997,479.08099999999996,158.03099999999998,480.61799999999994,157.724,482.20599999999996]);
ctx.recodingOrder('bezierCurveTo',[156.094,490.62499999999994,160.474,499.00199999999995,168.619,503.054]);
ctx.recodingOrder('bezierCurveTo',[174.15,505.801,180.52,507.075,186.582,508.044]);
ctx.recodingOrder('bezierCurveTo',[201.67,510.453,217.143,511.393,232.57999999999998,510.84299999999996]);
ctx.recodingOrder('bezierCurveTo',[250.188,510.21299999999997,266.938,508.52299999999997,283.77599999999995,505.676]);
ctx.recodingOrder('bezierCurveTo',[300.83799999999997,502.788,312.51899999999995,497.525,315.8109999999999,491.236]);
ctx.recodingOrder('bezierCurveTo',[317.2539999999999,488.486,317.1549999999999,485.442,315.5139999999999,481.932]);
ctx.recodingOrder('bezierCurveTo',[314.8269999999999,480.466,315.4569999999999,478.724,316.9249999999999,478.036]);
ctx.recodingOrder('bezierCurveTo',[318.3839999999999,477.356,320.1329999999999,477.981,320.8149999999999,479.447]);
ctx.recodingOrder('bezierCurveTo',[323.2519999999999,484.65500000000003,323.3149999999999,489.535,321.0029999999999,493.954]);
ctx.recodingOrder('bezierCurveTo',[315.60199999999986,504.258,298.30599999999987,509.156,284.7549999999999,511.451]);
ctx.recodingOrder('bezierCurveTo',[267.65699999999987,514.339,250.65799999999987,516.0550000000001,232.78899999999987,516.695]);
ctx.recodingOrder('bezierCurveTo',[229.861,516.801,226.929,516.853,224.002,516.853]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[262.36,580.498]);
ctx.recodingOrder('bezierCurveTo',[261.709,580.498,261.074,580.279,260.553,579.873]);
ctx.recodingOrder('bezierCurveTo',[259.907,579.368,259.501,578.613,259.438,577.793]);
ctx.recodingOrder('lineTo',[254.595,514.819]);
ctx.recodingOrder('bezierCurveTo',[254.47,513.207,255.679,511.79799999999994,257.293,511.676]);
ctx.recodingOrder('bezierCurveTo',[258.87600000000003,511.561,260.314,512.757,260.439,514.371]);
ctx.recodingOrder('lineTo',[265.03200000000004,574.139]);
ctx.recodingOrder('bezierCurveTo',[275.646,572.259,284.66100000000006,570.022,292.52500000000003,567.319]);
ctx.recodingOrder('bezierCurveTo',[294.504,566.6419999999999,296.415,565.9409999999999,298.05100000000004,564.9549999999999]);
ctx.recodingOrder('bezierCurveTo',[297.91,550.8019999999999,295.88400000000007,536.722,293.92600000000004,523.0919999999999]);
ctx.recodingOrder('bezierCurveTo',[293.22800000000007,518.2749999999999,292.54600000000005,513.5109999999999,291.95200000000006,508.8219999999999]);
ctx.recodingOrder('bezierCurveTo',[291.7490000000001,507.2179999999999,292.88400000000007,505.7519999999999,294.49300000000005,505.54899999999986]);
ctx.recodingOrder('bezierCurveTo',[295.97800000000007,505.32999999999987,297.56100000000004,506.4809999999999,297.76400000000007,508.08799999999985]);
ctx.recodingOrder('bezierCurveTo',[298.35300000000007,512.7469999999998,299.03400000000005,517.4729999999998,299.7220000000001,522.2559999999999]);
ctx.recodingOrder('bezierCurveTo',[301.7840000000001,536.5859999999999,303.9140000000001,551.3999999999999,303.9140000000001,566.4909999999999]);
ctx.recodingOrder('bezierCurveTo',[303.9140000000001,567.3999999999999,303.4920000000001,568.2559999999999,302.7730000000001,568.8109999999999]);
ctx.recodingOrder('bezierCurveTo',[300.22100000000006,570.78,297.2530000000001,571.8919999999999,294.43000000000006,572.8599999999999]);
ctx.recodingOrder('bezierCurveTo',[285.48800000000006,575.93,275.1550000000001,578.4169999999999,262.8380000000001,580.4579999999999]);
ctx.recodingOrder('bezierCurveTo',[262.677,580.485,262.521,580.498,262.36,580.498]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[263.761,588.313]);
ctx.recodingOrder('bezierCurveTo',[263.68300000000005,588.313,263.61,588.311,263.53200000000004,588.303]);
ctx.recodingOrder('bezierCurveTo',[261.92300000000006,588.18,260.71400000000006,586.775,260.83400000000006,585.163]);
ctx.recodingOrder('bezierCurveTo',[260.9750000000001,583.345,260.81800000000004,581.5310000000001,260.37600000000003,579.77]);
ctx.recodingOrder('bezierCurveTo',[259.98,578.202,260.92800000000005,576.611,262.49600000000004,576.215]);
ctx.recodingOrder('bezierCurveTo',[264.1,575.798,265.658,576.769,266.05300000000005,578.337]);
ctx.recodingOrder('bezierCurveTo',[266.65200000000004,580.709,266.86500000000007,583.157,266.67800000000005,585.605]);
ctx.recodingOrder('bezierCurveTo',[266.558,587.144,265.276,588.313,263.761,588.313]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[273.078,588.31]);
ctx.recodingOrder('bezierCurveTo',[271.55699999999996,588.31,270.27099999999996,587.1329999999999,270.162,585.5889999999999]);
ctx.recodingOrder('lineTo',[269.573,577.2979999999999]);
ctx.recodingOrder('bezierCurveTo',[269.45799999999997,575.6859999999999,270.67199999999997,574.2849999999999,272.286,574.1679999999999]);
ctx.recodingOrder('bezierCurveTo',[273.76,574.0299999999999,275.301,575.2639999999999,275.416,576.8809999999999]);
ctx.recodingOrder('lineTo',[276.005,585.1719999999999]);
ctx.recodingOrder('bezierCurveTo',[276.12,586.7839999999999,274.906,588.185,273.292,588.3019999999999]);
ctx.recodingOrder('bezierCurveTo',[273.224,588.308,273.151,588.31,273.078,588.31]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[282.437,586.329]);
ctx.recodingOrder('bezierCurveTo',[281.135,586.329,279.94800000000004,585.457,279.604,584.1389999999999]);
ctx.recodingOrder('bezierCurveTo',[278.87,581.3319999999999,278.536,578.4389999999999,278.614,575.5379999999999]);
ctx.recodingOrder('bezierCurveTo',[278.65599999999995,573.9209999999999,279.86899999999997,572.4729999999998,281.61899999999997,572.6859999999999]);
ctx.recodingOrder('bezierCurveTo',[283.23299999999995,572.728,284.50899999999996,574.0709999999999,284.46799999999996,575.689]);
ctx.recodingOrder('bezierCurveTo',[284.40599999999995,578.0409999999999,284.67699999999996,580.387,285.27,582.66]);
ctx.recodingOrder('bezierCurveTo',[285.681,584.225,284.739,585.826,283.176,586.233]);
ctx.recodingOrder('bezierCurveTo',[282.927,586.297,282.681,586.329,282.437,586.329]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[291.488,583.461]);
ctx.recodingOrder('bezierCurveTo',[290.238,583.461,289.082,582.6560000000001,288.691,581.4010000000001]);
ctx.recodingOrder('bezierCurveTo',[287.722,578.297,287.48199999999997,574.9480000000001,287.988,571.714]);
ctx.recodingOrder('bezierCurveTo',[288.238,570.115,289.754,569.024,291.337,569.277]);
ctx.recodingOrder('bezierCurveTo',[292.936,569.527,294.03,571.027,293.78,572.6260000000001]);
ctx.recodingOrder('bezierCurveTo',[293.40999999999997,574.9750000000001,293.582,577.4100000000001,294.28499999999997,579.662]);
ctx.recodingOrder('bezierCurveTo',[294.76399999999995,581.206,293.905,582.847,292.35799999999995,583.3280000000001]);
ctx.recodingOrder('bezierCurveTo',[292.072,583.42,291.775,583.461,291.488,583.461]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[301.129,578.066]);
ctx.recodingOrder('bezierCurveTo',[299.535,578.066,298.228,576.7900000000001,298.202,575.191]);
ctx.recodingOrder('lineTo',[298.072,568.361]);
ctx.recodingOrder('bezierCurveTo',[298.04,566.744,299.327,565.408,300.947,565.377]);
ctx.recodingOrder('bezierCurveTo',[302.708,565.5409999999999,303.9,566.637,303.926,568.252]);
ctx.recodingOrder('lineTo',[304.056,575.082]);
ctx.recodingOrder('bezierCurveTo',[304.08799999999997,576.699,302.801,578.035,301.181,578.066]);
ctx.recodingOrder('bezierCurveTo',[301.165,578.066,301.144,578.066,301.129,578.066]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#210304";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[234.891,546.489]);
ctx.recodingOrder('bezierCurveTo',[237.88,546.678,240.947,545.339,242.761,542.956]);
ctx.recodingOrder('bezierCurveTo',[244.575,540.573,245.04,537.203,243.846,534.455]);
ctx.recodingOrder('bezierCurveTo',[241.852,529.863,235.138,528.202,231.233,531.3330000000001]);
ctx.recodingOrder('bezierCurveTo',[229.748,532.5240000000001,228.717,534.2090000000001,228.062,535.9970000000001]);
ctx.recodingOrder('bezierCurveTo',[227.591,537.282,227.3,538.6600000000001,227.449,540.0200000000001]);
ctx.recodingOrder('bezierCurveTo',[227.838,543.571,231.327,546.263,234.891,546.489]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#210304";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[231.028,578.334]);
ctx.recodingOrder('bezierCurveTo',[232.19799999999998,579.4209999999999,233.72,580.058,235.266,580.457]);
ctx.recodingOrder('bezierCurveTo',[238.173,581.207,241.51999999999998,581.09,243.857,579.205]);
ctx.recodingOrder('bezierCurveTo',[245.223,578.1030000000001,246.121,576.481,246.506,574.769]);
ctx.recodingOrder('bezierCurveTo',[247.729,569.347,242.998,563.3820000000001,237.441,563.454]);
ctx.recodingOrder('bezierCurveTo',[231.88400000000001,563.526,227.297,569.766,228.996,575.0569999999999]);
ctx.recodingOrder('bezierCurveTo',[229.394,576.294,230.076,577.45,231.028,578.334]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[199.98,652.673]);
ctx.recodingOrder('bezierCurveTo',[208.064,652.505,219.542,652.413,225.547,647.706]);
ctx.recodingOrder('bezierCurveTo',[232.286,642.423,228.78,630.572,219.727,631.423]);
ctx.recodingOrder('bezierCurveTo',[202.75300000000001,633.019,185.574,632.166,168.78,629.231]);
ctx.recodingOrder('bezierCurveTo',[167.362,628.983,166.078,628.8919999999999,164.926,628.935]);
ctx.recodingOrder('bezierCurveTo',[166.82199999999997,635.0889999999999,165.86499999999998,639.5889999999999,158.486,642.303]);
ctx.recodingOrder('bezierCurveTo',[160.15099999999998,645.216,163.02499999999998,647.813,166.896,649.105]);
ctx.recodingOrder('bezierCurveTo',[176.72899999999998,652.3870000000001,187.338,653.058,197.634,652.731]);
ctx.recodingOrder('bezierCurveTo',[198.374,652.708,199.159,652.69,199.98,652.673]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[311.823,641.591]);
ctx.recodingOrder('bezierCurveTo',[309.474,644.742,305.505,646.169,301.72499999999997,647.247]);
ctx.recodingOrder('bezierCurveTo',[287.909,651.185,273.397,652.6659999999999,259.06999999999994,651.5989999999999]);
ctx.recodingOrder('bezierCurveTo',[253.60399999999993,651.1919999999999,247.43799999999993,649.9689999999999,244.57199999999995,645.2969999999999]);
ctx.recodingOrder('bezierCurveTo',[242.05299999999994,641.1899999999999,243.41399999999996,635.1819999999999,247.45799999999994,632.5619999999999]);
ctx.recodingOrder('bezierCurveTo',[249.73599999999993,631.0859999999999,249.70499999999993,631.3219999999999,252.41899999999995,631.2949999999998]);
ctx.recodingOrder('bezierCurveTo',[267.96,631.1399999999999,283.48799999999994,629.6559999999998,298.77799999999996,626.8639999999998]);
ctx.recodingOrder('bezierCurveTo',[301.40799999999996,626.3829999999998,304.08199999999994,625.8629999999998,306.736,626.1789999999999]);
ctx.recodingOrder('bezierCurveTo',[308.447,626.3829999999998,310.171,626.9989999999999,311.521,628.0399999999998]);
ctx.recodingOrder('bezierCurveTo',[312.26500000000004,628.6149999999999,308.94,631.1719999999998,308.94,635.7279999999998]);
ctx.recodingOrder('bezierCurveTo',[308.941,637.173,309.531,638.74,311.823,641.591]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[193.478,655.734]);
ctx.recodingOrder('bezierCurveTo',[182.89000000000001,655.734,174.18200000000002,654.489,166.37,651.883]);
ctx.recodingOrder('bezierCurveTo',[165.755,651.6800000000001,165.157,651.443,164.584,651.1850000000001]);
ctx.recodingOrder('bezierCurveTo',[163.157,650.5390000000001,161.839,649.729,160.64600000000002,648.7710000000001]);
ctx.recodingOrder('bezierCurveTo',[159.38600000000002,647.758,159.187,645.9150000000001,160.203,644.6540000000001]);
ctx.recodingOrder('bezierCurveTo',[161.224,643.3940000000001,163.067,643.2030000000001,164.323,644.2090000000001]);
ctx.recodingOrder('bezierCurveTo',[165.131,644.8580000000001,166.026,645.407,166.984,645.8420000000001]);
ctx.recodingOrder('bezierCurveTo',[167.375,646.017,167.786,646.1810000000002,168.21900000000002,646.3240000000001]);
ctx.recodingOrder('bezierCurveTo',[176.47400000000002,649.0820000000001,185.937,650.1700000000001,197.94100000000003,649.806]);
ctx.recodingOrder('lineTo',[201.04500000000004,649.73]);
ctx.recodingOrder('bezierCurveTo',[208.65400000000005,649.576,219.08100000000005,649.368,224.13700000000006,645.402]);
ctx.recodingOrder('bezierCurveTo',[226.73100000000005,643.368,226.96000000000006,640.124,226.03800000000007,637.812]);
ctx.recodingOrder('bezierCurveTo',[225.58000000000007,636.6510000000001,224.11600000000007,633.995,220.40300000000008,634.341]);
ctx.recodingOrder('bezierCurveTo',[203.57500000000007,635.917,186.17600000000007,635.174,168.67100000000008,632.117]);
ctx.recodingOrder('bezierCurveTo',[167.41600000000008,631.899,166.26000000000008,631.823,165.22900000000007,631.872]);
ctx.recodingOrder('bezierCurveTo',[163.59900000000007,631.942,162.22900000000007,630.721,162.14600000000007,629.1089999999999]);
ctx.recodingOrder('bezierCurveTo',[162.05200000000008,627.4949999999999,163.29100000000008,626.112,164.90600000000006,626.0229999999999]);
ctx.recodingOrder('bezierCurveTo',[166.35900000000007,625.9369999999999,167.97900000000007,626.0519999999999,169.67700000000005,626.3459999999999]);
ctx.recodingOrder('bezierCurveTo',[186.66600000000005,629.3149999999999,203.56100000000004,630.0439999999999,219.85200000000003,628.5069999999998]);
ctx.recodingOrder('bezierCurveTo',[225.08600000000004,628.0359999999998,229.53400000000002,630.7459999999999,231.48100000000002,635.6419999999998]);
ctx.recodingOrder('bezierCurveTo',[233.55900000000003,640.8579999999998,232.06400000000002,646.6309999999999,227.752,650.0109999999999]);
ctx.recodingOrder('bezierCurveTo',[221.15300000000002,655.1849999999998,209.596,655.4169999999998,201.16000000000003,655.5859999999999]);
ctx.recodingOrder('lineTo',[198.12900000000002,655.6589999999999]);
ctx.recodingOrder('bezierCurveTo',[196.54,655.708,194.988,655.734,193.478,655.734]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[267.635,654.867]);
ctx.recodingOrder('bezierCurveTo',[264.521,654.867,261.401,654.752,258.276,654.521]);
ctx.recodingOrder('bezierCurveTo',[252.854,654.1179999999999,245.214,652.88,241.501,646.8309999999999]);
ctx.recodingOrder('bezierCurveTo',[238.168,641.3889999999999,239.939,633.5709999999999,245.292,630.103]);
ctx.recodingOrder('bezierCurveTo',[247.74,628.52,248.552,628.3679999999999,250.885,628.3679999999999]);
ctx.recodingOrder('lineTo',[251.81699999999998,628.366]);
ctx.recodingOrder('bezierCurveTo',[267.15999999999997,628.212,282.58599999999996,626.7379999999999,297.674,623.983]);
ctx.recodingOrder('bezierCurveTo',[300.7,623.428,303.518,622.915,306.507,623.2689999999999]);
ctx.recodingOrder('bezierCurveTo',[308.371,623.4929999999999,310.147,624.0869999999999,311.652,624.9849999999999]);
ctx.recodingOrder('bezierCurveTo',[313.037,625.8129999999999,313.49,627.6129999999999,312.662,628.9999999999999]);
ctx.recodingOrder('bezierCurveTo',[311.828,630.3849999999999,310.042,630.8409999999999,308.64099999999996,630.0099999999999]);
ctx.recodingOrder('bezierCurveTo',[307.85499999999996,629.5389999999999,306.849,629.2079999999999,305.813,629.0849999999999]);
ctx.recodingOrder('bezierCurveTo',[303.703,628.8269999999999,301.433,629.2439999999999,299.027,629.6859999999999]);
ctx.recodingOrder('bezierCurveTo',[283.315,632.5559999999999,267.549,634.0629999999999,251.873,634.2219999999999]);
ctx.recodingOrder('lineTo',[250.857,634.2219999999999]);
ctx.recodingOrder('bezierCurveTo',[249.701,634.1929999999999,249.706,634.2199999999999,248.477,635.0159999999998]);
ctx.recodingOrder('bezierCurveTo',[245.774,636.7659999999998,244.811,641.0179999999998,246.492,643.7649999999999]);
ctx.recodingOrder('bezierCurveTo',[248.24699999999999,646.6239999999999,252.13299999999998,648.1869999999999,258.71,648.6739999999999]);
ctx.recodingOrder('bezierCurveTo',[272.777,649.7179999999998,286.787,648.2909999999998,300.34299999999996,644.4269999999999]);
ctx.recodingOrder('bezierCurveTo',[303.57699999999994,643.5049999999999,306.82199999999995,642.3489999999999,308.66599999999994,640.1359999999999]);
ctx.recodingOrder('bezierCurveTo',[309.69699999999995,638.8909999999998,311.55099999999993,638.7219999999999,312.79099999999994,639.7559999999999]);
ctx.recodingOrder('bezierCurveTo',[314.03099999999995,640.7899999999998,314.20199999999994,642.6379999999998,313.16599999999994,643.8809999999999]);
ctx.recodingOrder('bezierCurveTo',[310.31199999999995,647.3189999999998,306.08799999999997,648.8829999999998,301.9479999999999,650.0629999999999]);
ctx.recodingOrder('bezierCurveTo',[290.739,653.26,279.234,654.867,267.635,654.867]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[193.634,689.694]);
ctx.recodingOrder('bezierCurveTo',[189.124,689.694,184.56099999999998,689.54,179.962,689.228]);
ctx.recodingOrder('bezierCurveTo',[177.35299999999998,689.053,173.98299999999998,688.6809999999999,171.051,687.356]);
ctx.recodingOrder('bezierCurveTo',[167.546,685.77,165.208,682.908,164.64,679.505]);
ctx.recodingOrder('bezierCurveTo',[164.28599999999997,677.331,164.874,674.958,166.22299999999998,673.151]);
ctx.recodingOrder('bezierCurveTo',[166.72299999999998,672.4789999999999,167.307,671.909,167.94699999999997,671.453]);
ctx.recodingOrder('bezierCurveTo',[167.18099999999998,668.5649999999999,166.42099999999996,665.4979999999999,165.66099999999997,662.435]);
ctx.recodingOrder('bezierCurveTo',[164.74999999999997,658.7629999999999,163.83799999999997,655.102,162.93199999999996,651.7819999999999]);
ctx.recodingOrder('bezierCurveTo',[162.50499999999997,650.222,163.42199999999997,648.6099999999999,164.98399999999995,648.1829999999999]);
ctx.recodingOrder('bezierCurveTo',[166.52599999999995,647.7559999999999,168.15599999999995,648.6729999999999,168.57799999999995,650.2349999999999]);
ctx.recodingOrder('bezierCurveTo',[169.49999999999994,653.5969999999999,170.42199999999994,657.305,171.34299999999993,661.0229999999999]);
ctx.recodingOrder('bezierCurveTo',[172.31199999999993,664.9189999999999,173.28599999999994,668.8269999999999,174.25899999999993,672.348]);
ctx.recodingOrder('bezierCurveTo',[174.48799999999994,673.1659999999999,174.34799999999993,674.043,173.87399999999994,674.752]);
ctx.recodingOrder('bezierCurveTo',[173.40499999999994,675.458,172.64999999999995,675.9269999999999,171.80599999999993,676.036]);
ctx.recodingOrder('bezierCurveTo',[171.39499999999992,676.088,171.07199999999992,676.443,170.92099999999994,676.651]);
ctx.recodingOrder('bezierCurveTo',[170.51499999999993,677.193,170.32199999999995,677.9369999999999,170.42099999999994,678.5469999999999]);
ctx.recodingOrder('bezierCurveTo',[170.75999999999993,680.5909999999999,172.66599999999994,681.656,173.46799999999993,682.0179999999999]);
ctx.recodingOrder('bezierCurveTo',[175.54099999999994,682.958,178.23899999999992,683.242,180.35799999999992,683.3849999999999]);
ctx.recodingOrder('bezierCurveTo',[190.88399999999993,684.0959999999999,201.2369999999999,683.9629999999999,211.1119999999999,683.0049999999999]);
ctx.recodingOrder('bezierCurveTo',[214.55999999999992,682.6659999999998,217.84599999999992,682.2189999999999,220.1949999999999,680.4529999999999]);
ctx.recodingOrder('bezierCurveTo',[227.00699999999992,675.3519999999999,224.59599999999992,662.4619999999999,223.0019999999999,653.9329999999999]);
ctx.recodingOrder('lineTo',[222.7309999999999,652.4639999999998]);
ctx.recodingOrder('bezierCurveTo',[222.4389999999999,650.8729999999998,223.4909999999999,649.3469999999999,225.0799999999999,649.0549999999998]);
ctx.recodingOrder('bezierCurveTo',[226.7049999999999,648.7689999999999,228.1999999999999,649.8149999999998,228.4909999999999,651.4069999999998]);
ctx.recodingOrder('lineTo',[228.7619999999999,652.8579999999998]);
ctx.recodingOrder('bezierCurveTo',[230.5069999999999,662.2069999999999,233.43399999999988,677.8569999999999,223.7099999999999,685.1399999999999]);
ctx.recodingOrder('bezierCurveTo',[220.1529999999999,687.8119999999999,215.8199999999999,688.4289999999999,211.6849999999999,688.8329999999999]);
ctx.recodingOrder('bezierCurveTo',[205.805,689.407,199.769,689.694,193.634,689.694]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[276.255,689.376]);
ctx.recodingOrder('bezierCurveTo',[270.54699999999997,689.376,264.828,688.939,259.141,688.0609999999999]);
ctx.recodingOrder('bezierCurveTo',[256.865,687.7099999999999,254.235,687.223,251.86,685.91]);
ctx.recodingOrder('bezierCurveTo',[246.60500000000002,683.004,243.548,676.655,243.48600000000002,668.4889999999999]);
ctx.recodingOrder('bezierCurveTo',[243.47000000000003,666.3509999999999,243.621,664.2049999999999,243.77200000000002,662.0649999999999]);
ctx.recodingOrder('bezierCurveTo',[244.02700000000002,658.4739999999999,244.27200000000002,655.084,243.67800000000003,651.837]);
ctx.recodingOrder('bezierCurveTo',[243.38600000000002,650.246,244.43800000000002,648.72,246.03200000000004,648.431]);
ctx.recodingOrder('bezierCurveTo',[247.58900000000003,648.1260000000001,249.15200000000004,649.1890000000001,249.43800000000005,650.7850000000001]);
ctx.recodingOrder('bezierCurveTo',[250.16700000000006,654.7610000000001,249.88600000000005,658.686,249.61500000000004,662.4820000000001]);
ctx.recodingOrder('bezierCurveTo',[249.46900000000005,664.4710000000001,249.32900000000004,666.4610000000001,249.33900000000003,668.445]);
ctx.recodingOrder('bezierCurveTo',[249.36,670.653,249.79700000000003,678.077,254.69300000000004,680.7850000000001]);
ctx.recodingOrder('bezierCurveTo',[256.22400000000005,681.6310000000001,258.172,681.9830000000001,260.03600000000006,682.2700000000001]);
ctx.recodingOrder('bezierCurveTo',[272.2440000000001,684.1560000000001,284.57700000000006,683.9080000000001,296.7010000000001,681.5250000000001]);
ctx.recodingOrder('bezierCurveTo',[298.6120000000001,681.1500000000001,300.5710000000001,680.6920000000001,301.68500000000006,679.5670000000001]);
ctx.recodingOrder('bezierCurveTo',[302.35200000000003,678.8920000000002,302.63300000000004,677.7390000000001,302.41900000000004,676.5570000000001]);
ctx.recodingOrder('bezierCurveTo',[302.20500000000004,675.3750000000001,301.53400000000005,674.3960000000002,300.66900000000004,674.0020000000002]);
ctx.recodingOrder('bezierCurveTo',[299.237,673.3460000000002,298.581,671.6740000000002,299.18000000000006,670.2160000000002]);
ctx.recodingOrder('bezierCurveTo',[301.05500000000006,665.6950000000003,302.9770000000001,659.7610000000002,304.32000000000005,647.0690000000002]);
ctx.recodingOrder('bezierCurveTo',[304.487,645.4570000000002,305.96600000000007,644.2570000000002,307.53900000000004,644.4650000000001]);
ctx.recodingOrder('bezierCurveTo',[309.14900000000006,644.6340000000001,310.31500000000005,646.0770000000001,310.14300000000003,647.6840000000002]);
ctx.recodingOrder('bezierCurveTo',[308.91900000000004,659.2360000000002,307.206,665.5970000000002,305.451,670.2870000000001]);
ctx.recodingOrder('bezierCurveTo',[306.836,671.6280000000002,307.805,673.4510000000001,308.18,675.5080000000002]);
ctx.recodingOrder('bezierCurveTo',[308.742,678.5910000000001,307.868,681.6510000000002,305.842,683.6920000000001]);
ctx.recodingOrder('bezierCurveTo',[303.561,685.9940000000001,300.50899999999996,686.7490000000001,297.827,687.2750000000001]);
ctx.recodingOrder('bezierCurveTo',[290.686,688.675,283.473,689.376,276.255,689.376]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[236.361,491.464]);
ctx.recodingOrder('bezierCurveTo',[220.737,491.464,204.51399999999998,490.508,187.218,488.636]);
ctx.recodingOrder('bezierCurveTo',[155.944,485.24800000000005,115.63799999999999,478.423,81.28099999999999,455.54400000000004]);
ctx.recodingOrder('bezierCurveTo',[53.62599999999999,437.12300000000005,32.27799999999999,410.187,21.17499999999999,379.696]);
ctx.recodingOrder('bezierCurveTo',[9.37299999999999,347.31500000000005,6.5459999999999905,309.494,12.99299999999999,270.321]);
ctx.recodingOrder('bezierCurveTo',[20.59699999999999,224.12000000000003,41.08499999999999,184.95800000000003,75.61999999999999,150.59300000000002]);
ctx.recodingOrder('bezierCurveTo',[118.69099999999999,107.74100000000001,177.303,95.62200000000001,218.894,93.00200000000001]);
ctx.recodingOrder('bezierCurveTo',[220.524,92.864,221.894,94.12400000000001,221.99800000000002,95.739]);
ctx.recodingOrder('bezierCurveTo',[222.10200000000003,97.354,220.87300000000002,98.744,219.25900000000001,98.848]);
ctx.recodingOrder('bezierCurveTo',[178.678,101.405,121.52900000000001,113.178,79.75600000000003,154.744]);
ctx.recodingOrder('bezierCurveTo',[46.117000000000026,188.211,26.175000000000026,226.329,18.775000000000027,271.275]);
ctx.recodingOrder('bezierCurveTo',[12.489000000000027,309.45599999999996,15.223000000000027,346.253,26.676000000000027,377.692]);
ctx.recodingOrder('bezierCurveTo',[37.358000000000025,407.019,57.904000000000025,432.937,84.53300000000003,450.67]);
ctx.recodingOrder('bezierCurveTo',[117.63500000000002,472.716,155.33700000000005,479.291,187.85600000000002,482.814]);
ctx.recodingOrder('bezierCurveTo',[242.978,488.79,287.14300000000003,485.293,335.5,471.127]);
ctx.recodingOrder('bezierCurveTo',[357.062,464.807,390.091,447.553,408.825,428.02]);
ctx.recodingOrder('bezierCurveTo',[449.901,385.18899999999996,463.604,318.11699999999996,445.48,248.60399999999998]);
ctx.recodingOrder('bezierCurveTo',[444.084,243.266,409.82000000000005,117.689,274.525,100.29399999999998]);
ctx.recodingOrder('bezierCurveTo',[272.921,100.08599999999998,271.791,98.61999999999998,271.99399999999997,97.01499999999999]);
ctx.recodingOrder('bezierCurveTo',[272.202,95.40799999999999,273.63899999999995,94.28599999999999,275.275,94.48099999999998]);
ctx.recodingOrder('bezierCurveTo',[386.395,108.77199999999998,438.111,197.15299999999996,451.147,247.12399999999997]);
ctx.recodingOrder('bezierCurveTo',[469.792,318.621,455.548,387.76099999999997,413.055,432.073]);
ctx.recodingOrder('bezierCurveTo',[393.619,452.34,359.438,470.214,337.147,476.745]);
ctx.recodingOrder('bezierCurveTo',[303.191,486.69,271.292,491.464,236.361,491.464]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[248.668,136.593]);
ctx.recodingOrder('bezierCurveTo',[241.247,136.593,233.716,135.262,227.53300000000002,133.421]);
ctx.recodingOrder('bezierCurveTo',[220.84,131.421,215.03900000000002,127.17099999999999,212.01800000000003,122.04899999999999]);
ctx.recodingOrder('bezierCurveTo',[210.21100000000004,118.979,209.56500000000003,115.719,210.10700000000003,112.357]);
ctx.recodingOrder('bezierCurveTo',[210.35200000000003,110.839,248.30300000000003,19.099000000000004,252.62600000000003,8.643]);
ctx.recodingOrder('bezierCurveTo',[254.79800000000003,3.4140000000000006,258.819,0.4560000000000013,262.86,1.083000000000001]);
ctx.recodingOrder('bezierCurveTo',[266.651,1.677000000000001,269.178,5.213000000000001,269.61,10.543000000000003]);
ctx.recodingOrder('lineTo',[277.708,108.986]);
ctx.recodingOrder('bezierCurveTo',[277.932,111.69200000000001,278.51000000000005,117.191,278.51000000000005,117.197]);
ctx.recodingOrder('bezierCurveTo',[278.26500000000004,124.038,274.51500000000004,129.126,267.38500000000005,132.751]);
ctx.recodingOrder('lineTo',[267.38500000000005,132.751]);
ctx.recodingOrder('bezierCurveTo',[261.948,135.512,255.355,136.593,248.668,136.593]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[261.808,6.86]);
ctx.recodingOrder('bezierCurveTo',[260.88599999999997,6.86,259.214,8.045,258.043,10.883]);
ctx.recodingOrder('bezierCurveTo',[248.52800000000002,33.869,216.764,110.85499999999999,215.79500000000002,113.688]);
ctx.recodingOrder('bezierCurveTo',[215.57100000000003,115.292,215.95200000000003,117.188,217.066,119.07300000000001]);
ctx.recodingOrder('bezierCurveTo',[219.321,122.89800000000001,223.977,126.24400000000001,229.211,127.807]);
ctx.recodingOrder('bezierCurveTo',[239.872,130.981,254.804,132.578,264.73,127.529]);
ctx.recodingOrder('lineTo',[264.73,127.529]);
ctx.recodingOrder('bezierCurveTo',[269.897,124.907,272.49,121.594,272.672,117.41]);
ctx.recodingOrder('bezierCurveTo',[272.64000000000004,117.39699999999999,272.089,112.116,271.875,109.46799999999999]);
ctx.recodingOrder('lineTo',[263.777,11.024999999999991]);
ctx.recodingOrder('bezierCurveTo',[263.553,8.331999999999992,262.678,6.985999999999992,261.954,6.873999999999992]);
ctx.recodingOrder('bezierCurveTo',[261.907,6.865,261.86,6.86,261.808,6.86]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[244.694,88.91]);
ctx.recodingOrder('bezierCurveTo',[238.148,88.91,231.684,87.23599999999999,225.95499999999998,84.051]);
ctx.recodingOrder('bezierCurveTo',[224.53799999999998,83.265,224.033,81.48100000000001,224.814,80.06700000000001]);
ctx.recodingOrder('bezierCurveTo',[225.595,78.658,227.387,78.14,228.798,78.932]);
ctx.recodingOrder('bezierCurveTo',[233.86,81.742,239.553,83.09,245.38,83.047]);
ctx.recodingOrder('bezierCurveTo',[247.182,82.953,248.338,84.294,248.369,85.911]);
ctx.recodingOrder('bezierCurveTo',[248.405,87.528,247.119,88.867,245.505,88.9]);
ctx.recodingOrder('bezierCurveTo',[245.236,88.907,244.965,88.91,244.694,88.91]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[258.308,90.157]);
ctx.recodingOrder('bezierCurveTo',[257.068,90.157,255.82399999999998,89.99799999999999,254.605,89.681]);
ctx.recodingOrder('bezierCurveTo',[253.04299999999998,89.27499999999999,252.105,87.676,252.511,86.111]);
ctx.recodingOrder('bezierCurveTo',[252.917,84.546,254.496,83.60300000000001,256.084,84.015]);
ctx.recodingOrder('bezierCurveTo',[257.584,84.406,259.224,84.392,260.703,83.968]);
ctx.recodingOrder('bezierCurveTo',[262.27599999999995,83.515,263.875,84.434,264.318,85.986]);
ctx.recodingOrder('bezierCurveTo',[264.76,87.543,263.854,89.16300000000001,262.29699999999997,89.60300000000001]);
ctx.recodingOrder('bezierCurveTo',[260.995,89.973,259.657,90.157,258.308,90.157]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[249.683,103.818]);
ctx.recodingOrder('bezierCurveTo',[240.303,103.818,230.986,101.508,222.653,97.03399999999999]);
ctx.recodingOrder('bezierCurveTo',[221.226,96.26799999999999,220.695,94.493,221.45999999999998,93.068]);
ctx.recodingOrder('bezierCurveTo',[222.22599999999997,91.64099999999999,223.99699999999999,91.107,225.42399999999998,91.873]);
ctx.recodingOrder('bezierCurveTo',[235.63699999999997,97.36200000000001,248.01199999999997,99.229,259.407,97.02600000000001]);
ctx.recodingOrder('bezierCurveTo',[260.94899999999996,96.72600000000001,262.527,97.75000000000001,262.839,99.34400000000001]);
ctx.recodingOrder('bezierCurveTo',[263.146,100.93,262.11,102.46900000000001,260.521,102.77600000000001]);
ctx.recodingOrder('bezierCurveTo',[256.938,103.472,253.308,103.818,249.683,103.818]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[233.033,115.057]);
ctx.recodingOrder('bezierCurveTo',[232.86599999999999,115.057,232.7,115.044,232.533,115.015]);
ctx.recodingOrder('bezierCurveTo',[226.71499999999997,114.02,221.153,112.062,215.992,109.19]);
ctx.recodingOrder('bezierCurveTo',[214.581,108.401,214.075,106.617,214.862,105.206]);
ctx.recodingOrder('bezierCurveTo',[215.648,103.792,217.414,103.282,218.846,104.071]);
ctx.recodingOrder('bezierCurveTo',[223.419,106.62,228.356,108.36,233.522,109.24]);
ctx.recodingOrder('bezierCurveTo',[235.11599999999999,109.514,236.188,111.026,235.91199999999998,112.61999999999999]);
ctx.recodingOrder('bezierCurveTo',[235.673,114.047,234.434,115.057,233.033,115.057]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[262.12,117.864]);
ctx.recodingOrder('bezierCurveTo',[260.75600000000003,117.864,259.532,116.90100000000001,259.25,115.50800000000001]);
ctx.recodingOrder('bezierCurveTo',[258.938,113.92200000000001,259.963,112.37800000000001,261.552,112.06300000000002]);
ctx.recodingOrder('bezierCurveTo',[264.583,111.45900000000002,267.51000000000005,110.43000000000002,270.25,109.00800000000001]);
ctx.recodingOrder('bezierCurveTo',[271.677,108.263,273.453,108.81500000000001,274.198,110.25800000000001]);
ctx.recodingOrder('bezierCurveTo',[274.943,111.69300000000001,274.385,113.46100000000001,272.948,114.206]);
ctx.recodingOrder('bezierCurveTo',[269.719,115.88300000000001,266.27099999999996,117.096,262.698,117.807]);
ctx.recodingOrder('bezierCurveTo',[262.505,117.846,262.313,117.864,262.12,117.864]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[256.022,49.201]);
ctx.recodingOrder('bezierCurveTo',[256.022,49.201,256.022,49.201,256.017,49.201]);
ctx.recodingOrder('bezierCurveTo',[251.189,49.196,246.46,48.292,241.96,46.519]);
ctx.recodingOrder('bezierCurveTo',[240.455,45.928,239.715,44.227,240.309,42.722]);
ctx.recodingOrder('bezierCurveTo',[240.903,41.214,242.606,40.477000000000004,244.106,41.071]);
ctx.recodingOrder('bezierCurveTo',[247.86599999999999,42.553,251.99099999999999,43.336,256.027,43.342]);
ctx.recodingOrder('bezierCurveTo',[257.64099999999996,43.344,258.954,44.657,258.949,46.274]);
ctx.recodingOrder('bezierCurveTo',[258.948,47.891,257.636,49.201,256.022,49.201]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[255.095,39.688]);
ctx.recodingOrder('bezierCurveTo',[251.58,39.688,248.054,38.727000000000004,245.033,36.925000000000004]);
ctx.recodingOrder('bezierCurveTo',[243.642,36.097,243.189,34.297000000000004,244.017,32.910000000000004]);
ctx.recodingOrder('bezierCurveTo',[244.845,31.519000000000005,246.647,31.066000000000003,248.033,31.894000000000005]);
ctx.recodingOrder('bezierCurveTo',[250.434,33.32300000000001,253.32999999999998,34.008,256.06399999999996,33.79500000000001]);
ctx.recodingOrder('bezierCurveTo',[257.70899999999995,33.66000000000001,259.07899999999995,34.88900000000001,259.19899999999996,36.50300000000001]);
ctx.recodingOrder('bezierCurveTo',[259.31899999999996,38.11500000000001,258.10599999999994,39.51800000000001,256.49099999999993,39.638000000000005]);
ctx.recodingOrder('bezierCurveTo',[256.026,39.673,255.563,39.688,255.095,39.688]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#210304";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[371.856,149.519]);
ctx.recodingOrder('bezierCurveTo',[374.195,151.76000000000002,376.703,153.79500000000002,379.601,155.21]);
ctx.recodingOrder('bezierCurveTo',[390.003,160.288,397.23199999999997,154.318,393.472,143.54500000000002]);
ctx.recodingOrder('bezierCurveTo',[391.16999999999996,136.95000000000002,383.989,131.35700000000003,377.544,129.21800000000002]);
ctx.recodingOrder('bezierCurveTo',[370.14599999999996,126.76300000000002,359.11899999999997,129.93800000000002,363.68,139.89900000000003]);
ctx.recodingOrder('bezierCurveTo',[364.676,142.07300000000004,366.351,143.85000000000002,367.997,145.58400000000003]);
ctx.recodingOrder('bezierCurveTo',[369.255,146.91,370.528,148.247,371.856,149.519]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#210304";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[99.038,129.923]);
ctx.recodingOrder('bezierCurveTo',[99.173,129.111,99.431,128.3,99.82,127.509]);
ctx.recodingOrder('bezierCurveTo',[103.71,119.599,121.13799999999999,112.05799999999999,128.893,117.81700000000001]);
ctx.recodingOrder('bezierCurveTo',[133.019,120.882,133.397,125.409,129.568,128.431]);
ctx.recodingOrder('bezierCurveTo',[123.94700000000002,132.86800000000002,113.97900000000001,141.44,106.20200000000001,139.822]);
ctx.recodingOrder('bezierCurveTo',[101.198,138.782,98.298,134.353,99.038,129.923]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#210304";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[211.279,153.745]);
ctx.recodingOrder('bezierCurveTo',[211.003,151.80700000000002,210.2,149.899,208.776,148.555]);
ctx.recodingOrder('bezierCurveTo',[207.35200000000003,147.211,205.263,146.51000000000002,203.36800000000002,147.005]);
ctx.recodingOrder('bezierCurveTo',[202.67400000000004,147.186,202.00300000000001,147.535,201.55900000000003,148.09799999999998]);
ctx.recodingOrder('bezierCurveTo',[201.235,148.509,201.04800000000003,149.01,200.88700000000003,149.509]);
ctx.recodingOrder('bezierCurveTo',[199.99400000000003,152.26299999999998,199.74900000000002,155.40599999999998,201.12500000000003,157.95399999999998]);
ctx.recodingOrder('bezierCurveTo',[202.50000000000003,160.50199999999998,205.87100000000004,162.07699999999997,208.44700000000003,160.75499999999997]);
ctx.recodingOrder('bezierCurveTo',[210.841,159.527,211.658,156.41,211.279,153.745]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#210304";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[216.807,173.079]);
ctx.recodingOrder('bezierCurveTo',[218.869,173.90300000000002,221.141,174.45100000000002,223.307,173.961]);
ctx.recodingOrder('bezierCurveTo',[225.47299999999998,173.47,227.46499999999997,171.705,227.63,169.491]);
ctx.recodingOrder('bezierCurveTo',[228.06799999999998,163.615,216.522,159.21200000000002,212.194,162.35000000000002]);
ctx.recodingOrder('bezierCurveTo',[210.26299999999998,163.75100000000003,210.063,166.73800000000003,211.23399999999998,168.81600000000003]);
ctx.recodingOrder('bezierCurveTo',[212.406,170.893,214.592,172.195,216.807,173.079]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#210304";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[238.642,178.474]);
ctx.recodingOrder('bezierCurveTo',[240.67499999999998,178.463,242.762,178.226,244.566,177.289]);
ctx.recodingOrder('bezierCurveTo',[252.47,173.18599999999998,243.854,167.01399999999998,238.344,167.689]);
ctx.recodingOrder('bezierCurveTo',[235.792,168.001,233.301,169.427,232.117,171.709]);
ctx.recodingOrder('bezierCurveTo',[231.671,172.56900000000002,231.416,173.556,231.569,174.513]);
ctx.recodingOrder('bezierCurveTo',[231.801,175.971,232.95999999999998,177.156,234.30599999999998,177.764]);
ctx.recodingOrder('bezierCurveTo',[235.652,178.37,237.166,178.481,238.642,178.474]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#210304";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[264.907,167.755]);
ctx.recodingOrder('bezierCurveTo',[263.876,166.4,262.006,165.96099999999998,260.306,166.054]);
ctx.recodingOrder('bezierCurveTo',[257.322,166.218,254.44599999999997,167.804,252.71499999999997,170.24]);
ctx.recodingOrder('bezierCurveTo',[251.57999999999998,171.836,250.96599999999998,174.09300000000002,252.05599999999998,175.71900000000002]);
ctx.recodingOrder('bezierCurveTo',[252.89899999999997,176.978,254.50799999999998,177.48100000000002,256.01599999999996,177.62500000000003]);
ctx.recodingOrder('bezierCurveTo',[258.27199999999993,177.84000000000003,260.635,177.41700000000003,262.52,176.15800000000002]);
ctx.recodingOrder('bezierCurveTo',[264.405,174.89900000000003,265.743,172.745,265.74199999999996,170.479]);
ctx.recodingOrder('bezierCurveTo',[265.743,169.513,265.494,168.525,264.907,167.755]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#210304";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[277.981,160.96]);
ctx.recodingOrder('bezierCurveTo',[276.641,160.062,274.918,159.977,273.314,160.133]);
ctx.recodingOrder('bezierCurveTo',[272.27500000000003,160.234,271.195,160.44400000000002,270.38500000000005,161.103]);
ctx.recodingOrder('bezierCurveTo',[269.3960000000001,161.906,268.99700000000007,163.211,268.648,164.436]);
ctx.recodingOrder('bezierCurveTo',[268.254,165.821,267.865,167.333,268.41900000000004,168.662]);
ctx.recodingOrder('bezierCurveTo',[269.17400000000004,170.472,271.41100000000006,171.205,273.367,171.08]);
ctx.recodingOrder('bezierCurveTo',[275.8,170.925,278.242,169.651,279.37600000000003,167.49200000000002]);
ctx.recodingOrder('bezierCurveTo',[280.509,165.332,280.007,162.318,277.981,160.96]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#210304";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[283.874,161.096]);
ctx.recodingOrder('bezierCurveTo',[286.196,161.805,288.89000000000004,161.094,290.56,159.332]);
ctx.recodingOrder('bezierCurveTo',[292.22999999999996,157.57,292.797,154.84199999999998,291.966,152.561]);
ctx.recodingOrder('bezierCurveTo',[291.747,151.96,291.43600000000004,151.386,291,150.917]);
ctx.recodingOrder('bezierCurveTo',[289.683,149.50300000000001,287.392,149.32,285.631,150.116]);
ctx.recodingOrder('bezierCurveTo',[283.86999999999995,150.911,282.58399999999995,152.50300000000001,281.67999999999995,154.211]);
ctx.recodingOrder('bezierCurveTo',[280.93499999999995,155.61800000000002,280.40599999999995,157.316,281.02899999999994,158.781]);
ctx.recodingOrder('bezierCurveTo',[281.521,159.944,282.666,160.727,283.874,161.096]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[325.398,664.838]);
ctx.recodingOrder('bezierCurveTo',[324.992,664.838,324.59000000000003,664.726,324.237,664.505]);
ctx.recodingOrder('bezierCurveTo',[321.315,662.685,317.97700000000003,661.432,314.58700000000005,660.883]);
ctx.recodingOrder('bezierCurveTo',[313.75900000000007,660.75,312.20700000000005,660.503,311.24800000000005,659.172]);
ctx.recodingOrder('bezierCurveTo',[310.71200000000005,658.427,310.629,657.649,310.5810000000001,657.183]);
ctx.recodingOrder('bezierCurveTo',[309.4560000000001,652.553,309.5710000000001,646.905,309.68500000000006,641.439]);
ctx.recodingOrder('bezierCurveTo',[309.71700000000004,640.228,310.71600000000007,639.293,311.93000000000006,639.2909999999999]);
ctx.recodingOrder('bezierCurveTo',[313.1430000000001,639.3149999999999,314.1070000000001,640.319,314.0810000000001,641.5329999999999]);
ctx.recodingOrder('bezierCurveTo',[313.9770000000001,646.4679999999998,313.8570000000001,652.0589999999999,314.81500000000005,655.8889999999999]);
ctx.recodingOrder('bezierCurveTo',[314.8670000000001,656.0949999999999,314.90400000000005,656.3109999999999,314.93000000000006,656.5299999999999]);
ctx.recodingOrder('bezierCurveTo',[315.0130000000001,656.5039999999999,315.18000000000006,656.5299999999999,315.27900000000005,656.5459999999998]);
ctx.recodingOrder('bezierCurveTo',[318.15400000000005,657.0099999999999,320.9870000000001,657.9029999999998,323.62200000000007,659.1659999999998]);
ctx.recodingOrder('bezierCurveTo',[324.34600000000006,655.8769999999998,325.97100000000006,652.7759999999998,328.2990000000001,650.3379999999999]);
ctx.recodingOrder('bezierCurveTo',[328.2990000000001,650.3379999999999,328.4080000000001,650.2129999999999,328.5180000000001,650.0939999999998]);
ctx.recodingOrder('bezierCurveTo',[328.4450000000001,650.0369999999998,328.34600000000006,649.8989999999998,328.2060000000001,649.7139999999998]);
ctx.recodingOrder('lineTo',[319.1700000000001,638.1079999999998]);
ctx.recodingOrder('bezierCurveTo',[318.42500000000007,637.1519999999998,318.5970000000001,635.7719999999998,319.55500000000006,635.0249999999999]);
ctx.recodingOrder('bezierCurveTo',[320.50800000000004,634.2879999999999,321.8880000000001,634.4489999999998,322.6380000000001,635.4099999999999]);
ctx.recodingOrder('lineTo',[331.6690000000001,647.0139999999999]);
ctx.recodingOrder('bezierCurveTo',[332.1690000000001,647.6569999999999,333.3510000000001,649.1729999999999,332.9190000000001,651.0449999999998]);
ctx.recodingOrder('bezierCurveTo',[332.6740000000001,652.1049999999998,332.0080000000001,652.8079999999999,331.5700000000001,653.2739999999999]);
ctx.recodingOrder('bezierCurveTo',[329.1010000000001,655.8619999999999,327.6850000000001,659.2629999999999,327.5960000000001,662.6999999999999]);
ctx.recodingOrder('bezierCurveTo',[327.5750000000001,663.4889999999999,327.1320000000001,664.2049999999999,326.4400000000001,664.578]);
ctx.recodingOrder('bezierCurveTo',[326.112,664.75,325.758,664.838,325.398,664.838]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[313.321,643.685]);
ctx.recodingOrder('bezierCurveTo',[313.228,643.685,313.134,643.683,313.035,643.68]);
ctx.recodingOrder('bezierCurveTo',[309.40500000000003,643.5649999999999,305.48900000000003,640.0649999999999,304.973,636.4799999999999]);
ctx.recodingOrder('bezierCurveTo',[304.187,631.0529999999999,308.046,626.8399999999999,312.264,625.483]);
ctx.recodingOrder('bezierCurveTo',[316.63300000000004,624.0799999999999,320.805,625.746,322.878,629.7349999999999]);
ctx.recodingOrder('bezierCurveTo',[324.24199999999996,632.3729999999999,323.95599999999996,635.6979999999999,322.11199999999997,638.6309999999999]);
ctx.recodingOrder('bezierCurveTo',[320.133,641.769,316.789,643.685,313.321,643.685]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[315.294,629.395]);
ctx.recodingOrder('bezierCurveTo',[314.60699999999997,629.395,314.002,629.5409999999999,313.60699999999997,629.669]);
ctx.recodingOrder('bezierCurveTo',[311.20599999999996,630.4399999999999,308.883,632.869,309.316,635.8539999999999]);
ctx.recodingOrder('bezierCurveTo',[309.53499999999997,637.3489999999999,311.65999999999997,639.242,313.16999999999996,639.2919999999999]);
ctx.recodingOrder('bezierCurveTo',[315.472,639.334,317.45099999999996,637.795,318.39399999999995,636.2919999999999]);
ctx.recodingOrder('bezierCurveTo',[319.38399999999996,634.7159999999999,319.60699999999997,632.9789999999999,318.9719999999999,631.7579999999999]);
ctx.recodingOrder('lineTo',[318.9719999999999,631.7579999999999]);
ctx.recodingOrder('bezierCurveTo',[317.992,629.863,316.519,629.395,315.294,629.395]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[313.722,668.043]);
ctx.recodingOrder('bezierCurveTo',[313.212,668.043,312.70599999999996,667.866,312.29499999999996,667.515]);
ctx.recodingOrder('bezierCurveTo',[310.02399999999994,665.5749999999999,307.60799999999995,663.77,305.12299999999993,662.153]);
ctx.recodingOrder('bezierCurveTo',[304.1069999999999,661.4920000000001,303.8159999999999,660.1320000000001,304.4769999999999,659.114]);
ctx.recodingOrder('bezierCurveTo',[305.1439999999999,658.0980000000001,306.5079999999999,657.8100000000001,307.5179999999999,658.471]);
ctx.recodingOrder('bezierCurveTo',[309.6689999999999,659.869,311.7679999999999,661.401,313.7779999999999,663.0360000000001]);
ctx.recodingOrder('bezierCurveTo',[315.7099999999999,661.609,317.7459999999999,660.3050000000001,319.8499999999999,659.1510000000001]);
ctx.recodingOrder('bezierCurveTo',[320.9279999999999,658.575,322.2509999999999,658.9580000000001,322.8339999999999,660.0200000000001]);
ctx.recodingOrder('bezierCurveTo',[323.4169999999999,661.0850000000002,323.0269999999999,662.421,321.96499999999986,663.0040000000001]);
ctx.recodingOrder('bezierCurveTo',[319.5529999999999,664.3270000000001,317.2359999999999,665.8600000000001,315.08499999999987,667.5660000000001]);
ctx.recodingOrder('bezierCurveTo',[314.685,667.885,314.201,668.043,313.722,668.043]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[147.62,664.838]);
ctx.recodingOrder('bezierCurveTo',[147.266,664.838,146.907,664.7489999999999,146.584,664.5749999999999]);
ctx.recodingOrder('bezierCurveTo',[145.886,664.203,145.449,663.4889999999999,145.423,662.6999999999999]);
ctx.recodingOrder('bezierCurveTo',[145.329,659.2579999999999,143.913,655.8559999999999,141.543,653.367]);
ctx.recodingOrder('bezierCurveTo',[141.03300000000002,652.833,140.35,652.12,140.1,651.039]);
ctx.recodingOrder('bezierCurveTo',[139.668,649.18,140.84,647.665,141.339,647.016]);
ctx.recodingOrder('lineTo',[150.375,635.41]);
ctx.recodingOrder('bezierCurveTo',[151.12,634.4459999999999,152.505,634.285,153.458,635.025]);
ctx.recodingOrder('bezierCurveTo',[154.416,635.7719999999999,154.588,637.153,153.843,638.108]);
ctx.recodingOrder('lineTo',[144.81199999999998,649.709]);
ctx.recodingOrder('bezierCurveTo',[144.49999999999997,650.1099999999999,144.40599999999998,650.285,144.385,650.357]);
ctx.recodingOrder('bezierCurveTo',[146.958,652.776,148.64499999999998,655.875,149.385,659.1659999999999]);
ctx.recodingOrder('bezierCurveTo',[152.02499999999998,657.9029999999999,154.85299999999998,657.01,157.72799999999998,656.544]);
ctx.recodingOrder('bezierCurveTo',[157.82099999999997,656.531,157.962,656.508,158.093,656.482]);
ctx.recodingOrder('bezierCurveTo',[158.129,656.24,158.161,656.06,158.202,655.8829999999999]);
ctx.recodingOrder('bezierCurveTo',[159.15,652.078,159.04,646.7189999999999,158.936,641.5339999999999]);
ctx.recodingOrder('bezierCurveTo',[158.91500000000002,640.3209999999999,159.87900000000002,639.3179999999999,161.092,639.2949999999998]);
ctx.recodingOrder('bezierCurveTo',[162.08200000000002,639.2789999999999,163.305,640.2319999999999,163.33100000000002,641.4459999999998]);
ctx.recodingOrder('bezierCurveTo',[163.44000000000003,646.9169999999998,163.549,652.5729999999998,162.461,656.9529999999997]);
ctx.recodingOrder('bezierCurveTo',[162.388,657.6479999999998,162.304,658.4269999999998,161.774,659.1689999999998]);
ctx.recodingOrder('bezierCurveTo',[160.811,660.5019999999997,159.25900000000001,660.7489999999998,158.42,660.8819999999997]);
ctx.recodingOrder('bezierCurveTo',[155.03,661.4319999999997,151.69699999999997,662.6839999999997,148.77999999999997,664.5019999999997]);
ctx.recodingOrder('bezierCurveTo',[148.428,664.726,148.027,664.838,147.62,664.838]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[159.714,643.685]);
ctx.recodingOrder('bezierCurveTo',[157.214,643.685,154.709,642.635,152.798,640.781]);
ctx.recodingOrder('bezierCurveTo',[150.861,638.901,149.746,636.367,149.746,633.828]);
ctx.recodingOrder('bezierCurveTo',[149.746,632.544,149.98600000000002,631.323,150.459,630.1999999999999]);
ctx.recodingOrder('bezierCurveTo',[151.485,627.7389999999999,153.423,626.0079999999999,155.912,625.323]);
ctx.recodingOrder('bezierCurveTo',[158.85,624.511,162.234,625.227,164.943,627.242]);
ctx.recodingOrder('bezierCurveTo',[168.05200000000002,629.5469999999999,169.282,633.5279999999999,168.078,637.385]);
ctx.recodingOrder('bezierCurveTo',[166.917,641.091,163.739,643.562,159.985,643.679]);
ctx.recodingOrder('bezierCurveTo',[159.896,643.683,159.802,643.685,159.714,643.685]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[158.37,629.391]);
ctx.recodingOrder('bezierCurveTo',[157.922,629.391,157.49,629.4459999999999,157.078,629.56]);
ctx.recodingOrder('bezierCurveTo',[155.885,629.8879999999999,155.02100000000002,630.675,154.51,631.8979999999999]);
ctx.recodingOrder('bezierCurveTo',[154.51,631.8999999999999,154.51,631.9029999999999,154.51,631.906]);
ctx.recodingOrder('bezierCurveTo',[154.266,632.487,154.141,633.1329999999999,154.141,633.828]);
ctx.recodingOrder('bezierCurveTo',[154.141,635.185,154.766,636.567,155.85399999999998,637.627]);
ctx.recodingOrder('bezierCurveTo',[156.98899999999998,638.7289999999999,158.515,639.322,159.849,639.2879999999999]);
ctx.recodingOrder('bezierCurveTo',[162.68699999999998,639.1989999999998,163.65099999999998,636.8039999999999,163.88,636.0719999999999]);
ctx.recodingOrder('bezierCurveTo',[164.37,634.5179999999999,164.255,632.1969999999999,162.328,630.7699999999999]);
ctx.recodingOrder('bezierCurveTo',[161.125,629.876,159.693,629.391,158.37,629.391]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[159.297,668.043]);
ctx.recodingOrder('bezierCurveTo',[158.81799999999998,668.043,158.334,667.884,157.933,667.569]);
ctx.recodingOrder('bezierCurveTo',[155.777,665.861,153.459,664.324,151.053,663.002]);
ctx.recodingOrder('bezierCurveTo',[149.99099999999999,662.419,149.6,661.083,150.183,660.02]);
ctx.recodingOrder('bezierCurveTo',[150.766,658.9549999999999,152.10999999999999,658.569,153.167,659.153]);
ctx.recodingOrder('bezierCurveTo',[155.266,660.306,157.302,661.6080000000001,159.235,663.0360000000001]);
ctx.recodingOrder('bezierCurveTo',[161.24,661.403,163.33900000000003,659.8720000000001,165.495,658.471]);
ctx.recodingOrder('bezierCurveTo',[166.505,657.802,167.87,658.094,168.536,659.114]);
ctx.recodingOrder('bezierCurveTo',[169.197,660.1320000000001,168.905,661.4920000000001,167.89000000000001,662.153]);
ctx.recodingOrder('bezierCurveTo',[165.395,663.775,162.984,665.577,160.72400000000002,667.515]);
ctx.recodingOrder('bezierCurveTo',[160.318,667.866,159.807,668.043,159.297,668.043]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[177.276,675.345]);
ctx.recodingOrder('bezierCurveTo',[175.854,675.345,174.604,674.306,174.38600000000002,672.856]);
ctx.recodingOrder('bezierCurveTo',[174.14100000000002,671.257,175.24000000000004,669.765,176.83900000000003,669.52]);
ctx.recodingOrder('bezierCurveTo',[188.02600000000004,667.822,199.38500000000002,667.653,210.61900000000003,669.028]);
ctx.recodingOrder('bezierCurveTo',[212.22900000000004,669.2230000000001,213.36900000000003,670.684,213.17100000000002,672.291]);
ctx.recodingOrder('bezierCurveTo',[212.973,673.898,211.484,675.0360000000001,209.91100000000003,674.84]);
ctx.recodingOrder('bezierCurveTo',[199.20300000000003,673.533,188.37500000000003,673.6890000000001,177.72500000000002,675.311]);
ctx.recodingOrder('bezierCurveTo',[177.572,675.335,177.421,675.345,177.276,675.345]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[266.995,676.676]);
ctx.recodingOrder('bezierCurveTo',[265.683,676.676,264.49,675.793,264.157,674.465]);
ctx.recodingOrder('bezierCurveTo',[263.76099999999997,672.897,264.709,671.303,266.277,670.908]);
ctx.recodingOrder('bezierCurveTo',[273.47499999999997,669.082,289.739,668.794,296.781,669.5020000000001]);
ctx.recodingOrder('bezierCurveTo',[298.39,669.663,299.562,671.0980000000001,299.406,672.7080000000001]);
ctx.recodingOrder('bezierCurveTo',[299.245,674.32,297.812,675.5050000000001,296.198,675.33]);
ctx.recodingOrder('bezierCurveTo',[289.698,674.681,274.022,674.989,267.715,676.585]);
ctx.recodingOrder('bezierCurveTo',[267.474,676.647,267.229,676.676,266.995,676.676]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[219.826,480.05]);
ctx.recodingOrder('bezierCurveTo',[219.779,480.05,219.727,480.048,219.67499999999998,480.045]);
ctx.recodingOrder('bezierCurveTo',[178.021,477.915,148.142,468.761,125.64299999999999,451.23400000000004]);
ctx.recodingOrder('bezierCurveTo',[96.374,428.43300000000005,79.42699999999999,392.25700000000006,79.15099999999998,351.98900000000003]);
ctx.recodingOrder('bezierCurveTo',[78.90099999999998,316.61100000000005,92.24399999999999,283.552,116.71699999999998,258.90200000000004]);
ctx.recodingOrder('bezierCurveTo',[145.21599999999998,230.20300000000003,186.495,214.39900000000006,232.95099999999996,214.39900000000006]);
ctx.recodingOrder('bezierCurveTo',[279.89699999999993,214.39900000000006,321.556,230.30200000000005,350.258,259.18100000000004]);
ctx.recodingOrder('bezierCurveTo',[374.93899999999996,284.016,388.412,317.39200000000005,388.193,353.158]);
ctx.recodingOrder('bezierCurveTo',[387.943,393.87,370.715,430.185,340.92499999999995,452.794]);
ctx.recodingOrder('bezierCurveTo',[319.96799999999996,468.697,288.912,478.217,253.48699999999997,479.603]);
ctx.recodingOrder('bezierCurveTo',[251.71099999999996,479.569,250.51299999999998,478.40500000000003,250.44599999999997,476.791]);
ctx.recodingOrder('bezierCurveTo',[250.38399999999996,475.174,251.64399999999998,473.812,253.25799999999998,473.75]);
ctx.recodingOrder('bezierCurveTo',[287.496,472.412,317.375,463.313,337.384,448.129]);
ctx.recodingOrder('bezierCurveTo',[365.716,426.63,382.101,392.00100000000003,382.34000000000003,353.12300000000005]);
ctx.recodingOrder('bezierCurveTo',[382.54800000000006,318.432,370.01800000000003,287.37600000000003,346.10200000000003,263.3090000000001]);
ctx.recodingOrder('bezierCurveTo',[318.51000000000005,235.54700000000008,278.324,220.25900000000007,232.95100000000002,220.25900000000007]);
ctx.recodingOrder('bezierCurveTo',[188.068,220.25900000000007,148.26200000000003,235.44800000000006,120.87300000000002,263.0300000000001]);
ctx.recodingOrder('bezierCurveTo',[97.16600000000003,286.9040000000001,84.76600000000002,317.6520000000001,85.00500000000002,351.9480000000001]);
ctx.recodingOrder('bezierCurveTo',[85.27100000000003,390.4150000000001,101.39500000000002,424.9210000000001,129.24800000000002,446.6150000000001]);
ctx.recodingOrder('bezierCurveTo',[150.752,463.36700000000013,179.579,472.12900000000013,219.978,474.1970000000001]);
ctx.recodingOrder('bezierCurveTo',[221.592,474.27800000000013,222.83200000000002,475.6560000000001,222.75400000000002,477.2700000000001]);
ctx.recodingOrder('bezierCurveTo',[222.669,478.834,221.378,480.05,219.826,480.05]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[232.174,480.334]);
ctx.recodingOrder('bezierCurveTo',[230.99200000000002,480.334,229.82,480.313,228.643,480.269]);
ctx.recodingOrder('bezierCurveTo',[227.029,480.209,225.768,478.85,225.825,477.232]);
ctx.recodingOrder('bezierCurveTo',[225.88299999999998,475.615,227.179,474.399,228.862,474.41400000000004]);
ctx.recodingOrder('bezierCurveTo',[233.279,474.57800000000003,237.773,474.41200000000003,242.159,473.92]);
ctx.recodingOrder('bezierCurveTo',[243.79999999999998,473.74,245.22199999999998,474.894,245.398,476.50600000000003]);
ctx.recodingOrder('bezierCurveTo',[245.575,478.11300000000006,244.41899999999998,479.56300000000005,242.815,479.74300000000005]);
ctx.recodingOrder('bezierCurveTo',[239.298,480.136,235.731,480.334,232.174,480.334]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[132.199,258.574]);
ctx.recodingOrder('bezierCurveTo',[132.05300000000003,258.574,131.907,258.572,131.756,258.564]);
ctx.recodingOrder('bezierCurveTo',[126.913,258.324,123.178,254.199,123.418,249.354]);
ctx.recodingOrder('bezierCurveTo',[123.787,241.90400000000002,124.60000000000001,233.305,129.579,225.561]);
ctx.recodingOrder('bezierCurveTo',[135.735,215.97,147.183,210.952,157.421,213.353]);
ctx.recodingOrder('bezierCurveTo',[164.863,215.098,171.321,220.715,174.691,228.37800000000001]);
ctx.recodingOrder('bezierCurveTo',[177.337,234.40400000000002,177.785,240.47400000000002,178.18,245.82700000000003]);
ctx.recodingOrder('bezierCurveTo',[178.53400000000002,250.66500000000002,174.899,254.87800000000001,170.06,255.235]);
ctx.recodingOrder('bezierCurveTo',[165.294,255.56,161.00900000000001,251.96200000000002,160.649,247.11800000000002]);
ctx.recodingOrder('bezierCurveTo',[160.347,242.98300000000003,160.03,238.70400000000004,158.597,235.44100000000003]);
ctx.recodingOrder('bezierCurveTo',[157.70600000000002,233.41500000000002,155.87300000000002,231.03800000000004,153.405,230.45900000000003]);
ctx.recodingOrder('bezierCurveTo',[150.145,229.70100000000002,146.166,232.24800000000002,144.364,235.05500000000004]);
ctx.recodingOrder('bezierCurveTo',[141.978,238.76300000000003,141.296,243.60700000000003,140.96800000000002,250.22100000000003]);
ctx.recodingOrder('bezierCurveTo',[140.735,254.923,136.856,258.574,132.199,258.574]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[335.893,258.574]);
ctx.recodingOrder('bezierCurveTo',[331.23699999999997,258.574,327.35699999999997,254.923,327.12199999999996,250.226]);
ctx.recodingOrder('bezierCurveTo',[326.799,243.771,326.13699999999994,239.047,323.82499999999993,235.451]);
ctx.recodingOrder('bezierCurveTo',[322.09599999999995,232.753,318.2369999999999,230.303,315.15899999999993,231.021]);
ctx.recodingOrder('bezierCurveTo',[312.79499999999996,231.576,311.03899999999993,233.85399999999998,310.18499999999995,235.80499999999998]);
ctx.recodingOrder('bezierCurveTo',[308.79999999999995,238.96099999999998,308.50299999999993,242.95799999999997,308.18499999999995,247.19199999999998]);
ctx.recodingOrder('bezierCurveTo',[307.83099999999996,252.02999999999997,303.69499999999994,255.629,298.77399999999994,255.30399999999997]);
ctx.recodingOrder('bezierCurveTo',[293.9359999999999,254.94499999999996,290.3059999999999,250.73099999999997,290.66499999999996,245.89]);
ctx.recodingOrder('bezierCurveTo',[291.056,240.624,291.498,234.659,294.092,228.743]);
ctx.recodingOrder('bezierCurveTo',[297.41499999999996,221.18099999999998,303.784,215.639,311.143,213.91299999999998]);
ctx.recodingOrder('bezierCurveTo',[321.236,211.53499999999997,332.52799999999996,216.493,338.60999999999996,225.951]);
ctx.recodingOrder('bezierCurveTo',[343.506,233.575,344.30799999999994,242.028,344.67199999999997,249.351]);
ctx.recodingOrder('bezierCurveTo',[344.912,254.197,341.183,258.322,336.33399999999995,258.564]);
ctx.recodingOrder('bezierCurveTo',[336.184,258.571,336.038,258.574,335.893,258.574]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[352.996,257.79]);
ctx.recodingOrder('bezierCurveTo',[352.22499999999997,257.79,351.44899999999996,257.485,350.876,256.88100000000003]);
ctx.recodingOrder('bezierCurveTo',[349.76099999999997,255.70900000000003,349.803,253.85500000000002,350.97499999999997,252.74100000000004]);
ctx.recodingOrder('bezierCurveTo',[352.79799999999994,251.00400000000005,354.313,249.00200000000004,355.47499999999997,246.79100000000005]);
ctx.recodingOrder('bezierCurveTo',[356.23499999999996,245.35600000000005,358.001,244.82000000000005,359.433,245.56400000000005]);
ctx.recodingOrder('bezierCurveTo',[360.865,246.31600000000006,361.412,248.08700000000005,360.662,249.52000000000004]);
ctx.recodingOrder('bezierCurveTo',[359.19899999999996,252.29600000000005,357.298,254.80600000000004,355.017,256.98100000000005]);
ctx.recodingOrder('bezierCurveTo',[354.449,257.522,353.72,257.79,352.996,257.79]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[361.855,267.139]);
ctx.recodingOrder('bezierCurveTo',[361.319,267.139,360.771,266.99,360.28200000000004,266.678]);
ctx.recodingOrder('bezierCurveTo',[358.92300000000006,265.808,358.52200000000005,263.996,359.391,262.634]);
ctx.recodingOrder('bezierCurveTo',[361.386,259.512,363.875,256.767,366.79200000000003,254.48000000000002]);
ctx.recodingOrder('bezierCurveTo',[368.05800000000005,253.48800000000003,369.901,253.69600000000003,370.906,254.97700000000003]);
ctx.recodingOrder('bezierCurveTo',[371.901,256.25000000000006,371.677,258.091,370.406,259.08900000000006]);
ctx.recodingOrder('bezierCurveTo',[368.01,260.96700000000004,365.964,263.21900000000005,364.32800000000003,265.78400000000005]);
ctx.recodingOrder('bezierCurveTo',[363.771,266.659,362.824,267.139,361.855,267.139]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[368.656,274.917]);
ctx.recodingOrder('bezierCurveTo',[367.812,274.917,366.969,274.54999999999995,366.391,273.84099999999995]);
ctx.recodingOrder('bezierCurveTo',[365.365,272.59099999999995,365.547,270.74499999999995,366.802,269.72099999999995]);
ctx.recodingOrder('lineTo',[375.119,262.91099999999994]);
ctx.recodingOrder('bezierCurveTo',[376.353,261.893,378.213,262.06499999999994,379.23900000000003,263.31999999999994]);
ctx.recodingOrder('bezierCurveTo',[380.26500000000004,264.56999999999994,380.083,266.41599999999994,378.82800000000003,267.44199999999995]);
ctx.recodingOrder('lineTo',[370.511,274.25199999999995]);
ctx.recodingOrder('bezierCurveTo',[369.969,274.698,369.313,274.917,368.656,274.917]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[374.042,286.164]);
ctx.recodingOrder('bezierCurveTo',[373.11499999999995,286.164,372.20399999999995,285.721,371.631,284.901]);
ctx.recodingOrder('bezierCurveTo',[370.714,283.57,371.04799999999994,281.745,372.376,280.826]);
ctx.recodingOrder('bezierCurveTo',[376.058,278.279,379.928,275.92,383.88,273.81100000000004]);
ctx.recodingOrder('bezierCurveTo',[385.312,273.059,387.08299999999997,273.58700000000005,387.844,275.014]);
ctx.recodingOrder('bezierCurveTo',[388.604,276.44100000000003,388.068,278.217,386.641,278.978]);
ctx.recodingOrder('bezierCurveTo',[382.886,280.983,379.209,283.225,375.709,285.644]);
ctx.recodingOrder('bezierCurveTo',[375.198,285.994,374.62,286.164,374.042,286.164]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[380,295.259]);
ctx.recodingOrder('bezierCurveTo',[378.776,295.259,377.63,294.483,377.224,293.259]);
ctx.recodingOrder('bezierCurveTo',[376.70799999999997,291.723,377.536,290.064,379.073,289.551]);
ctx.recodingOrder('bezierCurveTo',[382.55699999999996,288.387,386.01,286.989,389.33299999999997,285.395]);
ctx.recodingOrder('bezierCurveTo',[390.765,284.697,392.53599999999994,285.304,393.239,286.77]);
ctx.recodingOrder('bezierCurveTo',[393.93699999999995,288.229,393.322,289.978,391.864,290.676]);
ctx.recodingOrder('bezierCurveTo',[388.328,292.37399999999997,384.645,293.866,380.92699999999996,295.108]);
ctx.recodingOrder('bezierCurveTo',[380.619,295.21,380.307,295.259,380,295.259]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[386.244,306.723]);
ctx.recodingOrder('bezierCurveTo',[384.88500000000005,306.723,383.66600000000005,305.77000000000004,383.38000000000005,304.387]);
ctx.recodingOrder('bezierCurveTo',[383.0520000000001,302.801,384.07300000000004,301.252,385.65600000000006,300.926]);
ctx.recodingOrder('lineTo',[395.41100000000006,298.913]);
ctx.recodingOrder('bezierCurveTo',[397.01000000000005,298.58,398.54600000000005,299.6,398.8740000000001,301.18600000000004]);
ctx.recodingOrder('bezierCurveTo',[399.20200000000006,302.77200000000005,398.1810000000001,304.321,396.59800000000007,304.64700000000005]);
ctx.recodingOrder('lineTo',[386.8430000000001,306.66]);
ctx.recodingOrder('bezierCurveTo',[386.64,306.702,386.442,306.723,386.244,306.723]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[389.114,319.584]);
ctx.recodingOrder('bezierCurveTo',[387.734,319.584,386.5,318.6,386.239,317.188]);
ctx.recodingOrder('bezierCurveTo',[385.94199999999995,315.597,386.99399999999997,314.068,388.58299999999997,313.774]);
ctx.recodingOrder('lineTo',[399.405,311.766]);
ctx.recodingOrder('bezierCurveTo',[400.993,311.47400000000005,402.525,312.521,402.82099999999997,314.112]);
ctx.recodingOrder('bezierCurveTo',[403.118,315.70300000000003,402.066,317.232,400.477,317.526]);
ctx.recodingOrder('lineTo',[389.655,319.534]);
ctx.recodingOrder('bezierCurveTo',[389.473,319.568,389.291,319.584,389.114,319.584]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[393.052,332.091]);
ctx.recodingOrder('bezierCurveTo',[392.34900000000005,332.091,391.646,332.067,390.93800000000005,332.026]);
ctx.recodingOrder('bezierCurveTo',[389.32400000000007,331.925,388.1,330.53700000000003,388.19900000000007,328.922]);
ctx.recodingOrder('bezierCurveTo',[388.29300000000006,327.305,389.7200000000001,326.13500000000005,391.30300000000005,326.177]);
ctx.recodingOrder('bezierCurveTo',[394.13100000000003,326.35900000000004,396.9800000000001,326.10400000000004,399.74500000000006,325.435]);
ctx.recodingOrder('bezierCurveTo',[401.3330000000001,325.04200000000003,402.90100000000007,326.026,403.28100000000006,327.594]);
ctx.recodingOrder('bezierCurveTo',[403.66100000000006,329.167,402.69200000000006,330.75,401.12000000000006,331.127]);
ctx.recodingOrder('bezierCurveTo',[398.468,331.768,395.765,332.091,393.052,332.091]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[401.858,343.757]);
ctx.recodingOrder('lineTo',[393.072,343.757]);
ctx.recodingOrder('bezierCurveTo',[391.452,343.757,390.145,342.445,390.145,340.827]);
ctx.recodingOrder('bezierCurveTo',[390.145,339.21,391.452,337.897,393.072,337.897]);
ctx.recodingOrder('lineTo',[401.858,337.897]);
ctx.recodingOrder('bezierCurveTo',[403.478,337.897,404.785,339.209,404.785,340.827]);
ctx.recodingOrder('bezierCurveTo',[404.785,342.445,403.478,343.757,401.858,343.757]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[399.947,356.748]);
ctx.recodingOrder('bezierCurveTo',[399.764,356.748,399.582,356.73199999999997,399.4,356.69599999999997]);
ctx.recodingOrder('lineTo',[393.479,355.58099999999996]);
ctx.recodingOrder('bezierCurveTo',[391.89099999999996,355.28399999999993,390.84299999999996,353.753,391.14099999999996,352.16499999999996]);
ctx.recodingOrder('bezierCurveTo',[391.443,350.56899999999996,393.00499999999994,349.51699999999994,394.563,349.82699999999994]);
ctx.recodingOrder('lineTo',[400.484,350.94199999999995]);
ctx.recodingOrder('bezierCurveTo',[402.072,351.24199999999996,403.12,352.77199999999993,402.822,354.364]);
ctx.recodingOrder('bezierCurveTo',[402.556,355.767,401.327,356.748,399.947,356.748]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[398.864,371.198]);
ctx.recodingOrder('bezierCurveTo',[398.359,371.198,397.844,371.065,397.36899999999997,370.784]);
ctx.recodingOrder('bezierCurveTo',[395.90599999999995,369.914,394.239,369.287,392.55699999999996,368.974]);
ctx.recodingOrder('bezierCurveTo',[390.96899999999994,368.67699999999996,389.917,367.14799999999997,390.21299999999997,365.558]);
ctx.recodingOrder('bezierCurveTo',[390.50499999999994,363.96999999999997,392.025,362.915,393.62899999999996,363.214]);
ctx.recodingOrder('bezierCurveTo',[396.01899999999995,363.659,398.28499999999997,364.514,400.36799999999994,365.753]);
ctx.recodingOrder('bezierCurveTo',[401.75899999999996,366.579,402.21199999999993,368.378,401.38399999999996,369.76599999999996]);
ctx.recodingOrder('bezierCurveTo',[400.837,370.688,399.864,371.198,398.864,371.198]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[395.051,384.703]);
ctx.recodingOrder('bezierCurveTo',[394.567,384.703,394.072,384.58,393.614,384.323]);
ctx.recodingOrder('lineTo',[388.661,381.52599999999995]);
ctx.recodingOrder('bezierCurveTo',[387.255,380.73199999999997,386.76,378.94599999999997,387.552,377.53599999999994]);
ctx.recodingOrder('bezierCurveTo',[388.34900000000005,376.1329999999999,390.10900000000004,375.61899999999997,391.547,376.42699999999996]);
ctx.recodingOrder('lineTo',[396.5,379.224]);
ctx.recodingOrder('bezierCurveTo',[397.906,380.018,398.401,381.804,397.609,383.214]);
ctx.recodingOrder('bezierCurveTo',[397.067,384.167,396.077,384.703,395.051,384.703]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[388.677,398.007]);
ctx.recodingOrder('bezierCurveTo',[388.661,398.007,388.651,398.007,388.63500000000005,398.007]);
ctx.recodingOrder('bezierCurveTo',[386.088,397.971,383.82300000000004,395.963,383.47900000000004,393.434]);
ctx.recodingOrder('bezierCurveTo',[383.26000000000005,391.83200000000005,384.38000000000005,390.35600000000005,385.98400000000004,390.137]);
ctx.recodingOrder('bezierCurveTo',[387.41100000000006,389.95,388.771,390.83,389.182,392.191]);
ctx.recodingOrder('bezierCurveTo',[390.57800000000003,392.436,391.625,393.65999999999997,391.60400000000004,395.118]);
ctx.recodingOrder('bezierCurveTo',[391.583,396.721,390.275,398.007,388.677,398.007]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[83.618,294.895]);
ctx.recodingOrder('bezierCurveTo',[83.10799999999999,294.895,82.592,294.76,82.118,294.478]);
ctx.recodingOrder('bezierCurveTo',[80.149,293.29900000000004,77.89999999999999,292.603,75.613,292.47]);
ctx.recodingOrder('bezierCurveTo',[73.999,292.374,72.764,290.988,72.863,289.374]);
ctx.recodingOrder('bezierCurveTo',[72.952,287.757,74.524,286.543,75.957,286.62100000000004]);
ctx.recodingOrder('bezierCurveTo',[79.181,286.81100000000004,82.35199999999999,287.79,85.12899999999999,289.45200000000006]);
ctx.recodingOrder('bezierCurveTo',[86.514,290.2830000000001,86.96699999999998,292.08200000000005,86.13399999999999,293.47]);
ctx.recodingOrder('bezierCurveTo',[85.587,294.387,84.618,294.895,83.618,294.895]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[79.191,306.189]);
ctx.recodingOrder('bezierCurveTo',[78.811,306.189,78.42,306.11400000000003,78.05,305.957]);
ctx.recodingOrder('bezierCurveTo',[75.951,305.069,73.733,304.452,71.472,304.12399999999997]);
ctx.recodingOrder('bezierCurveTo',[69.868,303.89199999999994,68.759,302.40799999999996,68.988,300.80699999999996]);
ctx.recodingOrder('bezierCurveTo',[69.222,299.205,70.733,298.09899999999993,72.305,298.328]);
ctx.recodingOrder('bezierCurveTo',[75.07000000000001,298.727,77.768,299.479,80.33000000000001,300.56199999999995]);
ctx.recodingOrder('bezierCurveTo',[81.81900000000002,301.19199999999995,82.51700000000001,302.91099999999994,81.88700000000001,304.40099999999995]);
ctx.recodingOrder('bezierCurveTo',[81.415,305.517,80.332,306.189,79.191,306.189]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[75.785,319.422]);
ctx.recodingOrder('bezierCurveTo',[75.707,319.422,75.634,319.42,75.56099999999999,319.41400000000004]);
ctx.recodingOrder('lineTo',[67.75399999999999,318.82800000000003]);
ctx.recodingOrder('bezierCurveTo',[66.13999999999999,318.70500000000004,64.931,317.3,65.05099999999999,315.68800000000005]);
ctx.recodingOrder('bezierCurveTo',[65.17099999999999,314.071,66.67099999999999,312.87800000000004,68.19099999999999,312.98500000000007]);
ctx.recodingOrder('lineTo',[75.99799999999999,313.5710000000001]);
ctx.recodingOrder('bezierCurveTo',[77.612,313.6940000000001,78.82099999999998,315.0990000000001,78.701,316.71100000000007]);
ctx.recodingOrder('bezierCurveTo',[78.588,318.251,77.301,319.422,75.785,319.422]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[74.322,334.971]);
ctx.recodingOrder('lineTo',[66.51,334.971]);
ctx.recodingOrder('bezierCurveTo',[64.89,334.971,63.583000000000006,333.659,63.583000000000006,332.041]);
ctx.recodingOrder('bezierCurveTo',[63.583000000000006,330.424,64.89,329.111,66.51,329.111]);
ctx.recodingOrder('lineTo',[74.322,329.111]);
ctx.recodingOrder('bezierCurveTo',[75.94200000000001,329.111,77.24900000000001,330.423,77.24900000000001,332.041]);
ctx.recodingOrder('bezierCurveTo',[77.249,333.659,75.942,334.971,74.322,334.971]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[66.005,351.968]);
ctx.recodingOrder('bezierCurveTo',[64.557,351.968,63.30199999999999,350.89500000000004,63.104,349.421]);
ctx.recodingOrder('bezierCurveTo',[62.896,347.817,64.026,346.346,65.63,346.135]);
ctx.recodingOrder('lineTo',[71.994,345.30199999999996]);
ctx.recodingOrder('bezierCurveTo',[73.578,345.073,75.067,346.21599999999995,75.281,347.823]);
ctx.recodingOrder('bezierCurveTo',[75.489,349.42699999999996,74.35900000000001,350.89799999999997,72.75500000000001,351.10999999999996]);
ctx.recodingOrder('lineTo',[66.391,351.943]);
ctx.recodingOrder('bezierCurveTo',[66.26,351.96,66.135,351.968,66.005,351.968]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[68.76,368.058]);
ctx.recodingOrder('bezierCurveTo',[67.656,368.058,66.786,367.514,66.265,366.876]);
ctx.recodingOrder('bezierCurveTo',[65.489,365.91999999999996,65.385,364.431,66.015,363.373]);
ctx.recodingOrder('bezierCurveTo',[66.634,362.339,67.958,361.683,69.19200000000001,361.873]);
ctx.recodingOrder('lineTo',[72.75500000000001,360.495]);
ctx.recodingOrder('bezierCurveTo',[74.25500000000001,359.909,75.95800000000001,360.656,76.54100000000001,362.169]);
ctx.recodingOrder('bezierCurveTo',[77.13000000000001,363.67699999999996,76.38000000000001,365.37199999999996,74.87,365.95799999999997]);
ctx.recodingOrder('lineTo',[70.146,367.78099999999995]);
ctx.recodingOrder('bezierCurveTo',[69.656,367.975,69.187,368.058,68.76,368.058]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[72.369,385.797]);
ctx.recodingOrder('bezierCurveTo',[70.947,385.797,69.697,384.75300000000004,69.479,383.302]);
ctx.recodingOrder('bezierCurveTo',[69.239,381.70000000000005,70.344,380.211,71.942,379.971]);
ctx.recodingOrder('bezierCurveTo',[73.38999999999999,379.752,74.80099999999999,379.195,76.01499999999999,378.359]);
ctx.recodingOrder('bezierCurveTo',[77.33799999999998,377.44,79.17099999999999,377.77799999999996,80.088,379.106]);
ctx.recodingOrder('bezierCurveTo',[81.005,380.44,80.67099999999999,382.262,79.338,383.181]);
ctx.recodingOrder('bezierCurveTo',[77.395,384.522,75.13999999999999,385.412,72.80699999999999,385.76099999999997]);
ctx.recodingOrder('bezierCurveTo',[72.661,385.787,72.515,385.797,72.369,385.797]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[78.785,403.395]);
ctx.recodingOrder('bezierCurveTo',[77.962,403.395,77.139,403.046,76.56099999999999,402.37199999999996]);
ctx.recodingOrder('bezierCurveTo',[75.50899999999999,401.143,75.64999999999999,399.294,76.87899999999999,398.24199999999996]);
ctx.recodingOrder('lineTo',[79.77499999999999,395.763]);
ctx.recodingOrder('bezierCurveTo',[80.999,394.71299999999997,82.853,394.852,83.90499999999999,396.08099999999996]);
ctx.recodingOrder('bezierCurveTo',[84.95699999999998,397.30999999999995,84.81599999999999,399.15899999999993,83.58699999999999,400.21099999999996]);
ctx.recodingOrder('lineTo',[80.69099999999999,402.68999999999994]);
ctx.recodingOrder('bezierCurveTo',[80.14,403.163,79.462,403.395,78.785,403.395]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[242.413,213.175]);
ctx.recodingOrder('bezierCurveTo',[242.34,213.175,242.27200000000002,213.173,242.205,213.167]);
ctx.recodingOrder('bezierCurveTo',[240.591,213.052,239.372,211.654,239.48600000000002,210.039]);
ctx.recodingOrder('lineTo',[239.913,203.82799999999997]);
ctx.recodingOrder('bezierCurveTo',[240.02200000000002,202.21099999999998,241.512,200.96899999999997,243.03300000000002,201.10399999999998]);
ctx.recodingOrder('bezierCurveTo',[244.64700000000002,201.213,245.866,202.60899999999998,245.757,204.224]);
ctx.recodingOrder('lineTo',[245.33,210.45]);
ctx.recodingOrder('bezierCurveTo',[245.22,211.995,243.934,213.175,242.413,213.175]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[252.334,213.178]);
ctx.recodingOrder('bezierCurveTo',[252.23,213.178,252.131,213.173,252.02700000000002,213.162]);
ctx.recodingOrder('bezierCurveTo',[250.417,212.995,249.251,211.555,249.418,209.949]);
ctx.recodingOrder('lineTo',[249.866,205.561]);
ctx.recodingOrder('bezierCurveTo',[250.03300000000002,203.949,251.502,202.806,253.079,202.949]);
ctx.recodingOrder('bezierCurveTo',[254.68900000000002,203.116,255.85500000000002,204.556,255.68800000000002,206.16500000000002]);
ctx.recodingOrder('lineTo',[255.24,210.54800000000003]);
ctx.recodingOrder('bezierCurveTo',[255.089,212.055,253.813,213.178,252.334,213.178]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[261.042,213.888]);
ctx.recodingOrder('bezierCurveTo',[260.792,213.888,260.537,213.854,260.282,213.787]);
ctx.recodingOrder('bezierCurveTo',[258.71999999999997,213.368,257.793,211.761,258.214,210.199]);
ctx.recodingOrder('lineTo',[258.813,207.952]);
ctx.recodingOrder('bezierCurveTo',[258.662,207.564,258.594,207.14,258.626,206.697]);
ctx.recodingOrder('bezierCurveTo',[258.70399999999995,205.585,259.464,204.486,260.496,204.061]);
ctx.recodingOrder('bezierCurveTo',[261.517,203.631,262.871,203.89700000000002,263.709,204.631]);
ctx.recodingOrder('bezierCurveTo',[264.719,205.522,265.157,206.907,264.818,208.167]);
ctx.recodingOrder('lineTo',[263.87,211.719]);
ctx.recodingOrder('bezierCurveTo',[263.521,213.027,262.334,213.888,261.042,213.888]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[270.656,215.375]);
ctx.recodingOrder('bezierCurveTo',[270.583,215.375,270.51,215.373,270.442,215.367]);
ctx.recodingOrder('bezierCurveTo',[268.82800000000003,215.25,267.61400000000003,213.849,267.729,212.237]);
ctx.recodingOrder('bezierCurveTo',[267.88,210.101,268.537,208.011,269.625,206.191]);
ctx.recodingOrder('bezierCurveTo',[270.453,204.8,272.255,204.347,273.64,205.175]);
ctx.recodingOrder('bezierCurveTo',[275.031,206.00300000000001,275.484,207.803,274.656,209.19]);
ctx.recodingOrder('bezierCurveTo',[274.037,210.232,273.661,211.429,273.573,212.653]);
ctx.recodingOrder('bezierCurveTo',[273.463,214.198,272.177,215.375,270.656,215.375]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[282.02,217.209]);
ctx.recodingOrder('bezierCurveTo',[281.806,217.209,281.58299999999997,217.185,281.364,217.13400000000001]);
ctx.recodingOrder('bezierCurveTo',[279.786,216.769,278.80199999999996,215.197,279.166,213.621]);
ctx.recodingOrder('bezierCurveTo',[279.536,212.03,280.14,210.517,280.963,209.12400000000002]);
ctx.recodingOrder('bezierCurveTo',[281.786,207.73900000000003,283.583,207.26700000000002,284.978,208.10000000000002]);
ctx.recodingOrder('bezierCurveTo',[286.369,208.92300000000003,286.827,210.72000000000003,286.004,212.11300000000003]);
ctx.recodingOrder('bezierCurveTo',[285.483,212.98500000000004,285.103,213.93600000000004,284.874,214.93800000000002]);
ctx.recodingOrder('bezierCurveTo',[284.562,216.292,283.354,217.209,282.02,217.209]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[291.551,219.779]);
ctx.recodingOrder('bezierCurveTo',[291.05699999999996,219.779,290.556,219.654,290.098,219.388]);
ctx.recodingOrder('bezierCurveTo',[288.692,218.58,288.213,216.792,289.015,215.388]);
ctx.recodingOrder('lineTo',[290.484,212.83100000000002]);
ctx.recodingOrder('bezierCurveTo',[291.292,211.43300000000002,293.08799999999997,210.943,294.484,211.75300000000001]);
ctx.recodingOrder('bezierCurveTo',[295.89,212.561,296.36899999999997,214.34900000000002,295.567,215.75300000000001]);
ctx.recodingOrder('lineTo',[294.098,218.31]);
ctx.recodingOrder('bezierCurveTo',[293.556,219.25,292.567,219.779,291.551,219.779]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[175.114,220.877]);
ctx.recodingOrder('bezierCurveTo',[174.171,220.877,173.25,220.42600000000002,172.68200000000002,219.591]);
ctx.recodingOrder('bezierCurveTo',[171.562,217.935,170.781,216.026,170.42700000000002,214.068]);
ctx.recodingOrder('bezierCurveTo',[170.13500000000002,212.47400000000002,171.193,210.95100000000002,172.78100000000003,210.66000000000003]);
ctx.recodingOrder('bezierCurveTo',[174.33800000000002,210.39400000000003,175.90100000000004,211.42300000000003,176.18700000000004,213.01600000000002]);
ctx.recodingOrder('bezierCurveTo',[176.40100000000004,214.18300000000002,176.86400000000003,215.318,177.53600000000003,216.305]);
ctx.recodingOrder('bezierCurveTo',[178.44200000000004,217.64600000000002,178.08800000000002,219.467,176.75000000000003,220.372]);
ctx.recodingOrder('bezierCurveTo',[176.25,220.714,175.676,220.877,175.114,220.877]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[182.822,217.209]);
ctx.recodingOrder('bezierCurveTo',[182.812,217.209,182.80100000000002,217.209,182.79,217.209]);
ctx.recodingOrder('bezierCurveTo',[181.17,217.18800000000002,179.874,215.863,179.894,214.246]);
ctx.recodingOrder('bezierCurveTo',[179.894,213.931,179.8,213.603,179.62800000000001,213.347]);
ctx.recodingOrder('bezierCurveTo',[178.73200000000003,212.001,179.097,210.18300000000002,180.44000000000003,209.28400000000002]);
ctx.recodingOrder('bezierCurveTo',[181.78900000000002,208.383,183.61200000000002,208.75300000000001,184.50200000000004,210.09600000000003]);
ctx.recodingOrder('bezierCurveTo',[185.32500000000005,211.32800000000003,185.76800000000003,212.82500000000005,185.74700000000004,214.31200000000004]);
ctx.recodingOrder('bezierCurveTo',[185.733,215.919,184.426,217.209,182.822,217.209]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[206.565,604.539]);
ctx.recodingOrder('bezierCurveTo',[206.419,604.539,206.279,604.529,206.132,604.507]);
ctx.recodingOrder('bezierCurveTo',[204.528,604.27,203.424,602.78,203.663,601.179]);
ctx.recodingOrder('lineTo',[204.47500000000002,595.697]);
ctx.recodingOrder('bezierCurveTo',[204.70900000000003,594.095,206.21000000000004,592.996,207.79800000000003,593.228]);
ctx.recodingOrder('bezierCurveTo',[209.40200000000004,593.4649999999999,210.50600000000003,594.9549999999999,210.26700000000002,596.5559999999999]);
ctx.recodingOrder('lineTo',[209.455,602.0379999999999]);
ctx.recodingOrder('bezierCurveTo',[209.242,603.492,207.992,604.539,206.565,604.539]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[215.758,606.742]);
ctx.recodingOrder('bezierCurveTo',[214.138,606.742,212.83100000000002,605.43,212.83100000000002,603.812]);
ctx.recodingOrder('lineTo',[212.83100000000002,599.052]);
ctx.recodingOrder('bezierCurveTo',[212.83100000000002,597.4350000000001,214.138,596.1220000000001,215.758,596.1220000000001]);
ctx.recodingOrder('bezierCurveTo',[217.377,596.1220000000001,218.685,597.4340000000001,218.685,599.052]);
ctx.recodingOrder('lineTo',[218.685,603.812]);
ctx.recodingOrder('bezierCurveTo',[218.685,605.429,217.378,606.742,215.758,606.742]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[224.909,608.205]);
ctx.recodingOrder('bezierCurveTo',[223.289,608.205,221.982,606.893,221.982,605.2750000000001]);
ctx.recodingOrder('lineTo',[221.982,600.5150000000001]);
ctx.recodingOrder('bezierCurveTo',[221.982,598.8980000000001,223.289,597.5850000000002,224.909,597.5850000000002]);
ctx.recodingOrder('bezierCurveTo',[226.528,597.5850000000002,227.83599999999998,598.8970000000002,227.83599999999998,600.5150000000001]);
ctx.recodingOrder('lineTo',[227.83599999999998,605.2750000000001]);
ctx.recodingOrder('bezierCurveTo',[227.835,606.893,226.528,608.205,224.909,608.205]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[235.132,608.596]);
ctx.recodingOrder('bezierCurveTo',[234.309,608.596,233.491,608.25,232.90800000000002,607.575]);
ctx.recodingOrder('bezierCurveTo',[231.596,606.047,231.11200000000002,603.893,231.638,601.95]);
ctx.recodingOrder('bezierCurveTo',[232.065,600.3900000000001,233.648,599.469,235.237,599.8960000000001]);
ctx.recodingOrder('bezierCurveTo',[236.799,600.321,237.716,601.9300000000001,237.29399999999998,603.4920000000001]);
ctx.recodingOrder('bezierCurveTo',[237.273,603.565,237.30399999999997,603.6980000000001,237.356,603.758]);
ctx.recodingOrder('bezierCurveTo',[238.408,604.985,238.267,606.8330000000001,237.03799999999998,607.888]);
ctx.recodingOrder('bezierCurveTo',[236.486,608.361,235.809,608.596,235.132,608.596]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[246.141,608.939]);
ctx.recodingOrder('bezierCurveTo',[245.047,608.939,244.001,608.324,243.501,607.2719999999999]);
ctx.recodingOrder('lineTo',[241.735,603.5769999999999]);
ctx.recodingOrder('bezierCurveTo',[241.037,602.1159999999999,241.65200000000002,600.3689999999999,243.115,599.6709999999999]);
ctx.recodingOrder('bezierCurveTo',[244.568,598.973,246.323,599.588,247.01500000000001,601.0509999999999]);
ctx.recodingOrder('lineTo',[248.781,604.746]);
ctx.recodingOrder('bezierCurveTo',[249.479,606.207,248.864,607.954,247.401,608.6519999999999]);
ctx.recodingOrder('bezierCurveTo',[246.996,608.848,246.569,608.939,246.141,608.939]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[256.068,608.554]);
ctx.recodingOrder('bezierCurveTo',[254.94799999999998,608.554,253.88099999999997,607.905,253.391,606.817]);
ctx.recodingOrder('lineTo',[251.928,603.504]);
ctx.recodingOrder('bezierCurveTo',[251.277,602.022,251.94899999999998,600.293,253.433,599.642]);
ctx.recodingOrder('bezierCurveTo',[254.896,599.0070000000001,256.63599999999997,599.663,257.292,601.1450000000001]);
ctx.recodingOrder('lineTo',[258.74499999999995,604.431]);
ctx.recodingOrder('bezierCurveTo',[259.40099999999995,605.9100000000001,258.73999999999995,607.642,257.26099999999997,608.298]);
ctx.recodingOrder('bezierCurveTo',[256.87,608.474,256.469,608.554,256.068,608.554]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[266.62,605.297]);
ctx.recodingOrder('bezierCurveTo',[265.635,605.297,264.677,604.8050000000001,264.125,603.909]);
ctx.recodingOrder('bezierCurveTo',[263.844,603.459,263.495,603.0649999999999,263.078,602.742]);
ctx.recodingOrder('bezierCurveTo',[261.80199999999996,601.747,261.578,599.906,262.573,598.63]);
ctx.recodingOrder('bezierCurveTo',[263.573,597.36,265.411,597.133,266.68199999999996,598.122]);
ctx.recodingOrder('bezierCurveTo',[267.645,598.872,268.45799999999997,599.781,269.104,600.8249999999999]);
ctx.recodingOrder('bezierCurveTo',[269.95799999999997,602.1999999999999,269.531,604.0049999999999,268.156,604.8559999999999]);
ctx.recodingOrder('bezierCurveTo',[267.677,605.154,267.146,605.297,266.62,605.297]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[277.562,602.044]);
ctx.recodingOrder('bezierCurveTo',[276.781,602.044,276.005,601.732,275.426,601.117]);
ctx.recodingOrder('lineTo',[273.296,598.841]);
ctx.recodingOrder('bezierCurveTo',[272.197,597.659,272.26,595.804,273.447,594.703]);
ctx.recodingOrder('bezierCurveTo',[274.624,593.5939999999999,276.484,593.669,277.587,594.852]);
ctx.recodingOrder('lineTo',[279.697,597.112]);
ctx.recodingOrder('bezierCurveTo',[280.806,598.2909999999999,280.744,600.1429999999999,279.567,601.25]);
ctx.recodingOrder('bezierCurveTo',[278.999,601.781,278.281,602.044,277.562,602.044]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[288.598,596.87]);
ctx.recodingOrder('bezierCurveTo',[287.999,596.87,287.39500000000004,596.687,286.874,596.3100000000001]);
ctx.recodingOrder('lineTo',[285.15500000000003,595.0600000000001]);
ctx.recodingOrder('bezierCurveTo',[283.848,594.1070000000001,283.56100000000004,592.2760000000001,284.509,590.9670000000001]);
ctx.recodingOrder('bezierCurveTo',[285.462,589.6550000000001,287.296,589.373,288.60200000000003,590.3210000000001]);
ctx.recodingOrder('lineTo',[290.321,591.5710000000001]);
ctx.recodingOrder('bezierCurveTo',[291.62800000000004,592.5240000000001,291.915,594.3550000000001,290.96700000000004,595.6640000000001]);
ctx.recodingOrder('bezierCurveTo',[290.395,596.45,289.499,596.87,288.598,596.87]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[187.525,596.815]);
ctx.recodingOrder('bezierCurveTo',[186.806,596.815,186.088,596.552,185.525,596.0260000000001]);
ctx.recodingOrder('bezierCurveTo',[184.34300000000002,594.9190000000001,184.28,593.0680000000001,185.38400000000001,591.8860000000001]);
ctx.recodingOrder('bezierCurveTo',[185.24300000000002,590.2740000000001,186.358,589.0760000000001,187.967,588.936]);
ctx.recodingOrder('bezierCurveTo',[189.644,588.832,190.91500000000002,590.2090000000001,191.061,591.821]);
ctx.recodingOrder('bezierCurveTo',[191.191,593.316,190.681,594.798,189.66500000000002,595.8860000000001]);
ctx.recodingOrder('bezierCurveTo',[189.087,596.503,188.306,596.815,187.525,596.815]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[269.557,648.844]);
ctx.recodingOrder('bezierCurveTo',[268.20300000000003,648.844,266.98400000000004,647.8960000000001,266.69800000000004,646.5160000000001]);
ctx.recodingOrder('lineTo',[266.151,643.9140000000001]);
ctx.recodingOrder('bezierCurveTo',[265.818,642.3310000000001,266.82800000000003,640.7790000000001,268.41200000000003,640.445]);
ctx.recodingOrder('bezierCurveTo',[269.97400000000005,640.138,271.552,641.125,271.88100000000003,642.71]);
ctx.recodingOrder('lineTo',[272.42800000000005,645.312]);
ctx.recodingOrder('bezierCurveTo',[272.7610000000001,646.892,271.75100000000003,648.447,270.16700000000003,648.7810000000001]);
ctx.recodingOrder('bezierCurveTo',[269.964,648.823,269.76,648.844,269.557,648.844]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[279.124,647.339]);
ctx.recodingOrder('bezierCurveTo',[278.473,647.339,277.817,647.123,277.27500000000003,646.6800000000001]);
ctx.recodingOrder('bezierCurveTo',[275.764,645.451,275.20700000000005,643.3290000000001,275.91600000000005,641.5190000000001]);
ctx.recodingOrder('bezierCurveTo',[276.50500000000005,640.0140000000001,278.208,639.2640000000001,279.7130000000001,639.8600000000001]);
ctx.recodingOrder('bezierCurveTo',[280.93700000000007,640.3390000000002,281.65600000000006,641.5470000000001,281.56700000000006,642.7920000000001]);
ctx.recodingOrder('bezierCurveTo',[282.2540000000001,643.8340000000002,282.22300000000007,645.2420000000002,281.39500000000004,646.2610000000002]);
ctx.recodingOrder('bezierCurveTo',[280.817,646.969,279.973,647.339,279.124,647.339]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[287.083,646.219]);
ctx.recodingOrder('bezierCurveTo',[285.875,646.219,284.76500000000004,645.4820000000001,284.36400000000003,644.264]);
ctx.recodingOrder('lineTo',[284.01000000000005,643.2040000000001]);
ctx.recodingOrder('bezierCurveTo',[283.48400000000004,641.6730000000001,284.302,640.009,285.833,639.4830000000001]);
ctx.recodingOrder('bezierCurveTo',[287.369,638.9590000000001,289.031,639.7750000000001,289.552,641.3030000000001]);
ctx.recodingOrder('lineTo',[289.88500000000005,642.3000000000001]);
ctx.recodingOrder('bezierCurveTo',[290.39000000000004,643.836,289.57300000000004,645.5600000000001,288.03600000000006,646.065]);
ctx.recodingOrder('bezierCurveTo',[287.718,646.17,287.395,646.219,287.083,646.219]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[296.051,643.56]);
ctx.recodingOrder('bezierCurveTo',[295.082,643.56,294.192,643.0809999999999,293.697,642.131]);
ctx.recodingOrder('bezierCurveTo',[293.697,642.126,293.328,641.391,293.322,641.389]);
ctx.recodingOrder('bezierCurveTo',[292.588,639.946,293.161,638.183,294.598,637.447]);
ctx.recodingOrder('bezierCurveTo',[296.035,636.728,297.801,637.28,298.54,638.725]);
ctx.recodingOrder('bezierCurveTo',[298.54,638.73,298.71200000000005,639.0640000000001,298.71200000000005,639.0690000000001]);
ctx.recodingOrder('bezierCurveTo',[299.43600000000004,640.5090000000001,298.96200000000005,642.465,297.52500000000003,643.196]);
ctx.recodingOrder('bezierCurveTo',[297.046,643.44,296.54,643.56,296.051,643.56]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[173.65,646.63]);
ctx.recodingOrder('bezierCurveTo',[172.442,646.63,171.312,645.878,170.89000000000001,644.675]);
ctx.recodingOrder('lineTo',[170.234,642.818]);
ctx.recodingOrder('bezierCurveTo',[169.692,641.295,170.494,639.62,172.02,639.081]);
ctx.recodingOrder('bezierCurveTo',[173.55100000000002,638.5450000000001,175.21800000000002,639.347,175.75400000000002,640.87]);
ctx.recodingOrder('lineTo',[176.41000000000003,642.727]);
ctx.recodingOrder('bezierCurveTo',[176.95200000000003,644.25,176.15000000000003,645.925,174.62400000000002,646.4639999999999]);
ctx.recodingOrder('bezierCurveTo',[174.301,646.576,173.973,646.63,173.65,646.63]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[182.056,648.097]);
ctx.recodingOrder('bezierCurveTo',[180.71800000000002,648.097,179.50900000000001,647.17,179.202,645.805]);
ctx.recodingOrder('lineTo',[178.837,644.12]);
ctx.recodingOrder('bezierCurveTo',[178.498,642.537,179.488,640.899,181.066,640.5600000000001]);
ctx.recodingOrder('bezierCurveTo',[182.62800000000001,640.2270000000001,184.191,641.1460000000001,184.529,642.729]);
ctx.recodingOrder('lineTo',[184.56,642.89]);
ctx.recodingOrder('lineTo',[184.919,644.528]);
ctx.recodingOrder('bezierCurveTo',[185.27300000000002,646.106,184.27800000000002,647.671,182.69500000000002,648.025]);
ctx.recodingOrder('bezierCurveTo',[182.483,648.073,182.27,648.097,182.056,648.097]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[191.478,648.862]);
ctx.recodingOrder('bezierCurveTo',[190.21200000000002,648.862,189.04600000000002,648.036,188.67100000000002,646.7629999999999]);
ctx.recodingOrder('lineTo',[188.34300000000002,645.6979999999999]);
ctx.recodingOrder('bezierCurveTo',[187.864,644.1539999999999,188.723,642.5109999999999,190.26500000000001,642.0289999999999]);
ctx.recodingOrder('bezierCurveTo',[191.822,641.5499999999998,193.45700000000002,642.4119999999999,193.937,643.9529999999999]);
ctx.recodingOrder('lineTo',[194.286,645.1009999999999]);
ctx.recodingOrder('bezierCurveTo',[194.744,646.6529999999999,193.859,648.2809999999998,192.312,648.7409999999999]);
ctx.recodingOrder('bezierCurveTo',[192.03,648.823,191.754,648.862,191.478,648.862]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');

ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E7EAEB";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[203.091,648.49]);
ctx.recodingOrder('bezierCurveTo',[201.648,648.49,200.393,647.425,200.19500000000002,645.956]);
ctx.recodingOrder('lineTo',[199.99200000000002,644.469]);
ctx.recodingOrder('bezierCurveTo',[199.77300000000002,642.8670000000001,200.89300000000003,641.3910000000001,202.497,641.172]);
ctx.recodingOrder('bezierCurveTo',[204.07500000000002,640.961,205.57500000000002,642.07,205.794,643.677]);
ctx.recodingOrder('lineTo',[205.997,645.164]);
ctx.recodingOrder('bezierCurveTo',[206.215,646.768,205.096,648.245,203.49200000000002,648.461]);
ctx.recodingOrder('bezierCurveTo',[203.357,648.48,203.227,648.49,203.091,648.49]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');



	// <<== 正式内容
	
	drawComponentToCanvas();

	return component;
}
