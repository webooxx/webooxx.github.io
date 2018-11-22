// >>>>> js/index.2x.js 
var game;

var log = function () {
}
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/// @import log.js
// >>>>> js/browser.js 
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

// document.writeln("语言版本: " + browser.language);
// document.writeln(" 是否为移动终端: " + browser.versions.mobile);
// document.writeln(" ios终端: " + browser.versions.ios);
// document.writeln(" android终端: " + browser.versions.android);
// document.writeln(" 是否为iPhone: " + browser.versions.iPhone);
// document.writeln(" 是否iPad: " + browser.versions.iPad);
// document.writeln(navigator.userAgent);
 
// js/browser.js <<<<<
// >>>>> js/Game.js 
// >>>>> js/Cookie.js 
// 404 js/Cookie.js
// js/Cookie.js <<<<<
// >>>>> js/Array.prototype.sort.js 
!function (window) {
    var ua = window.navigator.userAgent.toLowerCase(),
        reg = /msie|applewebkit.+safari/;
    if (reg.test(ua)) {
        var _sort = Array.prototype.sort;
        Array.prototype.sort = function (fn) {
            if (!!fn && typeof fn === 'function') {
                if (this.length < 2) return this;
                var i = 0, j = i + 1, l = this.length, tmp, r = false, t = 0;
                for (; i < l; i++) {
                    for (j = i + 1; j < l; j++) {
                        t = fn.call(this, this[i], this[j]);
                        r = (typeof t === 'number' ? t :
                            !!t ? 1 : 0) > 0
                            ? true : false;
                        if (r) {
                            tmp = this[i];
                            this[i] = this[j];
                            this[j] = tmp;
                        }
                    }
                }
                return this;
            } else {
                return _sort.call(this);
            }
        };
    }
}(window);
// js/Array.prototype.sort.js <<<<<

//  游戏管理器
var Game = function (_config) {

    //  配置
    var config = _config || {};
//  高清屏反锯齿倍数

    config.fps = config.fps || 60;
    config.canvasId = config.canvasId || 'canvas';
    config.pause = 0;
    config.scale = config.scale || 2;

    //  需要返回的实例对象
    var oGame = {config: config, components: [], isVertical: false, isRotated: false};
    var scale = config.scale;
    var now;
    var then = Date.now();
    var interval = 1000 / config.fps;
    var delta;

    //  屏幕旋转操作
    oGame.resetSceneView = function () {
        load.onResize(function (size) {
            var m = /Mobile/.test(navigator.userAgent);
            var w = m ? size.w : 980;
            var h = m ? size.h : 552;
            if (m) {

                this.isVertical = w < h;
                if (w < h) {
                    var tmp = h;
                    h = w;
                    w = tmp;
                    this.cns.style.left = -(w - h) / 2 + 'px';
                    this.cns.style.top = (w - h) / 2 + 'px';
                    this.cns.style.webkitTransform = "rotate(90deg)";
                    this.cns.style.transform = "rotate(90deg)";
                    this.cns.style.oTransform = "rotate(90deg)";
                    this.cns.style.msTransform = "rotate(90deg)";
                } else {
                    this.cns.style.left = '';
                    this.cns.style.top = '';
                    this.cns.style.webkitTransform = "";
                    this.cns.style.transform = "";
                    this.cns.style.oTransform = "";
                    this.cns.style.msTransform = "";
                }
            }
            this.cns.width = this.ctx.width = w * scale;
            this.cns.height = this.ctx.height = h * scale;
            this.cns.className = m ? '' : 'canvas_pc';
            this.cns.style.width = w + 'px';
            this.cns.style.height = h + 'px';
        }, oGame)

    };

    oGame.sceneUpdate = function () {

        //  再来一次
        //setTimeout(oGame.sceneUpdate, 1000 / config.fps);
        //requestAnimationFrame(oGame.sceneUpdate);
        if (window.requestAnimationFrame) {
            requestAnimationFrame(oGame.sceneUpdate);
            now = Date.now();
            delta = now - then;
            if (delta > interval) {
                then = now - (delta % interval);
            } else {
                return false;
            }
        } else {
            setTimeout(oGame.sceneUpdate, 1000 / config.fps);
        }


        if (config.pause) {
            return false;
        }
        //  侦测屏幕状态
        oGame.ctx.clearRect(0, 0, oGame.ctx.width, oGame.ctx.height);
        //  通知所有组件更新
        var n = Date.now();
        var c = oGame.components.sort(function (a, b) {
            return a.index > b.index;
        })
        for (i in c) {
            typeof  c[i].onSceneUpdate == 'function' && c[i].onSceneUpdate(n);
        }
    }

    oGame.addComponent = function (_config) {
        var config = _config || {};
        config.game = config.game || this;
        var c = new Game[config.type || 'component'](config);
        oGame.components.push(c);
        return c;
    }

    //  触摸事件
    oGame.onTouch = function (touch) {


        var n = Date.now();
        var c = oGame.components.sort(function (a, b) {
            return a.index > b.index;
        })

        var x = touch.pageX;
        var y = touch.pageY;

        //  垂直情况修正 x 和 y
        if (oGame.isVertical) {
            y = oGame.cns.height / scale - touch.pageX;
            x = touch.pageY;
        }
        var o = {
            x: x * scale,
            y: y * scale,   //  DOM尺寸是Canvas的一半
            touch: touch
        }
        log('oGame ontouch x:' + x + ' y:' + y, 'x', x, 'y', y)
        //  非移动端要修正
        //          game.cns.offsetLeft
        //        game.cns.offsetTop
        if (!oGame.isMobile) {
            o.x -= oGame.cns.offsetLeft * 2
            o.y -= oGame.cns.offsetTop * 2
        }
        for (i in c) {
            c[i].visible && c[i]._onSceneTouch(o);
        }

    }

    //  隐藏所有元素
    oGame.hideAll = function () {
        var c = oGame.components;
        for (i in c) {
            c[i].visible = 0;
        }
    }
    oGame.pause = function () {
        config.pause ^= 1;
    }

    //  init Game
    void function () {

        if (load.checkStatus()) {
            load.status('readyGo');
        } else {
            log('game fail!')
            oGame.config.pause = 1;
        }
        log('game init!')

        oGame.isMobile = /Mobile/.test(navigator.userAgent);
        oGame.cns = g(config.canvasId);
        oGame.ctx = oGame.cns.getContext('2d');
        //  旋转
        oGame.resetSceneView();
        oGame.sceneUpdate();

        //  触摸
        oGame.cns.addEventListener("touchstart", function (event) {
            event.preventDefault();
            if (!event.touches.length) return;
            var touch = event.touches[0];
            oGame.onTouch(touch);
        }, false);
        oGame.cns.addEventListener("mousedown", oGame.onTouch, false);


    }();


    oGame.height = function () {
        return Math.min(oGame.cns.width, oGame.cns.height)
    }

    oGame.width = function () {
        return Math.max(oGame.cns.width, oGame.cns.height)
    }


    return oGame;
}

