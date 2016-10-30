var game;

var log = function () {
}
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/// @import log.js

// @import browser.js
// @import Game.js

// @import load.js
// @import load.canvas.js
// @import load.explodeResource.js

// @import load.resource.js
// @import load.game.2x.js

// @import share.js

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