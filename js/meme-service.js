'use strict'
const STORAGE_KEY = 'memesDB'

var gMeme

function initMeme() {

    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        isEdit: false,
        lines: [
            {
                txt: '',
                size: 50,
                align: 'left',
                color: 'white',
                stroke: 'black',
                font: 'impact',
                x: 50,
                y: 70,
                isDrag: false,
            },
            {
                txt: '',
                size: 50,
                align: 'left',
                color: 'white',
                stroke: 'black',
                font: 'impact',
                x: 50,
                y: 480,
                isDrag: false,
            },
        ]
    }
    
}

function setImg(imgId) {
    console.log(imgId)
    gMeme.selectedImgId = imgId
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
}

function setStroke(stroke) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = stroke
}
function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function clearText() {
    const isSure = confirm('are you sure?')
    if (isSure) {
        let currImgId = gMeme.selectedImgId
        console.log(currImgId)
        initMeme()
        setImg(currImgId)
        return isSure
    }
}

function alignText(alignTo) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignTo
    switch (alignTo) {
        case 'left':

            gMeme.lines[gMeme.selectedLineIdx].x = 50
            break;

        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].x = 250
            break;
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].x = 450
            break;

    }
}

function isTextClicked(clickedPos) {
    let isClick = false
    gMeme.isEdit = false
    gMeme.lines.forEach(function (line, i) {
        const posX = line.x
        const posY = line.y
        const distanceY = posY - clickedPos.y
        if (distanceY <= gMeme.lines[gMeme.selectedLineIdx].size
            && distanceY > 0
            && clickedPos.x > 50
            && clickedPos.x < 450) {
            gMeme.selectedLineIdx = i
            isClick = true
            gMeme.isEdit = true
        }
    });
    return isClick
}

function setTextDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function setEdit(value) {
    console.log(value)
    gMeme.isEdit = value
}

function changeLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx >= gMeme.lines.length - 1) ? 0 : ++gMeme.selectedLineIdx
    console.log(gMeme.selectedLineIdx)
}

function addLine() {
    const newLine = {
        txt: '',
        size: 50,
        align: 'left',
        color: 'white',
        stroke: 'black',
        font: 'impact',
        x: 50,
        y: 250,
        isDrag: false,
    }
    gMeme.lines.push(newLine)
gMeme.selectedLineIdx = gMeme.lines.length -1
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function saveMeme() {
    let memes = loadFromStorage(STORAGE_KEY)
    if (!memes) memes = [gMeme]
    else memes.push(gMeme)
    saveToStorage(STORAGE_KEY, memes)
}

function setMeme(meme) {
    console.log(meme)
    initMeme()
    gMeme.lines = meme.lines
    gMeme.selectedImgId = meme.selectedImgId
}