//  创建一个Canvas对象
Game.canvas = function (_size, uid) {

    var d = document;
    var cns = d.getElementById(uid) ? d.getElementById(uid) : d.createElement('canvas');
    var ctx = cns.getContext("2d");
    var size = _size || { w: 100, h: 100 }

    cns.id = uid || 'c' + Math.random().toString().replace('.', '_');
    cns.className = 'c';
    cns.width = ctx.width = size.w;
    cns.height = ctx.height = size.h;

    return {
        cns: cns,
        ctx: ctx,
        remove: function () {
            if (el = d.getElementById(cns.id)) {
                el.remove();
            }

        },
        show: function () {
            if (!d.getElementById(cns.id)) {
                d.body.appendChild(cns);
            }
        }
    }
}

//  组件对象
Game.component = function (config) {

    this.config = config;
    this.config.revise = this.config.revise || [];
    this.uid = config.uid || 'u' + Math.random();
    this.index = config.index || 100;
    this.game = config.game;
    this.src = config.game.config.resource[ this.uid ] || [new Game.canvas()];  //  初始化_uid资源，默认0个是100*100的canvas
    this.cns = new Game.canvas();
    this.ctx = this.cns.ctx;
    this.cns = this.cns.cns;
    this.beofreOnSceneUpdate = {};
    this.visible = this.config.visible || 0;
    this.direction = [0, 0];
    this.x = this.config.x || 0;
    this.y = this.config.y || 0;
    this.w = this.config.w || 0;
    this.h = this.config.h || 0;
    this.zoom = 1; // 组件动画缩放时使用


    //  --- 事件
    //  场景被触摸
    this._onSceneTouch = function (e) {
        typeof this.onSceneTouch == 'function' && this.onSceneTouch(e);
        typeof this.onTouchMe == 'function' && this.realTouchMe(e) && this.onTouchMe(e);
    }
    this.realTouchMe = function (e) {
        var t = this;
        return e.x > t.x && e.x < ( t.x + t.w) && e.y > t.y && e.y < ( t.y + t.h);

    }

    //  --  更新
    //  更新自身的位置
    this.updatePosition = function () {

        var isCenter = this.config.isCenter;
        var revise = this.config.revise;
        var isPlug = this.config.isPlug;

        if (isCenter) {
            if (typeof isCenter == 'boolean') {
                //  相对场景剧中

                var gCns = this.game.cns;

                var gameW = Math.max(gCns.width, gCns.height);
                var gameH = Math.min(gCns.width, gCns.height);

                var thisW = this.w;
                var thisH = this.h;

                this.x = gameW / 2 - thisW / 2;
                this.y = gameH / 2 - thisH / 2;

            } else {
                //  相对某个组件剧中
                this.x = isCenter.x + isCenter.w / 2 - this.w / 2;
                this.y = isCenter.y + isCenter.h / 2 - this.h / 2;
            }
        }
        //  相对某个组件的位置
        if (isPlug) {
            this.x = isPlug.x;
            this.y = isPlug.y;
        }
        if (revise) {
            if (revise[2]) {
                var direc = revise[2].direction || [0, 0];
                this.x = revise[2].x + revise[0] + direc[0] * 2;
                this.y = revise[2].y + revise[1];
            } else {
                this.x += revise[0] || 0;
                this.y += revise[1] || 0;
            }

        }

        typeof this.beforeUpdatePosition == 'function' && this.beforeUpdatePosition(ts);
    }


    //  场景更新
    this.onSceneUpdate = function (ts) {
        for (s in this.beofreOnSceneUpdate) {
            typeof this.beofreOnSceneUpdate[s] == 'function' && this.beofreOnSceneUpdate[s].call(this, ts);
        }
        this.updatePosition();
        return this.drawToScene();
    }

    //  --  通用方法
// >>>>> js/Game.component.redraw.js 
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
// js/Game.component.redraw.js <<<<<

    this.bg = function (c) {
        this.ctx.fillStyle = c || 'rgba(255,0,0,.1)';
        this.ctx.fillRect(0, 0, this.w, this.h);
    }
    //  清理自身
    this.clean = function () {

        this.ctx.clearRect(0, 0, 99999, 99999);
        return this;
    }

    //  --- 简单动画
    //  播放自身的动画
    this.play = function (_config) {
        var fn = {
            start: function (context) {
                context.max = context.config.max || this.src.length;
                context.idx = context.config.idx || 0;
            },
            run: function (context) {
                this.redraw(context.idx);
                context.idx++;
            },
            isOver: function (context) {
                return context.idx >= context.max;
            }
        };
        return this.todo('play', _config, fn)
    }
    //  移动自身到相对位置
    this.moveAbsY = function (_config) {
        var fn = {
            start: function (context) {
                var startAbsY = context.config.start || this.config.revise[1];
                var endAbsY = context.config.to;
                var diffY = endAbsY - startAbsY;
                var duration = context.config.duration || 500;
                context.max = duration / context.config.step;   //  移动的次数
                context.idx = 0;
                context.stepY = diffY / context.max;    //  移动的间隔
                context.baseY = startAbsY;    //  移动的间隔
            },
            run: function (context) {
                context.idx++;
                this.config.revise[1] = context.baseY + context.stepY * context.idx;
            },
            isOver: function (context) {
                return context.idx >= context.max;
            }
        }
        return this.todo('moveAbsY', _config, fn)
    }
    //  doSomeThing
    this.todo = function (doWhat, _config, fn) {
        this.visible = 1;
        var config = _config || {};
        config.step = config.step || 30;
        var last = 0;
        var context = {config: config};
        fn.start.call(this, context);
        //  条件执行 & 结束
        this.beofreOnSceneUpdate[doWhat] = function (ts) {
            //  间隔步进
            if (ts - last < config.step) {
                return false;
            } else {
                last = ts;
            }
            fn.run.call(this, context);
            if (fn.isOver.call(this, context)) {
                this.beofreOnSceneUpdate[doWhat] = null;
                delete this.beofreOnSceneUpdate[doWhat];
                return config.callback && config.callback.call(this);
            }
        }
        return this;
    }

    //  --- 特殊动作
    //  创造属于自己的线，气球专用
    this.makeLine = function () {
        Game.component.makeLine.call(this);
        return this;
    }
    //  支持气球移动（隐藏了不干）
    this.supportPopMove = function () {
        Game.component.supportPopMove.call(this);
        return this;
    }
    //  支持跳跃（隐藏了不干）
    this.supportJump = function () {
        Game.component.supportJump.call(this);
        return this;
    }
    //  根据Ap重绘自身
    this.redrawByAp = function (ap) {
        delete this.beofreOnSceneUpdate['highlight'];
        var frame = this.frame;
        var select = 0;
        for (i in frame) {
            if (ap >= i) {
                select = frame[i];
            }
        }
        return this.redraw(select);
    }

    //  --- 初始化组件，更新位置，绘制自己的第0个资源
    this.updatePosition();
    return this.redraw(0);
}

