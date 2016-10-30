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




