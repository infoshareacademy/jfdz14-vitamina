const heroDots = document.querySelectorAll('.hero__dot');
const leftArrow = document.querySelectorAll('.hero__arrow')[0];
const rightArrow = document.querySelectorAll('.hero__arrow')[1];
const heroSlide = document.querySelectorAll('.hero__img');

const heroInterval = setInterval(nextSlide, 5000);
let indexHero = 0;
let n = 0;

function prevSlide() {
    if (indexHero == 0) {
        indexHero = heroSlide.length-1;
    }
    else {
        indexHero--;
    }
    changeSlide();
}
function nextSlide() {
    if(indexHero == heroSlide.length-1) {
        indexHero = 0;
    }
    else {
        indexHero++;
    }
    changeSlide();
}
function changeSlide() {
    for(let i = 0; i < heroSlide.length; i++){
        heroSlide[i].classList.remove("active");
        heroDots[i].classList.remove("active");
   }
    heroSlide[indexHero].classList.add("active");
    heroDots[indexHero].classList.add("active");  
}
function currentSlide(n) {
    changeSlide(indexHero = n);
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
heroDots[0].addEventListener('click', (event) => {
    stopInterval();
    currentSlide(0);
})
heroDots[1].addEventListener('click', (event) => {
    stopInterval();
    currentSlide(1);
})
heroDots[2].addEventListener('click', (event) =>{
    stopInterval();
    currentSlide(2);
})