//  创造气球的线
Game.component.makeLine = function () {


    var scale = this.game.config.scale
    this.update = function () {

        //  挂在身上需要清理的组件
        var c = this.onUpdateClearReviseComponent;
        if (c && c.length) {
            for (i in c) {
                c[i].resetBeforeSupportJumpInfoAndHide();
                this.onUpdateClearReviseComponent = [];
            }
        }
    }
    this.update();

    var line = game.addComponent({
        uid: 'line', //+ setTimeout(Function, 1),
        isCenter: this, revise: [0  , this.h ],
        index: this.index + 1,
        visible: 1
    });
    line.w = 100;
    line.h = this.h * 1.5;
    line.host = this;
    line.update = Game.component.drawLine;
    this.line = line;

    Game.component.drawLine.call(line);
}

//  绘制气球的线
Game.component.drawLine = function () {
    var scale = this.game.config.scale;
    this.clean();

    this.ctx.lineWidth = 3 * (scale / 2);
    this.ctx.strokeStyle = 'rgba( ' + (this.host.config.color || '0,0,0') + ',.8)';
    this.ctx.beginPath();
    this.ctx.moveTo(this.w / 2, 5);

    var ctr_x = 50 + this.host.direction[0];
    var ctr_y = 50;

    var end_x = 50;
    var end_y = 100;
    this.ctx.quadraticCurveTo(ctr_x, ctr_y, end_x, end_y);
    this.ctx.stroke();
}
//  气球支持移动
Game.component.supportPopMove = function () {
    if (!this.visible && this.beofreOnSceneUpdate['move']) {
        this.direction = [0, 0];
        return false;
    }
    var gCns = this.game.cns;
    var xRange = [10, Math.max(gCns.width, gCns.height) - 10 - this.w];
    var yRange = [this.h * -3, Math.min(gCns.width, gCns.height)];
    this.onUpdateClearReviseComponent = [];
    this.beofreOnSceneUpdate['move'] = function () {
        if (!this.visible) {
            return false;
        }
        this.x += this.direction[0];
        this.y += this.direction[1]
        //  左右范围
        if (this.x < xRange[0] || this.x > xRange[1]) {
            this.x = this.x < xRange[0] ? xRange[0] + 1 : xRange[1] - 1;
            this.direction[0] *= -1;
            this.line.update();
        }
        //  上(下)范围
        if (this.y < yRange[0]) {
            this.y = yRange[1];
            this.update();
            this.line.update();
        }
    }
    return this;
}
//  玩偶支持跳跃
Game.component.supportJump = function () {

    this.redraw(0);

    this.resetBeforeSupportJumpInfoAndHide = function () {
        if (this._index) {
            this.index = this._index;
            this.config.revise = this._revise;
            this._revise = false;
            this._index = false;
            this.visible = 0;
            this.redraw(0);
            this.resetBeforeSupportJumpInfoAndHide = Function;
            this.config.revisePop.splice(2, 1);
            log("i'll be reset and hide", this.uid);
        }
    }

    if (!this.visible) {
        return false;
    }
    this._dontMoving = false;
    this._revise = false;

    //  清除掉点中的气球
    this.game.touchPop = false;

    //  开始高亮
    this.beofreOnSceneUpdate['highlight'] = function (ts) {
        var s = ((Date.now() / 1000) >>> 0) % 2;
        if (this._highlight_limit != s) {
            this._highlight_limit = s;
            this.redraw(this._highlight_limit)
        }
    }

    var jump = function (touch) {
        //  不可见 enableMove
        if (!this.visible || this._dontMoving) {
            return false;
        }
        this._dontMoving = true;
        //  藏好定位信息
        this._revise = this.config.revise;
        this.config.revise = [0, 0];

        //  计算2段跳
        var point = {start: {x: this.x, y: this.y}};

        point.up = {x: (touch.x + point.start.x) / 2, y: 0}


        if (this.game.touchPop) {
            point.target = {x: this.game.touchPop.x, y: this.game.touchPop.y};

            log('before targe.x', point.target.x);

            point.target.x += game.config.fps * this.game.touchPop.direction[0];
            point.target.y += game.config.fps * this.game.touchPop.direction[1];

            //  @todo target.x 需要修正边界问题
            if (point.target.x < 10) {
                point.target.x = Math.abs(point.target.x) + 10;

            }

            if (point.target.x > this.game.width()) {

                point.target.x = this.game.width() * 2 - this.game.touchPop.w * 2 - point.target.x
                log('fix target.x', point.target.x);
            }

            point.target.x += this.config.revisePop[0];
            point.target.y += this.config.revisePop[1];

            //  @todo up.x 需要根据 target.y 修正，越接近越难忘~
            //  ...

            if (point.target.y < 300) {
                var diff = 300 - Math.abs(point.target.y);
            }
            log('revisePop + direction*fps + targe.x', point.target.x);
        } else {
            point.target = {x: touch.x, y: this.game.height() + 200 };

            // 修正 x 超出了边界
            if (point.target.x > this.game.width() - 200) {
                point.target.x -= 200;
            }
        }


        point.up.step = {x: (point.up.x - point.start.x) / 100, y: (point.up.y - point.start.y) / 100}
        point.target.step = {x: (point.target.x - point.up.x) / 100, y: (point.target.y - point.up.y) / 100}


        log('start Jump', this);
        //  开始1段跳，跳完后， 允许下个人跳  && (修改跟随 or 失败露脸)
        Game.fx.call(this, {fn: function (ap, isDone) {
            if (isDone) {
                //  开始2段跳,临时提高玩偶的 index
                this._index = this.index;
                this.index = 150;
                this.zoom = 1;
                this.redrawByAp(100);
                Game.fx.call(this, {fn: function (ap, isDone) {

                    this.redrawByAp(ap + 100);
                    if (isDone) {


                        if (this.game.touchPop) {
                            this.game.resetScore((this.game.score += 1));
                            //  跳完挂在气球上
                            this.config.revise = this.config.revisePop;
                            this.config.revise.push(this.game.touchPop);
                            //  延迟到气球 update 的时候更新
                            this.game.touchPop.onUpdateClearReviseComponent.push(this)

                            log('Jump over', this.game.touchPop.x);
                        } else {
                            // 失败动画,shy 之后要复位
                            this.redrawByAp(201);
                            Game.component.dollShy.call(this, this.resetBeforeSupportJumpInfoAndHide);
                        }

                        //  结束了
                        if (this.game.doll.length <= 0) {
                            return setTimeout(function () {
                                this.game.toViewOver()
                            }, 2000);
                        }
                        //  @error 立刻释放了 touchPop 导致挂载不正确
                        this.game.doll.shift().supportJump();

                    }
                    this.x = point.target.step.x * ap + point.up.x;
                    this.y = point.target.step.y * ap + point.up.y;

                }, ease: "easeIn"});
                return false;

            } else {
                this.zoom = 1 + .5 * ap / 100;
                this.x = point.up.step.x * ap + point.start.x;
                this.y = point.up.step.y * ap + point.start.y;
                this.redrawByAp(ap);
            }
        }, ease: "easeOut"})
    }
    //  延迟触发好让气球先被抓住
    this.onSceneTouch = function (touch) {
        var me = this;
        setTimeout(function () {
            jump.call(me, touch)
        }, 1);
    }
}
Game.component.dollShy = function (callback) {
    var startY = this.y - this.h / 4 * (this.game.config.scale / 2);
    Game.fx.call(this, {fn: function (ap, isDone) {
        this.y = startY - ap * 3 >>> 0;
        if (isDone) {
            startY = this.y
            Game.fx.call(this, {fn: function (ap, isDone) {
                this.y = startY + ap * 3 >>> 0;
                if (isDone) {
                    callback.call(this);
                }
            }, duration: 1000, ease: 'easeIn'});
        }
    }, duration: 1000, ease: 'easeOut'});
}


