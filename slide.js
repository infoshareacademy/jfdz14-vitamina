const leftArrow = document.querySelectorAll('.hero__arrow')[0];
const rightArrow = document.querySelectorAll('.hero__arrow')[1];
const heroDots = document.querySelectorAll('.hero__dot');
const heroSlides = document.querySelectorAll('.hero__img');

const heroInterval = setInterval(nextSlide, 5000);
let indexHero = 0;

function prevSlide() {
    if (indexHero == 0) {
        indexHero = heroSlides.length-1;
    }
    else {
        indexHero--;
    }
    changeSlide();
}
function nextSlide() {
    if (indexHero == heroSlides.length-1) {
        indexHero = 0;
    }
    else {
        indexHero++;
    }
    changeSlide();
}

function changeSlide() {
    heroSlides.forEach(slide => {
        if (slide.classList.contains("active")){
            slide.classList.remove("active");}
    })
    heroSlides[indexHero].classList.add("active");

    heroDots.forEach(dot => {
        if (dot.classList.contains("active")){
            dot.classList.remove("active");}
    })
    heroDots[indexHero].classList.add("active")
}

function stopInterval() {
    clearInterval(heroInterval);
}

leftArrow.addEventListener('click', (event) => {
    stopInterval();
    prevSlide();
})
rightArrow.addEventListener('click', (event) => {
    stopInterval();
    nextSlide();
})

heroDots.forEach((dot, indexDots) => {
    dot.addEventListener('click', (event) => {
        stopInterval();
        changeSlide(indexHero = indexDots);
    })
})
