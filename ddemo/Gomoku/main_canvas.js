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
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(1);


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
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Stage__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BoardComponent__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TextComponent__ = __webpack_require__(6);




window.scale = 2;
window.Gomoku = { setInOrder: [] };

const oStage = new __WEBPACK_IMPORTED_MODULE_0__Stage__["a" /* default */]([800 * window.scale, 600 * window.scale]);

const oGameBoard = new __WEBPACK_IMPORTED_MODULE_1__BoardComponent__["a" /* default */]([450 * 2, 450 * 2], [(800 * 2 - 450 * 2) / 2, (600 * 2 - 450 * 2) / 2]);
const oGameRightText = new __WEBPACK_IMPORTED_MODULE_2__TextComponent__["a" /* default */]('开始游戏!', [250 * 2, 40 * 2], [(800 * 2 - 250 * 2) / 2, 15 * 2]);

const oGameUndoText = new __WEBPACK_IMPORTED_MODULE_2__TextComponent__["a" /* default */]('悔棋', [120 * 2, 35 * 2], [(800 * 2 - 450 * 2) / 2 + 450 * 2 + 50, (600 * 2 - 450 * 2) / 2]);
const oGameCancelUndoText = new __WEBPACK_IMPORTED_MODULE_2__TextComponent__["a" /* default */]('撤销悔棋', [120 * 2, 35 * 2], [(800 * 2 - 450 * 2) / 2 + 450 * 2 + 50, (600 * 2 - 450 * 2) / 2 + 100]);

oGameUndoText.registEvents = ['click'];
oGameCancelUndoText.registEvents = ['click'];
oGameRightText.registEvents = ['click'];

oGameUndoText.onClick = () => {
    Gomoku.undo();
};
oGameCancelUndoText.onClick = () => {
    Gomoku.cancelUndo();
};
oGameRightText.onClick = () => {
    if (Gomoku.inGame) {
        return false;
    }
    console.log('重新开始');
    oGameRightText.registEvents = [];
    Gomoku.restart(true);
};
oStage.drawComponents();

document.querySelector('#app').appendChild(oStage.$el);

oStage.addComponent(oGameBoard);
oStage.addComponent(oGameRightText);
oStage.addComponent(oGameUndoText);
oStage.addComponent(oGameCancelUndoText);

Gomoku.inGame = false;
Gomoku.board = {};

/**
 * 下在某处
 */
Gomoku.setIn = (pos, color) => {

    if (!Gomoku.checkAllowSetIn(pos)) {
        return false;
    }
    color = color || Gomoku.getRightName();
    Gomoku.setInOrder.push([pos, color]);
    Gomoku.undoOrder = []; //  已经下棋，清空悔棋
    Gomoku.board[pos] = color;

    Gomoku.display();
    Gomoku.checkIsWin(pos, color);
};
/**
 * 检测是否允许下在这里
 */
Gomoku.checkAllowSetIn = pos => {
    return Gomoku.board[pos] === '_';
};

/**
 * 检测是否赢了
 */

Gomoku.checkIsWin = (pos, color) => {
    const arrPos = pos.split('_');
    const calcResult = Gomoku.calcIsWin(arrPos, color);

    let isWin = false;
    calcResult.forEach(i => {
        if (i >= 4) {
            isWin = true;
        }
    });
    if (isWin) {
        Gomoku.inGame = false;
        oGameRightText.update(color + '获得了了胜利！重新开始', true);
    }
    return isWin;
};

/**
 * 获取当前棋权
 */
Gomoku.getRightName = () => {
    let i = Gomoku.setInOrder.length - 1;
    if (i < 0) {
        return 'black';
    } else {
        return Gomoku.setInOrder[i][1] === 'black' ? 'white' : 'black';
    }
};
/**
 * 后退操作
 */
Gomoku.undo = () => {
    if (!Gomoku.inGame || Gomoku.setInOrder.length <= 0) {
        return false;
    }
    const order = Gomoku.setInOrder.pop();
    Gomoku.undoOrder.push(order);
    Gomoku.board[order[0]] = '_';
    Gomoku.display();
};
/**
 * 取消后退操作
 */
Gomoku.cancelUndo = () => {
    if (Gomoku.undoOrder.length <= 0) {
        return false;
    }
    const order = Gomoku.undoOrder.pop();
    Gomoku.setInOrder.push(order);
    Gomoku.board[order[0]] = order[1];
    Gomoku.display();
};
/**
 * 展现信息
 */
Gomoku.display = () => {
    //  渲染内容
    // console.log(Gomoku.board);
    //  显示当前棋权
    let text = '当前' + Gomoku.getRightName() + '走!';
    // console.log(text);
    if (!Gomoku.inGame) {
        text = '点此开始游戏';
    }
    oGameBoard.drawSelf();
    oGameRightText.update(text, !Gomoku.inGame);
    oStage.drawComponents();
};

