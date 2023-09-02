const buy = document.querySelector('.buy')
const back = document.querySelector('.back-button')

var t1 = new TimelineMax().paused(true).reversed(true)
var t2 = new TimelineMax().paused(true).reversed(true)

buy.addEventListener('click', (e) => {
    t2.play()
})

back.addEventListener('click', (e) => {
    t2.reverse()
})

t1.play()

// t1的动画效果
t1.to('.car-1', 1, { rotate: 0, ease: "elastic.out(1, .8)", top: '10%' })
t1.to('.menu', 1, {
    ease: "elastic.out(1, .8)", left: 30
}, 0)
t1.to('.profile', 1, {
    ease: 'elastic.out(1 , .8)', right: 30
}, 0)
t1.to(
    ".container h1",
    1,
    {
        ease: "elastic.out(1 , .8) ",
        bottom: "25%",
    },
    0.3
);
t1.to(
    ".container p",
    1,
    {
        ease: "elastic.out(1 , .8) ",
        bottom: "14%",
    },
    0.4
);
t1.from(
    ".buy", 1, {
    ease: "elastic.out(1 , .8) ",
    scale: 0
}, 0.6
)

//t2的动画效果
t2.to(".car-1", 1, {
    ease: "elastic.out(1 , .8)",
    top: '-60%'
})
t2.to(
    ".menu", 1,
    {
        ease: "power1.inOut",
        left: -30,
    },
    0
);
t2.to(
    ".profile", 1,
    {
        ease: "power1.inOut",
        right: -30,
    },
    0
);
t2.to(
    ".container h1", 1,
    {
        ease: "elastic.out(.5 , .8)",
        bottom: "-25%",
    },
    0
);
t2.to(
    ".container p", 1,
    {
        ease: "elastic.out(.5 , .8)",
        bottom: "-14%",
    },
    0
);
t2.to('.buy i ', 0.3, {
    ease: "power1.inOut",
    scale: 0
}, 0)
t2.to(
    '.buy', 0.6, {
    ease: "power1.inOut",
    scale: 16,
    width: 378,
}, 0.3
)
t2.to('.back-button', 1, {
    ease: 'elastic.out(1 , .8)', bottom: "5%"
}, 0.7)
t2.to(
    ".car-final",
    1,
    {
        ease: "elastic.out(1 , .8)",
        left: "50%",
    },
    0.5
);

t2.to(
    ".container h2", 1,
    {
        ease: "elastic.out(1 , .8)",
        left: "60%",
    },
    0.5
);

t2.to(
    ".summary",
    1.5,
    {
        ease: "elastic.out(1 , .8)",
        left: "52%",
    },
    0.6
);

t2.to(
    ".summary-2",
    1,
    {
        ease: "elastic.out(1 , .8)",
        left: "52%",
    },
    0.7
);