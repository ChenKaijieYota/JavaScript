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