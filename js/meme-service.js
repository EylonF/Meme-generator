'use strict'

var gMeme

function initMeme() {

    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 50,
                align: 'left',
                color: 'white',
                stroke: 'black',
                font: 'impact',
                x: 50,
                y: 50,
            },
            {
                txt: '',
                size: 50,
                align: 'left',
                color: 'white',
                stroke: 'black',
                font: 'impact',
                x: 50,
                y: 400,
            }
        ]
    }

}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    console.log(gMeme.selectedImgId)
}

function getMeme() {
    return gMeme
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 5
}
function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 5
}

function changeText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    // console.log(gMeme.lines[gMeme.selectedLineIdx].txt)
}

function setStroke(stroke) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = stroke
}
function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function clearText() {
    const isSure = confirm('are you sure?')
    if (isSure){
        const lines = gMeme.lines
        lines.forEach(function (line) {
            line.txt = ''
        });
        return isSure
    }
}