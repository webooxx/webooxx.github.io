
var getByClass = function (className) {
  return document.getElementsByClassName(className);
}
var addClass = function (element , _className) {

  var className = element.className.split(' ');
  var classNameMap = {}

  for(var i=0;i<classname.length;i++){ 2="" 12="" 100="" 400="" 2012="" classnamemap[="" classname[i]]="1;" }="" classnamemap[_classname]="1;" classname="[];" for(i="" in="" classnamemap){="" classname.push(i);="" element.classname="className.join('" ');="" var="" removeclass="function" (element="" ,="" _classname)="" {="" classnamemap="{}" for(var="" i="0;i<className.length;i++){" delete="" classnamemap[_classname];="" window.onload="function" (argument)="" addclass(="" getbyclass('header')[0]="" 'header_active_1'="" )="" ;="" getbyclass('screen-1__heading')[0]="" 'screen-1__heading_animate_init'="" );="" getbyclass('screen-1__phone')[0]="" 'screen-1__phone_animate_init'="" getbyclass('screen-1__shadow')[0]="" 'screen-1__shadow_animate_init'="" screen="" init="" getbyclass('screen-2__heading')[0]="" 'screen-2__heading_animate_init'="" getbyclass('screen-2__subheading')[0]="" 'screen-2__subheading_animate_init'="" getbyclass('screen-2__phone')[0]="" 'screen-2__phone_animate_init'="" getbyclass('screen-3__heading')[0]="" 'screen-3__heading_animate_init'="" getbyclass('screen-3__subheading')[0]="" 'screen-3__subheading_animate_init'="" getbyclass('screen-3__phone')[0]="" 'screen-3__phone_animate_init'="" getbyclass('screen-3__features')[0]="" 'screen-3__features_animate_init'="" getbyclass('screen-4__heading')[0]="" 'screen-4__heading_animate_init'="" getbyclass('screen-4__subheading')[0]="" 'screen-4__subheading_animate_init'="" getbyclass('screen-4__type')[0]="" 'screen-4__type_animate_init'="" getbyclass('screen-5__heading')[0]="" 'screen-5__heading_animate_init'="" getbyclass('screen-5__subheading')[0]="" 'screen-5__subheading_animate_init'="" getbyclass('screen-5__back')[0]="" 'screen-5__back_animate_init'="" settimeout(function="" ()="" getbyclass('screen-1__heading')[0].style.visibility="visible" getbyclass('screen-1__phone')[0].style.visibility="visible" getbyclass('screen-1__shadow')[0].style.visibility="visible" 'screen-1__heading_animate_done'="" 'screen-1__phone_animate_done'="" 'screen-1__shadow_animate_done'="" },500)="" fx="function(fn," begin,="" end)="" options="arguments[3]" ||="" {};="" 第四个参数，如果有的话，则作为自定义配置="" duration="options.duration" 500;="" ease="options.ease" fx.ease.line;="" delay="options.delay" 25;="" starttime="Date.now()" +="" delay;="" (function()="" settimeout(function()="" timestamp="Date.now()" -="" starttime;="" fn(ease(timestamp,="" (end="" begin),="" duration),="" 'step');="" if="" (duration="" <="timestamp)" fn(end,="" 'end');="" else="" settimeout(arguments.callee,="" 25);="" https:="" developer.mozilla.org="" zh-cn="" docs="" web="" javascript="" reference="" functions="" arguments="" callee="" },="" delay)="" })();="" http:="" www.cnblogs.com="" pigtail="" archive="" 04="" 2719093.html="" fx.ease="{" line:="" function(t,="" b,="" c,="" d)="" return="" c="" *="" (t="" =="" 2)="" b;="" easeinout:="" d,="" s)="" (s="=" undefined)="" s="1.70158" 3;="" ((t="" d="" 1)="" t="" (((s="" s))="" getbyclass('outline__item_i_1')[0].onclick="function" document.body.scrolltop="0;" fx(="" function(step){="" getbyclass('outline__item_i_2')[0].onclick="function" getbyclass('outline__item_i_3')[0].onclick="function" getbyclass('outline__item_i_4')[0].onclick="function" getbyclass('outline__item_i_5')[0].onclick="function" getbyclass('header__nav-item_i_1')[0].onclick="function" getbyclass('header__nav-item_i_2')[0].onclick="function" getbyclass('header__nav-item_i_3')[0].onclick="function" getbyclass('header__nav-item_i_4')[0].onclick="function" getbyclass('header__nav-item_i_5')[0].onclick="function" getbyclass('header__nav')[0].onmouseout="function" getbyclass('header__nav-item-tip')[0].style.left="" getbyclass('header__nav-item_i_1')[0].onmouseover="function" getbyclass('header__nav-item_i_2')[0].onmouseover="function" getbyclass('header__nav-item_i_3')[0].onmouseover="function" getbyclass('header__nav-item_i_4')[0].onmouseover="function" getbyclass('header__nav-item_i_5')[0].onmouseover="function" window.onscroll="function" top="document.body.scrollTop;" if(="" ){="" getbyclass('header')[0].setattribute('class','header="" header_active_1')="" removeclass(="" 'header_status_black'="" }else{="" getbyclass('outline')[0].style.opacity="0;" getbyclass('outline')[0].setattribute('class','outline="" outline_active_1');="" if(top="">1*800-61){
    getByClass('header')[0].setAttribute('class','header header_status_black header_active_2');

    removeClass( getByClass('screen-2__heading')[0] , 'screen-2__heading_animate_init' );
    removeClass( getByClass('screen-2__subheading')[0] , 'screen-2__subheading_animate_init' );
    removeClass( getByClass('screen-2__phone')[0] , 'screen-2__phone_animate_init' );

    addClass( getByClass('screen-2__heading')[0] , 'screen-2__heading_animate_done' );
    addClass( getByClass('screen-2__subheading')[0] , 'screen-2__subheading_animate_done' );
    addClass( getByClass('screen-2__phone')[0] , 'screen-2__phone_animate_done' );

    getByClass('outline')[0].setAttribute('class','outline outline_active_2');
  }

  if(top>2*800-61){
    getByClass('header')[0].setAttribute('class','header header_status_black header_active_3');

    removeClass( getByClass('screen-3__heading')[0] , 'screen-3__heading_animate_init' );
    removeClass( getByClass('screen-3__subheading')[0] , 'screen-3__subheading_animate_init' );
    removeClass( getByClass('screen-3__phone')[0] , 'screen-3__phone_animate_init' );
    removeClass( getByClass('screen-3__features')[0] , 'screen-3__features_animate_init' );

    addClass( getByClass('screen-3__heading')[0] , 'screen-3__heading_animate_done' );
    addClass( getByClass('screen-3__subheading')[0] , 'screen-3__subheading_animate_done' );
    addClass( getByClass('screen-3__phone')[0] , 'screen-3__phone_animate_done' );
    addClass( getByClass('screen-3__features')[0] , 'screen-3__features_animate_done' );

    getByClass('outline')[0].setAttribute('class','outline outline_active_3');
  }
  if(top>3*800-61){
    getByClass('header')[0].setAttribute('class','header header_status_black header_active_4');


    removeClass( getByClass('screen-4__heading')[0] , 'screen-4__heading_animate_init' );
    removeClass( getByClass('screen-4__subheading')[0] , 'screen-4__subheading_animate_init' );
    removeClass( getByClass('screen-4__type')[0] , 'screen-4__type_animate_init' );


    addClass( getByClass('screen-4__heading')[0] , 'screen-4__heading_animate_done' );
    addClass( getByClass('screen-4__subheading')[0] , 'screen-4__subheading_animate_done' );
    addClass( getByClass('screen-4__type')[0] , 'screen-4__type_animate_done' );

    getByClass('outline')[0].setAttribute('class','outline outline_active_4');


  }
  if(top>4*800-61){
    getByClass('header')[0].setAttribute('class','header header_status_black header_active_5');


    removeClass( getByClass('screen-5__heading')[0] , 'screen-5__heading_animate_init' );
    removeClass( getByClass('screen-5__subheading')[0] , 'screen-5__subheading_animate_init' );
    removeClass( getByClass('screen-5__back')[0] , 'screen-5__back_animate_init' );


    addClass( getByClass('screen-5__heading')[0] , 'screen-5__heading_animate_done' );
    addClass( getByClass('screen-5__subheading')[0] , 'screen-5__subheading_animate_done' );
    addClass( getByClass('screen-5__back')[0] , 'screen-5__back_animate_done' );

    getByClass('outline')[0].setAttribute('class','outline outline_active_5');

  }
}
// var mouseEnterTip = function (element) {
//   var e = document.createEvent('MouseEvents');
//   e.initEvent( 'mouseenter', true, false );
//   element.dispatchEvent(e);
// }

</classname.length;i++){>