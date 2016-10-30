// 环状图
var H5ComponentRing  = function( name , cfg){
    cfg.type = 'pie';
    if(cfg.data.length > 1){
        cfg.data = [cfg.data[0]];   //  环状图只有一个数据
    }
    var obj = new H5ComponentPie(name,cfg); //  直接改造饼状图
    var mask  = $('<div class="ring_mask">');

    obj.addClass('h5_component_ring')
    obj.append(mask);

    obj.find('.mark,.text').removeAttr('style');
    obj.find('.text').css('color',cfg.data[0][2]);

    return obj;
}
