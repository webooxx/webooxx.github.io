var run = function () {
    ppt = $.ppt('body', 'report')


//----0
        .addPage('startup')
        /*  */.caption(' ').motion()
        /*      */.img('report/img/prev-cn.jpg', '.prev',{width:0,height:0})
        /*      */.img('report/img/logo.png', '.logo')

        

// ----1
        .addPage('chapter', 'page-1')
        /*  */.caption('印尼，移动互联网大国崛起')
        /*      */.text(' 2013年7月 起，百度开始印尼本地化运营，共推出百度浏览器，应用商店，省电，优化等四款移动产品。', '.text-1')
        /*      */.text('<b>目前，</b>三分之二的印尼安卓用户正在使用百度产品', '.text-2')
        /*      */.img('report/img/img-p1.png', '.img-1')
// ----2
        .addPage('chapter', 'page-2')
        /*  */.caption('智能手机是首选上网设备')
        /*      */.make('DblBar', {db: [
            ['智能手机', 48, 60, 'CC0000'],
            ['笔记本电脑', 20, 41, 'a5539d'],
            ['台式电脑', 16, 34, 'fbc711'],
            ['平板电脑', 8, 17, '3bbddf'],
            ['上网本', 4, 11, '6cb92d'],
            ['其他', .4, 4, 'd37f27']
        ], className: 'graph-1'})
        /*      */.list([ '我在过去<b>6个月</b>使用过的上网设备', '我<b>最常用</b>的上网设备'], 'text-1')
//----3

        .addPage('chapter', 'page-3')
        /*  */.caption('手机上网成为日常基本行为')
        /*      */.make('DashBoard', {className: 'graph-1', percent: 91, desc: '的手机网民每天用手机上网'})
        /*      */.make('DashBoardList', {className: 'graph-2', db: [
            ['小于1小时', 19, '7dc740', '<b>43%</b>超过3个小时'],
            ['1-3小时', 38, 'a5539c', '<b>43%</b>超过3个小时'],
            ['3小时以上', 43, '3bbdde', '<b>43%</b>超过3个小时']
        ]})
//----4
        .addPage('chapter', 'page-4')
        /*  */.caption('数据套餐是运营商抢用户利器')
        /*      */.text('在选择<b>运营商</b>时，人们这样来进行选择:', '.text-1')
        /*      */.make('Points', {className: 'graph-1', db: [
            [40, '更好的数据套餐', '318de9', [0, 0]],
            [38, '网络速度', '4899eb', [85, -110]],
            [35, '更低的价格', 'f36f70', [-90, -80]],
            [33, '网络稳定性', 'f36f70', [90, 100]],
            [32, '网络覆盖', 'b8d5f2', [-50, 110]],
            [25, '网络制式', 'b8d5f2', [10, -130]],
            [1, '其他', 'd4d7d9', [120, 20]]
        ]})
// ----5
        .addPage('chapter', 'page-5')
        /*  */.caption('千元智能机市场潜力巨大')
        /*      */.text('<b>87%</b>手机网民希望下一部手机是安卓机', '.text-1')
        /*      */.text('Rp. 1,000=$ 0.08215','.text-2')
        /*      */.make('Sector', { className: 'graph-2', rate: 87, viewRotate: 270, text: '安卓'})
        /*      */.make('VerticalBar', {db: [
            ['正在使用的手机价格均值', 70, 'Rp2,148,000', 'b8d5f2'],
            ['下一部手机预算均值', 99, 'Rp2,907,000', '318de9']
        ], label: ['目前的手机', '下一个手机'], className: 'graph-1', tip: true})

//----6
        .addPage('chapter', 'page-6')
        /*  */.caption('手机上普遍使用的应用种类有限')
        /*      */.text('<b>40%</b>用户手机上只使用1-2个应用', '.text-1')
        /*      */.make('Sector', {className: 'graph-2', rate: 40, viewRotate: 90})
        /*      */.text('常用手机应用<b>TOP5</b>', '.text-2')
        /*      */.make('StandardBar', {db: [
            ['<b>社交</b>', 81, 'f46f70'],
            ['<b>浏览器</b>', 65, 'f46f70'],
            ['游戏', 35, 'b8d5f2'],
            ['音乐', 32, 'b8d5f2'],
            ['视频', 17, 'b8d5f2'],
        ], className: 'graph-1'})
//----7

        .addPage('chapter', 'page-7')
        /*  */.caption('手机浏览器是必不可少的APP')

        /*      */.text('接近<b>80%</b>手机网民每天多次打开手机浏览器', '.text-1')
        /*      */.text('用户通过浏览器满足搜索、下载、社交、多媒体等多类需求', '.text-2')
        /*      */.make('StandardBar', {db: [
            ['<b>搜索</b>', 79, 'f46f70'],
            ['<b>下载</b>', 66, 'f46f70'],
            ['社交', 65, '328dea'],
            ['看新闻', 56, '328dea'],
            ['看图片', 34, '64b8f4'],
            ['看视频', 31, '64b8f4'],
            ['购物', 19, 'aaaeb1'],
            ['看小说', 6, 'aaaeb1'],
            ['其他', 1, 'aaaeb1']
        ], className: 'graph-1'})
//----8
        .addPage('chapter', 'page-8')
        /*  */.caption('即使在家用户也更愿意用手机上网')
        /*      */.make('StandardBar', {db: [
            ['<b>家</b>', 95, 'f46f70'],
            ['工作场所', 36, 'b8d5f2'],
            ['社交', 27, 'b8d5f2'],
            ['走在路上', 27, 'b8d5f2'],
            ['餐厅', 27, 'b8d5f2'],
            ['咖啡厅', 20, 'b8d5f2'],
            ['学校', 16, 'b8d5f2'],
            ['公共交通', 12, 'cecece'],
            ['在社交场合', 10, 'cecece'],
            ['其他', 3, 'cecece']
        ], className: 'graph-1'})
//----9
        .addPage('chapter', 'page-9')
        /*  */.caption('午休和傍晚是上网高峰期')
        /*      */.make('PolyLine', {className: 'graph-1', db: [
            0.59, 0.48, 0.37, 0.27, 0.21, 0.23, 0.35, 0.43, 0.52, 0.58, 0.63, 0.65, 0.71, 0.93, 0.84, 0.75, 0.70, 0.67, 0.72, 1.00, 0.92, 0.85, 0.80, 0.73, 0.59
        ], x: { steps: 24, minSingleWidth: 50 }, y: { steps: 7},
            peak: [ 13, 19]
        })

//----end
        .addPage('reference')
        /*  */.caption('非常感谢!')
        /*      */.text('回到首页', '.backup').backup()
        /*      */.text('更加详细的内容请下载<br><a ontouchstart="window.open(\'http://tiyan.baidu.com/index.php?r=report/view&id=6\')"  class="button" target="_blank">完整报告</a>', '.download')
        /*      */.text(' 百度应用下载 <br>' +
            '<a ontouchstart="window.open(\'http://s.mobile-global.baidu.com/mbrowser/official/home\')"  class="app app-browser" target="_blank">Baidu Browser</a>' +
            '<a ontouchstart="window.open(\'http://www.duapps.com/du-battery-saver.html\')"  class="app app-battery" target="_blank">Du Battery Saver</a>' +
            '<a ontouchstart="window.open(\'http://mobomarket.co.id\')"  class="app app-market" target="_blank">MoboMarket</a>', '.apps').fontSize(['a', '10'])
        /*      */.list(['<b>数据来源</b>', '线上问卷数据：11458有效样本', '用户访谈：100名印尼手机互联网用户', '专家访谈：10名来自政府、媒体等领域的专家产品日志'], '.source-list')
        /*      */.img('report/img/support.png', '.img-1')


        .addPageNumber()
        .play(1);


}
var load = function () {

    var imgs = [
        'report/img/bg.gif', 'report/img/bg-gray.gif'

        , 'report/img/title.png', 'report/img/logo.png'
        , 'report/img/sm-logo.png', 'report/img/sm-tip.png'

        , 'report/img/img-p1.png'
        , 'report/img/move-r.png'

        , 'report/img/app-browser.png', 'report/img/app-battery.png', 'report/img/app-market.png'
    ];

    var done = [];

    function checkLoad() {
        done.push($(this).attr('src'));
        $(this).remove();

        $('#rate').text(Math.ceil(done.length / imgs.length * 100) + '%')
        if (done.length === imgs.length) {
            setTimeout(run, 100);
        }
    }

    $(imgs).each(function (idx, me) {
        $('<img>').attr('src', me).on('load', checkLoad)
    })
}
$(function () {

    setTimeout(load, 500)

    if ($('body').height() < 480) {
        $('head').append('<link rel="stylesheet" href="report/min-height-fix.css"/>');
    }
    
        var imgUrl = 'http://ue.baidu.com/2014/report/img/prev-cn.jpg';
        var lineLink = 'http://ue.baidu.com/2014/';
        var shareTitle = '印尼2014移动互联网白皮书';
        var descContent = '2.6亿人口的移动互联网高地\n观察·展望';
        var appid = '';
        
        function shareFriend() {
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid": appid,
                "img_url": imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": lineLink,
                "desc": descContent,
                "title": shareTitle
            }, function(res) {
                //_report('send_msg', res.err_msg);
            })
        }
        function shareTimeline() {
            WeixinJSBridge.invoke('shareTimeline',{
                "img_url": imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": lineLink,
                "desc": descContent,
                "title": shareTitle
            }, function(res) {
                   //_report('timeline', res.err_msg);
            });
        }
        function shareWeibo() {
            WeixinJSBridge.invoke('shareWeibo',{
                "content": descContent,
                "url": lineLink,
            }, function(res) {
                //_report('weibo', res.err_msg);
            });
        }
        // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            WeixinJSBridge.on('menu:share:appmessage', function(argv){
                shareFriend();
            });
            WeixinJSBridge.on('menu:share:timeline', function(argv){
                shareTimeline();
            });
            WeixinJSBridge.on('menu:share:weibo', function(argv){
                shareWeibo();
            });
        }, false);


})