window.addEventListener('DOMContentLoaded', () => {
    let speed = 2000
    let currentSlide = 0
    let switcher = undefined

    let testimonials = document.querySelectorAll('.Testimony')
    let indicators = document.querySelectorAll('.Carousel-indicators')    
   
    createSafeInterval()

    function createSafeInterval(index=0) {
        clearInterval(switcher)
        switcher = setInterval(() => switchSlide(), speed)
        currentSlide = index
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
    
    for (const [index, indicator] of indicators.entries()){
        indicator.addEventListener("click", setSlide(index))
    }
})