/*
 * Game.fx.call( component,{fn: function (ap , isFinal) {},dura:500 ,ease:'easeOut')
 * */
Game.fx = function (_set) {
    (function (context, _set) {
        var set = _set || {};
        set.me = context;
        set.st = Date.now();
        set.duration = set.duration || 500;
        set.s = set.s || 0;
        set.e = set.e || 100;
        set.fn = set.fn || function (p) {
        }
        set.ease = Game.fx.ease[set.ease || 'linear'];
        set.id = setTimeout(Function, 1);
        set.me.beofreOnSceneUpdate['fx_' + set.id] = function (last) {
            if (set.st + set.duration < last) {
                set.fn.call(set.me, 100, true)
                delete set.me.beofreOnSceneUpdate['fx_' + set.id];
                return false;
            }
            var ts = Date.now() - set.st;
            var pe = set.ease(ts, set.s, set.e, set.duration);
            return set.fn.call(set.me, pe, false);
        };
    })(this, _set);
    return this;
}
Game.fx.ease = {
    linear: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    }
}

// js/Game.js <<<<<
// >>>>> js/load.js 
//  0.加载
var load = function (imgs) {
    for (key in imgs) {
        load.max++;
        load.src[key] = new Image();
        load.src[key].onload = load.check;
        load.src[key].src = imgs[key];
    }
}
load.check = function () {
    load.done++;
    log('load ' + load.done, this);
    if (load.done >= load.max) {
        log('load done!');
        load.explodeResource();
    }
}
load.src = {};
load.max = 0;
load.done = 0;

