var run = function () {
    ppt = $.ppt('body', 'report')


//----0
        .addPage('startup')
        /*  */.caption(' ').motion()
        /*      */.img('report/img/prev-id.jpg', '.prev',{width:0,height:0})
        /*      */.img('report/img/logo.png', '.logo')

//----1
        .addPage('chapter', 'page-1')
        /*  */.caption('Indonesia，Bangkitnya Kekuatan  Raksasa Mobile Internet')
        /*      */.text('Sejak Juli 2013 Baidu mulai beroperasi di Indonesia dengan memperkenalkan 4 aplikasi mobile unggulannya: Baidu Browser， MoboMarket，DU Battery Saver dan DU Speed Booster。', '.text-1')
        /*      */.text('Saat ini dua dari tiga pengguna Android di Indonesia menggunakan produk Baidu.', '.text-2')
        /*      */.img('report/img/img-p1.png', '.img-1')

//----2
        .addPage('chapter', 'page-2')
        /*  */.caption('Smartphone adalah perangkat Mobile Internet yang paling disukai')
        /*      */.make('DblBar', {db: [
            ['Smartphone', 48, 60, 'CC0000'],
            ['PC Laptop', 20, 41, 'a5539d'],
            ['PC Desktop', 16, 34, 'fbc711'],
            ['Tablet', 8, 17, '3bbddf'],
            ['Netbook', 4, 11, '6cb92d'],
            ['Lainnya', .4, 4, 'd37f27']
        ], className: 'graph-1'})
        /*      */.list([ 'Saya menggunakannya untuk mengakses Internet selama <b>6 bulan</b> terakhir', 'Saya <b>paling sering</b> menggunakannya untuk mengakses Internet'], 'text-1')
//----3

        .addPage('chapter', 'page-3')
        /*  */.caption('Mobile Internet telah menjadi satu kebutuhan dasar')
        /*      */.make('DashBoard', {className: 'graph-1', percent: 91, desc: 'netizen mengakses lnternet melalui ponsel setiap hari'})
        /*      */.make('DashBoardList', {className: 'graph-2', db: [
            ['Kurang dari 1 jam', 19, '7dc740', 'Dan setiap harinya, 43% mobile netizen mengakses Internet lebih dari 3 jam'],
            ['1-3 jam', 38, 'a5539c', 'Dan setiap harinya, 43% mobile netizen mengakses Internet lebih dari 3 jam'],
            ['Lebih dari 3 jam', 43, '3bbdde', 'Dan setiap harinya, 43% mobile netizen mengakses Internet lebih dari 3 jam']
        ]})
//----4
        .addPage('chapter', 'page-4')
        /*  */.caption('Paket Data, media efektif menjangkau banyak pengguna mobile')
        /*      */.text('Saat memilih operator, ini yang dipertimbangkan mobile netizen', '.text-1')
        /*      */.make('Points', {className: 'graph-1', db: [
            [40, 'Paket data yang lebih menarik', '318de9', [0, 0]],
            [38, 'Kecepatan jaringan', '4899eb', [85, -110]],
            [35, 'Harga murah', 'f36f70', [-90, -80]],
            [33, 'Stabilitas jaringan', 'f36f70', [90, 100]],
            [32, 'Cakupan jaringan', 'b8d5f2', [-50, 110]],
            [25, 'Sistem mobile', 'b8d5f2', [10, -130]],
            [1, 'Lainnya', 'd4d7d9', [120, 20]]
        ]})
//----5
        .addPage('chapter', 'page-5')
        /*  */.caption('Melimpahnya ponsel Android, potensi pasar yang besar')
        /*      */.text('Lebih dari <b>87%</b> pengguna akan memilih Android OS untuk ponsel berikutnya', '.text-1')
        /*      */.make('Sector', { className: 'graph-2', rate: 87, viewRotate: 270, text: 'Android'})
        /*      */.make('VerticalBar', {db: [
            ['Harga rata-rata smartphone saat ini', 70, 'Rp. 2,148,000', 'b8d5f2'],
            ['Anggaran rata-rata untuk smartphone berikutnya', 99, 'Rp. 2,907,000', '318de9']
        ], label: ['-', '-'], className: 'graph-1', tip: true})
//----6
        .addPage('chapter', 'page-6')
        /*  */.caption('Jejaring sosial dan peramban adalah aplikasi yang paling banyak digunakan')
        /*      */.text('<b>40%</b>pengguna hanya menggunakan 1-2 aplikasi', '.text-1')
        /*      */.make('Sector', {className: 'graph-2', rate: 40, viewRotate: 90})
        /*      */.text('<b>TOP 5</b> Aplikasi yang Sering Digunakan', '.text-2')
        /*      */.make('StandardBar', {db: [
            ['<b>Jejaring sosial</b>', 81, 'f46f70'],
            ['<b>Peramban</b>', 65, 'f46f70'],
            ['Game', 35, 'b8d5f2'],
            ['Musik', 32, 'b8d5f2'],
            ['Berita', 17, 'b8d5f2'],
        ], className: 'graph-1'})
//----7

        .addPage('chapter', 'page-7')
        /*  */.caption(' Peramban menjadi aplikasi penting Mobile Internet')

        /*      */.text('<b>80%</b> mobile  netizen membuka peramban lebih dari sekali dalam sehari', '.text-1')
        /*      */.text('Mobile netizen menggunakan peramban untuk mengunduh, bersosialisasi dan menikmati layanan media', '.text-2')
        /*      */.make('StandardBar', {db: [
            ['<b>Pencarian</b>', 79, 'f46f70'],
            ['<b>Mengunduh</b>', 66, 'f46f70'],
            ['Jejaring Sosial', 65, '328dea'],
            ['Baca Berita', 56, '328dea'],
            ['Melihat Gambar', 34, '64b8f4'],
            ['Melihat Video', 31, '64b8f4'],
            ['Belanja', 19, 'aaaeb1'],
            ['Baca Novel', 6, 'aaaeb1'],
            ['Lainnya', 1, 'aaaeb1']
        ], className: 'graph-1'})
//----8
        .addPage('chapter', 'page-8')
        /*  */.caption('Rumah menjadi tempat paling umum mengakses Mobile Internet')
        /*      */.make('StandardBar', {db: [
            ['<b>Rumah</b>', 95, 'f46f70'],
            ['Tempat Kerja', 36, 'b8d5f2'],
            ['Dalam Perjalanan', 27, 'b8d5f2'],
            ['Restoran', 27, 'b8d5f2'],
            ['Kafe', 20, 'b8d5f2'],
            ['Sekolah', 16, 'b8d5f2'],
            ['Kendaraan Umum', 12, 'cecece'],
            ['Peristiwa', 10, 'cecece'],
            ['Lainnya', 3, 'cecece']
        ], className: 'graph-1' , widthRate : 1.2})
//----9
        .addPage('chapter', 'page-9')
        /*  */.caption('Siang dan Malam merupakan puncak waktu penggunaan Mobile Internet')
        /*      */.make('PolyLine', {className: 'graph-1', db: [
            0.59, 0.48, 0.37, 0.27, 0.21, 0.23, 0.35, 0.43, 0.52, 0.58, 0.63, 0.65, 0.71, 0.93, 0.84, 0.75, 0.70, 0.67, 0.72, 1.00, 0.92, 0.85, 0.80, 0.73, 0.59
        ], x: { steps: 24, minSingleWidth: 50 }, y: { steps: 7},
            peak: [ 13, 19], tip: 'Geser untuk grafik lengkap'})

//----end
        .addPage('reference')
        /*  */.caption('Terima Kasih!')
        /*      */.text('Kembali ke Halaman Depan', '.backup').backup()
        /*      */.text('<span>Untuk selengkapnya, silakan unduh</span><br><a ontouchstart="window.open(\'http://www.slideshare.net/BaiduIndonesia/baidu-jelajah-dunia-mobile-di-indonesia-2014-41985027\')" class="button" target="_blank">Laporan Lengkap </a>', '.download')
        /*      */.text(' Coba aplikasi Baidu            <br>' +
            '<a ontouchstart="window.open(\'http://s.mobile-global.baidu.com/mbrowser/official/home\')"  class="app app-browser" target="_blank">Baidu Browser</a>' +
            '<a ontouchstart="window.open(\'http://www.duapps.com/du-battery-saver.html\')"  class="app app-battery" target="_blank">Du Battery Saver</a>' +
            '<a ontouchstart="window.open(\'http://mobomarket.co.id\')"  class="app app-market" target="_blank">MoboMarket</a>', '.apps').fontSize(['a', '10']) 
        /*      */.list(['<b>Sumber Data:</b>', 'Data Kuisioner: 11458 entri valid ', 'Wawancara pengguna: 100 pengguna Internet ponsel di Indonesia', 'Wawancara pakar: 10 pakar dari institusi pemerintahan, media, pengembang, perusahaan lnternet, dll. Data produk.'], '.source-list')
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
        $('head').append('<link rel="stylesheet" href="report/min-height-fix2.css"/>');
    }

        var imgUrl = 'http://ue.baidu.com/2014/report/img/prev-id.jpg';
        var lineLink = 'http://ue.baidu.com/2014/index2.html';
        var shareTitle = 'Jelajah Dunia Mobile di Indonesia';
        var descContent = 'Eksplorasi Dunia Mobile di Indonesia 2014';
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

