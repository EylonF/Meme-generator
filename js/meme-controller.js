'use strict'

var gElCanvas
var gCtx
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInitCanvas(elImg) {
    console.log(elImg)
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    initMeme()
    document.querySelector('.line-txt').value = ''
    setImg(elImg.id)

    addListeners()
    renderMeme()
}

function renderMeme() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    const MEME = getMeme()
const elIMG = document.getElementById(MEME.selectedImgId)
gCtx.drawImage(elIMG, 0, 0, gElCanvas.width, gElCanvas.height)
    const TXT = MEME.lines[MEME.selectedLineIdx].txt
    const SIZE = MEME.lines[MEME.selectedLineIdx].size
    const COLOR = MEME.lines[MEME.selectedLineIdx].color
    const STROKE = MEME.lines[MEME.selectedLineIdx].stroke
    const FONT = MEME.lines[MEME.selectedLineIdx].font
    drawText(TXT, SIZE, COLOR, STROKE, FONT)
}

function onChangeText() {
  const TXT = document.querySelector('.line-txt').value
  changeText(TXT)
  renderMeme()
}

function addListeners() {
document.querySelector('.line-txt').addEventListener('input',onChangeText)

    // addMouseListeners()
    // addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    //     createCircle(center)
    //     renderCanvas()
    // })
}

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchend', onUp)
// }

// function onDown(ev) {
//     const pos = getEvPos(ev)
//     if (!isCircleClicked(pos)) return
//     setCircleDrag(true)
//     gStartPos = pos
//     document.body.style.cursor = 'grabbing'

// }

// function onMove(ev) {
//     const circle = getCircle();
//     if (!circle.isDrag) return
//     const pos = getEvPos(ev)
//     const dx = pos.x - gStartPos.x
//     const dy = pos.y - gStartPos.y
//     moveCircle(dx, dy)
//     gStartPos = pos
//     renderCanvas()

// }

// function onUp() {
//     setCircleDrag(false)
//     document.body.style.cursor = 'grab'
// }

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function drawText(txt, size = 50, color = 'white', stroke = 'black', font = 'impact') {
    // txt = document.querySelector('.line-txt').value

    console.log(gCtx)
    const currFont = `${size}px ${font}`
    gCtx.font = currFont
    gCtx.fillStyle = color
    gCtx.fillText(txt, 70, 70);
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = stroke
    gCtx.strokeText(txt,70,70)
}

function onIncreaseFont(){
    increaseFont()
    renderMeme()
}

function onDecreaseFont(){
    decreaseFont()
    renderMeme()
}

function onSetStroke(stroke){
    setStroke(stroke)
    renderMeme()
}
function onSetColor(color){
    setColor(color)
    renderMeme()
}

function onClearText(){
    const isSure = clearText()
    renderMeme()
    if (isSure) document.querySelector('.line-txt').value = ''
}