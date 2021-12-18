'use strict'

function onInitGallery() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()

    const strHtmls = imgs.map(function (img) {
        return `<img id="${img.id}" src="${img.url}" data-keywords="${img.keywords}" onclick="onInitCanvas(this)">`
    })
    
    document.querySelector('.imgs-container').innerHTML = strHtmls.join('')
}