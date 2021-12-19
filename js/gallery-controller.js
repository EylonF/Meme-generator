'use strict'

function renderGallery() {
    const imgs = getImgs()

    const strHtmls = imgs.map(function (img) {
        return `<img class="img${img.id}" id="${img.id}" src="${img.url}" data-keywords="${img.keywords}" onclick="onInitCanvas(this)">`
    })
    
    document.querySelector('.imgs-container').innerHTML = strHtmls.join('')
}

function onPushImg(img){
    pushImg(img)
    console.log(img)
    renderGallery()
    // onInitCanvas(elImg)
}