//  加载时候的不同状态
load.status = function (state) {

    g('init').className = '';
    g('readyGo').className = '';
    g('unSupportBrowser').className = '';
    g('networkSlower').className = '';
    g('lowScreen').className = '';


    switch (state) {
        case 'init':
            g(state).className = 'showing';
            break;
        case 'readyGo':

            //  必须是初始状态才可以进入
            if (load.status.state != 'init') {
                return;
            }
            g(state).className = 'showing';
            setTimeout(function () {
                if (g('loading_wrap').className != 'hide') {
                    g('go').innerHTML = '3';
                    game ? game.config.pause = 1 : '';
                }
            }, 1000)
            setTimeout(function () {
                g('go').innerHTML = '2';
            }, 2000)
            setTimeout(function () {
                g('go').innerHTML = '1';
            }, 3000)
            setTimeout(function () {
                g('go').innerHTML = 'Go';
            }, 4000);
            setTimeout(function () {
                if (g('loading_wrap').className != 'hide') {
                    g('loading_wrap').className = 'hide';
                    game.config.pause = 0;
                }
            }, 5000);
            break;
        case 'unSupportBrowser':
            g(state).className = 'showing';
            break;
        case 'networkSlower':
            //  只有初始状态才触发相应动作
            if (load.status.state != 'init') {
                return;
            }
            game ? game.config.pause = 1 : '';
            g(state).className = 'showing';
            break;
        case 'lowScreen':
            oGame.config.pause = 1;
            g(state).className = 'showing';
            break;
        case 'startGame':
            game.config.pause = 0;
            g('loading_wrap').className = 'hide';
            break;
        default:
    }
    load.status.state = state;
    return false;
}
load.status('init');

//  检测系统状态,返回 false 不会执行 game.init
load.checkStatus = function () {

    //  网络慢延迟提示
    setTimeout(function () {
        load.status('networkSlower');
    }, 70 * 1000);

//    //  Android 下不支持的浏览器提示
//    if ((u.indexOf('UCBrowser') > -1 || u.indexOf('QQBrowser') > -1 ) && u.indexOf('Android') > -1) {
//        return load.status('unSupportBrowser');
//    }

    //  屏幕太小的提示在 resize 中;
    return true;
}

