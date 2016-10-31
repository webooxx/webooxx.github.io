
//定义全局变量 oID  oTIL
_global.oID =[];
_global.oTIL=[];
//定义样式类型 linker_default 和 linker_onhover
var linker_default:TextFormat = new TextFormat();
var linker_onhover:TextFormat = new TextFormat();
linker_default.font = "宋体";
linker_default.color = 0x333333;
linker_default.underline = false;
linker_onhover.font = "宋体";
linker_onhover.color = 0xFF0000;
linker_onhover.underline = true;

//构造载入XML的函数 LoadIndexGG

function LoadIndexGG(XmlName:String,PareMc:MovieClip) {
	var DatXML:XML = new XML();
	var nm = 20;
	DatXML.ignoreWhite = true;
	DatXML.onLoad = function() {
		var fn = this.firstChild;
		for(var i=0;i<fn.childNodes.length;i++){
			oID[i] = fn.childNodes[i].attributes.编号
			oTIL[i] = fn.childNodes[i].attributes.时间+': '+(fn.childNodes[i].attributes.标题).substr(0,23)
		}
		LoadOk()
	}
	DatXML.load(XmlName)
	
}
LoadIndexGG("Lst/ShowIndexBoard.xml",_root);

//测试
function LoadOk(){
	var nm =20;
	for(var i=0;i<oID.length;i++){
		var ss = mc_TxtUL(this.createEmptyMovieClip("DEV", this.getNextHighestDepth()),oTIL[i], trace, oID[i], nm*i);
	}
}
//创建
function mc_TxtUL(pareMc:MovieClip, lableTxt:String, oCallBack:Function, parID:Number, yy:Number):MovieClip {
var Con:MovieClip = new MovieClip();
Con = pareMc.createEmptyMovieClip("mc_Tmp"+parID, 1);
Con._x = 0;
Con._y = yy;
Con.oID = parID;
var label:TextField = Con.createTextField("label",  this.getNextHighestDepth(), 0, 0, 380, 20);
label.text = lableTxt;
label.setTextFormat(linker_default);
Con.onRollOver = function() {
this.label.setTextFormat(linker_onhover);
};
Con.onRollOut = function() {
this.label.setTextFormat(linker_default);
};
Con.onPress = function() {
	_root.ArtId = this.oID;
	_root.NavoId = 0;
	_root.gotoAndPlay(6);
	//parID;
};
return Con;
}