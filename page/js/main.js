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

    function switchSlide(index) {
        carouselHide(currentSlide)
        currentSlide = (currentSlide + 1) % 3
        carouselShow(currentSlide)
    }

    function carouselHide(index) {
        $('.Testimony').eq(index).fadeOut("slow")
        testimonials[index].classList.add('Testimony--hiden')
        indicators[index].checked = false
    }

    function carouselShow(index) {
        $('.Testimony').eq(index).fadeIn("slow")
        indicators[index].checked = true
        testimonials[index].classList.remove('Testimony--hiden')
    }

    function setSlide(index) {
        return () => {
            carouselHide(currentSlide)
            currentSlide = index
            carouselShow(currentSlide)
        }
    }

    for (const [index, indicator] of indicators.entries()){
        indicator.addEventListener("click", setSlide(index))
    }

})
