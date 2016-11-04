var $ = $ || {};

$.ppt = function (p, theme) {

    //  ppt对象
    var ppt = {
        themeName: 'ppt-theme-undefined',
        pages: [],
        components: {},
        motionHandlers: [],
        parent: $(p).empty(),
        thePage: null,
        theComponent: null
    };
    var wrap = ppt.wrap = $('<div class="ppt ">').css('opacity', 0).appendTo(ppt.parent);

    //  为元件附加样式
    ppt.attachCss = function (el, css) {
        if (css) {
            for (k in css) {
                $(el).css(k, css[k]);
            }
        }
        return ppt;
    }

    //  设置主题
    ppt.theme = function (themeName) {
        if (themeName) {
            var tName = 'ppt-theme-' + themeName;
            if ($('.' + tName).length < 1) {

                $.ajax({'async': false, 'url': 'lib/' + tName + '.html', 'complete': function (res) {
                    $('body').append($('<div class="theme-base">').hide().html(res.responseText));
                }})
            }
            ppt.themeName = tName
            wrap.addClass(tName)
        }

        return ppt;
    }
    //  添加页码
    ppt.addPageNumber = function (position, css) {

        ppt.wrap.find('.pageNumber').each(function (idx) {
            $(this).text(idx + 1)
        })
        return ppt;
    }
    //  添加页面
    ppt.addPage = function (pageName, cssName) {

        var page = $('.' + ppt.themeName, '.theme-base').find('.page-' + pageName).clone().show();
        ppt.thePage = page;
        ppt.theComponent = null;

        page.find('.component').hide()
        page.addClass(cssName || 'page');
        wrap.append(page);
        ppt.pages.push(page);

        return ppt;
    }

    /**
     * 创建一个组件
     * @param type
     * @param content
     * @param target
     * @param css
     */
    ppt.createComponent = function (type, content, target, css) {
        var page = ppt.thePage;
        var target = target || "rand_" + ((Math.random() * 9999) >>> 0);
        var component = page.find(target);
        var cid = target.replace(/[\.\#]/, '');


        //  init component
        if (component.length < 1) {


            switch (type) {
                case 'text':
                    component = $('<div class="component text">').appendTo(page);
                    break;
                case 'img':
                    component = $('<div class="component img">').appendTo(page);
                    break;
                case 'ul':
                    component = $('<ul class="component ul">').appendTo(page);
                    break;
                case 'list':
                    component = $('<div class="component list">').appendTo(page);
                    break;
            }

        }

        component.empty().attr('component-id', cid).addClass(cid + '_beforeSwitchIn').addClass(cid);

        ppt.theComponent = component
        ppt.attachCss(component, css);

        //  insert content

        switch (type) {
            case 'text':
                component.html(content);
                break;
            case 'img':
                var content = typeof content == 'string' ? [content, {}] : content;
                var img = $('<img class="img" src="' + content[0] + '" />');
                ppt.attachCss(img, content[1]);
                component.append(img);
                break;
            case 'ul':
                $(content).each(function (i, t) {
                    t = typeof t == 'string' ? [t, {}] : t;
                    var li = $('<li class="li li-' + (i + 1) + '">' + t[0] + '</li>')
                    ppt.attachCss(li, t[1]);
                    component.append(li);
                });
                break;
            case 'list':
                $(content).each(function (i, t) {

                    t = typeof t == 'object' ? t : [t, {}];
                    var li = $('<div class="item item-' + (i + 1) + '">' + t[0] + '</li>')
                    ppt.attachCss(li, t[1]);
                    component.append(li);
                });
                break;
        }


        return ppt;

    }

    ppt.into = function (target) {
        var target = ppt.thePage.find(target);
        if (target.length) {
            ppt.theComponent.appendTo(target);
        }

        return ppt;
    }

    //  替换当前元素中的字的大小
    ppt.fontSize = function (args) {

        var target = ppt.theComponent.find(args[0]);
        var size = args[1];


        target.each(function () {
            var txt = $(this).text();
            $(this).empty().append($('<u class="fontSize fontSize-' + size + '">').text(txt));
        })
        return ppt;
    }
    //  点击回到首页
    ppt.backup = function () {
        ppt.theComponent.on('touchstart', function () {
            ppt.play(ppt.pages.length * -1);
        })
        return ppt;
    }

    ppt.createCanvas = function (size, id) {

        var cns = document.getElementById(id) ? document.getElementById(id) : document.createElement('canvas');
        var ctx = cns.getContext("2d");
        var size = size || { w: 900, h: 900 }
        cns.id = id || 'rand' + '_' + (Math.random() * 9999 >>> 0);

        cns.width = ctx.width = size.w;
        cns.height = ctx.height = size.h;

        return {
            cns: cns,
            ctx: ctx,
            remove: function () {
                if (el = document.getElementById(this.cns.id)) {
                    el.remove();
                }

            }
        }
    }

    //  内容设置

    /**
     * 内容设置/创建文本
     * @param content 文本内容
     * @param [target] 可选目标,如下情况 a) 为可以找到的元素 b) 为不可找到的元素  c) 空 d) 为一个CSS对象
     * @param [css] 可选，将作为样式对象载入
     */
    ppt.text = function (content, target, css) {
        return ppt.createComponent('text', content, target, css);
    }
    //  快捷-页面标题文本
    ppt.caption = function (content, css) {
        return ppt.createComponent('text', content, '.caption', css);
    }
    //  快捷-页面描述文本
    ppt.description = function (content, css) {
        return ppt.text(content, '.description', css);
    }

    //  内容列表添加
    /**
     * 内容列表添加
     * @param content
     * @param target
     * @param css
     */
    ppt.ul = function (content, target, css) {
        ppt.createComponent('ul', content, target, css);
        return ppt;
    }
    //  快捷-页面列表添加
    ppt.list = function (content, target, css) {
        return ppt.createComponent('list', content, target, css);
    }
    /**
     * 添加一个图像
     * @param url
     * @param target
     * @param css
     * @returns {{themeName: string, parent: (*|{}|jQuery|HTMLElement), thePage: null}}
     */
    ppt.img = function (url, target, css) {
        ppt.createComponent('img', url, target, css);
        return ppt;
    }


    //  动画展现

    var moving = 0;
    var prevPage = -1;
    //  go 是相对值
    ppt.switch = function (go) {
        if (moving !== 0) {
            return false;
        }
        var max = ppt.pages.length - 1;

        goPage = Math.min(Math.max(prevPage + go, 0), max);

        if (goPage === prevPage) {
            return false;
        }

        //console.log('goPage', goPage, 'prevPage', prevPage, 'go', go, 'max', max);


        if (prevPage >= 0) {
            ppt.onSwitchOut(prevPage);
        }

        ppt.onSwitchIn(goPage);

        wrap.attr('style', 'transform:translate3d(0px, ' + goPage * -100 + '%, 0px);-webkit-transform: translate3d(0px,  ' + goPage * -100 + '%, 0px);');
        moving = setTimeout(function () {
            moving = 0;
        }, 500);
        prevPage = goPage;

        $('body').scrollTop(0);
        return false;
    }
    //  当切换到当前页
    ppt.onSwitchIn = function (idx) {
        ppt.pages[idx].find('.component').each(function () {
            var me = $(this);

            var beforeClass = me.attr('component-id') + '_beforeSwitchIn';
            var afterClass = me.attr('component-id') + '_afterSwitchIn';

            me.show().removeClass(beforeClass).addClass(afterClass);
            me.data('onSwitchIn') ? me.data('onSwitchIn')(me) : '';
        })

        return ppt;
    }
    ppt.onSwitchOut = function (idx) {
        ppt.pages[idx].find('.component').each(function () {
            var me = $(this);
            var beforeClass = me.attr('component-id') + '_beforeSwitchIn';
            var afterClass = me.attr('component-id') + '_afterSwitchIn';

            me.show().removeClass(afterClass).addClass(beforeClass);
            me.data('onSwitchOut') ? me.data('onSwitchIn')(me) : '';
        });
        return ppt;
    }


    /*  ----  MAKE   ----*/
    ppt.make = function (name, args) {
        var fn = ppt['make' + name];
        if (typeof fn == 'function') {
            fn(args)
        }
        return ppt;
    }
    //  创建水平单柱图
    ppt.makeStandardBar = function (args) {
        var db = args.db || [];
        var className = args.className || 'standardBar';

        ppt.list(db, className);
        var component = ppt.theComponent;
        var items = component.find('.item');
        component.addClass('graph_standardBar');

        var barWidth = component.width() * (args.widthRate || 1.5);

        // 构建内容
        items.each(function (i) {

            var bar = $('<div class="bar">').append($('<div class="text">').text(db[i][1] + '%')).css('backgroundColor', '#' + db[i][2]);
            var wrap = $('<div class="barWrap">').append(bar);


            wrap.width((db[i][1] / 100 ) * barWidth);

            $(this).append(wrap);
        })

    }
    //  创建双柱图
    ppt.makeDblBar = function (args) {

        var db = args.db || [];
        var className = args.className || 'dblBar'

        ppt.ul(db, className);

        ppt.theComponent.find('li').on('touchstart', function () {
            $(this).addClass('focus').siblings().removeClass('focus')
        })

        ppt.theComponent.addClass('graph_dblBar').find('li').each(function (i) {
            var els = [];
            var block_per = db[i][1] + '%';
            var block_css = {width: Math.max(db[i][1] * 1, 2) + '%'};

            els.push($('<div class="block">').css(block_css).append('<div class="txt">' + block_per + '</div> ').append('<div class="color">'));


            if (db[i][2] !== null) {
                var frame_per = db[i][2] + '%';
                var frame_css = {width: Math.max(db[i][2] * 1, 2) + '%'};
                $(this).text(db[i][0])
                els.push($('<div class="frame">').css(frame_css).append('<div class="txt">' + frame_per + '</div> ').append('<div class="color">'));
            }
            els = $('<div class="bar">').append(els);

            $(this).text(db[i][0]).append(els)


        }).eq(0).addClass('focus')

    }
    ppt.makeDblBarDescription = function (args) {
        var db = args.db || [];
        var className = args.className || 'dblBarDescription'

        ppt.list(db, className);
    }


    //  垂直柱图
    ppt.makeVerticalBar = function (args) {
        var db = args.db || [];
        var labels = args.label || [];
        var className = args.className || 'verticalBar'
        ppt.list(db, className);


        var me = ppt.theComponent.addClass('graph_verticalBar'); //  水平线

        var singleWidth = me.find('.item').eq(0).width();
        var parentWidth = me.width();
        var padding = me.find('.item').eq(0).position().left * 2;

        var step = (parentWidth - padding - singleWidth * db.length) / (db.length - 1);

        me.find('.item').each(function (i) {


            var bar = $('<div class="barWrap"><div class="bar" style="background-color: #' + db[i][3] + ';"></div><div class="text">' + db[i][2] + '</div></div>').height(db[i][1] * 2 + '%');

            $(this).css('left', step * i + padding / 2 + i * singleWidth).append(bar);
        });

        if (args.tip) {
            me.append($('<div class="tip">'));
        }

    }

    //  垂直双柱图
    ppt.makeVerticalDblBar = function (args) {
        var db = args.db || [];
        var labels = args.label || [];
        var className = args.className || 'verticalDblBar'
        ppt.list(db, className);

        var label = $('<div class="label">');
        var wrap = $('<div class="wrap">');
        var component = ppt.theComponent.addClass('graph_verticalDblBar').append($('<div class="line">')).append(wrap).append(label); //  水平线
        var items = component.find('.item');


        wrap.append(items);

        var singleWidth = component.find('.item').eq(0).width();

        var parent_w = component.width();
        var real_w = singleWidth * db.length;

        var allow_h = wrap.height() - 40;

        wrap.width(real_w);
        //  构造标签
        $(labels).each(function (i) {
            label.append($('<span class="label-item label-item-' + (i + 1) + '">').text(labels[i]));
        })


        //  构造内容
        items.each(function (i) {
            var aBar = $('<div class="aBarWrap">').append($('<div class="aBar">').append($('<div class="text">').text(db[i][1] + '%')).append($('<div class="bar">')));
            var bBar = $('<div class="bBarWrap">').append($('<div class="bBar">').append($('<div class="text">').text(db[i][2] + '%')).append($('<div class="bar">')));
            $(this).css('left', singleWidth * i)
                .append(aBar)
                .append(bBar)

            var margin = ($(this).width() - aBar.width() - bBar.width()) / 2;

            aBar.css('left', margin).height(allow_h * db[i][1] / 50);
            bBar.css('left', aBar.position().left + aBar.width()).height(allow_h * db[i][2] / 50);

        })


        //  交互
        var diffWidth = parent_w - real_w;
        var diffTouch = 0;
        wrap[0].addEventListener('touchstart', function (event) {

            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                diffTouch = touch.pageX;
            }
        }, false);
        wrap[0].addEventListener('touchend', function (event) {
            var x = event.changedTouches[0].pageX;

            if (Math.abs(x - diffTouch) > 10) {

                var left = $(this).position().left;
                var _x = Math.max(Math.min((left + x - diffTouch), 0), diffWidth);
                $(this).css('left', _x);
            }

        }, false);

    }


    //  多个仪表盘
    ppt.makeDashBoardList = function (args) {

        var db = args.db || [];
        var className = args.className || 'dollBar';

        ppt.ul(db, className);


        ppt.theComponent.addClass('graph_dashBoardList').find('li').each(function (i) {
            var me = $(this).empty();
            var padding = ppt.theComponent.find('li').first().position().left * 2;
            var allWidth = ppt.theComponent.find('li').first().width() * db.length;
            var margin = (ppt.theComponent.width() - padding - allWidth) / ( db.length - 1);

            me.empty().css('left', $(this).position().left + ( $(this).width() + margin ) * i);
            //me.height(db[i][1] * 2 + '%').css('backgroundColor', '#' + db[i][2]);

            me.append($('<div class="percent">').html(db[i][1] + '%'))
            me.append($('<div class="column">').html(db[i][0]))

            var r_l = 180 * ( db[i][1] / 100) - 180;
            var r_m = 180 - (r_l + 180) / 2;
            //var pie = $('<div class="pie">')//

            var pie_rotate = 'style="-webkit-transform: rotate(' + r_m + 'deg)"';
            var cover_left_rotate = 'style = "-webkit-transform: rotate(' + r_l + 'deg)"';

            me.append('<div class="pie" ' + pie_rotate + '><div class="cover" ' + cover_left_rotate + '></div></div>')
            me.append('<div class="pie_mask"></div>');


        }).last().addClass('focus');


        var desc = (args.desc || '') + db[db.length - 1][3];
        ppt.theComponent.append($('<div class="desc">').html(desc))



    }
    //  仪表盘
    ppt.makeDashBoard = function (args) {
        var db = args.db || [];
        var percent = args.percent || 0;
        var size = args.size || 100;
        var className = args.className || 'DashBoard';
        ppt.text(db, className);

        var desc = $('<div>').addClass('desc').html('<b>' + args.percent + '%</b>' + (args.desc || 'none'));
        var tip = $('<div>').addClass('tip').html('<b>0%</b>');


        ppt.theComponent.data('onSwitchIn', function () {

            ppt.fx(function (step) {
                tip.html((step >>> 0) + '%');
            }, 0, 91, {duration: 2000, delay: 0})

        })
        ppt.theComponent.addClass('graph_dashBoard').append($('<div class="circle">')).append($('<div class="pointer">')).append(tip).append(desc);

    }

    //  环图
    ppt.makeRing = function (args) {
        var db = args.db || [];
        var className = args.className || 'Ring';
        ppt.text(db, className);
        var me = ppt.theComponent;
        me.addClass('graph_ring');
    }
    //  扇图
    ppt.makeSector = function (args) {
        var db = args.db || [];
        var className = args.className || 'Sector';
        ppt.text(db, className);
        var me = ppt.theComponent;
        me.addClass('graph_sector');


        var rate = 360 * ( args.rate / 100);
        var rate_l = 180 - rate / 2;
        var rate_r = (180 - rate / 2) * -1;

        var rate_left = 'style="-webkit-transform: rotate(' + rate_l + 'deg)"';
        var rate_right = 'style="-webkit-transform: rotate(' + rate_r + 'deg)"';

        var rate_view = 'style="-webkit-transform: rotate(' + (args.viewRotate || 0) + 'deg)"';

        var pie = $('<div class="pie" ' + rate_view + '>')
            .append('<div class="rate_left"><div class="rate" ' + rate_left + '>')
            .append('<div class="rate_right"><div class="rate"' + rate_right + '>')

            .append('<div class="cover_left"><div class="cover">')
            .append('<div class="cover_right"><div class="cover">')

        me.append(pie).append('<div class="text">' + (args.text ? '<i>' + args.text + '</i>' : '') + args.rate + '%</div>');
    }

    //  点图
    ppt.makePoints = function (args) {
        var db = args.db || [];

        var className = args.className || 'points';

        ppt.list(db, className);
        ppt.theComponent.addClass('graph_points').find('.item').each(function (i) {

            var me = $(this).empty();

            var cssName = (db[i][0] > 37 ? 'inBlock' : 'outBlock');

            var desc = '<i>' + db[i][0] + '%' + (cssName == 'inBlock' ? '<b>' + db[i][1] + '</b>' : '') + '</i>' + (cssName == 'outBlock' ? '<b>' + db[i][1] + '</b>' : '');

            cssName += ' normal';
            if (args.rateAppendToText) {
                desc = '<div class="text">' + db[i][1] + '<br> ' + db[i][0] + '%</div>';
                cssName = 'rateAppendToText';
            }
            var size = Math.max((db[i][0] / db[0][0] * 100) >>> 0, 30);
            me
                .addClass(cssName)
                .html(desc)
                .css('left', db[i][3][0] + '%')
                .css('top', db[i][3][1] + '%')
                .css('backgroundColor', '#' + db[i][2])
                .css('width', size + '%')
                .css('height', size + '%')
                .css('borderRadius', size)

        }).eq(0).addClass('focus');
        ppt.theComponent.find('.item').on('touchstart', function () {
            $(this).addClass('focus').siblings().removeClass('focus');
        })
    }


    //  折线图
    ppt.makePolyLine = function (args) {
        var db = args.db || [];
        var className = args.className || 'polyLine';
        ppt.text(' ', className);
        ppt.theComponent.addClass('graph_polyLine');

        var parent_w = ppt.theComponent.width() * 2;
        var parent_h = ppt.theComponent.height() * 2;


        var x = args.x;
        var y = args.y;

        var xPadding = 20;  //  画布的padding,用于文字输出
        var yPadding = 20;


        var xSingleWidth = Math.max(( (parent_w - xPadding * 2) / x.steps), x.minSingleWidth || 1);
        var ySingleHeight = ((parent_h - yPadding * 2) / y.steps);


        var real_w = xSingleWidth * x.steps + xPadding * 2;
        var real_h = parent_h;

        var canvas = ppt.createCanvas({w: real_w, h: real_h});
        var wrap = $('<div class="wrap">').append($(canvas.cns).addClass('canvas'));
        ppt.theComponent.append(wrap);

        var clear = function () {
            var ctx = canvas.ctx;
            ctx.clearRect(0, 0, real_w, real_h);
        }
        var drawXY = function () {

            var ctx = canvas.ctx;
            var _y = real_h - yPadding;
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#d0d1d3";

            //  横线
            ctx.moveTo(xPadding - 1, _y);
            ctx.lineTo(real_w - xPadding + 1, _y);

            for (i = 0; i < y.steps; i++) {
                _y = ySingleHeight * i + yPadding;

                ctx.moveTo(xPadding - 1, _y);
                ctx.lineTo(real_w - xPadding + 1, _y);


            }

            //  竖线&X Labels
            ctx.fillStyle = "#343434"
            ctx.font = "11px 微软雅黑";
            _y = real_h - yPadding;
            var _x = 0;
            for (i = 0; i < x.steps; i = i + 4) {

                _x = xSingleWidth * i + xPadding;

                ctx.moveTo(_x, _y);
                ctx.lineTo(_x, yPadding);
                ctx.fillText(i + ':00', _x - 10, _y + 15);
            }
            _x = xSingleWidth * i + xPadding;
            ctx.moveTo(_x, _y);
            ctx.lineTo(_x, yPadding);
            ctx.fillText('23:59', _x - 10, _y + 15);
            ctx.stroke();
            $(canvas.cns).width(real_w / 2).height(real_h / 2);
            wrap.width(real_w / 2).height(real_h / 2);
        }


        var drawLine = function (per) {
            var ctx = canvas.ctx;

            var _x = 0;
            var _y = 0;
            window.ctx = ctx;
            _x = xPadding;
            _y = (real_h - yPadding) - db[0] * (real_h - yPadding * 2);


            ctx.beginPath();
            ctx.moveTo(_x, _y);
            ctx.lineWidth = 3;

            ctx.strokeStyle = "#338ded";

            for (i = 1; i < db.length; i++) {

                _x = xSingleWidth * i + xPadding;
                _y = (real_h - yPadding) - db[i] * (real_h - yPadding * 2) * per * .7;

                ctx.lineTo(_x, _y);

            }
            ctx.stroke();

            ctx.strokeStyle = "rgba(0,0,0,0)";
            ctx.lineTo(_x, real_h - yPadding);
            ctx.lineTo(xPadding, real_h - yPadding);

            ctx.fillStyle = "rgba(50,141,234,.5)";
            ctx.closePath();
            ctx.fill();

        }

        drawXY();
        ppt.theComponent.data('onSwitchIn', function () {
            ppt.fx(function (step) {
                clear();
                drawXY();
                drawLine(step);
            }, 0, 1, {duration: 2000, delay: 0, ease: ppt.ease.easeIn })


        })


        // peak高峰点
        var peaks = args.peak;

        for (var i = 0; i < peaks.length; i++) {
            var text = peaks[i] + ':00';
            var peak = $('<div class="peak peak-' + (i + 1) + '">').text(text).appendTo(wrap);
            peak.css('left', (xSingleWidth * peaks[i]) / 2 + xPadding / 2 + 'px').css('bottom', (yPadding / 2 + ((real_h - 2 * yPadding) * db[peaks[i]]) / 2) * .7 + 20 + 'px');
        }

        ppt.theComponent.append($('<div class="scrollTip"><span class="scrollTipText">' + (args.tip || '左右滑动查看图表') + '</span></div>'))
        //  交互
        var diffWidth = parent_w / 2 - real_w / 2;
        var diffTouch = 0;
        wrap[0].addEventListener('touchstart', function (event) {

            if (event.targetTouches.length == 1) {
                var touch = event.targetTouches[0];
                diffTouch = touch.pageX;
            }
        }, false);
        wrap[0].addEventListener('touchend', function (event) {
            var x = event.changedTouches[0].pageX;

            if (Math.abs(x - diffTouch) > 10) {

                var left = $(this).position().left;
                var _x = Math.max(Math.min((left + x - diffTouch), 0), diffWidth);
                $(this).css('left', _x);
            }

        }, false);

    }


    ppt.motion = function () {
        ppt.motionHandlers.push(ppt.theComponent);
        return ppt;
    }

    //  水平晃动侦听
    ppt.onMotionEvent = function (eventData) {
        var acceleration = eventData.accelerationIncludingGravity;

        if (Math.abs(acceleration.x) < 2 && Math.abs(acceleration.y) < 2) {
            return false;
        }

        var degX = acceleration.x * 10 / Math.PI;

        $(ppt.motionHandlers).each(function () {
            var c = $(this);
            c.css({
                '-webkit-transform': 'rotateY(' + degX + 'deg)'
            });

        })


    }
    //  初始化、大小侦听，切换事件
    ppt.play = function (page) {
        //  切换绑定
        wrap.bind('mousewheel', function (event, delta) {
            return ppt.switch(delta < 0 ? 1 : -1);
        });

        var diffY = 0;
        var minLength = 100;

        function touch(event) {
            var event = event || window.event;
            event.preventDefault();
            switch (event.type) {
                case "touchstart":
                    diffY = event.touches[0].clientY;
                    break;
                case "touchend":
                    diffY = event.changedTouches[0].clientY - diffY

                    if (diffY < 0 && Math.abs(diffY) > minLength) {
                        ppt.switch(1);
                    }
                    if (diffY > 0 && Math.abs(diffY) > minLength) {
                        ppt.switch(-1);
                    }
                    diffY = 0;
                    break;
            }
        }

        document.addEventListener('touchstart', touch, false);
        document.addEventListener('touchend', touch, false);

        function resize() {
            var w = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
            var h = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;
            $('.ppt').width(w).height(h);
        }

        $(window).on('resize', resize)
        resize();


        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', ppt.onMotionEvent, false);
        }

        $('body').scrollTop(0);
        if (typeof page === 'number') {
            ppt.switch(page);
        }
        return ppt;
    }

    ppt.ease = {
        line: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeInOut: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158 * 3;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }

    }
    ppt.fx = function (fn, begin, end) {


        var options = arguments[3] || {};
        var duration = options.duration || 500;
        var ease = options.ease || ppt.ease.line;

        startTime = Date.now() + options.delay || 25;

        (function () {
            setTimeout(function () {
                timestamp = Date.now() - startTime;
                fn(ease(timestamp, begin, ( end - begin), duration), 'step');

                if (duration <= timestamp) {
                    fn(end, 'end');
                } else {
                    setTimeout(arguments.callee, 25);
                }
            }, options.delay || 25)
        })();
    }
    ppt.theme(theme);
    return ppt;

}