/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_Gomoku__ = __webpack_require__(30);



window.oDOM = new __WEBPACK_IMPORTED_MODULE_0__lib_Gomoku__["a" /* default */]({ id: 'appDom', renderType: 'dom' });
window.oCanvas = new __WEBPACK_IMPORTED_MODULE_0__lib_Gomoku__["a" /* default */]({ id: 'appCanvas', renderType: 'canvas' });

oDOM.restart(false);
oCanvas.restart(false);

[["2_4", "black"], ["2_5", "white"], ["2_6", "black"], ["2_7", "white"], ["2_8", "black"], ["2_9", "white"], ["2_10", "black"], ["2_11", "white"], ["3_11", "black"], ["4_11", "white"], ["5_11", "black"], ["6_11", "white"], ["7_11", "black"], ["8_11", "white"], ["9_11", "black"], ["10_11", "white"], ["11_11", "black"], ["12_11", "white"], ["12_10", "black"], ["12_9", "white"], ["12_8", "black"], ["12_7", "white"], ["12_6", "black"], ["12_5", "white"], ["12_4", "black"], ["6_10", "white"], ["6_9", "black"], ["6_8", "white"], ["6_7", "black"], ["7_7", "white"], ["8_7", "black"], ["8_8", "white"], ["8_9", "black"], ["8_10", "white"], ["7_10", "black"], ["7_9", "white"], ["7_8", "black"], ["1_4", "white"], ["1_5", "black"], ["1_6", "white"], ["1_8", "black"], ["1_7", "white"], ["1_9", "black"], ["1_10", "white"], ["1_11", "black"], ["13_11", "white"], ["13_10", "black"], ["13_9", "white"], ["13_8", "black"], ["13_7", "white"], ["13_6", "black"], ["13_5", "white"], ["13_4", "black"]].forEach(i => {
    oDOM.setIn(i[0]);
    oCanvas.setIn(i[0]);
});

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(28);


class Component {

    constructor(size, pos, zIndex) {

        const oCanvas = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* createCanvas */](size);

        this.size = size;
        this.pos = pos || [0, 0];
        this.zIndex = zIndex || 0;
        this.registEvents = [];

        this.events = {};
        this.$el = oCanvas.$el;
        this.$canvas = oCanvas.$canvas;
        this.id = oCanvas.id;

        this.$canvas.width = this.size[0];
        this.$canvas.height = this.size[1];

        return this;
    }

    init() {
        this.drawSelf && this.drawSelf();
    }

    //  绘制自身并且通知舞台更新
    drawSelfAndUpdateStage() {
        this.drawSelf();
        this.$stage.drawComponents();
    }

    //  清楚自身内容
    clear() {
        const w = this.size[0];
        const h = this.size[1];
        this.$canvas.clearRect(0, 0, w, h);
    }

    getRegion() {
        let region = []; // [start_x,end_x,start_y,end_y];

        region[0] = this.pos[0];
        region[1] = this.pos[0] + this.size[0];

        region[2] = this.pos[1];
        region[3] = this.pos[1] + this.size[1];

        this.region = region;
        return region;
    }

    //  检查一个坐标是否被自己包含
    checkPosInRegion(pos) {
        const region = this.getRegion();
        return pos.x >= region[0] && pos.x <= region[1] && pos.y >= region[2] && pos.y <= region[3];
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Component;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PiecesComponent__ = __webpack_require__(23);
/**
 * @file 游戏中心
 */



class BoardComponent extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* default */] {

    constructor(size, pos) {

        const zIndex = 9;
        super(size, pos, zIndex);
        this.pos = pos;
        this.size = size;

        this.step = 30 * 2; //  每个格子宽度
        this.registEvents = ['click', 'mousemove'];

        return this;
    }

