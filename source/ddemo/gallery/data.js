var data =[];


/*
$('input[readonly]').each(function(){ $(this).after( $(this).val()+'&lt;br&gt;' ) })
alert( ['<big>',$('div.username').text(),'</big>',$('div.spaceaddress h1').text().trim().replace(' ','/'),'<br>',$('#form_profile').text().trim().replace(/\s/g,'')].join('') )
*/

var description = [];

description.push('<big>布莱尔昆娜</big>所在地/北京<br>身高/167<br>CM体重/50<br>KG胸围/88<br>CM腰围/67<br>CM臀围/86<br>CM鞋码/36<br>头发颜色/黄色<br>眼睛颜色/深棕<br>')
description.push('<big>吴昕忆</big>所在地/北京  北京<br>身高/173<br>CM体重/46<br>KG胸围/92<br>CM腰围/64<br>CM臀围/98<br>CM鞋码/39<br>头发颜色/棕<br>眼睛颜色/棕<br>')
description.push('<big>珊瑚Yuria</big>所在地/北京<br>身高/165<br>CM体重/44<br>KG胸围/83<br>CM腰围/62<br>CM臀围/86<br>CM鞋码/36<br>头发颜色/棕<br>眼睛颜色/黑<br>' )
description.push('<big>张蓝艺</big>所在地/北京<br>身高/166<br>CM体重/43<br>KG胸围/89<br>CM腰围/60<br>CM臀围/91<br>CM鞋码/36<br>头发颜色/黑色<br>眼睛颜色/黑色<br>')


description.push('<big>梁小骞</big>所在地/北京 <br>身高/165<br>CM体重/45<br>KG胸围/82<br>CM腰围/66<br>CM臀围/90<br>CM鞋码/37<br>头发颜色/黑色<br>眼睛颜色/黑色<br>' );
description.push('<big>马原</big>所在地/北京<br>身高/173<br>CM体重/45<br>KG胸围/88<br>CM腰围/68<br>CM臀围/90<br>CM鞋码/37<br>头发颜色/黑色<br>眼睛颜色/深棕<br>');
description.push('<big>蒲萄</big>所在地/北京<br>身高/166<br>CM体重/40<br>KG胸围/80<br>CM腰围/57<br>CM臀围/86<br>CM鞋码/36<br>头发颜色/棕色<br>眼睛颜色/深棕<br>' );
description.push('<big>浠佑Nestor</big>所在地/杭州  广州<br>身高/180<br>CM体重/73<br>KG胸围/94<br>CM腰围/78<br>CM臀围/96<br>CM鞋码/42<br>头发颜色/棕褐<br>眼睛颜色/棕色<br>');
description.push('<big>白翔kingsley</big>所在地/北京<br>身高/188<br>CM体重/78<br>KG胸围/100<br>CM腰围/87<br>CM臀围/94<br>CM鞋码/43<br>头发颜色/黑色<br>眼睛颜色/黑<br>');
description.push('<big>张念恩NEWN</big>所在地/杭州  北京<br>身高/165<br>CM体重/45<br>KG胸围/84<br>CM腰围/62<br>CM臀围/86<br>CM鞋码/37<br>头发颜色/栗棕<br>眼睛颜色/棕色<br>');
description.push('<big>Karen陳以漫</big>所在地/北京<br>身高/170<br>CM体重/52<br>KG胸围/88<br>CM腰围/71<br>CM臀围/90<br>CM鞋码/39<br>头发颜色/黑色<br>眼睛颜色/深棕<br>' );

description.push('<big>李江可萌</big>所在地/重庆<br>身高/174<br>CM体重/52<br>KG胸围/84<br>CM腰围/65<br>CM臀围/90<br>CM鞋码/39<br>头发颜色/棕色<br>眼睛颜色/深棕<br>');

description.push('<big>曾晓夏</big>所在地/北京<br>身高/165<br>CM体重/43<br>KG胸围/82<br>CM腰围/59<br>CM臀围/86<br>CM鞋码/37<br>头发颜色/黑<br>眼睛颜色/黑<br>')
description.push('<big>汪静model</big>所在地/杭州  北京<br>身高/168<br>CM体重/48<br>KG胸围/89<br>CM腰围/61<br>CM臀围/87<br>CM鞋码/36<br>头发颜色/黑色<br>眼睛颜色/黑色<br>')


for(s in description){
    data.push({
       img: description[s] .match(/<big>([^<]+)/)[1]+'.jpg',
       caption: description[s] .match(/<big>([^<]+)/)[1],
       desc: description[s]
    })
}