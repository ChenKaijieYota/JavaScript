// 封装兼容性问题，求滚动条滚动得距离
function getScrollOffset() {
    if(window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    }else{
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        };
    }
}

//封装兼容性方法，返回浏览器视口尺寸
function getViewportOffset() {
    if(window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        };
    }else{
        if(document.compatMode === "BackCompat"){
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            };
        }else{
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            };
        }
    }
}

//封装兼容性方法，获取样式，prop传的是字符串
function getStyle(elem, prop) {
    if(window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    }else{
        return elem.currentStyle[prop];
    }
}

//封装兼容性方法，更好地绑定事件，处理函数
function addEvent(elem, type, handle) {//元素 事件类型 处理函数
    if(elem.addEventListener) {//IE9以下不兼容
        elem.addEventListener(type, handle, false);
    }else if(elem.attachEvent) {//IE独有的
        elem.attachEvent('on'+type, function () {
            handle.call(elem);
        })
    }else{
        elem['on'+type] = handle;
    }
}

//封装兼容性问题，取消冒泡的函数
function stopBubble(event) {
    if(event.stopPropagation) {
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
}

//封装阻止默认事件的函数,IE8以下不能使用，在那个函数中写兼容写法：var event = e || window.event;
function cancelHandler(event) {
    if(event.preventDefault) {
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}

//js异步加载，按需加载回调函数
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if(script.readyState) {
        script.onreadystatechange = function () {
            //IE
            if(script.readyState == "complete" || script.readyState == "loaded") {
                callback();//tools[callback]();
            }
        }
    }else{
        script.onload = function () {
            //Safari chrome firefox opera
            callback();//tools[callback]();
        }
    }
    script.src = url;//异步加载
    document.head.appendChild(script);//执行脚本文件
}
// eg. loadScript('tools.js', function () {
//     test();
// });
// eg.loadScript('tools.js', 'test');
// 第二种做法，tools.js文件中需要这样写var tools = {
//     test: function () {},
//     demo: function () {}
// }