trace(_root.ArtId+_root.ArtShowMode)
var xmlpath = "D_关于我们.xml"
//trace("载入文字id"+_root.ArtId)
if(_root.ArtId){
	//xmlpath += xmlpath+'?artid='+_root.ArtId
}else{
	//xmlpath += xmlpath+'?artid=0'
}
var DatXML:XML = new XML();
DatXML.ignoreWhite = true;
DatXML.onLoad = function() {
	var fir_node:XMLNode = this.firstChild.childNodes[0].nodeValue
	Art_in.text =fir_node;
	nextFrame();
};
DatXML.load(xmlpath);
//载入文章路径 x.asp?artid=<int>