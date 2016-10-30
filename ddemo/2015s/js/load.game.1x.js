// 游戏的主要逻辑定义
load.game = function () {

    log('new game ...')

    game = new Game({fps: 30, resource: load.resource, scale: 1 });

    logo = game.addComponent({uid: 'logo', isCenter: true, revise: [0, 0], index: 10});
    stand = game.addComponent({uid: 'stand', isCenter: logo, index: 2, revise: [-10 / 2, -30 / 2], visible: 0});

    count_0 = game.addComponent({uid: 'count', x: 30, y: 25, index: 1});
    count_1 = game.addComponent({uid: 'count', revise: [50 / 2, 0, count_0], index: 1});
    count_2 = game.addComponent({uid: 'count', revise: [50 / 2, 0, count_1], index: 1});
    count_3 = game.addComponent({uid: 'count', revise: [50 / 2, 0, count_2], index: 1});
    count_4 = game.addComponent({uid: 'count', revise: [50 / 2, 0, count_3], index: 1});

    firework = game.addComponent({uid: 'firework', isCenter: logo, revise: [-10 / 2, -50 / 2], index: 10});
    r2015 = game.addComponent({uid: 'r2015', isCenter: logo, revise: [0, 0], index: 21});
    cheer = game.addComponent({uid: 'cheer', isCenter: r2015, revise: [-10 / 2, -34 / 2], index: 22});

    words = game.addComponent({uid: 'words', isCenter: logo, revise: [0, 100 / 2], index: 1});


    button_weixin = game.addComponent({uid: 'button', isCenter: logo, revise: [-180 / 2, 180 / 2]});
    button_weibo = game.addComponent({uid: 'button', isCenter: logo, revise: [0, 180 / 2]});
    button_again = game.addComponent({uid: 'button', isCenter: logo, revise: [180 / 2, 180 / 2]});

    icon_bdmap = game.addComponent({uid: 'icons', isCenter: button_weibo, revise: [-100 / 2, 100 / 2] });
    icon_baidu = game.addComponent({uid: 'icons', isCenter: button_weibo, revise: [0, 100 / 2]});
    icon_tieba = game.addComponent({uid: 'icons', isCenter: button_weibo, revise: [100 / 2, 100 / 2]});

    icon_text = game.addComponent({uid: '_text', isCenter: icon_tieba, revise: [100/2, 20 / 2]});

    uncle = game.addComponent({uid: 'uncle', index: 116, revise: [ 157 / 2, 25 / 2, stand], revisePop: [70 / 2, 200 / 2]});
    kato = game.addComponent({uid: 'kato', index: 117, revise: [ 120 / 2, -15 / 2, stand], revisePop: [-130 / 2, 190 / 2]});
    otako = game.addComponent({uid: 'otako', index: 118, revise: [ 203 / 2, 102 / 2, stand], revisePop: [-130 / 2, 200 / 2]});
    girl = game.addComponent({uid: 'girl', index: 119, revise: [ 45 / 2, 85 / 2, stand], revisePop: [-90 / 2, 190 / 2]});
    bear = game.addComponent({uid: 'bear', index: 120, revise: [ 110 / 2, 80 / 2, stand], revisePop: [-120 / 2, 220 / 2]});

    log('game component added over!');

    // @import load.game.public.js
}

