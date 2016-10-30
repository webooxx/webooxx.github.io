var common = require('./common.js');
var wrap = common.wrap;
var header = require('./header.js');
var scrren1 = require('./scrren-1.js');

module.exports = {
    template: {
        block: 'box',
        child: [
            header,
            scrren1,
            {
                template: {
                    block: 'screen-2',
                    tag: '<section>',
                    child: [
                        {
                            elem: 'wrap',

                            child: [
                                {elem: 'sub-2'},
                                {elem: 'sub-1'},


                                {elem: 'heading', text: '每门课都是真实商业案例'},
                                {elem: 'tip',},
                                {elem: 'subheading', text: '真实案例，真实场景，在实战中实践、操作、调试<br>大牛带你体验BAT真实开发流程，所有开发过程一一为你呈现'}
                            ]
                        }
                    ]
                },
                style: {
                    'screen-2': {
                        color: '#07111b',

                        height: '640px',
                        background: '#f3f5f7 url(img/sc2.png) no-repeat bottom center',
                        'text-align': 'center',

                        __wrap: wrap,

                        __heading: {
                            position: 'absolute',
                            top: '80px',
                            'width': '100%',
                            'font-size': '42px',
                            'font-weight': 'bold',
                        },
                        __tip: {
                            position: 'absolute',
                            left: '50%',
                            margin: '0 0 0 -25px',
                            width: '50px',
                            height: '3px',
                            top: '167px',
                            background: 'red'
                        },
                        __subheading: {
                            'width': '100%',
                            top: '190px',
                            position: 'absolute',
                            'font-size': '16px',
                        },

                        '__sub-1': {
                            width: '100%',
                            height: '640px',
                            left: '0', top: '0',
                            position: 'absolute',
                            background: 'url(img/sc2-1.png) no-repeat bottom center',

                        },
                        '__sub-2': {
                            width: '100%',
                            left: '100px', top: '-100px',
                            height: '640px',
                            position: 'absolute',
                            background: 'url(img/sc2-2.png) no-repeat bottom center',
                        },
                    }
                }
            },

            {
                template: {
                    block: 'screen-3',
                    tag: '<section>',
                    child: [
                        {
                            elem: 'wrap',
                            child: [
                                {elem: 'heading', text: '强大的语言课程体系支持'},
                                {elem: 'tip',},
                                {elem: 'subheading', text: '学习环境与课程轻松对接，安装、调试、写入、部署、运行，一站式解决<br>,让你体验开发全流程'},
                                {
                                    elem: 'skill',
                                    child: [
                                        {elem: 'skill-item', 'text': 'HTML5'},
                                        {elem: 'skill-item', 'text': 'PHP'},
                                        {elem: 'skill-item', 'text': 'JAVA'},
                                        {elem: 'skill-item', 'text': 'Python'},
                                        {elem: 'skill-item', 'text': 'Node.js'},
                                    ]
                                }
                            ]
                        }
                    ]
                }, style: {
                'screen-3': {
                    color: '#fff',

                    height: '640px',
                    background: '#2b333b url(img/sc3.png) no-repeat 130px center',

                    __wrap: wrap,

                    __heading: {
                        position: 'absolute',
                        top: '220px',
                        left: '666px',
                        'width': '100%',
                        'font-size': '36px',
                        'font-weight': 'bold',
                    },
                    __tip: {
                        position: 'absolute',
                        left: '50%',
                        width: '50px',
                        height: '3px',
                        top: '295px',
                        left: '666px',
                        background: 'red'
                    },
                    __subheading: {
                        'width': '512px',
                        top: '320px',
                        left: '666px',
                        position: 'absolute',
                        'font-size': '16px',
                    },

                    __skill: {
                        width: '520px',
                        position: 'absolute',
                        bottom: '50px',
                        right: '0px',
                    },
                    '__skill-item': {
                        float: 'left',
                        width: '56px',
                        height: '56px',
                        'border-radius': '50%',
                        'text-align': 'center',
                        'line-height': '56px',
                        'margin-right': '40px',
                        'margin-top': '10px',
                        'border': '4px solid #1f5975',
                        color: '#02b0ff',
                    }

                }
            }

            },

            {
                template: {
                    block: 'screen-4',
                    tag: '<section>',
                    child: [
                        {
                            elem: 'wrap',
                            child: [
                                {elem: 'heading', text: '省去本地复杂的环境搭建'},
                                {elem: 'tip',},
                                {elem: 'subheading', text: '你可以告别在虚拟机中调试开发了'},
                                {
                                    elem: 'env',
                                    child: [
                                        {elem: 'env-item', mods: {i: 1}, 'text': '实战课程集成开发环境'},
                                        {elem: 'env-item', mods: {i: 2}, 'text': '内置终端命令行'},
                                        {elem: 'env-item', mods: {i: 3}, 'text': '编译你的应用程序'},
                                        {elem: 'env-item', mods: {i: 4}, 'text': '通过云端服务输出效果'},
                                    ]
                                }
                            ]
                        }
                    ]
                }, style: {
                'screen-4': {
                    color: '#07111b',

                    height: '640px',
                    background: '#f3f5f7',
                    'text-align': 'center',

                    __wrap: wrap,

                    __heading: {
                        position: 'absolute',
                        top: '80px',
                        'width': '100%',
                        'font-size': '42px',
                        'font-weight': 'bold',
                    },
                    __tip: {
                        position: 'absolute',
                        left: '50%',
                        margin: '0 0 0 -25px',
                        width: '50px',
                        height: '3px',
                        top: '167px',
                        background: 'red'
                    },
                    __subheading: {
                        'width': '100%',
                        top: '190px',
                        position: 'absolute',
                        'font-size': '16px',
                    },
                    __env: {
                        'width': '100%',
                        top: '290px',
                        position: 'absolute',
                        'font-size': '16px',
                    },
                    '__env-item': {
                        width: '25%',
                        padding: '100px 0 0 0',
                        height: '14px',
                        'line-height': '14px',
                        float: 'left',

                        _i_1: {background: 'url(./img/sc4-1.png) no-repeat top center'},
                        _i_2: {background: 'url(./img/sc4-2.png) no-repeat top center'},
                        _i_3: {background: 'url(./img/sc4-3.png) no-repeat top center'},
                        _i_4: {background: 'url(./img/sc4-4.png) no-repeat top center'},

                    }

                }
            }


            },

            {
                template: {
                    block: 'screen-5',
                    tag: '<section>',
                    child: [
                        {
                            elem: 'wrap',

                            child: [
                                {elem: 'head'},
                                {elem: 'heading', text: '云端学习可以这样简单'},
                                {elem: 'tip',},
                                {elem: 'subheading', text: '看视频，敲代码，一气呵成。结合慕课网为你提供的云端学习工具，所见即所得。从此学习不一样'}
                            ]
                        }
                    ]
                }, style: {
                'screen-5': {
                    color: '#FFF',

                    height: '640px',
                    background: '#f3f5f7 url(img/sc5.jpg) no-repeat',
                    'background-size': 'cover',
                    'text-align': 'center',
                    overflow: 'hidden',

                    __wrap: wrap,

                    __head: {
                        width: '100%',
                        height: '640px',
                        background: ' url(img/sc5-1.png) no-repeat center top',
                        top: '100px',
                        position: 'absolute',
                    },
                    __heading: {
                        position: 'absolute',
                        top: '350px',
                        'width': '100%',
                        'font-size': '42px',
                        'font-weight': 'bold',
                    },
                    __tip: {
                        position: 'absolute',
                        left: '50%',
                        margin: '0 0 0 -25px',
                        width: '50px',
                        height: '3px',
                        top: '430px',
                        background: 'white'
                    },
                    __subheading: {
                        'width': '100%',
                        top: '460px',
                        position: 'absolute',
                        'font-size': '16px',
                    },

                    '__sub-1': {
                        width: '100%',
                        height: '640px',
                        left: '0', top: '0',
                        position: 'absolute',
                        background: 'url(img/sc2-1.png) no-repeat bottom center',

                    },
                    '__sub-2': {
                        width: '100%',
                        left: '100px', top: '-100px',
                        height: '640px',
                        position: 'absolute',
                        background: 'url(img/sc2-2.png) no-repeat bottom center',
                    },
                }
            }

            },

            {
                template: {
                    block: 'more',
                    tag: '<section>',
                    child: [
                        {elem: 'button', text: '继续了解学习体验', tag: '<a href="#">'}
                    ]
                },
                style: {
                    more: {
                        height: '60px',
                        padding: '70px 0 ',
                        __button: {
                            'width': '144px',
                            'height': '58px',
                            'line-height': '58px',
                            'font-size': '18px',
                            'border-radius': '3px',
                            'display': 'block',
                            'margin': '0 auto',
                            'border': '1px solid #707070',
                            'padding': '0 47px',
                        }
                    }
                }
            },

            {
                template: {
                    block: 'outline',
                    child: [
                        {elem: 'item', mods: {i: 1}, text: '实', tag: '<a href="#">'},
                        {elem: 'item', mods: {i: 2}, text: '样', tag: '<a href="#">'},
                        {elem: 'item', mods: {i: 3}, text: '脚', tag: '<a href="#">'},
                        {elem: 'item', mods: {i: 4}, text: 'UP', tag: '<a href="#">'},
                    ]
                },
                style: {
                    outline: {
                        position: 'fixed',
                        width: '20px',
                        zIndex: 2,
                        right: '20px',
                        bottom: '30%',

                        __item: {
                            display: 'block',
                            width: '20px',
                            height: '20px',
                            background: '#fff',
                            margin: '5px 0 0 0',
                            'text-align': 'center',
                        }
                    },
                }

            },

            {
                template: {
                    block: 'footer',
                    tag: '<footer>',
                    child: [
                        {
                            elem: 'wrap',
                            child: [
                                {
                                    elem: 'link',

                                    child: [
                                        {elem: 'link-item', text: '网站首页', tag: '<a href="#">'},
                                        {elem: 'link-item', text: '人才招聘', tag: '<a href="#">'},
                                        {elem: 'link-item', text: '联系我们', tag: '<a href="#">'},
                                        {elem: 'link-item', text: '高校联盟', tag: '<a href="#">'},
                                        {elem: 'link-item', text: '关于我们', tag: '<a href="#">'},
                                        {elem: 'link-item', text: '讲师招募', tag: '<a href="#">'},
                                        {elem: 'link-item', text: '意见反馈', tag: '<a href="#">'},
                                        {elem: 'link-item', text: '友情链接', tag: '<a href="#">'},
                                    ]
                                },
                                {
                                    elem: 'copyright',
                                    text: 'Copyright © 2015 imooc.com All Rights Reserved | 京ICP备 13046642号-2'
                                }
                            ]
                        }
                    ]
                }
            },
        ]
    },
    style: {
        footer: {
            height: '80px',
            padding: '26px 0 0 0 ',
            background: '#000000',
            'line-height': '25px',

            '__link': {
                padding: '0 0 0 40px',
            },
            '__link-item': {
                color: '#c8cdd2',
                display: 'inline-block',
                margin: '0 30px 0 0'
            },
            '__wrap': wrap,
            __copyright: {
                color: '#787d82',
                padding: '0 0 0 40px',
                'font-size': '16px',
            }

        }

    }
};
