'use strict'
window.addEventListener('load', ()=> {
    if (window.matchMedia('(min-width: 768.1px)').matches){
        let reviewsContainer = document.querySelector('.reviews__container'),
            reviewsList = document.querySelector('.reviews__list'),
            reviewsResults = document.querySelector('.reviews__results')
    
        reviewsList.style.marginLeft = reviewsResults.offsetWidth - reviewsContainer.offsetLeft + 96 + 'px'
        let reviewsItems = document.querySelectorAll('.reviews__item'),
            reviewsCount = (reviewsItems.length - (reviewsItems.length % 3)) / 3 + 1,
            reviewsIndex = 0
    
        for (let n = 0; n < reviewsCount; n++){
            reviewsList.insertAdjacentHTML('beforeend', '<div class="reviews__block"></div>')
            for (let i = 0; i < 3; i++){
                try{
                    let lastBlock = document.querySelectorAll('.reviews__block')[document.querySelectorAll('.reviews__block').length - 1]
                    lastBlock.insertAdjacentElement('beforeend', reviewsItems[reviewsIndex])
                    
                    reviewsIndex++
                }
                catch { }
            }
        }
    
    }

    // === SLICK SLIDER === \\\
    $('.reviews__list').slick({
        arrows : true,
        dots: false,
        slidesToShow: 1,
        prevArrow: $('.reviews .slider__toggle_btn._prev'),
        nextArrow: $('.reviews .slider__toggle_btn._next'),
        infinite: false,
    })
    // === MODAL WINDOW === \\
    let modal = document.querySelector('.modal'),
        modalWindow = modal.querySelector('.modal__window'),
        send = modal.querySelector('.form__send'),
        close = modal.querySelector('.modal__close'),
        inputs = modal.querySelectorAll('[required]')

    send.addEventListener('click', ()=>{
        let status = true
        inputs.forEach(input => {
            input.value == '' ? status = false : ''
        })
        if (status) {
            modalWindow.style.width = modalWindow.offsetWidth + 'px'
            modalWindow.style.height = modalWindow.offsetHeight + 'px'
            modalWindow.innerHTML = '<h4 class="modal__title">Заявка отправлена!</h4>'
            setTimeout(() => {
                modal.classList.remove('_open')
            }, 5000);
        }
        else {
            alert('Заполните необходимые поля')
        }
    })
    close.addEventListener('click', ()=>{
        modal.classList.remove('_open')
    })

    setTimeout(() => {
        modal.classList.add('_open')
    }, 10000);

    // === INPUT MASK === \\\
    $('._birthday').mask("99.99.9999")
    
    // === DROPDOWN === \\
    let dropdowns = document.querySelectorAll('.dropdown') 
    dropdowns.forEach(item => dropdown(item))
    function dropdown(dropdown) {
        let title = dropdown.querySelector('.dropdown__title'),
            titleText = dropdown.querySelector('.dropdown__title_text'),
            items = dropdown.querySelectorAll('.dropdown__item')

        title.addEventListener('click', ()=>{ dropdown.classList.toggle('_open') })

        if (items) {
            items.forEach(item => {
                item.addEventListener('click', ()=>{
                    // titleText.textContent = item.textContent
                    items.forEach(i => {  i.classList.remove('_active')  })
                    item.classList.add('_active')
                    dropdown.classList.remove('_open')
                })
            })
        }

        document.addEventListener('click', (e) => {
            let withinBoundaries = e.composedPath().includes(dropdown);
                
            if (!withinBoundaries) {
                dropdown.classList.remove('_open')
            }
        })
    }
    

    // === FOOTER CONTACTS MOBILE === \\
    if (window.matchMedia('(max-width: 375px)').matches){
        let footerContainer = document.querySelector('.footer__container'),
            footerContacts = document.querySelector('.footer__contacts')
        footerContainer.insertAdjacentElement('afterbegin', footerContacts)
    }
})