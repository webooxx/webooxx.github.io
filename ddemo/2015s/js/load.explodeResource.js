//  切分游戏资源
load.explodeResource = function () {
    log('resource exploding...');
    var resource = load.resource;
    for (i in resource) {

        var o = resource[i];
        var sc = (o.scale || 1);
        var r = [];

        if (resource[i].split) {
            var _h = o.h / o.split;
            for (var a = 0; a < o.split; a++) {
                r.push({w: o.w, h: _h, x: o.x, y: o.y + _h * a, scale: sc, src: load.src[ o.src], s: o.s})
            }
        } else if (resource[i].vsplit) {
            var _w = o.w / o.vsplit;
            for (var a = 0; a < o.vsplit; a++) {
                r.push({w: _w, h: o.h, x: o.x + _w * a, y: o.y, scale: sc, src: load.src[ o.src]})
            }
        } else {
            o.src = load.src[o.src];
            r = [o];
        }
        resource[i] = r;
    }

    //  进一步把位置信息切分为具体的Canvas小块
    for (s in resource) {
        max = resource[s].length;
        res = [];
        for (var i = 0; i < max; i++) {
            var opt = resource[s][i];
            opt.scale = opt.scale || 1;
            var canvas = load.canvas({ w: opt.w * opt.scale, h: opt.h * opt.scale});
            canvas.ctx.drawImage(opt.src, opt.x, opt.y, opt.w, opt.h, 0, 0, opt.w * opt.scale, opt.h * opt.scale);
            res.push(canvas);
            if (opt.s) {
                document.body.appendChild(canvas.cns)
            }
        }
        resource[s] = res;
    }
    load.resource = resource;
    log('resource explode done.');
    setTimeout(load.game, 1);
}

