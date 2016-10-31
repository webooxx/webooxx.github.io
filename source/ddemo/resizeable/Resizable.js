//  设置某个面板支持调整大小
function Resizable(panelId) {
    if (!window.__resizable_var) {
        with (window) {
            //  ctrl ：控制元素，panel ：面板 ， type 类型
            m_panel = 1, m_ctrl = 1 , m_type = 1
            //  move：       是否侦听鼠标移动， 
            //  m_start_x：  鼠标相对ctrl元素的left、right 
            //  m_to_x： 鼠标的新位置
            moving = 0 , m_start_x = 0 , m_start_y = 0 , m_to_x = 0 , m_to_y = 0;
            //  面板最小尺寸
            m_min_w = 100, m_min_h = 40;
        }
    }
    var panel = document.getElementById(panelId);
    //  插入调整控制元素
    var r = document.createElement("div");
    var b = document.createElement("div");
    var rb = document.createElement("div");

    r.class = r.className = 'ui-Resizable-r  ui-Resizable-ctrl';
    b.class = b.className = 'ui-Resizable-b  ui-Resizable-ctrl';
    rb.class = rb.className = 'ui-Resizable-rb ui-Resizable-ctrl';

    panel.appendChild(r);
    panel.appendChild(b);
    panel.appendChild(rb);

    //  鼠标移动处理
    function on_move() {
        if (moving) {
            //  计算最小的 left 和 top （使panel的新大小不能小于自身的位置）
            var min_left = 0
            var min_top = 0

            var to_x = Math.max(min_left + m_min_w, m_to_x - m_start_x);
            var to_y = Math.max(min_top + m_min_h, m_to_y - m_start_y);

            //  元素的新位置 = 鼠标新位置 - 鼠标相对元素的位置s
            switch (m_type) {
                case 'r' :
                    m_ctrl.style.left = to_x + "px";
                    m_panel.style.width = to_x + 10 + 'px';
                    break;
                case 'b' :
                    m_ctrl.style.top = to_y + "px";
                    m_panel.style.height = to_y + 10 + 'px';
                    break;
                case 'rb' :
                    m_ctrl.style.left = to_x + "px";
                    m_ctrl.style.top = to_y + "px";

                    m_panel.style.width = to_x + 20 + 'px';
                    m_panel.style.height = to_y + 20 + 'px';
                    break;
            }
        }
    }

    //   在控制元素中按下
    function on_mousedown(e, panel, ctrl, type) {
        var e = e || window.event;

        //  计算出鼠标页面位置 和 当前元素位置的差 = 鼠标相对元素的位置
        m_start_x = e.pageX - ctrl.offsetLeft;
        m_start_y = e.pageY - ctrl.offsetTop;

        m_panel = panel;
        m_ctrl = ctrl;
        m_type = type;


        if(m_ctrl.setCapture){
            m_ctrl.setCapture();
        }else if(window.captureEvents){
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        } 

        //  开始处理移动事件
        moving = setInterval(on_move, 10);
    }

    //  为调整控制元素设置拖拽处理
    r.addEventListener('mousedown', function (e) {
        on_mousedown(e, panel, r, 'r');
    })
    b.addEventListener('mousedown', function (e) {
        on_mousedown(e, panel, b, 'b');
    })
    rb.addEventListener('mousedown', function (e) {
        on_mousedown(e, panel, rb, 'rb');
    });

    if (!window.__resizable_var) {
        //  页面鼠标移动侦听处理
        document.addEventListener('mousemove', function (e) {
            var e = window.event || e;
            m_to_x = e.pageX;
            m_to_y = e.pageY;
        })
        //  鼠标弹起处理
        document.addEventListener('mouseup', function (e) {

            if(m_ctrl.releaseCapture){
                m_ctrl.releaseCapture();
            }else if(window.captureEvents){
                window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
            }   

            clearInterval(moving);
            var cls = document.getElementsByClassName('ui-Resizable-ctrl');
            for (var i = 0; i < cls.length; i++) {
                cls[i].style.left = '';
                cls[i].style.top = '';
            }
        })
        window.__resizable_var = true;
    }
}