//  旋转侦测
load.onResize = function (fn, me) {
    load.onResize.fn.push(fn);
    load.onResize.me.push(me);
    window.onresize();
}
load.onResize.fn = [];
load.onResize.me = [];
window.onresize = function () {
    log('window onresize');

    var d = document;
    var w = (d.documentElement ? d.documentElement.clientWidth : d.body.clientWidth );
    var h = (d.documentElement ? d.documentElement.clientHeight : d.body.clientHeight);

    var max = load.onResize.fn.length;
    for (var s = 0; s < max; s++) {
        load.onResize.fn[s].call(load.onResize.me[s], {w: w || 0, h: h || 0});
    }
    log('w: ' + w + ' h: ' + h);
}

//  loading 的旋转侦测
load.onResize(function (size) {
    if (this.className == 'hide') {
        return false;
    }
    this.className = size.w > size.h ? '' : 'rotated';


    var real_w = Math.max(size.w, size.h);
    var real_h = Math.min(size.w, size.h);

    this.style.width = real_w + 'px';
    this.style.height = real_h + 'px';


    if (size.w < size.h) {
        this.style.left = -(real_w - real_h) / 2 + 'px';
        this.style.top = (real_w - real_h) / 2 + 'px';
    } else {
        this.style.left = '0';
        this.style.top = '0';
    }
    if (real_w < 320) {
        load.status('lowScreen');
    }
}, g('loading_wrap'))





// js/load.js <<<<<
// >>>>> js/load.canvas.js 
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
// js/load.canvas.js <<<<<
// >>>>> js/load.explodeResource.js 
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


