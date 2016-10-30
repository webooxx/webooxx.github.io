var common = require('./common.js');
var wrap = common.wrap;

module.exports = {
    "template": {
        "block": "screen-1", 
        "tag": "<section>", 
        "child": [
            {
                "elem": "wrap", 
                "child": [
                    {
                        "elem": "heading", 
                        "text": "实战课程重磅上线"
                    }, 
                    {
                        "elem": "subheading", 
                        "text": "一键云学习，还在等待什么？"
                    }
                ]
            }
        ]
    }, 
    "style": {
        "screen-1": {
            "color": "#fff", 
            "height": "640px", 
            "background": "url(img/sc1.jpg) no-repeat top center", 
            "background-size": "cover", 
            "text-align": "center", 
            "__wrap": wrap, 
            "__heading": {
                "position": "absolute", 
                "top": "230px", 
                "width": "100%", 
                "font-size": "42px", 
                "font-weight": "bold"
            }, 
            "__subheading": {
                "width": "100%", 
                "top": "310px", 
                "position": "absolute", 
                "font-size": "16px"
            }
        }
    }
}

</section>