/**
 * 计算是否获得胜利
 * @param arrPos
 * @param color
 * @returns {[*,*,*,*]}
 */
Gomoku.calcIsWin = (arrPos, color) => {
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

    console.log(lib);

    return [lib.prevXSum + lib.nextXSum, //   -
    lib.prevYSum + lib.nextYSum, //    |
    lib.prevRtSum + lib.prevRdSum, //   /
    lib.prevLtSum + lib.prevLdSum //   \
    ];
};

/**
 * 重新开始游戏
 */
Gomoku.restart = isStart => {
    Gomoku.inGame = isStart;
    let size = 15;
    '-'.repeat(size).split('').forEach((_, x) => {
        '-'.repeat(size).split('').forEach((_, y) => {
            let pos = [x, y].join('_');
            Gomoku.board[pos] = '_';
        });
    });
    Gomoku.setInOrder = [];
    Gomoku.undoOrder = [];
    Gomoku.display();
};
Gomoku.restart(false);

[["2_4", "black"], ["2_5", "white"], ["2_6", "black"], ["2_7", "white"], ["2_8", "black"], ["2_9", "white"], ["2_10", "black"], ["2_11", "white"], ["3_11", "black"], ["4_11", "white"], ["5_11", "black"], ["6_11", "white"], ["7_11", "black"], ["8_11", "white"], ["9_11", "black"], ["10_11", "white"], ["11_11", "black"], ["12_11", "white"], ["12_10", "black"], ["12_9", "white"], ["12_8", "black"], ["12_7", "white"], ["12_6", "black"], ["12_5", "white"], ["12_4", "black"], ["6_10", "white"], ["6_9", "black"], ["6_8", "white"], ["6_7", "black"], ["7_7", "white"], ["8_7", "black"], ["8_8", "white"], ["8_9", "black"], ["8_10", "white"], ["7_10", "black"], ["7_9", "white"], ["7_8", "black"], ["1_4", "white"], ["1_5", "black"], ["1_6", "white"], ["1_8", "black"], ["1_7", "white"], ["1_9", "black"], ["1_10", "white"], ["1_11", "black"], ["13_11", "white"], ["13_10", "black"], ["13_9", "white"], ["13_8", "black"], ["13_7", "white"], ["13_6", "black"], ["13_5", "white"], ["13_4", "black"]].forEach(i => {
    Gomoku.setIn(i[0]);
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(1);
/**
 * @file 游戏界面管理器
 *
 * - 管理所有的视图元素
 * - 派发事件
 */


class Stage {

    constructor(size) {

        console.log('init Stage');

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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PiecesComponent__ = __webpack_require__(5);
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
     *在棋盘上处理鼠标移动 ==>，显示预览落子
     * @param evtPos  移动时的相对位置
     * @returns {*}
     *
     */
    onMouseMove(evtPos) {
        const gridPos = this.getGridPos(evtPos);
        if (!Gomoku.inGame || !Gomoku.checkAllowSetIn(gridPos.join('_'))) {
            this.hidePreviewPieces();
            return false;
        } else {
            let realPos = this.getRealPos(gridPos);
            this.updatePreviewPieces(Gomoku.getRightName(), realPos);
        }

        //@todo 待优化，50ms 后立即执行一次
        // clearTimeout(this.timeId);
        // this.timeId = setTimeout(() => {
        // }, 50);
    }

    /**
     * 在棋盘上处理点击
     * @param evtPos
     * @returns {boolean}
     */
    onClick(evtPos) {
        const gridPos = this.getGridPos(evtPos);
        if (!Gomoku.inGame) {
            return false;
        }
        Gomoku.setIn(gridPos.join('_'));
    }

    /**
     * 绘制棋盘
     */
    drawSelf() {
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

        Gomoku.setInOrder.forEach((item, i) => {

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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(0);


class PiecesComponent extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* default */] {

    constructor(color, pos) {

        const r = 24 * 2;
        const size = [r * 2, r * 2];
        const zIndex = 29;

        super(size, pos, zIndex);

        this.size = size;
        this.color = color;
        this.r = r;

        console.log('init PiecesComponent');

        // document.body.appendChild(this.$el);

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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Component__ = __webpack_require__(0);


class TextComponent extends __WEBPACK_IMPORTED_MODULE_0__Component__["a" /* default */] {

    constructor(text, size, pos) {

        const zIndex = 30;

        super(size, pos, zIndex);

        this.size = size;
        this.text = text;
        this.$board = null;

        this.srcPos = pos;
        this.centerPos = [];

        console.log('init TextComponent');

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


/***/ })
/******/ ]);