    /**
     * 由舞台调用的初始化操作
     */
    init() {

        //  加载4个常驻资源
        this.whitePreviewPieces = new __WEBPACK_IMPORTED_MODULE_1__PiecesComponent__["a" /* default */]('rgba(255,255,255,.5)', [-999, 0]);
        this.blackPreviewPieces = new __WEBPACK_IMPORTED_MODULE_1__PiecesComponent__["a" /* default */]('rgba(0,0,0,.5)', [-999, 0]);

        this.whitePieces = new __WEBPACK_IMPORTED_MODULE_1__PiecesComponent__["a" /* default */]('white', [-999, 0]);
        this.blackPieces = new __WEBPACK_IMPORTED_MODULE_1__PiecesComponent__["a" /* default */]('black', [-999, 0]);

        this.$stage.addComponent(this.whitePreviewPieces);
        this.$stage.addComponent(this.blackPreviewPieces);

        this.$stage.addComponent(this.whitePieces);
        this.$stage.addComponent(this.blackPieces);

        //  绘制自身
        this.drawSelf();
    }

    /**
     * 绘制棋盘
     */
    drawSelf(setInOrder) {
        this.clear();

        const $board = this;
        const ctx = this.$canvas;
        const w = this.size[0];
        const h = this.size[1];
        const step = this.step;
        const o = step / 2;
        ctx.fillStyle = 'rgba(133,94,66,.8)';
        ctx.fillRect(0, 0, w, h);
        ctx.fill();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";

        //  绘制横线
        for (let i = 0; i < 15; i++) {
            let y = step * i + o; //  y 的位置，需要加上偏移（向下半格）

            ctx.moveTo(0 + o, y);
            ctx.lineTo(w - o, y); //  绘制横线，从偏移起始位置，画到个宽度位置减去偏移
        }
        //  绘制竖线
        for (let i = 0; i < 15; i++) {
            let x = step * i + o;
            ctx.moveTo(x, 0 + o);
            ctx.lineTo(x, h - o);
        }
        ctx.stroke();

        const r = this.whitePieces.r;

        setInOrder && setInOrder.forEach((item, i) => {

            let color = item[1];
            let gridPos = item[0].split('_');

            gridPos[0] -= 0;
            gridPos[1] -= 0;

            let realPos = $board.getRealPos(gridPos);
            let x = realPos[0] - $board.pos[0];
            let y = realPos[1] - $board.pos[1];
            const component = this[color + 'Pieces'];
            ctx.drawImage(component.$el, 0, 0, r, r, x, y, r, r);
        });
    }

    /**
     * 格式化落子位置为 1,1 ,14,14
     * @param pos 位置信息{x,y}
     * @returns {[*,*]}
     */
    getGridPos(pos) {

        let x = pos.x - this.pos[0] - 30;
        let y = pos.y - this.pos[1] - 30;
        //
        x = Math.abs((x / this.step).toFixed() - 0);
        y = Math.abs((y / this.step).toFixed() - 0);
        //
        x = Math.min(x, 14);
        y = Math.min(y, 14);

        // console.log(x, y);

        return [x, y];
    }

    /**
     * 格式化grid position为实际位置
     * @param gridPos    网格位置信息[1,2]
     * @returns {Array}
     */
    getRealPos(gridPos) {

        const $board = this;
        const r = $board.whitePreviewPieces.r;
        let pos = [];
        pos[0] = $board.pos[0] + $board.step * gridPos[0] + $board.step / 2 - r / 2;
        pos[1] = $board.pos[1] + $board.step * gridPos[1] + $board.step / 2 - r / 2;

        return pos;
    }

    /**
     * 清除预览落子
     */
    hidePreviewPieces() {
        this.whitePreviewPieces.pos = [-999, 0];
        this.blackPreviewPieces.pos = [-999, 0];
        this.$stage.drawComponents();
    }

    /**
     * 更新预览落子
     * @param color
     * @param pos
     */
    updatePreviewPieces(color, pos) {
        this.hidePreviewPieces();
        this[color + 'PreviewPieces'].pos = pos;
        this.$stage.drawComponents();
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BoardComponent;


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(21);


class PiecesComponent extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* default */] {

    constructor(color, pos) {

        const r = 24 * 2;
        const size = [r * 2, r * 2];
        const zIndex = 29;

        super(size, pos, zIndex);

        this.size = size;
        this.color = color;
        this.r = r;

        return this;
    }

    //  绘制自身
    drawSelf() {

        const ctx = this.$canvas;
        const r = this.r;

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(r / 2, r / 2, r / 2, 0, 2 * Math.PI);
        ctx.fill();
        return this;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PiecesComponent;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(21);


class TextComponent extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* default */] {

