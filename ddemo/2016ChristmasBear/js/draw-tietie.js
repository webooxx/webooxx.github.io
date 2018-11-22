

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

	   map['5']= {name : '头发',x:54,y:39,w:358,h:186,zIndex:3};
	   map['2']= {name : '脸',x:51,y:105,w:364,h:292,zIndex:2};
	   map['0']= {name : '帽子',x:26,y:168,w:418,h:244,zIndex:1};
	   map['1']= {name : '衣服',x:11,y:380,w:452,h:274};


map['6']= {name : '做眼睛',x:110,y:209,w:98,h:88,zIndex:99};
map['8']= {name : '右眼睛',x:252,y:209,w:98,h:88,zIndex:99};

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

			// if(this.data){
			// 	//	 if debug
			// 	this.context.fillStyle='rgba(255,0,0,.5)';
			// 	this.context.fillRect(this.data.x,this.data.y,this.data.w,this.data.h);

			// }


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

ctx.fillStyle="#7A4F3A";
ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[61.888,168.266]);
ctx.recodingOrder('bezierCurveTo',[61.888,168.266,41.873999999999995,195.391,33.82599999999999,226.863]);
ctx.recodingOrder('bezierCurveTo',[33.82599999999999,226.863,41.91799999999999,227.785,51.14099999999999,238.161]);
ctx.recodingOrder('lineTo',[51.37099999999999,244.848]);
ctx.recodingOrder('bezierCurveTo',[51.37099999999999,244.848,51.490999999999985,273.468,46.93499999999999,288.079]);
ctx.recodingOrder('bezierCurveTo',[46.93499999999999,288.079,46.03199999999999,296.463,27.027999999999988,295.211]);
ctx.recodingOrder('bezierCurveTo',[27.027999999999988,295.211,22.825999999999986,359.91,66.84199999999998,411.322]);
ctx.recodingOrder('bezierCurveTo',[66.84199999999998,411.322,102.14199999999998,393.99,117.30799999999999,390.51]);
ctx.recodingOrder('bezierCurveTo',[117.30799999999999,390.51,168.98,419.82099999999997,278.144,406.461]);
ctx.recodingOrder('bezierCurveTo',[278.144,406.461,332.856,400.206,354.71500000000003,385.535]);
ctx.recodingOrder('bezierCurveTo',[354.71500000000003,385.535,393.41600000000005,399.86400000000003,405.36300000000006,408.699]);
ctx.recodingOrder('bezierCurveTo',[405.36300000000006,408.699,442.244,367.47900000000004,444.75000000000006,292.445]);
ctx.recodingOrder('bezierCurveTo',[444.75000000000006,292.445,430.91800000000006,298.666,420.87200000000007,290.548]);
ctx.recodingOrder('lineTo',[418.70000000000005,288.512]);
ctx.recodingOrder('lineTo',[415.28700000000003,239.763]);
ctx.recodingOrder('lineTo',[435.41400000000004,228.228]);
ctx.recodingOrder('bezierCurveTo',[435.41400000000004,228.228,420.61800000000005,184.679,408.57400000000007,171.763]);
ctx.recodingOrder('bezierCurveTo',[408.57400000000007,171.763,416.74000000000007,267.443,416.04800000000006,300.171]);
ctx.recodingOrder('bezierCurveTo',[416.04800000000006,300.171,415.13300000000004,363.443,324.9100000000001,384.363]);
ctx.recodingOrder('bezierCurveTo',[324.9100000000001,384.363,210.11500000000007,424.491,105.03500000000008,374.673]);
ctx.recodingOrder('bezierCurveTo',[105.03500000000008,374.673,30.058000000000078,350.935,54.894000000000084,245.438]);
ctx.recodingOrder('bezierCurveTo',[54.895,245.438,57.365,183.787,61.888,168.266]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#DF9C60";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[39.209,433.363]);
ctx.recodingOrder('bezierCurveTo',[36.324000000000005,435.215,33.356,437.133,29.984,437.753]);
ctx.recodingOrder('bezierCurveTo',[24.821,438.702,19.097,436.541,14.439000000000002,438.96299999999997]);
ctx.recodingOrder('bezierCurveTo',[8.076,442.272,13.735000000000001,451.18399999999997,13.526000000000002,458.352]);
ctx.recodingOrder('bezierCurveTo',[12.917000000000002,479.20599999999996,16.083000000000002,495.736,31.594,504.131]);
ctx.recodingOrder('bezierCurveTo',[43.732,510.70099999999996,58.846000000000004,507.66999999999996,71.542,502.258]);
ctx.recodingOrder('bezierCurveTo',[84.239,496.847,96.175,489.18199999999996,109.713,486.498]);
ctx.recodingOrder('bezierCurveTo',[105.60499999999999,520.584,107.65799999999999,555.403,115.744,588.769]);
ctx.recodingOrder('bezierCurveTo',[117.369,595.473,119.25,602.311,118.47,609.165]);
ctx.recodingOrder('bezierCurveTo',[118.158,611.913,117.431,614.771,118.364,617.3739999999999]);
ctx.recodingOrder('bezierCurveTo',[119.608,620.843,123.47,622.8659999999999,124.679,626.348]);
ctx.recodingOrder('bezierCurveTo',[126.006,630.1719999999999,123.71000000000001,634.341,124.123,638.3679999999999]);
ctx.recodingOrder('bezierCurveTo',[124.994,646.852,135.977,649.401,144.497,649.78]);
ctx.recodingOrder('bezierCurveTo',[165.949,650.735,187.4,651.689,208.853,652.644]);
ctx.recodingOrder('bezierCurveTo',[217.73600000000002,653.039,229.16500000000002,651.707,231.529,643.135]);
ctx.recodingOrder('bezierCurveTo',[232.272,640.441,231.84799999999998,637.581,231.448,634.816]);
ctx.recodingOrder('bezierCurveTo',[228.001,610.971,226.709,586.815,227.59300000000002,562.739]);
ctx.recodingOrder('bezierCurveTo',[233.038,559.764,239.52200000000002,558.734,245.62,559.876]);
ctx.recodingOrder('bezierCurveTo',[247.498,560.228,246.559,622.765,246.501,628.754]);
ctx.recodingOrder('bezierCurveTo',[246.449,634.123,243.886,643.8100000000001,247.161,648.566]);
ctx.recodingOrder('bezierCurveTo',[251.507,654.878,264.373,653.7470000000001,270.972,653.9440000000001]);
ctx.recodingOrder('bezierCurveTo',[291.97799999999995,654.571,313.231,655.176,333.772,650.7370000000001]);
ctx.recodingOrder('bezierCurveTo',[338.121,649.797,342.731,648.44,345.508,644.964]);
ctx.recodingOrder('bezierCurveTo',[348.286,641.4870000000001,347.931,635.291,343.83099999999996,633.562]);
ctx.recodingOrder('bezierCurveTo',[357.97099999999995,613.638,349.03499999999997,591.504,359.395,560.893]);
ctx.recodingOrder('bezierCurveTo',[360.20599999999996,547.431,360.36699999999996,533.9300000000001,359.875,520.453]);
ctx.recodingOrder('bezierCurveTo',[359.615,513.3349999999999,361.657,486.952,356.677,481.981]);
ctx.recodingOrder('bezierCurveTo',[365.72700000000003,491.015,375.80400000000003,492.99399999999997,386.954,497.653]);
ctx.recodingOrder('bezierCurveTo',[398.783,502.595,406.872,509.115,420.641,508.51]);
ctx.recodingOrder('bezierCurveTo',[432.848,507.974,444.786,502.688,453.39000000000004,494.01099999999997]);
ctx.recodingOrder('bezierCurveTo',[458.708,488.64799999999997,462.90000000000003,481.534,462.5210000000001,473.98999999999995]);
ctx.recodingOrder('bezierCurveTo',[462.2800000000001,469.19899999999996,460.03100000000006,464.87499999999994,459.4700000000001,460.17799999999994]);
ctx.recodingOrder('bezierCurveTo',[458.9400000000001,455.74199999999996,460.7100000000001,452.86999999999995,460.9190000000001,448.89099999999996]);
ctx.recodingOrder('bezierCurveTo',[461.2120000000001,443.299,460.0270000000001,435.323,453.2490000000001,433.258]);
ctx.recodingOrder('bezierCurveTo',[449.6640000000001,432.166,445.73800000000006,433.491,442.0660000000001,432.74199999999996]);
ctx.recodingOrder('bezierCurveTo',[438.81200000000007,432.078,436.12200000000007,429.87499999999994,433.54300000000006,427.782]);
ctx.recodingOrder('bezierCurveTo',[412.04100000000005,410.334,385.70700000000005,400.311,360.4680000000001,388.921]);
ctx.recodingOrder('bezierCurveTo',[355.90100000000007,386.86,344.88200000000006,381.596,339.89700000000005,381.09]);
ctx.recodingOrder('bezierCurveTo',[334.201,380.513,337.39700000000005,380.539,331.814,381.80699999999996]);
ctx.recodingOrder('bezierCurveTo',[275.558,394.58899999999994,219.459,404.49699999999996,159.84000000000003,389.292]);
ctx.recodingOrder('bezierCurveTo',[150.23900000000003,387.974,140.51400000000004,386.363,130.91000000000003,387.65999999999997]);
ctx.recodingOrder('bezierCurveTo',[121.62800000000003,388.914,112.93700000000003,392.825,104.49500000000003,396.885]);
ctx.recodingOrder('bezierCurveTo',[82.012,407.696,60.196,419.885,39.209,433.363]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#F4E4D9";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[235.108,126.945]);
ctx.recodingOrder('bezierCurveTo',[204.62900000000002,132.691,176.964,85.56199999999998,136.7,115.708]);
ctx.recodingOrder('bezierCurveTo',[122.76799999999999,126.832,110.78599999999999,154.278,99.24399999999999,184.446]);
ctx.recodingOrder('bezierCurveTo',[85.99699999999999,208.755,69.78299999999999,224.06799999999998,54.908999999999985,224.88299999999998]);
ctx.recodingOrder('bezierCurveTo',[54.700999999999986,229.00799999999998,54.54799999999999,233.23999999999998,54.454999999999984,237.57999999999998]);
ctx.recodingOrder('lineTo',[53.91699999999999,243.52399999999997]);
ctx.recodingOrder('bezierCurveTo',[53.91699999999999,243.52399999999997,38.93399999999998,225.38799999999998,25.750999999999987,227.46099999999998]);
ctx.recodingOrder('bezierCurveTo',[12.56799999999999,229.534,-9.074000000000016,252.55399999999997,12.884999999999987,285.45]);
ctx.recodingOrder('bezierCurveTo',[12.884999999999987,285.45,30.963999999999988,304.534,50.12599999999999,286.632]);
ctx.recodingOrder('bezierCurveTo',[50.12599999999999,286.632,40.04899999999999,357.639,126.38399999999999,380.985]);
ctx.recodingOrder('bezierCurveTo',[126.38399999999999,380.985,290.143,435.015,397.37199999999996,346.339]);
ctx.recodingOrder('bezierCurveTo',[397.37199999999996,346.339,418.96999999999997,325.948,416.92199999999997,285.047]);
ctx.recodingOrder('bezierCurveTo',[416.92199999999997,285.047,430.10099999999994,302.53700000000003,450.058,289.09200000000004]);
ctx.recodingOrder('bezierCurveTo',[470.01599999999996,275.64700000000005,467.423,233.22700000000003,441.512,227.46100000000004]);
ctx.recodingOrder('bezierCurveTo',[441.512,227.46100000000004,427.927,224.43700000000004,413.925,238.97500000000005]);
ctx.recodingOrder('bezierCurveTo',[413.925,238.97500000000005,414.195,235.18300000000005,414.262,228.68400000000005]);
ctx.recodingOrder('bezierCurveTo',[409.55,219.64100000000005,379.592,231.78000000000006,359.74,170.86100000000005]);
ctx.recodingOrder('bezierCurveTo',[347.84000000000003,123.21400000000006,326.04200000000003,106.11700000000005,311.671,105.77100000000004]);
ctx.recodingOrder('bezierCurveTo',[294.821,102.679,255.571,132.691,235.108,126.945]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[66.843,414.039]);
ctx.recodingOrder('bezierCurveTo',[65.973,414.039,65.108,413.666,64.50800000000001,412.948]);
ctx.recodingOrder('bezierCurveTo',[39.06700000000001,382.45599999999996,25.43200000000001,342.767,23.98900000000001,294.98299999999995]);
ctx.recodingOrder('bezierCurveTo',[23.941000000000013,293.30499999999995,25.25900000000001,291.90599999999995,26.93400000000001,291.8539999999999]);
ctx.recodingOrder('bezierCurveTo',[26.967000000000013,291.85099999999994,26.999000000000013,291.85099999999994,27.02600000000001,291.85099999999994]);
ctx.recodingOrder('bezierCurveTo',[28.66300000000001,291.85099999999994,30.01500000000001,293.15299999999996,30.06300000000001,294.7989999999999]);
ctx.recodingOrder('bezierCurveTo',[31.463000000000008,341.1889999999999,44.62100000000001,379.62999999999994,69.177,409.0519999999999]);
ctx.recodingOrder('bezierCurveTo',[70.25200000000001,410.3409999999999,70.08000000000001,412.2589999999999,68.78800000000001,413.3349999999999]);
ctx.recodingOrder('bezierCurveTo',[68.221,413.807,67.529,414.039,66.843,414.039]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[405.361,411.418]);
ctx.recodingOrder('bezierCurveTo',[404.69599999999997,411.418,404.027,411.202,403.464,410.753]);
ctx.recodingOrder('bezierCurveTo',[402.156,409.707,401.94,407.79499999999996,402.983,406.484]);
ctx.recodingOrder('bezierCurveTo',[426.43,377.078,438.898,339.037,440.038,293.41999999999996]);
ctx.recodingOrder('bezierCurveTo',[440.076,291.76899999999995,441.432,290.45599999999996,443.075,290.45599999999996]);
ctx.recodingOrder('bezierCurveTo',[443.096,290.45599999999996,443.123,290.45599999999996,443.151,290.45899999999995]);
ctx.recodingOrder('bezierCurveTo',[444.832,290.49899999999997,446.15500000000003,291.893,446.113,293.57199999999995]);
ctx.recodingOrder('bezierCurveTo',[444.94,340.54299999999995,432.03,379.80799999999994,407.74,410.2729999999999]);
ctx.recodingOrder('bezierCurveTo',[407.139,411.027,406.252,411.418,405.361,411.418]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#9B5347";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[412.418,224.64]);
ctx.recodingOrder('bezierCurveTo',[402.351,223.46499999999997,389.81600000000003,217.879,380.355,207.825]);
ctx.recodingOrder('bezierCurveTo',[370.894,197.76999999999998,364.736,185.08999999999997,359.576,172.283]);
ctx.recodingOrder('bezierCurveTo',[353.28000000000003,156.658,350.853,141.357,342.01800000000003,126.69199999999998]);
ctx.recodingOrder('bezierCurveTo',[336.908,118.20699999999998,330.24800000000005,110.04299999999998,321.021,106.44299999999998]);
ctx.recodingOrder('bezierCurveTo',[305.46000000000004,100.37699999999998,288.397,108.89499999999998,273.74,116.90399999999998]);
ctx.recodingOrder('bezierCurveTo',[256.579,126.28799999999998,233.131,129.671,214.01600000000002,122.91099999999999]);
ctx.recodingOrder('bezierCurveTo',[195.75600000000003,116.44999999999999,182.65300000000002,104.79899999999999,162.29500000000002,104.73999999999998]);
ctx.recodingOrder('bezierCurveTo',[144.103,104.68999999999998,131.54500000000002,117.56899999999999,121.25700000000002,132.57399999999998]);
ctx.recodingOrder('bezierCurveTo',[110.97100000000002,147.576,105.99100000000001,172.158,96.24500000000002,187.51899999999998]);
ctx.recodingOrder('bezierCurveTo',[87.52900000000002,201.25699999999998,72.92200000000003,222.21499999999997,55.24400000000002,224.43099999999998]);
ctx.recodingOrder('bezierCurveTo',[53.33300000000002,219.404,55.581000000000024,215.581,56.46300000000002,210.71099999999998]);
ctx.recodingOrder('bezierCurveTo',[57.68000000000002,203.98,57.392000000000024,196.81599999999997,58.13100000000002,189.999]);
ctx.recodingOrder('bezierCurveTo',[59.61600000000002,176.265,62.29200000000002,162.652,66.86500000000002,149.596]);
ctx.recodingOrder('bezierCurveTo',[73.98300000000002,129.276,83.79900000000002,109.903,96.00600000000003,92.167]);
ctx.recodingOrder('bezierCurveTo',[107.15200000000003,75.97800000000001,124.79700000000003,66.611,141.37400000000002,57.865]);
ctx.recodingOrder('bezierCurveTo',[149.27400000000003,53.698,155.842,52.616,164.69500000000002,49.898]);
ctx.recodingOrder('bezierCurveTo',[175.735,46.506,186.71200000000002,42.609,198.18300000000002,40.909000000000006]);
ctx.recodingOrder('bezierCurveTo',[209.919,39.17000000000001,222.531,39.36000000000001,234.38400000000001,39.60000000000001]);
ctx.recodingOrder('bezierCurveTo',[247.816,39.87300000000001,261.17400000000004,41.452000000000005,274.449,43.41600000000001]);
ctx.recodingOrder('bezierCurveTo',[286.648,45.22300000000001,299.716,45.87000000000001,311.302,49.99600000000001]);
ctx.recodingOrder('bezierCurveTo',[331.95500000000004,57.35300000000001,348.683,69.512,365.30600000000004,83.59700000000001]);
ctx.recodingOrder('bezierCurveTo',[372.84700000000004,89.98700000000001,377.759,96.33800000000001,383.27400000000006,104.61200000000001]);
ctx.recodingOrder('bezierCurveTo',[388.87000000000006,113.00800000000001,395.21500000000003,123.95800000000001,398.73800000000006,133.455]);
ctx.recodingOrder('bezierCurveTo',[401.0710000000001,139.741,402.28400000000005,145.508,403.55400000000003,152.11]);
ctx.recodingOrder('bezierCurveTo',[407.973,175.09500000000003,411.687,197.55700000000002,412.418,220.89600000000002]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[208.033,253.487]);
ctx.recodingOrder('bezierCurveTo',[208.033,277.544,186.26299999999998,297.048,159.41,297.048]);
ctx.recodingOrder('bezierCurveTo',[132.55700000000002,297.048,110.787,277.544,110.787,253.487]);
ctx.recodingOrder('bezierCurveTo',[110.787,229.433,132.55700000000002,209.93,159.41,209.93]);
ctx.recodingOrder('bezierCurveTo',[186.26299999999998,209.93,208.033,229.433,208.033,253.487]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[159.412,300.651]);
ctx.recodingOrder('bezierCurveTo',[130.614,300.651,107.183,279.495,107.183,253.48600000000002]);
ctx.recodingOrder('bezierCurveTo',[107.183,227.479,130.615,206.32300000000004,159.412,206.32300000000004]);
ctx.recodingOrder('bezierCurveTo',[188.209,206.32300000000004,211.636,227.47900000000004,211.636,253.48600000000005]);
ctx.recodingOrder('bezierCurveTo',[211.635,279.495,188.209,300.651,159.412,300.651]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[159.412,213.532]);
ctx.recodingOrder('bezierCurveTo',[134.586,213.532,114.392,231.45700000000002,114.392,253.48600000000002]);
ctx.recodingOrder('bezierCurveTo',[114.392,275.51800000000003,134.58599999999998,293.442,159.412,293.442]);
ctx.recodingOrder('bezierCurveTo',[184.232,293.442,204.42700000000002,275.517,204.42700000000002,253.486]);
ctx.recodingOrder('bezierCurveTo',[204.427,231.457,184.232,213.532,159.412,213.532]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[349.85,253.487]);
ctx.recodingOrder('bezierCurveTo',[349.85,277.544,328.082,297.048,301.22700000000003,297.048]);
ctx.recodingOrder('bezierCurveTo',[274.37500000000006,297.048,252.60400000000004,277.544,252.60400000000004,253.487]);
ctx.recodingOrder('bezierCurveTo',[252.60400000000004,229.433,274.37500000000006,209.93,301.22700000000003,209.93]);
ctx.recodingOrder('bezierCurveTo',[328.082,209.929,349.85,229.433,349.85,253.487]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[301.227,300.651]);
ctx.recodingOrder('bezierCurveTo',[272.429,300.651,248.998,279.495,248.998,253.48600000000002]);
ctx.recodingOrder('bezierCurveTo',[248.998,227.479,272.43,206.32300000000004,301.227,206.32300000000004]);
ctx.recodingOrder('bezierCurveTo',[330.025,206.32300000000004,353.45599999999996,227.47900000000004,353.45599999999996,253.48600000000005]);
ctx.recodingOrder('bezierCurveTo',[353.456,279.495,330.025,300.651,301.227,300.651]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[301.227,213.532]);
ctx.recodingOrder('bezierCurveTo',[276.40099999999995,213.532,256.207,231.45700000000002,256.207,253.48600000000002]);
ctx.recodingOrder('bezierCurveTo',[256.207,275.51800000000003,276.401,293.442,301.227,293.442]);
ctx.recodingOrder('bezierCurveTo',[326.053,293.442,346.24699999999996,275.517,346.24699999999996,253.486]);
ctx.recodingOrder('bezierCurveTo',[346.247,231.457,326.053,213.532,301.227,213.532]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[159.412,300.846]);
ctx.recodingOrder('bezierCurveTo',[130.506,300.846,106.988,279.6,106.988,253.486]);
ctx.recodingOrder('bezierCurveTo',[106.988,227.374,130.506,206.129,159.412,206.129]);
ctx.recodingOrder('bezierCurveTo',[188.317,206.129,211.83,227.375,211.83,253.486]);
ctx.recodingOrder('bezierCurveTo',[211.83,279.6,188.318,300.846,159.412,300.846]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[159.412,213.727]);
ctx.recodingOrder('bezierCurveTo',[134.69400000000002,213.727,114.58600000000001,231.563,114.58600000000001,253.486]);
ctx.recodingOrder('bezierCurveTo',[114.58600000000001,275.409,134.69400000000002,293.248,159.412,293.248]);
ctx.recodingOrder('bezierCurveTo',[184.124,293.248,204.232,275.40999999999997,204.232,253.486]);
ctx.recodingOrder('bezierCurveTo',[204.232,231.562,184.124,213.727,159.412,213.727]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[301.227,300.846]);
ctx.recodingOrder('bezierCurveTo',[272.322,300.846,248.80299999999997,279.6,248.80299999999997,253.486]);
ctx.recodingOrder('bezierCurveTo',[248.80299999999997,227.374,272.32099999999997,206.129,301.227,206.129]);
ctx.recodingOrder('bezierCurveTo',[330.133,206.129,353.65099999999995,227.375,353.65099999999995,253.486]);
ctx.recodingOrder('bezierCurveTo',[353.651,279.6,330.132,300.846,301.227,300.846]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[301.227,213.727]);
ctx.recodingOrder('bezierCurveTo',[276.50899999999996,213.727,256.40099999999995,231.563,256.40099999999995,253.486]);
ctx.recodingOrder('bezierCurveTo',[256.40099999999995,275.409,276.50899999999996,293.248,301.227,293.248]);
ctx.recodingOrder('bezierCurveTo',[325.945,293.248,346.053,275.40999999999997,346.053,253.486]);
ctx.recodingOrder('bezierCurveTo',[346.053,231.562,325.945,213.727,301.227,213.727]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[252.603,257.285]);
ctx.recodingOrder('bezierCurveTo',[252.29000000000002,257.285,251.97,257.247,251.65200000000002,257.16400000000004]);
ctx.recodingOrder('bezierCurveTo',[237.92100000000002,253.60800000000003,223.55700000000002,253.61600000000004,208.92900000000003,257.177]);
ctx.recodingOrder('bezierCurveTo',[206.93500000000003,257.658,204.83300000000003,256.42600000000004,204.34100000000004,254.38600000000002]);
ctx.recodingOrder('bezierCurveTo',[203.84400000000002,252.348,205.09200000000004,250.29300000000003,207.13500000000005,249.79500000000002]);
ctx.recodingOrder('bezierCurveTo',[222.98500000000004,245.931,238.61300000000006,245.93900000000002,253.55500000000006,249.80800000000002]);
ctx.recodingOrder('bezierCurveTo',[255.58700000000007,250.335,256.80800000000005,252.40800000000002,256.28400000000005,254.43600000000004]);
ctx.recodingOrder('bezierCurveTo',[255.834,256.15,254.294,257.285,252.603,257.285]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[230.128,301.008]);
ctx.recodingOrder('bezierCurveTo',[226.475,301.008,222.81599999999997,300.284,219.444,298.817]);
ctx.recodingOrder('bezierCurveTo',[217.51999999999998,297.982,216.63899999999998,295.742,217.47099999999998,293.819]);
ctx.recodingOrder('bezierCurveTo',[218.319,291.898,220.56199999999998,291.014,222.46899999999997,291.85200000000003]);
ctx.recodingOrder('bezierCurveTo',[228.11099999999996,294.3,235.11999999999998,293.80300000000005,240.35599999999997,290.574]);
ctx.recodingOrder('bezierCurveTo',[242.14499999999995,289.474,244.47899999999996,290.028,245.58199999999997,291.81100000000004]);
ctx.recodingOrder('bezierCurveTo',[246.68399999999997,293.59700000000004,246.13299999999995,295.937,244.34499999999997,297.03700000000003]);
ctx.recodingOrder('bezierCurveTo',[240.082,299.668,235.105,301.008,230.128,301.008]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[180.185,187.777]);
ctx.recodingOrder('bezierCurveTo',[178.234,187.777,176.569,186.278,176.40800000000002,184.297]);
ctx.recodingOrder('bezierCurveTo',[176.23000000000002,182.206,177.781,180.369,179.872,180.19299999999998]);
ctx.recodingOrder('bezierCurveTo',[186.4,179.64499999999998,192.39300000000003,173.914,193.23600000000002,167.421]);
ctx.recodingOrder('bezierCurveTo',[193.501,165.34099999999998,195.43500000000003,163.868,197.48900000000003,164.141]);
ctx.recodingOrder('bezierCurveTo',[199.56900000000005,164.409,201.04000000000002,166.313,200.76900000000003,168.394]);
ctx.recodingOrder('bezierCurveTo',[199.47200000000004,178.41,190.57200000000003,186.919,180.51000000000005,187.764]);
ctx.recodingOrder('bezierCurveTo',[180.401,187.771,180.293,187.777,180.185,187.777]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#804139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[283.508,189.358]);
ctx.recodingOrder('bezierCurveTo',[278.95799999999997,189.358,274.397,187.732,270.966,184.719]);
ctx.recodingOrder('bezierCurveTo',[266.124,180.47199999999998,263.725,173.62199999999999,264.865,167.275]);
ctx.recodingOrder('bezierCurveTo',[265.233,165.208,267.189,163.84300000000002,269.27500000000003,164.20600000000002]);
ctx.recodingOrder('bezierCurveTo',[271.34000000000003,164.57600000000002,272.71200000000005,166.55100000000002,272.34400000000005,168.616]);
ctx.recodingOrder('bezierCurveTo',[271.67400000000004,172.342,273.13300000000004,176.51700000000002,275.975,179.01100000000002]);
ctx.recodingOrder('bezierCurveTo',[278.82300000000004,181.51100000000002,283.15700000000004,182.41800000000003,286.75600000000003,181.27300000000002]);
ctx.recodingOrder('bezierCurveTo',[288.771,180.63500000000002,290.89500000000004,181.74600000000004,291.528,183.74500000000003]);
ctx.recodingOrder('bezierCurveTo',[292.161,185.74400000000003,291.058,187.87900000000002,289.059,188.51400000000004]);
ctx.recodingOrder('bezierCurveTo',[287.264,189.082,285.389,189.358,283.508,189.358]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[433.764,297.179]);
ctx.recodingOrder('bezierCurveTo',[431.435,297.179,429.149,296.92499999999995,427.014,296.404]);
ctx.recodingOrder('bezierCurveTo',[421.199,294.978,416.736,291.724,414.104,286.993]);
ctx.recodingOrder('bezierCurveTo',[413.288,285.528,413.812,283.678,415.277,282.859]);
ctx.recodingOrder('bezierCurveTo',[416.757,282.03799999999995,418.59499999999997,282.575,419.411,284.037]);
ctx.recodingOrder('bezierCurveTo',[421.232,287.298,424.275,289.47299999999996,428.462,290.5]);
ctx.recodingOrder('bezierCurveTo',[434.741,292.038,442.70099999999996,290.649,448.224,287.02]);
ctx.recodingOrder('bezierCurveTo',[459.913,279.344,462.577,258.371,457.151,244.748]);
ctx.recodingOrder('bezierCurveTo',[454.714,238.634,448.586,228.749,434.871,231.2]);
ctx.recodingOrder('bezierCurveTo',[426.5,232.697,417.541,238.938,417.405,247.56]);
ctx.recodingOrder('bezierCurveTo',[417.38399999999996,249.238,416.15099999999995,250.516,414.31899999999996,250.554]);
ctx.recodingOrder('bezierCurveTo',[412.64399999999995,250.52700000000002,411.30299999999994,249.147,411.33,247.468]);
ctx.recodingOrder('bezierCurveTo',[411.508,235.46599999999998,422.77,227.19,433.799,225.21699999999998]);
ctx.recodingOrder('bezierCurveTo',[446.95799999999997,222.874,457.484,229.172,462.796,242.49599999999998]);
ctx.recodingOrder('bezierCurveTo',[469.097,258.327,466.038,282.59,451.561,292.099]);
ctx.recodingOrder('bezierCurveTo',[446.582,295.372,440,297.179,433.764,297.179]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[34.7,297.939]);
ctx.recodingOrder('bezierCurveTo',[27.475,297.939,20.152,295.305,15.273000000000003,292.1]);
ctx.recodingOrder('bezierCurveTo',[0.8010000000000037,282.589,-2.262999999999998,258.32300000000004,4.044000000000004,242.49500000000003]);
ctx.recodingOrder('bezierCurveTo',[9.351000000000004,229.16900000000004,19.910000000000004,222.88400000000004,33.036,225.21900000000002]);
ctx.recodingOrder('bezierCurveTo',[44.104,227.19700000000003,56.165000000000006,236.735,56.343,248.69100000000003]);
ctx.recodingOrder('bezierCurveTo',[56.370000000000005,250.36900000000003,55.03,251.74900000000002,53.354000000000006,251.77700000000004]);
ctx.recodingOrder('bezierCurveTo',[51.495000000000005,251.62300000000005,50.290000000000006,250.46100000000004,50.26800000000001,248.78300000000004]);
ctx.recodingOrder('bezierCurveTo',[50.138000000000005,240.20200000000006,40.69800000000001,232.76300000000003,31.965000000000007,231.20100000000005]);
ctx.recodingOrder('bezierCurveTo',[18.277000000000008,228.75600000000006,12.122000000000007,238.63700000000006,9.690000000000008,244.74600000000004]);
ctx.recodingOrder('bezierCurveTo',[4.259000000000008,258.367,6.923000000000009,279.34200000000004,18.61200000000001,287.021]);
ctx.recodingOrder('bezierCurveTo',[24.75100000000001,291.055,33.30500000000001,292.833,39.47100000000001,291.317]);
ctx.recodingOrder('bezierCurveTo',[43.05400000000001,290.43600000000004,45.69100000000001,288.52,47.30700000000001,285.621]);
ctx.recodingOrder('bezierCurveTo',[48.11800000000001,284.159,49.97100000000001,283.62399999999997,51.43600000000001,284.443]);
ctx.recodingOrder('bezierCurveTo',[52.906000000000006,285.25899999999996,53.43000000000001,287.10999999999996,52.614000000000004,288.577]);
ctx.recodingOrder('bezierCurveTo',[50.182,292.948,46.14,295.937,40.92,297.221]);
ctx.recodingOrder('bezierCurveTo',[38.899,297.717,36.802,297.939,34.7,297.939]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[416.763,273.256]);
ctx.recodingOrder('bezierCurveTo',[416.433,273.256,416.09799999999996,273.202,415.768,273.089]);
ctx.recodingOrder('bezierCurveTo',[414.18399999999997,272.541,413.34099999999995,270.811,413.887,269.225]);
ctx.recodingOrder('bezierCurveTo',[416.281,262.3,424.133,252.413,430.05,248.88000000000002]);
ctx.recodingOrder('bezierCurveTo',[431.493,248.01300000000003,433.357,248.49400000000003,434.216,249.931]);
ctx.recodingOrder('bezierCurveTo',[435.075,251.37400000000002,434.605,253.238,433.16200000000003,254.10000000000002]);
ctx.recodingOrder('bezierCurveTo',[428.40700000000004,256.94,421.581,265.57500000000005,419.636,271.209]);
ctx.recodingOrder('bezierCurveTo',[419.201,272.468,418.022,273.256,416.763,273.256]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[49.95,275.937]);
ctx.recodingOrder('bezierCurveTo',[48.367000000000004,275.937,47.026,274.702,46.92400000000001,273.09700000000004]);
ctx.recodingOrder('bezierCurveTo',[46.465,266.105,39.44500000000001,256.761,32.75000000000001,254.23400000000004]);
ctx.recodingOrder('bezierCurveTo',[31.183000000000007,253.64200000000002,30.388000000000005,251.88900000000004,30.983000000000008,250.31900000000005]);
ctx.recodingOrder('bezierCurveTo',[31.572000000000006,248.74700000000004,33.318000000000005,247.95500000000004,34.90100000000001,248.54900000000004]);
ctx.recodingOrder('bezierCurveTo',[43.75800000000001,251.89100000000005,52.37700000000001,263.40200000000004,52.988000000000014,272.696]);
ctx.recodingOrder('bezierCurveTo',[53.09600000000001,274.37100000000004,51.832000000000015,275.819,50.15600000000001,275.92800000000005]);
ctx.recodingOrder('bezierCurveTo',[50.085,275.934,50.02,275.937,49.95,275.937]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#F19E97";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[100.239,298.53]);
ctx.recodingOrder('bezierCurveTo',[99.98,298.53,99.72,298.505,99.461,298.44899999999996]);
ctx.recodingOrder('bezierCurveTo',[97.408,298.02199999999993,96.089,296.01199999999994,96.516,293.95899999999995]);
ctx.recodingOrder('bezierCurveTo',[97.35900000000001,289.893,99.423,286.02399999999994,102.325,283.06499999999994]);
ctx.recodingOrder('bezierCurveTo',[103.795,281.55999999999995,106.194,281.5439999999999,107.697,283.01099999999997]);
ctx.recodingOrder('bezierCurveTo',[109.194,284.481,109.221,286.88599999999997,107.751,288.383]);
ctx.recodingOrder('bezierCurveTo',[105.854,290.317,104.509,292.846,103.952,295.505]);
ctx.recodingOrder('bezierCurveTo',[103.579,297.298,102.001,298.53,100.239,298.53]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#F19E97";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[111.657,299.301]);
ctx.recodingOrder('bezierCurveTo',[111.435,299.301,111.208,299.282,110.982,299.24199999999996]);
ctx.recodingOrder('bezierCurveTo',[108.917,298.87199999999996,107.545,296.89699999999993,107.913,294.83199999999994]);
ctx.recodingOrder('bezierCurveTo',[108.42699999999999,291.9889999999999,109.431,289.28799999999995,110.91199999999999,286.80499999999995]);
ctx.recodingOrder('bezierCurveTo',[111.987,285.0079999999999,114.31099999999999,284.41099999999994,116.121,285.4839999999999]);
ctx.recodingOrder('bezierCurveTo',[117.92099999999999,286.5569999999999,118.515,288.8889999999999,117.44,290.6909999999999]);
ctx.recodingOrder('bezierCurveTo',[116.42999999999999,292.3909999999999,115.738,294.2339999999999,115.392,296.17299999999994]);
ctx.recodingOrder('bezierCurveTo',[115.062,298.012,113.462,299.301,111.657,299.301]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#F19E97";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[349.798,295.35]);
ctx.recodingOrder('bezierCurveTo',[348.744,295.35,347.696,294.915,346.945,294.06100000000004]);
ctx.recodingOrder('lineTo',[343.032,289.61100000000005]);
ctx.recodingOrder('bezierCurveTo',[341.643,288.035,341.79499999999996,285.63700000000006,343.36699999999996,284.24800000000005]);
ctx.recodingOrder('bezierCurveTo',[344.93899999999996,282.85900000000004,347.33899999999994,283.011,348.727,284.58600000000007]);
ctx.recodingOrder('lineTo',[352.65,289.0420000000001]);
ctx.recodingOrder('bezierCurveTo',[354.034,290.6180000000001,353.882,293.0160000000001,352.304,294.4030000000001]);
ctx.recodingOrder('bezierCurveTo',[351.586,295.037,350.689,295.35,349.798,295.35]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#F19E97";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[359.757,289.311]);
ctx.recodingOrder('bezierCurveTo',[358.357,289.311,357.012,288.536,356.347,287.195]);
ctx.recodingOrder('bezierCurveTo',[355.531,285.55,354.22299999999996,284.087,352.656,283.08]);
ctx.recodingOrder('bezierCurveTo',[350.894,281.945,350.386,279.59499999999997,351.521,277.83]);
ctx.recodingOrder('bezierCurveTo',[352.656,276.07099999999997,355.012,275.555,356.774,276.693]);
ctx.recodingOrder('bezierCurveTo',[359.514,278.457,361.718,280.924,363.156,283.829]);
ctx.recodingOrder('bezierCurveTo',[364.086,285.71,363.318,287.987,361.438,288.91700000000003]);
ctx.recodingOrder('bezierCurveTo',[360.897,289.184,360.319,289.311,359.757,289.311]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[228.296,399.959]);
ctx.recodingOrder('bezierCurveTo',[193.219,399.959,158.315,394.712,125.31299999999999,384.349]);
ctx.recodingOrder('bezierCurveTo',[112.52699999999999,380.336,96.04499999999999,374.414,81.94099999999999,364.114]);
ctx.recodingOrder('bezierCurveTo',[47.26899999999999,338.80699999999996,44.426999999999985,297.92699999999996,48.14499999999999,268.08899999999994]);
ctx.recodingOrder('bezierCurveTo',[49.72799999999999,255.35699999999994,50.83099999999999,242.80899999999994,51.889999999999986,230.67199999999994]);
ctx.recodingOrder('bezierCurveTo',[54.29999999999998,203.13899999999995,56.569999999999986,177.12999999999994,64.076,149.33199999999994]);
ctx.recodingOrder('bezierCurveTo',[73.619,114.00599999999994,97.435,67.69199999999994,156.694,47.64899999999993]);
ctx.recodingOrder('bezierCurveTo',[193.279,35.27099999999993,227.38799999999998,34.97999999999993,258.78999999999996,36.51999999999993]);
ctx.recodingOrder('bezierCurveTo',[304.777,38.759999999999934,364.05899999999997,59.426999999999936,392.51,110.70199999999994]);
ctx.recodingOrder('bezierCurveTo',[411.613,145.13599999999994,413.55899999999997,181.16599999999994,415.618,219.31299999999993]);
ctx.recodingOrder('bezierCurveTo',[416.229,230.66099999999994,416.866,242.39299999999992,417.995,253.96299999999994]);
ctx.recodingOrder('lineTo',[417.995,253.96299999999994]);
ctx.recodingOrder('bezierCurveTo',[419.98900000000003,274.4309999999999,423.712,312.5279999999999,407.247,337.05099999999993]);
ctx.recodingOrder('bezierCurveTo',[380.594,376.74299999999994,324.821,389.53399999999993,279.206,396.24299999999994]);
ctx.recodingOrder('bezierCurveTo',[262.335,398.725,245.291,399.959,228.296,399.959]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[234.986,41.952]);
ctx.recodingOrder('bezierCurveTo',[210.89499999999998,41.952,185.394,44.355999999999995,158.64,53.405]);
ctx.recodingOrder('bezierCurveTo',[101.92599999999999,72.592,79.09999999999998,117.023,69.945,150.916]);
ctx.recodingOrder('bezierCurveTo',[62.57899999999999,178.195,60.331999999999994,203.942,57.94299999999999,231.202]);
ctx.recodingOrder('bezierCurveTo',[56.87899999999999,243.393,55.77599999999999,255.998,54.17599999999999,268.84]);
ctx.recodingOrder('bezierCurveTo',[50.65799999999999,297.05699999999996,53.24599999999999,335.64099999999996,85.52999999999999,359.207]);
ctx.recodingOrder('bezierCurveTo',[98.90999999999998,368.98,114.79199999999999,374.679,127.12899999999999,378.55]);
ctx.recodingOrder('bezierCurveTo',[175.267,393.659,227.545,397.699,278.32,390.228]);
ctx.recodingOrder('bezierCurveTo',[322.697,383.70300000000003,376.877,371.37600000000003,402.199,333.66200000000003]);
ctx.recodingOrder('bezierCurveTo',[417.449,310.949,413.866,274.26200000000006,411.942,254.55100000000004]);
ctx.recodingOrder('lineTo',[411.942,254.55100000000004]);
ctx.recodingOrder('bezierCurveTo',[410.801,242.85200000000003,410.164,231.05200000000005,409.548,219.63900000000004]);
ctx.recodingOrder('bezierCurveTo',[407.527,182.21200000000005,405.619,146.85900000000004,387.192,113.65100000000004]);
ctx.recodingOrder('bezierCurveTo',[359.951,64.55400000000003,302.847,44.75100000000003,258.497,42.587000000000046]);
ctx.recodingOrder('bezierCurveTo',[250.82,42.217,242.984,41.952,234.986,41.952]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[90.917,495.209]);
ctx.recodingOrder('bezierCurveTo',[88.84700000000001,495.209,86.97200000000001,493.79,86.486,491.689]);
ctx.recodingOrder('bezierCurveTo',[80.812,467.404,69.593,444.27500000000003,54.036,424.80400000000003]);
ctx.recodingOrder('bezierCurveTo',[52.464,422.83700000000005,52.782000000000004,419.97,54.749,418.398]);
ctx.recodingOrder('bezierCurveTo',[56.727000000000004,416.826,59.586,417.15500000000003,61.158,419.11400000000003]);
ctx.recodingOrder('bezierCurveTo',[77.554,439.63800000000003,89.38300000000001,464.01800000000003,95.35900000000001,489.61400000000003]);
ctx.recodingOrder('bezierCurveTo',[95.932,492.06800000000004,94.41400000000002,494.51800000000003,91.96000000000001,495.091]);
ctx.recodingOrder('bezierCurveTo',[91.609,495.171,91.263,495.209,90.917,495.209]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[80.104,503.923]);
ctx.recodingOrder('bezierCurveTo',[79.904,503.923,79.704,503.91,79.504,503.885]);
ctx.recodingOrder('bezierCurveTo',[71.22500000000001,502.796,63.967000000000006,496.752,61.86000000000001,489.18899999999996]);
ctx.recodingOrder('bezierCurveTo',[60.81700000000001,485.42199999999997,61.541000000000004,481.86899999999997,62.184000000000005,478.73499999999996]);
ctx.recodingOrder('lineTo',[62.50300000000001,477.15099999999995]);
ctx.recodingOrder('bezierCurveTo',[63.01700000000001,474.41399999999993,62.849000000000004,472.35499999999996,62.04900000000001,471.496]);
ctx.recodingOrder('bezierCurveTo',[61.36800000000001,470.76599999999996,59.70400000000001,470.256,58.23400000000001,469.805]);
ctx.recodingOrder('bezierCurveTo',[52.79200000000001,468.133,46.31900000000001,465.361,44.59500000000001,458.705]);
ctx.recodingOrder('bezierCurveTo',[43.546000000000014,454.666,43.63800000000001,450.931,43.71400000000001,447.635]);
ctx.recodingOrder('bezierCurveTo',[43.844000000000015,442.474,43.930000000000014,438.745,40.16900000000001,434.63599999999997]);
ctx.recodingOrder('bezierCurveTo',[38.46700000000001,432.78,38.59700000000001,429.897,40.45000000000001,428.19699999999995]);
ctx.recodingOrder('bezierCurveTo',[42.30400000000001,426.49699999999996,45.18900000000001,426.61599999999993,46.89200000000001,428.48099999999994]);
ctx.recodingOrder('bezierCurveTo',[53.13400000000001,435.29799999999994,52.97100000000001,441.96899999999994,52.83100000000001,447.85599999999994]);
ctx.recodingOrder('bezierCurveTo',[52.76100000000001,450.8179999999999,52.69100000000001,453.61099999999993,53.42000000000001,456.41599999999994]);
ctx.recodingOrder('bezierCurveTo',[54.08500000000001,458.99099999999993,59.22400000000001,460.56899999999996,60.915000000000006,461.08799999999997]);
ctx.recodingOrder('bezierCurveTo',[63.34700000000001,461.83599999999996,66.379,462.76899999999995,68.718,465.28099999999995]);
ctx.recodingOrder('bezierCurveTo',[71.63600000000001,468.4119999999999,72.56,472.97099999999995,71.46300000000001,478.82599999999996]);
ctx.recodingOrder('lineTo',[71.117,480.566]);
ctx.recodingOrder('bezierCurveTo',[70.641,482.89799999999997,70.187,485.097,70.647,486.743]);
ctx.recodingOrder('bezierCurveTo',[71.78200000000001,490.82099999999997,76.00800000000001,494.228,80.69300000000001,494.843]);
ctx.recodingOrder('bezierCurveTo',[83.18900000000001,495.173,84.94600000000001,497.461,84.61600000000001,499.958]);
ctx.recodingOrder('bezierCurveTo',[84.319,502.253,82.357,503.923,80.104,503.923]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[377.055,492.969]);
ctx.recodingOrder('bezierCurveTo',[376.509,492.969,375.958,492.86899999999997,375.423,492.664]);
ctx.recodingOrder('bezierCurveTo',[373.073,491.76099999999997,371.899,489.125,372.797,486.774]);
ctx.recodingOrder('bezierCurveTo',[380.201,467.49,389.98100000000005,449.133,401.87,432.219]);
ctx.recodingOrder('bezierCurveTo',[405.388,427.212,409.338,421.96999999999997,414.342,417.542]);
ctx.recodingOrder('bezierCurveTo',[416.22299999999996,415.878,419.108,416.04799999999994,420.77799999999996,417.93399999999997]);
ctx.recodingOrder('bezierCurveTo',[422.44199999999995,419.82,422.27,422.7,420.383,424.368]);
ctx.recodingOrder('bezierCurveTo',[416.08099999999996,428.175,412.52599999999995,432.911,409.327,437.464]);
ctx.recodingOrder('bezierCurveTo',[397.87,453.765,388.446,471.455,381.313,490.044]);
ctx.recodingOrder('bezierCurveTo',[380.616,491.856,378.887,492.969,377.055,492.969]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[398.963,504.404]);
ctx.recodingOrder('bezierCurveTo',[396.488,504.404,394.456,502.426,394.408,499.943]);
ctx.recodingOrder('bezierCurveTo',[394.327,496.20599999999996,396.904,493.948,398.445,492.599]);
ctx.recodingOrder('bezierCurveTo',[398.915,492.18899999999996,399.49899999999997,491.67699999999996,399.682,491.399]);
ctx.recodingOrder('bezierCurveTo',[400.023,490.883,399.844,489.146,399.71500000000003,487.879]);
ctx.recodingOrder('bezierCurveTo',[399.64500000000004,487.19,399.58000000000004,486.504,399.54200000000003,485.831]);
ctx.recodingOrder('bezierCurveTo',[399.19100000000003,479.435,401.80600000000004,473.03700000000003,406.53400000000005,468.71700000000004]);
ctx.recodingOrder('bezierCurveTo',[407.66900000000004,467.682,408.93300000000005,466.761,410.19800000000004,465.85]);
ctx.recodingOrder('bezierCurveTo',[412.1,464.483,413.74300000000005,463.302,414.473,461.87800000000004]);
ctx.recodingOrder('bezierCurveTo',[415.213,460.446,415.23,458.30300000000005,415.24600000000004,456.03600000000006]);
ctx.recodingOrder('bezierCurveTo',[415.25700000000006,455.05300000000005,415.26700000000005,454.07200000000006,415.32200000000006,453.1050000000001]);
ctx.recodingOrder('bezierCurveTo',[415.8190000000001,444.35300000000007,417.9270000000001,434.72100000000006,429.81000000000006,429.6170000000001]);
ctx.recodingOrder('bezierCurveTo',[432.13900000000007,428.6310000000001,434.80800000000005,429.6960000000001,435.7970000000001,432.0060000000001]);
ctx.recodingOrder('bezierCurveTo',[436.7920000000001,434.3190000000001,435.72100000000006,436.9990000000001,433.4080000000001,437.9930000000001]);
ctx.recodingOrder('bezierCurveTo',[427.2800000000001,440.6250000000001,424.9290000000001,444.7150000000001,424.42100000000005,453.62400000000014]);
ctx.recodingOrder('bezierCurveTo',[424.37800000000004,454.44300000000015,424.37300000000005,455.27500000000015,424.362,456.10700000000014]);
ctx.recodingOrder('bezierCurveTo',[424.341,459.19500000000016,424.314,462.69400000000013,422.579,466.06100000000015]);
ctx.recodingOrder('bezierCurveTo',[420.839,469.4250000000001,418.01800000000003,471.45700000000016,415.522,473.25100000000015]);
ctx.recodingOrder('bezierCurveTo',[414.544,473.95300000000015,413.561,474.6510000000001,412.685,475.45000000000016]);
ctx.recodingOrder('bezierCurveTo',[409.994,477.90900000000016,408.443,481.6940000000002,408.64300000000003,485.32800000000015]);
ctx.recodingOrder('bezierCurveTo',[408.67600000000004,485.86300000000017,408.72900000000004,486.4060000000001,408.78900000000004,486.9540000000001]);
ctx.recodingOrder('bezierCurveTo',[409.05400000000003,489.58800000000014,409.422,493.1930000000001,407.29200000000003,496.4190000000001]);
ctx.recodingOrder('bezierCurveTo',[406.43300000000005,497.7240000000001,405.336,498.6860000000001,404.45500000000004,499.4560000000001]);
ctx.recodingOrder('bezierCurveTo',[404.158,499.7180000000001,403.742,500.0830000000001,403.49800000000005,500.33400000000006]);
ctx.recodingOrder('bezierCurveTo',[403.25500000000005,502.58200000000005,401.38000000000005,504.35400000000004,399.06100000000004,504.4030000000001]);
ctx.recodingOrder('bezierCurveTo',[399.028,504.404,398.995,504.404,398.963,504.404]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[177.315,620.478]);
ctx.recodingOrder('bezierCurveTo',[172.419,620.478,168.35,619.1859999999999,165.156,616.611]);
ctx.recodingOrder('bezierCurveTo',[164.535,616.106,163.95600000000002,615.555,163.383,614.9979999999999]);
ctx.recodingOrder('bezierCurveTo',[162.78300000000002,614.42,162.216,613.871,161.751,613.598]);
ctx.recodingOrder('bezierCurveTo',[161.184,613.2629999999999,160.26500000000001,613.069,159.038,613.0279999999999]);
ctx.recodingOrder('bezierCurveTo',[155.298,612.877,151.543,614.0869999999999,147.517,615.3439999999999]);
ctx.recodingOrder('bezierCurveTo',[144.674,616.228,141.72899999999998,617.141,138.617,617.6679999999999]);
ctx.recodingOrder('bezierCurveTo',[132.565,618.6809999999999,126.03699999999999,617.3359999999999,121.61099999999999,614.1099999999999]);
ctx.recodingOrder('bezierCurveTo',[118.39599999999999,611.7649999999999,116.407,608.5729999999999,115.87199999999999,604.877]);
ctx.recodingOrder('bezierCurveTo',[115.50999999999999,602.386,117.23899999999999,600.073,119.72999999999999,599.7109999999999]);
ctx.recodingOrder('bezierCurveTo',[122.216,599.3379999999999,124.53399999999999,601.0779999999999,124.89599999999999,603.5689999999998]);
ctx.recodingOrder('bezierCurveTo',[125.07399999999998,604.8119999999999,125.75499999999998,605.8499999999998,126.97599999999998,606.7409999999999]);
ctx.recodingOrder('bezierCurveTo',[129.41299999999998,608.5109999999999,133.504,609.2779999999999,137.09699999999998,608.6779999999999]);
ctx.recodingOrder('bezierCurveTo',[139.60999999999999,608.2539999999999,142.13299999999998,607.4679999999998,144.808,606.6379999999999]);
ctx.recodingOrder('bezierCurveTo',[149.385,605.2139999999999,154.124,603.685,159.339,603.9169999999999]);
ctx.recodingOrder('bezierCurveTo',[162.144,604.011,164.446,604.6089999999999,166.375,605.7409999999999]);
ctx.recodingOrder('bezierCurveTo',[167.775,606.5669999999999,168.807,607.5679999999999,169.72,608.4459999999999]);
ctx.recodingOrder('bezierCurveTo',[170.09799999999998,608.8159999999999,170.477,609.189,170.887,609.521]);
ctx.recodingOrder('bezierCurveTo',[173.443,611.577,177.718,611.92,183.565,610.545]);
ctx.recodingOrder('bezierCurveTo',[184.662,610.286,185.764,609.997,186.87199999999999,609.707]);
ctx.recodingOrder('bezierCurveTo',[191.74599999999998,608.426,196.78799999999998,607.107,202.26799999999997,607.918]);
ctx.recodingOrder('bezierCurveTo',[203.75999999999996,608.142,205.21899999999997,608.529,206.67199999999997,608.923]);
ctx.recodingOrder('bezierCurveTo',[208.15799999999996,609.328,209.55699999999996,609.709,210.82299999999998,609.796]);
ctx.recodingOrder('bezierCurveTo',[213.277,609.9720000000001,215.97799999999998,608.9150000000001,217.68099999999998,607.029]);
ctx.recodingOrder('bezierCurveTo',[219.378,605.162,222.248,605.022,224.123,606.707]);
ctx.recodingOrder('bezierCurveTo',[225.987,608.396,226.13299999999998,611.279,224.447,613.146]);
ctx.recodingOrder('bezierCurveTo',[220.859,617.1129999999999,215.55700000000002,619.255,210.197,618.89]);
ctx.recodingOrder('bezierCurveTo',[208.036,618.742,206.041,618.198,204.28,617.72]);
ctx.recodingOrder('bezierCurveTo',[203.172,617.417,202.059,617.104,200.924,616.9340000000001]);
ctx.recodingOrder('bezierCurveTo',[197.298,616.4150000000001,193.364,617.4290000000001,189.187,618.5230000000001]);
ctx.recodingOrder('bezierCurveTo',[188.00400000000002,618.8340000000002,186.83100000000002,619.1420000000002,185.65300000000002,619.4170000000001]);
ctx.recodingOrder('bezierCurveTo',[182.654,620.124,179.871,620.478,177.315,620.478]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[275.278,618.881]);
ctx.recodingOrder('bezierCurveTo',[271.793,618.881,268.30100000000004,618.314,265.021,617.1899999999999]);
ctx.recodingOrder('bezierCurveTo',[263.75100000000003,616.7579999999999,262.50800000000004,616.2389999999999,261.26500000000004,615.718]);
ctx.recodingOrder('bezierCurveTo',[259.309,614.894,257.45500000000004,614.115,255.69900000000004,613.848]);
ctx.recodingOrder('bezierCurveTo',[253.68400000000005,613.562,250.65100000000004,614.7829999999999,250.24700000000004,615.6289999999999]);
ctx.recodingOrder('bezierCurveTo',[249.18800000000005,617.8609999999999,246.50200000000004,618.9579999999999,244.23800000000006,617.9469999999999]);
ctx.recodingOrder('bezierCurveTo',[241.97400000000005,616.9439999999998,240.88200000000006,614.4259999999999,241.82200000000006,612.1399999999999]);
ctx.recodingOrder('bezierCurveTo',[244.06500000000005,606.7259999999999,251.52200000000005,604.0089999999999,257.07200000000006,604.8339999999998]);
ctx.recodingOrder('bezierCurveTo',[259.94700000000006,605.2749999999999,262.52400000000006,606.3549999999998,264.80000000000007,607.3109999999998]);
ctx.recodingOrder('bezierCurveTo',[265.84900000000005,607.7519999999998,266.89700000000005,608.1969999999998,267.9720000000001,608.5649999999998]);
ctx.recodingOrder('bezierCurveTo',[272.1920000000001,610.0109999999999,276.8940000000001,610.1539999999999,281.2220000000001,608.9729999999998]);
ctx.recodingOrder('bezierCurveTo',[284.0050000000001,608.2079999999999,286.8370000000001,606.8949999999999,289.8410000000001,605.5039999999998]);
ctx.recodingOrder('bezierCurveTo',[296.41700000000014,602.4589999999998,303.8750000000001,599.0059999999997,311.8780000000001,601.5809999999998]);
ctx.recodingOrder('bezierCurveTo',[314.6710000000001,602.4799999999998,317.0710000000001,604.0239999999998,319.1840000000001,605.3879999999998]);
ctx.recodingOrder('bezierCurveTo',[321.56200000000007,606.9179999999998,323.61500000000007,608.2409999999998,325.6260000000001,608.3979999999998]);
ctx.recodingOrder('bezierCurveTo',[327.2900000000001,608.5029999999998,329.1280000000001,607.9029999999998,331.2840000000001,607.1879999999998]);
ctx.recodingOrder('bezierCurveTo',[332.5860000000001,606.7559999999997,333.8940000000001,606.3289999999997,335.2120000000001,606.0149999999998]);
ctx.recodingOrder('bezierCurveTo',[340.3780000000001,604.7879999999998,345.89600000000013,605.2849999999997,350.7590000000001,607.4009999999997]);
ctx.recodingOrder('bezierCurveTo',[353.0670000000001,608.4039999999998,354.12600000000015,611.0889999999997,353.12600000000015,613.3959999999997]);
ctx.recodingOrder('bezierCurveTo',[352.12100000000015,615.7119999999998,349.40800000000013,616.7569999999997,347.1270000000001,615.7599999999998]);
ctx.recodingOrder('bezierCurveTo',[344.0630000000001,614.4309999999998,340.57800000000015,614.1169999999997,337.3080000000001,614.8879999999998]);
ctx.recodingOrder('bezierCurveTo',[336.2490000000001,615.1389999999998,335.20600000000013,615.4899999999998,334.15800000000013,615.8389999999998]);
ctx.recodingOrder('bezierCurveTo',[331.45100000000014,616.7379999999998,328.3700000000001,617.7539999999998,324.91200000000015,617.4879999999998]);
ctx.recodingOrder('bezierCurveTo',[320.6100000000001,617.1499999999999,317.2280000000001,614.9729999999998,314.2450000000002,613.0519999999998]);
ctx.recodingOrder('bezierCurveTo',[312.44500000000016,611.8899999999998,310.73800000000017,610.7929999999998,309.0840000000002,610.2609999999997]);
ctx.recodingOrder('bezierCurveTo',[304.4850000000002,608.7749999999997,299.4710000000002,611.0959999999998,293.6720000000002,613.7789999999998]);
ctx.recodingOrder('bezierCurveTo',[290.4620000000002,615.2649999999998,287.1440000000002,616.8019999999998,283.6320000000002,617.7669999999998]);
ctx.recodingOrder('bezierCurveTo',[280.919,618.511,278.098,618.881,275.278,618.881]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[182.001,595.26]);
ctx.recodingOrder('bezierCurveTo',[177.921,595.26,173.852,594.614,169.848,592.807]);
ctx.recodingOrder('bezierCurveTo',[168.157,592.0450000000001,166.55700000000002,591.083,164.96800000000002,590.116]);
ctx.recodingOrder('bezierCurveTo',[163.21200000000002,589.0459999999999,161.55300000000003,588.038,159.90500000000003,587.487]);
ctx.recodingOrder('bezierCurveTo',[154.51700000000002,585.685,148.02200000000002,588.3249999999999,141.74200000000002,590.88]);
ctx.recodingOrder('lineTo',[140.39600000000002,591.426]);
ctx.recodingOrder('bezierCurveTo',[128.734,596.1220000000001,119.92600000000002,596.0790000000001,113.47300000000001,591.259]);
ctx.recodingOrder('lineTo',[118.93100000000001,583.953]);
ctx.recodingOrder('bezierCurveTo',[122.57300000000001,586.6709999999999,128.65300000000002,586.336,136.98000000000002,582.972]);
ctx.recodingOrder('lineTo',[138.30400000000003,582.434]);
ctx.recodingOrder('bezierCurveTo',[145.75000000000003,579.405,154.20200000000003,575.9649999999999,162.78900000000004,578.8399999999999]);
ctx.recodingOrder('bezierCurveTo',[165.41000000000005,579.713,167.59300000000005,581.0419999999999,169.70600000000005,582.3249999999999]);
ctx.recodingOrder('bezierCurveTo',[170.97600000000006,583.1009999999999,172.24600000000004,583.8839999999999,173.59700000000004,584.4949999999999]);
ctx.recodingOrder('bezierCurveTo',[180.00000000000003,587.3839999999999,187.60400000000004,585.8729999999999,195.65000000000003,584.2709999999998]);
ctx.recodingOrder('bezierCurveTo',[199.43300000000002,583.5169999999998,203.34500000000003,582.7359999999999,207.27400000000003,582.3959999999998]);
ctx.recodingOrder('bezierCurveTo',[214.75900000000004,581.7479999999998,222.42100000000002,582.7739999999999,229.46300000000002,585.3679999999998]);
ctx.recodingOrder('lineTo',[226.318,593.9219999999998]);
ctx.recodingOrder('bezierCurveTo',[220.52,591.7879999999998,214.20800000000003,590.9369999999998,208.06300000000002,591.4799999999998]);
ctx.recodingOrder('bezierCurveTo',[204.63700000000003,591.7769999999998,201.13500000000002,592.4749999999998,197.43400000000003,593.2119999999998]);
ctx.recodingOrder('bezierCurveTo',[192.349,594.226,187.166,595.26,182.001,595.26]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[277.58,594.141]);
ctx.recodingOrder('bezierCurveTo',[272.889,594.141,268.264,593.357,263.73499999999996,592.5899999999999]);
ctx.recodingOrder('bezierCurveTo',[257.14799999999997,591.4799999999999,250.92799999999997,590.4179999999999,245.20999999999995,591.9039999999999]);
ctx.recodingOrder('lineTo',[242.91899999999995,583.0789999999998]);
ctx.recodingOrder('bezierCurveTo',[250.50099999999995,581.1149999999998,258.00699999999995,582.3709999999999,265.25899999999996,583.6029999999998]);
ctx.recodingOrder('bezierCurveTo',[271.76599999999996,584.6999999999998,277.905,585.7429999999998,283.578,584.3509999999999]);
ctx.recodingOrder('bezierCurveTo',[286.323,583.6759999999999,289.13899999999995,582.4079999999999,292.116,581.0679999999999]);
ctx.recodingOrder('bezierCurveTo',[298.417,578.2309999999999,305.572,575.0159999999998,313.192,577.5629999999999]);
ctx.recodingOrder('bezierCurveTo',[315.29900000000004,578.2629999999999,317.12,579.3299999999999,318.725,580.2699999999999]);
ctx.recodingOrder('bezierCurveTo',[319.94100000000003,580.9809999999999,321.08700000000005,581.6529999999999,322.184,582.0719999999999]);
ctx.recodingOrder('bezierCurveTo',[326.107,583.5709999999999,330.949,582.5089999999999,336.07800000000003,581.3859999999999]);
ctx.recodingOrder('bezierCurveTo',[342.33000000000004,580.0129999999998,349.42600000000004,578.4549999999998,356.14300000000003,581.5989999999998]);
ctx.recodingOrder('lineTo',[352.274,589.8559999999998]);
ctx.recodingOrder('bezierCurveTo',[348.367,588.0239999999998,343.347,589.1209999999998,338.029,590.2909999999997]);
ctx.recodingOrder('bezierCurveTo',[332.10699999999997,591.5879999999997,325.384,593.0549999999997,318.932,590.5879999999997]);
ctx.recodingOrder('bezierCurveTo',[317.132,589.9019999999997,315.533,588.9639999999997,314.117,588.1339999999998]);
ctx.recodingOrder('bezierCurveTo',[312.783,587.3499999999998,311.517,586.6099999999998,310.31800000000004,586.2129999999997]);
ctx.recodingOrder('bezierCurveTo',[306.04900000000004,584.7919999999997,301.331,586.9179999999998,295.857,589.3799999999998]);
ctx.recodingOrder('bezierCurveTo',[292.636,590.8279999999997,289.30800000000005,592.3279999999997,285.76300000000003,593.2009999999998]);
ctx.recodingOrder('bezierCurveTo',[283.016,593.88,280.287,594.141,277.58,594.141]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[48.82,511.556]);
ctx.recodingOrder('bezierCurveTo',[48.555,511.556,48.291,511.553,48.026,511.55]);
ctx.recodingOrder('bezierCurveTo',[35.294000000000004,511.339,23.930000000000003,506.416,16.845000000000002,498.043]);
ctx.recodingOrder('bezierCurveTo',[7.642000000000003,487.17,7.767000000000003,471.01300000000003,9.636000000000003,458.96500000000003]);
ctx.recodingOrder('bezierCurveTo',[6.3770000000000024,453.18,6.156000000000002,446.17100000000005,9.144000000000002,440.802]);
ctx.recodingOrder('bezierCurveTo',[12.457000000000003,434.863,19.714000000000002,431.423,26.399,432.62]);
ctx.recodingOrder('bezierCurveTo',[26.961000000000002,432.72,27.523,432.85200000000003,28.085,432.988]);
ctx.recodingOrder('bezierCurveTo',[28.76,433.147,29.431,433.323,30.117,433.372]);
ctx.recodingOrder('bezierCurveTo',[31.808,433.49600000000004,34.31,432.648,35.84,431.386]);
ctx.recodingOrder('bezierCurveTo',[45.384,423.507,55.71000000000001,416.26000000000005,66.534,409.84900000000005]);
ctx.recodingOrder('bezierCurveTo',[85.96100000000001,398.34400000000005,106.879,389.51400000000007,128.722,383.60200000000003]);
ctx.recodingOrder('bezierCurveTo',[130.359,383.17,132.013,384.129,132.45100000000002,385.742]);
ctx.recodingOrder('bezierCurveTo',[132.88800000000003,387.363,131.93200000000002,389.03000000000003,130.31100000000004,389.471]);
ctx.recodingOrder('bezierCurveTo',[108.99800000000003,395.237,88.58700000000005,403.854,69.63600000000004,415.08]);
ctx.recodingOrder('bezierCurveTo',[59.076000000000036,421.33,49.00900000000004,428.393,39.70900000000004,436.07099999999997]);
ctx.recodingOrder('bezierCurveTo',[36.97500000000004,438.32699999999994,32.90000000000004,439.705,29.66900000000004,439.43499999999995]);
ctx.recodingOrder('bezierCurveTo',[28.659000000000038,439.3589999999999,27.66400000000004,439.13499999999993,26.67000000000004,438.89699999999993]);
ctx.recodingOrder('bezierCurveTo',[26.22700000000004,438.7919999999999,25.78400000000004,438.6839999999999,25.33000000000004,438.6019999999999]);
ctx.recodingOrder('bezierCurveTo',[21.21200000000004,437.87299999999993,16.51100000000004,440.07699999999994,14.45200000000004,443.75999999999993]);
ctx.recodingOrder('bezierCurveTo',[12.39900000000004,447.45599999999996,12.76600000000004,452.6599999999999,15.37000000000004,456.7049999999999]);
ctx.recodingOrder('bezierCurveTo',[15.78100000000004,457.3399999999999,15.93700000000004,458.1069999999999,15.81300000000004,458.85299999999995]);
ctx.recodingOrder('bezierCurveTo',[13.99200000000004,469.73099999999994,13.500000000000039,484.6809999999999,21.48200000000004,494.114]);
ctx.recodingOrder('bezierCurveTo',[27.351000000000038,501.04699999999997,37.31000000000004,505.292,48.12300000000003,505.46999999999997]);
ctx.recodingOrder('bezierCurveTo',[48.35500000000003,505.47599999999994,48.58800000000004,505.47799999999995,48.81500000000003,505.47799999999995]);
ctx.recodingOrder('bezierCurveTo',[64.28100000000003,505.47799999999995,80.54100000000003,496.996,94.91000000000003,489.50399999999996]);
ctx.recodingOrder('bezierCurveTo',[98.17400000000002,487.799,101.36700000000002,486.13499999999993,104.47500000000002,484.59999999999997]);
ctx.recodingOrder('bezierCurveTo',[105.97700000000002,483.86799999999994,107.80400000000002,484.47299999999996,108.54400000000003,485.98099999999994]);
ctx.recodingOrder('bezierCurveTo',[109.29000000000002,487.48599999999993,108.66800000000002,489.30999999999995,107.16600000000003,490.05299999999994]);
ctx.recodingOrder('bezierCurveTo',[104.09700000000002,491.5659999999999,100.94100000000003,493.21199999999993,97.72000000000003,494.89199999999994]);
ctx.recodingOrder('bezierCurveTo',[82.73,502.713,65.773,511.556,48.82,511.556]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[422.853,510.521]);
ctx.recodingOrder('bezierCurveTo',[404.047,510.521,381.81,499.305,363.891,490.272]);
ctx.recodingOrder('bezierCurveTo',[361.519,489.075,359.238,487.924,357.077,486.859]);
ctx.recodingOrder('bezierCurveTo',[355.574,486.116,354.953,484.292,355.699,482.787]);
ctx.recodingOrder('bezierCurveTo',[356.445,481.279,358.272,480.671,359.76800000000003,481.407]);
ctx.recodingOrder('bezierCurveTo',[361.946,482.48199999999997,364.237,483.639,366.63100000000003,484.844]);
ctx.recodingOrder('bezierCurveTo',[383.96700000000004,493.58799999999997,405.49,504.441,422.848,504.441]);
ctx.recodingOrder('bezierCurveTo',[423.075,504.441,423.297,504.441,423.523,504.435]);
ctx.recodingOrder('bezierCurveTo',[434.75800000000004,504.251,445.112,499.839,451.20700000000005,492.633]);
ctx.recodingOrder('bezierCurveTo',[459.50700000000006,482.825,459.00000000000006,467.299,457.10800000000006,456.005]);
ctx.recodingOrder('bezierCurveTo',[456.98300000000006,455.259,457.1410000000001,454.49399999999997,457.55100000000004,453.85699999999997]);
ctx.recodingOrder('bezierCurveTo',[460.26900000000006,449.631,460.653,444.195,458.50200000000007,440.328]);
ctx.recodingOrder('bezierCurveTo',[456.35100000000006,436.472,451.42800000000005,434.162,447.11600000000004,434.929]);
ctx.recodingOrder('bezierCurveTo',[446.65700000000004,435.013,446.19800000000004,435.12399999999997,445.73800000000006,435.234]);
ctx.recodingOrder('bezierCurveTo',[444.71100000000007,435.47999999999996,443.67900000000003,435.712,442.63000000000005,435.78999999999996]);
ctx.recodingOrder('bezierCurveTo',[439.2420000000001,436.05999999999995,435.119,434.65,432.30300000000005,432.32899999999995]);
ctx.recodingOrder('bezierCurveTo',[405.31100000000004,410.04599999999994,372.8330000000001,393.34299999999996,338.38200000000006,384.02299999999997]);
ctx.recodingOrder('bezierCurveTo',[336.7610000000001,383.582,335.8040000000001,381.91599999999994,336.2420000000001,380.294]);
ctx.recodingOrder('bezierCurveTo',[336.68500000000006,378.681,338.33900000000006,377.721,339.97100000000006,378.154]);
ctx.recodingOrder('bezierCurveTo',[375.24800000000005,387.7,408.51400000000007,404.812,436.172,427.643]);
ctx.recodingOrder('bezierCurveTo',[437.771,428.964,440.34900000000005,429.88,442.17600000000004,429.726]);
ctx.recodingOrder('bezierCurveTo',[442.90600000000006,429.672,443.61400000000003,429.491,444.32700000000006,429.321]);
ctx.recodingOrder('bezierCurveTo',[444.89400000000006,429.18300000000005,445.46700000000004,429.048,446.0400000000001,428.94500000000005]);
ctx.recodingOrder('bezierCurveTo',[452.92500000000007,427.73500000000007,460.40400000000005,431.25500000000005,463.8080000000001,437.3670000000001]);
ctx.recodingOrder('bezierCurveTo',[466.8940000000001,442.90600000000006,466.6610000000001,450.14200000000005,463.2840000000001,456.11300000000006]);
ctx.recodingOrder('bezierCurveTo',[465.2240000000001,468.57700000000006,465.3640000000001,485.31000000000006,455.84300000000013,496.55600000000004]);
ctx.recodingOrder('bezierCurveTo',[448.5260000000001,505.208,436.77800000000013,510.295,423.61900000000014,510.511]);
ctx.recodingOrder('bezierCurveTo',[423.367,510.519,423.113,510.521,422.853,510.521]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[190.749,656.824]);
ctx.recodingOrder('bezierCurveTo',[189.058,656.824,187.361,656.805,185.664,656.757]);
ctx.recodingOrder('bezierCurveTo',[170.7,656.3409999999999,155.65099999999998,654.798,141.10299999999998,653.31]);
ctx.recodingOrder('bezierCurveTo',[136.60699999999997,652.8499999999999,131.009,652.2779999999999,126.33899999999998,649.4219999999999]);
ctx.recodingOrder('bezierCurveTo',[121.46999999999998,646.4449999999999,117.61199999999998,640.2029999999999,119.65399999999998,634.0369999999999]);
ctx.recodingOrder('bezierCurveTo',[120.03799999999998,632.891,120.63199999999998,631.7589999999999,121.23799999999999,630.646]);
ctx.recodingOrder('bezierCurveTo',[121.98899999999999,629.2629999999999,122.70299999999999,627.958,122.45399999999998,627.212]);
ctx.recodingOrder('bezierCurveTo',[122.24299999999998,626.583,121.22199999999998,625.937,120.14599999999999,625.251]);
ctx.recodingOrder('bezierCurveTo',[119.03299999999999,624.549,117.77899999999998,623.752,116.73599999999999,622.582]);
ctx.recodingOrder('bezierCurveTo',[113.42899999999999,618.867,114.255,614.298,114.99099999999999,610.266]);
ctx.recodingOrder('bezierCurveTo',[115.41799999999999,607.891,115.82899999999998,605.646,115.39599999999999,603.841]);
ctx.recodingOrder('bezierCurveTo',[104.21499999999999,557.035,102.38399999999999,510.453,109.95399999999998,465.39]);
ctx.recodingOrder('bezierCurveTo',[110.23999999999998,463.734,111.83499999999998,462.62,113.45599999999997,462.89599999999996]);
ctx.recodingOrder('bezierCurveTo',[115.10999999999997,463.174,116.22799999999998,464.74199999999996,115.95199999999997,466.395]);
ctx.recodingOrder('bezierCurveTo',[108.51599999999996,510.65099999999995,110.31599999999997,556.419,121.30699999999997,602.431]);
ctx.recodingOrder('bezierCurveTo',[122.03699999999998,605.4730000000001,121.46899999999998,608.5970000000001,120.96599999999998,611.35]);
ctx.recodingOrder('bezierCurveTo',[120.32799999999997,614.879,119.99899999999998,617.113,121.26899999999998,618.5400000000001]);
ctx.recodingOrder('bezierCurveTo',[121.74399999999997,619.0720000000001,122.54999999999998,619.58,123.39799999999998,620.1210000000001]);
ctx.recodingOrder('bezierCurveTo',[125.14899999999999,621.2310000000001,127.32599999999998,622.6120000000001,128.218,625.2950000000001]);
ctx.recodingOrder('bezierCurveTo',[129.29899999999998,628.5400000000001,127.79099999999998,631.3180000000001,126.57499999999999,633.5500000000001]);
ctx.recodingOrder('bezierCurveTo',[126.14299999999999,634.344,125.69399999999999,635.1360000000001,125.42399999999999,635.9540000000001]);
ctx.recodingOrder('bezierCurveTo',[124.42399999999999,638.964,126.716,642.5300000000001,129.509,644.2410000000001]);
ctx.recodingOrder('bezierCurveTo',[133,646.3750000000001,137.63099999999997,646.8480000000001,141.71599999999998,647.2640000000001]);
ctx.recodingOrder('bezierCurveTo',[156.15999999999997,648.7440000000001,171.09099999999998,650.2740000000001,185.83399999999997,650.6840000000001]);
ctx.recodingOrder('bezierCurveTo',[192.45999999999998,650.8600000000001,199.21999999999997,650.6220000000001,205.748,650.3890000000001]);
ctx.recodingOrder('lineTo',[209.034,650.2720000000002]);
ctx.recodingOrder('bezierCurveTo',[210.012,650.2370000000002,211.022,650.2290000000002,212.04399999999998,650.2180000000002]);
ctx.recodingOrder('bezierCurveTo',[216.713,650.1690000000002,221.54399999999998,650.1200000000002,224.932,647.6220000000002]);
ctx.recodingOrder('bezierCurveTo',[226.899,646.1690000000002,228.218,643.7470000000002,228.369,641.3020000000001]);
ctx.recodingOrder('bezierCurveTo',[228.515,638.8650000000001,227.499,636.3040000000001,225.716,634.6230000000002]);
ctx.recodingOrder('bezierCurveTo',[224.949,633.8960000000002,224.608,632.8210000000001,224.83,631.7840000000001]);
ctx.recodingOrder('bezierCurveTo',[225.04600000000002,630.7490000000001,225.792,629.9010000000001,226.786,629.5490000000001]);
ctx.recodingOrder('bezierCurveTo',[226.775,629.4730000000001,226.997,628.6500000000001,226.775,627.3360000000001]);
ctx.recodingOrder('bezierCurveTo',[226.483,625.5990000000002,225.673,624.3780000000002,225.191,624.0640000000001]);
ctx.recodingOrder('bezierCurveTo',[224.208,623.426,223.678,622.2830000000001,223.83,621.124]);
ctx.recodingOrder('bezierCurveTo',[225.387,609.1460000000001,225.937,596.941,225.45600000000002,584.85]);
ctx.recodingOrder('bezierCurveTo',[225.33200000000002,581.686,225.54200000000003,576.571,225.74200000000002,571.621]);
ctx.recodingOrder('bezierCurveTo',[225.877,568.235,226.01200000000003,565.023,226.01200000000003,562.861]);
ctx.recodingOrder('bezierCurveTo',[226.01200000000003,561.183,227.36800000000002,559.821,229.04900000000004,559.821]);
ctx.recodingOrder('bezierCurveTo',[230.73000000000005,559.821,232.08600000000004,561.183,232.08600000000004,562.861]);
ctx.recodingOrder('bezierCurveTo',[232.08600000000004,565.082,231.95600000000005,568.386,231.81600000000003,571.87]);
ctx.recodingOrder('bezierCurveTo',[231.62700000000004,576.471,231.41600000000003,581.689,231.53000000000003,584.612]);
ctx.recodingOrder('bezierCurveTo',[232.00000000000003,596.512,231.50300000000004,608.516,230.06000000000003,620.324]);
ctx.recodingOrder('bezierCurveTo',[232.25400000000002,622.793,233.22700000000003,626.693,232.87500000000003,629.64]);
ctx.recodingOrder('bezierCurveTo',[232.74000000000004,630.7669999999999,232.42100000000002,631.7719999999999,231.93500000000003,632.6229999999999]);
ctx.recodingOrder('bezierCurveTo',[233.71300000000002,635.265,234.62600000000003,638.4759999999999,234.43100000000004,641.669]);
ctx.recodingOrder('bezierCurveTo',[234.17200000000005,645.93,231.96700000000004,649.98,228.54100000000005,652.512]);
ctx.recodingOrder('bezierCurveTo',[223.57000000000005,656.179,217.47900000000004,656.241,212.10200000000006,656.295]);
ctx.recodingOrder('bezierCurveTo',[211.12900000000005,656.3059999999999,210.17300000000006,656.314,209.23800000000006,656.347]);
ctx.recodingOrder('lineTo',[205.96300000000005,656.463]);
ctx.recodingOrder('bezierCurveTo',[200.99,656.641,195.878,656.824,190.749,656.824]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[285.091,657.273]);
ctx.recodingOrder('bezierCurveTo',[274.17,657.273,262.821,656.522,252.079,654.49]);
ctx.recodingOrder('bezierCurveTo',[249.598,654.022,246.756,653.38,244.335,651.631]);
ctx.recodingOrder('bezierCurveTo',[241.293,649.4399999999999,239.644,645.943,239.80100000000002,642.034]);
ctx.recodingOrder('bezierCurveTo',[239.936,638.74,241.32500000000002,635.625,243.55700000000002,633.396]);
ctx.recodingOrder('bezierCurveTo',[241.43900000000002,629.116,238.764,623.448,240.59,619.0939999999999]);
ctx.recodingOrder('bezierCurveTo',[240.871,618.438,241.211,617.8269999999999,241.55700000000002,617.2209999999999]);
ctx.recodingOrder('bezierCurveTo',[241.757,616.8719999999998,241.95700000000002,616.5269999999999,242.13000000000002,616.1669999999999]);
ctx.recodingOrder('bezierCurveTo',[244.34600000000003,611.4359999999999,243.54100000000003,603.7489999999999,242.83200000000002,596.9669999999999]);
ctx.recodingOrder('bezierCurveTo',[242.54000000000002,594.2219999999999,242.276,591.6279999999998,242.211,589.3879999999999]);
ctx.recodingOrder('bezierCurveTo',[242.113,586.06,241.768,582.6009999999999,241.42200000000003,579.1179999999999]);
ctx.recodingOrder('bezierCurveTo',[240.806,572.885,240.16300000000004,566.438,240.84900000000002,560.3389999999999]);
ctx.recodingOrder('bezierCurveTo',[241.03300000000002,558.6719999999999,242.54600000000002,557.496,244.21,557.659]);
ctx.recodingOrder('bezierCurveTo',[245.874,557.848,247.08,559.35,246.89000000000001,561.02]);
ctx.recodingOrder('bezierCurveTo',[246.274,566.478,246.88400000000001,572.598,247.46800000000002,578.515]);
ctx.recodingOrder('bezierCurveTo',[247.81900000000002,582.052,248.181,585.705,248.28400000000002,589.209]);
ctx.recodingOrder('bezierCurveTo',[248.34300000000002,591.3159999999999,248.603,593.7539999999999,248.87300000000002,596.334]);
ctx.recodingOrder('bezierCurveTo',[249.66700000000003,603.9019999999999,250.56400000000002,612.4839999999999,247.63000000000002,618.742]);
ctx.recodingOrder('bezierCurveTo',[247.39200000000002,619.252,247.116,619.745,246.836,620.2389999999999]);
ctx.recodingOrder('bezierCurveTo',[246.604,620.6389999999999,246.371,621.0329999999999,246.18800000000002,621.458]);
ctx.recodingOrder('bezierCurveTo',[245.377,623.395,247.98200000000003,628.6419999999999,249.23600000000002,631.163]);
ctx.recodingOrder('lineTo',[250.11200000000002,632.96]);
ctx.recodingOrder('bezierCurveTo',[250.77100000000002,634.371,250.26300000000003,636.048,248.92900000000003,636.851]);
ctx.recodingOrder('bezierCurveTo',[247.16700000000003,637.915,245.96700000000004,640.047,245.87600000000003,642.284]);
ctx.recodingOrder('bezierCurveTo',[245.83300000000003,643.359,246.03800000000004,645.365,247.89100000000002,646.701]);
ctx.recodingOrder('bezierCurveTo',[249.30200000000002,647.717,251.29000000000002,648.154,253.20300000000003,648.517]);
ctx.recodingOrder('bezierCurveTo',[281.384,653.8370000000001,314.08900000000006,650.0490000000001,331.09000000000003,647.32]);
ctx.recodingOrder('bezierCurveTo',[336.456,646.455,343.02200000000005,643.653,343.843,638.59]);
ctx.recodingOrder('bezierCurveTo',[344.03200000000004,637.4340000000001,343.946,636.075,343.85400000000004,634.6370000000001]);
ctx.recodingOrder('bezierCurveTo',[343.67,631.706,343.45900000000006,628.379,345.535,625.4290000000001]);
ctx.recodingOrder('bezierCurveTo',[345.903,624.9050000000001,346.346,624.4190000000001,346.78900000000004,623.9370000000001]);
ctx.recodingOrder('bezierCurveTo',[347.13500000000005,623.5640000000001,347.46400000000006,623.2130000000001,347.61000000000007,622.9420000000001]);
ctx.recodingOrder('bezierCurveTo',[347.91300000000007,622.3990000000001,347.9340000000001,621.3610000000001,347.96100000000007,620.3560000000001]);
ctx.recodingOrder('bezierCurveTo',[348.29600000000005,606.8060000000002,349.9870000000001,593.2640000000001,351.62500000000006,580.1700000000001]);
ctx.recodingOrder('bezierCurveTo',[353.28900000000004,566.893,355.00800000000004,553.1610000000001,355.2830000000001,539.527]);
ctx.recodingOrder('bezierCurveTo',[355.86100000000005,511.19100000000003,353.93700000000007,482.66400000000004,349.55500000000006,454.737]);
ctx.recodingOrder('bezierCurveTo',[349.29600000000005,453.081,350.43100000000004,451.524,352.08900000000006,451.26500000000004]);
ctx.recodingOrder('bezierCurveTo',[353.72600000000006,451.01900000000006,355.30400000000003,452.13800000000003,355.5640000000001,453.797]);
ctx.recodingOrder('bezierCurveTo',[359.99500000000006,482.076,361.9460000000001,510.96200000000005,361.3570000000001,539.652]);
ctx.recodingOrder('bezierCurveTo',[361.0760000000001,553.6020000000001,359.33600000000007,567.493,357.6550000000001,580.9250000000001]);
ctx.recodingOrder('bezierCurveTo',[356.0390000000001,593.873,354.3640000000001,607.2610000000001,354.0340000000001,620.5060000000001]);
ctx.recodingOrder('bezierCurveTo',[353.9960000000001,622.0760000000001,353.9530000000001,624.032,352.9260000000001,625.888]);
ctx.recodingOrder('bezierCurveTo',[352.4180000000001,626.8100000000001,351.7640000000001,627.509,351.2400000000001,628.0740000000001]);
ctx.recodingOrder('bezierCurveTo',[350.9860000000001,628.35,350.7210000000001,628.6170000000001,350.5100000000001,628.9230000000001]);
ctx.recodingOrder('bezierCurveTo',[349.6560000000001,630.1310000000001,349.7800000000001,632.0410000000002,349.9210000000001,634.2540000000001]);
ctx.recodingOrder('bezierCurveTo',[350.0290000000001,635.9640000000002,350.1430000000001,637.7370000000001,349.8400000000001,639.5690000000002]);
ctx.recodingOrder('bezierCurveTo',[348.5000000000001,647.8180000000002,339.7730000000001,652.0820000000002,332.05000000000007,653.3190000000002]);
ctx.recodingOrder('bezierCurveTo',[321.092,655.085,303.719,657.273,285.091,657.273]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[218.066,562.315]);
ctx.recodingOrder('bezierCurveTo',[217.418,562.315,216.769,562.312,216.12,562.307]);
ctx.recodingOrder('bezierCurveTo',[214.439,562.294,213.089,560.921,213.104,559.243]);
ctx.recodingOrder('bezierCurveTo',[213.115,557.5730000000001,214.471,556.2270000000001,216.14100000000002,556.2270000000001]);
ctx.recodingOrder('bezierCurveTo',[216.14700000000002,556.2270000000001,216.157,556.2270000000001,216.162,556.2270000000001]);
ctx.recodingOrder('bezierCurveTo',[229.62800000000001,556.335,243.338,555.3000000000001,256.702,553.1580000000001]);
ctx.recodingOrder('bezierCurveTo',[258.339,552.8900000000001,259.917,554.0170000000002,260.182,555.6760000000002]);
ctx.recodingOrder('bezierCurveTo',[260.447,557.3320000000001,259.32300000000004,558.8910000000002,257.66400000000004,559.1590000000001]);
ctx.recodingOrder('bezierCurveTo',[244.616,561.254,231.3,562.315,218.066,562.315]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[231.059,481.931]);
ctx.recodingOrder('bezierCurveTo',[242.676,484.44399999999996,257.05899999999997,477.037,250.171,460.356]);
ctx.recodingOrder('bezierCurveTo',[244.93099999999998,447.668,225.98399999999998,448.575,220.041,460.912]);
ctx.recodingOrder('bezierCurveTo',[214.88,471.627,222.157,480.006,231.059,481.931]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#FFFFFF";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[231.059,532.947]);
ctx.recodingOrder('bezierCurveTo',[242.676,535.46,257.05899999999997,528.053,250.171,511.372]);
ctx.recodingOrder('bezierCurveTo',[244.93099999999998,498.684,225.98399999999998,499.591,220.041,511.928]);
ctx.recodingOrder('bezierCurveTo',[214.88,522.643,222.157,531.021,231.059,532.947]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[246.037,641.469]);
ctx.recodingOrder('bezierCurveTo',[245.092,641.469,244.162,641.028,243.568,640.1990000000001]);
ctx.recodingOrder('bezierCurveTo',[242.59,638.8340000000001,242.90300000000002,636.9350000000001,244.27,635.96]);
ctx.recodingOrder('bezierCurveTo',[250.29600000000002,631.642,257.656,631.062,265.297,630.813]);
ctx.recodingOrder('bezierCurveTo',[279.012,630.367,292.89500000000004,630.275,306.605,630.529]);
ctx.recodingOrder('bezierCurveTo',[308.28000000000003,630.562,309.615,631.948,309.582,633.625]);
ctx.recodingOrder('bezierCurveTo',[309.555,635.284,308.198,636.608,306.545,636.608]);
ctx.recodingOrder('bezierCurveTo',[306.529,636.608,306.507,636.608,306.486,636.608]);
ctx.recodingOrder('bezierCurveTo',[292.895,636.343,279.099,636.449,265.49199999999996,636.886]);
ctx.recodingOrder('bezierCurveTo',[258.82399999999996,637.102,252.45199999999997,637.572,247.80499999999995,640.899]);
ctx.recodingOrder('bezierCurveTo',[247.269,641.283,246.653,641.469,246.037,641.469]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[229.825,639.548]);
ctx.recodingOrder('bezierCurveTo',[229.66299999999998,639.548,229.50099999999998,639.535,229.338,639.51]);
ctx.recodingOrder('bezierCurveTo',[212.786,636.8679999999999,195.93699999999998,636.387,179.22199999999998,638.091]);
ctx.recodingOrder('bezierCurveTo',[177.60599999999997,638.277,176.06099999999998,637.042,175.89299999999997,635.376]);
ctx.recodingOrder('bezierCurveTo',[175.71999999999997,633.706,176.93599999999998,632.215,178.60599999999997,632.044]);
ctx.recodingOrder('bezierCurveTo',[195.82799999999997,630.29,213.22399999999996,630.779,230.29999999999995,633.506]);
ctx.recodingOrder('bezierCurveTo',[231.95399999999995,633.771,233.08299999999994,635.3299999999999,232.81799999999996,636.986]);
ctx.recodingOrder('bezierCurveTo',[232.581,638.484,231.29,639.548,229.825,639.548]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[141.687,635.022]);
ctx.recodingOrder('bezierCurveTo',[141.61100000000002,635.022,141.54100000000003,635.019,141.471,635.014]);
ctx.recodingOrder('lineTo',[128.566,634.106]);
ctx.recodingOrder('bezierCurveTo',[126.891,633.987,125.62700000000001,632.536,125.745,630.861]);
ctx.recodingOrder('bezierCurveTo',[125.864,629.183,127.415,627.891,128.987,628.043]);
ctx.recodingOrder('lineTo',[141.892,628.951]);
ctx.recodingOrder('bezierCurveTo',[143.567,629.07,144.831,630.5210000000001,144.713,632.196]);
ctx.recodingOrder('bezierCurveTo',[144.6,633.798,143.265,635.022,141.687,635.022]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[345.323,637.214]);
ctx.recodingOrder('bezierCurveTo',[345.015,637.214,344.707,637.168,344.399,637.0680000000001]);
ctx.recodingOrder('bezierCurveTo',[342.389,636.4280000000001,340.233,636.2550000000001,338.157,636.5680000000001]);
ctx.recodingOrder('bezierCurveTo',[336.514,636.8380000000001,334.947,635.676,334.698,634.017]);
ctx.recodingOrder('bezierCurveTo',[334.44899999999996,632.3580000000001,335.59,630.8100000000001,337.24899999999997,630.5580000000001]);
ctx.recodingOrder('bezierCurveTo',[340.23799999999994,630.1070000000001,343.35499999999996,630.3580000000001,346.246,631.2790000000001]);
ctx.recodingOrder('bezierCurveTo',[347.84499999999997,631.7890000000001,348.727,633.5000000000001,348.219,635.1000000000001]);
ctx.recodingOrder('bezierCurveTo',[347.803,636.39,346.609,637.214,345.323,637.214]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E74341";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[226.599,409.606]);
ctx.recodingOrder('bezierCurveTo',[183.14,409.606,142.249,402.03,108.237,387.374]);
ctx.recodingOrder('bezierCurveTo',[69.91799999999999,370.865,41.914,342.70000000000005,31.403999999999996,310.098]);
ctx.recodingOrder('bezierCurveTo',[30.630999999999997,307.701,31.949999999999996,305.132,34.342999999999996,304.35900000000004]);
ctx.recodingOrder('bezierCurveTo',[36.747,303.60200000000003,39.309,304.90700000000004,40.081999999999994,307.29900000000004]);
ctx.recodingOrder('bezierCurveTo',[49.782,337.39900000000006,75.94299999999998,363.53200000000004,111.84599999999999,379.004]);
ctx.recodingOrder('bezierCurveTo',[156.607,398.288,213.878,404.89700000000005,273.11,397.60200000000003]);
ctx.recodingOrder('bezierCurveTo',[325.56600000000003,391.139,367.382,375.365,397.406,350.71700000000004]);
ctx.recodingOrder('bezierCurveTo',[413.369,337.60400000000004,424.86400000000003,321.93000000000006,430.64,305.39500000000004]);
ctx.recodingOrder('bezierCurveTo',[431.466,303.02000000000004,434.066,301.766,436.44399999999996,302.593]);
ctx.recodingOrder('bezierCurveTo',[438.82099999999997,303.425,440.07499999999993,306.02500000000003,439.24299999999994,308.40000000000003]);
ctx.recodingOrder('bezierCurveTo',[432.91499999999996,326.519,420.4479999999999,343.588,403.18799999999993,357.76500000000004]);
ctx.recodingOrder('bezierCurveTo',[371.81299999999993,383.52600000000007,328.4189999999999,399.97200000000004,274.22299999999996,406.64900000000006]);
ctx.recodingOrder('bezierCurveTo',[258.152,408.627,242.211,409.606,226.599,409.606]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[226.593,412.645]);
ctx.recodingOrder('bezierCurveTo',[182.50199999999998,412.645,141.15699999999998,404.871,107.03099999999999,390.164]);
ctx.recodingOrder('bezierCurveTo',[67.91199999999999,373.30899999999997,39.29299999999999,344.466,28.511999999999986,311.029]);
ctx.recodingOrder('bezierCurveTo',[27.230999999999987,307.038,29.430999999999987,302.75,33.40799999999999,301.467]);
ctx.recodingOrder('bezierCurveTo',[37.39599999999999,300.18399999999997,41.68699999999998,302.378,42.972999999999985,306.365]);
ctx.recodingOrder('bezierCurveTo',[52.40799999999999,335.63,77.95199999999998,361.088,113.05099999999999,376.208]);
ctx.recodingOrder('bezierCurveTo',[157.32,395.286,214.04999999999998,401.812,272.73699999999997,394.581]);
ctx.recodingOrder('bezierCurveTo',[324.609,388.19100000000003,365.90599999999995,372.644,395.477,348.367]);
ctx.recodingOrder('bezierCurveTo',[411.01399999999995,335.608,422.178,320.401,427.77099999999996,304.39000000000004]);
ctx.recodingOrder('bezierCurveTo',[428.436,302.47700000000003,429.81399999999996,300.934,431.64599999999996,300.05300000000005]);
ctx.recodingOrder('bezierCurveTo',[433.47799999999995,299.16900000000004,435.54799999999994,299.05800000000005,437.44399999999996,299.72100000000006]);
ctx.recodingOrder('bezierCurveTo',[439.36299999999994,300.3910000000001,440.90299999999996,301.76700000000005,441.78299999999996,303.59600000000006]);
ctx.recodingOrder('bezierCurveTo',[442.669,305.42500000000007,442.78299999999996,307.4870000000001,442.11299999999994,309.4030000000001]);
ctx.recodingOrder('bezierCurveTo',[435.60099999999994,328.0520000000001,422.80499999999995,345.5880000000001,405.11699999999996,360.1110000000001]);
ctx.recodingOrder('bezierCurveTo',[373.28799999999995,386.2420000000001,329.37499999999994,402.9160000000001,274.596,409.6620000000001]);
ctx.recodingOrder('bezierCurveTo',[258.52,411.64,242.367,412.645,226.593,412.645]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[35.743,307.177]);
ctx.recodingOrder('bezierCurveTo',[35.586000000000006,307.177,35.43,307.202,35.273,307.25300000000004]);
ctx.recodingOrder('bezierCurveTo',[34.479000000000006,307.50700000000006,34.041000000000004,308.369,34.301,309.172]);
ctx.recodingOrder('bezierCurveTo',[44.541000000000004,340.934,71.928,368.423,109.443,384.58400000000006]);
ctx.recodingOrder('bezierCurveTo',[142.812,398.96700000000004,183.325,406.56700000000006,226.595,406.56700000000006]);
ctx.recodingOrder('bezierCurveTo',[242.126,406.56700000000006,258.024,405.5810000000001,273.852,403.63300000000004]);
ctx.recodingOrder('bezierCurveTo',[327.47499999999997,397.02700000000004,370.33899999999994,380.80400000000003,401.26,355.41600000000005]);
ctx.recodingOrder('bezierCurveTo',[418.08799999999997,341.59800000000007,430.231,324.994,436.375,307.3960000000001]);
ctx.recodingOrder('bezierCurveTo',[436.559,306.87700000000007,436.413,306.44700000000006,436.31,306.2340000000001]);
ctx.recodingOrder('bezierCurveTo',[436.207,306.0230000000001,435.959,305.6420000000001,435.445,305.46100000000007]);
ctx.recodingOrder('bezierCurveTo',[434.921,305.2750000000001,434.49399999999997,305.42600000000004,434.283,305.5280000000001]);
ctx.recodingOrder('bezierCurveTo',[434.072,305.6310000000001,433.689,305.87700000000007,433.51,306.3900000000001]);
ctx.recodingOrder('bezierCurveTo',[427.55,323.4590000000001,415.731,339.5970000000001,399.336,353.0640000000001]);
ctx.recodingOrder('bezierCurveTo',[368.858,378.08400000000006,326.51300000000003,394.0820000000001,273.48400000000004,400.61300000000006]);
ctx.recodingOrder('bezierCurveTo',[213.72200000000004,407.97100000000006,155.90000000000003,401.29100000000005,110.64200000000002,381.79100000000005]);
ctx.recodingOrder('bezierCurveTo',[73.93900000000002,365.97600000000006,47.16800000000003,339.1650000000001,37.19200000000002,308.23]);
ctx.recodingOrder('bezierCurveTo',[36.981,307.587,36.386,307.177,35.743,307.177]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();




ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E74341";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[228.067,454.31]);
ctx.recodingOrder('bezierCurveTo',[227.881,454.31,227.69400000000002,454.3,227.505,454.276]);
ctx.recodingOrder('bezierCurveTo',[225.007,453.969,223.23,451.694,223.537,449.195]);
ctx.recodingOrder('bezierCurveTo',[223.917,446.099,224.586,441.673,225.235,437.394]);
ctx.recodingOrder('bezierCurveTo',[225.87300000000002,433.174,226.532,428.812,226.89700000000002,425.842]);
ctx.recodingOrder('bezierCurveTo',[227.204,423.344,229.461,421.55199999999996,231.978,421.87399999999997]);
ctx.recodingOrder('bezierCurveTo',[234.476,422.181,236.25300000000001,424.45599999999996,235.946,426.955]);
ctx.recodingOrder('bezierCurveTo',[235.566,430.051,234.897,434.477,234.248,438.756]);
ctx.recodingOrder('bezierCurveTo',[233.60999999999999,442.976,232.951,447.33799999999997,232.58599999999998,450.308]);
ctx.recodingOrder('bezierCurveTo',[232.302,452.617,230.336,454.31,228.067,454.31]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();




ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E74341";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[247.326,450.072]);
ctx.recodingOrder('bezierCurveTo',[245.209,450.072,243.311,448.588,242.86599999999999,446.434]);
ctx.recodingOrder('bezierCurveTo',[242.35,443.92900000000003,241.488,440.428,240.65499999999997,437.04600000000005]);
ctx.recodingOrder('bezierCurveTo',[239.79999999999998,433.58000000000004,238.91899999999998,429.99600000000004,238.36499999999998,427.32000000000005]);
ctx.recodingOrder('bezierCurveTo',[237.856,424.8550000000001,239.44299999999998,422.4440000000001,241.909,421.934]);
ctx.recodingOrder('bezierCurveTo',[244.37099999999998,421.434,246.78699999999998,423.01300000000003,247.295,425.478]);
ctx.recodingOrder('bezierCurveTo',[247.81099999999998,427.983,248.67299999999997,431.48400000000004,249.506,434.866]);
ctx.recodingOrder('bezierCurveTo',[250.361,438.332,251.242,441.916,251.796,444.591]);
ctx.recodingOrder('bezierCurveTo',[252.30499999999998,447.056,250.718,449.467,248.25199999999998,449.97700000000003]);
ctx.recodingOrder('bezierCurveTo',[247.942,450.04,247.631,450.072,247.326,450.072]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[228.069,457.349]);
ctx.recodingOrder('bezierCurveTo',[227.75,457.349,227.43599999999998,457.33,227.118,457.28999999999996]);
ctx.recodingOrder('bezierCurveTo',[225.124,457.044,223.32399999999998,456.02799999999996,222.07,454.429]);
ctx.recodingOrder('bezierCurveTo',[220.822,452.83,220.26999999999998,450.83799999999997,220.519,448.823]);
ctx.recodingOrder('bezierCurveTo',[220.903,445.705,221.573,441.24699999999996,222.227,436.94]);
ctx.recodingOrder('bezierCurveTo',[222.859,432.752,223.513,428.418,223.881,425.46999999999997]);
ctx.recodingOrder('bezierCurveTo',[224.13,423.441,225.156,421.633,226.766,420.385]);
ctx.recodingOrder('bezierCurveTo',[228.35999999999999,419.14799999999997,230.343,418.621,232.364,418.861]);
ctx.recodingOrder('bezierCurveTo',[234.358,419.10699999999997,236.15800000000002,420.123,237.406,421.722]);
ctx.recodingOrder('bezierCurveTo',[238.654,423.32099999999997,239.20600000000002,425.313,238.957,427.328]);
ctx.recodingOrder('bezierCurveTo',[238.579,430.443,237.903,434.90099999999995,237.249,439.21099999999996]);
ctx.recodingOrder('bezierCurveTo',[236.617,443.39599999999996,235.963,447.727,235.6,450.67599999999993]);
ctx.recodingOrder('bezierCurveTo',[235.132,454.482,231.89,457.349,228.069,457.349]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[231.392,424.877]);
ctx.recodingOrder('bezierCurveTo',[230.976,424.877,230.679,425.039,230.489,425.185]);
ctx.recodingOrder('bezierCurveTo',[230.17000000000002,425.436,229.965,425.801,229.911,426.214]);
ctx.recodingOrder('bezierCurveTo',[229.543,429.205,228.879,433.599,228.236,437.846]);
ctx.recodingOrder('bezierCurveTo',[227.593,442.099,226.934,446.492,226.54999999999998,449.567]);
ctx.recodingOrder('bezierCurveTo',[226.48499999999999,450.108,226.71699999999998,450.499,226.86299999999997,450.68600000000004]);
ctx.recodingOrder('bezierCurveTo',[227.00299999999996,450.87000000000006,227.32799999999997,451.19100000000003,227.87299999999996,451.259]);
ctx.recodingOrder('lineTo',[228.06699999999995,451.27000000000004]);
ctx.recodingOrder('bezierCurveTo',[228.82899999999995,451.27000000000004,229.47199999999995,450.69700000000006,229.56899999999996,449.932]);
ctx.recodingOrder('bezierCurveTo',[229.93099999999995,446.949,230.59599999999995,442.553,231.23899999999995,438.303]);
ctx.recodingOrder('bezierCurveTo',[231.88199999999995,434.053,232.54699999999994,429.659,232.92499999999995,426.587]);
ctx.recodingOrder('bezierCurveTo',[232.98999999999995,426.039,232.75799999999995,425.647,232.61199999999997,425.46299999999997]);
ctx.recodingOrder('bezierCurveTo',[232.47199999999998,425.277,232.14699999999996,424.95799999999997,231.60699999999997,424.89]);
ctx.recodingOrder('bezierCurveTo',[231.533,424.883,231.462,424.877,231.392,424.877]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[247.329,453.113]);
ctx.recodingOrder('bezierCurveTo',[243.741,453.113,240.612,450.562,239.888,447.047]);
ctx.recodingOrder('bezierCurveTo',[239.39600000000002,444.64300000000003,238.57500000000002,441.31300000000005,237.775,438.06500000000005]);
ctx.recodingOrder('bezierCurveTo',[236.84,434.2660000000001,235.954,430.64300000000003,235.386,427.93800000000005]);
ctx.recodingOrder('bezierCurveTo',[234.543,423.833,237.191,419.80500000000006,241.293,418.956]);
ctx.recodingOrder('bezierCurveTo',[245.37300000000002,418.10200000000003,249.431,420.772,250.275,424.863]);
ctx.recodingOrder('bezierCurveTo',[250.762,427.238,251.567,430.513,252.35500000000002,433.728]);
ctx.recodingOrder('bezierCurveTo',[253.32200000000003,437.641,254.20900000000003,441.266,254.776,443.971]);
ctx.recodingOrder('bezierCurveTo',[255.619,448.07800000000003,252.971,452.104,248.869,452.953]);
ctx.recodingOrder('bezierCurveTo',[248.355,453.059,247.837,453.113,247.329,453.113]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[242.822,424.88]);
ctx.recodingOrder('bezierCurveTo',[242.719,424.88,242.617,424.891,242.514,424.90999999999997]);
ctx.recodingOrder('bezierCurveTo',[241.703,425.07699999999994,241.168,425.88599999999997,241.341,426.707]);
ctx.recodingOrder('bezierCurveTo',[241.887,429.347,242.762,432.889,243.60500000000002,436.318]);
ctx.recodingOrder('bezierCurveTo',[244.497,439.947,245.33400000000003,443.36199999999997,245.842,445.82399999999996]);
ctx.recodingOrder('bezierCurveTo',[246.00900000000001,446.621,246.745,447.17999999999995,247.63600000000002,447.00199999999995]);
ctx.recodingOrder('bezierCurveTo',[248.17700000000002,446.89099999999996,248.47400000000002,446.542,248.60300000000004,446.34799999999996]);
ctx.recodingOrder('bezierCurveTo',[248.72800000000004,446.15099999999995,248.93300000000005,445.73999999999995,248.81900000000005,445.205]);
ctx.recodingOrder('bezierCurveTo',[248.27300000000005,442.565,247.39800000000005,439.02,246.55500000000004,435.594]);
ctx.recodingOrder('bezierCurveTo',[245.64200000000002,431.882,244.81500000000003,428.52299999999997,244.31800000000004,426.089]);
ctx.recodingOrder('bezierCurveTo',[244.173,425.374,243.535,424.88,242.822,424.88]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();




ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E74341";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[210.856,441.256]);
ctx.recodingOrder('bezierCurveTo',[206.942,440.49899999999997,203.27599999999998,437.95899999999995,202.015,433.68399999999997]);
ctx.recodingOrder('bezierCurveTo',[201.236,431.03599999999994,201.517,428.09499999999997,202.87199999999999,424.68999999999994]);
ctx.recodingOrder('bezierCurveTo',[206.06799999999998,416.66099999999994,214.075,410.48099999999994,224.296,408.15799999999996]);
ctx.recodingOrder('bezierCurveTo',[226.753,407.59799999999996,229.203,409.14099999999996,229.76,411.59899999999993]);
ctx.recodingOrder('bezierCurveTo',[230.20999999999998,413.57499999999993,229.303,415.5439999999999,227.653,416.53099999999995]);
ctx.recodingOrder('bezierCurveTo',[228.439,416.35099999999994,229.283,416.37699999999995,230.102,416.65]);
ctx.recodingOrder('bezierCurveTo',[232.497,417.44199999999995,233.79500000000002,420.02599999999995,233.002,422.421]);
ctx.recodingOrder('bezierCurveTo',[231.60000000000002,426.653,229.477,430.536,226.69500000000002,433.961]);
ctx.recodingOrder('bezierCurveTo',[223.34000000000003,438.09000000000003,219.60600000000002,440.558,215.59500000000003,441.298]);
ctx.recodingOrder('bezierCurveTo',[214.071,441.579,212.444,441.564,210.856,441.256]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[226.327,417.063]);
ctx.recodingOrder('lineTo',[226.321,417.065]);
ctx.recodingOrder('bezierCurveTo',[219.036,418.71999999999997,213.44299999999998,422.834,211.359,428.068]);
ctx.recodingOrder('bezierCurveTo',[210.65900000000002,429.829,210.657,430.69,210.77800000000002,431.104]);
ctx.recodingOrder('bezierCurveTo',[210.99800000000002,431.854,212.532,432.574,213.94000000000003,432.315]);
ctx.recodingOrder('bezierCurveTo',[215.75500000000002,431.981,217.66200000000003,430.597,219.60900000000004,428.2]);
ctx.recodingOrder('bezierCurveTo',[221.69100000000003,425.639,223.28000000000003,422.728,224.33200000000005,419.549]);
ctx.recodingOrder('bezierCurveTo',[224.692,418.466,225.417,417.606,226.327,417.063]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();




ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[213.37,444.537]);
ctx.recodingOrder('bezierCurveTo',[212.34300000000002,444.537,211.3,444.43699999999995,210.279,444.23999999999995]);
ctx.recodingOrder('lineTo',[210.279,444.23999999999995]);
ctx.recodingOrder('bezierCurveTo',[204.756,443.17199999999997,200.57399999999998,439.54699999999997,199.10399999999998,434.54299999999995]);
ctx.recodingOrder('bezierCurveTo',[198.12599999999998,431.21999999999997,198.434,427.631,200.04399999999998,423.57099999999997]);
ctx.recodingOrder('bezierCurveTo',[203.61599999999999,414.60799999999995,212.42999999999998,407.73999999999995,223.62099999999998,405.195]);
ctx.recodingOrder('bezierCurveTo',[225.60399999999998,404.746,227.641,405.09,229.35999999999999,406.178]);
ctx.recodingOrder('bezierCurveTo',[231.08399999999997,407.261,232.272,408.948,232.72099999999998,410.931]);
ctx.recodingOrder('bezierCurveTo',[233.00199999999998,412.144,232.96999999999997,413.371,232.67799999999997,414.519]);
ctx.recodingOrder('bezierCurveTo',[233.85599999999997,415.246,234.82299999999998,416.294,235.46099999999996,417.569]);
ctx.recodingOrder('bezierCurveTo',[236.37399999999997,419.385,236.52499999999995,421.449,235.88799999999995,423.37800000000004]);
ctx.recodingOrder('bezierCurveTo',[234.37499999999994,427.958,232.07299999999995,432.165,229.05199999999994,435.87700000000007]);
ctx.recodingOrder('bezierCurveTo',[225.22599999999994,440.58700000000005,220.88699999999994,443.41300000000007,216.14699999999993,444.28600000000006]);
ctx.recodingOrder('bezierCurveTo',[215.245,444.453,214.311,444.537,213.37,444.537]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[225.313,411.081]);
ctx.recodingOrder('bezierCurveTo',[225.20499999999998,411.081,225.09099999999998,411.094,224.97199999999998,411.12100000000004]);
ctx.recodingOrder('bezierCurveTo',[215.72599999999997,413.223,208.522,418.71700000000004,205.69099999999997,425.814]);
ctx.recodingOrder('bezierCurveTo',[204.60499999999996,428.562,204.35099999999997,430.856,204.93399999999997,432.82500000000005]);
ctx.recodingOrder('bezierCurveTo',[205.74999999999997,435.60800000000006,208.18199999999996,437.64300000000003,211.43499999999997,438.27200000000005]);
ctx.recodingOrder('lineTo',[211.43499999999997,438.27200000000005]);
ctx.recodingOrder('bezierCurveTo',[212.65599999999998,438.50700000000006,213.89899999999997,438.51800000000003,215.039,438.3070000000001]);
ctx.recodingOrder('bezierCurveTo',[218.325,437.7050000000001,221.44799999999998,435.5970000000001,224.339,432.0440000000001]);
ctx.recodingOrder('bezierCurveTo',[226.89,428.9020000000001,228.835,425.3430000000001,230.11599999999999,421.4660000000001]);
ctx.recodingOrder('bezierCurveTo',[230.289,420.93900000000014,230.13699999999997,420.5070000000001,230.035,420.2960000000001]);
ctx.recodingOrder('bezierCurveTo',[229.927,420.0850000000001,229.673,419.7070000000001,229.149,419.5340000000001]);
ctx.recodingOrder('bezierCurveTo',[228.868,419.4400000000001,228.593,419.4230000000001,228.322,419.4940000000001]);
ctx.recodingOrder('bezierCurveTo',[228.246,419.5100000000001,228.171,419.52600000000007,228.09,419.5370000000001]);
ctx.recodingOrder('bezierCurveTo',[228.025,419.5850000000001,227.955,419.6310000000001,227.879,419.67500000000007]);
ctx.recodingOrder('bezierCurveTo',[227.65699999999998,419.8070000000001,227.35999999999999,420.0590000000001,227.209,420.51000000000005]);
ctx.recodingOrder('bezierCurveTo',[226.053,424.03400000000005,224.285,427.26800000000003,221.962,430.11800000000005]);
ctx.recodingOrder('bezierCurveTo',[219.552,433.0880000000001,217.039,434.833,214.48899999999998,435.30300000000005]);
ctx.recodingOrder('bezierCurveTo',[211.92199999999997,435.7900000000001,208.62599999999998,434.54900000000004,207.86299999999997,431.96600000000007]);
ctx.recodingOrder('bezierCurveTo',[207.47899999999998,430.63400000000007,207.69599999999997,429.0450000000001,208.53799999999998,426.9410000000001]);
ctx.recodingOrder('bezierCurveTo',[210.98,420.7940000000001,217.35199999999998,416.0010000000001,225.587,414.11500000000007]);
ctx.recodingOrder('bezierCurveTo',[225.685,414.0900000000001,225.78699999999998,414.0690000000001,225.89,414.05600000000004]);
ctx.recodingOrder('bezierCurveTo',[225.95499999999998,414.00800000000004,226.02499999999998,413.96400000000006,226.095,413.92100000000005]);
ctx.recodingOrder('bezierCurveTo',[226.662,413.583,226.943,412.92100000000005,226.797,412.27200000000005]);
ctx.recodingOrder('bezierCurveTo',[226.673,411.73400000000004,226.322,411.44200000000006,226.12199999999999,411.31800000000004]);
ctx.recodingOrder('bezierCurveTo',[225.967,411.221,225.68,411.081,225.313,411.081]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[219.401,423.164]);
ctx.recodingOrder('bezierCurveTo',[217.024,424.736,215.25,426.709,214.294,428.92199999999997]);
ctx.recodingOrder('bezierCurveTo',[215.078,428.53799999999995,216.04500000000002,427.768,217.245,426.28499999999997]);
ctx.recodingOrder('bezierCurveTo',[218.05,425.301,218.769,424.258,219.401,423.164]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();




ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E74341";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[264.826,441.552]);
ctx.recodingOrder('bezierCurveTo',[264.158,441.552,263.471,441.509,262.76800000000003,441.42400000000004]);
ctx.recodingOrder('bezierCurveTo',[254.64400000000003,440.43300000000005,248.70600000000002,434.32500000000005,244.94500000000002,429.817]);
ctx.recodingOrder('lineTo',[243.90600000000003,428.584]);
ctx.recodingOrder('bezierCurveTo',[241.11500000000004,425.291,238.22900000000004,421.886,236.30900000000003,416.346]);
ctx.recodingOrder('bezierCurveTo',[235.87300000000002,415.085,236.02100000000002,413.763,236.61200000000002,412.677]);
ctx.recodingOrder('bezierCurveTo',[235.717,411.942,235.10000000000002,410.87,234.97100000000003,409.62800000000004]);
ctx.recodingOrder('bezierCurveTo',[234.70900000000003,407.124,236.52600000000004,404.88200000000006,239.03100000000003,404.62000000000006]);
ctx.recodingOrder('bezierCurveTo',[247.39100000000002,403.74300000000005,257.35100000000006,407.71400000000006,263.891,411.7180000000001]);
ctx.recodingOrder('bezierCurveTo',[269.71200000000005,415.28100000000006,273.843,420.37000000000006,275.523,426.0470000000001]);
ctx.recodingOrder('bezierCurveTo',[276.93300000000005,430.81000000000006,276.1,435.38700000000006,273.297,438.2900000000001]);
ctx.recodingOrder('bezierCurveTo',[271.236,440.424,268.278,441.552,264.826,441.552]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[245.143,413.966]);
ctx.recodingOrder('bezierCurveTo',[246.499,417.543,248.439,419.832,250.862,422.69100000000003]);
ctx.recodingOrder('lineTo',[251.947,423.978]);
ctx.recodingOrder('bezierCurveTo',[256.40500000000003,429.32300000000004,260.081,431.91200000000003,263.871,432.375]);
ctx.recodingOrder('bezierCurveTo',[265.31399999999996,432.546,266.411,432.299,266.739,431.958]);
ctx.recodingOrder('bezierCurveTo',[267.125,431.559,267.246,430.20700000000005,266.78099999999995,428.636]);
ctx.recodingOrder('bezierCurveTo',[265.74199999999996,425.124,263.02699999999993,421.87800000000004,259.1329999999999,419.495]);
ctx.recodingOrder('bezierCurveTo',[255.209,417.094,249.925,414.817,245.143,413.966]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();




ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[264.827,444.593]);
ctx.recodingOrder('bezierCurveTo',[264.038,444.593,263.228,444.541,262.395,444.439]);
ctx.recodingOrder('bezierCurveTo',[253.20799999999997,443.31800000000004,246.70199999999997,436.668,242.611,431.767]);
ctx.recodingOrder('lineTo',[241.57899999999998,430.54]);
ctx.recodingOrder('bezierCurveTo',[238.75799999999998,427.214,235.54799999999997,423.43100000000004,233.44099999999997,417.341]);
ctx.recodingOrder('bezierCurveTo',[231.52799999999996,411.82300000000004,231.45799999999997,407.606,233.24099999999999,404.80400000000003]);
ctx.recodingOrder('bezierCurveTo',[234.057,403.51800000000003,235.67299999999997,401.91900000000004,238.71499999999997,401.59700000000004]);
ctx.recodingOrder('bezierCurveTo',[247.85799999999998,400.63500000000005,258.51,404.85800000000006,265.481,409.12800000000004]);
ctx.recodingOrder('bezierCurveTo',[271.949,413.08900000000006,276.549,418.79300000000006,278.43399999999997,425.18800000000005]);
ctx.recodingOrder('bezierCurveTo',[280.15799999999996,431.011,279.05499999999995,436.69900000000007,275.489,440.40000000000003]);
ctx.recodingOrder('bezierCurveTo',[272.835,443.142,269.15,444.593,264.827,444.593]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[241.497,407.533]);
ctx.recodingOrder('bezierCurveTo',[240.76700000000002,407.533,240.054,407.56800000000004,239.352,407.644]);
ctx.recodingOrder('bezierCurveTo',[238.585,407.722,238.434,407.963,238.369,408.063]);
ctx.recodingOrder('bezierCurveTo',[237.818,408.933,237.855,411.524,239.18,415.34999999999997]);
ctx.recodingOrder('bezierCurveTo',[240.92000000000002,420.36699999999996,243.49800000000002,423.402,246.227,426.61699999999996]);
ctx.recodingOrder('lineTo',[247.276,427.86299999999994]);
ctx.recodingOrder('bezierCurveTo',[250.71300000000002,431.98299999999995,256.084,437.54699999999997,263.137,438.40899999999993]);
ctx.recodingOrder('bezierCurveTo',[266.493,438.81899999999996,269.33,438.02799999999996,271.118,436.1769999999999]);
ctx.recodingOrder('bezierCurveTo',[273.144,434.07499999999993,273.701,430.6079999999999,272.61,426.9089999999999]);
ctx.recodingOrder('bezierCurveTo',[271.14500000000004,421.9569999999999,267.487,417.48399999999987,262.305,414.3099999999999]);
ctx.recodingOrder('bezierCurveTo',[256.753,410.91,248.631,407.533,241.497,407.533]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[264.756,435.466]);
ctx.recodingOrder('bezierCurveTo',[264.25899999999996,435.466,263.82099999999997,435.428,263.513,435.39300000000003]);
ctx.recodingOrder('bezierCurveTo',[258.88199999999995,434.82800000000003,254.60199999999998,431.908,249.61399999999998,425.922]);
ctx.recodingOrder('lineTo',[248.539,424.65200000000004]);
ctx.recodingOrder('bezierCurveTo',[246.021,421.682,243.843,419.11300000000006,242.303,415.03900000000004]);
ctx.recodingOrder('bezierCurveTo',[241.914,414.01700000000005,242.109,412.867,242.805,412.02600000000007]);
ctx.recodingOrder('bezierCurveTo',[243.502,411.18300000000005,244.594,410.7800000000001,245.68,410.9750000000001]);
ctx.recodingOrder('bezierCurveTo',[250.40800000000002,411.81500000000005,256.029,414.03100000000006,260.719,416.9030000000001]);
ctx.recodingOrder('bezierCurveTo',[265.247,419.67500000000007,268.436,423.5340000000001,269.695,427.7700000000001]);
ctx.recodingOrder('bezierCurveTo',[269.98699999999997,428.7560000000001,270.792,432.1200000000001,268.933,434.0630000000001]);
ctx.recodingOrder('bezierCurveTo',[267.814,435.218,266.064,435.466,264.756,435.466]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[251.905,419.211]);
ctx.recodingOrder('bezierCurveTo',[252.305,419.69800000000004,252.732,420.197,253.18,420.724]);
ctx.recodingOrder('lineTo',[254.27100000000002,422.01599999999996]);
ctx.recodingOrder('bezierCurveTo',[257.956,426.44499999999994,260.999,428.768,263.803,429.292]);
ctx.recodingOrder('bezierCurveTo',[262.927,426.577,260.712,424.02599999999995,257.545,422.08599999999996]);
ctx.recodingOrder('bezierCurveTo',[255.791,421.013,253.857,420.032,251.905,419.211]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#E74341";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[232.228,403.474]);
ctx.recodingOrder('bezierCurveTo',[230.454,404.183,229.196,405.864,228.622,407.686]);
ctx.recodingOrder('bezierCurveTo',[228.04800000000003,409.508,228.079,411.46599999999995,228.28400000000002,413.36499999999995]);
ctx.recodingOrder('bezierCurveTo',[228.44600000000003,414.86699999999996,228.71300000000002,416.35699999999997,228.98000000000002,417.84499999999997]);
ctx.recodingOrder('bezierCurveTo',[229.19500000000002,419.046,229.42300000000003,420.28,230.06900000000002,421.315]);
ctx.recodingOrder('bezierCurveTo',[231.62400000000002,423.808,235.16000000000003,424.34499999999997,237.967,423.478]);
ctx.recodingOrder('bezierCurveTo',[238.608,423.28000000000003,239.24,423.019,239.76700000000002,422.604]);
ctx.recodingOrder('bezierCurveTo',[240.69400000000002,421.875,241.21300000000002,420.738,241.50300000000001,419.59499999999997]);
ctx.recodingOrder('bezierCurveTo',[241.84,418.26199999999994,241.91000000000003,416.87699999999995,241.92700000000002,415.50199999999995]);
ctx.recodingOrder('bezierCurveTo',[241.96400000000003,412.44199999999995,241.699,409.234,240.068,406.645]);
ctx.recodingOrder('bezierCurveTo',[238.435,404.055,235.068,402.337,232.228,403.474]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[235.37,426.898]);
ctx.recodingOrder('bezierCurveTo',[232.387,426.898,229.274,425.774,227.491,422.92400000000004]);
ctx.recodingOrder('bezierCurveTo',[226.52900000000002,421.384,226.22600000000003,419.72,225.989,418.38200000000006]);
ctx.recodingOrder('bezierCurveTo',[225.708,416.82000000000005,225.433,415.2610000000001,225.26500000000001,413.6910000000001]);
ctx.recodingOrder('bezierCurveTo',[225.07600000000002,411.9460000000001,224.919,409.3300000000001,225.72500000000002,406.7740000000001]);
ctx.recodingOrder('bezierCurveTo',[226.64300000000003,403.8800000000001,228.60000000000002,401.6510000000001,231.10200000000003,400.6510000000001]);
ctx.recodingOrder('bezierCurveTo',[235.10100000000003,399.05400000000014,240.05600000000004,400.92900000000014,242.64000000000004,405.0220000000001]);
ctx.recodingOrder('bezierCurveTo',[244.77400000000003,408.4100000000001,245.00200000000004,412.4230000000001,244.96400000000006,415.5380000000001]);
ctx.recodingOrder('bezierCurveTo',[244.94800000000006,416.9640000000001,244.87200000000004,418.65300000000013,244.45000000000005,420.33100000000013]);
ctx.recodingOrder('bezierCurveTo',[243.93100000000004,422.36900000000014,242.98500000000004,423.9330000000001,241.64000000000004,424.99200000000013]);
ctx.recodingOrder('bezierCurveTo',[240.88900000000004,425.5860000000001,240.00300000000004,426.02700000000016,238.85700000000006,426.37800000000016]);
ctx.recodingOrder('bezierCurveTo',[237.78,426.712,236.585,426.898,235.37,426.898]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('moveTo',[234.1,406.161]);
ctx.recodingOrder('bezierCurveTo',[233.835,406.161,233.58599999999998,406.204,233.35999999999999,406.293]);
ctx.recodingOrder('lineTo',[233.35999999999999,406.293]);
ctx.recodingOrder('bezierCurveTo',[232.576,406.606,231.868,407.493,231.51799999999997,408.603]);
ctx.recodingOrder('bezierCurveTo',[231.16099999999997,409.73,231.09599999999998,411.099,231.30699999999996,413.03700000000003]);
ctx.recodingOrder('bezierCurveTo',[231.46399999999997,414.47200000000004,231.71699999999996,415.89000000000004,231.97199999999995,417.312]);
ctx.recodingOrder('bezierCurveTo',[232.13399999999996,418.21500000000003,232.30199999999996,419.152,232.64699999999996,419.701]);
ctx.recodingOrder('bezierCurveTo',[233.37099999999995,420.865,235.52199999999996,421.06,237.06799999999996,420.571]);
ctx.recodingOrder('bezierCurveTo',[237.55999999999995,420.42,237.78099999999995,420.295,237.88399999999996,420.21700000000004]);
ctx.recodingOrder('bezierCurveTo',[238.00799999999995,420.117,238.31599999999995,419.79300000000006,238.55899999999997,418.84200000000004]);
ctx.recodingOrder('bezierCurveTo',[238.82399999999996,417.78800000000007,238.87199999999996,416.59700000000004,238.88899999999998,415.46700000000004]);
ctx.recodingOrder('bezierCurveTo',[238.91599999999997,413.184,238.78099999999998,410.30600000000004,237.49499999999998,408.266]);
ctx.recodingOrder('bezierCurveTo',[236.699,407.007,235.267,406.161,234.1,406.161]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#ECE3D7";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[231.587,481.599]);
ctx.recodingOrder('bezierCurveTo',[230.226,481.599,228.987,480.678,228.642,479.3]);
ctx.recodingOrder('lineTo',[227.588,475.096]);
ctx.recodingOrder('bezierCurveTo',[227.183,473.47,228.171,471.819,229.798,471.411]);
ctx.recodingOrder('bezierCurveTo',[231.424,470.997,233.078,471.992,233.489,473.621]);
ctx.recodingOrder('lineTo',[234.532,477.82]);
ctx.recodingOrder('bezierCurveTo',[234.942,479.449,233.954,481.09999999999997,232.327,481.508]);
ctx.recodingOrder('bezierCurveTo',[232.078,481.57,231.83,481.599,231.587,481.599]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#ECE3D7";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[240.449,479.289]);
ctx.recodingOrder('bezierCurveTo',[239.741,479.289,239.03300000000002,479.043,238.455,478.543]);
ctx.recodingOrder('bezierCurveTo',[237.18,477.433,236.126,476.03000000000003,235.413,474.487]);
ctx.recodingOrder('bezierCurveTo',[234.705,472.963,235.37,471.158,236.893,470.45300000000003]);
ctx.recodingOrder('bezierCurveTo',[238.401,469.74,240.222,470.413,240.925,471.937]);
ctx.recodingOrder('bezierCurveTo',[241.282,472.704,241.806,473.404,242.443,473.956]);
ctx.recodingOrder('bezierCurveTo',[243.708,475.05600000000004,243.84300000000002,476.974,242.746,478.24100000000004]);
ctx.recodingOrder('bezierCurveTo',[242.141,478.932,241.298,479.289,240.449,479.289]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#ECE3D7";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[246.561,474.29]);
ctx.recodingOrder('bezierCurveTo',[245.988,474.29,245.41,474.12800000000004,244.89100000000002,473.788]);
ctx.recodingOrder('lineTo',[242.60500000000002,472.28000000000003]);
ctx.recodingOrder('bezierCurveTo',[241.205,471.35600000000005,240.82200000000003,469.47,241.746,468.07000000000005]);
ctx.recodingOrder('bezierCurveTo',[242.66400000000002,466.6700000000001,244.54000000000002,466.28100000000006,245.95600000000002,467.20500000000004]);
ctx.recodingOrder('lineTo',[248.24200000000002,468.713]);
ctx.recodingOrder('bezierCurveTo',[249.64200000000002,469.637,250.025,471.523,249.10100000000003,472.923]);
ctx.recodingOrder('bezierCurveTo',[248.518,473.809,247.55,474.29,246.561,474.29]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#ECE3D7";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[230.139,532.545]);
ctx.recodingOrder('bezierCurveTo',[229.24200000000002,532.545,228.35000000000002,532.1479999999999,227.75,531.389]);
ctx.recodingOrder('bezierCurveTo',[225.999,529.176,226.318,526.398,226.485,524.907]);
ctx.recodingOrder('bezierCurveTo',[226.679,523.235,228.22000000000003,522.0540000000001,229.852,522.235]);
ctx.recodingOrder('bezierCurveTo',[231.522,522.424,232.716,523.932,232.52700000000002,525.599]);
ctx.recodingOrder('bezierCurveTo',[232.365,527.0010000000001,232.435,527.474,232.52100000000002,527.625]);
ctx.recodingOrder('bezierCurveTo',[233.56400000000002,528.941,233.33700000000002,530.848,232.024,531.889]);
ctx.recodingOrder('bezierCurveTo',[231.468,532.331,230.803,532.545,230.139,532.545]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#ECE3D7";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[238.563,530.178]);
ctx.recodingOrder('bezierCurveTo',[237.76899999999998,530.178,236.974,529.867,236.38,529.251]);
ctx.recodingOrder('bezierCurveTo',[235.34799999999998,528.187,234.559,526.879,234.089,525.468]);
ctx.recodingOrder('bezierCurveTo',[233.56,523.8739999999999,234.424,522.155,236.018,521.626]);
ctx.recodingOrder('bezierCurveTo',[237.602,521.102,239.331,521.958,239.86,523.555]);
ctx.recodingOrder('bezierCurveTo',[240.038,524.103,240.347,524.611,240.746,525.025]);
ctx.recodingOrder('bezierCurveTo',[241.913,526.233,241.881,528.156,240.67600000000002,529.321]);
ctx.recodingOrder('bezierCurveTo',[240.087,529.894,239.325,530.178,238.563,530.178]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#ECE3D7";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[247.62,525.688]);
ctx.recodingOrder('bezierCurveTo',[246.939,525.688,246.25900000000001,525.461,245.696,524.999]);
ctx.recodingOrder('lineTo',[243.821,523.469]);
ctx.recodingOrder('bezierCurveTo',[242.513,522.413,242.319,520.4970000000001,243.37199999999999,519.1940000000001]);
ctx.recodingOrder('bezierCurveTo',[244.44199999999998,517.8890000000001,246.355,517.7,247.647,518.7510000000001]);
ctx.recodingOrder('lineTo',[249.54399999999998,520.296]);
ctx.recodingOrder('bezierCurveTo',[250.84599999999998,521.3580000000001,251.03599999999997,523.274,249.97099999999998,524.5730000000001]);
ctx.recodingOrder('bezierCurveTo',[249.371,525.307,248.496,525.688,247.62,525.688]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#9B5347";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[412.842,222.28]);
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');  ctx = getCtx();



ctx.fillStyle="#814139";

ctx.recodingOrder('beginPath');
ctx.recodingOrder('moveTo',[412.845,228.393]);
ctx.recodingOrder('bezierCurveTo',[412.75300000000004,228.393,412.661,228.387,412.567,228.377]);
ctx.recodingOrder('bezierCurveTo',[400.783,227.002,387.94100000000003,220.279,379.053,210.832]);
ctx.recodingOrder('bezierCurveTo',[368.831,199.968,362.574,186.396,357.802,174.552]);
ctx.recodingOrder('bezierCurveTo',[355.482,168.79399999999998,353.67100000000005,163.055,351.92,157.505]);
ctx.recodingOrder('bezierCurveTo',[348.821,147.679,345.89300000000003,138.398,340.41200000000003,129.3]);
ctx.recodingOrder('bezierCurveTo',[334.305,119.16000000000001,327.819,112.85900000000001,320.583,110.03600000000002]);
ctx.recodingOrder('bezierCurveTo',[306.37800000000004,104.49600000000001,290.42400000000004,112.10400000000001,275.3,120.36900000000001]);
ctx.recodingOrder('bezierCurveTo',[256.435,130.685,232.235,133.10500000000002,213.65,126.53000000000002]);
ctx.recodingOrder('bezierCurveTo',[207.345,124.29900000000002,201.662,121.47300000000001,196.16500000000002,118.73900000000002]);
ctx.recodingOrder('bezierCurveTo',[185.609,113.48900000000002,175.639,108.53100000000002,162.71200000000002,108.49400000000001]);
ctx.recodingOrder('bezierCurveTo',[162.681,108.49400000000001,162.64700000000002,108.49400000000001,162.615,108.49400000000001]);
ctx.recodingOrder('bezierCurveTo',[144.35500000000002,108.49400000000001,132.195,122.81300000000002,123.63500000000002,135.298]);
ctx.recodingOrder('bezierCurveTo',[118.45200000000003,142.858,114.53500000000003,153.253,110.74800000000002,163.305]);
ctx.recodingOrder('bezierCurveTo',[107.17600000000002,172.785,103.48200000000001,182.58800000000002,98.67000000000002,190.172]);
ctx.recodingOrder('bezierCurveTo',[88.19500000000002,206.682,73.87500000000001,225.92,55.963000000000015,228.166]);
ctx.recodingOrder('bezierCurveTo',[54.66600000000002,228.333,53.48000000000002,227.408,53.317000000000014,226.10999999999999]);
ctx.recodingOrder('bezierCurveTo',[53.15400000000002,224.81199999999998,54.07500000000002,223.62699999999998,55.37300000000001,223.464]);
ctx.recodingOrder('bezierCurveTo',[71.501,221.442,85.52300000000001,202.046,94.668,187.63299999999998]);
ctx.recodingOrder('bezierCurveTo',[99.21900000000001,180.45999999999998,102.825,170.88899999999998,106.313,161.63299999999998]);
ctx.recodingOrder('bezierCurveTo',[110.2,151.31699999999998,114.21900000000001,140.64999999999998,119.727,132.618]);
ctx.recodingOrder('bezierCurveTo',[128.94400000000002,119.175,142.147,103.75399999999999,162.612,103.75399999999999]);
ctx.recodingOrder('bezierCurveTo',[162.65099999999998,103.75399999999999,162.686,103.75399999999999,162.725,103.75399999999999]);
ctx.recodingOrder('bezierCurveTo',[176.75799999999998,103.79499999999999,187.20999999999998,108.99199999999999,198.27499999999998,114.49499999999999]);
ctx.recodingOrder('bezierCurveTo',[203.64499999999998,117.16499999999999,209.19699999999997,119.92599999999999,215.22999999999996,122.06099999999999]);
ctx.recodingOrder('bezierCurveTo',[232.60299999999995,128.206,255.28999999999996,125.90899999999999,273.02699999999993,116.20899999999999]);
ctx.recodingOrder('bezierCurveTo',[289.12999999999994,107.40799999999999,306.1979999999999,99.33999999999999,322.30499999999995,105.61899999999999]);
ctx.recodingOrder('bezierCurveTo',[330.55299999999994,108.83699999999999,337.804,115.78299999999999,344.472,126.85299999999998]);
ctx.recodingOrder('bezierCurveTo',[350.24399999999997,136.43399999999997,353.394,146.421,356.441,156.07899999999998]);
ctx.recodingOrder('bezierCurveTo',[358.164,161.54299999999998,359.94599999999997,167.194,362.198,172.78099999999998]);
ctx.recodingOrder('bezierCurveTo',[366.806,184.21599999999998,372.822,197.29299999999998,382.50399999999996,207.58499999999998]);
ctx.recodingOrder('bezierCurveTo',[392.25499999999994,217.94799999999998,404.71099999999996,222.68899999999996,413.116,223.67]);
ctx.recodingOrder('bezierCurveTo',[414.416,223.82199999999997,415.347,224.999,415.19399999999996,226.29899999999998]);
ctx.recodingOrder('bezierCurveTo',[415.055,227.505,414.031,228.393,412.845,228.393]);
ctx.recodingOrder('closePath');
ctx.recodingOrder('fill');
ctx.recodingOrder('stroke');
ctx.recodingOrder('restore');
ctx.recodingOrder('save');





	// <<== 正式内容
	
	drawComponentToCanvas();

	return component;
}