// js/load.explodeResource.js <<<<<
// >>>>> js/load.resource.js 
load.resource = {
    //  column 1
    bear: {src: 'c1', x: 0, y: 0, w: 440, h: 2304, split: 6},
    girl: {src: 'c1', x: 0, y: 2304, w: 488, h: 2970, split: 7},
    otako: {src: 'c1', x: 0, y: 5274, w: 402, h: 7378 - 5274, split: 6},
    //  column 2
    kato: {src: 'c2', x: 0, y: 0, w: 928 - 488, h: 4992, split: 13},
    uncle: {src: 'c2', x: 0, y: 4992, w: 1039 - 488, h: 7872 - 4992, split: 6},
    //  column 3
    r2015: {src: 'c3', x: 0, w: 1321 - 1039, y: 0, h: 3452, split: 31},
    //  column 4
    cheer: {src: 'c4', x: 0, w: 1650 - 1321, y: 0, h: 8216, split: 50},
    //  column 5
    firework: {src: 'c5', x: 0, w:238, y: 0, h: 6912, split: 50, scale: 2},
    //  column 6
    balls: {src: 'c6', x: 0, w: 180, y: 0, h: 1133, split: 4 },                //  统一气球
    stand: {src: 'c6', x: 0, w: 2316 - 1898, y: 1133, h: 1414 - 1133 },

    count: {src: 'c6', x: 0, w: 1981 - 1898, y: 1731, h: 1959 - 1731, split: 2, scale: .57},    //  统计面板
    icons: {src: 'c6', x: 0, w: 2398 - 1898 - 3, y: 1959, h: 2137 - 1959, vsplit: 3, scale: .5},    //  统一图标
    _text: {src: 'c6', x: 0 + 112, w: 120, y: 2137, h: 2218 - 2137, scale: .5},
    logo: {src: 'c6', x: 0, w: 2479 - 1898, y: 2218, h: 2297 - 2218 },
    button: {src: 'c6', x: 0, w: 2176 - 1898, y: 2297, h: 2699 - 2297, split: 3, scale: .5},

    words: {src: 'words', x: 0, w: 780, y: 0, h: 300, split: 6, scale: 1.2}
};
// js/load.resource.js <<<<<
// >>>>> js/load.game.2x.js 
// 游戏的主要逻辑定义
load.game = function () {

    log('new game ...')

    game = new Game({fps: 30, resource: load.resource });

    var logo = game.addComponent({uid: 'logo', isCenter: true, revise: [0, 0], index: 10});
    var stand = game.addComponent({uid: 'stand', isCenter: logo, index: 2, revise: [-10, -30], visible: 0});

    var count_0 = game.addComponent({uid: 'count', x: 60, y: 50, index: 1});
    var count_1 = game.addComponent({uid: 'count', revise: [50, 0, count_0], index: 1});
    var count_2 = game.addComponent({uid: 'count', revise: [50, 0, count_1], index: 1});
    var count_3 = game.addComponent({uid: 'count', revise: [50, 0, count_2], index: 1});
    var count_4 = game.addComponent({uid: 'count', revise: [50, 0, count_3], index: 1});

    var firework = game.addComponent({uid: 'firework', isCenter: logo, revise: [-10, -50], index: 10});
    var r2015 = game.addComponent({uid: 'r2015', isCenter: logo, revise: [0, 0], index: 21});
    var cheer = game.addComponent({uid: 'cheer', isCenter: r2015, revise: [-10, -34], index: 22});

    var words = game.addComponent({uid: 'words', isCenter: logo, revise: [0, 90], index: 1});


    var button_weixin = game.addComponent({uid: 'button', isCenter: logo, revise: [-180, 160]});
    var button_weibo = game.addComponent({uid: 'button', isCenter: logo, revise: [0, 160]});
    var button_again = game.addComponent({uid: 'button', isCenter: logo, revise: [180, 160]});

    var icon_bdmap = game.addComponent({uid: 'icons', isCenter: button_weibo, revise: [-100, 100] });
    var icon_baidu = game.addComponent({uid: 'icons', isCenter: button_weibo, revise: [0, 100]});
    var icon_tieba = game.addComponent({uid: 'icons', isCenter: button_weibo, revise: [100, 100]});

    var icon_text = game.addComponent({uid: '_text', isCenter: icon_tieba, revise: [100, 20]});


    var uncle = game.addComponent({uid: 'uncle', index: 116, revise: [ 157, 25, stand], revisePop: [70, 200]});
    var kato = game.addComponent({uid: 'kato', index: 117, revise: [ 120, -15, stand], revisePop: [-130, 190]});
    var otako = game.addComponent({uid: 'otako', index: 118, revise: [ 203, 102, stand], revisePop: [-130, 200]});
    var girl = game.addComponent({uid: 'girl', index: 119, revise: [ 45, 85, stand], revisePop: [-90, 190]});
    var bear = game.addComponent({uid: 'bear', index: 120, revise: [ 110, 80, stand], revisePop: [-120, 220]});

    log('game component added over!');
// >>>>> js/load.game.public.js 
log(u);
log(location.href)

bear.frame = { 0: '0', 1: '1', 2: '2', 100: '3', 190: '4', 201: '5'};
girl.frame = { 0: '0', 1: '1', 2: '2', 10: '3', 101: '4', 190: '5', 201: '6'};
otako.frame = { 0: '0', 1: '1', 2: '2', 100: '3', 190: '4', 201: '5'};
kato.frame = { 0: '0', 1: '1', 2: '2', 10: '3', 20: '4', 30: '5', 40: '6', 50: '7', 60: '8', 70: '9', 100: '10', 101: '11', 201: '12'};
uncle.frame = { 0: '0', 1: '1', 2: '2', 100: '3', 190: '4', 201: '5'};

icon_baidu.href = ['http://wuxian.baidu.com/baidusearch/?from=1006979s', 'http://mo.baidu.com/baidusearch/ios.php?from=1006979y']
icon_bdmap.href = ['http://wuxian.baidu.com/map/', 'http://mo.baidu.com/map/']
icon_tieba.href = ['http://c.tieba.baidu.com/c/s/download/pc?src=webtbGF', 'http://c.tieba.baidu.com/c/s/download/wap?src=mobaidu']
icon_text.href = ['http://www.baidu.com/more/', 'http://mo.baidu.com/']

button_weibo.href = 'http://service.weibo.com/share/share.php?url=' + location.href + '&title=%E7%99%BE%E5%BA%A6%E7%A5%9D%E4%BD%A0%E5%85%83%E6%97%A6%E5%BF%AB%E4%B9%90,%E6%96%B0%E5%B9%B4%E7%A6%8F%E6%B0%94%E6%8A%93%E6%8A%93%E6%8A%93,%E4%B8%8A%E7%99%BE%E5%BA%A6%E9%A6%96%E9%A1%B5,%E7%A6%8F%E6%B0%94%E4%B8%80%E6%8A%93%E4%B8%80%E5%A4%A7%E6%8A%8A!';

words.href = ['http://www.baidu.com/s?wd=%E5%85%83%E6%97%A6&tn=SE_pshlcjsy_xef5bmh9','https://m.baidu.com/from=844b/s?word=%E5%85%83%E6%97%A6&sa=tb&ts=9537094&t_kt=428&ss=100']
//  添加气球
//  {red: '255,79,58', blue: '80,168,240', green: '17,198,38', yellow: '245,190,48'};
game.pops = [];
game.popMax = 8;
game.popColor = ['255,79,58', '245,190,48', '17,198,38', '80,168,240'];
for (var i = 0; i < game.popMax; i++) {
    var pop = game.addComponent({uid: 'balls', index: 200 + i * 2, color: game.popColor[i % 4]});
    pop.redraw(i % 4);
    //  更新气球的方向，如果是PC端速度*2
    pop.direction = [(Math.random() * 999 >>> 0) % 10 - 10, (Math.random() * 999 >>> 0) % 5 - 10]
    //pop.direction = [(Math.random() * 999 >>> 0) % 10 - 10,0]

    pop.direction[0] *= game.config.scale;
    pop.direction[1] *= game.config.scale;
    if (game.height() > 640) {
        pop.direction[0] *= (game.height() / 640);
        pop.direction[1] *= (game.height() / 640);
    }

    pop.makeLine();
    pop.supportPopMove();
    game.pops.push(pop);
}
//  初始化气球
game.resetPop = function () {
    log('resetPop start');
    //  重新调整位置
    var max = game.pops.length
    for (var i = 0; i < max; i++) {

        game.pops[i].visible = 1;
        game.pops[i].line.visible = 1;
        game.pops[i].x = game.width() / game.popMax * i;
        game.pops[i].y = 2 * game.height() - Math.random() * 99;
        game.pops[i].onTouchMe = function () {
            if (!this.game.touchPop) {
                this.game.touchPop = this;
                log('game.touchPop xy:', this.x, this.y);
            }
        }
    }
    log('resetPop');
}

//  积分设置

game.resetScore = function (n) {
    var n = n || 0;
    var score = [count_0, count_1, count_2, count_3, count_4];
    for (var i = 0; i < 5; i++) {
        score[i].visible = 1;
        score[i].redraw(i < n ? 0 : 1);
    }
    log('resetScore ' + n);
}
//  初始化游戏中的玩偶跳跃
game.resetDoll = function () {
    game.doll = [bear, girl, otako, kato, uncle];
    //  轮流跳跃
    game.doll.shift().supportJump();
    for (s in game.doll) {
        game.doll[s].resetBeforeSupportJumpInfoAndHide && game.doll[s].resetBeforeSupportJumpInfoAndHide();
        game.doll[s].visible = 1;
    }
    log('resetDoll');
}


//  开始游戏场景的一些动作
game.actionStart = function () {
    log('game action start');
    game.score = 0;
    game.resetScore();
    game.resetPop();
    game.resetDoll();
}

game.toViewStart = function () {
    
    _hmt && _hmt.push(['_trackEvent', 'view', 'start', 1]);

    game.hideAll();
    setTimeout(function () {
        logo.play().moveAbsY({to: 0})
        stand.play();
        bear.redraw(1).visible = 1;
        girl.play({max: 1});
        otako.play({max: 1});
        kato.play({max: 1});
        uncle.play({max: 1});
        game.actionStart();

    }, 100)


}

game.toViewOver = function () {

    _hmt && _hmt.push(['_trackEvent', 'view', 'over', game.score]);

    var rate = game.config.scale / 2;
    game.hideAll();
    log('game view over start');

    game.resetScore(game.score);
    var _logo_done = function () {
        words.redraw(game.score).visible = 1;

        button_weixin.redraw(0).visible = 1;
        button_weibo.redraw(1).visible = 1;
        button_again.redraw(2).visible = 1;

        icon_bdmap.redraw(0).visible = 1;
        icon_baidu.redraw(1).visible = 1;
        icon_tieba.redraw(2).visible = 1;

        icon_text.play();

    }
    var _firework_done = function () {
        this.visible = 0;
        logo.moveAbsY({to: -100 * rate, callback: _logo_done})
    }
    var _cheer_done = function () {
        firework.play({callback: _firework_done})
    }
    var _r2015_done = function () {
        setTimeout(function () {
            this.visible = 0;
        }, 100)
        cheer.visible = 1;
        cheer.play({callback: _cheer_done});
    }
    logo.play();
    r2015.play({callback: _r2015_done})
}
//game.toViewOver();
game.toViewStart();

//  统计信息
button_again.name = "button_again";
button_weixin.name = "button_weixin";
button_weibo.name = "button_weibo";
words.name = "words";

icon_tieba.name = "icon_baidu"
icon_bdmap.name = "icon_bdmap"
icon_baidu.name = "icon_baidu"
icon_text.name = "icon_text"


button_again.onTouchMe = function () {
    _hmt && _hmt.push(['_trackEvent', 'button', 'click', this.name]);
    setTimeout(game.toViewStart, 300);
}
button_weixin.onTouchMe = function () {
    _hmt && _hmt.push(['_trackEvent', 'button', 'click', this.name]);
    g("weixin_share").className = "";
}

words.onTouchMe = function () {
    _hmt && _hmt.push(['_trackEvent', 'words', 'click', this.name]);
    window.open(this.href[this.game.isMobile >>> 0], '_blank');
}

button_weibo.onTouchMe = function () {
    _hmt && _hmt.push(['_trackEvent', 'button', 'click', this.name]);
    window.open(this.href, '_blank');
}
icon_text.onTouchMe = icon_tieba.onTouchMe = icon_bdmap.onTouchMe = icon_baidu.onTouchMe = function () {
    _hmt && _hmt.push(['_trackEvent', 'icon', 'click', this.name]);
    window.open(this.href[this.game.isMobile >>> 0], '_blank')
}

// js/load.game.public.js <<<<<


}


