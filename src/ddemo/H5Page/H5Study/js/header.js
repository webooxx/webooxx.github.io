module.exports = {
    "template": {
        "block": "header", 
        "tag": "<header>", 
        "child": [
            {
                "elem": "logo", 
                "tag": "<a href="\"#screen-1\"">", 
                "text": "H5实战页面A"
            }, 
            {
                "elem": "nav", 
                "tag": "<nav>", 
                "child": [
                    {
                        "elem": "nav-item", 
                        "tag": "<a href="\"#screen-1\"">", 
                        "mods": {
                            "status": "active"
                        }, 
                        "text": "实战课程"
                    }, 
                    {
                        "elem": "nav-item", 
                        "tag": "<a href="\"#screen-2\"">", 
                        "text": "样式动画"
                    }, 
                    {
                        "elem": "nav-item", 
                        "tag": "<a href="\"#screen-3\"">", 
                        "text": "脚本特效"
                    }, 
                    {
                        "elem": "nav-item", 
                        "tag": "<a href="\"#screen-4\"">", 
                        "mods": {
                            "custom": "button"
                        }, 
                        "text": "即刻学习"
                    }
                ]
            }
        ]
    }, 
    "style": {
        "header": {
            "position": "fixed", 
            "top": "0", 
            "left": "0", 
            "right": "0", 
            "zIndex": "2", 
            "height": "60px", 
            "background-image": "-webkit-linear-gradient(top, #000000, rgba(0, 0, 0, 0))", 
            "_status_white": {
                "background-image": "none", 
                "background": "white", 
                "color": "#07111b"
            }, 
            "_status_white .header__logo": {
                "color": "#07111b"
            }, 
            "_status_white .header__nav-item": {
                "color": "#666"
            }, 
            "_status_white .header__nav-item:hover": {
                "color": "#07111b"
            }, 
            "_status_white .header__nav-item_status_active": {
                "color": "#07111b"
            }, 
            "_status_white .header__nav-item_custom_button": {
                "color": "#fff"
            }, 
            "__logo": {
                "float": "left", 
                "height": "40px", 
                "color": "#fff", 
                "margin": "10px 0 0 10px", 
                "padding": "0 0 0 50px", 
                "background": "url(./img/logo.png) no-repeat left top", 
                "display": "block", 
                "font-size": "18px", 
                "font-weight": "bold", 
                "line-height": "40px"
            }, 
            "__nav": {
                "float": "right", 
                "margin": "10px 10px 0 0"
            }, 
            "__nav-item:hover": {
                "color": "#fff", 
                "border-bottom": "2px solid #f01400"
            }, 
            "__nav-item": {
                "float": "left", 
                "margin": "0 20px", 
                "color": "#fff", 
                "font-size": "14px", 
                "line-height": "40px", 
                "_status_active": {
                    "border-bottom": "2px solid #f01400"
                }, 
                "_custom_button": {
                    "color": "#fff", 
                    "background": "#f01400", 
                    "padding": "0 20px", 
                    "border-radius": "5px"
                }, 
                "_custom_button:hover": {
                    "background": "#c81414", 
                    "border-bottom": 0
                }
            }
        }
    }
}
</a></a></a></a></nav></a></header>