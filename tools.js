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
function addEvent(elem, type, handle) {
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

//封装阻止默认事件的函数,IE8以下还不能使用，试试return false
function cancelHandler(event) {
    if(event.preventDefault) {
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}