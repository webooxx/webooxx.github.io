// 创建 Canvas 对象，返回 {cns:CanvasElement,ctx:CanvasElement.getContext('2d')}

load.canvas = function (_config) {
    var config = _config || {};
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.className='c';
    cns.width = ctx.width = config.w || 100;
    cns.height = ctx.height = config.h || 100;
        return {
        cns: cns,
        ctx: ctx
    }
}