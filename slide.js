const heroDots = document.querySelectorAll('.hero__dot')
const leftArrow = document.querySelectorAll('.hero__arrow')[0]
const rightArrow = document.querySelectorAll('.hero__arrow')[1]
const heroBackground = document.querySelector('.hero__img')
const heroTitle = document.querySelector('.hero__title')

function heroVersion1() {
    heroBackground.style.backgroundImage = "url('../image/hero/stay_healthy.jpg')"
    const stayHealthy = "Stay healthy."
    heroTitle.textContent = stayHealthy
}
function heroVersion2() {
    heroBackground.style.backgroundImage = "url('../image/hero/stay_happy.jpg')"
    const stayHappy = "Stay happy."
    heroTitle.textContent = stayHappy
}
function heroVersion3() {
    heroBackground.style.backgroundImage = "url('../image/hero/stay_clean.jpg')"
    const stayClean = "Stay clean."
    heroTitle.textContent = stayClean
}

const heroInterval = setInterval(nextSlide, 5000);
const arrOfHeroVersion = [heroVersion1, heroVersion2, heroVersion3]
let indexHero = 0

function prevSlide() {
    if (indexHero == 0) {
        indexHero = arrOfHeroVersion.length-1;
    }
    else {
        indexHero--;
    }
    changeSlide();
}

function nextSlide() {
    if(indexHero == arrOfHeroVersion.length-1) {
        indexHero = 0;
    }
    else {
        indexHero++;
    }
    changeSlide();
}

function changeSlide() {
    arrOfHeroVersion[indexHero]()
    changeDot()
}

function changeDot() {
    if(indexHero === 0) {
        changeDotToActive1();
     } else if (indexHero === 1) {
        changeDotToActive2()
     } else if (indexHero === 2) {
        changeDotToActive3()
    }
}
function stopInterval() {
    clearInterval(heroInterval);
}

function changeDotToActive1() {
    heroDots[0].classList.add("hero__dot--active");
    heroDots[1].classList.remove("hero__dot--active");
    heroDots[2].classList.remove("hero__dot--active");
}

function changeDotToActive2() {
    heroDots[1].classList.add("hero__dot--active");
    heroDots[0].classList.remove("hero__dot--active");
    heroDots[2].classList.remove("hero__dot--active");
}
function changeDotToActive3() {
    heroDots[2].classList.add("hero__dot--active");
    heroDots[0].classList.remove("hero__dot--active");
    heroDots[1].classList.remove("hero__dot--active");
}

leftArrow.addEventListener('click', function() {
    stopInterval()
    prevSlide();
})

rightArrow.addEventListener('click', function() {
    stopInterval()
    nextSlide();
})

heroDots[0].addEventListener('click', function() {
    stopInterval()
    heroVersion1();
    changeDotToActive1();
})

heroDots[1].addEventListener('click', function() {
    stopInterval()
    heroVersion2();
    changeDotToActive2();
})

heroDots[2].addEventListener('click', function() {
    stopInterval()
    heroVersion3();
    changeDotToActive3();
})
