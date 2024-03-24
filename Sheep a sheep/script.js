// 基础数据
const simpleData = [
    { name: '虎', color: '#ff1100' },
    { name: '兔', color: '#ff8800' },
    { name: '牛', color: 'green' },
    { name: '羊', color: 'blue' },
    { name: '蛇', color: '#779922' },
    { name: '鼠', color: '#335577' }
]
// 卡片大小
const size = 50
// 矩阵行
const rows = 10
// 矩阵列
const cols = 10
// 每组为3个
const oneGoupCount = 3
// 每个卡片有x组
const group = 6
// 总共6层，即6个表格
const layerCount = 6
// 表格html
const cellHtml = []
// 将生成所有的十二生肖
const renderData = Array.from(new Array(oneGoupCount * group)).map(v => {
    return simpleData.map(v => ({ ...v }))
}).flat().sort(v => Math.random() - 0.5)
// 第一步：绘制出表格矩阵
for (let ly = layerCount - 1; ly >= 0; ly--) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let pyStep = (ly + 1) % 2 === 0 ? size / 2 : 0
            let item = (Math.random() > 0.7 && renderData.pop())

            item && cellHtml.push(`<div class="item" onclick="move(this)" id="m${ly}-${i}-${j}"
                    style="width:${size}px;height:${size}px;left:${size * j + pyStep}px;top:${size * i + pyStep}px;background-color:${item.color || ''}">${item.name || ''}</div>`)
        }
    }
}
const main = document.querySelector('.main')
const moveList = document.querySelector('.move-list')
main.innerHTML = cellHtml.reverse().join('')
main.style.height = `${size * rows + size * 2}px`
main.style.width = `${size * cols}px`
moveList.style.height = `${size}px`
moveList.style.width = `${size * 6}px`
// 第二步：计算被遮住的底牌需标暗色
const checkDisabled = (items) => {
    (items || main.querySelectorAll('.item')).forEach((v, i) => {
        const arr = v.id.substring(1).split('-').map(v => Number(v))
        const isPy = (arr[0] + 1) % 2 === 0
        for (let i = arr[0] + 1; i <= layerCount - 1; i++) {
            const isPyB = (i + 1) % 2 === 0
            if (isPy === isPyB) {
                const el = main.querySelector(`#m${i}-${arr[1]}-${arr[2]}`)
                if (el) {
                    v.classList.add('disabled')
                    break;
                }
            } else if (isPy && !isPyB) {
                if (![
                    `${i}-${arr[1]}-${arr[2]}`,
                    `${i}-${arr[1]}-${arr[2] + 1}`,
                    `${i}-${arr[1] + 1}-${arr[2]}`,
                    `${i}-${arr[1] + 1}-${arr[2] + 1}`
                ].every(k => {
                    return !main.querySelector('#m' + k)
                })) {
                    v.classList.add('disabled')
                    break;
                } else {
                    v.classList.remove('disabled')
                }

            } else if (!isPy && isPyB) {
                if (![
                    `${i}-${arr[1]}-${arr[2]}`,
                    `${i}-${arr[1]}-${arr[2] - 1}`,
                    `${i}-${arr[1] - 1}-${arr[2]}`,
                    `${i}-${arr[1] - 1}-${arr[2] - 1}`
                ].every(k => {
                    return !main.querySelector('#m' + k)
                })) {
                    v.classList.add('disabled')
                    break;
                } else {
                    v.classList.remove('disabled')
                }

            }
        }
    })
}
// 第三步：点击卡片进行消除计算
let canMove = true
// 点击棋子，动画移动
const move = (me) => {
    let left = moveList.offsetLeft
    let top = moveList.offsetTop
    if (!canMove || me.className.indexOf('disabled') >= 0) {
        return
    }
    canMove = false
    if (moveList.children.length > 0) {
        let el = moveList.children[moveList.children.length - 1]
        left = el.offsetLeft + size
        top = el.offsetTop
    }
    me.style.top = `${top}px`
    me.style.left = `${left}px`
    me.transitionNamesCount = 0
    me.ontransitionend = (e) => {
        me.transitionNamesCount++
        if (me.transitionNamesCount === 2) {
            moveEnd(me)
            canMove = true
        }

    }
}
// 动画结束的相关计算
const moveEnd = (me) => {
    me.ontransitionend = null
    me.setAttribute('onclick', '')
    moveList.appendChild(me)

    const findResult = [...moveList.children].filter(v => v.innerHTML === me.innerHTML)
    if (findResult.length === 3) {
        findResult.forEach(v => {
            v.ontransitionend = (e) => {
                moveList.removeChild(v)
                    ;[...moveList.children].forEach((v, i) => {
                        v.style.left = `${i * size + moveList.offsetLeft}px`
                    })
            }
            setTimeout(() => v.style.transform = 'scale(0)')
        })

    }

    setTimeout(() => {
        if (moveList.children.length === 6) {
            alert('池子已满，游戏结束')
            return location.reload()
        } else if (main.children.length === 0) {
            alert('恭喜通关')
            return location.reload()
        }
    }, 1000)
    checkDisabled()
}
checkDisabled()