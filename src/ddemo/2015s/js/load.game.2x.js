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
    // @import load.game.public.js


}

