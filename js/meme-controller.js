'use strict'

var gElCanvas
var gCtx
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInitCanvas(elImg) {
    // console.log(elImg)
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    initMeme()
    document.querySelector('.line-txt').value = ''
    document.querySelector('.meme-editor').style.display = 'block'
    setImg(elImg.id)
    addListeners()
    renderMeme()
}

function renderMeme() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    const MEME = getMeme()
    const elIMG = document.getElementById(MEME.selectedImgId)
    gCtx.drawImage(elIMG, 0, 0, gElCanvas.width, gElCanvas.height)
    const SELECTEDLINE = MEME.selectedLineIdx
    MEME.lines.forEach(function (line, i) {
        const TXT = line.txt
        const SIZE = line.size
        const COLOR = line.color
        const STROKE = line.stroke
        const FONT = line.font
        const ALIGN = line.align
        const POS = { x: line.x, y: line.y }
        const ISDRAG = line.isDrag

        drawText(TXT, SIZE, COLOR, STROKE, FONT, ALIGN, POS)

        if (!ISDRAG && SELECTEDLINE === i && MEME.isEdit) darwTextArea(POS, SIZE)

    });

}

function onChangeText() {
    const TXT = document.querySelector('.line-txt').value
    changeText(TXT)
    renderMeme()
}

function addListeners() {
    document.querySelector('.line-txt').addEventListener('input', onChangeText)
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}



function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    console.log(pos);
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    const line = getLine()
    document.querySelector('.line-txt').value = line.txt
    renderMeme()
}

function onMove(ev) {
    const line = getLine();
    if (!line.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    setTextDrag(false)
    document.body.style.cursor = 'grab'
}

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

function drawText(txt, size, color, stroke, font, align, pos) {
    gCtx.lineWidth = '2'
    const currFont = `${size}px ${font}`
    gCtx.font = currFont
    gCtx.fillStyle = color
    gCtx.textAlign = align
    gCtx.fillText(txt, pos.x, pos.y);
    gCtx.strokeStyle = stroke
    gCtx.strokeText(txt, pos.x, pos.y)
}

function darwTextArea(pos, size) {
    gCtx.beginPath();
    gCtx.moveTo(50, pos.y + 10);
    gCtx.lineTo(450, pos.y + 10);
    gCtx.moveTo(50, pos.y - size);
    gCtx.lineTo(450, pos.y - size);
    //   gCtx.rect(50, pos.y + 10, 400, -size - 10);
    gCtx.closePath();
    gCtx.strokeStyle = '#1b1b1b';
    gCtx.stroke();
}


function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onSetStroke(stroke) {
    setStroke(stroke)
    renderMeme()
}
function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onClearText() {
    const isSure = clearText()
    renderMeme()
    if (isSure) document.querySelector('.line-txt').value = ''
}

function onAlignText(alignTo) {
    alignText(alignTo)
    renderMeme()
}

function onEdit() {
    setEdit(true)
    renderMeme()
}

function onSubmitTxt() {
    console.log('hi')

}

function onChangeLine() {
    changeLine()
    renderMeme()
    // document.querySelector('.line-txt').value = ''
    const line = getLine()
    document.querySelector('.line-txt').value = line.txt
}

function onAddLine() {
    addLine()
    renderMeme()
    const line = getLine()
    document.querySelector('.line-txt').value = line.txt
}

function onDownloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onSaveMeme() {
    saveMeme()
    document.querySelector('.line-txt').value = ''
    setEdit(false)
    renderMeme()
    alert('meme savad')
}

function onSetMeme(meme, Img) {
    onInitCanvas(Img)
    setMeme(meme)
    renderMeme()
}