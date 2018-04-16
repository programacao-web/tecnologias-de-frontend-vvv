window.addEventListener('DOMContentLoaded', () => {
    let speed = 7000
    let currentSlide = 0
    let switcher = undefined
    let switcherIsRunning = true

    let testimonials = document.querySelectorAll('.Testimony')
    let indicators = document.querySelectorAll('.Carousel-control-indicators')   
    let playControl = document.querySelector('.Carousel-control-play')
    let pauseControl = document.querySelector('.Carousel-control-pause')
   
    createSafeInterval()

    function createSafeInterval(index=currentSlide) {
        currentSlide = index

        if (switcherIsRunning) {
            clearInterval(switcher)
            switcher = setInterval(() => switchSlide(), speed)
        }
    }
    
    function switchSlide() {
        for (let i = 0; i < indicators.length; i++) {
            carouselHide(i)
        }

        currentSlide = (currentSlide + 1) % 3
        carouselShow(currentSlide)
    }

    function carouselHide(index) {
        testimonials[index].classList.add('Testimony--hiden')
        indicators[index].checked = false
    }
    
    function carouselShow(index) {
        indicators[index].checked = true
        testimonials[index].classList.remove('Testimony--hiden')
    }

    function setSlide(index) {
        return () => {
            for (let i = 0; i < indicators.length; i++) {
                indicators[i].setAttribute('data-state', '')
                testimonials[i].setAttribute('data-state', '')
    
                carouselHide(i)
            }
            createSafeInterval(index)
            carouselShow(index)
        }
    }

    function activateCarousel() {
        pauseControl.classList.remove('Carousel-control--hide')
        playControl.classList.add('Carousel-control--hide')

        switcherIsRunning = true
        createSafeInterval()        
    }

    function deactivateCarousel() {
        pauseControl.classList.add('Carousel-control--hide')
        playControl.classList.remove('Carousel-control--hide')
        
        switcherIsRunning = false
        clearInterval(switcher)
    }
    
    for (const [index, indicator] of indicators.entries()){
        indicator.addEventListener("click", setSlide(index))
    }

    playControl.addEventListener("click", activateCarousel)
    pauseControl.addEventListener("click", deactivateCarousel)

})