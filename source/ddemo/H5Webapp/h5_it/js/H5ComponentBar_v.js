//  柱状图-垂直
var H5ComponentBar_v = function(name , cfg){
    var obj  = new H5ComponentBar(name,cfg);
    obj.addClass('h5_component_bar_v');
    var w = (100 / cfg.data.length )>>0;
    obj.find('.line').width(w+'%');


    //  把 width 分配到 height
    $.each(obj.find('.rate'),function(){
        var w = $(this).css('width');
        $(this).width('').height(w);    
    })

    $.each(obj.find('.per'),function(){
        $(this).appendTo( $(this).prev() );
    })
    return obj;
}