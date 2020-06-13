const cookie = document.querySelector('.cookie');
const cookieButton = document.querySelector('.cookie__button');

function addCookie(cookieKey) {
     localStorage.setItem(cookieKey, 'yes');
}

setTimeout(() => {
     const cookieAccept = localStorage.hasOwnProperty('cookieAccept');
     if (cookieAccept === false){
          cookie.classList.remove('hidden');
     }
}, 1500);
cookieButton.addEventListener('click', () => {
     addCookie('cookieAccept')
     cookie.classList.add('hidden');
})

const navigation = document.querySelector('.navigation');
const burger = document.querySelector('.navigation__burger');
const navigationMenu = document.querySelector('.navigation__menu');

burger.addEventListener('click', () => {
     if (!navigation.classList.contains('active')) {
          navigation.classList.add('active');
     } else {
          navigation.classList.remove('active');
     }
})

navigationMenu.addEventListener('click', () => {
     navigation.classList.remove('active');
})

/* carousel */

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

/* modal window */

const modalWindow = document.querySelector('.modal__overlay');
const closeButton = document.querySelector('.modal__close');

setTimeout(showModal, 7000);

function closeModal() {
    modalWindow.classList.remove("active");
}
function showModal() {
    modalWindow.classList.add("active");
}
function outsideClick(event) {
    if (event.target == modalWindow) {
        closeModal();
    }
  }
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

/* email validation*/

const email = document.querySelector('.modal__email');
const form = document.querySelector('.modal__form');
const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailErrorText = document.querySelector('.modal__email__error__text');
const modalSubmit = document.querySelector('.modal__submit');

modalSubmit.addEventListener('click', checkEmail)
 
function checkEmail(event) {
    event.preventDefault();
    const emailValue = (email.value.trim()).toLowerCase();
    if (emailValue === '' || !emailReg.test(emailValue)) {
        emailErrorText.classList.add('error');
        email.classList.add('error');
    }
    else {
        localStorage.setItem('email', emailValue);
        window.open("/game.html"); /*tutaj jakis odpalacz gierki*/
        closeModal();
    }
}

form.addEventListener('focusin', (event) => {   
    email.classList.remove("error");
    emailErrorText.classList.remove("error");
  });
