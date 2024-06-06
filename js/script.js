'use strict'
window.addEventListener('DOMContentLoaded', ()=> {

    // === HEADER === \\\
    let header = document.querySelector('header'),
        headerBurger = document.querySelector('.burger'),
        headerMenu = header.querySelector('.header__menu')

    headerBurger.addEventListener('click', toggleMenu)
    function toggleMenu() {
        headerMenu.classList.toggle('_active')
        headerBurger.classList.toggle('_active')
        document.body.classList.toggle('lock')
    }
    function closeMenu() {
        headerMenu.classList.remove('_active')
        headerBurger.classList.remove('_active')
        document.body.classList.remove('lock')
    }
    document.addEventListener('click', (e) => {
        let withinBoundaries = e.composedPath().includes(headerMenu);
            
        if ( !withinBoundaries && !e.composedPath().includes(headerBurger)) {
            closeMenu()
        }
    })

    // === LEADER LINES === \\\
    let steps = document.querySelector('.steps'),
        stepsPics = document.querySelectorAll('.steps__pic')
    window.addEventListener('resize', addLines)
    function addLines() {
        document.querySelectorAll('.steps__line').forEach(line => {line.remove()})
        let condition = true
        for (let n = 0; n < stepsPics.length - 1; n++){
            let circlesCount = 5,
                circlesColor = '#C4C4C4',
                circlesSize = 6
            if (window.matchMedia('(max-width: 992px)').matches){
                condition = (n + 1) % 3 != 0
            }
            if (window.matchMedia('(max-width: 576px)').matches){
                condition = (n + 1) % 2 != 0
                circlesCount = 4
            }
            if (window.matchMedia('(max-width: 480px)').matches){
                circlesCount = 3
            }
            if (condition){
                let coords = [
                    {
                        'x': stepsPics[n].offsetLeft + stepsPics[n].offsetWidth,
                        'y': stepsPics[n].offsetTop + stepsPics[n].offsetHeight/2
                    },
                    {
                        'x': stepsPics[n+1].offsetLeft,
                        'y': stepsPics[n+1].offsetTop + stepsPics[n].offsetHeight/2
                    }
                ]
                steps.insertAdjacentHTML('beforeend', `
                    <svg class='steps__line' 
                    style='left: ${coords[0]['x']}px;  top: ${coords[0]['y']}px; width: ${coords[1]['x'] - coords[0]['x']}px; height: ${circlesSize}px;'
                    >
                    </svg>
                `)
                
                for (let n = 0; n < circlesCount; n++) {
                    let lastLine = document.querySelectorAll('.steps__line')[document.querySelectorAll('.steps__line').length - 1],
                        lineWidth = parseInt((getComputedStyle(lastLine).width.split('px')[0]*1) / (circlesCount + 1))
                    lastLine.insertAdjacentHTML('beforeend', `
                        <circle cx="${(n+1) * lineWidth}" cy="${circlesSize/2}" r="${circlesSize/2}" fill="${circlesColor}" />
                    `)
                }
            }
    
        }
    }; addLines()

    // new LeaderLine(stepsPics[0], stepsPics[2], {
    //     size: 8,
    //     dash: {len: 4, gap: 24},
    //     shape: 'circle', points: [[10, 15], ['90%', '70%'], [10, '80%']]
    //   });

    // === SCALE === \\\
    
    let scales = document.querySelectorAll('.scale')

    scales.forEach(scale => {
        let line = scale.querySelector('.scale__line'),
            value = scale.querySelector('.scale__value')
        noUiSlider.create(line, {
            start: [50],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });
        line.noUiSlider.on('update', function(values, handle) {
            value.innerHTML = parseInt(values[0]) + '%'
        });
    })

    // === FILES === \\\
    let files = document.querySelectorAll('.file')
    files.forEach(file => {
        let input = file.querySelector('.file__input'),
            text = file.querySelector('.file__text')
        input.addEventListener('change', ()=>{
            text.innerHTML = input.files[0].name
        })
    })

    // === SLICK SLIDER === \\\
    // $().slick({
        // arrows : true,
        // dots: true,
        // appendDots: categoriesDots,
        // slidesToShow: 4,
        // prevArrow: '<button class="toggle__btn _prev"><i class="icon-arrow-left"></i></button>',
        // nextArrow: '<button class="toggle__btn _next"><i class="icon-arrow-right"></i></button>',
        // infinite: false,
        // responsive: [
        //     {
        //       breakpoint: 768.1,
        //       settings: {
        //           slidesToShow: 2,
        //       }
        //     },
        //     {
        //       breakpoint: 360.1,
        //       settings: {
        //           slidesToShow: 1,
        //       }
        //     }
        // ]
    // })

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
                    titleText.textContent = item.textContent
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
    
    // === DROPDOWN === \\
    let forms = document.querySelectorAll('form.form')
    forms.forEach(form => {
        let submit = form.querySelector('._submit')
        submit.addEventListener('click', ()=>{checkForm(form)})
    })

    function checkForm(form) {
        let inputs = form.querySelectorAll('.form__input'),
            email = form.querySelector('._email input'),
            status = true

        inputs.forEach(input => {
            if (input.classList.contains('_required')){
                if (input.value == ''){
                    status = false
                    input.parentNode.classList.add('_error')
                }
                else {
                    input.parentNode.classList.remove('_error')
                }
            }
        })
        if (email.classList.contains('_required') && checkEmail(email) == false){
            status = false
        }
        status ? alert("Форма отправлена") : ''
    }
    // === TABS === \\
    // let tabs = document.querySelectorAll('.tabs')
    // tabs.forEach(item => {
    //     let tabsTitles = item.querySelectorAll('.tabs__title'),
    //         tabsItems = item.querySelectorAll('.tabs__item')

    //     tabsTitles.forEach(title => {
    //         title.addEventListener('click', ()=>{
    //             for (let n = 0; n < tabsTitles.length; n++){
    //                 if (tabsTitles[n] == title){
    //                     tabsTitles[n].classList.add('_active')
    //                     tabsItems[n].classList.add('_active')
    //                 }
    //                 else {
    //                     tabsTitles[n].classList.remove('_active')
    //                     tabsItems[n].classList.remove('_active')
    //                 }
    //             }
    //         })
    //     })
    // })

    // === RADIO BUTTONS === \\
    // let radios = document.querySelectorAll('.radio')

    // radios.forEach(item => {radio(item)})
    // function radio(radio) {
    //     let radioItems = radio.querySelectorAll('.radio__item')
    //     radioItems.forEach(item =>{
    //         item.addEventListener('click', ()=>{
    //             radioItems.forEach(i => {i.classList.remove('_active')})
    //             item.classList.add('_active')
    //         })
    //     })
    // }

    // === INPUT MASK === \\\
    // $(elem).mask("9999 9999 9999 9999")
    
    // === CHECK EMAIL === \\\
    function checkEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email.value)){
            email.parentNode.classList.add('_error')
            email.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            return false
        }
        else{
            email.parentNode.classList.remove('_error')
            return true
        }
    }

    // === MEDIA QUERIES === \\\
    function mediaQueries() {
        if (window.matchMedia('(max-width: 992px)').matches && window.matchMedia('(min-width: 576px)').matches){
            let forms = document.querySelectorAll('form.form')
            forms.forEach(form => {
                let scale = form.querySelector('._scale'),
                    submit = form.querySelector('._submit'),
                    fields = form.querySelectorAll('.form__field'),
                    countCols = (getComputedStyle(form).gridTemplateColumns.match(/px/g) || []).length

                if (fields.length % 2 != 0){
                    scale.style.gridRowStart = Math.ceil(fields.length / countCols)
                    scale.style.gridColumn = 'span 2'
                }
            })
            
        }
        if (window.matchMedia('(max-width: 768px)').matches){
            
        }
        if (window.matchMedia('(max-width: 576px)').matches){
            
        }
        if (window.matchMedia('(max-width: 360px)').matches){
            
        }
    };
    
    mediaQueries()
    window.addEventListener('resize', mediaQueries)
})