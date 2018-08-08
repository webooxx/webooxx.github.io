---
title: Canvas和Dom实现的五子棋
date: 2017-08-02 15:50:05
tags: Canvas,JS游戏
---

![效果预览](/images/gomoku.png)

# Gomoku

- DOM 版效果：http://webooxx.com/ddemo/Gomoku/index_dom.html
- Canvas 版本效果：http://webooxx.com/ddemo/Gomoku/index_canvas.html
- 整合版效果，可以选择渲染模式 http://webooxx.com/ddemo/Gomoku/index.html



## 设计要求

1. 用 Web 技术实现一个五子棋（不用考虑人机对战）
2. 如果是用 DOM 实现的，换成 Canvas 实现。（需要 Dom 和 Canvas 两个版本）
3. 实现一个悔棋的功能
4. 实现一个撤销悔棋的功能

## 大致思路-模块划分

#### 一、User Interface Element 用户界面元素

- 棋盘
  - 黑子
  - 白子
  - 预览（黑、白）
  - 辅助文案（当前游戏赢家状态&棋权、悔棋、撤销悔棋）

#### 二、User Interface Provide Method 接口方法

- 根据 **Gomoku.board **更新棋盘所有棋子
- 更新棋权文案

#### 三、User Infterface Event 用户界面事件（用户输入）

- 下子
- 预览
- 悔棋
- 撤销悔棋

#### 四、Core Logic 核心逻辑

- **游戏对象 Gomoku**
  - 基本数据
    - 是否游戏中状态 inGame
    - 下棋序列 setInOrder
    - 悔棋序列 undoOrder（用于支持撤销悔棋）
    - 下棋序列 setInOrder
    - 棋盘界面映射 board（用于支持视图可以直接根据 15\*15 尺寸的 board 进行更新）
  - 方法
    - 落子 setIn()
    - 更新视图（棋盘落子、棋权）UI.updateBoard()
    - 重新开始游戏（更新基本数据、视图） restart()
    - 悔棋 undo()
    - 撤销悔棋 cancelUndo()
    - 获取当前棋权  getCurrentRightName() （根据基本数据 Gomoku.setInOrder，若最后一个是白的，现在肯定是黑的）
  - 通用方法
    - 判定是否允许落子 checkAllowSetIn
    - 判定落子之后是否赢了 checkIsWin


## 判断是否赢棋思路

- 因为：落子到某个点之后，这个点的 - | \/ \\ ，这4个方向联合起来有5个子就赢了
- 尝试判定在水平方向 - 是否赢了
- 所以：假定判断  当前落子的左侧 所有直接连接的同色 + 右侧所有直接连接的同色 >=4 即赢了。
  - 例如刚刚下到 **0,2**即 ： [ 0,0 ,'white' ] , [ 0,1 ,'white' ], **[ 0,2 ,'white' ]**, [ 0,3 ,'white' ], [ 0,4 ,'white' ]
  - 那么 white 赢
- 判定在垂直方向同理，判定在 / 和 \ 方向，同理
- 不同方向的计算方法
  - 垂直向上：[ x--  , y]
  - 垂直向下：[x++, y ]
  - 水平向左：[ x, y--]
  - 水平向右：[ x, y++]
  - 左上方向：[x--,y--]
  - 左下方向：[x++,y++]
  - 右上方向：[x++,y--]
  - 右下方向：[x--,y++]
