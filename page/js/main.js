window.addEventListener('DOMContentLoaded', () => {
    let speed = 7000
    let currentSlide = 0
    let switcherIsRunning = true

    let testimonials = document.querySelectorAll('.Testimony')
    let indicators = document.querySelectorAll('.Carousel-indicators')
    let playControl = document.querySelector('.Carousel-control-play')
    let pauseControl = document.querySelector('.Carousel-control-pause')

    let switcher = setInterval(() => switchSlide(), speed)

    function switchSlide(index) {
        carouselHide(currentSlide)
        currentSlide = (currentSlide + 1) % 3
        carouselShow(currentSlide)
    }

    function carouselHide(index) {
        $('.Testimony').eq(index).fadeOut("slow")
        testimonials[index].classList.add('Testimony--hiden')
        indicators[index].classList.remove('Carousel-indicators--active')
    }

    function carouselShow(index) {
        $('.Testimony').eq(index).fadeIn("slow")
        testimonials[index].classList.remove('Testimony--hiden')
        indicators[index].classList.add('Carousel-indicators--active')
    }

    function setSlide(index) {
        return () => {
            clearInterval(switcher)
            carouselHide(currentSlide)
            currentSlide = index
            carouselShow(currentSlide)
        }
    }

    for (const [index, indicator] of indicators.entries()){
        indicator.addEventListener("click", setSlide(index))
    }

})