// js/load.game.2x.js <<<<<
// >>>>> js/share.js 
var imgUrl = r_path + '/share.jpg';
var lineLink = location.href;
var shareTitle = '新年福气抓抓抓';
var descContent = '上百度首页，福气一抓一大把';
var appid = '';

function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
        "appid": appid,
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function (res) {
        //_report('send_msg', res.err_msg);
    })
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function (res) {
        //_report('timeline', res.err_msg);
    });
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo', {
        "content": descContent,
        "url": lineLink
    }, function (res) {
        //_report('weibo', res.err_msg);
    });
}
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        shareFriend();
    });
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        shareTimeline();
    });
    WeixinJSBridge.on('menu:share:weibo', function (argv) {
        shareWeibo();
    });
}, false);

// js/share.js <<<<<

load({
    //'test': 'img.php?n=n.png&s=1000,1000&c=200,0,0',
    'c1': r_path + '/2x/c1.png',
    'c2': r_path + '/2x/c2.png',
    'c3': r_path + '/2x/c3.png',
    'c4': r_path + '/2x/c4.png',
    'c5': r_path + '/2x/c5.png',
    'c6': r_path + '/2x/c6.png',
    'words': r_path + '/words.png'
})
//当前体积：19.59KB | 原始体积：36.29KB | 比率：53.97% | Gziped: 6.27KB
// js/index.2x.js <<<<<