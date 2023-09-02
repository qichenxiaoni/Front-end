//初始化controller
var controller = new ScrollMagic.Controller()

//滚动位置确定
var scene = new ScrollMagic.Scene({
    triggerElement: '#section2'
}).setTween('#bg img', {
    maxWidth: '1200px',
    top: '0%',
    left: '40%',
    opacity: 0.6
}).addTo(controller)

//确定第二个滚动位置
var scene = new ScrollMagic.Scene({
    triggerElement: '#section3',
    duration: 300
}).setTween('#bg img', {
    top: '20%'
}).addTo(controller)