    constructor(text, size, pos) {

        const zIndex = 30;

        super(size, pos, zIndex);

        this.size = size;
        this.text = text;
        this.$board = null;

        this.srcPos = pos;
        this.centerPos = [];

        return this;
    }

    //  绘制自身
    drawSelf() {

        const ctx = this.$canvas;

        ctx.fillStyle = 'rgba(255,255,255,.1)';
        ctx.fillRect(0, 0, this.size[0], this.size[1]);

        ctx.font = 'bold 30px 微软雅黑';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'red';
        ctx.fillText(this.text, this.size[0] / 2, this.size[1] / 4);

        const x = this.$stage.size[0] / 2 - this.size[0] / 2;
        const y = this.$stage.size[1] / 2 - this.size[1] / 2;

        this.centerPos = [x, y];
        return this;
    }

    update(text, isCenter) {

        if (isCenter) {
            this.pos = this.centerPos;
        } else {
            this.pos = this.srcPos;
        }

        this.text = text;
        this.clear();
        this.drawSelf();
        this.$stage.drawComponents();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TextComponent;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 视图基类
 * 具体实现由子对象实现
 */
class View {

    constructor(config) {
        let { $el, $game } = config;
        this.$el = $el;
        this.$game = $game;
        return this;
    }

    /**
     * 更新棋权文本
     */
    gameRightTextUpdate() {}

    /**
     * 更新棋盘信息（所有棋子）
     */
    gameBoardUpdatePieces() {}

    /**
     * 更新棋盘当前的预览落子
     */
    gameBoardUpdatePreview() {}

    static createElement(tagName, pros, parent) {
        let $node = document.createElement(tagName);
        Object.keys(pros).forEach(k => {
            if (k === 'text') {
                $node.innerText = pros[k];
            } else {
                $node.setAttribute(k, pros[k]);
            }
        });
        if (parent) {
            parent.appendChild($node);
        }
        return $node;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = View;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Component_Stage__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Component_BoardComponent__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Component_TextComponent__ = __webpack_require__(24);





const scale = 2;

class ViewCanvas extends __WEBPACK_IMPORTED_MODULE_0__View__["a" /* default */] {
    constructor(config) {

        super(config);

        this._type = 'canvas';

        this.initView();
        this.initEvent();

        return this;
    }

    initView() {
        //  舞台
        this.$stage = new __WEBPACK_IMPORTED_MODULE_1__Component_Stage__["a" /* default */]([800 * scale, 600 * scale]);

        //  界面元素
        this.$board = new __WEBPACK_IMPORTED_MODULE_2__Component_BoardComponent__["a" /* default */]([450 * 2, 450 * 2], [(800 * 2 - 450 * 2) / 2, (600 * 2 - 450 * 2) / 2]);
        this.$rightText = new __WEBPACK_IMPORTED_MODULE_3__Component_TextComponent__["a" /* default */]('开始游戏!', [250 * 2, 40 * 2], [(800 * 2 - 250 * 2) / 2, 15 * 2]);
        this.$undoText = new __WEBPACK_IMPORTED_MODULE_3__Component_TextComponent__["a" /* default */]('悔棋', [120 * 2, 35 * 2], [(800 * 2 - 450 * 2) / 2 + 450 * 2 + 50, (600 * 2 - 450 * 2) / 2]);
        this.$cancelUndoText = new __WEBPACK_IMPORTED_MODULE_3__Component_TextComponent__["a" /* default */]('撤销悔棋', [120 * 2, 35 * 2], [(800 * 2 - 450 * 2) / 2 + 450 * 2 + 50, (600 * 2 - 450 * 2) / 2 + 100]);

        //  注册子元素的事件

        this.$rightText.registEvents = ['click'];
        this.$undoText.registEvents = ['click'];
        this.$cancelUndoText.registEvents = ['click'];

        //  界面元素加入到舞台，加入后 stage 会去 component 的 init ，并且会设置其 $stage
        this.$stage.addComponent(this.$board);
        this.$stage.addComponent(this.$rightText);
        this.$stage.addComponent(this.$undoText);
        this.$stage.addComponent(this.$cancelUndoText);

        //  绘制
        this.$stage.drawComponents();
        this.$el.appendChild(this.$stage.$el);
    }

    /**
     * 初始化事件
     */
    initEvent() {
        let $game = this.$game;
        //  开始游戏
        this.$rightText.onClick = function () {
            if ($game.inGame) {
                return false;
            }
            // console.log('重新开始');
            $game.restart(true);
        };
        //  悔棋 & 撤销悔棋
        this.$undoText.onClick = function () {
            $game.undo();
        };
        this.$cancelUndoText.onClick = function () {
            $game.cancelUndo();
        };
        //  棋子预览处理
        this.$board.onMouseMove = function (evtPos) {
            const gridPos = this.getGridPos(evtPos);
            if (!$game.inGame || !$game.checkAllowSetIn(gridPos.join('_'))) {
                this.hidePreviewPieces();
                return false;
            } else {
                let realPos = this.getRealPos(gridPos);
                this.updatePreviewPieces($game.getRightName(), realPos);
            }
            //@todo 待优化，50ms 后立即执行一次
            // clearTimeout(this.timeId);
            // this.timeId = setTimeout(() => {
            // }, 50);
        };
        //  下棋处理
        this.$board.onClick = function (evtPos) {

            const gridPos = this.getGridPos(evtPos);
            if (!$game.inGame) {
                return false;
            }
            $game.setIn(gridPos.join('_'));
        };
    }

    /**
     * 更新棋权文本
     */
    gameRightTextUpdate(text, isCenter) {
        this.$rightText.update(text, !this.$game.inGame);
    }

    /**
     * 更新棋盘信息（所有棋子）
     */
    gameBoardUpdatePieces() {
        this.$board.drawSelf(this.$game.setInOrder);
        this.$stage.drawComponents();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ViewCanvas;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View__ = __webpack_require__(25);


class ViewDom extends __WEBPACK_IMPORTED_MODULE_0__View__["a" /* default */] {

    constructor(config) {
        super(config);
        this._type = 'dom';

        this.$piecesList = {}; //  管理所有棋子

        this.initView();
        this.initEvent();

        return this;
    }

    initView() {

        let $this = this;

        this.$board = __WEBPACK_IMPORTED_MODULE_0__View__["a" /* default */].createElement('div', { class: 'board' }, this.$el);
        this.$rightText = __WEBPACK_IMPORTED_MODULE_0__View__["a" /* default */].createElement('a', { class: 'text gameRight', text: '游戏开始' }, this.$el);
        this.$undoText = __WEBPACK_IMPORTED_MODULE_0__View__["a" /* default */].createElement('a', { class: 'text undo', text: '悔棋' }, this.$el);
        this.$cancelUndoText = __WEBPACK_IMPORTED_MODULE_0__View__["a" /* default */].createElement('a', { class: 'text cancelUndo', text: '撤销悔棋' }, this.$el);
        //  划线
        for (let i = 0; i < 15; i++) {
            let y = i * 30 + 15;
            __WEBPACK_IMPORTED_MODULE_0__View__["a" /* default */].createElement('span', { class: 'lineX', style: 'top:' + y + 'px' }, this.$board);
            __WEBPACK_IMPORTED_MODULE_0__View__["a" /* default */].createElement('span', { class: 'lineY', style: 'left:' + y + 'px' }, this.$board);
        }
        // 初始化棋子
        '-'.repeat(15).split('').forEach((_, x) => {
            '-'.repeat(15).split('').forEach((_, y) => {

                let _n = x + '_' + y;
                let _x = x * 30 + 15 - 12;
                let _y = y * 30 + 15 - 12;

                $this.$piecesList[_n] = __WEBPACK_IMPORTED_MODULE_0__View__["a" /* default */].createElement('a', {
                    'data-id': _n,
                    class: 'pieces',
                    style: ['left:', _x, 'px;', 'top:', _y, 'px;'].join('')
                }, this.$board);
            });
        });
    }

    /**
     * 初始化事件
     */
    initEvent() {
        let $this = this;

        //  开始游戏
        this.$rightText.addEventListener('click', function () {
            if ($this.$game.inGame) {
                return false;
            }
            $this.$game.restart(true);
        });
        //下子
        this.$board.addEventListener('click', function (event) {

            const targets = Array.prototype.slice.call(this.querySelectorAll('a.pieces'));
            const target = event.target;

            function fn(evt) {
                let id = this.getAttribute('data-id');
                $this.$game.setIn(id);
            };
            if (targets.indexOf(target) !== -1) {
                return fn.call(target, arguments);
            }
        }, false); //  冒泡模式

        //  悔棋 & 撤销悔棋
        this.$undoText.addEventListener('click', function () {
            $this.$game.undo();
        });
        this.$cancelUndoText.addEventListener('click', function () {
            $this.$game.cancelUndo();
        });
    }

    /**
     * 更新棋权文本
     */
    gameRightTextUpdate(text, isCenter) {
        this.$rightText.innerText = text;
        this.$rightText.setAttribute('class', isCenter ? 'isCenter text gameRight' : 'text gameRight');
    }

    /**
     * 更新棋盘信息（所有棋子）
     */
    gameBoardUpdatePieces() {
        let $game = this.$game;
        let $this = this;
        Object.keys($game.board).forEach(k => {
            let color = $game.board[k];
            $this.$piecesList[k].setAttribute('class', 'pieces ' + (color === '_' ? '' : 'pieces_' + color));
        });
    }
    /**
     * 更新棋盘当前的预览落子
     */
    gameBoardUpdatePreview() {
        this.$board.setAttribute('class', 'board preview_' + this.$game.getRightName());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ViewDom;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const createCanvas = size => {
    const d = document;
    const fragment = d.createDocumentFragment();
    const id = 'c_' + setTimeout(() => {});

    const node = d.createElement('canvas');
    const canvas = node.getContext("2d");

    fragment.appendChild(node);

    node.setAttribute('id', id);

    node.width = size[0];
    node.height = size[1];
    canvas.width = size[0];
    canvas.height = size[1];

    // d.body.appendChild(node);

    return {
        id: id,
        $el: node,
        $canvas: canvas
    };
};
/* harmony export (immutable) */ __webpack_exports__["a"] = createCanvas;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(28);
/**
 * @file 游戏界面管理器
 *
 * - 管理所有的视图元素
 * - 派发事件
 */


class Stage {

    constructor(size) {

        const oCanvas = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* createCanvas */](size);

        this.size = size;

        this.$el = oCanvas.$el;
        this.$canvas = oCanvas.$canvas;

        //  派发事件到元件中
        // @todo  派发之前就进行区域检测
        this.$el.addEventListener('click', evt => {
            this.mapEvent['click'].forEach(component => {
                let pos = { x: evt.offsetX * 2, y: evt.offsetY * 2 };
                component.checkPosInRegion(pos) && component.onClick(pos);
            });
        });

        this.$el.addEventListener('mousemove', evt => {
            this.mapEvent['mousemove'].forEach(component => {
                let pos = { x: evt.offsetX * 2, y: evt.offsetY * 2 };
                component.checkPosInRegion(pos) && component.onMouseMove(pos);
            });
        });

        this.reset();
        return this;
    }

    //  重设
    reset() {
        this.components = {};
        this.componentIdMap = {}; //  id 到 components 的映射
        this.mapEvent = {
            'mousemove': [],
            'click': []
        };
    }

    // 渲染所有元件
    drawComponents() {

        const w = this.size[0];
        const h = this.size[1];
        const $stage = this;
        this.$canvas.clearRect(0, 0, w, h);

        //  按照顺序逐一渲染
        Object.keys(this.components).forEach(i => {
            this.components[i].forEach(component => {
                // console.log('draw', component);
                const w = component.size[0];
                const h = component.size[1];
                const x = component.pos[0];
                const y = component.pos[1];
                // drawImage 只能用 $el
                // console.log(component.id, component.pos)
                $stage.$canvas.drawImage(component.$el, 0, 0, w, h, x, y, w, h);
            });
        });
    }

    //  添加元件
    addComponent(component) {
        if (!component) {
            return false;
        }
        const zIndex = component.zIndex;
        const id = component.id;

        if (typeof this.components[zIndex] === 'undefined') {
            this.components[zIndex] = [component];
        } else {
            this.components[zIndex].push(component);
        }
        this.componentIdMap[id] = [zIndex, this.components[zIndex].length - 1];
        const $stage = this;
        //  事件注册
        component.registEvents.forEach(eventName => {
            $stage.mapEvent[eventName] && $stage.mapEvent[eventName].push(component);
        });
        component.$stage = $stage;
        component.init && component.init();
        //  元素添加后调用自身的 init 方法，绘制自身的操作，只在进入舞台的时候执行一次，除非后续需要自行更新
    }

    //  删除元件
    delComponent(component) {
        const info = this.componentIdMap[component.id];
        const zIndex = info[0];
        const pos = info[1];
        this.components[zIndex].splice(pos, 1);
        debugger;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Stage;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__View_ViewCanvas__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__View_ViewDom__ = __webpack_require__(27);
/**
 * @file 游戏核心逻辑
 */


/**
 * 游戏核心类返回一个游戏对象提供 restart 方法、setIn方法（测试用）
 */
class CoreLogic {
    constructor(config) {

        let { id, renderType } = config;

        this.setInOrder = []; // 已下子信息序列  [ ['1_2','white'] ,.. ]
        this.undoOrder = [];
        this.board = {}; //  棋盘映射 { '1_1':'_' , '1_2':'white'}
        this.inGame = false; // 是否在游戏中

        let viewConfig = {
            $el: document.getElementById(id),
            $game: this
        };
        this.$view = renderType === 'canvas' ? new __WEBPACK_IMPORTED_MODULE_0__View_ViewCanvas__["a" /* default */](viewConfig) : new __WEBPACK_IMPORTED_MODULE_1__View_ViewDom__["a" /* default */](viewConfig);
    }

    /**
     * 下子
     */
    setIn(pos, color) {
        if (!this.checkAllowSetIn(pos)) {
            return false;
        }
        color = color || this.getRightName();
        this.setInOrder.push([pos, color]);
        this.undoOrder = []; //  已经下棋，清空悔棋
        this.board[pos] = color;

        this.display();
        this.checkIsWin(pos, color);
    }

    /**
     * 检测允许在这里下子
     */
    checkAllowSetIn(pos) {
        return this.board[pos] === '_';
    }

    /**
     * 获取当前的棋权名称，白|黑
     */
    getRightName() {
        let i = this.setInOrder.length - 1;
        if (i < 0) {
            return 'black'; //  黑子先走
        } else {
            return this.setInOrder[i][1] === 'black' ? 'white' : 'black';
        }
    }

    /**
     * 检测是否赢了
     */
    checkIsWin(pos, color) {

        const arrPos = pos.split('_');
        const calcResult = CoreLogic.calcGomokuIsWin.call(this, arrPos, color); //  静态方法检测

        let isWin = false;
        calcResult.forEach(i => {
            if (i >= 4) {
                isWin = true;
            }
        });
        if (isWin) {
            this.inGame = false;
            this.$view.gameRightTextUpdate(color + '获得了了胜利！重新开始', true);
        }
        return isWin;
    }

    /**
     * 悔棋
     */
    undo() {
        if (!this.inGame || this.setInOrder.length <= 0) {
            return false;
        }
        const order = this.setInOrder.pop();
        this.undoOrder.push(order);
        this.board[order[0]] = '_';
        this.display();
    }

    /**
     * 撤销悔棋
     */
    cancelUndo() {
        if (this.undoOrder.length <= 0) {
            return false;
        }
        const order = this.undoOrder.pop();
        this.setInOrder.push(order);
        this.board[order[0]] = order[1];
        this.display();
    }

    /**
     * 视图展现
     */
    display() {

        let text = this.inGame ? '当前' + this.getRightName() + '走!' : '点此开始游戏';

        this.$view.gameBoardUpdatePreview(this.getRightName());
        this.$view.gameRightTextUpdate(text, !this.inGame);
        this.$view.gameBoardUpdatePieces();
    }

    /**
     * 开始游戏（初始化开始、重新开始）
     * inGame不开始，只是清空信息，而不自动开始（需要用户手动  --> 视图提供对应操作）
     */
    restart(inGame) {
        let $this = this;
        this.inGame = inGame || false;
        let size = 15;
        '-'.repeat(size).split('').forEach((_, x) => {
            '-'.repeat(size).split('').forEach((_, y) => {
                let pos = [x, y].join('_');
                $this.board[pos] = '_';
            });
        });
        this.setInOrder = [];
        this.undoOrder = [];
        this.display();
    }

    /**
     * 五子棋赢棋判断
     */
    static calcGomokuIsWin(arrPos, color) {
        let lib = {
            src: arrPos.join('_'),
            color: color,
            prevX: [],
            nextX: [],
            prevY: [],
            nextY: [],
            prevRt: [],
            prevRd: [],
            prevLt: [],
            prevLd: []
        };

        let Gomoku = this;

        //   上 , [ x--  , y]
        for (let i = 1; i < 5; i++) {
            if (arrPos[0] - i < 0) {
                break;
            }
            const pos = [arrPos[0] - i, arrPos[1] - 0].join('_');
            lib.prevX.push([pos, Gomoku.board[pos]]);
        }
        //   下 , [ x++  , y]
        for (let i = 1; i < 5; i++) {
            if (arrPos[0] - 0 + i > 14) {
                break;
            }
            const pos = [arrPos[0] - 0 + i, arrPos[1] - 0].join('_');
            lib.nextX.push([pos, Gomoku.board[pos]]);
        }
        //   左 , [ x  , y--]
        for (let i = 1; i < 5; i++) {
            if (arrPos[1] - i < 0) {
                break;
            }
            const pos = [arrPos[0] - 0, arrPos[1] - i].join('_');
            lib.prevY.push([pos, Gomoku.board[pos]]);
        }
        //   右 , [ x  , y++]
        for (let i = 1; i < 5; i++) {
            if (arrPos[1] - 0 + i > 14) {
                break;
            }
            const pos = [arrPos[0] - 0, arrPos[1] - 0 + i].join('_');
            lib.nextY.push([pos, Gomoku.board[pos]]);
        }
        //   右上 , [ x++  , y--]
        for (let i = 1; i < 5; i++) {
            let x = arrPos[0] - 0 + i;
            let y = arrPos[1] - i;
            if (x > 14 || y < 0) {
                break;
            }
            let pos = [x, y].join('_');
            lib.prevRt.push([pos, Gomoku.board[pos]]);
        }
        //   右下 , [ x--  , y++]
        for (let i = 1; i < 5; i++) {
            let x = arrPos[0] - i;
            let y = arrPos[1] - 0 + i;

            if (x < 0 || y > 14) {
                break;
            }
            let pos = [x, y].join('_');
            lib.prevRd.push([pos, Gomoku.board[pos]]);
        }
        //   左上 , [ x--  , y--]
        for (let i = 1; i < 5; i++) {
            let x = arrPos[0] - i;
            let y = arrPos[1] - i;

            if (x < 0 || y < 0) {
                break;
            }
            let pos = [x, y].join('_');
            lib.prevLt.push([pos, Gomoku.board[pos]]);
        }
        //   左下 , [ x++  , y++]
        for (let i = 1; i < 5; i++) {
            let x = arrPos[0] - 0 + i;
            let y = arrPos[1] - 0 + i;

            if (x < 0 || y < 0) {
                break;
            }
            let pos = [x, y].join('_');
            lib.prevLd.push([pos, Gomoku.board[pos]]);
        }
        Object.keys(lib).forEach(k => {
            let len = lib[k].length;
            lib[k + 'Sum'] = 0;
            for (let i = 0; i < len; i++) {
                if (lib[k][i][1] !== color) {
                    break;
                }
                lib[k + 'Sum']++;
            }
        });

        // console.log(lib);


        return [lib.prevXSum + lib.nextXSum, // x
        lib.prevYSum + lib.nextYSum, // y
        lib.prevRtSum + lib.prevRdSum, //   /
        lib.prevLtSum + lib.prevLdSum //   \
        ];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CoreLogic;


/***/ })
/******/ ]);