

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

map['0']= {name : '双手+肚子',x:112,y:476,w:220,h:52,zIndex:0};
map['1']= {name : '裤子',x:172,y:502,w:123,h:40,zIndex:1,color:'#FFFFFF'};
map['2']= {name : '衣服',x:114,y:416,w:256,h:57,zIndex:11};
map['3']= {name : '脸部',x:88,y:255,w:276,h:157,zIndex:9};
map['4']= {name : '头发',x:66,y:106,w:325,h:311,zIndex:8};
map['5']= {name : '帽檐',x:7,y:47,w:448,h:396,zIndex:7};

map['34']= {name : '左犄角',x:2,y:25,w:118,h:98,zIndex:8};
map['35']= {name : '右犄角',x:349,y:27,w:111,h:94,zIndex:8};

map['48']= {name : '左袜子',x:180,y:578,w:50,h:74};
map['47']= {name : '右袜子',x:221,y:582,w:61,h:83};

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


ctx.fillStyle="#F3E2D5";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[327.009,495.97]);
ctx.recodingOrder('bezierCurveTo',[311.3,486.24800000000005,308.461,476.459,308.461,476.459]);
ctx.recodingOrder('lineTo',[295.872,481.493]);
ctx.recodingOrder('lineTo',[293.69,479.109]);
ctx.recodingOrder('lineTo',[259.75,477.775]);
ctx.recodingOrder('lineTo',[236.691,477.007]);
ctx.recodingOrder('lineTo',[236.691,462.234]);
ctx.recodingOrder('lineTo',[232.924,462.234]);
ctx.recodingOrder('lineTo',[232.924,450.99]);
ctx.recodingOrder('lineTo',[225.525,450.99]);
ctx.recodingOrder('lineTo',[225.525,462.23400000000004]);
ctx.recodingOrder('lineTo',[223.258,462.23400000000004]);
ctx.recodingOrder('lineTo',[223.258,476.559]);
ctx.recodingOrder('lineTo',[171.247,474.826]);
ctx.recodingOrder('lineTo',[162.401,488.20300000000003]);
ctx.recodingOrder('lineTo',[150.228,485.70700000000005]);
ctx.recodingOrder('bezierCurveTo',[150.228,485.70700000000005,121.74100000000001,504.898,122.83300000000001,517.051]);
ctx.recodingOrder('bezierCurveTo',[123.92500000000001,529.2040000000001,140.49800000000002,532.316,148.616,522.981]);
ctx.recodingOrder('bezierCurveTo',[148.616,522.981,155.447,532.894,162.858,524.12]);
ctx.recodingOrder('bezierCurveTo',[170.27,515.347,178.832,503.87,181.818,492.185]);
ctx.recodingOrder('lineTo',[172.68,490.311]);
ctx.recodingOrder('lineTo',[173.035,490.041]);
ctx.recodingOrder('lineTo',[189.828,490.106]);
ctx.recodingOrder('lineTo',[202.356,492.109]);
ctx.recodingOrder('bezierCurveTo',[199.037,492.055,195.59,491.976,191.986,491.86199999999997]);
ctx.recodingOrder('lineTo',[184.963,508.01399999999995]);
ctx.recodingOrder('bezierCurveTo',[184.963,508.01399999999995,188.966,510.26699999999994,195.982,512.534]);
ctx.recodingOrder('lineTo',[191.778,524.5889999999999]);
ctx.recodingOrder('lineTo',[185.165,521.41]);
ctx.recodingOrder('bezierCurveTo',[184.832,530.871,176.267,525.871,176.267,525.871]);
ctx.recodingOrder('bezierCurveTo',[167.239,532.625,173.141,547.786,173.141,547.786]);
ctx.recodingOrder('bezierCurveTo',[195.637,545.737,222.51299999999998,549.1679999999999,222.51299999999998,549.1679999999999]);
ctx.recodingOrder('lineTo',[221.14299999999997,538.7039999999998]);
ctx.recodingOrder('lineTo',[207.40099999999998,532.0979999999998]);
ctx.recodingOrder('lineTo',[235.843,528.4249999999998]);
ctx.recodingOrder('lineTo',[249.66899999999998,533.0409999999998]);
ctx.recodingOrder('bezierCurveTo',[244.62199999999999,535.6289999999998,238.89399999999998,537.7929999999998,232.57299999999998,538.9729999999998]);
ctx.recodingOrder('lineTo',[232.86499999999998,549.1679999999999]);
ctx.recodingOrder('bezierCurveTo',[232.86499999999998,549.1679999999999,275.40599999999995,548.5139999999999,290.64799999999997,554.9249999999998]);
ctx.recodingOrder('bezierCurveTo',[290.64799999999997,554.9249999999998,292.284,532.8079999999999,287.018,522.1459999999998]);
ctx.recodingOrder('bezierCurveTo',[287.018,522.1459999999998,281.34099999999995,526.5559999999998,278.66099999999994,521.9409999999998]);
ctx.recodingOrder('lineTo',[274.13199999999995,513.2549999999998]);
ctx.recodingOrder('bezierCurveTo',[274.13199999999995,513.2549999999998,271.88199999999995,516.2099999999998,267.7169999999999,520.1529999999998]);
ctx.recodingOrder('lineTo',[262.2079999999999,510.1089999999998]);
ctx.recodingOrder('bezierCurveTo',[267.0789999999999,508.2099999999998,272.0689999999999,505.8669999999998,277.1489999999999,502.9859999999998]);
ctx.recodingOrder('lineTo',[272.3699999999999,487.0969999999998]);
ctx.recodingOrder('lineTo',[287.6779999999999,484.0619999999998]);
ctx.recodingOrder('lineTo',[288.5909999999999,484.4049999999998]);
ctx.recodingOrder('lineTo',[282.10399999999987,486.9989999999998]);
ctx.recodingOrder('bezierCurveTo',[282.10399999999987,486.9989999999998,294.5749999999999,526.2109999999998,308.89499999999987,526.8949999999998]);
ctx.recodingOrder('lineTo',[314.77499999999986,522.8939999999998]);
ctx.recodingOrder('bezierCurveTo',[314.77499999999986,522.8939999999998,340.5769999999999,536.9969999999997,342.51299999999986,514.6669999999998]);
ctx.recodingOrder('bezierCurveTo',[342.51,514.667,342.718,505.691,327.009,495.97]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[262.998,488.954]);
ctx.recodingOrder('lineTo',[269.917,487.582]);
ctx.recodingOrder('bezierCurveTo',[268.404,487.948,266.137,488.435,262.998,488.954]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#E74966";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[291.969,511.345]);
ctx.recodingOrder('bezierCurveTo',[288.836,507.19500000000005,284.325,504.10400000000004,279.324,502.68100000000004]);
ctx.recodingOrder('bezierCurveTo',[279.36,504.45500000000004,279.822,506.446,280.50100000000003,508.408]);
ctx.recodingOrder('lineTo',[279.052,508.96000000000004]);
ctx.recodingOrder('lineTo',[275.571,503.84400000000005]);
ctx.recodingOrder('bezierCurveTo',[275.386,506.02200000000005,275.22400000000005,508.22,275.23900000000003,510.41300000000007]);
ctx.recodingOrder('lineTo',[274.32700000000006,510.76000000000005]);
ctx.recodingOrder('bezierCurveTo',[274.619,507.84200000000004,275.11600000000004,504.94500000000005,275.857,502.10800000000006]);
ctx.recodingOrder('bezierCurveTo',[248.211,516.2410000000001,214.75700000000003,518.417,185.45700000000002,508.18800000000005]);
ctx.recodingOrder('bezierCurveTo',[185.449,507.80300000000005,185.46300000000002,507.41700000000003,185.45300000000003,507.03200000000004]);
ctx.recodingOrder('lineTo',[184.96100000000004,508.01300000000003]);
ctx.recodingOrder('bezierCurveTo',[184.35900000000004,507.79900000000004,183.75100000000003,507.59900000000005,183.15200000000004,507.374]);
ctx.recodingOrder('lineTo',[182.39200000000005,506.692]);
ctx.recodingOrder('bezierCurveTo',[182.28700000000006,506.758,182.19400000000005,506.84000000000003,182.09100000000007,506.907]);
ctx.recodingOrder('lineTo',[181.81000000000006,506.65799999999996]);
ctx.recodingOrder('bezierCurveTo',[181.81200000000007,506.806,181.81400000000005,506.95399999999995,181.81700000000006,507.10099999999994]);
ctx.recodingOrder('bezierCurveTo',[178.53700000000006,509.28299999999996,175.74600000000007,512.165,173.51700000000005,515.4169999999999]);
ctx.recodingOrder('bezierCurveTo',[172.92300000000006,516.2819999999999,172.35400000000004,517.2049999999999,172.19000000000005,518.242]);
ctx.recodingOrder('bezierCurveTo',[172.02600000000007,519.2779999999999,172.35900000000007,520.459,173.24500000000006,521.021]);
ctx.recodingOrder('bezierCurveTo',[174.02000000000007,521.5129999999999,175.05100000000007,521.433,175.88400000000007,521.05]);
ctx.recodingOrder('bezierCurveTo',[176.71700000000007,520.6659999999999,177.39600000000007,520.02,178.05900000000008,519.386]);
ctx.recodingOrder('bezierCurveTo',[179.0020000000001,518.483,179.90300000000008,517.457,180.7680000000001,516.385]);
ctx.recodingOrder('lineTo',[178.8710000000001,520.174]);
ctx.recodingOrder('bezierCurveTo',[178.4120000000001,522.742,178.4260000000001,528.201,182.5660000000001,526.858]);
ctx.recodingOrder('bezierCurveTo',[184.8780000000001,526.108,185.02900000000008,523.4449999999999,185.1620000000001,521.4079999999999]);
ctx.recodingOrder('bezierCurveTo',[188.7420000000001,524.3399999999999,194.2410000000001,527.7749999999999,195.64200000000008,528.8079999999999]);
ctx.recodingOrder('bezierCurveTo',[200.29100000000008,532.2339999999999,205.46100000000007,533.7549999999999,210.73800000000008,536.1079999999998]);
ctx.recodingOrder('bezierCurveTo',[216.2630000000001,538.5709999999998,222.0240000000001,541.0959999999999,228.27200000000008,541.2919999999998]);
ctx.recodingOrder('bezierCurveTo',[233.36800000000008,541.4519999999998,238.37500000000009,539.8879999999998,243.05900000000008,537.8769999999998]);
ctx.recodingOrder('bezierCurveTo',[254.9240000000001,532.7849999999999,265.2840000000001,524.5939999999998,274.0390000000001,515.1049999999998]);
ctx.recodingOrder('bezierCurveTo',[274.0500000000001,514.5969999999998,274.0930000000001,514.0909999999998,274.1180000000001,513.5839999999998]);
ctx.recodingOrder('lineTo',[275.4010000000001,513.5049999999999]);
ctx.recodingOrder('bezierCurveTo',[275.42900000000014,513.7849999999999,275.4540000000001,514.0639999999999,275.4900000000001,514.3429999999998]);
ctx.recodingOrder('bezierCurveTo',[275.8540000000001,517.1249999999999,276.2310000000001,520.1409999999998,278.6570000000001,521.9399999999998]);
ctx.recodingOrder('bezierCurveTo',[282.1590000000001,524.5379999999998,285.5430000000001,521.8789999999998,285.3700000000001,518.2479999999998]);
ctx.recodingOrder('lineTo',[281.38100000000014,512.3839999999998]);
ctx.recodingOrder('lineTo',[282.03900000000016,512.0849999999998]);
ctx.recodingOrder('bezierCurveTo',[282.60100000000017,513.2209999999998,283.2040000000002,514.2889999999998,283.81100000000015,515.2159999999998]);
ctx.recodingOrder('bezierCurveTo',[286.10200000000015,518.7109999999998,289.01000000000016,521.0059999999997,293.1630000000001,521.4679999999997]);
ctx.recodingOrder('bezierCurveTo',[293.43600000000015,521.4989999999997,293.73200000000014,521.5069999999997,293.9620000000001,521.3569999999997]);
ctx.recodingOrder('bezierCurveTo',[294.1770000000001,521.2159999999998,294.2880000000001,520.9629999999997,294.3720000000001,520.7199999999998]);
ctx.recodingOrder('bezierCurveTo',[295.48,517.545,293.995,514.029,291.969,511.345]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#E74966";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[295.663,416.296]);
ctx.recodingOrder('bezierCurveTo',[297.079,419.207,298.495,422.118,299.911,425.028]);
ctx.recodingOrder('lineTo',[295.712,425.975]);
ctx.recodingOrder('bezierCurveTo',[294.253,423.081,292.795,420.187,291.336,417.293]);
ctx.recodingOrder('bezierCurveTo',[277.514,433.454,256.32,443.045,235.056,442.76]);
ctx.recodingOrder('bezierCurveTo',[235.19,443.247,235.31400000000002,443.73699999999997,235.44500000000002,444.22499999999997]);
ctx.recodingOrder('lineTo',[223.318,443.98199999999997]);
ctx.recodingOrder('bezierCurveTo',[223.466,443.301,223.598,442.616,223.751,441.93499999999995]);
ctx.recodingOrder('bezierCurveTo',[205.263,438.6139999999999,187.163,433.14099999999996,169.931,425.66399999999993]);
ctx.recodingOrder('bezierCurveTo',[168.744,425.14899999999994,167.461,424.61299999999994,166.19500000000002,424.88199999999995]);
ctx.recodingOrder('bezierCurveTo',[165.04200000000003,425.12699999999995,164.13400000000001,425.99499999999995,163.32100000000003,426.84899999999993]);
ctx.recodingOrder('bezierCurveTo',[160.96600000000004,429.32399999999996,158.84400000000002,432.01499999999993,156.961,434.86499999999995]);
ctx.recodingOrder('lineTo',[154.525,434.62199999999996]);
ctx.recodingOrder('bezierCurveTo',[154.71,434.34999999999997,154.91,434.08699999999993,155.092,433.81299999999993]);
ctx.recodingOrder('bezierCurveTo',[156.619,431.51199999999994,158.06400000000002,429.0969999999999,160.155,427.29099999999994]);
ctx.recodingOrder('bezierCurveTo',[162.28,425.4529999999999,165.371,423.37699999999995,164.487,420.70899999999995]);
ctx.recodingOrder('bezierCurveTo',[153.029,427.33199999999994,141.571,433.95699999999994,130.113,440.57899999999995]);
ctx.recodingOrder('bezierCurveTo',[125.252,443.38899999999995,120.314,446.22999999999996,114.879,447.63599999999997]);
ctx.recodingOrder('bezierCurveTo',[122.51,445.419,130.381,444.03299999999996,138.31,443.513]);
ctx.recodingOrder('bezierCurveTo',[141.108,443.32899999999995,143.928,443.251,146.674,442.688]);
ctx.recodingOrder('bezierCurveTo',[147.336,442.55199999999996,148.00300000000001,442.384,148.579,442.032]);
ctx.recodingOrder('bezierCurveTo',[149.193,441.65799999999996,149.667,441.097,150.124,440.53999999999996]);
ctx.recodingOrder('bezierCurveTo',[150.345,440.27099999999996,150.548,439.98799999999994,150.765,439.71599999999995]);
ctx.recodingOrder('lineTo',[154.07199999999997,439.71599999999995]);
ctx.recodingOrder('bezierCurveTo',[150.71399999999997,446.02899999999994,148.48599999999996,452.94499999999994,147.60299999999998,460.042]);
ctx.recodingOrder('bezierCurveTo',[169.35899999999998,471.094,194.62199999999999,475.10699999999997,218.73299999999998,471.339]);
ctx.recodingOrder('bezierCurveTo',[219.599,463.938,220.75699999999998,456.571,222.20199999999997,449.261]);
ctx.recodingOrder('lineTo',[236.66199999999998,449.024]);
ctx.recodingOrder('bezierCurveTo',[238.44599999999997,456.476,239.783,464.034,240.64899999999997,471.647]);
ctx.recodingOrder('bezierCurveTo',[249.753,469.805,258.85699999999997,467.96299999999997,267.96099999999996,466.121]);
ctx.recodingOrder('bezierCurveTo',[282.222,463.23499999999996,296.70599999999996,460.272,309.5799999999999,453.493]);
ctx.recodingOrder('bezierCurveTo',[305.9919999999999,446.373,302.4029999999999,439.254,298.81499999999994,432.134]);
ctx.recodingOrder('lineTo',[302.92099999999994,431.218]);
ctx.recodingOrder('bezierCurveTo',[302.99799999999993,431.37600000000003,303.07499999999993,431.534,303.15199999999993,431.69300000000004]);
ctx.recodingOrder('bezierCurveTo',[303.71399999999994,432.84900000000005,304.2969999999999,434.03400000000005,305.2389999999999,434.90900000000005]);
ctx.recodingOrder('bezierCurveTo',[306.67599999999993,436.244,308.7159999999999,436.66,310.6449999999999,437.0210000000001]);
ctx.recodingOrder('bezierCurveTo',[330.4149999999999,440.7220000000001,350.56499999999994,444.4360000000001,370.52699999999993,441.97800000000007]);
ctx.recodingOrder('bezierCurveTo',[345.944,432.382,320.961,423.812,295.663,416.296]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#F3E2D5";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[97.069,256.742]);
ctx.recodingOrder('bezierCurveTo',[97.069,256.742,73.171,302.32800000000003,106.44,330.365]);
ctx.recodingOrder('bezierCurveTo',[139.709,358.402,98.068,376.693,98.068,376.693]);
ctx.recodingOrder('bezierCurveTo',[98.068,376.693,113.55799999999999,405.067,147.603,409.46799999999996]);
ctx.recodingOrder('lineTo',[169.517,410.44899999999996]);
ctx.recodingOrder('bezierCurveTo',[169.517,410.44899999999996,175.368,399.20399999999995,210.301,409.46799999999996]);
ctx.recodingOrder('bezierCurveTo',[245.23399999999998,419.73199999999997,274.596,393.60799999999995,311.54999999999995,404.64]);
ctx.recodingOrder('bezierCurveTo',[311.54999999999995,404.64,334.8539999999999,390.168,345.51199999999994,380.59799999999996]);
ctx.recodingOrder('bezierCurveTo',[345.51199999999994,380.59799999999996,311.05799999999994,361.07399999999996,335.19199999999995,343.7289999999999]);
ctx.recodingOrder('bezierCurveTo',[359.32699999999994,326.3829999999999,366.72599999999994,282.76899999999995,363.25199999999995,255.64699999999993]);
ctx.recodingOrder('bezierCurveTo',[363.252,255.647,184.305,261.51,97.069,256.742]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#9F524C";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[268.018,106.69]);
ctx.recodingOrder('bezierCurveTo',[268.018,106.69,95.21899999999997,106.712,72.81899999999996,258.036]);
ctx.recodingOrder('bezierCurveTo',[72.81899999999996,258.036,44.73299999999996,378.453,108.45499999999996,413.749]);
ctx.recodingOrder('bezierCurveTo',[108.45499999999996,413.749,122.05499999999995,421.757,144.41099999999994,411.5]);
ctx.recodingOrder('bezierCurveTo',[144.41099999999994,411.5,111.21499999999995,398.86,96.82499999999995,378.18]);
ctx.recodingOrder('bezierCurveTo',[96.82499999999995,378.18,132.88599999999994,354.812,114.87699999999995,339.245]);
ctx.recodingOrder('bezierCurveTo',[96.86799999999995,323.677,76.07399999999996,304.803,97.06799999999996,256.743]);
ctx.recodingOrder('bezierCurveTo',[97.06799999999996,256.743,218.17599999999996,260.544,365.18899999999996,255.583]);
ctx.recodingOrder('bezierCurveTo',[365.18899999999996,255.583,370.58399999999995,311.019,335.19199999999995,343.73]);
ctx.recodingOrder('bezierCurveTo',[335.19199999999995,343.73,313.20699999999994,359.82,345.51199999999994,378.728]);
ctx.recodingOrder('bezierCurveTo',[345.51199999999994,378.728,324.65299999999996,400.373,311.54999999999995,404.642]);
ctx.recodingOrder('bezierCurveTo',[311.54999999999995,404.642,369.99699999999996,414.26099999999997,379.14399999999995,387.873]);
ctx.recodingOrder('bezierCurveTo',[379.14399999999995,387.873,413.94899999999996,307.887,364.76699999999994,217.474]);
ctx.recodingOrder('bezierCurveTo',[364.766,217.472,319.664,114.281,268.018,106.69]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[294.876,414.263]);
ctx.recodingOrder('bezierCurveTo',[312.077,422.17699999999996,329.395,430.133,347.741,434.81399999999996]);
ctx.recodingOrder('bezierCurveTo',[366.087,439.49499999999995,385.719,440.76,403.837,435.26399999999995]);
ctx.recodingOrder('bezierCurveTo',[441.956,423.70099999999996,454.39099999999996,385.893,455.01599999999996,349.4069999999999]);
ctx.recodingOrder('bezierCurveTo',[455.383,327.9789999999999,451.94199999999995,306.6889999999999,448.51099999999997,285.5349999999999]);
ctx.recodingOrder('bezierCurveTo',[444.258,259.3099999999999,440.28499999999997,234.6539999999999,431.683,209.7039999999999]);
ctx.recodingOrder('bezierCurveTo',[423.608,186.28399999999988,410.545,164.7779999999999,395.151,145.46899999999988]);
ctx.recodingOrder('bezierCurveTo',[367.341,110.58399999999989,341.33500000000004,69.57599999999988,297.255,53.817999999999884]);
ctx.recodingOrder('bezierCurveTo',[294.097,52.688999999999886,290.94,51.560999999999886,287.782,50.430999999999884]);
ctx.recodingOrder('bezierCurveTo',[283.99199999999996,49.07599999999989,280.08099999999996,47.874999999999886,276.056,47.79099999999988]);
ctx.recodingOrder('bezierCurveTo',[235.51999999999998,46.948999999999884,193.64999999999998,57.15699999999988,157.012,74.05699999999987]);
ctx.recodingOrder('bezierCurveTo',[125.461,88.613,96.267,109.089,74.287,136]);
ctx.recodingOrder('bezierCurveTo',[61.30500000000001,151.895,49.917,169.091,40.32600000000001,187.234]);
ctx.recodingOrder('bezierCurveTo',[30.861000000000008,205.13600000000002,26.38000000000001,225.666,21.72500000000001,245.393]);
ctx.recodingOrder('bezierCurveTo',[15.139000000000008,273.301,10.918000000000008,301.766,9.120000000000008,330.384]);
ctx.recodingOrder('bezierCurveTo',[7.482000000000008,356.461,4.089000000000008,385.289,18.70500000000001,408.416]);
ctx.recodingOrder('bezierCurveTo',[29.829000000000008,426.019,49.56400000000001,436.939,69.98,441.041]);
ctx.recodingOrder('bezierCurveTo',[87.058,444.473,105.239,443.871,122.369,441.015]);
ctx.recodingOrder('bezierCurveTo',[132.749,439.284,142.319,434.423,151.52,429.53499999999997]);
ctx.recodingOrder('bezierCurveTo',[155.598,427.36899999999997,161.62400000000002,425.35699999999997,165.047,422.30199999999996]);
ctx.recodingOrder('bezierCurveTo',[168.579,419.15,167.565,415.116,169.517,410.44899999999996]);
ctx.recodingOrder('bezierCurveTo',[161.206,408.95899999999995,152.569,409.32099999999997,144.412,411.49999999999994]);
ctx.recodingOrder('bezierCurveTo',[139.973,412.6859999999999,135.657,414.4049999999999,131.11100000000002,415.05899999999997]);
ctx.recodingOrder('bezierCurveTo',[108.28600000000002,418.34099999999995,93.61200000000002,402.70099999999996,81.70800000000003,385.56499999999994]);
ctx.recodingOrder('bezierCurveTo',[65.70900000000003,362.53599999999994,67.03500000000003,329.8449999999999,68.18300000000002,302.881]);
ctx.recodingOrder('bezierCurveTo',[69.42300000000002,273.748,74.78500000000003,244.68599999999998,84.93900000000002,217.31699999999998]);
ctx.recodingOrder('bezierCurveTo',[90.07300000000002,203.47699999999998,99.76600000000002,188.65599999999998,109.02500000000002,177.10499999999996]);
ctx.recodingOrder('bezierCurveTo',[119.07400000000001,164.56699999999995,131.198,153.75299999999996,144.454,144.70599999999996]);
ctx.recodingOrder('bezierCurveTo',[180.574,120.05499999999996,225.52100000000002,107.99899999999997,269.571,105.92899999999996]);
ctx.recodingOrder('lineTo',[268.019,106.68999999999996]);
ctx.recodingOrder('bezierCurveTo',[275.712,108.30299999999995,283.135,111.19599999999996,289.892,115.21099999999996]);
ctx.recodingOrder('bezierCurveTo',[316.24399999999997,130.87299999999996,332.524,158.91399999999996,347.749,184.52999999999997]);
ctx.recodingOrder('bezierCurveTo',[363.79100000000005,211.52099999999996,377.95300000000003,241.90299999999996,386.564,272.272]);
ctx.recodingOrder('bezierCurveTo',[392.646,293.723,394.13,316.32,391.923,338.465]);
ctx.recodingOrder('bezierCurveTo',[390.796,349.767,388.712,360.971,385.774,371.94199999999995]);
ctx.recodingOrder('bezierCurveTo',[383.236,381.42299999999994,380.148,392.28899999999993,372.063,398.61199999999997]);
ctx.recodingOrder('bezierCurveTo',[363.108,405.61699999999996,350.188,405.724,339.376,406.294]);
ctx.recodingOrder('bezierCurveTo',[329.429,406.818,319.419,406.286,309.57099999999997,404.80199999999996]);
ctx.recodingOrder('bezierCurveTo',[297.36199999999997,402.96099999999996,281.76399999999995,400.10099999999994,270.347,404.80199999999996]);
ctx.recodingOrder('bezierCurveTo',[272.775,403.79699999999997,276.04499999999996,403.21099999999996,278.669,403.07099999999997]);
ctx.recodingOrder('bezierCurveTo',[280.323,402.98299999999995,281.99699999999996,403.07399999999996,283.602,403.47999999999996]);
ctx.recodingOrder('bezierCurveTo',[288.35499999999996,404.68299999999994,292.21999999999997,408.84599999999995,293.06699999999995,413.674]);
ctx.recodingOrder('bezierCurveTo',[293.94,413.59,294.079,413.897,294.876,414.263]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[146.005,413.859]);
ctx.recodingOrder('bezierCurveTo',[145.698,413.859,145.392,413.811,145.08599999999998,413.71099999999996]);
ctx.recodingOrder('bezierCurveTo',[122.45099999999998,406.33599999999996,105.40899999999999,394.96899999999994,94.42699999999999,379.9309999999999]);
ctx.recodingOrder('bezierCurveTo',[93.46,378.6069999999999,93.74999999999999,376.7469999999999,95.07199999999999,375.7799999999999]);
ctx.recodingOrder('bezierCurveTo',[96.38799999999999,374.81299999999993,98.24799999999999,375.0899999999999,99.22599999999998,376.4269999999999]);
ctx.recodingOrder('bezierCurveTo',[109.45699999999998,390.4339999999999,125.50699999999998,401.0779999999999,146.92499999999998,408.0609999999999]);
ctx.recodingOrder('bezierCurveTo',[148.48899999999998,408.5679999999999,149.33999999999997,410.2469999999999,148.83299999999997,411.80799999999994]);
ctx.recodingOrder('bezierCurveTo',[148.42,413.061,147.257,413.859,146.005,413.859]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[311.548,407.612]);
ctx.recodingOrder('bezierCurveTo',[310.449,407.612,309.398,406.999,308.879,405.94800000000004]);
ctx.recodingOrder('bezierCurveTo',[308.15500000000003,404.47400000000005,308.76800000000003,402.69300000000004,310.243,401.97100000000006]);
ctx.recodingOrder('bezierCurveTo',[323.666,395.39400000000006,334.764,386.93100000000004,343.235,376.8190000000001]);
ctx.recodingOrder('bezierCurveTo',[344.29200000000003,375.5560000000001,346.17400000000004,375.4000000000001,347.42,376.44900000000007]);
ctx.recodingOrder('bezierCurveTo',[348.678,377.50000000000006,348.84700000000004,379.37700000000007,347.79,380.63400000000007]);
ctx.recodingOrder('bezierCurveTo',[338.785,391.3880000000001,327.03200000000004,400.3620000000001,312.853,407.3090000000001]);
ctx.recodingOrder('bezierCurveTo',[312.436,407.515,311.987,407.612,311.548,407.612]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[81.722,385.303]);
ctx.recodingOrder('bezierCurveTo',[80.327,385.303,79.085,384.315,78.80999999999999,382.896]);
ctx.recodingOrder('bezierCurveTo',[78.49799999999999,381.284,79.54999999999998,379.725,81.16199999999999,379.413]);
ctx.recodingOrder('bezierCurveTo',[101.06899999999999,375.558,116.083,362.301,116.088,348.579]);
ctx.recodingOrder('bezierCurveTo',[116.088,344.346,112.029,340.255,106.893,335.077]);
ctx.recodingOrder('bezierCurveTo',[94.326,322.402,75.333,303.25,93.502,256.166]);
ctx.recodingOrder('bezierCurveTo',[94.094,254.636,95.82199999999999,253.862,97.344,254.465]);
ctx.recodingOrder('bezierCurveTo',[98.87599999999999,255.054,99.63799999999999,256.774,99.05099999999999,258.307]);
ctx.recodingOrder('bezierCurveTo',[82.267,301.797,98.93999999999998,318.613,111.11599999999999,330.892]);
ctx.recodingOrder('bezierCurveTo',[116.97099999999999,336.801,122.03399999999999,341.9,122.02899999999998,348.58]);
ctx.recodingOrder('bezierCurveTo',[122.02299999999998,365.36899999999997,105.31399999999998,380.791,82.29399999999998,385.248]);
ctx.recodingOrder('bezierCurveTo',[82.103,385.285,81.913,385.303,81.722,385.303]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[181.518,255.647]);
ctx.recodingOrder('bezierCurveTo',[181.518,291.676,181.518,324.34299999999996,153.16,324.34299999999996]);
ctx.recodingOrder('bezierCurveTo',[127.988,324.34299999999996,124.798,293.17299999999994,124.798,257.316]);
ctx.recodingOrder('bezierCurveTo',[124.798,257.316,162.36700000000002,255.64699999999996,177.401,255.64699999999996]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[324.765,255.583]);
ctx.recodingOrder('bezierCurveTo',[324.765,280.844,326.675,323.679,296.95099999999996,323.679]);
ctx.recodingOrder('bezierCurveTo',[267.722,323.679,266.703,300.162,266.703,255.58299999999997]);
ctx.recodingOrder('lineTo',[324.765,255.58299999999997]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[379.144,390.844]);
ctx.recodingOrder('bezierCurveTo',[379.096,390.844,379.049,390.841,378.996,390.839]);
ctx.recodingOrder('bezierCurveTo',[360.193,389.917,342.008,382.653,330.356,371.41]);
ctx.recodingOrder('bezierCurveTo',[318.85699999999997,355.994,325.383,349.40500000000003,333.649,341.06300000000005]);
ctx.recodingOrder('bezierCurveTo',[344.789,329.81700000000006,361.632,312.8190000000001,361.632,261.19300000000004]);
ctx.recodingOrder('bezierCurveTo',[361.632,259.552,362.959,258.22100000000006,364.60200000000003,258.22100000000006]);
ctx.recodingOrder('bezierCurveTo',[366.245,258.22100000000006,367.57200000000006,259.55300000000005,367.57200000000006,261.19300000000004]);
ctx.recodingOrder('bezierCurveTo',[367.57200000000006,315.26300000000003,348.98100000000005,334.035,337.87200000000007,345.249]);
ctx.recodingOrder('bezierCurveTo',[329.4960000000001,353.702,326.6740000000001,356.55,334.80100000000004,367.5]);
ctx.recodingOrder('bezierCurveTo',[345.12700000000007,377.406,361.88000000000005,384.049,379.29300000000006,384.905]);
ctx.recodingOrder('bezierCurveTo',[380.93100000000004,384.984,382.1940000000001,386.37899999999996,382.11500000000007,388.018]);
ctx.recodingOrder('bezierCurveTo',[382.036,389.608,380.72,390.844,379.144,390.844]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#9F524C";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[359.108,162.023]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="rgba(0,0,0,0)";
ctx.strokeStyle="#804139";
ctx.lineWidth=1.0984;
ctx.lineCap="round";
ctx.lineJoin="round";
ctx.miterLimit="10";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[354.299,161.498]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[226.925,353.022]);
ctx.recodingOrder('bezierCurveTo',[225.747,353.022,224.568,352.89799999999997,223.41600000000003,352.639]);
ctx.recodingOrder('bezierCurveTo',[219.32000000000002,351.72200000000004,215.63700000000003,349.05400000000003,213.30100000000002,345.314]);
ctx.recodingOrder('bezierCurveTo',[211.64700000000002,342.66900000000004,210.83300000000003,339.757,210.912,336.88800000000003]);
ctx.recodingOrder('bezierCurveTo',[209.633,336.32500000000005,208.02700000000002,335.36100000000005,207.942,333.15900000000005]);
ctx.recodingOrder('bezierCurveTo',[207.88400000000001,331.70000000000005,208.788,330.22900000000004,210.092,329.57900000000006]);
ctx.recodingOrder('bezierCurveTo',[217.221,326.00900000000007,232.37800000000001,321.77900000000005,240.252,319.9510000000001]);
ctx.recodingOrder('bezierCurveTo',[242.07000000000002,319.52600000000007,243.872,320.4980000000001,244.543,322.2000000000001]);
ctx.recodingOrder('bezierCurveTo',[247.434,329.4770000000001,246.979,337.4570000000001,243.328,343.5470000000001]);
ctx.recodingOrder('bezierCurveTo',[239.824,349.386,233.314,353.022,226.925,353.022]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[218.543,334.068]);
ctx.recodingOrder('bezierCurveTo',[218.65900000000002,334.597,218.65900000000002,335.188,218.5,335.85699999999997]);
ctx.recodingOrder('bezierCurveTo',[218.083,337.614,218.474,339.575,219.599,341.37699999999995]);
ctx.recodingOrder('bezierCurveTo',[220.868,343.412,222.902,344.90999999999997,225.03699999999998,345.388]);
ctx.recodingOrder('bezierCurveTo',[229.28599999999997,346.344,234.444,343.914,236.95399999999998,339.72499999999997]);
ctx.recodingOrder('bezierCurveTo',[238.90399999999997,336.472,239.45899999999997,332.186,238.56599999999997,328.006]);
ctx.recodingOrder('bezierCurveTo',[232.505,329.545,224.456,331.872,218.543,334.068]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EC7A75";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[241.093,323.568]);
ctx.recodingOrder('bezierCurveTo',[233.685,325.286,218.553,329.49699999999996,211.75099999999998,332.899]);
ctx.recodingOrder('bezierCurveTo',[210.97799999999998,333.288,215.08899999999997,334.153,214.88899999999998,334.994]);
ctx.recodingOrder('bezierCurveTo',[213.44199999999998,341.074,218.128,347.648,224.224,349.01200000000006]);
ctx.recodingOrder('bezierCurveTo',[230.32299999999998,350.37600000000003,236.932,346.99500000000006,240.143,341.63500000000005]);
ctx.recodingOrder('bezierCurveTo',[243.352,336.274,243.399,329.376,241.093,323.568]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[226.935,352.279]);
ctx.recodingOrder('bezierCurveTo',[225.804,352.279,224.679,352.15999999999997,223.574,351.914]);
ctx.recodingOrder('bezierCurveTo',[219.679,351.03999999999996,216.15900000000002,348.49199999999996,213.929,344.91999999999996]);
ctx.recodingOrder('bezierCurveTo',[212.254,342.246,211.482,339.289,211.678,336.40599999999995]);
ctx.recodingOrder('bezierCurveTo',[210.47299999999998,335.91399999999993,208.761,335.15399999999994,208.68699999999998,333.12999999999994]);
ctx.recodingOrder('bezierCurveTo',[208.63899999999998,331.96199999999993,209.379,330.76499999999993,210.426,330.24199999999996]);
ctx.recodingOrder('bezierCurveTo',[217.49699999999999,326.70099999999996,232.57999999999998,322.49399999999997,240.422,320.67199999999997]);
ctx.recodingOrder('bezierCurveTo',[241.833,320.347,243.31199999999998,321.10499999999996,243.857,322.472]);
ctx.recodingOrder('bezierCurveTo',[246.658,329.53799999999995,246.225,337.27099999999996,242.689,343.164]);
ctx.recodingOrder('bezierCurveTo',[239.322,348.781,233.065,352.279,226.935,352.279]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[217.618,333.616]);
ctx.recodingOrder('bezierCurveTo',[217.882,334.19,217.972,334.871,217.77599999999998,335.685]);
ctx.recodingOrder('bezierCurveTo',[217.31099999999998,337.638,217.73299999999998,339.799,218.96999999999997,341.771]);
ctx.recodingOrder('bezierCurveTo',[220.34399999999997,343.97,222.54799999999997,345.595,224.87299999999996,346.113]);
ctx.recodingOrder('bezierCurveTo',[229.45499999999996,347.151,234.91899999999995,344.557,237.59299999999996,340.109]);
ctx.recodingOrder('bezierCurveTo',[239.75499999999997,336.50199999999995,240.28299999999996,331.69599999999997,239.11999999999995,327.101]);
ctx.recodingOrder('bezierCurveTo',[232.637,328.712,223.843,331.243,217.618,333.616]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EC7A75";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[320.527,330.622]);
ctx.recodingOrder('bezierCurveTo',[319.243,330.622,317.996,329.959,317.30899999999997,328.772]);
ctx.recodingOrder('lineTo',[313.29799999999994,321.865]);
ctx.recodingOrder('bezierCurveTo',[312.26699999999994,320.092,312.86999999999995,317.817,314.6449999999999,316.786]);
ctx.recodingOrder('bezierCurveTo',[316.42099999999994,315.753,318.68799999999993,316.361,319.7229999999999,318.133]);
ctx.recodingOrder('lineTo',[323.7339999999999,325.03999999999996]);
ctx.recodingOrder('bezierCurveTo',[324.7639999999999,326.816,324.1619999999999,329.08799999999997,322.3859999999999,330.11799999999994]);
ctx.recodingOrder('bezierCurveTo',[321.8,330.461,321.156,330.622,320.527,330.622]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EC7A75";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[327.867,323.744]);
ctx.recodingOrder('bezierCurveTo',[326.63,323.744,325.42,323.125,324.71200000000005,322]);
ctx.recodingOrder('lineTo',[321.29300000000006,316.509]);
ctx.recodingOrder('bezierCurveTo',[320.21000000000004,314.76800000000003,320.74300000000005,312.47700000000003,322.4870000000001,311.394]);
ctx.recodingOrder('bezierCurveTo',[324.2360000000001,310.306,326.5250000000001,310.847,327.6020000000001,312.588]);
ctx.recodingOrder('lineTo',[331.0100000000001,318.057]);
ctx.recodingOrder('bezierCurveTo',[332.0980000000001,319.796,331.5700000000001,322.089,329.8320000000001,323.178]);
ctx.recodingOrder('bezierCurveTo',[329.22,323.562,328.538,323.744,327.867,323.744]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EC7A75";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[119.947,327.65]);
ctx.recodingOrder('bezierCurveTo',[119.059,327.65,118.171,327.335,117.458,326.69399999999996]);
ctx.recodingOrder('bezierCurveTo',[115.93599999999999,325.323,115.815,322.97299999999996,117.188,321.44899999999996]);
ctx.recodingOrder('lineTo',[122.584,315.46199999999993]);
ctx.recodingOrder('bezierCurveTo',[123.958,313.93499999999995,126.299,313.81299999999993,127.831,315.18999999999994]);
ctx.recodingOrder('bezierCurveTo',[129.353,316.5609999999999,129.474,318.91099999999994,128.101,320.43499999999995]);
ctx.recodingOrder('lineTo',[122.705,326.42199999999997]);
ctx.recodingOrder('bezierCurveTo',[121.971,327.235,120.961,327.65,119.947,327.65]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EC7A75";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[128.846,334.081]);
ctx.recodingOrder('bezierCurveTo',[128.185,334.081,127.51400000000001,333.904,126.912,333.534]);
ctx.recodingOrder('bezierCurveTo',[125.162,332.461,124.613,330.173,125.686,328.424]);
ctx.recodingOrder('lineTo',[129.20000000000002,322.69199999999995]);
ctx.recodingOrder('bezierCurveTo',[130.056,321.28299999999996,131.44600000000003,320.33799999999997,132.90400000000002,320.1689999999999]);
ctx.recodingOrder('bezierCurveTo',[134.01900000000003,320.02899999999994,135.57300000000004,320.5809999999999,136.38100000000003,321.4029999999999]);
ctx.recodingOrder('bezierCurveTo',[137.81800000000004,322.8669999999999,137.79200000000003,325.2189999999999,136.32800000000003,326.6559999999999]);
ctx.recodingOrder('bezierCurveTo',[135.92600000000004,327.04899999999986,135.45600000000002,327.33499999999987,134.95900000000003,327.5089999999999]);
ctx.recodingOrder('lineTo',[132.01500000000004,332.3069999999999]);
ctx.recodingOrder('bezierCurveTo',[131.319,333.452,130.099,334.081,128.846,334.081]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[222.898,649.733]);
ctx.recodingOrder('bezierCurveTo',[219.23,649.733,215.082,649.0989999999999,213.174,648.1579999999999]);
ctx.recodingOrder('bezierCurveTo',[209.94,646.5649999999999,207.572,644.0229999999999,206.077,642.247]);
ctx.recodingOrder('bezierCurveTo',[202.552,638.0799999999999,199.572,633.078,196.691,626.4989999999999]);
ctx.recodingOrder('bezierCurveTo',[194.773,622.1259999999999,193.32,617.6049999999999,191.91400000000002,613.2289999999999]);
ctx.recodingOrder('bezierCurveTo',[189.715,606.396,187.644,599.943,184.00300000000001,594.299]);
ctx.recodingOrder('bezierCurveTo',[182.47000000000003,591.9209999999999,181.139,589.4689999999999,179.92800000000003,586.805]);
ctx.recodingOrder('bezierCurveTo',[179.25200000000004,585.309,179.91200000000003,583.5469999999999,181.40800000000002,582.87]);
ctx.recodingOrder('bezierCurveTo',[182.89300000000003,582.183,184.663,582.849,185.34,584.347]);
ctx.recodingOrder('bezierCurveTo',[186.428,586.7429999999999,187.623,588.947,189.002,591.077]);
ctx.recodingOrder('bezierCurveTo',[193.061,597.379,195.354,604.51,197.574,611.41]);
ctx.recodingOrder('bezierCurveTo',[198.93200000000002,615.64,200.33800000000002,620.019,202.13500000000002,624.115]);
ctx.recodingOrder('bezierCurveTo',[204.77700000000002,630.153,207.472,634.695,210.61200000000002,638.41]);
ctx.recodingOrder('bezierCurveTo',[212.45100000000002,640.5849999999999,214.10000000000002,641.9879999999999,215.80100000000002,642.8249999999999]);
ctx.recodingOrder('bezierCurveTo',[217.592,643.708,224.46200000000002,644.1379999999999,226.16400000000002,643.477]);
ctx.recodingOrder('bezierCurveTo',[227.691,642.8829999999999,229.419,643.63,230.01700000000002,645.158]);
ctx.recodingOrder('bezierCurveTo',[230.61400000000003,646.688,229.85900000000004,648.4110000000001,228.33100000000002,649.011]);
ctx.recodingOrder('bezierCurveTo',[227.052,649.514,225.054,649.733,222.898,649.733]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[171.816,549.197]);
ctx.recodingOrder('bezierCurveTo',[170.225,549.197,168.909,547.939,168.846,546.338]);
ctx.recodingOrder('bezierCurveTo',[168.608,540.2099999999999,169.226,534.276,170.685,528.703]);
ctx.recodingOrder('bezierCurveTo',[171.335,526.211,172.281,523.659,173.575,520.8969999999999]);
ctx.recodingOrder('bezierCurveTo',[174.267,519.41,176.03799999999998,518.7729999999999,177.523,519.4649999999999]);
ctx.recodingOrder('bezierCurveTo',[179.014,520.1619999999999,179.653,521.93,178.95499999999998,523.4179999999999]);
ctx.recodingOrder('bezierCurveTo',[177.819,525.8489999999999,176.99399999999997,528.0689999999998,176.434,530.2059999999999]);
ctx.recodingOrder('bezierCurveTo',[175.124,535.2129999999999,174.569,540.5639999999999,174.785,546.1099999999999]);
ctx.recodingOrder('bezierCurveTo',[174.84799999999998,547.7479999999999,173.57,549.1299999999999,171.93099999999998,549.1939999999998]);
ctx.recodingOrder('bezierCurveTo',[171.89,549.195,171.852,549.197,171.816,549.197]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[184.769,509.935]);
ctx.recodingOrder('bezierCurveTo',[184.27700000000002,509.935,183.781,509.814,183.321,509.555]);
ctx.recodingOrder('bezierCurveTo',[181.889,508.754,181.381,506.942,182.179,505.51]);
ctx.recodingOrder('bezierCurveTo',[184.293,501.74399999999997,186.571,497.248,187.496,492.44599999999997]);
ctx.recodingOrder('bezierCurveTo',[187.803,490.82899999999995,189.37800000000001,489.806,190.973,490.087]);
ctx.recodingOrder('bezierCurveTo',[192.585,490.396,193.64200000000002,491.955,193.33,493.567]);
ctx.recodingOrder('bezierCurveTo',[192.252,499.20300000000003,189.71,504.237,187.369,508.41700000000003]);
ctx.recodingOrder('bezierCurveTo',[186.819,509.387,185.809,509.935,184.769,509.935]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[232.864,552.141]);
ctx.recodingOrder('bezierCurveTo',[232.853,552.141,232.838,552.141,232.827,552.141]);
ctx.recodingOrder('bezierCurveTo',[231.189,552.12,229.873,550.7719999999999,229.894,549.132]);
ctx.recodingOrder('bezierCurveTo',[229.92600000000002,546.501,229.836,544.059,229.614,541.67]);
ctx.recodingOrder('bezierCurveTo',[229.466,540.034,230.665,538.5889999999999,232.304,538.439]);
ctx.recodingOrder('bezierCurveTo',[233.831,538.304,235.38,539.4879999999999,235.53300000000002,541.126]);
ctx.recodingOrder('bezierCurveTo',[235.77100000000002,543.6859999999999,235.871,546.403,235.834,549.206]);
ctx.recodingOrder('bezierCurveTo',[235.819,550.833,234.492,552.141,232.864,552.141]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[240.606,667.55]);
ctx.recodingOrder('bezierCurveTo',[234.777,667.55,228.668,665.756,225.708,661.8399999999999]);
ctx.recodingOrder('bezierCurveTo',[224.175,659.8109999999999,222.183,655.4219999999999,226.083,648.834]);
ctx.recodingOrder('bezierCurveTo',[226.828,647.3019999999999,225.72899999999998,640.395,225.2,637.0759999999999]);
ctx.recodingOrder('bezierCurveTo',[224.79299999999998,634.536,224.444,632.343,224.40699999999998,630.843]);
ctx.recodingOrder('bezierCurveTo',[224.237,624.158,224.31699999999998,617.0999999999999,224.634,609.8679999999999]);
ctx.recodingOrder('lineTo',[224.777,606.655]);
ctx.recodingOrder('bezierCurveTo',[225.12599999999998,598.728,225.48499999999999,590.529,226.24099999999999,582.4939999999999]);
ctx.recodingOrder('bezierCurveTo',[226.39899999999997,580.8559999999999,227.837,579.699,229.481,579.8119999999999]);
ctx.recodingOrder('bezierCurveTo',[231.114,579.9649999999999,232.314,581.4159999999999,232.16,583.0489999999999]);
ctx.recodingOrder('bezierCurveTo',[231.415,590.9389999999999,231.061,599.0609999999999,230.718,606.9169999999999]);
ctx.recodingOrder('lineTo',[230.575,610.1329999999999]);
ctx.recodingOrder('bezierCurveTo',[230.25799999999998,617.228,230.184,624.146,230.34799999999998,630.6929999999999]);
ctx.recodingOrder('bezierCurveTo',[230.38,631.7979999999999,230.713,633.9089999999999,231.06699999999998,636.1439999999999]);
ctx.recodingOrder('bezierCurveTo',[232.277,643.733,232.938,648.9249999999998,231.19899999999998,651.8629999999999]);
ctx.recodingOrder('bezierCurveTo',[228.74699999999999,656.0039999999999,230.03099999999998,657.6999999999999,230.44799999999998,658.255]);
ctx.recodingOrder('bezierCurveTo',[232.837,661.418,240.51,662.338,245.53599999999997,661.013]);
ctx.recodingOrder('bezierCurveTo',[252.07299999999998,659.2950000000001,257.32599999999996,654.5310000000001,261.13599999999997,646.8530000000001]);
ctx.recodingOrder('bezierCurveTo',[264.94699999999995,639.1800000000001,266.62199999999996,630.941,268.38699999999994,622.2160000000001]);
ctx.recodingOrder('bezierCurveTo',[270.08799999999997,613.8290000000002,271.84899999999993,605.1600000000001,275.68499999999995,597.0820000000001]);
ctx.recodingOrder('bezierCurveTo',[276.78399999999993,594.7730000000001,277.81999999999994,592.4290000000001,278.79299999999995,590.0560000000002]);
ctx.recodingOrder('bezierCurveTo',[279.412,588.5340000000001,281.13899999999995,587.8130000000001,282.667,588.4310000000002]);
ctx.recodingOrder('bezierCurveTo',[284.18899999999996,589.0550000000002,284.91299999999995,590.7880000000001,284.28999999999996,592.3070000000001]);
ctx.recodingOrder('bezierCurveTo',[283.275,594.7850000000001,282.19699999999995,597.2300000000001,281.056,599.6320000000002]);
ctx.recodingOrder('bezierCurveTo',[277.531,607.0520000000001,275.919,614.9920000000002,274.217,623.3980000000001]);
ctx.recodingOrder('bezierCurveTo',[272.447,632.1150000000001,270.618,641.1280000000002,266.464,649.4970000000002]);
ctx.recodingOrder('bezierCurveTo',[261.851,658.7800000000002,255.319,664.5900000000001,247.048,666.7650000000002]);
ctx.recodingOrder('bezierCurveTo',[245.078,667.284,242.863,667.55,240.606,667.55]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[290.653,555.916]);
ctx.recodingOrder('bezierCurveTo',[290.59000000000003,555.916,290.53200000000004,555.913,290.468,555.9110000000001]);
ctx.recodingOrder('bezierCurveTo',[288.83000000000004,555.8100000000001,287.583,554.402,287.683,552.764]);
ctx.recodingOrder('bezierCurveTo',[287.778,551.158,287.841,549.548,287.85699999999997,547.942]);
ctx.recodingOrder('bezierCurveTo',[287.952,539.169,286.715,530.801,284.19,523.067]);
ctx.recodingOrder('bezierCurveTo',[283.683,521.508,284.533,519.83,286.093,519.32]);
ctx.recodingOrder('bezierCurveTo',[287.641,518.802,289.333,519.6610000000001,289.845,521.2230000000001]);
ctx.recodingOrder('bezierCurveTo',[292.572,529.5730000000001,293.90400000000005,538.5830000000001,293.798,548.003]);
ctx.recodingOrder('bezierCurveTo',[293.782,549.707,293.719,551.417,293.613,553.124]);
ctx.recodingOrder('bezierCurveTo',[293.517,554.701,292.211,555.916,290.653,555.916]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[277.15,505.958]);
ctx.recodingOrder('bezierCurveTo',[276.125,505.958,275.132,505.432,274.582,504.48900000000003]);
ctx.recodingOrder('bezierCurveTo',[273.129,502.01300000000003,271.332,498.70200000000006,270.28,495.04]);
ctx.recodingOrder('bezierCurveTo',[270.12199999999996,494.49800000000005,269.71999999999997,493.08000000000004,270.792,488.302]);
ctx.recodingOrder('bezierCurveTo',[271.152,486.701,272.73699999999997,485.70500000000004,274.349,486.05600000000004]);
ctx.recodingOrder('bezierCurveTo',[275.95,486.415,276.954,488.00600000000003,276.59499999999997,489.607]);
ctx.recodingOrder('bezierCurveTo',[276.03499999999997,492.07500000000005,275.998,493.29600000000005,276.025,493.557]);
ctx.recodingOrder('bezierCurveTo',[276.66999999999996,495.75800000000004,277.816,498.25300000000004,279.709,501.482]);
ctx.recodingOrder('bezierCurveTo',[280.538,502.898,280.063,504.71900000000005,278.647,505.548]);
ctx.recodingOrder('bezierCurveTo',[278.176,505.826,277.658,505.958,277.15,505.958]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[222.507,552.141]);
ctx.recodingOrder('bezierCurveTo',[220.996,552.141,219.701,550.9889999999999,219.553,549.4509999999999]);
ctx.recodingOrder('bezierCurveTo',[219.305,546.8379999999999,219.072,544.2299999999999,218.856,541.6159999999999]);
ctx.recodingOrder('bezierCurveTo',[218.719,539.9799999999999,219.934,538.5449999999998,221.567,538.4079999999999]);
ctx.recodingOrder('bezierCurveTo',[223.20000000000002,538.3149999999999,224.638,539.483,224.775,541.1249999999999]);
ctx.recodingOrder('bezierCurveTo',[224.991,543.7119999999999,225.22400000000002,546.2989999999999,225.472,548.8859999999999]);
ctx.recodingOrder('bezierCurveTo',[225.625,550.5189999999999,224.431,551.9719999999999,222.793,552.1279999999998]);
ctx.recodingOrder('bezierCurveTo',[222.697,552.135,222.602,552.141,222.507,552.141]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[137.439,531.187]);
ctx.recodingOrder('bezierCurveTo',[136.382,531.187,135.309,531.1,134.231,530.909]);
ctx.recodingOrder('bezierCurveTo',[125.881,529.432,119.36,522.0889999999999,119.693,514.534]);
ctx.recodingOrder('bezierCurveTo',[119.989,507.907,125.77499999999999,503.212,130.421,499.441]);
ctx.recodingOrder('bezierCurveTo',[131.404,498.643,132.35,497.87699999999995,133.19,497.13399999999996]);
ctx.recodingOrder('bezierCurveTo',[134.49,495.97399999999993,135.843,494.80099999999993,137.21699999999998,493.61199999999997]);
ctx.recodingOrder('bezierCurveTo',[140.89,490.42799999999994,144.689,487.135,148.09799999999998,483.63199999999995]);
ctx.recodingOrder('bezierCurveTo',[149.23999999999998,482.45899999999995,151.12599999999998,482.43199999999996,152.29999999999998,483.57599999999996]);
ctx.recodingOrder('bezierCurveTo',[153.47799999999998,484.71999999999997,153.505,486.604,152.35799999999998,487.78]);
ctx.recodingOrder('bezierCurveTo',[148.76899999999998,491.464,144.87999999999997,494.83799999999997,141.11199999999997,498.101]);
ctx.recodingOrder('bezierCurveTo',[139.75899999999996,499.277,138.42199999999997,500.434,137.13799999999998,501.578]);
ctx.recodingOrder('bezierCurveTo',[136.23399999999998,502.376,135.21999999999997,503.20099999999996,134.16799999999998,504.054]);
ctx.recodingOrder('bezierCurveTo',[130.25199999999998,507.23499999999996,125.80699999999997,510.84,125.63299999999998,514.798]);
ctx.recodingOrder('bezierCurveTo',[125.42699999999998,519.398,129.83999999999997,524.096,135.267,525.053]);
ctx.recodingOrder('bezierCurveTo',[141.149,526.121,147.052,522.635,150.048,518.986]);
ctx.recodingOrder('bezierCurveTo',[151.031,517.781,152.796,517.5459999999999,154.059,518.449]);
ctx.recodingOrder('bezierCurveTo',[155.333,519.353,155.692,521.084,154.878,522.418]);
ctx.recodingOrder('bezierCurveTo',[154.55599999999998,522.955,154.56099999999998,523.197,154.56099999999998,523.2]);
ctx.recodingOrder('bezierCurveTo',[154.587,523.234,154.88899999999998,523.552,155.66599999999997,523.7890000000001]);
ctx.recodingOrder('bezierCurveTo',[156.82299999999998,524.1380000000001,157.92799999999997,523.9920000000001,158.31899999999996,523.7840000000001]);
ctx.recodingOrder('bezierCurveTo',[162.11799999999997,521.7230000000001,166.16699999999997,516.0000000000001,168.84599999999995,512.2130000000001]);
ctx.recodingOrder('lineTo',[169.21099999999996,511.7000000000001]);
ctx.recodingOrder('bezierCurveTo',[173.61799999999997,505.4960000000001,176.89499999999995,498.65800000000013,178.96099999999996,491.3700000000001]);
ctx.recodingOrder('bezierCurveTo',[179.40999999999997,489.79500000000013,181.04799999999994,488.8730000000001,182.62899999999996,489.3220000000001]);
ctx.recodingOrder('bezierCurveTo',[184.20899999999997,489.7690000000001,185.12899999999996,491.4120000000001,184.67899999999997,492.99200000000013]);
ctx.recodingOrder('bezierCurveTo',[182.42799999999997,500.9300000000001,178.85499999999996,508.38100000000014,174.06199999999998,515.1370000000002]);
ctx.recodingOrder('lineTo',[173.70299999999997,515.6440000000001]);
ctx.recodingOrder('bezierCurveTo',[170.52199999999996,520.1360000000001,166.17299999999997,526.2880000000001,161.152,529.0060000000001]);
ctx.recodingOrder('bezierCurveTo',[157.896,530.7710000000001,152.83399999999997,529.9860000000001,150.303,527.3280000000001]);
ctx.recodingOrder('bezierCurveTo',[150.203,527.2200000000001,150.102,527.1120000000001,150.012,527.0000000000001]);
ctx.recodingOrder('bezierCurveTo',[146.502,529.456,142.095,531.187,137.439,531.187]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[327.735,531.187]);
ctx.recodingOrder('bezierCurveTo',[323.074,531.187,318.671,529.456,315.163,527.004]);
ctx.recodingOrder('bezierCurveTo',[315.07300000000004,527.115,314.973,527.224,314.872,527.332]);
ctx.recodingOrder('bezierCurveTo',[312.341,529.99,307.25600000000003,530.775,304.023,529.007]);
ctx.recodingOrder('bezierCurveTo',[299.01800000000003,526.2959999999999,294.66900000000004,520.16,291.49300000000005,515.679]);
ctx.recodingOrder('lineTo',[291.107,515.14]);
ctx.recodingOrder('bezierCurveTo',[285.262,506.901,281.14000000000004,497.37,279.19000000000005,487.58]);
ctx.recodingOrder('bezierCurveTo',[278.86800000000005,485.971,279.90900000000005,484.407,281.5210000000001,484.084]);
ctx.recodingOrder('bezierCurveTo',[283.0900000000001,483.767,284.69200000000006,484.803,285.01400000000007,486.41700000000003]);
ctx.recodingOrder('bezierCurveTo',[286.8110000000001,495.39300000000003,290.5950000000001,504.136,295.95900000000006,511.699]);
ctx.recodingOrder('lineTo',[296.33900000000006,512.243]);
ctx.recodingOrder('bezierCurveTo',[299.01800000000003,516.019,303.06600000000003,521.729,306.85600000000005,523.782]);
ctx.recodingOrder('bezierCurveTo',[307.24700000000007,523.9960000000001,308.357,524.142,309.5040000000001,523.7900000000001]);
ctx.recodingOrder('bezierCurveTo',[310.2700000000001,523.5570000000001,310.57200000000006,523.248,310.6190000000001,523.1690000000001]);
ctx.recodingOrder('lineTo',[310.6190000000001,523.1690000000001]);
ctx.recodingOrder('bezierCurveTo',[310.60800000000006,523.1690000000001,310.59800000000007,522.9230000000001,310.2910000000001,522.4180000000001]);
ctx.recodingOrder('bezierCurveTo',[309.4770000000001,521.0860000000001,309.8360000000001,519.3530000000001,311.10500000000013,518.4490000000001]);
ctx.recodingOrder('bezierCurveTo',[312.3840000000001,517.5430000000001,314.13300000000015,517.7800000000001,315.12100000000015,518.9830000000001]);
ctx.recodingOrder('bezierCurveTo',[318.12800000000016,522.6370000000001,324.0360000000002,526.128,329.90200000000016,525.052]);
ctx.recodingOrder('bezierCurveTo',[335.33500000000015,524.096,339.7470000000002,519.397,339.54100000000017,514.797]);
ctx.recodingOrder('bezierCurveTo',[339.3670000000002,510.839,334.92200000000014,507.235,331.00600000000014,504.053]);
ctx.recodingOrder('bezierCurveTo',[329.95500000000015,503.199,328.94000000000017,502.375,328.04100000000017,501.577]);
ctx.recodingOrder('bezierCurveTo',[326.75100000000015,500.433,325.4200000000002,499.278,324.0670000000002,498.105]);
ctx.recodingOrder('bezierCurveTo',[317.8310000000002,492.701,310.7660000000002,486.576,305.8880000000002,479.482]);
ctx.recodingOrder('bezierCurveTo',[304.9580000000002,478.132,305.2960000000002,476.27900000000005,306.6490000000002,475.34900000000005]);
ctx.recodingOrder('bezierCurveTo',[308.01800000000026,474.41100000000006,309.8520000000002,474.76800000000003,310.7820000000002,476.11500000000007]);
ctx.recodingOrder('bezierCurveTo',[315.2320000000002,482.5830000000001,321.7000000000002,488.19000000000005,327.9570000000002,493.6120000000001]);
ctx.recodingOrder('bezierCurveTo',[329.33100000000024,494.8010000000001,330.6840000000002,495.9750000000001,331.9840000000002,497.13200000000006]);
ctx.recodingOrder('bezierCurveTo',[332.8240000000002,497.8740000000001,333.7700000000002,498.6410000000001,334.7530000000002,499.4390000000001]);
ctx.recodingOrder('bezierCurveTo',[339.3990000000002,503.2100000000001,345.18500000000023,507.9050000000001,345.4810000000002,514.532]);
ctx.recodingOrder('bezierCurveTo',[345.81400000000025,522.086,339.29300000000023,529.432,330.93700000000024,530.907]);
ctx.recodingOrder('bezierCurveTo',[329.859,531.099,328.792,531.187,327.735,531.187]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[239.092,505.913]);
ctx.recodingOrder('bezierCurveTo',[244.621,504.075,249.276,497.47700000000003,244.08200000000002,491.479]);
ctx.recodingOrder('bezierCurveTo',[238.33700000000002,484.844,229.48800000000003,492.61899999999997,229.568,499.505]);
ctx.recodingOrder('bezierCurveTo',[229.584,500.909,229.71900000000002,502.39,230.526,503.538]);
ctx.recodingOrder('bezierCurveTo',[232.591,506.474,235.98,506.947,239.092,505.913]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[299.979,563.052]);
ctx.recodingOrder('bezierCurveTo',[300.675,574.7280000000001,292.647,589.6320000000001,280.478,591.058]);
ctx.recodingOrder('bezierCurveTo',[275.077,591.691,269.635,590.659,264.294,589.631]);
ctx.recodingOrder('bezierCurveTo',[258.116,588.443,251.938,587.2529999999999,245.76099999999997,586.0649999999999]);
ctx.recodingOrder('bezierCurveTo',[242.07099999999997,585.3549999999999,239.08599999999996,583.808,235.31199999999995,583.3219999999999]);
ctx.recodingOrder('bezierCurveTo',[231.43899999999996,582.8239999999998,227.18399999999997,582.1249999999999,224.68599999999995,579.1239999999999]);
ctx.recodingOrder('bezierCurveTo',[221.92899999999995,575.8129999999999,222.34499999999994,570.9819999999999,222.91099999999994,566.7109999999999]);
ctx.recodingOrder('bezierCurveTo',[223.17199999999994,564.7369999999999,223.43399999999994,562.7629999999999,223.69599999999994,560.7899999999998]);
ctx.recodingOrder('bezierCurveTo',[224.07399999999993,557.9409999999998,224.62099999999995,554.7859999999998,226.90599999999995,553.0439999999999]);
ctx.recodingOrder('bezierCurveTo',[229.51699999999994,551.0529999999999,232.07299999999995,550.5279999999999,235.35299999999995,550.3719999999998]);
ctx.recodingOrder('bezierCurveTo',[254.49999999999994,549.4639999999998,273.76699999999994,551.1319999999998,292.47299999999996,555.3169999999999]);
ctx.recodingOrder('bezierCurveTo',[294.51399999999995,555.7739999999999,296.67299999999994,556.3299999999999,298.10299999999995,557.8559999999999]);
ctx.recodingOrder('bezierCurveTo',[299.387,559.23,299.867,561.176,299.979,563.052]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[223.514,579.044]);
ctx.recodingOrder('bezierCurveTo',[213.36700000000002,582.408,202.693,584.168,192.00400000000002,584.268]);
ctx.recodingOrder('bezierCurveTo',[184.73300000000003,584.336,172.82000000000002,585.197,167.11400000000003,579.7620000000001]);
ctx.recodingOrder('bezierCurveTo',[165.04300000000003,577.7890000000001,163.80600000000004,575.115,162.69800000000004,572.4780000000001]);
ctx.recodingOrder('bezierCurveTo',[161.46100000000004,569.5310000000001,160.32400000000004,566.5430000000001,159.29100000000003,563.518]);
ctx.recodingOrder('bezierCurveTo',[158.48300000000003,561.154,157.73000000000002,558.6990000000001,157.89100000000002,556.206]);
ctx.recodingOrder('bezierCurveTo',[158.05200000000002,553.713,159.312,551.144,161.58,550.094]);
ctx.recodingOrder('bezierCurveTo',[166.09400000000002,548.004,168.17800000000003,548.13,173.14000000000001,547.7860000000001]);
ctx.recodingOrder('bezierCurveTo',[185.99300000000002,546.893,198.90500000000003,546.8660000000001,211.76100000000002,547.7030000000001]);
ctx.recodingOrder('bezierCurveTo',[217.02800000000002,548.046,222.93300000000002,548.8760000000001,226.10000000000002,553.099]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#83553A";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[117.375,92.45]);
ctx.recodingOrder('bezierCurveTo',[110.285,84.018,112.461,71.628,112.528,61.45700000000001]);
ctx.recodingOrder('bezierCurveTo',[112.54700000000001,58.63100000000001,112.55600000000001,55.742000000000004,111.64500000000001,53.06600000000001]);
ctx.recodingOrder('bezierCurveTo',[107.27300000000001,40.22600000000001,94.14300000000001,47.47200000000001,92.638,57.50200000000001]);
ctx.recodingOrder('bezierCurveTo',[92.069,61.29500000000001,91.59,65.052,90.885,68.82700000000001]);
ctx.recodingOrder('bezierCurveTo',[90.60900000000001,70.30900000000001,90.27000000000001,71.90500000000002,89.14,72.90800000000002]);
ctx.recodingOrder('bezierCurveTo',[80.802,80.30300000000001,80.546,55.70500000000001,80.25,53.24900000000002]);
ctx.recodingOrder('bezierCurveTo',[79.727,48.91000000000002,79.142,44.396000000000015,76.743,40.743000000000016]);
ctx.recodingOrder('bezierCurveTo',[74.344,37.09000000000002,69.544,34.61400000000002,65.509,36.29300000000001]);
ctx.recodingOrder('bezierCurveTo',[63.151,37.27300000000001,61.476,39.47700000000001,60.556,41.859000000000016]);
ctx.recodingOrder('bezierCurveTo',[59.637,44.240000000000016,59.375,46.817000000000014,59.122,49.35700000000001]);
ctx.recodingOrder('bezierCurveTo',[58.731,53.286000000000016,58.775,58.052000000000014,57.55,61.82700000000001]);
ctx.recodingOrder('bezierCurveTo',[57.157999999999994,63.036000000000016,56.073,64.11900000000001,54.802,64.08100000000002]);
ctx.recodingOrder('bezierCurveTo',[54.047,64.05800000000002,53.36,63.658000000000015,52.732,63.240000000000016]);
ctx.recodingOrder('bezierCurveTo',[49.376,61.01100000000002,46.632999999999996,57.993000000000016,43.944,54.99200000000002]);
ctx.recodingOrder('bezierCurveTo',[39.52,50.05500000000002,35.278000000000006,45.871000000000016,31.224000000000004,40.46500000000002]);
ctx.recodingOrder('bezierCurveTo',[27.537000000000003,35.54700000000002,23.376000000000005,30.789000000000016,17.188000000000002,29.17500000000002]);
ctx.recodingOrder('bezierCurveTo',[10.579000000000002,27.45100000000002,5.528000000000002,32.04000000000002,5.413000000000002,38.49500000000002]);
ctx.recodingOrder('bezierCurveTo',[5.347000000000002,42.18300000000002,6.620000000000002,45.76400000000002,8.153000000000002,49.11900000000002]);
ctx.recodingOrder('bezierCurveTo',[16.226000000000003,66.79100000000003,30.362000000000002,79.90500000000003,46.387,90.46900000000002]);
ctx.recodingOrder('bezierCurveTo',[61.305,100.30400000000003,76.328,106.32800000000002,87.607,120.67200000000003]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#83553A";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[349.966,90.964]);
ctx.recodingOrder('bezierCurveTo',[357.056,82.532,354.88,70.142,354.813,59.971000000000004]);
ctx.recodingOrder('bezierCurveTo',[354.794,57.145,354.78499999999997,54.256,355.69599999999997,51.580000000000005]);
ctx.recodingOrder('bezierCurveTo',[360.068,38.74000000000001,373.198,45.986000000000004,374.703,56.016000000000005]);
ctx.recodingOrder('bezierCurveTo',[375.272,59.809000000000005,375.751,63.566,376.45599999999996,67.34100000000001]);
ctx.recodingOrder('bezierCurveTo',[376.73199999999997,68.82300000000001,377.07099999999997,70.41900000000001,378.2,71.42200000000001]);
ctx.recodingOrder('bezierCurveTo',[386.538,78.81700000000001,386.794,54.21900000000001,387.09,51.76300000000001]);
ctx.recodingOrder('bezierCurveTo',[387.613,47.424000000000014,388.198,42.91000000000001,390.597,39.25700000000001]);
ctx.recodingOrder('bezierCurveTo',[392.996,35.60400000000001,397.796,33.128000000000014,401.83099999999996,34.80600000000001]);
ctx.recodingOrder('bezierCurveTo',[404.18899999999996,35.78600000000001,405.864,37.99000000000001,406.78399999999993,40.372000000000014]);
ctx.recodingOrder('bezierCurveTo',[407.7029999999999,42.753000000000014,407.96399999999994,45.33000000000001,408.2169999999999,47.87000000000001]);
ctx.recodingOrder('bezierCurveTo',[408.60799999999995,51.799000000000014,408.5639999999999,56.56500000000001,409.78899999999993,60.34000000000001]);
ctx.recodingOrder('bezierCurveTo',[410.1809999999999,61.549000000000014,411.2659999999999,62.63200000000001,412.5369999999999,62.59400000000001]);
ctx.recodingOrder('bezierCurveTo',[413.2919999999999,62.571000000000005,413.9779999999999,62.17100000000001,414.6069999999999,61.75300000000001]);
ctx.recodingOrder('bezierCurveTo',[417.9629999999999,59.52400000000001,420.7059999999999,56.50600000000001,423.3949999999999,53.50500000000001]);
ctx.recodingOrder('bezierCurveTo',[427.8189999999999,48.56800000000001,432.0609999999999,44.38400000000001,436.11499999999995,38.97800000000001]);
ctx.recodingOrder('bezierCurveTo',[439.80199999999996,34.06000000000001,443.96299999999997,29.302000000000007,450.15099999999995,27.68800000000001]);
ctx.recodingOrder('bezierCurveTo',[456.75999999999993,25.96400000000001,461.811,30.55300000000001,461.92599999999993,37.00800000000001]);
ctx.recodingOrder('bezierCurveTo',[461.9919999999999,40.69600000000001,460.71899999999994,44.27700000000001,459.1859999999999,47.63200000000001]);
ctx.recodingOrder('bezierCurveTo',[451.11299999999994,65.30400000000002,436.9769999999999,78.418,420.95199999999994,88.98200000000001]);
ctx.recodingOrder('bezierCurveTo',[406.03399999999993,98.81700000000001,389.36599999999993,106.83700000000002,378.08699999999993,121.18100000000001]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[449.865,284.841]);
ctx.recodingOrder('bezierCurveTo',[445.622,258.697,441.616,234.005,432.981,208.95]);
ctx.recodingOrder('bezierCurveTo',[425.45,187.10899999999998,412.99399999999997,162.201,395.967,140.832]);
ctx.recodingOrder('bezierCurveTo',[391.66499999999996,135.439,387.433,129.911,383.183,124.35999999999999]);
ctx.recodingOrder('bezierCurveTo',[360.956,95.33699999999999,311.978,59.32199999999999,276.613,44.99299999999998]);
ctx.recodingOrder('bezierCurveTo',[276.114,44.78999999999998,275.59,44.74599999999998,275.088,44.817999999999984]);
ctx.recodingOrder('bezierCurveTo',[236.29400000000004,44.08999999999998,193.82000000000002,53.49899999999998,155.09000000000003,71.36199999999998]);
ctx.recodingOrder('bezierCurveTo',[120.46400000000003,87.33199999999998,92.27600000000004,108.44699999999997,71.30600000000003,134.11999999999998]);
ctx.recodingOrder('bezierCurveTo',[58.264000000000024,150.087,46.727000000000025,167.48999999999998,37.01900000000003,185.84599999999998]);
ctx.recodingOrder('bezierCurveTo',[27.955000000000027,202.99199999999996,23.405000000000026,222.36599999999999,19.00300000000003,241.09999999999997]);
ctx.recodingOrder('lineTo',[18.15700000000003,244.71199999999996]);
ctx.recodingOrder('bezierCurveTo',[11.546000000000028,272.69199999999995,7.281000000000029,301.45099999999996,5.479000000000028,330.19499999999994]);
ctx.recodingOrder('lineTo',[5.051000000000028,336.6259999999999]);
ctx.recodingOrder('bezierCurveTo',[3.4230000000000276,360.6819999999999,1.5790000000000277,387.94499999999994,15.515000000000029,410.0039999999999]);
ctx.recodingOrder('bezierCurveTo',[26.211000000000027,426.9359999999999,45.60600000000003,439.3099999999999,68.71600000000004,443.9549999999999]);
ctx.recodingOrder('bezierCurveTo',[76.74300000000004,445.5659999999999,85.25200000000004,446.37499999999994,94.17200000000004,446.37499999999994]);
ctx.recodingOrder('bezierCurveTo',[103.11400000000003,446.37499999999994,112.46800000000005,445.56399999999996,122.17700000000004,443.94399999999996]);
ctx.recodingOrder('bezierCurveTo',[134.21600000000004,441.93899999999996,145.79400000000004,435.66499999999996,156.98700000000002,429.59599999999995]);
ctx.recodingOrder('bezierCurveTo',[160.71300000000002,427.578,164.38500000000002,425.5849999999999,167.99500000000003,423.80099999999993]);
ctx.recodingOrder('bezierCurveTo',[169.46400000000003,423.07399999999996,170.07200000000003,421.29299999999995,169.34200000000004,419.82199999999995]);
ctx.recodingOrder('bezierCurveTo',[168.61800000000005,418.34799999999996,166.83200000000005,417.74499999999995,165.36300000000003,418.47499999999997]);
ctx.recodingOrder('bezierCurveTo',[161.68500000000003,420.28999999999996,157.94900000000004,422.31699999999995,154.15500000000003,424.36999999999995]);
ctx.recodingOrder('bezierCurveTo',[143.39000000000004,430.20699999999994,132.26000000000002,436.2389999999999,121.19900000000003,438.08399999999995]);
ctx.recodingOrder('bezierCurveTo',[102.51800000000003,441.19399999999996,85.24200000000002,441.2149999999999,69.89000000000003,438.12699999999995]);
ctx.recodingOrder('bezierCurveTo',[48.36000000000003,433.80199999999996,30.376000000000026,422.39399999999995,20.53600000000003,406.828]);
ctx.recodingOrder('bezierCurveTo',[7.636000000000029,386.40999999999997,9.33800000000003,361.30499999999995,10.98100000000003,337.02799999999996]);
ctx.recodingOrder('lineTo',[11.409000000000031,330.568]);
ctx.recodingOrder('bezierCurveTo',[13.19500000000003,302.15999999999997,17.413000000000032,273.731,23.93900000000003,246.07599999999996]);
ctx.recodingOrder('lineTo',[24.790000000000028,242.45899999999997]);
ctx.recodingOrder('bezierCurveTo',[29.107000000000028,224.09199999999998,33.568000000000026,205.09599999999998,42.27200000000003,188.62399999999997]);
ctx.recodingOrder('bezierCurveTo',[51.800000000000026,170.61599999999996,63.11500000000002,153.54399999999998,75.91400000000003,137.87999999999997]);
ctx.recodingOrder('bezierCurveTo',[96.30200000000004,112.91199999999996,123.78200000000004,92.34699999999997,157.58300000000003,76.75699999999998]);
ctx.recodingOrder('bezierCurveTo',[195.51600000000002,59.25799999999998,237.27300000000002,50.056999999999974,274.997,50.75799999999998]);
ctx.recodingOrder('bezierCurveTo',[308.826,64.65699999999998,356.851,99.75299999999999,378.462,127.97499999999998]);
ctx.recodingOrder('bezierCurveTo',[382.73699999999997,133.55599999999998,386.991,139.11499999999998,391.31399999999996,144.53699999999998]);
ctx.recodingOrder('bezierCurveTo',[407.924,165.37499999999997,420.04699999999997,189.68999999999997,427.356,210.89]);
ctx.recodingOrder('bezierCurveTo',[435.83299999999997,235.46099999999998,439.79699999999997,259.911,444.067,286.229]);
ctx.recodingOrder('bezierCurveTo',[447.423,306.937,450.894,328.34799999999996,450.535,349.57399999999996]);
ctx.recodingOrder('bezierCurveTo',[450.091,375.16999999999996,443.13100000000003,419.99799999999993,401.461,432.63899999999995]);
ctx.recodingOrder('bezierCurveTo',[385.507,437.472,367.17400000000004,437.31299999999993,346.96000000000004,432.15299999999996]);
ctx.recodingOrder('bezierCurveTo',[328.82300000000004,427.52399999999994,311.42600000000004,419.52,294.60400000000004,411.78]);
ctx.recodingOrder('bezierCurveTo',[293.11300000000006,411.09299999999996,291.34800000000007,411.741,290.66100000000006,413.239]);
ctx.recodingOrder('bezierCurveTo',[289.97400000000005,414.72999999999996,290.63000000000005,416.49499999999995,292.12000000000006,417.18199999999996]);
ctx.recodingOrder('bezierCurveTo',[309.1840000000001,425.032,326.83000000000004,433.15,345.49000000000007,437.914]);
ctx.recodingOrder('bezierCurveTo',[356.41400000000004,440.699,366.8400000000001,442.092,376.70200000000006,442.092]);
ctx.recodingOrder('bezierCurveTo',[386.06100000000004,442.092,394.9080000000001,440.837,403.18300000000005,438.32599999999996]);
ctx.recodingOrder('bezierCurveTo',[448.45700000000005,424.59399999999994,456.00900000000007,376.88899999999995,456.47400000000005,349.67499999999995]);
ctx.recodingOrder('bezierCurveTo',[456.847,327.919,453.332,306.241,449.865,284.841]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[269.908,433.722]);
ctx.recodingOrder('bezierCurveTo',[262.3,436.671,253.93,438.24699999999996,247.41000000000003,439.13899999999995]);
ctx.recodingOrder('bezierCurveTo',[230.94500000000002,441.38999999999993,213.87400000000002,439.97999999999996,197.75700000000003,436.10699999999997]);
ctx.recodingOrder('bezierCurveTo',[189.23400000000004,434.058,173.55000000000004,431.38399999999996,169.18600000000004,422.23999999999995]);
ctx.recodingOrder('bezierCurveTo',[165.33000000000004,414.162,171.89600000000004,406.804,179.55800000000005,405.799]);
ctx.recodingOrder('bezierCurveTo',[194.44200000000006,403.846,207.43400000000005,410.436,222.17800000000005,411.02599999999995]);
ctx.recodingOrder('bezierCurveTo',[232.22700000000006,411.42799999999994,242.31300000000005,410.917,252.27000000000004,409.49999999999994]);
ctx.recodingOrder('bezierCurveTo',[261.09000000000003,408.24499999999995,272.57900000000006,402.5419999999999,281.232,403.10699999999997]);
ctx.recodingOrder('bezierCurveTo',[288.90000000000003,403.60699999999997,291.53200000000004,409.517,289.31500000000005,416.587]);
ctx.recodingOrder('bezierCurveTo',[286.701,424.922,278.828,430.265,269.908,433.722]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[231.321,443.173]);
ctx.recodingOrder('bezierCurveTo',[220.202,443.173,208.602,441.77,197.066,438.998]);
ctx.recodingOrder('lineTo',[194.323,438.361]);
ctx.recodingOrder('bezierCurveTo',[185.054,436.24199999999996,171.044,433.039,166.50400000000002,423.519]);
ctx.recodingOrder('bezierCurveTo',[164.538,419.394,164.60700000000003,414.992,166.705,411.126]);
ctx.recodingOrder('bezierCurveTo',[169.09900000000002,406.71599999999995,173.876,403.54499999999996,179.17100000000002,402.84999999999997]);
ctx.recodingOrder('bezierCurveTo',[188.36100000000002,401.63699999999994,196.859,403.51099999999997,205.06100000000004,405.31499999999994]);
ctx.recodingOrder('bezierCurveTo',[210.64700000000005,406.54699999999997,216.42800000000003,407.81999999999994,222.29900000000004,408.05499999999995]);
ctx.recodingOrder('bezierCurveTo',[232.11800000000002,408.4479999999999,242.09000000000003,407.94399999999996,251.85100000000003,406.554]);
ctx.recodingOrder('bezierCurveTo',[255.16400000000002,406.08399999999995,258.959,404.91799999999995,262.97,403.68199999999996]);
ctx.recodingOrder('bezierCurveTo',[269.22700000000003,401.75499999999994,275.754,399.74799999999993,281.42400000000004,400.13899999999995]);
ctx.recodingOrder('bezierCurveTo',[286.81500000000005,400.49099999999993,289.63100000000003,403.01599999999996,291.04200000000003,405.07199999999995]);
ctx.recodingOrder('bezierCurveTo',[293.25100000000003,408.29599999999994,293.64700000000005,412.6979999999999,292.15200000000004,417.47299999999996]);
ctx.recodingOrder('bezierCurveTo',[289.58900000000006,425.643,282.46500000000003,432.03999999999996,270.982,436.49299999999994]);
ctx.recodingOrder('lineTo',[270.982,436.49299999999994]);
ctx.recodingOrder('bezierCurveTo',[264.572,438.9769999999999,256.77700000000004,440.85799999999995,247.81400000000002,442.08099999999996]);
ctx.recodingOrder('bezierCurveTo',[242.493,442.811,236.971,443.173,231.321,443.173]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[185.223,408.408]);
ctx.recodingOrder('bezierCurveTo',[183.484,408.408,181.72500000000002,408.511,179.94400000000002,408.743]);
ctx.recodingOrder('bezierCurveTo',[176.556,409.19,173.407,411.238,171.92700000000002,413.962]);
ctx.recodingOrder('bezierCurveTo',[171.103,415.481,170.42600000000002,417.931,171.86900000000003,420.959]);
ctx.recodingOrder('bezierCurveTo',[175.17200000000003,427.887,187.49600000000004,430.704,195.65000000000003,432.567]);
ctx.recodingOrder('lineTo',[198.45600000000005,433.217]);
ctx.recodingOrder('bezierCurveTo',[215.13500000000005,437.228,231.92900000000003,438.25899999999996,247.01200000000006,436.195]);
ctx.recodingOrder('bezierCurveTo',[255.51500000000004,435.032,262.85600000000005,433.267,268.8380000000001,430.95]);
ctx.recodingOrder('lineTo',[268.8380000000001,430.95]);
ctx.recodingOrder('bezierCurveTo',[278.5520000000001,427.18399999999997,284.4860000000001,422.053,286.4790000000001,415.69599999999997]);
ctx.recodingOrder('bezierCurveTo',[287.4200000000001,412.70199999999994,287.2980000000001,410.123,286.1410000000001,408.43499999999995]);
ctx.recodingOrder('bezierCurveTo',[285.1740000000001,407.02399999999994,283.4560000000001,406.2289999999999,281.03600000000006,406.06999999999994]);
ctx.recodingOrder('bezierCurveTo',[276.37000000000006,405.76399999999995,270.46100000000007,407.5969999999999,264.72200000000004,409.36499999999995]);
ctx.recodingOrder('bezierCurveTo',[260.663,410.61499999999995,256.46700000000004,411.905,252.68800000000005,412.441]);
ctx.recodingOrder('bezierCurveTo',[242.57300000000004,413.881,232.25200000000004,414.407,222.06300000000005,413.99699999999996]);
ctx.recodingOrder('bezierCurveTo',[215.66300000000004,413.741,209.62300000000005,412.40899999999993,203.78300000000004,411.12199999999996]);
ctx.recodingOrder('bezierCurveTo',[197.483,409.734,191.459,408.408,185.223,408.408]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[148.135,463.189]);
ctx.recodingOrder('bezierCurveTo',[148.072,463.189,148.01399999999998,463.18600000000004,147.95499999999998,463.184]);
ctx.recodingOrder('bezierCurveTo',[146.31699999999998,463.086,145.065,461.68,145.165,460.04200000000003]);
ctx.recodingOrder('bezierCurveTo',[146.04299999999998,445.07000000000005,153.399,430.33900000000006,164.82999999999998,420.63700000000006]);
ctx.recodingOrder('bezierCurveTo',[166.082,419.57700000000006,167.95299999999997,419.72600000000006,169.021,420.97800000000007]);
ctx.recodingOrder('bezierCurveTo',[170.083,422.2300000000001,169.92999999999998,424.10400000000004,168.678,425.16600000000005]);
ctx.recodingOrder('bezierCurveTo',[158.457,433.84400000000005,151.889,447.01000000000005,151.096,460.3910000000001]);
ctx.recodingOrder('bezierCurveTo',[151.005,461.971,149.694,463.189,148.135,463.189]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[308.896,453.42]);
ctx.recodingOrder('bezierCurveTo',[307.543,453.42,306.322,452.495,306.00600000000003,451.12600000000003]);
ctx.recodingOrder('bezierCurveTo',[303.04100000000005,438.51700000000005,297.92600000000004,428.65000000000003,288.36,417.076]);
ctx.recodingOrder('bezierCurveTo',[287.314,415.81100000000004,287.488,413.937,288.757,412.891]);
ctx.recodingOrder('bezierCurveTo',[290.02,411.853,291.896,412.022,292.937,413.288]);
ctx.recodingOrder('bezierCurveTo',[303.137,425.625,308.601,436.195,311.78700000000003,449.76800000000003]);
ctx.recodingOrder('bezierCurveTo',[312.16700000000003,451.36400000000003,311.17400000000004,452.96500000000003,309.57800000000003,453.34000000000003]);
ctx.recodingOrder('bezierCurveTo',[309.345,453.394,309.117,453.42,308.896,453.42]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[148.305,462.116]);
ctx.recodingOrder('bezierCurveTo',[168.284,470.517,187.631,472.448,208.937,470.34499999999997]);
ctx.recodingOrder('bezierCurveTo',[212.05100000000002,470.03799999999995,215.27700000000002,469.60099999999994,218.24300000000002,470.59799999999996]);
ctx.recodingOrder('bezierCurveTo',[224.28000000000003,472.62699999999995,226.35000000000002,480.00199999999995,222.77700000000002,485.34399999999994]);
ctx.recodingOrder('bezierCurveTo',[219.36700000000002,490.4429999999999,209.63500000000002,491.9959999999999,203.85500000000002,492.06499999999994]);
ctx.recodingOrder('bezierCurveTo',[187.33700000000002,492.2629999999999,172.234,490.6429999999999,157.11100000000002,486.8299999999999]);
ctx.recodingOrder('bezierCurveTo',[152.08400000000003,485.56299999999993,147.031,483.92999999999995,142.87400000000002,480.8329999999999]);
ctx.recodingOrder('bezierCurveTo',[138.717,477.7349999999999,135.54900000000004,472.9299999999999,135.562,467.7459999999999]);
ctx.recodingOrder('bezierCurveTo',[135.57500000000002,462.5619999999999,139.448,457.3229999999999,144.607,456.82199999999995]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[312.351,449.446]);
ctx.recodingOrder('bezierCurveTo',[319.208,449.471,322.138,456.321,321.507,462.146]);
ctx.recodingOrder('bezierCurveTo',[320.833,468.36400000000003,314.79200000000003,473.971,309.386,476.458]);
ctx.recodingOrder('bezierCurveTo',[290.78400000000005,485.016,270.105,489.34200000000004,249.71000000000004,490.09000000000003]);
ctx.recodingOrder('bezierCurveTo',[240.82600000000002,490.41600000000005,236.25700000000003,484.773,237.55800000000005,475.699]);
ctx.recodingOrder('bezierCurveTo',[237.73900000000006,474.438,238.09800000000004,473.096,239.09500000000006,472.303]);
ctx.recodingOrder('bezierCurveTo',[239.87900000000005,471.679,240.92100000000005,471.507,241.91200000000006,471.35699999999997]);
ctx.recodingOrder('bezierCurveTo',[265.33900000000006,467.79999999999995,288.9990000000001,465.429,310.84000000000003,455.549]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[201.558,495.053]);
ctx.recodingOrder('bezierCurveTo',[185.63,495.053,170.928,493.301,156.697,489.713]);
ctx.recodingOrder('bezierCurveTo',[151.782,488.47400000000005,146.12800000000001,486.732,141.40800000000002,483.21500000000003]);
ctx.recodingOrder('bezierCurveTo',[136.06500000000003,479.23100000000005,132.88400000000001,473.44300000000004,132.90500000000003,467.73600000000005]);
ctx.recodingOrder('bezierCurveTo',[132.91600000000003,460.71500000000003,138.17900000000003,454.49000000000007,144.63200000000003,453.86400000000003]);
ctx.recodingOrder('bezierCurveTo',[146.13800000000003,453.67900000000003,147.71800000000005,454.89700000000005,147.87700000000004,456.533]);
ctx.recodingOrder('bezierCurveTo',[148.03500000000003,458.166,146.84100000000004,459.619,145.20300000000003,459.778]);
ctx.recodingOrder('bezierCurveTo',[141.82600000000002,460.108,138.85600000000002,463.834,138.84500000000003,467.75]);
ctx.recodingOrder('bezierCurveTo',[138.83400000000003,471.589,141.122,475.587,144.95900000000003,478.449]);
ctx.recodingOrder('bezierCurveTo',[148.84300000000002,481.343,153.80600000000004,482.854,158.15000000000003,483.94800000000004]);
ctx.recodingOrder('bezierCurveTo',[172.86300000000003,487.66,187.45400000000004,489.27500000000003,204.12700000000004,489.093]);
ctx.recodingOrder('bezierCurveTo',[206.91200000000003,489.059,209.99800000000005,488.67,212.59800000000004,488.028]);
ctx.recodingOrder('bezierCurveTo',[214.19400000000005,487.624,215.80600000000004,488.612,216.19700000000003,490.20000000000005]);
ctx.recodingOrder('bezierCurveTo',[216.58800000000002,491.79300000000006,215.61600000000004,493.40500000000003,214.02500000000003,493.79900000000004]);
ctx.recodingOrder('bezierCurveTo',[209.88200000000003,494.82200000000006,206.09300000000005,495.014,204.20100000000002,495.038]);
ctx.recodingOrder('bezierCurveTo',[203.318,495.048,202.435,495.053,201.558,495.053]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[224.007,478.562]);
ctx.recodingOrder('bezierCurveTo',[222.865,478.562,221.77700000000002,477.901,221.29,476.789]);
ctx.recodingOrder('bezierCurveTo',[220.571,475.17199999999997,219.266,473.972,217.606,473.41499999999996]);
ctx.recodingOrder('bezierCurveTo',[215.487,472.70699999999994,212.96099999999998,472.95799999999997,210.271,473.227]);
ctx.recodingOrder('lineTo',[209.53699999999998,473.301]);
ctx.recodingOrder('bezierCurveTo',[186.36399999999998,475.602,166.62499999999997,472.90999999999997,147.46299999999997,464.856]);
ctx.recodingOrder('bezierCurveTo',[145.95199999999997,464.219,145.23799999999997,462.478,145.87699999999995,460.964]);
ctx.recodingOrder('bezierCurveTo',[146.51099999999994,459.447,148.26599999999996,458.747,149.76599999999996,459.376]);
ctx.recodingOrder('bezierCurveTo',[167.97699999999998,467.02799999999996,186.76899999999995,469.584,208.95499999999996,467.387]);
ctx.recodingOrder('lineTo',[209.66899999999995,467.316]);
ctx.recodingOrder('bezierCurveTo',[212.71799999999996,467.00699999999995,216.16399999999996,466.655,219.49799999999996,467.78099999999995]);
ctx.recodingOrder('bezierCurveTo',[222.75899999999996,468.87799999999993,225.32699999999997,471.22399999999993,226.72199999999995,474.38899999999995]);
ctx.recodingOrder('bezierCurveTo',[227.38799999999995,475.88999999999993,226.70599999999996,477.64399999999995,225.20499999999996,478.30799999999994]);
ctx.recodingOrder('bezierCurveTo',[224.816,478.48,224.409,478.562,224.007,478.562]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[220.334,473.103]);
ctx.recodingOrder('bezierCurveTo',[220.302,473.103,220.27100000000002,473.103,220.239,473.1]);
ctx.recodingOrder('bezierCurveTo',[218.601,473.047,217.312,471.67600000000004,217.364,470.035]);
ctx.recodingOrder('bezierCurveTo',[217.655,460.89500000000004,218.754,451.73400000000004,220.635,442.809]);
ctx.recodingOrder('bezierCurveTo',[220.968,441.20300000000003,222.569,440.18800000000005,224.155,440.51300000000003]);
ctx.recodingOrder('bezierCurveTo',[225.761,440.85100000000006,226.787,442.42900000000003,226.449,444.035]);
ctx.recodingOrder('bezierCurveTo',[224.64200000000002,452.62,223.585,461.432,223.305,470.226]);
ctx.recodingOrder('bezierCurveTo',[223.252,471.832,221.936,473.103,220.334,473.103]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#9A1E34";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[275.854,610.085]);
ctx.recodingOrder('bezierCurveTo',[276.936,607.5690000000001,278.30199999999996,605.182,279.349,602.6510000000001]);
ctx.recodingOrder('bezierCurveTo',[280.37399999999997,600.1740000000001,281.08799999999997,597.5680000000001,281.469,594.9150000000001]);
ctx.recodingOrder('bezierCurveTo',[281.596,594.032,281.649,593.0210000000001,281.044,592.3650000000001]);
ctx.recodingOrder('bezierCurveTo',[280.639,591.9250000000001,280.02799999999996,591.7530000000002,279.44899999999996,591.6000000000001]);
ctx.recodingOrder('bezierCurveTo',[274.64399999999995,590.3290000000002,269.8299999999999,589.0560000000002,264.92499999999995,588.2520000000002]);
ctx.recodingOrder('bezierCurveTo',[261.47999999999996,587.6870000000001,258.00199999999995,587.3540000000002,254.53699999999995,586.9300000000002]);
ctx.recodingOrder('bezierCurveTo',[246.43499999999995,585.9370000000001,238.39599999999996,584.4370000000001,230.48199999999994,582.4410000000001]);
ctx.recodingOrder('bezierCurveTo',[228.70599999999993,581.9930000000002,226.29999999999995,581.8010000000002,225.56199999999995,583.4780000000002]);
ctx.recodingOrder('bezierCurveTo',[225.33399999999995,583.9980000000002,225.34399999999997,584.5860000000001,225.35699999999994,585.1540000000002]);
ctx.recodingOrder('bezierCurveTo',[225.76399999999995,601.5630000000002,226.16999999999993,617.9710000000002,226.57699999999994,634.3800000000002]);
ctx.recodingOrder('bezierCurveTo',[226.63099999999994,636.5510000000003,226.67599999999993,638.7790000000002,225.95099999999994,640.8260000000002]);
ctx.recodingOrder('bezierCurveTo',[225.21099999999993,642.9140000000002,223.72899999999993,644.6450000000002,222.67899999999995,646.5940000000003]);
ctx.recodingOrder('bezierCurveTo',[220.26299999999995,651.0780000000003,220.52499999999995,657.2430000000003,224.26999999999995,660.6950000000003]);
ctx.recodingOrder('bezierCurveTo',[225.77899999999994,662.0860000000002,227.71499999999995,662.9470000000002,229.70099999999996,663.4640000000003]);
ctx.recodingOrder('bezierCurveTo',[237.60399999999996,665.5230000000003,247.69899999999996,663.7470000000003,254.57599999999996,659.3430000000003]);
ctx.recodingOrder('bezierCurveTo',[259.47599999999994,656.2050000000003,262.304,650.9420000000003,265.38399999999996,646.0060000000003]);
ctx.recodingOrder('bezierCurveTo',[272.016,635.373,270.9,621.599,275.854,610.085]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#9A1E34";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[223.458,651.174]);
ctx.recodingOrder('bezierCurveTo',[228.55,647.976,229.471,641.055,229.746,635.048]);
ctx.recodingOrder('bezierCurveTo',[230.61200000000002,616.117,230.14700000000002,596.773,224.10600000000002,578.811]);
ctx.recodingOrder('bezierCurveTo',[210.098,583.839,195.11100000000002,586.118,180.24200000000002,585.481]);
ctx.recodingOrder('bezierCurveTo',[189.42800000000003,598.562,194.40300000000002,614.12,198.031,629.687]);
ctx.recodingOrder('bezierCurveTo',[198.808,633.02,199.537,636.391,200.917,639.523]);
ctx.recodingOrder('bezierCurveTo',[202.312,642.692,204.365,645.5690000000001,206.90800000000002,647.919]);
ctx.recodingOrder('bezierCurveTo',[211.35,652.026,218.336,654.391,223.458,651.174]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[248.069,493.077]);
ctx.recodingOrder('bezierCurveTo',[243.355,493.077,239.50799999999998,491.56,236.902,488.664]);
ctx.recodingOrder('bezierCurveTo',[234.006,485.44599999999997,232.896,480.816,233.689,475.27799999999996]);
ctx.recodingOrder('bezierCurveTo',[233.911,473.724,234.429,471.484,236.321,469.977]);
ctx.recodingOrder('bezierCurveTo',[237.737,468.844,239.429,468.587,240.543,468.41799999999995]);
ctx.recodingOrder('bezierCurveTo',[243.72400000000002,467.93399999999997,246.916,467.4719999999999,250.103,467.01199999999994]);
ctx.recodingOrder('bezierCurveTo',[269.815,464.15799999999996,290.193,461.20699999999994,308.689,452.84099999999995]);
ctx.recodingOrder('bezierCurveTo',[310.17400000000004,452.167,311.939,452.828,312.62100000000004,454.323]);
ctx.recodingOrder('bezierCurveTo',[313.29800000000006,455.81899999999996,312.63700000000006,457.58099999999996,311.141,458.257]);
ctx.recodingOrder('bezierCurveTo',[291.87800000000004,466.969,271.07300000000004,469.981,250.954,472.89300000000003]);
ctx.recodingOrder('bezierCurveTo',[247.78300000000002,473.353,244.607,473.812,241.431,474.29400000000004]);
ctx.recodingOrder('bezierCurveTo',[241.04000000000002,474.355,240.226,474.47700000000003,240.025,474.624]);
ctx.recodingOrder('bezierCurveTo',[240.00900000000001,474.64000000000004,239.75,474.875,239.576,476.12]);
ctx.recodingOrder('bezierCurveTo',[239.037,479.859,239.64499999999998,482.821,241.32,484.689]);
ctx.recodingOrder('bezierCurveTo',[243.265,486.848,246.367,487.202,248.676,487.12]);
ctx.recodingOrder('bezierCurveTo',[269.64599999999996,486.351,289.89099999999996,481.729,307.21999999999997,473.758]);
ctx.recodingOrder('bezierCurveTo',[311.871,471.621,317.097,466.71099999999996,317.62499999999994,461.828]);
ctx.recodingOrder('bezierCurveTo',[317.9359999999999,458.953,317.1329999999999,455.96999999999997,315.57499999999993,454.226]);
ctx.recodingOrder('bezierCurveTo',[314.4919999999999,453.016,313.13399999999996,452.424,311.41599999999994,452.419]);
ctx.recodingOrder('bezierCurveTo',[309.77299999999997,452.411,308.4459999999999,451.077,308.45699999999994,449.436]);
ctx.recodingOrder('bezierCurveTo',[308.46199999999993,447.798,309.78899999999993,446.474,311.42699999999996,446.474]);
ctx.recodingOrder('bezierCurveTo',[311.43299999999994,446.474,311.43299999999994,446.474,311.43299999999994,446.474]);
ctx.recodingOrder('bezierCurveTo',[314.84099999999995,446.48699999999997,317.80099999999993,447.798,320.00499999999994,450.26599999999996]);
ctx.recodingOrder('bezierCurveTo',[322.71599999999995,453.29999999999995,324.0369999999999,457.86299999999994,323.5349999999999,462.47099999999995]);
ctx.recodingOrder('bezierCurveTo',[322.7319999999999,469.9359999999999,315.8039999999999,476.35699999999997,309.7049999999999,479.15999999999997]);
ctx.recodingOrder('bezierCurveTo',[291.66799999999995,487.457,270.64599999999996,492.263,248.89899999999994,493.061]);
ctx.recodingOrder('bezierCurveTo',[248.618,493.071,248.343,493.077,248.069,493.077]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[238.678,470.632]);
ctx.recodingOrder('bezierCurveTo',[237.161,470.632,235.861,469.472,235.724,467.926]);
ctx.recodingOrder('bezierCurveTo',[235,459.93,233.684,451.90999999999997,231.813,444.092]);
ctx.recodingOrder('bezierCurveTo',[231.433,442.493,232.415,440.892,234.012,440.50899999999996]);
ctx.recodingOrder('bezierCurveTo',[235.603,440.10699999999997,237.21,441.11099999999993,237.595,442.70799999999997]);
ctx.recodingOrder('bezierCurveTo',[239.529,450.80699999999996,240.893,459.11199999999997,241.643,467.393]);
ctx.recodingOrder('bezierCurveTo',[241.791,469.02599999999995,240.586,470.47099999999995,238.953,470.61899999999997]);
ctx.recodingOrder('bezierCurveTo',[238.857,470.627,238.767,470.632,238.678,470.632]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[225.873,520.525]);
ctx.recodingOrder('bezierCurveTo',[210.981,520.525,196.041,517.3589999999999,182.745,510.92999999999995]);
ctx.recodingOrder('bezierCurveTo',[181.27100000000002,510.21399999999994,180.65200000000002,508.43799999999993,181.366,506.95899999999995]);
ctx.recodingOrder('bezierCurveTo',[182.085,505.48199999999997,183.866,504.87399999999997,185.335,505.57699999999994]);
ctx.recodingOrder('bezierCurveTo',[213.666,519.28,249.919,517.232,275.524,500.5009999999999]);
ctx.recodingOrder('bezierCurveTo',[276.908,499.5969999999999,278.742,499.9959999999999,279.64,501.3649999999999]);
ctx.recodingOrder('bezierCurveTo',[280.538,502.7389999999999,280.15299999999996,504.5809999999999,278.779,505.47899999999987]);
ctx.recodingOrder('bezierCurveTo',[263.521,515.444,244.734,520.525,225.873,520.525]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[283.814,539.227]);
ctx.recodingOrder('bezierCurveTo',[282.778,539.227,281.853,538.506,281.632,537.454]);
ctx.recodingOrder('bezierCurveTo',[280.713,533.073,280.284,528.573,280.353,524.084]);
ctx.recodingOrder('bezierCurveTo',[280.374,522.8629999999999,281.368,521.8879999999999,282.583,521.8879999999999]);
ctx.recodingOrder('bezierCurveTo',[282.59400000000005,521.8879999999999,282.60400000000004,521.891,282.62,521.891]);
ctx.recodingOrder('bezierCurveTo',[283.85200000000003,521.91,284.829,522.924,284.813,524.1529999999999]);
ctx.recodingOrder('bezierCurveTo',[284.74399999999997,528.3139999999999,285.146,532.4819999999999,285.997,536.5409999999999]);
ctx.recodingOrder('bezierCurveTo',[286.25100000000003,537.746,285.47900000000004,538.9269999999999,284.274,539.1809999999999]);
ctx.recodingOrder('bezierCurveTo',[284.115,539.212,283.962,539.227,283.814,539.227]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[220.334,541.495]);
ctx.recodingOrder('bezierCurveTo',[220.017,541.495,219.70000000000002,541.445,219.383,541.339]);
ctx.recodingOrder('bezierCurveTo',[207.752,537.407,194.471,532.167,184.192,523.085]);
ctx.recodingOrder('bezierCurveTo',[182.96,521.999,182.845,520.12,183.93300000000002,518.889]);
ctx.recodingOrder('bezierCurveTo',[185.02100000000002,517.655,186.89800000000002,517.547,188.12400000000002,518.63]);
ctx.recodingOrder('bezierCurveTo',[197.615,527.012,210.21400000000003,531.966,221.28500000000003,535.705]);
ctx.recodingOrder('bezierCurveTo',[222.83900000000003,536.231,223.67400000000004,537.917,223.15000000000003,539.4730000000001]);
ctx.recodingOrder('bezierCurveTo',[222.734,540.713,221.577,541.495,220.334,541.495]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[237.325,541.46]);
ctx.recodingOrder('bezierCurveTo',[236.004,541.46,234.79899999999998,540.575,234.45,539.238]);
ctx.recodingOrder('bezierCurveTo',[234.033,537.6500000000001,234.98899999999998,536.0250000000001,236.57399999999998,535.613]);
ctx.recodingOrder('bezierCurveTo',[249.95,532.125,264.53999999999996,522.417,272.875,511.45400000000006]);
ctx.recodingOrder('bezierCurveTo',[273.868,510.1410000000001,275.745,509.8980000000001,277.039,510.88900000000007]);
ctx.recodingOrder('bezierCurveTo',[278.349,511.88200000000006,278.603,513.7450000000001,277.61,515.0540000000001]);
ctx.recodingOrder('bezierCurveTo',[268.38300000000004,527.1830000000001,252.86700000000002,537.508,238.07500000000002,541.364]);
ctx.recodingOrder('bezierCurveTo',[237.822,541.428,237.573,541.46,237.325,541.46]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[277.758,594.225]);
ctx.recodingOrder('bezierCurveTo',[273.21799999999996,594.225,268.79999999999995,593.3770000000001,264.493,592.552]);
ctx.recodingOrder('lineTo',[245.95999999999998,588.982]);
ctx.recodingOrder('bezierCurveTo',[244.18999999999997,588.641,242.56699999999998,588.1279999999999,240.95499999999998,587.611]);
ctx.recodingOrder('bezierCurveTo',[239.17899999999997,587.0409999999999,237.509,586.504,235.69099999999997,586.271]);
ctx.recodingOrder('bezierCurveTo',[231.06699999999998,585.6769999999999,226.28999999999996,584.784,223.16099999999997,581.026]);
ctx.recodingOrder('bezierCurveTo',[219.66299999999998,576.822,220.06999999999996,571.231,220.72999999999996,566.318]);
ctx.recodingOrder('lineTo',[221.50699999999995,560.404]);
ctx.recodingOrder('bezierCurveTo',[221.86099999999996,557.741,222.44799999999995,553.286,225.86699999999996,550.677]);
ctx.recodingOrder('bezierCurveTo',[229.30699999999996,548.059,232.75799999999995,547.554,235.97099999999995,547.403]);
ctx.recodingOrder('bezierCurveTo',[255.40299999999993,546.4730000000001,274.89799999999997,548.169,293.88599999999997,552.415]);
ctx.recodingOrder('bezierCurveTo',[296.417,552.983,299.05499999999995,553.7149999999999,301.03099999999995,555.823]);
ctx.recodingOrder('bezierCurveTo',[302.63199999999995,557.53,303.53099999999995,559.9,303.7049999999999,562.87]);
ctx.recodingOrder('lineTo',[303.7049999999999,562.87]);
ctx.recodingOrder('bezierCurveTo',[304.50299999999993,576.253,295.20699999999994,592.4110000000001,281.5829999999999,594.005]);
ctx.recodingOrder('bezierCurveTo',[280.3,594.159,279.026,594.225,277.758,594.225]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[246.282,553.105]);
ctx.recodingOrder('bezierCurveTo',[242.942,553.105,239.597,553.184,236.257,553.34]);
ctx.recodingOrder('bezierCurveTo',[233.50400000000002,553.472,231.511,553.8530000000001,229.472,555.409]);
ctx.recodingOrder('bezierCurveTo',[228.13,556.429,227.71200000000002,558.8199999999999,227.406,561.18]);
ctx.recodingOrder('lineTo',[226.624,567.0989999999999]);
ctx.recodingOrder('bezierCurveTo',[226.111,570.9359999999999,225.773,574.8699999999999,227.72899999999998,577.2249999999999]);
ctx.recodingOrder('bezierCurveTo',[229.48399999999998,579.3259999999999,232.855,579.915,236.45399999999998,580.3739999999999]);
ctx.recodingOrder('bezierCurveTo',[238.81099999999998,580.6779999999999,240.82399999999998,581.3249999999999,242.77399999999997,581.9519999999999]);
ctx.recodingOrder('bezierCurveTo',[244.16399999999996,582.3989999999999,245.55899999999997,582.8529999999998,247.08099999999996,583.1489999999999]);
ctx.recodingOrder('lineTo',[265.614,586.7159999999999]);
ctx.recodingOrder('bezierCurveTo',[270.67699999999996,587.6889999999999,275.92999999999995,588.6929999999999,280.892,588.1059999999999]);
ctx.recodingOrder('bezierCurveTo',[291.15999999999997,586.9039999999999,298.4,573.7449999999999,297.776,563.2279999999998]);
ctx.recodingOrder('lineTo',[297.776,563.2279999999998]);
ctx.recodingOrder('bezierCurveTo',[297.713,562.1629999999998,297.474,560.7199999999998,296.69800000000004,559.8909999999998]);
ctx.recodingOrder('bezierCurveTo',[295.874,559.0139999999999,294.283,558.5989999999998,292.58700000000005,558.2209999999999]);
ctx.recodingOrder('bezierCurveTo',[277.383,554.817,261.851,553.105,246.282,553.105]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[185.524,587.329]);
ctx.recodingOrder('bezierCurveTo',[178.353,587.329,170.061,586.673,165.062,581.9119999999999]);
ctx.recodingOrder('bezierCurveTo',[162.55200000000002,579.5179999999999,161.114,576.3789999999999,159.95700000000002,573.6279999999999]);
ctx.recodingOrder('bezierCurveTo',[158.699,570.6179999999999,157.53600000000003,567.5659999999999,156.48000000000002,564.483]);
ctx.recodingOrder('bezierCurveTo',[155.58700000000002,561.8699999999999,154.73100000000002,559.064,154.92600000000002,556.0169999999999]);
ctx.recodingOrder('bezierCurveTo',[155.18,552.122,157.252,548.819,160.33200000000002,547.395]);
ctx.recodingOrder('bezierCurveTo',[164.78700000000003,545.331,167.35000000000002,545.173,171.229,544.93]);
ctx.recodingOrder('lineTo',[172.936,544.819]);
ctx.recodingOrder('bezierCurveTo',[185.894,543.9209999999999,199.02100000000002,543.891,211.958,544.737]);
ctx.recodingOrder('bezierCurveTo',[217.982,545.1279999999999,224.657,546.217,228.478,551.314]);
ctx.recodingOrder('bezierCurveTo',[229.461,552.627,229.197,554.49,227.881,555.4749999999999]);
ctx.recodingOrder('bezierCurveTo',[226.571,556.4609999999999,224.715,556.194,223.722,554.8799999999999]);
ctx.recodingOrder('bezierCurveTo',[221.354,551.7199999999999,216.482,550.9879999999998,211.567,550.6649999999998]);
ctx.recodingOrder('bezierCurveTo',[198.9,549.8409999999999,186.037,549.8669999999998,173.348,550.7469999999998]);
ctx.recodingOrder('lineTo',[171.59900000000002,550.8609999999999]);
ctx.recodingOrder('bezierCurveTo',[167.942,551.0879999999999,166.27200000000002,551.1939999999998,162.82600000000002,552.7899999999998]);
ctx.recodingOrder('bezierCurveTo',[161.758,553.2839999999999,160.966,554.7349999999999,160.85500000000002,556.3989999999999]);
ctx.recodingOrder('bezierCurveTo',[160.734,558.3519999999999,161.40500000000003,560.5099999999999,162.10200000000003,562.5559999999999]);
ctx.recodingOrder('bezierCurveTo',[163.11700000000002,565.5149999999999,164.22600000000003,568.4409999999999,165.44200000000004,571.329]);
ctx.recodingOrder('bezierCurveTo',[166.40400000000002,573.63,167.48200000000003,576.0079999999999,169.16300000000004,577.6099999999999]);
ctx.recodingOrder('bezierCurveTo',[173.40100000000004,581.6449999999999,183.14100000000005,581.4469999999999,189.57300000000004,581.3359999999999]);
ctx.recodingOrder('lineTo',[191.97700000000003,581.2969999999999]);
ctx.recodingOrder('bezierCurveTo',[202.43000000000004,581.199,212.72400000000005,579.492,222.58100000000002,576.2239999999999]);
ctx.recodingOrder('bezierCurveTo',[224.13500000000002,575.712,225.81500000000003,576.549,226.33800000000002,578.108]);
ctx.recodingOrder('bezierCurveTo',[226.85600000000002,579.664,226.01000000000002,581.348,224.45100000000002,581.8649999999999]);
ctx.recodingOrder('bezierCurveTo',[214.008,585.329,203.10100000000003,587.137,192.02900000000002,587.2429999999999]);
ctx.recodingOrder('lineTo',[189.68300000000002,587.28]);
ctx.recodingOrder('bezierCurveTo',[188.367,587.303,186.967,587.329,185.524,587.329]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#E74966";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[224.025,586.003]);
ctx.recodingOrder('bezierCurveTo',[218.495,589.9060000000001,212.76,591.9150000000001,206.216,592.9770000000001]);
ctx.recodingOrder('bezierCurveTo',[202.654,593.5550000000001,199.39700000000002,594.5190000000001,195.72500000000002,594.4300000000001]);
ctx.recodingOrder('bezierCurveTo',[194.122,594.3910000000001,186.84700000000004,594.1320000000001,186.08400000000003,592.4100000000001]);
ctx.recodingOrder('bezierCurveTo',[187.37100000000004,595.3170000000001,188.00700000000003,597.926,189.29400000000004,600.8320000000001]);
ctx.recodingOrder('bezierCurveTo',[189.56700000000004,601.4480000000001,189.86200000000005,602.0920000000001,190.40700000000004,602.4870000000001]);
ctx.recodingOrder('bezierCurveTo',[190.89100000000005,602.839,191.50600000000003,602.9440000000001,192.09800000000004,603.027]);
ctx.recodingOrder('bezierCurveTo',[203.07500000000005,604.566,212.87800000000004,601.6080000000001,222.46600000000004,596.548]);
ctx.recodingOrder('bezierCurveTo',[223.27000000000004,596.124,224.07400000000004,595.699,224.87900000000005,595.275]);
ctx.recodingOrder('bezierCurveTo',[225.05500000000004,595.182,225.24100000000004,595.0799999999999,225.33600000000004,594.905]);
ctx.recodingOrder('bezierCurveTo',[225.44400000000005,594.707,225.41100000000003,594.4649999999999,225.37500000000003,594.242]);
ctx.recodingOrder('bezierCurveTo',[224.925,591.496,224.475,588.749,224.025,586.003]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#E74966";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[224.07,611.032]);
ctx.recodingOrder('bezierCurveTo',[221.86599999999999,614.085,218.38899999999998,615.994,214.817,617.188]);
ctx.recodingOrder('bezierCurveTo',[208.364,619.346,201.238,619.444,194.728,617.4639999999999]);
ctx.recodingOrder('bezierCurveTo',[194.042,615.2719999999999,193.356,613.0799999999999,192.669,610.8879999999999]);
ctx.recodingOrder('bezierCurveTo',[203.25400000000002,613.2019999999999,214.97,610.757,223.90200000000002,604.6229999999999]);
ctx.recodingOrder('bezierCurveTo',[223.979,606.467,223.995,609.19,224.07,611.032]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#E74966";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[217.763,651.517]);
ctx.recodingOrder('bezierCurveTo',[213.592,652.71,209.048,650.258,206.556,646.7070000000001]);
ctx.recodingOrder('bezierCurveTo',[205.423,645.0910000000001,204.614,643.2740000000001,203.85000000000002,641.4540000000001]);
ctx.recodingOrder('bezierCurveTo',[202.42300000000003,638.056,201.121,634.6060000000001,199.94800000000004,631.113]);
ctx.recodingOrder('bezierCurveTo',[208.65600000000003,632.6640000000001,217.94800000000004,630.623,225.20500000000004,625.565]);
ctx.recodingOrder('bezierCurveTo',[226.11500000000004,629.945,226.31700000000004,634.4720000000001,225.80000000000004,638.916]);
ctx.recodingOrder('bezierCurveTo',[225.49500000000003,641.5440000000001,224.92400000000004,644.1850000000001,223.64600000000004,646.5010000000001]);
ctx.recodingOrder('bezierCurveTo',[222.367,648.817,220.307,650.79,217.763,651.517]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#E74966";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[280.891,601.34]);
ctx.recodingOrder('bezierCurveTo',[271.732,602.7470000000001,262.382,603.475,253.20200000000003,602.2090000000001]);
ctx.recodingOrder('bezierCurveTo',[244.02200000000002,600.9440000000001,234.97100000000003,597.576,227.94600000000003,591.532]);
ctx.recodingOrder('bezierCurveTo',[227.65000000000003,594.885,226.60300000000004,597.561,226.30700000000002,600.914]);
ctx.recodingOrder('bezierCurveTo',[226.26600000000002,601.381,226.228,601.871,226.413,602.302]);
ctx.recodingOrder('bezierCurveTo',[226.632,602.8100000000001,227.12,603.142,227.585,603.442]);
ctx.recodingOrder('bezierCurveTo',[239.89100000000002,611.377,254.267,615.046,268.80400000000003,613.126]);
ctx.recodingOrder('bezierCurveTo',[271.56300000000005,612.762,276.43500000000006,612.317,278.497,610.232]);
ctx.recodingOrder('bezierCurveTo',[280.54,608.1659999999999,280.891,603.495,280.997,600.7669999999999]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#E74966";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[227.605,624.652]);
ctx.recodingOrder('bezierCurveTo',[234.69899999999998,630.081,243.433,633.398,252.345,634.027]);
ctx.recodingOrder('bezierCurveTo',[259.217,634.5120000000001,272.843,634.4050000000001,271.313,624.245]);
ctx.recodingOrder('bezierCurveTo',[265.021,624.87,259.32,626.322,252.875,625.635]);
ctx.recodingOrder('bezierCurveTo',[246.826,624.99,240.935,623.184,235.518,620.423]);
ctx.recodingOrder('bezierCurveTo',[233.847,619.571,227.599,616.177,227.727,613.872]);
ctx.recodingOrder('bezierCurveTo',[227.574,616.616,226.5,619.0889999999999,226.348,621.834]);
ctx.recodingOrder('bezierCurveTo',[226.317,622.399,226.29000000000002,622.991,226.53,623.5029999999999]);
ctx.recodingOrder('bezierCurveTo',[226.755,623.982,227.184,624.33,227.605,624.652]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#E74966";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[236.28,666.198]);
ctx.recodingOrder('bezierCurveTo',[232.95,666.2379999999999,229.447,665.9549999999999,226.655,664.14]);
ctx.recodingOrder('bezierCurveTo',[223.87800000000001,662.335,222.149,659.143,221.782,655.851]);
ctx.recodingOrder('bezierCurveTo',[221.41500000000002,652.559,222.32500000000002,649.202,223.97500000000002,646.33]);
ctx.recodingOrder('bezierCurveTo',[225.53600000000003,643.613,227.818,641.067,227.949,637.936]);
ctx.recodingOrder('bezierCurveTo',[227.99300000000002,636.889,227.78500000000003,635.8380000000001,227.9,634.797]);
ctx.recodingOrder('bezierCurveTo',[238.483,643.691,253.482,647.041,266.844,643.496]);
ctx.recodingOrder('bezierCurveTo',[265.141,648.756,263.013,654.058,259.174,658.037]);
ctx.recodingOrder('bezierCurveTo',[253.397,664.024,244.6,666.098,236.28,666.198]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[233.721,668.792]);
ctx.recodingOrder('bezierCurveTo',[227.998,668.792,223.67000000000002,667.072,221.18,663.7950000000001]);
ctx.recodingOrder('bezierCurveTo',[215.36700000000002,656.1510000000001,219.37300000000002,645.4520000000001,223.03,639.6940000000001]);
ctx.recodingOrder('bezierCurveTo',[221.925,620.484,221.989,601.0440000000001,223.225,581.9060000000001]);
ctx.recodingOrder('bezierCurveTo',[223.331,580.2620000000001,224.874,578.989,226.38,579.1310000000001]);
ctx.recodingOrder('bezierCurveTo',[228.018,579.2370000000001,229.26,580.6480000000001,229.155,582.2860000000001]);
ctx.recodingOrder('bezierCurveTo',[227.918,601.5120000000001,227.871,621.041,229.017,640.331]);
ctx.recodingOrder('bezierCurveTo',[229.06,640.994,228.874,641.65,228.499,642.1940000000001]);
ctx.recodingOrder('bezierCurveTo',[225.386,646.71,222.131,655.229,225.914,660.1990000000001]);
ctx.recodingOrder('bezierCurveTo',[227.69,662.5380000000001,231.48899999999998,662.916,234.45399999999998,662.836]);
ctx.recodingOrder('bezierCurveTo',[246.165,662.474,254.64199999999997,658.933,259.64099999999996,652.312]);
ctx.recodingOrder('bezierCurveTo',[263.05999999999995,647.791,263.95799999999997,642.071,264.91499999999996,636.017]);
ctx.recodingOrder('bezierCurveTo',[265.26899999999995,633.774,265.623,631.541,266.104,629.3720000000001]);
ctx.recodingOrder('bezierCurveTo',[267.378,623.6170000000001,269.693,618.259,271.928,613.0740000000001]);
ctx.recodingOrder('bezierCurveTo',[274.65,606.777,277.218,600.83,278.016,594.326]);
ctx.recodingOrder('bezierCurveTo',[278.21700000000004,592.696,279.73400000000004,591.544,281.324,591.74]);
ctx.recodingOrder('bezierCurveTo',[282.957,591.938,284.11400000000003,593.421,283.914,595.051]);
ctx.recodingOrder('bezierCurveTo',[283.01599999999996,602.402,280.157,609.027,277.387,615.431]);
ctx.recodingOrder('bezierCurveTo',[275.162,620.586,273.059,625.4530000000001,271.907,630.653]);
ctx.recodingOrder('bezierCurveTo',[271.452,632.703,271.125,634.82,270.787,636.9440000000001]);
ctx.recodingOrder('bezierCurveTo',[269.762,643.455,268.7,650.1850000000001,264.387,655.8950000000001]);
ctx.recodingOrder('bezierCurveTo',[258.246,664.0230000000001,248.237,668.3560000000001,234.63400000000001,668.777]);
ctx.recodingOrder('bezierCurveTo',[234.328,668.787,234.022,668.792,233.721,668.792]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[217.401,655.293]);
ctx.recodingOrder('bezierCurveTo',[212.81400000000002,655.293,208.211,653.316,205.14000000000001,649.9]);
ctx.recodingOrder('bezierCurveTo',[203.15800000000002,647.691,201.93200000000002,645.1569999999999,200.74800000000002,642.538]);
ctx.recodingOrder('bezierCurveTo',[196.949,634.162,193.61300000000003,625.469,190.85000000000002,616.706]);
ctx.recodingOrder('lineTo',[189.65000000000003,612.838]);
ctx.recodingOrder('bezierCurveTo',[186.90200000000004,603.905,184.06400000000002,594.664,178.10800000000003,587.8919999999999]);
ctx.recodingOrder('bezierCurveTo',[177.02500000000003,586.6579999999999,177.14100000000002,584.7819999999999,178.37800000000004,583.6959999999999]);
ctx.recodingOrder('bezierCurveTo',[179.59900000000005,582.6149999999999,181.48600000000005,582.7289999999999,182.56900000000005,583.9659999999999]);
ctx.recodingOrder('bezierCurveTo',[189.37100000000004,591.6999999999999,192.39900000000006,601.5579999999999,195.33200000000005,611.0919999999999]);
ctx.recodingOrder('lineTo',[196.51500000000004,614.9159999999998]);
ctx.recodingOrder('bezierCurveTo',[199.21000000000004,623.4539999999998,202.45500000000004,631.9219999999998,206.16000000000005,640.0849999999998]);
ctx.recodingOrder('bezierCurveTo',[207.14800000000005,642.2669999999998,208.15200000000004,644.3549999999998,209.56300000000005,645.9299999999998]);
ctx.recodingOrder('bezierCurveTo',[211.89900000000006,648.5269999999998,215.61400000000003,649.8249999999998,219.07600000000005,649.2059999999998]);
ctx.recodingOrder('bezierCurveTo',[220.67200000000005,648.9209999999998,222.23100000000005,649.9939999999998,222.52200000000005,651.6129999999998]);
ctx.recodingOrder('bezierCurveTo',[222.80700000000004,653.2279999999998,221.72900000000004,654.7709999999998,220.11200000000005,655.0559999999998]);
ctx.recodingOrder('bezierCurveTo',[219.22,655.213,218.31,655.293,217.401,655.293]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[388.742,271.462]);
ctx.recodingOrder('bezierCurveTo',[380.72,243.16,367.19100000000003,212.575,349.625,183.012]);
ctx.recodingOrder('lineTo',[348.642,181.353]);
ctx.recodingOrder('bezierCurveTo',[333.887,156.517,317.166,128.371,290.73199999999997,112.65700000000001]);
ctx.recodingOrder('bezierCurveTo',[288.16999999999996,111.13400000000001,285.527,109.77600000000001,282.81699999999995,108.57700000000001]);
ctx.recodingOrder('bezierCurveTo',[286.23099999999994,108.58000000000001,289.66099999999994,108.64000000000001,293.1039999999999,108.76000000000002]);
ctx.recodingOrder('bezierCurveTo',[293.1409999999999,108.76300000000002,293.17799999999994,108.76300000000002,293.2099999999999,108.76300000000002]);
ctx.recodingOrder('bezierCurveTo',[294.8059999999999,108.76300000000002,296.1219999999999,107.50000000000001,296.17999999999995,105.89600000000002]);
ctx.recodingOrder('bezierCurveTo',[296.23799999999994,104.25500000000001,294.95399999999995,102.87900000000002,293.316,102.82000000000002]);
ctx.recodingOrder('bezierCurveTo',[236.07199999999997,100.78300000000002,182.34199999999998,114.79000000000002,142.09999999999997,142.252]);
ctx.recodingOrder('bezierCurveTo',[127.98999999999997,151.87800000000001,115.85699999999997,162.981,106.02699999999996,175.247]);
ctx.recodingOrder('bezierCurveTo',[99.54299999999996,183.335,87.73199999999996,199.425,81.47499999999997,216.28300000000002]);
ctx.recodingOrder('bezierCurveTo',[71.53399999999996,243.079,65.83699999999996,272.171,64.53699999999996,302.754]);
ctx.recodingOrder('bezierCurveTo',[63.38499999999996,329.735,61.95299999999996,363.314,78.58899999999997,387.261]);
ctx.recodingOrder('bezierCurveTo',[83.97699999999998,395.01700000000005,90.02799999999996,403.112,97.39099999999996,409.07500000000005]);
ctx.recodingOrder('bezierCurveTo',[92.61899999999996,406.74700000000007,88.04999999999997,403.58900000000006,83.75199999999997,399.58400000000006]);
ctx.recodingOrder('bezierCurveTo',[82.55799999999996,398.46700000000004,80.67099999999996,398.53200000000004,79.55599999999997,399.7320000000001]);
ctx.recodingOrder('bezierCurveTo',[78.43599999999996,400.9340000000001,78.49899999999997,402.8130000000001,79.70399999999997,403.9330000000001]);
ctx.recodingOrder('bezierCurveTo',[90.96599999999997,414.4310000000001,103.90699999999997,419.8030000000001,117.67399999999996,419.8030000000001]);
ctx.recodingOrder('bezierCurveTo',[121.77499999999996,419.8030000000001,125.94899999999997,419.3250000000001,130.17299999999997,418.3660000000001]);
ctx.recodingOrder('bezierCurveTo',[132.56199999999998,417.8210000000001,134.96099999999998,417.2290000000001,137.35999999999999,416.6380000000001]);
ctx.recodingOrder('bezierCurveTo',[147.82899999999998,414.0570000000001,158.637,411.3850000000001,169.053,412.9630000000001]);
ctx.recodingOrder('bezierCurveTo',[170.617,413.2010000000001,172.18699999999998,412.09400000000005,172.435,410.47100000000006]);
ctx.recodingOrder('bezierCurveTo',[172.683,408.84600000000006,171.563,407.33200000000005,169.94,407.08600000000007]);
ctx.recodingOrder('bezierCurveTo',[158.377,405.32900000000006,146.96699999999998,408.1460000000001,135.938,410.8670000000001]);
ctx.recodingOrder('bezierCurveTo',[133.57,411.4510000000001,131.208,412.0350000000001,128.851,412.5680000000001]);
ctx.recodingOrder('bezierCurveTo',[126.057,413.2050000000001,123.288,413.5830000000001,120.548,413.7430000000001]);
ctx.recodingOrder('bezierCurveTo',[120.116,412.8540000000001,119.255,412.1960000000001,118.203,412.0820000000001]);
ctx.recodingOrder('bezierCurveTo',[103.099,410.44400000000013,92.355,396.6590000000001,83.47200000000001,383.86700000000013]);
ctx.recodingOrder('bezierCurveTo',[67.97200000000001,361.56300000000016,69.36200000000001,329.0960000000001,70.477,303.00600000000014]);
ctx.recodingOrder('bezierCurveTo',[71.141,287.40000000000015,72.98100000000001,272.20100000000014,75.955,257.5090000000001]);
ctx.recodingOrder('bezierCurveTo',[77.005,258.1900000000001,79.356,259.00300000000016,96.949,259.7110000000001]);
ctx.recodingOrder('bezierCurveTo',[119.699,260.6280000000001,159.853,261.00800000000015,202.78,261.00800000000015]);
ctx.recodingOrder('bezierCurveTo',[281.45799999999997,261.00800000000015,369.427,259.72900000000016,376.414,258.1440000000002]);
ctx.recodingOrder('bezierCurveTo',[377.06399999999996,257.99600000000015,377.60699999999997,257.6380000000002,378.008,257.16600000000017]);
ctx.recodingOrder('bezierCurveTo',[379.866,262.5380000000002,381.542,267.85100000000017,383.025,273.08300000000014]);
ctx.recodingOrder('bezierCurveTo',[388.791,293.4230000000001,390.566,315.32000000000016,388.289,338.16900000000015]);
ctx.recodingOrder('bezierCurveTo',[387.19599999999997,349.14300000000014,385.155,360.24800000000016,382.228,371.1750000000002]);
ctx.recodingOrder('bezierCurveTo',[380.31,378.3380000000002,377.535,385.08700000000016,373.973,391.23600000000016]);
ctx.recodingOrder('bezierCurveTo',[372.689,393.4610000000002,371.22,395.71200000000016,369.238,397.11300000000017]);
ctx.recodingOrder('bezierCurveTo',[367.114,398.61400000000015,364.255,399.2420000000002,361.485,399.8500000000002]);
ctx.recodingOrder('bezierCurveTo',[344.051,403.6840000000002,326.009,404.3740000000002,309.341,401.86300000000017]);
ctx.recodingOrder('lineTo',[306.815,401.47700000000015]);
ctx.recodingOrder('bezierCurveTo',[294.851,399.63800000000015,279.943,397.35500000000013,268.538,402.05300000000017]);
ctx.recodingOrder('bezierCurveTo',[267.021,402.6770000000002,266.297,404.4150000000002,266.921,405.9320000000002]);
ctx.recodingOrder('bezierCurveTo',[267.545,407.4540000000002,269.293,408.1810000000002,270.8,407.5490000000002]);
ctx.recodingOrder('bezierCurveTo',[280.682,403.4790000000002,294.676,405.6250000000002,305.91700000000003,407.3530000000002]);
ctx.recodingOrder('lineTo',[308.45300000000003,407.7390000000002]);
ctx.recodingOrder('bezierCurveTo',[315.307,408.7720000000002,322.37300000000005,409.2870000000002,329.528,409.2870000000002]);
ctx.recodingOrder('bezierCurveTo',[340.541,409.2870000000002,351.771,408.0690000000002,362.764,405.65600000000023]);
ctx.recodingOrder('bezierCurveTo',[365.95,404.9550000000002,369.56,404.16300000000024,372.66200000000003,401.97000000000025]);
ctx.recodingOrder('bezierCurveTo',[375.58400000000006,399.90600000000023,377.492,397.02600000000024,379.12000000000006,394.21700000000027]);
ctx.recodingOrder('bezierCurveTo',[382.9410000000001,387.61400000000026,385.91600000000005,380.37900000000025,387.96700000000004,372.71300000000025]);
ctx.recodingOrder('bezierCurveTo',[390.98,361.47800000000024,393.07700000000006,350.05500000000023,394.208,338.75900000000024]);
ctx.recodingOrder('bezierCurveTo',[396.553,315.166,394.714,292.524,388.742,271.462]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[375.092,252.348]);
ctx.recodingOrder('bezierCurveTo',[366.145,254.383,164.355,256.48900000000003,97.19099999999997,253.77200000000002]);
ctx.recodingOrder('bezierCurveTo',[82.18799999999997,253.17000000000002,79.33899999999997,252.50100000000003,79.15899999999998,252.50100000000003]);
ctx.recodingOrder('bezierCurveTo',[78.54499999999997,252.06800000000004,77.82499999999997,251.91000000000003,77.13299999999998,251.98200000000003]);
ctx.recodingOrder('bezierCurveTo',[79.72299999999998,240.42200000000003,83.02199999999998,229.18800000000002,87.04399999999998,218.348]);
ctx.recodingOrder('bezierCurveTo',[91.40399999999998,206.608,100.01299999999998,192.252,110.66599999999998,178.961]);
ctx.recodingOrder('bezierCurveTo',[120.12599999999998,167.155,131.831,156.45600000000002,145.45,147.16000000000003]);
ctx.recodingOrder('bezierCurveTo',[178.147,124.84800000000003,220.07399999999998,111.69000000000003,265.572,109.06900000000002]);
ctx.recodingOrder('bezierCurveTo',[265.906,109.31800000000001,266.294,109.50600000000001,266.729,109.59800000000001]);
ctx.recodingOrder('bezierCurveTo',[274.138,111.15200000000002,281.193,113.9,287.698,117.76500000000001]);
ctx.recodingOrder('bezierCurveTo',[312.827,132.705,328.438,158.978,343.53099999999995,184.387]);
ctx.recodingOrder('lineTo',[344.51899999999995,186.049]);
ctx.recodingOrder('bezierCurveTo',[357.5919999999999,208.054,368.38499999999993,230.613,376.28399999999993,252.324]);
ctx.recodingOrder('bezierCurveTo',[375.899,252.253,375.495,252.255,375.092,252.348]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[378.088,124.155]);
ctx.recodingOrder('bezierCurveTo',[377.44300000000004,124.155,376.793,123.946,376.249,123.518]);
ctx.recodingOrder('bezierCurveTo',[374.959,122.503,374.738,120.635,375.752,119.346]);
ctx.recodingOrder('bezierCurveTo',[384.757,107.899,397.012,100.366,408.866,93.078]);
ctx.recodingOrder('bezierCurveTo',[412.38599999999997,90.917,415.895,88.75800000000001,419.31399999999996,86.504]);
ctx.recodingOrder('bezierCurveTo',[437.462,74.542,449.61699999999996,61.423,456.48699999999997,46.398]);
ctx.recodingOrder('bezierCurveTo',[457.66499999999996,43.811,459.018,40.411,458.96,37.06]);
ctx.recodingOrder('bezierCurveTo',[458.918,34.682,457.98199999999997,32.629000000000005,456.402,31.429000000000002]);
ctx.recodingOrder('bezierCurveTo',[454.928,30.309,453.014,30.015,450.901,30.565]);
ctx.recodingOrder('bezierCurveTo',[445.442,31.987000000000002,441.632,36.574,438.493,40.762]);
ctx.recodingOrder('bezierCurveTo',[435.481,44.781,432.452,48.055,429.245,51.521]);
ctx.recodingOrder('bezierCurveTo',[428.051,52.813,426.841,54.121,425.615,55.49]);
ctx.recodingOrder('bezierCurveTo',[422.98900000000003,58.418,420.01300000000003,61.736000000000004,416.25600000000003,64.22800000000001]);
ctx.recodingOrder('bezierCurveTo',[415.3,64.86200000000001,414.12100000000004,65.51700000000001,412.636,65.56500000000001]);
ctx.recodingOrder('bezierCurveTo',[412.583,65.56700000000001,412.535,65.56700000000001,412.488,65.56700000000001]);
ctx.recodingOrder('bezierCurveTo',[410.047,65.56700000000001,407.795,63.815000000000005,406.965,61.257000000000005]);
ctx.recodingOrder('bezierCurveTo',[405.955,58.142,405.71799999999996,54.545,405.506,51.37200000000001]);
ctx.recodingOrder('bezierCurveTo',[405.43199999999996,50.26500000000001,405.363,49.184000000000005,405.258,48.16100000000001]);
ctx.recodingOrder('bezierCurveTo',[405.036,45.86200000000001,404.803,43.48700000000001,404.01099999999997,41.44200000000001]);
ctx.recodingOrder('bezierCurveTo',[403.282,39.53900000000001,402.066,38.12100000000001,400.69199999999995,37.547000000000004]);
ctx.recodingOrder('bezierCurveTo',[398.0919999999999,36.472,394.69899999999996,38.43000000000001,393.08199999999994,40.887]);
ctx.recodingOrder('bezierCurveTo',[391.01599999999996,44.036,390.49799999999993,48.328,390.03799999999995,52.117000000000004]);
ctx.recodingOrder('bezierCurveTo',[390.006,52.373000000000005,389.97999999999996,52.899,389.9429999999999,53.621]);
ctx.recodingOrder('bezierCurveTo',[389.27199999999993,65.245,387.8499999999999,73.391,383.1039999999999,75.36500000000001]);
ctx.recodingOrder('bezierCurveTo',[381.5659999999999,76.00200000000001,379.13499999999993,76.221,376.22799999999995,73.64200000000001]);
ctx.recodingOrder('bezierCurveTo',[374.28299999999996,71.92200000000001,373.81299999999993,69.39300000000001,373.53299999999996,67.882]);
ctx.recodingOrder('bezierCurveTo',[373.02099999999996,65.12100000000001,372.62399999999997,62.370000000000005,372.22299999999996,59.60600000000001]);
ctx.recodingOrder('lineTo',[371.763,56.45700000000001]);
ctx.recodingOrder('bezierCurveTo',[371.044,51.64200000000001,367.00199999999995,47.96900000000001,363.83099999999996,47.68200000000001]);
ctx.recodingOrder('bezierCurveTo',[360.89799999999997,47.44200000000001,359.318,50.17700000000001,358.50899999999996,52.53600000000001]);
ctx.recodingOrder('bezierCurveTo',[357.74799999999993,54.769000000000005,357.76899999999995,57.40100000000001,357.78499999999997,59.94800000000001]);
ctx.recodingOrder('bezierCurveTo',[357.796,61.766000000000005,357.88,63.650000000000006,357.96,65.57100000000001]);
ctx.recodingOrder('bezierCurveTo',[358.346,74.72200000000001,358.784,85.09200000000001,352.24199999999996,92.87700000000001]);
ctx.recodingOrder('bezierCurveTo',[351.18999999999994,94.135,349.31999999999994,94.293,348.05699999999996,93.239]);
ctx.recodingOrder('bezierCurveTo',[346.799,92.182,346.64099999999996,90.308,347.698,89.051]);
ctx.recodingOrder('bezierCurveTo',[352.75,83.037,352.38,74.286,352.02099999999996,65.822]);
ctx.recodingOrder('bezierCurveTo',[351.93699999999995,63.830000000000005,351.85699999999997,61.872,351.847,59.988]);
ctx.recodingOrder('bezierCurveTo',[351.82599999999996,57.092,351.799,53.802,352.888,50.619]);
ctx.recodingOrder('bezierCurveTo',[355.832,41.971000000000004,361.909,41.535,364.361,41.763999999999996]);
ctx.recodingOrder('bezierCurveTo',[370.62899999999996,42.32899999999999,376.585,48.525999999999996,377.64099999999996,55.577999999999996]);
ctx.recodingOrder('lineTo',[378.10599999999994,58.75899999999999]);
ctx.recodingOrder('bezierCurveTo',[378.49699999999996,61.440999999999995,378.87799999999993,64.115,379.37999999999994,66.797]);
ctx.recodingOrder('bezierCurveTo',[379.5229999999999,67.55799999999999,379.75499999999994,68.829,380.17299999999994,69.196]);
ctx.recodingOrder('bezierCurveTo',[380.81199999999995,69.761,381.12399999999997,69.835,381.12399999999997,69.835]);
ctx.recodingOrder('bezierCurveTo',[381.33,69.52799999999999,383.20599999999996,67.22699999999999,384.00899999999996,53.27799999999999]);
ctx.recodingOrder('bezierCurveTo',[384.06199999999995,52.38199999999999,384.09899999999993,51.72399999999999,384.14099999999996,51.40699999999999]);
ctx.recodingOrder('bezierCurveTo',[384.64799999999997,47.18699999999999,385.28299999999996,41.93899999999999,388.11499999999995,37.624999999999986]);
ctx.recodingOrder('bezierCurveTo',[391.04799999999994,33.158999999999985,397.23099999999994,29.681999999999988,402.97599999999994,32.05999999999999]);
ctx.recodingOrder('bezierCurveTo',[405.8879999999999,33.27299999999999,408.22399999999993,35.84399999999999,409.5609999999999,39.30299999999999]);
ctx.recodingOrder('bezierCurveTo',[410.6389999999999,42.10399999999999,410.9249999999999,45.01299999999999,411.17799999999994,47.581999999999994]);
ctx.recodingOrder('bezierCurveTo',[411.28399999999993,48.66,411.35799999999995,49.806999999999995,411.43699999999995,50.98]);
ctx.recodingOrder('bezierCurveTo',[411.63199999999995,53.94499999999999,411.83899999999994,57.012,412.621,59.425]);
ctx.recodingOrder('bezierCurveTo',[412.388,59.613,412.542,59.556999999999995,412.96999999999997,59.276999999999994]);
ctx.recodingOrder('bezierCurveTo',[416.09299999999996,57.202999999999996,418.799,54.184999999999995,421.18699999999995,51.52199999999999]);
ctx.recodingOrder('bezierCurveTo',[422.43399999999997,50.13199999999999,423.66499999999996,48.79999999999999,424.881,47.486999999999995]);
ctx.recodingOrder('bezierCurveTo',[427.98299999999995,44.13399999999999,430.91099999999994,40.971,433.73799999999994,37.19499999999999]);
ctx.recodingOrder('bezierCurveTo',[437.75899999999996,31.83599999999999,442.4359999999999,26.627999999999993,449.40199999999993,24.815999999999995]);
ctx.recodingOrder('bezierCurveTo',[453.2969999999999,23.785999999999994,457.0539999999999,24.466999999999995,459.9919999999999,26.691999999999997]);
ctx.recodingOrder('bezierCurveTo',[463.0359999999999,29.000999999999998,464.8269999999999,32.742999999999995,464.90199999999993,36.956999999999994]);
ctx.recodingOrder('bezierCurveTo',[464.98099999999994,41.50399999999999,463.3379999999999,45.71099999999999,461.88999999999993,48.86899999999999]);
ctx.recodingOrder('bezierCurveTo',[454.54999999999995,64.94,441.69199999999995,78.87299999999999,422.59299999999996,91.466]);
ctx.recodingOrder('bezierCurveTo',[419.121,93.75399999999999,415.554,95.94699999999999,411.98099999999994,98.143]);
ctx.recodingOrder('bezierCurveTo',[400.57199999999995,105.156,388.77599999999995,112.406,380.42599999999993,123.018]);
ctx.recodingOrder('bezierCurveTo',[379.837,123.764,378.965,124.155,378.088,124.155]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[87.604,123.645]);
ctx.recodingOrder('bezierCurveTo',[86.726,123.645,85.855,123.25399999999999,85.268,122.509]);
ctx.recodingOrder('bezierCurveTo',[77.373,112.465,67.411,106.594,56.868,100.379]);
ctx.recodingOrder('bezierCurveTo',[52.873000000000005,98.022,48.809000000000005,95.625,44.75,92.95100000000001]);
ctx.recodingOrder('bezierCurveTo',[25.652,80.36,12.794,66.427,5.454,50.354]);
ctx.recodingOrder('bezierCurveTo',[4.006,47.196,2.3629999999999995,42.987,2.4419999999999997,38.445]);
ctx.recodingOrder('bezierCurveTo',[2.5159999999999996,34.228,4.3069999999999995,30.489,7.346,28.18]);
ctx.recodingOrder('bezierCurveTo',[10.29,25.95,14.047,25.29,17.942,26.302]);
ctx.recodingOrder('bezierCurveTo',[24.913,28.12,29.59,33.328,33.606,38.684]);
ctx.recodingOrder('bezierCurveTo',[36.433,42.455,39.356,45.617999999999995,42.453,48.962999999999994]);
ctx.recodingOrder('bezierCurveTo',[43.67400000000001,50.282,44.911,51.61599999999999,46.158,53.007999999999996]);
ctx.recodingOrder('bezierCurveTo',[48.541000000000004,55.669,51.242000000000004,58.684,54.376000000000005,60.766]);
ctx.recodingOrder('bezierCurveTo',[54.788000000000004,61.038,54.946000000000005,61.109,55.005,61.125]);
ctx.recodingOrder('bezierCurveTo',[55.507000000000005,58.498,55.713,55.434,55.909000000000006,52.469]);
ctx.recodingOrder('bezierCurveTo',[55.983000000000004,51.296,56.062000000000005,50.149,56.168000000000006,49.066]);
ctx.recodingOrder('bezierCurveTo',[56.422000000000004,46.503,56.70700000000001,43.591,57.785000000000004,40.790000000000006]);
ctx.recodingOrder('bezierCurveTo',[59.12200000000001,37.331,61.458000000000006,34.760000000000005,64.37,33.553000000000004]);
ctx.recodingOrder('bezierCurveTo',[70.083,31.162000000000006,76.298,34.647000000000006,79.23100000000001,39.11300000000001]);
ctx.recodingOrder('bezierCurveTo',[82.06400000000001,43.431000000000004,82.69800000000001,48.678000000000004,83.20500000000001,52.89500000000001]);
ctx.recodingOrder('bezierCurveTo',[83.24800000000002,53.21500000000001,83.284,53.87300000000001,83.33700000000002,54.76800000000001]);
ctx.recodingOrder('bezierCurveTo',[84.08800000000002,67.77600000000001,85.76800000000001,70.65400000000001,86.44500000000002,71.28500000000001]);
ctx.recodingOrder('bezierCurveTo',[86.50800000000002,71.19800000000001,86.77800000000002,71.037,87.17400000000002,70.68500000000002]);
ctx.recodingOrder('bezierCurveTo',[87.59100000000002,70.31500000000001,87.82400000000003,69.04400000000001,87.96700000000003,68.28600000000002]);
ctx.recodingOrder('bezierCurveTo',[88.46900000000002,65.59600000000002,88.85500000000003,62.91900000000002,89.24100000000003,60.22900000000001]);
ctx.recodingOrder('lineTo',[89.70600000000003,57.061000000000014]);
ctx.recodingOrder('bezierCurveTo',[90.75700000000003,50.012000000000015,96.71900000000004,43.81500000000001,102.98600000000003,43.25200000000002]);
ctx.recodingOrder('bezierCurveTo',[105.44900000000003,43.030000000000015,111.51500000000003,43.45300000000002,114.45900000000003,52.109000000000016]);
ctx.recodingOrder('bezierCurveTo',[115.54700000000003,55.29000000000001,115.52100000000003,58.58000000000001,115.50000000000003,61.478000000000016]);
ctx.recodingOrder('bezierCurveTo',[115.48900000000003,63.356000000000016,115.41000000000003,65.31500000000001,115.32500000000003,67.31000000000002]);
ctx.recodingOrder('bezierCurveTo',[114.96600000000004,75.77100000000002,114.59600000000003,84.52200000000002,119.64800000000002,90.53600000000002]);
ctx.recodingOrder('bezierCurveTo',[120.70500000000003,91.79400000000001,120.54600000000002,93.66700000000002,119.28900000000003,94.72400000000002]);
ctx.recodingOrder('bezierCurveTo',[118.02600000000002,95.77300000000002,116.15500000000003,95.61500000000002,115.10400000000003,94.36200000000002]);
ctx.recodingOrder('bezierCurveTo',[108.56200000000003,86.57800000000002,109.00000000000003,76.20700000000002,109.38600000000002,67.05900000000003]);
ctx.recodingOrder('bezierCurveTo',[109.46500000000002,65.13800000000002,109.55000000000003,63.252000000000024,109.56100000000002,61.43900000000003]);
ctx.recodingOrder('bezierCurveTo',[109.57700000000003,58.88900000000003,109.59800000000003,56.257000000000026,108.83700000000002,54.02700000000003]);
ctx.recodingOrder('bezierCurveTo',[108.02800000000002,51.66400000000003,106.46900000000002,48.91900000000003,103.51500000000001,49.17100000000003]);
ctx.recodingOrder('bezierCurveTo',[100.34400000000001,49.456000000000024,96.30200000000002,53.129000000000026,95.58300000000001,57.94100000000003]);
ctx.recodingOrder('lineTo',[95.12300000000002,61.080000000000034]);
ctx.recodingOrder('bezierCurveTo',[94.72600000000001,63.84700000000004,94.32500000000002,66.60300000000004,93.81300000000002,69.37200000000003]);
ctx.recodingOrder('bezierCurveTo',[93.53300000000002,70.87800000000003,93.06200000000001,73.40700000000002,91.11800000000002,75.13200000000003]);
ctx.recodingOrder('bezierCurveTo',[88.21700000000003,77.71300000000004,85.78600000000003,77.49700000000003,84.24200000000002,76.85200000000003]);
ctx.recodingOrder('bezierCurveTo',[79.49600000000002,74.87800000000003,78.07400000000001,66.73400000000004,77.40400000000002,55.11100000000003]);
ctx.recodingOrder('bezierCurveTo',[77.36700000000002,54.390000000000036,77.34000000000003,53.86400000000003,77.30900000000003,53.607000000000035]);
ctx.recodingOrder('bezierCurveTo',[76.84900000000003,49.81800000000003,76.33100000000003,45.52700000000004,74.26500000000003,42.37400000000004]);
ctx.recodingOrder('bezierCurveTo',[72.65300000000003,39.92000000000004,69.25500000000002,37.93500000000004,66.65500000000003,39.03900000000004]);
ctx.recodingOrder('bezierCurveTo',[65.28100000000003,39.60900000000004,64.07100000000003,41.02900000000004,63.33600000000003,42.92800000000004]);
ctx.recodingOrder('bezierCurveTo',[62.54300000000003,44.97300000000004,62.31100000000003,47.34800000000004,62.08900000000003,49.64500000000004]);
ctx.recodingOrder('bezierCurveTo',[61.983000000000025,50.67300000000004,61.91400000000003,51.75400000000004,61.84100000000003,52.85800000000004]);
ctx.recodingOrder('bezierCurveTo',[61.63000000000003,56.03100000000004,61.39200000000003,59.62800000000004,60.382000000000026,62.74300000000004]);
ctx.recodingOrder('bezierCurveTo',[59.53600000000003,65.35400000000004,56.968000000000025,67.18200000000004,54.72200000000002,67.05000000000004]);
ctx.recodingOrder('bezierCurveTo',[53.221000000000025,67.00200000000004,52.04800000000002,66.35000000000004,51.09200000000002,65.71600000000004]);
ctx.recodingOrder('bezierCurveTo',[47.32400000000002,63.211000000000034,44.35400000000002,59.89800000000004,41.73300000000002,56.97500000000004]);
ctx.recodingOrder('bezierCurveTo',[40.50700000000002,55.604000000000035,39.292000000000016,54.293000000000035,38.097000000000016,52.99800000000004]);
ctx.recodingOrder('bezierCurveTo',[34.88900000000002,49.53400000000004,31.866000000000014,46.26500000000004,28.854000000000013,42.24900000000004]);
ctx.recodingOrder('bezierCurveTo',[25.715000000000014,38.061000000000035,21.910000000000014,33.47600000000004,16.446000000000012,32.049000000000035]);
ctx.recodingOrder('bezierCurveTo',[14.332000000000011,31.502000000000034,12.419000000000011,31.793000000000035,10.945000000000011,32.91600000000003]);
ctx.recodingOrder('bezierCurveTo',[9.36500000000001,34.116000000000035,8.43000000000001,36.16900000000003,8.387000000000011,38.54700000000003]);
ctx.recodingOrder('bezierCurveTo',[8.329000000000011,41.89500000000003,9.682000000000011,45.296000000000035,10.86500000000001,47.88500000000003]);
ctx.recodingOrder('bezierCurveTo',[17.73000000000001,62.912000000000035,29.885000000000012,76.03100000000003,48.02700000000001,87.98800000000003]);
ctx.recodingOrder('bezierCurveTo',[52.001000000000005,90.60600000000002,55.98000000000001,92.95000000000003,59.891000000000005,95.25700000000003]);
ctx.recodingOrder('bezierCurveTo',[70.93100000000001,101.76500000000003,81.358,107.91100000000003,89.94500000000001,118.83500000000004]);
ctx.recodingOrder('bezierCurveTo',[90.96000000000001,120.12400000000004,90.73800000000001,121.99300000000004,89.44800000000001,123.00700000000003]);
ctx.recodingOrder('bezierCurveTo',[88.899,123.436,88.249,123.645,87.604,123.645]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[102.016,450.321]);
ctx.recodingOrder('bezierCurveTo',[91.19300000000001,450.321,74.26100000000001,447.692,63.612,442.72200000000004]);
ctx.recodingOrder('bezierCurveTo',[62.127,442.02700000000004,61.482,440.259,62.175000000000004,438.77200000000005]);
ctx.recodingOrder('bezierCurveTo',[62.87800000000001,437.285,64.653,436.64200000000005,66.128,437.33700000000005]);
ctx.recodingOrder('bezierCurveTo',[75.799,441.85,92.33500000000001,444.55000000000007,102.49199999999999,444.37600000000003]);
ctx.recodingOrder('bezierCurveTo',[115.752,444.27000000000004,127.65699999999998,442.675,140.256,440.98600000000005]);
ctx.recodingOrder('bezierCurveTo',[143.982,440.487,147.771,439.9800000000001,151.677,439.499]);
ctx.recodingOrder('bezierCurveTo',[153.368,439.283,154.79,440.45500000000004,154.98999999999998,442.083]);
ctx.recodingOrder('bezierCurveTo',[155.19099999999997,443.713,154.034,445.196,152.40599999999998,445.396]);
ctx.recodingOrder('bezierCurveTo',[148.51699999999997,445.875,144.74899999999997,446.382,141.04899999999998,446.87600000000003]);
ctx.recodingOrder('bezierCurveTo',[128.25499999999997,448.591,116.17399999999998,450.211,102.53999999999998,450.32200000000006]);
ctx.recodingOrder('bezierCurveTo',[102.364,450.321,102.19,450.321,102.016,450.321]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[345.523,445.715]);
ctx.recodingOrder('bezierCurveTo',[345.238,445.715,344.963,445.712,344.704,445.712]);
ctx.recodingOrder('bezierCurveTo',[331.144,445.604,317.641,443.741,304.56100000000004,440.179]);
ctx.recodingOrder('bezierCurveTo',[302.98100000000005,439.748,302.04600000000005,438.11499999999995,302.47400000000005,436.53]);
ctx.recodingOrder('bezierCurveTo',[302.91200000000003,434.94699999999995,304.51900000000006,434.00899999999996,306.12600000000003,434.445]);
ctx.recodingOrder('bezierCurveTo',[318.70900000000006,437.872,331.704,439.664,344.747,439.767]);
ctx.recodingOrder('bezierCurveTo',[357.636,439.838,387.305,437.907,396.58500000000004,433.949]);
ctx.recodingOrder('bezierCurveTo',[398.091,433.317,399.84000000000003,434.005,400.485,435.51800000000003]);
ctx.recodingOrder('bezierCurveTo',[401.13,437.02700000000004,400.427,438.773,398.921,439.418]);
ctx.recodingOrder('bezierCurveTo',[388.293,443.945,357.25,445.715,345.523,445.715]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[218.849,642.908]);
ctx.recodingOrder('bezierCurveTo',[218.98,642.539,219.064,642.148,219.064,641.734]);
ctx.recodingOrder('bezierCurveTo',[219.064,639.784,217.483,638.202,215.53199999999998,638.202]);
ctx.recodingOrder('bezierCurveTo',[215.09799999999998,638.202,214.68699999999998,638.291,214.30299999999997,638.434]);
ctx.recodingOrder('bezierCurveTo',[213.68899999999996,637.886,212.88799999999998,637.543,212.00099999999998,637.543]);
ctx.recodingOrder('bezierCurveTo',[210.18999999999997,637.543,208.71999999999997,638.934,208.55899999999997,640.704]);
ctx.recodingOrder('bezierCurveTo',[207.32999999999996,640.997,206.41299999999998,642.096,206.41299999999998,643.415]);
ctx.recodingOrder('bezierCurveTo',[206.41299999999998,644.3159999999999,206.84699999999998,645.108,207.509,645.6189999999999]);
ctx.recodingOrder('bezierCurveTo',[207.446,645.857,207.38299999999998,646.098,207.38299999999998,646.3559999999999]);
ctx.recodingOrder('bezierCurveTo',[207.38299999999998,647.9809999999999,208.7,649.2979999999999,210.325,649.2979999999999]);
ctx.recodingOrder('bezierCurveTo',[210.605,649.2979999999999,210.869,649.2469999999998,211.12599999999998,649.1739999999999]);
ctx.recodingOrder('bezierCurveTo',[211.77499999999998,649.9759999999999,212.75499999999997,650.4989999999999,213.86799999999997,650.4989999999999]);
ctx.recodingOrder('bezierCurveTo',[215.58299999999997,650.4989999999999,217.01099999999997,649.281,217.33799999999997,647.6619999999999]);
ctx.recodingOrder('bezierCurveTo',[218.63999999999996,647.387,219.61899999999997,646.2339999999999,219.61899999999997,644.8499999999999]);
ctx.recodingOrder('bezierCurveTo',[219.616,644.099,219.321,643.42,218.849,642.908]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[238.709,657.147]);
ctx.recodingOrder('bezierCurveTo',[239.324,656.503,239.707,655.6350000000001,239.707,654.6740000000001]);
ctx.recodingOrder('bezierCurveTo',[239.707,653.9190000000001,239.471,653.2210000000001,239.073,652.6440000000001]);
ctx.recodingOrder('bezierCurveTo',[239.104,652.4550000000002,239.131,652.2640000000001,239.131,652.0670000000001]);
ctx.recodingOrder('bezierCurveTo',[239.131,650.0870000000001,237.526,648.4830000000002,235.547,648.4830000000002]);
ctx.recodingOrder('bezierCurveTo',[235.356,648.4830000000002,235.172,648.5100000000002,234.988,648.5390000000002]);
ctx.recodingOrder('bezierCurveTo',[234.28,647.3060000000003,232.965,646.4670000000002,231.442,646.4670000000002]);
ctx.recodingOrder('bezierCurveTo',[229.625,646.4670000000002,228.101,647.6550000000002,227.561,649.2920000000003]);
ctx.recodingOrder('bezierCurveTo',[225.482,649.3260000000002,223.805,651.0170000000003,223.805,653.1040000000003]);
ctx.recodingOrder('bezierCurveTo',[223.805,654.4010000000003,224.454,655.5420000000003,225.442,656.2320000000003]);
ctx.recodingOrder('bezierCurveTo',[225.084,656.7760000000003,224.872,657.4240000000003,224.872,658.1240000000004]);
ctx.recodingOrder('bezierCurveTo',[224.872,660.0280000000004,226.41600000000003,661.5720000000003,228.32000000000002,661.5720000000003]);
ctx.recodingOrder('bezierCurveTo',[228.73200000000003,661.5720000000003,229.121,661.4880000000004,229.48700000000002,661.3560000000003]);
ctx.recodingOrder('bezierCurveTo',[230.19100000000003,662.0490000000003,231.15500000000003,662.4790000000004,232.22100000000003,662.4790000000004]);
ctx.recodingOrder('bezierCurveTo',[233.73700000000002,662.4790000000004,235.03700000000003,661.6050000000004,235.68300000000002,660.3410000000003]);
ctx.recodingOrder('bezierCurveTo',[236.06500000000003,660.5300000000003,236.502,660.6190000000004,236.95800000000003,660.5670000000003]);
ctx.recodingOrder('bezierCurveTo',[238.223,660.4240000000003,239.13200000000003,659.2830000000004,238.98800000000003,658.0180000000004]);
ctx.recodingOrder('bezierCurveTo',[238.953,657.7,238.855,657.407,238.709,657.147]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[234.492,490.69]);
ctx.recodingOrder('bezierCurveTo',[232.938,490.69,231.628,489.477,231.533,487.9]);
ctx.recodingOrder('lineTo',[228.79,443.308]);
ctx.recodingOrder('bezierCurveTo',[228.689,441.67,229.932,440.26099999999997,231.57,440.159]);
ctx.recodingOrder('bezierCurveTo',[233.161,440.12,234.619,441.301,234.719,442.944]);
ctx.recodingOrder('lineTo',[237.462,487.536]);
ctx.recodingOrder('bezierCurveTo',[237.56199999999998,489.174,236.32,490.583,234.682,490.685]);
ctx.recodingOrder('bezierCurveTo',[234.619,490.688,234.556,490.69,234.492,490.69]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[236.157,509.385]);
ctx.recodingOrder('bezierCurveTo',[232.90200000000002,509.385,229.99,507.93899999999996,228.092,505.247]);
ctx.recodingOrder('bezierCurveTo',[226.80200000000002,503.40000000000003,226.61200000000002,501.226,226.596,499.539]);
ctx.recodingOrder('bezierCurveTo',[226.532,494.22499999999997,230.433,488.565,235.474,486.652]);
ctx.recodingOrder('bezierCurveTo',[239.48499999999999,485.135,243.433,486.187,246.32899999999998,489.532]);
ctx.recodingOrder('bezierCurveTo',[248.98199999999997,492.59999999999997,249.90699999999998,496.241,248.93399999999997,499.784]);
ctx.recodingOrder('bezierCurveTo',[247.82899999999998,503.787,244.33699999999996,507.299,240.02399999999997,508.731]);
ctx.recodingOrder('bezierCurveTo',[238.715,509.171,237.409,509.385,236.157,509.385]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[239.021,491.921]);
ctx.recodingOrder('bezierCurveTo',[238.56099999999998,491.921,238.08599999999998,492.019,237.58399999999997,492.209]);
ctx.recodingOrder('bezierCurveTo',[234.86199999999997,493.242,232.50599999999997,496.635,232.53699999999998,499.47]);
ctx.recodingOrder('bezierCurveTo',[232.54799999999997,500.23900000000003,232.60099999999997,501.32000000000005,232.95999999999998,501.83500000000004]);
ctx.recodingOrder('bezierCurveTo',[234.439,503.93500000000006,236.855,503.526,238.14999999999998,503.093]);
ctx.recodingOrder('lineTo',[238.15499999999997,503.093]);
ctx.recodingOrder('bezierCurveTo',[240.55399999999997,502.295,242.63099999999997,500.28700000000003,243.20199999999997,498.21000000000004]);
ctx.recodingOrder('bezierCurveTo',[243.64599999999996,496.59600000000006,243.18599999999998,494.98400000000004,241.83799999999997,493.422]);
ctx.recodingOrder('bezierCurveTo',[240.966,492.416,240.047,491.921,239.021,491.921]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[225.624,476.2]);
ctx.recodingOrder('bezierCurveTo',[224.028,476.2,222.712,474.937,222.654,473.33]);
ctx.recodingOrder('bezierCurveTo',[222.29999999999998,463.221,222.892,453.032,224.409,443.046]);
ctx.recodingOrder('bezierCurveTo',[224.652,441.421,226.12099999999998,440.298,227.797,440.554]);
ctx.recodingOrder('bezierCurveTo',[229.42,440.80199999999996,230.534,442.31699999999995,230.286,443.93899999999996]);
ctx.recodingOrder('bezierCurveTo',[228.822,453.56199999999995,228.251,463.37899999999996,228.595,473.12399999999997]);
ctx.recodingOrder('bezierCurveTo',[228.653,474.76199999999994,227.369,476.13899999999995,225.731,476.19699999999995]);
ctx.recodingOrder('bezierCurveTo',[225.693,476.197,225.656,476.2,225.624,476.2]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[223.713,497.553]);
ctx.recodingOrder('bezierCurveTo',[234.612,497.87,240.147,479.259,228.45,476.564]);
ctx.recodingOrder('bezierCurveTo',[220.482,474.728,211.885,482.781,214.673,490.80100000000004]);
ctx.recodingOrder('bezierCurveTo',[215.985,494.579,219.714,497.436,223.713,497.553]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[225.276,500.676]);
ctx.recodingOrder('bezierCurveTo',[224.531,500.676,223.74900000000002,500.615,222.94,500.488]);
ctx.recodingOrder('lineTo',[222.94,500.488]);
ctx.recodingOrder('bezierCurveTo',[217.486,499.627,213.121,496.29,211.557,491.776]);
ctx.recodingOrder('bezierCurveTo',[209.993,487.284,211.09699999999998,482.327,214.511,478.52]);
ctx.recodingOrder('bezierCurveTo',[218.195,474.42199999999997,223.828,472.50899999999996,228.80599999999998,473.669]);
ctx.recodingOrder('bezierCurveTo',[236.474,475.43699999999995,239.21699999999998,482.90099999999995,237.96399999999997,489.36199999999997]);
ctx.recodingOrder('bezierCurveTo',[236.855,495.074,232.468,500.676,225.276,500.676]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[225.804,479.273]);
ctx.recodingOrder('bezierCurveTo',[223.336,479.273,220.773,480.44300000000004,218.939,482.48900000000003]);
ctx.recodingOrder('bezierCurveTo',[217.998,483.533,215.953,486.33700000000005,217.16899999999998,489.824]);
ctx.recodingOrder('bezierCurveTo',[218.004,492.226,220.63099999999997,494.107,223.86999999999998,494.617]);
ctx.recodingOrder('lineTo',[223.86999999999998,494.617]);
ctx.recodingOrder('bezierCurveTo',[228.87499999999997,495.423,231.45899999999997,491.673,232.12999999999997,488.231]);
ctx.recodingOrder('bezierCurveTo',[232.81699999999998,484.683,231.65499999999997,480.425,227.47399999999996,479.461]);
ctx.recodingOrder('bezierCurveTo',[226.93,479.334,226.37,479.273,225.804,479.273]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[230.376,542.214]);
ctx.recodingOrder('bezierCurveTo',[228.368,542.214,226.433,542.066,224.441,541.912]);
ctx.recodingOrder('bezierCurveTo',[223.331,541.825,222.184,541.738,220.984,541.672]);
ctx.recodingOrder('bezierCurveTo',[219.346,541.585,218.08800000000002,540.1850000000001,218.172,538.546]);
ctx.recodingOrder('bezierCurveTo',[218.267,536.9050000000001,219.726,535.666,221.301,535.7370000000001]);
ctx.recodingOrder('bezierCurveTo',[222.553,535.8030000000001,223.742,535.8950000000001,224.89999999999998,535.9850000000001]);
ctx.recodingOrder('bezierCurveTo',[228.48299999999998,536.2630000000001,231.575,536.5000000000001,235.13099999999997,535.8740000000001]);
ctx.recodingOrder('bezierCurveTo',[236.73699999999997,535.6280000000002,238.28599999999997,536.6720000000001,238.57099999999997,538.2890000000001]);
ctx.recodingOrder('bezierCurveTo',[238.85599999999997,539.9060000000001,237.77299999999997,541.4470000000001,236.15599999999998,541.7290000000002]);
ctx.recodingOrder('bezierCurveTo',[234.101,542.089,232.209,542.214,230.376,542.214]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[174.506,523.598]);
ctx.recodingOrder('bezierCurveTo',[173.623,523.598,172.773,523.3629999999999,172.048,522.8979999999999]);
ctx.recodingOrder('bezierCurveTo',[170.479,521.9049999999999,169.665,519.939,169.987,517.896]);
ctx.recodingOrder('bezierCurveTo',[170.22,516.4509999999999,170.933,515.246,171.678,514.16]);
ctx.recodingOrder('bezierCurveTo',[174.373,510.22799999999995,177.581,507.08099999999996,181.21099999999998,504.804]);
ctx.recodingOrder('bezierCurveTo',[182.26199999999997,504.157,183.62599999999998,504.46599999999995,184.28199999999998,505.51]);
ctx.recodingOrder('bezierCurveTo',[184.54099999999997,505.917,184.647,506.371,184.61999999999998,506.818]);
ctx.recodingOrder('bezierCurveTo',[184.97899999999998,506.757,185.31699999999998,506.786,185.67699999999996,506.897]);
ctx.recodingOrder('bezierCurveTo',[186.84499999999997,507.277,187.48399999999995,508.538,187.10399999999996,509.706]);
ctx.recodingOrder('bezierCurveTo',[185.41299999999995,514.893,181.68199999999996,519.0070000000001,179.60499999999996,520.9970000000001]);
ctx.recodingOrder('bezierCurveTo',[178.84899999999996,521.7210000000001,177.99299999999997,522.5380000000001,176.81499999999997,523.0790000000001]);
ctx.recodingOrder('bezierCurveTo',[176.06,523.424,175.272,523.598,174.506,523.598]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[182.517,509.287]);
ctx.recodingOrder('bezierCurveTo',[179.838,511.169,177.433,513.649,175.356,516.677]);
ctx.recodingOrder('bezierCurveTo',[174.939,517.285,174.48999999999998,517.987,174.394,518.59]);
ctx.recodingOrder('bezierCurveTo',[174.346,518.87,174.42600000000002,519.105,174.473,519.164]);
ctx.recodingOrder('bezierCurveTo',[174.484,519.148,174.70600000000002,519.14,174.954,519.024]);
ctx.recodingOrder('bezierCurveTo',[175.45600000000002,518.797,175.97400000000002,518.3,176.518,517.774]);
ctx.recodingOrder('bezierCurveTo',[179.23,515.18,181.371,512.136,182.517,509.287]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[181.386,529.295]);
ctx.recodingOrder('bezierCurveTo',[179.944,529.295,178.976,528.6819999999999,178.453,528.227]);
ctx.recodingOrder('bezierCurveTo',[175.75300000000001,525.8779999999999,176.498,520.783,176.677,519.788]);
ctx.recodingOrder('bezierCurveTo',[176.888,518.58,178.035,517.798,179.261,517.981]);
ctx.recodingOrder('bezierCurveTo',[180.471,518.197,181.28,519.352,181.063,520.5649999999999]);
ctx.recodingOrder('bezierCurveTo',[180.69299999999998,522.655,181.01,524.536,181.38,524.867]);
ctx.recodingOrder('bezierCurveTo',[181.364,524.846,181.549,524.846,181.882,524.74]);
ctx.recodingOrder('bezierCurveTo',[182.596,524.5070000000001,182.796,523.4110000000001,182.939,521.3340000000001]);
ctx.recodingOrder('bezierCurveTo',[183.25,516.538,183.346,511.78400000000005,183.224,507.08900000000006]);
ctx.recodingOrder('bezierCurveTo',[183.19199999999998,505.86100000000005,184.165,504.8380000000001,185.396,504.80600000000004]);
ctx.recodingOrder('bezierCurveTo',[185.41699999999997,504.80600000000004,185.439,504.80300000000005,185.45399999999998,504.80300000000005]);
ctx.recodingOrder('bezierCurveTo',[186.659,504.80300000000005,187.653,505.76500000000004,187.68399999999997,506.97800000000007]);
ctx.recodingOrder('bezierCurveTo',[187.80499999999998,511.80300000000005,187.70499999999996,516.6940000000001,187.39299999999997,521.514]);
ctx.recodingOrder('bezierCurveTo',[187.23999999999998,523.778,186.97599999999997,527.771,183.25499999999997,528.979]);
ctx.recodingOrder('bezierCurveTo',[182.565,529.202,181.941,529.295,181.386,529.295]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[166.499,544.179]);
ctx.recodingOrder('bezierCurveTo',[165.326,544.179,164.343,543.265,164.274,542.079]);
ctx.recodingOrder('bezierCurveTo',[163.799,533.986,166.927,525.7199999999999,172.64,519.9649999999999]);
ctx.recodingOrder('bezierCurveTo',[173.506,519.093,174.92299999999997,519.0849999999999,175.789,519.9519999999999]);
ctx.recodingOrder('bezierCurveTo',[176.661,520.8189999999998,176.66699999999997,522.2329999999998,175.79999999999998,523.1049999999999]);
ctx.recodingOrder('bezierCurveTo',[170.96999999999997,527.9749999999999,168.32199999999997,534.9719999999999,168.724,541.8209999999999]);
ctx.recodingOrder('bezierCurveTo',[168.798,543.0489999999999,167.85799999999998,544.1039999999999,166.63199999999998,544.175]);
ctx.recodingOrder('bezierCurveTo',[166.584,544.177,166.542,544.179,166.499,544.179]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[179.748,542.708]);
ctx.recodingOrder('bezierCurveTo',[178.78099999999998,542.708,177.893,542.076,177.608,541.1039999999999]);
ctx.recodingOrder('bezierCurveTo',[175.875,535.18,175.294,528.804,175.922,522.6629999999999]);
ctx.recodingOrder('bezierCurveTo',[176.049,521.4339999999999,177.243,520.5459999999999,178.369,520.6759999999999]);
ctx.recodingOrder('bezierCurveTo',[179.595,520.8029999999999,180.483,521.8969999999999,180.361,523.1229999999999]);
ctx.recodingOrder('bezierCurveTo',[179.785,528.6909999999999,180.313,534.477,181.88799999999998,539.852]);
ctx.recodingOrder('bezierCurveTo',[182.23099999999997,541.033,181.55499999999998,542.2719999999999,180.37699999999998,542.619]);
ctx.recodingOrder('bezierCurveTo',[180.165,542.678,179.954,542.708,179.748,542.708]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[281.505,525.205]);
ctx.recodingOrder('bezierCurveTo',[280.094,525.205,278.646,524.706,277.335,523.731]);
ctx.recodingOrder('bezierCurveTo',[274.164,521.385,273.678,517.68,273.292,514.707]);
ctx.recodingOrder('bezierCurveTo',[272.79499999999996,510.931,273.049,507.182,273.34999999999997,503.657]);
ctx.recodingOrder('bezierCurveTo',[273.445,502.436,274.37999999999994,501.501,275.76,501.62199999999996]);
ctx.recodingOrder('bezierCurveTo',[276.986,501.72799999999995,277.895,502.806,277.789,504.032]);
ctx.recodingOrder('bezierCurveTo',[277.498,507.45099999999996,277.277,510.791,277.699,514.055]);
ctx.recodingOrder('bezierCurveTo',[278.03200000000004,516.597,278.338,518.93,279.987,520.151]);
ctx.recodingOrder('bezierCurveTo',[280.55800000000005,520.5709999999999,281.372,520.978,282.117,520.598]);
ctx.recodingOrder('bezierCurveTo',[282.778,520.2439999999999,283.19,519.343,283.147,518.352]);
ctx.recodingOrder('bezierCurveTo',[283.089,517.1229999999999,284.03999999999996,516.0799999999999,285.266,516.021]);
ctx.recodingOrder('bezierCurveTo',[286.535,515.928,287.543,516.9169999999999,287.59700000000004,518.145]);
ctx.recodingOrder('bezierCurveTo',[287.72400000000005,520.862,286.39700000000005,523.366,284.20900000000006,524.531]);
ctx.recodingOrder('bezierCurveTo',[283.365,524.983,282.44,525.205,281.505,525.205]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[293.432,523.717]);
ctx.recodingOrder('bezierCurveTo',[293.21000000000004,523.717,293.035,523.698,292.93,523.688]);
ctx.recodingOrder('bezierCurveTo',[288.401,523.183,284.813,520.813,281.949,516.438]);
ctx.recodingOrder('bezierCurveTo',[279.772,513.125,277.193,507.544,277.093,502.729]);
ctx.recodingOrder('bezierCurveTo',[277.082,502.02099999999996,277.399,501.34999999999997,277.96000000000004,500.916]);
ctx.recodingOrder('bezierCurveTo',[278.52500000000003,500.483,279.26000000000005,500.351,279.93100000000004,500.538]);
ctx.recodingOrder('bezierCurveTo',[285.40600000000006,502.092,290.31600000000003,505.45300000000003,293.75000000000006,510.003]);
ctx.recodingOrder('bezierCurveTo',[295.4680000000001,512.28,298.1050000000001,516.797,296.47700000000003,521.455]);
ctx.recodingOrder('bezierCurveTo',[296.302,521.962,295.975,522.7,295.19800000000004,523.215]);
ctx.recodingOrder('bezierCurveTo',[295.19300000000004,523.22,295.187,523.2230000000001,295.177,523.2280000000001]);
ctx.recodingOrder('bezierCurveTo',[294.553,523.635,293.892,523.717,293.432,523.717]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[282.107,506.106]);
ctx.recodingOrder('bezierCurveTo',[282.87300000000005,508.94599999999997,284.321,511.927,285.67900000000003,513.994]);
ctx.recodingOrder('bezierCurveTo',[287.58200000000005,516.903,289.759,518.547,292.47,519.1070000000001]);
ctx.recodingOrder('bezierCurveTo',[292.80800000000005,516.5150000000001,291.038,513.815,290.187,512.6890000000001]);
ctx.recodingOrder('bezierCurveTo',[288.068,509.879,285.273,507.615,282.107,506.106]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[295.716,545.683]);
ctx.recodingOrder('bezierCurveTo',[294.628,545.683,293.676,544.88,293.517,543.77]);
ctx.recodingOrder('bezierCurveTo',[292.466,536.448,289.601,529.43,285.241,523.4789999999999]);
ctx.recodingOrder('bezierCurveTo',[284.512,522.4859999999999,284.729,521.0899999999999,285.722,520.3639999999999]);
ctx.recodingOrder('bezierCurveTo',[286.705,519.632,288.111,519.8489999999999,288.835,520.843]);
ctx.recodingOrder('bezierCurveTo',[293.628,527.385,296.77299999999997,535.093,297.93,543.137]);
ctx.recodingOrder('bezierCurveTo',[298.105,544.3549999999999,297.254,545.486,296.038,545.66]);
ctx.recodingOrder('bezierCurveTo',[295.932,545.675,295.821,545.683,295.716,545.683]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[252.962,433.742]);
ctx.recodingOrder('bezierCurveTo',[251.73,433.742,250.584,432.973,250.15599999999998,431.747]);
ctx.recodingOrder('lineTo',[249.12599999999998,428.79]);
ctx.recodingOrder('bezierCurveTo',[248.587,427.242,249.40599999999998,425.545,250.95399999999998,425.00600000000003]);
ctx.recodingOrder('bezierCurveTo',[252.50199999999998,424.46200000000005,254.19899999999998,425.28900000000004,254.73799999999997,426.834]);
ctx.recodingOrder('lineTo',[255.76799999999997,429.791]);
ctx.recodingOrder('bezierCurveTo',[256.30699999999996,431.339,255.48799999999997,433.036,253.93999999999997,433.575]);
ctx.recodingOrder('bezierCurveTo',[253.618,433.69,253.285,433.742,252.962,433.742]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[261.259,431.288]);
ctx.recodingOrder('bezierCurveTo',[259.949,431.288,258.754,430.419,258.39500000000004,429.1]);
ctx.recodingOrder('lineTo',[257.444,425.612]);
ctx.recodingOrder('bezierCurveTo',[257.016,424.026,257.956,422.396,259.54200000000003,421.968]);
ctx.recodingOrder('bezierCurveTo',[261.14300000000003,421.543,262.75500000000005,422.483,263.18300000000005,424.06300000000005]);
ctx.recodingOrder('lineTo',[264.124,427.53000000000003]);
ctx.recodingOrder('bezierCurveTo',[264.55800000000005,429.11600000000004,263.627,430.74800000000005,262.04200000000003,431.182]);
ctx.recodingOrder('bezierCurveTo',[261.782,431.253,261.518,431.288,261.259,431.288]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[269.403,428.772]);
ctx.recodingOrder('bezierCurveTo',[268.425,428.772,267.469,428.293,266.903,427.414]);
ctx.recodingOrder('lineTo',[265.19,424.764]);
ctx.recodingOrder('bezierCurveTo',[264.297,423.385,264.693,421.546,266.073,420.65500000000003]);
ctx.recodingOrder('bezierCurveTo',[267.457,419.754,269.29699999999997,420.161,270.179,421.535]);
ctx.recodingOrder('lineTo',[271.89099999999996,424.185]);
ctx.recodingOrder('bezierCurveTo',[272.78399999999993,425.564,272.388,427.403,271.008,428.294]);
ctx.recodingOrder('bezierCurveTo',[270.513,428.619,269.953,428.772,269.403,428.772]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[277.71,424.824]);
ctx.recodingOrder('bezierCurveTo',[276.436,424.824,275.263,424.002,274.86699999999996,422.724]);
ctx.recodingOrder('lineTo',[274.41799999999995,421.233]);
ctx.recodingOrder('bezierCurveTo',[273.93199999999996,419.664,274.80899999999997,417.998,276.37899999999996,417.515]);
ctx.recodingOrder('bezierCurveTo',[277.93299999999994,417.02099999999996,279.60799999999995,417.90799999999996,280.09399999999994,419.478]);
ctx.recodingOrder('lineTo',[280.5539999999999,420.979]);
ctx.recodingOrder('bezierCurveTo',[281.0349999999999,422.548,280.15199999999993,424.21,278.5829999999999,424.691]);
ctx.recodingOrder('bezierCurveTo',[278.292,424.783,277.996,424.824,277.71,424.824]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[244.681,435.674]);
ctx.recodingOrder('bezierCurveTo',[243.038,435.674,241.711,434.342,241.711,432.702]);
ctx.recodingOrder('lineTo',[241.711,429.73]);
ctx.recodingOrder('bezierCurveTo',[241.711,428.089,243.038,426.75800000000004,244.681,426.75800000000004]);
ctx.recodingOrder('bezierCurveTo',[246.324,426.75800000000004,247.651,428.09000000000003,247.651,429.73]);
ctx.recodingOrder('lineTo',[247.651,432.702]);
ctx.recodingOrder('bezierCurveTo',[247.651,434.342,246.325,435.674,244.681,435.674]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[180.165,427.224]);
ctx.recodingOrder('bezierCurveTo',[179.94299999999998,427.224,179.721,427.198,179.494,427.14799999999997]);
ctx.recodingOrder('bezierCurveTo',[177.893,426.775,176.899,425.17999999999995,177.269,423.58099999999996]);
ctx.recodingOrder('lineTo',[177.845,421.12299999999993]);
ctx.recodingOrder('bezierCurveTo',[178.22,419.52199999999993,179.8,418.5419999999999,181.412,418.8979999999999]);
ctx.recodingOrder('bezierCurveTo',[183.013,419.2709999999999,184.007,420.86599999999993,183.637,422.4649999999999]);
ctx.recodingOrder('lineTo',[183.061,424.92299999999994]);
ctx.recodingOrder('bezierCurveTo',[182.739,426.296,181.518,427.224,180.165,427.224]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[188.214,429.732]);
ctx.recodingOrder('bezierCurveTo',[186.571,429.732,185.244,428.40000000000003,185.244,426.76000000000005]);
ctx.recodingOrder('lineTo',[185.244,424.28200000000004]);
ctx.recodingOrder('bezierCurveTo',[185.244,422.641,186.571,421.31000000000006,188.214,421.31000000000006]);
ctx.recodingOrder('bezierCurveTo',[189.857,421.31000000000006,191.184,422.64200000000005,191.184,424.28200000000004]);
ctx.recodingOrder('lineTo',[191.184,426.76000000000005]);
ctx.recodingOrder('bezierCurveTo',[191.184,428.4,189.858,429.732,188.214,429.732]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[297.681,477.774]);
ctx.recodingOrder('bezierCurveTo',[297.02,477.774,296.365,477.554,295.82099999999997,477.122]);
ctx.recodingOrder('bezierCurveTo',[294.57399999999996,476.118,293.79699999999997,474.62,293.69699999999995,473.00800000000004]);
ctx.recodingOrder('bezierCurveTo',[293.6809999999999,472.807,293.69199999999995,472.61100000000005,293.71799999999996,472.41900000000004]);
ctx.recodingOrder('bezierCurveTo',[293.681,471.20900000000006,294.38899999999995,470.04900000000004,295.578,469.57000000000005]);
ctx.recodingOrder('bezierCurveTo',[297.111,468.951,298.83299999999997,469.6940000000001,299.44599999999997,471.21600000000007]);
ctx.recodingOrder('lineTo',[300.43399999999997,473.6890000000001]);
ctx.recodingOrder('bezierCurveTo',[300.941,474.9410000000001,300.53999999999996,476.3790000000001,299.45599999999996,477.18500000000006]);
ctx.recodingOrder('bezierCurveTo',[298.929,477.579,298.304,477.774,297.681,477.774]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[305.053,474.308]);
ctx.recodingOrder('bezierCurveTo',[305.016,474.308,304.974,474.305,304.932,474.305]);
ctx.recodingOrder('bezierCurveTo',[303.85400000000004,474.26,302.934,473.647,302.44800000000004,472.764]);
ctx.recodingOrder('bezierCurveTo',[301.619,472.196,301.095,471.218,301.158,470.14]);
ctx.recodingOrder('bezierCurveTo',[301.248,468.49899999999997,302.685,467.30199999999996,304.29200000000003,467.341]);
ctx.recodingOrder('bezierCurveTo',[306.437,467.46500000000003,308.11300000000006,469.309,308.023,471.455]);
ctx.recodingOrder('bezierCurveTo',[307.955,473.055,306.639,474.308,305.053,474.308]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[146.011,478.197]);
ctx.recodingOrder('bezierCurveTo',[145.414,478.197,144.811,478.017,144.28799999999998,477.647]);
ctx.recodingOrder('bezierCurveTo',[142.951,476.69599999999997,142.63899999999998,474.841,143.59099999999998,473.504]);
ctx.recodingOrder('lineTo',[144.62699999999998,472.053]);
ctx.recodingOrder('bezierCurveTo',[145.57799999999997,470.711,147.439,470.409,148.76999999999998,471.35]);
ctx.recodingOrder('bezierCurveTo',[150.10699999999997,472.30100000000004,150.41899999999998,474.156,149.46699999999998,475.493]);
ctx.recodingOrder('lineTo',[148.43099999999998,476.944]);
ctx.recodingOrder('bezierCurveTo',[147.855,477.761,146.935,478.197,146.011,478.197]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[152.505,481.73]);
ctx.recodingOrder('bezierCurveTo',[152.341,481.73,152.183,481.71700000000004,152.019,481.69100000000003]);
ctx.recodingOrder('bezierCurveTo',[150.39600000000002,481.42400000000004,149.302,479.894,149.567,478.27400000000006]);
ctx.recodingOrder('lineTo',[149.87900000000002,476.3450000000001]);
ctx.recodingOrder('bezierCurveTo',[150.14300000000003,474.7200000000001,151.69700000000003,473.63200000000006,153.293,473.8930000000001]);
ctx.recodingOrder('bezierCurveTo',[154.91,474.1600000000001,156.01000000000002,475.68700000000007,155.745,477.3070000000001]);
ctx.recodingOrder('lineTo',[155.433,479.2410000000001]);
ctx.recodingOrder('bezierCurveTo',[155.195,480.697,153.932,481.73,152.505,481.73]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[254.617,584.264]);
ctx.recodingOrder('bezierCurveTo',[253.201,584.264,251.94799999999998,583.247,251.695,581.801]);
ctx.recodingOrder('bezierCurveTo',[251.33599999999998,579.7510000000001,251.56799999999998,577.647,252.36599999999999,575.719]);
ctx.recodingOrder('bezierCurveTo',[252.99499999999998,574.2,254.718,573.481,256.25,574.105]);
ctx.recodingOrder('bezierCurveTo',[257.767,574.731,258.486,576.47,257.862,577.986]);
ctx.recodingOrder('bezierCurveTo',[257.497,578.8629999999999,257.392,579.854,257.55100000000004,580.781]);
ctx.recodingOrder('bezierCurveTo',[257.831,582.3979999999999,256.74800000000005,583.939,255.13000000000005,584.2189999999999]);
ctx.recodingOrder('bezierCurveTo',[254.96,584.248,254.785,584.264,254.617,584.264]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[262.754,584.806]);
ctx.recodingOrder('bezierCurveTo',[261.322,584.806,260.059,583.768,259.827,582.306]);
ctx.recodingOrder('lineTo',[259.335,579.254]);
ctx.recodingOrder('bezierCurveTo',[259.07099999999997,577.635,260.176,576.107,261.798,575.8480000000001]);
ctx.recodingOrder('bezierCurveTo',[263.383,575.5910000000001,264.947,576.6880000000001,265.201,578.3080000000001]);
ctx.recodingOrder('lineTo',[265.69300000000004,581.3600000000001]);
ctx.recodingOrder('bezierCurveTo',[265.95700000000005,582.9790000000002,264.85300000000007,584.5070000000002,263.23,584.7660000000001]);
ctx.recodingOrder('bezierCurveTo',[263.072,584.792,262.913,584.806,262.754,584.806]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[271.03,585.73]);
ctx.recodingOrder('bezierCurveTo',[269.693,585.73,268.48299999999995,584.826,268.145,583.4730000000001]);
ctx.recodingOrder('lineTo',[267.70099999999996,581.7160000000001]);
ctx.recodingOrder('lineTo',[273.409,580.0410000000002]);
ctx.recodingOrder('lineTo',[270.529,580.7780000000001]);
ctx.recodingOrder('lineTo',[273.462,580.2410000000001]);
ctx.recodingOrder('lineTo',[273.917,582.041]);
ctx.recodingOrder('bezierCurveTo',[274.31399999999996,583.634,273.34099999999995,585.2460000000001,271.74499999999995,585.643]);
ctx.recodingOrder('bezierCurveTo',[271.506,585.701,271.263,585.73,271.03,585.73]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[279.692,584.813]);
ctx.recodingOrder('bezierCurveTo',[278.418,584.813,277.245,583.991,276.849,582.712]);
ctx.recodingOrder('lineTo',[276.389,581.187]);
ctx.recodingOrder('bezierCurveTo',[275.92400000000004,579.612,276.817,577.958,278.392,577.493]);
ctx.recodingOrder('bezierCurveTo',[279.998,577.0310000000001,281.626,577.923,282.086,579.4960000000001]);
ctx.recodingOrder('lineTo',[282.535,580.9680000000001]);
ctx.recodingOrder('bezierCurveTo',[283.016,582.537,282.13300000000004,584.1990000000001,280.564,584.6800000000001]);
ctx.recodingOrder('bezierCurveTo',[280.274,584.771,279.978,584.813,279.692,584.813]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[287.709,582.15]);
ctx.recodingOrder('bezierCurveTo',[286.176,582.15,284.824,581.18,284.279,579.664]);
ctx.recodingOrder('bezierCurveTo',[283.703,578.05,284.226,576.332,285.579,575.389]);
ctx.recodingOrder('bezierCurveTo',[286.926,574.456,288.782,574.784,289.717,576.134]);
ctx.recodingOrder('bezierCurveTo',[290.013,576.562,290.18199999999996,577.038,290.22999999999996,577.521]);
ctx.recodingOrder('bezierCurveTo',[290.50499999999994,577.928,290.679,578.409,290.722,578.9319999999999]);
ctx.recodingOrder('bezierCurveTo',[290.85999999999996,580.5679999999999,289.63899999999995,582.0029999999999,288.005,582.137]);
ctx.recodingOrder('bezierCurveTo',[287.904,582.145,287.804,582.15,287.709,582.15]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[230.914,578.358]);
ctx.recodingOrder('bezierCurveTo',[230.623,578.358,230.32199999999997,578.3159999999999,230.03099999999998,578.2239999999999]);
ctx.recodingOrder('bezierCurveTo',[228.462,577.7349999999999,227.58999999999997,576.0699999999999,228.07599999999996,574.501]);
ctx.recodingOrder('lineTo',[228.86399999999998,571.961]);
ctx.recodingOrder('bezierCurveTo',[229.34999999999997,570.397,231.00399999999996,569.533,232.58999999999997,570.008]);
ctx.recodingOrder('bezierCurveTo',[234.15399999999997,570.5,235.02599999999998,572.167,234.53999999999996,573.731]);
ctx.recodingOrder('lineTo',[233.75199999999995,576.271]);
ctx.recodingOrder('bezierCurveTo',[233.356,577.542,232.183,578.358,230.914,578.358]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[173.803,578.863]);
ctx.recodingOrder('bezierCurveTo',[172.957,578.863,172.112,578.5010000000001,171.526,577.798]);
ctx.recodingOrder('bezierCurveTo',[169.983,575.957,169.222,573.52,169.44400000000002,571.121]);
ctx.recodingOrder('bezierCurveTo',[169.597,569.483,171.05,568.294,172.67800000000003,568.434]);
ctx.recodingOrder('bezierCurveTo',[174.31100000000004,568.5849999999999,175.51100000000002,570.033,175.36300000000003,571.665]);
ctx.recodingOrder('bezierCurveTo',[175.28900000000002,572.487,175.55800000000002,573.353,176.08200000000002,573.983]);
ctx.recodingOrder('bezierCurveTo',[177.139,575.241,176.97000000000003,577.1139999999999,175.71200000000002,578.1679999999999]);
ctx.recodingOrder('bezierCurveTo',[175.156,578.635,174.479,578.863,173.803,578.863]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[182.729,579.352]);
ctx.recodingOrder('bezierCurveTo',[181.941,579.352,181.15400000000002,579.0369999999999,180.568,578.419]);
ctx.recodingOrder('bezierCurveTo',[179.167,576.934,178.364,574.912,178.364,572.875]);
ctx.recodingOrder('bezierCurveTo',[178.364,571.234,179.691,569.903,181.334,569.903]);
ctx.recodingOrder('bezierCurveTo',[182.978,569.903,184.304,571.235,184.304,572.875]);
ctx.recodingOrder('bezierCurveTo',[184.304,573.404,184.526,573.95,184.891,574.339]);
ctx.recodingOrder('bezierCurveTo',[186.017,575.533,185.964,577.4150000000001,184.76999999999998,578.541]);
ctx.recodingOrder('bezierCurveTo',[184.192,579.082,183.463,579.352,182.729,579.352]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[190.201,579.809]);
ctx.recodingOrder('bezierCurveTo',[189.56199999999998,579.809,188.917,579.603,188.373,579.18]);
ctx.recodingOrder('bezierCurveTo',[187.083,578.17,186.28,576.596,186.22299999999998,574.963]);
ctx.recodingOrder('bezierCurveTo',[186.165,573.322,187.44899999999998,571.948,189.087,571.89]);
ctx.recodingOrder('bezierCurveTo',[190.768,571.694,192.01399999999998,573.034,192.152,574.593]);
ctx.recodingOrder('bezierCurveTo',[193.33599999999998,575.6229999999999,193.521,577.4119999999999,192.54299999999998,578.665]);
ctx.recodingOrder('bezierCurveTo',[191.956,579.415,191.084,579.809,190.201,579.809]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#EEE6E6";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[199.053,579.344]);
ctx.recodingOrder('bezierCurveTo',[197.938,579.344,196.865,578.71,196.363,577.629]);
ctx.recodingOrder('lineTo',[195.607,576.028]);
ctx.recodingOrder('bezierCurveTo',[194.915,574.538,195.559,572.77,197.05,572.078]);
ctx.recodingOrder('bezierCurveTo',[198.519,571.399,200.311,572.03,200.99800000000002,573.518]);
ctx.recodingOrder('lineTo',[201.74300000000002,575.114]);
ctx.recodingOrder('bezierCurveTo',[202.44000000000003,576.599,201.80100000000002,578.369,200.31100000000004,579.0640000000001]);
ctx.recodingOrder('bezierCurveTo',[199.904,579.254,199.476,579.344,199.053,579.344]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[376.841,106.306]);
ctx.recodingOrder('bezierCurveTo',[375.462,106.306,374.225,105.336,373.934,103.92999999999999]);
ctx.recodingOrder('lineTo',[373.168,100.23599999999999]);
ctx.recodingOrder('bezierCurveTo',[372.83,98.63,373.86,97.05499999999999,375.467,96.716]);
ctx.recodingOrder('bezierCurveTo',[377.01,96.40499999999999,378.64799999999997,97.40599999999999,378.981,99.015]);
ctx.recodingOrder('lineTo',[379.758,102.736]);
ctx.recodingOrder('bezierCurveTo',[380.08599999999996,104.342,379.04999999999995,105.915,377.44399999999996,106.245]);
ctx.recodingOrder('bezierCurveTo',[377.242,106.285,377.042,106.306,376.841,106.306]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[387.341,101.074]);
ctx.recodingOrder('bezierCurveTo',[386.73900000000003,101.074,386.13100000000003,100.892,385.60200000000003,100.511]);
ctx.recodingOrder('bezierCurveTo',[383.43,98.944,382.093,96.307,382.119,93.63]);
ctx.recodingOrder('bezierCurveTo',[382.13500000000005,91.997,383.461,90.684,385.08900000000006,90.684]);
ctx.recodingOrder('bezierCurveTo',[385.1000000000001,90.684,385.1050000000001,90.684,385.11500000000007,90.684]);
ctx.recodingOrder('bezierCurveTo',[386.75800000000004,90.7,388.07400000000007,92.042,388.0590000000001,93.68299999999999]);
ctx.recodingOrder('bezierCurveTo',[388.0540000000001,94.44099999999999,388.46100000000007,95.24699999999999,389.07900000000006,95.69099999999999]);
ctx.recodingOrder('bezierCurveTo',[390.41100000000006,96.64999999999999,390.71200000000005,98.50799999999998,389.75000000000006,99.83899999999998]);
ctx.recodingOrder('bezierCurveTo',[389.17,100.646,388.261,101.074,387.341,101.074]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[396.991,95.887]);
ctx.recodingOrder('bezierCurveTo',[396.22499999999997,95.887,395.464,95.594,394.882,95.007]);
ctx.recodingOrder('lineTo',[391.923,92.02600000000001]);
ctx.recodingOrder('bezierCurveTo',[390.766,90.86300000000001,390.771,88.98200000000001,391.934,87.82400000000001]);
ctx.recodingOrder('bezierCurveTo',[393.09700000000004,86.659,394.978,86.66900000000001,396.141,87.83500000000001]);
ctx.recodingOrder('lineTo',[399.1,90.82100000000001]);
ctx.recodingOrder('bezierCurveTo',[400.257,91.98600000000002,400.252,93.86800000000001,399.084,95.02300000000001]);
ctx.recodingOrder('bezierCurveTo',[398.503,95.599,397.746,95.887,396.991,95.887]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[407.285,91.416]);
ctx.recodingOrder('bezierCurveTo',[405.187,91.416,403.189,90.113,402.35400000000004,88.176]);
ctx.recodingOrder('bezierCurveTo',[401.70900000000006,86.667,402.40700000000004,84.921,403.91300000000007,84.273]);
ctx.recodingOrder('bezierCurveTo',[405.2920000000001,83.67099999999999,406.88900000000007,84.21499999999999,407.63900000000007,85.478]);
ctx.recodingOrder('bezierCurveTo',[409.09800000000007,85.597,410.28100000000006,86.783,410.36100000000005,88.28399999999999]);
ctx.recodingOrder('bezierCurveTo',[410.44500000000005,89.925,409.18300000000005,91.323,407.54400000000004,91.407]);
ctx.recodingOrder('bezierCurveTo',[407.46,91.414,407.37,91.416,407.285,91.416]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[420.059,84.686]);
ctx.recodingOrder('bezierCurveTo',[419.46700000000004,84.686,418.87600000000003,84.51100000000001,418.358,84.149]);
ctx.recodingOrder('lineTo',[415.753,82.339]);
ctx.recodingOrder('bezierCurveTo',[415.573,82.215,415.40999999999997,82.072,415.267,81.916]);
ctx.recodingOrder('bezierCurveTo',[413.977,80.949,413.692,79.11699999999999,414.643,77.80199999999999]);
ctx.recodingOrder('bezierCurveTo',[415.60499999999996,76.46199999999999,417.44899999999996,76.16399999999999,418.791,77.13099999999999]);
ctx.recodingOrder('lineTo',[421.803,79.30599999999998]);
ctx.recodingOrder('bezierCurveTo',[423.124,80.26499999999999,423.426,82.10699999999999,422.48,83.43599999999998]);
ctx.recodingOrder('bezierCurveTo',[421.903,84.25,420.983,84.686,420.059,84.686]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[447.481,56.162]);
ctx.recodingOrder('bezierCurveTo',[446.466,56.162,445.483,55.647,444.928,54.716]);
ctx.recodingOrder('bezierCurveTo',[444.663,54.28,444.315,53.889,443.918,53.585]);
ctx.recodingOrder('bezierCurveTo',[442.613,52.589,442.36400000000003,50.723,443.358,49.42]);
ctx.recodingOrder('bezierCurveTo',[444.357,48.11,446.212,47.864000000000004,447.522,48.86]);
ctx.recodingOrder('bezierCurveTo',[448.526,49.626,449.372,50.57,450.022,51.661]);
ctx.recodingOrder('bezierCurveTo',[450.868,53.07,450.408,54.892,449.002,55.738]);
ctx.recodingOrder('bezierCurveTo',[448.528,56.024,447.999,56.162,447.481,56.162]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[453.067,48.354]);
ctx.recodingOrder('bezierCurveTo',[452.211,48.354,451.36,47.984,450.773,47.268]);
ctx.recodingOrder('bezierCurveTo',[450.646,47.117,450.46200000000005,47.004,450.271,46.961]);
ctx.recodingOrder('bezierCurveTo',[448.665,46.612,447.65000000000003,45.032,447.994,43.428]);
ctx.recodingOrder('bezierCurveTo',[448.348,41.818999999999996,449.96000000000004,40.800999999999995,451.52900000000005,41.153]);
ctx.recodingOrder('bezierCurveTo',[453.03000000000003,41.478,454.38800000000003,42.308,455.36000000000007,43.494]);
ctx.recodingOrder('bezierCurveTo',[456.40600000000006,44.763,456.22100000000006,46.633,454.9530000000001,47.677]);
ctx.recodingOrder('bezierCurveTo',[454.399,48.132,453.733,48.354,453.067,48.354]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[455.709,39.74]);
ctx.recodingOrder('bezierCurveTo',[455.212,39.74,454.705,39.613,454.24,39.349000000000004]);
ctx.recodingOrder('bezierCurveTo',[452.671,39.777,451.027,38.844,450.599,37.264]);
ctx.recodingOrder('bezierCurveTo',[450.166,35.681000000000004,451.101,34.048,452.686,33.615]);
ctx.recodingOrder('bezierCurveTo',[454.203,33.205000000000005,455.84099999999995,33.417,457.188,34.185]);
ctx.recodingOrder('bezierCurveTo',[458.615,34.999,459.106,36.814,458.293,38.241]);
ctx.recodingOrder('bezierCurveTo',[457.749,39.201,456.745,39.74,455.709,39.74]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[55.204,88.457]);
ctx.recodingOrder('bezierCurveTo',[55.146,88.457,55.088,88.455,55.029,88.452]);
ctx.recodingOrder('bezierCurveTo',[53.391000000000005,88.359,52.139,86.954,52.234,85.316]);
ctx.recodingOrder('lineTo',[52.424,81.98400000000001]);
ctx.recodingOrder('bezierCurveTo',[52.519,80.346,53.941,79.12500000000001,55.558,79.185]);
ctx.recodingOrder('bezierCurveTo',[57.196,79.28,58.449,80.683,58.353,82.321]);
ctx.recodingOrder('lineTo',[58.163000000000004,85.65299999999999]);
ctx.recodingOrder('bezierCurveTo',[58.073,87.233,56.763,88.457,55.204,88.457]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[63.3,92.182]);
ctx.recodingOrder('bezierCurveTo',[61.830999999999996,92.182,60.552,91.08800000000001,60.355999999999995,89.587]);
ctx.recodingOrder('lineTo',[59.980999999999995,86.617]);
ctx.recodingOrder('bezierCurveTo',[59.77499999999999,84.989,60.92699999999999,83.49900000000001,62.55499999999999,83.29100000000001]);
ctx.recodingOrder('bezierCurveTo',[64.14599999999999,83.08800000000001,65.66799999999999,84.23200000000001,65.87899999999999,85.86200000000001]);
ctx.recodingOrder('lineTo',[66.25399999999999,88.83200000000001]);
ctx.recodingOrder('bezierCurveTo',[66.46,90.46000000000001,65.31299999999999,91.95,63.68599999999999,92.158]);
ctx.recodingOrder('bezierCurveTo',[63.554,92.174,63.427,92.182,63.3,92.182]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[70.857,96.986]);
ctx.recodingOrder('bezierCurveTo',[69.779,96.986,68.738,96.397,68.215,95.369]);
ctx.recodingOrder('bezierCurveTo',[67.274,93.546,67.211,91.337,68.03,89.46]);
ctx.recodingOrder('bezierCurveTo',[68.691,87.951,70.45,87.27199999999999,71.946,87.92999999999999]);
ctx.recodingOrder('bezierCurveTo',[73.447,88.588,74.134,90.33999999999999,73.473,91.84299999999999]);
ctx.recodingOrder('bezierCurveTo',[73.367,92.08299999999998,73.378,92.41899999999998,73.499,92.65699999999998]);
ctx.recodingOrder('bezierCurveTo',[74.25,94.11599999999999,73.67399999999999,95.90699999999998,72.21499999999999,96.65799999999999]);
ctx.recodingOrder('bezierCurveTo',[71.777,96.881,71.316,96.986,70.857,96.986]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[79.376,102.202]);
ctx.recodingOrder('bezierCurveTo',[78.42,102.202,77.48400000000001,101.745,76.908,100.89699999999999]);
ctx.recodingOrder('bezierCurveTo',[75.825,99.29599999999999,75.391,97.28999999999999,75.714,95.39299999999999]);
ctx.recodingOrder('bezierCurveTo',[75.984,93.76799999999999,77.564,92.69299999999998,79.139,92.95899999999999]);
ctx.recodingOrder('bezierCurveTo',[80.756,93.234,81.845,94.76899999999999,81.57,96.386]);
ctx.recodingOrder('bezierCurveTo',[81.50699999999999,96.777,81.607,97.229,81.835,97.562]);
ctx.recodingOrder('bezierCurveTo',[82.755,98.92,82.39999999999999,100.77,81.03699999999999,101.689]);
ctx.recodingOrder('bezierCurveTo',[80.528,102.035,79.947,102.202,79.376,102.202]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[86.056,106.29]);
ctx.recodingOrder('bezierCurveTo',[84.41199999999999,106.29,83.086,104.95800000000001,83.086,103.31800000000001]);
ctx.recodingOrder('lineTo',[83.086,100.71500000000002]);
ctx.recodingOrder('bezierCurveTo',[83.086,99.07400000000001,84.413,97.74300000000002,86.056,97.74300000000002]);
ctx.recodingOrder('bezierCurveTo',[87.699,97.74300000000002,89.026,99.07500000000002,89.026,100.71500000000002]);
ctx.recodingOrder('lineTo',[89.026,103.31800000000001]);
ctx.recodingOrder('bezierCurveTo',[89.026,104.958,87.699,106.29,86.056,106.29]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[13.243,45.735]);
ctx.recodingOrder('bezierCurveTo',[11.6,45.735,10.273,44.403,10.273,42.763]);
ctx.recodingOrder('lineTo',[10.273,40.536]);
ctx.recodingOrder('bezierCurveTo',[10.273,38.895,11.6,37.564,13.243,37.564]);
ctx.recodingOrder('bezierCurveTo',[14.887,37.564,16.213,38.896,16.213,40.536]);
ctx.recodingOrder('lineTo',[16.213,42.763]);
ctx.recodingOrder('bezierCurveTo',[16.214,44.404,14.887,45.735,13.243,45.735]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();


ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[19.13,53.924]);
ctx.recodingOrder('bezierCurveTo',[18.105,53.924,17.105999999999998,53.394999999999996,16.561999999999998,52.442]);
ctx.recodingOrder('bezierCurveTo',[15.789999999999997,51.095,15.573999999999998,49.464,15.964999999999998,47.963]);
ctx.recodingOrder('bezierCurveTo',[16.381999999999998,46.372,17.979,45.410000000000004,19.589999999999996,45.839]);
ctx.recodingOrder('bezierCurveTo',[21.174999999999997,46.251,22.125999999999998,47.870999999999995,21.719999999999995,49.455999999999996]);
ctx.recodingOrder('bezierCurveTo',[22.533999999999995,50.879999999999995,22.041999999999994,52.711,20.614999999999995,53.528]);
ctx.recodingOrder('bezierCurveTo',[20.145,53.797,19.633,53.924,19.13,53.924]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save'); 




	// <<== 正式内容
	
	drawComponentToCanvas();

	return component;
}