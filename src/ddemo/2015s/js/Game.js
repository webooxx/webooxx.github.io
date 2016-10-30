// @import Cookie.js
// @import Array.prototype.sort.js

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

    // @import Game.component.redraw.js

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
                        if (this.game.doll.length <= 3="" 4="" 0)="" {="" return="" settimeout(function="" ()="" this.game.toviewover()="" },="" 2000);="" }="" @error="" 立刻释放了="" touchpop="" 导致挂载不正确="" this.game.doll.shift().supportjump();="" this.x="point.target.step.x" *="" ap="" +="" point.up.x;="" this.y="point.target.step.y" point.up.y;="" ease:="" "easein"});="" false;="" else="" this.zoom="1" .5="" 100;="" point.start.x;="" point.start.y;="" this.redrawbyap(ap);="" "easeout"})="" 延迟触发好让气球先被抓住="" this.onscenetouch="function" (touch)="" var="" me="this;" jump.call(me,="" touch)="" 1);="" game.component.dollshy="function" (callback)="" starty="this.y" -="" this.h="" (this.game.config.scale="" 2);="" game.fx.call(this,="" {fn:="" function="" (ap,="" isdone)="">>> 0;
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
</=>