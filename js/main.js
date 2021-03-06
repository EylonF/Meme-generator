'use strict'


function toggleWho() {
    if (document.body.classList.contains('modal-open')) toggleModal()
    if (document.body.classList.contains('menu-open')) toggleMenu()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function toggleModal(value) {
    document.body.classList.toggle('modal-open');
    if (!value) return
    _renderModal(value)
}

function _renderModal(value) {
    let elModal = document.querySelector('.modal')
    switch (value) {
        case 'saved-memes':
            const memes = loadFromStorage(STORAGE_KEY)
            let strHtmls = `<div class="imgs-container">`
            let txtStrs 
            const strs = memes.map(function (meme,i) {
                txtStrs = meme.lines.map(function (line) {
                    return `
                    <p>${line.txt}</p>
                    `
                });
                
                const str =`
                <div class="meme-card flex">
                <img id="${i}" onclick="onRestoreMeme(this)" src="imgs/${meme.selectedImgId}.jpg">
                <div class="lines flex">
                ${txtStrs.join('')}
                </div>
                </div>
                `
                return str
            });
            strHtmls += `${strs.join('')}</div>` 
            // console.log(strHtmls)
            elModal.innerHTML = strHtmls
            break;

        case 'about':
            elModal.innerHTML =
                `<div class="about-container flex align-center">
            <img class="mx-auto rounded-circle" src="imgs/me.jpg" alt="">
            <h4 class="title">Eylon Frisch</h4>
            <p class="sutitle">Full-Stack Developer</p>
            <ul class="social-buttons clean-list flex">
                <li>
                    <a target=”_blank”
                        href="https://mail.google.com/mail/u/0/?fs=1&to=eylonfrish@gmail.com&su=SUBJECT&body=BODY&tf=cm">
                        <i class="fa fa-envelope"></i>
                    </a>
                </li>
                <li>
                    <a target=”_blank” href="https://www.facebook.com/eylonf/">
                        <i class="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a target=”_blank” href="https://www.linkedin.com/in/eylon-frisch-394634224/">
                        <i class="fa fa-linkedin"></i>
                    </a>
                </li>
            </ul>

            <p class="info">Hi my name is Eylon , I am 27 years old, living in Herzeliya with my
                partner Noy, and Stormi, our beautiful cat.</p>
        
        </div>  
            `
            break;

        default:
            break;
    }
}

function onRestoreMeme(elImg){
    const memes = loadFromStorage(STORAGE_KEY)
    // console.log(elImg)
    console.log(+elImg.id)
    memes.forEach(function (meme,i) {
        console.log(i)
        if (+elImg.id === i) onSetMeme(meme)
    });
    toggleModal()
}

function onImgInput(ev) {
    
    loadImageFromInput(ev, onPushImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = (event) => {
        console.log('onload');
        var img = new Image()
        // Render on canvas
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
    }
    console.log('after');
    reader.readAsDataURL(ev.target.files[0])
}

