if(_root.ArtId){
	xmlpath = "Art/"+_root.ArtId +".xml"
}else{
	xmlpath = "Art/1.xml"
}
var DatXML:XML = new XML();
DatXML.ignoreWhite = true;
DatXML.onLoad = function() {
	var fir_node:XMLNode = this.firstChild.childNodes[0].nodeValue
	Art_in.text =fir_node;
	LD.gotoAndStop(10);
};
trace(xmlpath)
DatXML.load(xmlpath);
//载入文章路径 x.asp?artid=<int>