//  重绘自身，根据自身的source
this.redraw = function (_i) {

    if (this.lastRedraw === _i) { // <<<<< 自身没有变化就不操作
        return this;
    }
    this.lastRedraw = _i;

    var i = _i || 0;

    var s = this.src[i].cns;

    var w = this.w || (s.width );
    var h = this.h || (s.height );

    if (this.config.isFull) {

        var gCns = this.game.cns;
        w = Math.max(gCns.width, gCns.height);
        h = Math.min(gCns.width, gCns.height);
    }

    this.w = this.ctx.width = this.cns.width = w;
    this.h = this.ctx.height = this.cns.height = h;

    this.ctx.drawImage(s, 0, 0, w, h);
    //this.bg();
    return this;
}

// 绘制自身到场景中
this.drawToScene = function () {
    var scene = this.game.ctx;
    if (this.visible) {
        scene.drawImage(this.cns, this.x, this.y, this.w * this.zoom, this.h * this.zoom);
    }

}