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
