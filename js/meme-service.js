'use strict'


var gMeme = {
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

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    console.log(gMeme.selectedImgId)
}

function getMeme(){
    return gMeme
}