'use strict'
window.addEventListener('load', ()=> {
    // === TITLES === \\\
    let titles = document.querySelectorAll('.title')

    titles.forEach(title => {
        let text = title.innerHTML
        title.innerHTML = ''
        for (let n = 0; n < text.split('<br>').length; n++){
            title.insertAdjacentHTML('beforeend', '<span></span>')
            let lastSpan = document.querySelectorAll('span')[document.querySelectorAll('span').length - 1]
            lastSpan.insertAdjacentHTML('beforeend', `<span class="_text">${text.split('<br>')[n]}<span>`)
            lastSpan.insertAdjacentHTML('afterbegin', `<span class="_shadow">${text.split('<br>')[n]}<span>`)
        }
    })

    // === SLICK SLIDER === \\\
    $('.path__list').slick({
        arrows : true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('.path__toggle._prev'),
        nextArrow: $('.path__toggle._next'),
        appendArrows: $('.path__slider'),
        appendDots: $('.path__dots'),
        infinite: true,
    })

//     // === INPUT MASK === \\\
//     // $('._birthday').mask("99.99.9999")
    
//     // === DROPDOWN === \\
//     // let dropdowns = document.querySelectorAll('.dropdown') 
//     // dropdowns.forEach(item => dropdown(item))
//     // function dropdown(dropdown) {
//     //     let title = dropdown.querySelector('.dropdown__title'),
//     //         titleText = dropdown.querySelector('.dropdown__title_text'),
//     //         items = dropdown.querySelectorAll('.dropdown__item')

//     //     title.addEventListener('click', ()=>{ dropdown.classList.toggle('_open') })

//     //     if (items) {
//     //         items.forEach(item => {
//     //             item.addEventListener('click', ()=>{
//     //                 // titleText.textContent = item.textContent
//     //                 items.forEach(i => {  i.classList.remove('_active')  })
//     //                 item.classList.add('_active')
//     //                 dropdown.classList.remove('_open')
//     //             })
//     //         })
//     //     }

//     //     document.addEventListener('click', (e) => {
//     //         let withinBoundaries = e.composedPath().includes(dropdown);
                
//     //         if (!withinBoundaries) {
//     //             dropdown.classList.remove('_open')
//     //         }
//     //     })
//     // }
})