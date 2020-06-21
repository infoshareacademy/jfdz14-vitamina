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

// burger menu mobile

const navigation = document.querySelector('.navigation');
const burger = document.querySelector('.navigation__burger');
const navigationMenu = document.querySelector('.navigation__menu');
const burgerInput = document.querySelector('.navigation__burger__checkbox');
const arrowToTop = document.querySelector('.navigation__arrow');
const heroSection = document.getElementsByClassName('features');


burger.addEventListener('click', () => {
     burgerInput.checked = true;
     if (!navigation.classList.contains('active')) {
          navigation.classList.add('active');
     } else {
          navigation.classList.remove('active');
     }
})
navigationMenu.addEventListener('click', () => {
     navigation.classList.remove('active');
})
arrowToTop.addEventListener('click', () => {
     window.scrollTo(0, 0);
})


//active navbar elements

function activateMenuLink(allLinks, linkToActivate) { 
     for(let i = 0; i < allLinks.length; i++){ 

          let link = allLinks[i]; 

          if (link.classList.contains('active')) { 
               link.classList.remove("active");
          }
     }

     if (!linkToActivate.classList.contains('active')) { 
          linkToActivate.classList.add("active");
     }

     let href = linkToActivate.getAttribute("href"); 

     window.history.pushState(href, "Vitamina - "+href, href); 
}

const navigationMenuContainer = document.querySelector(".navigation");
const navigationMenuElement = document.querySelector(".navigation__menu__list");
const navigationMenuElementFocus = document.querySelectorAll(".navigation__menu__list__link");

for (let i = 0; i < navigationMenuElementFocus.length; i++) {
          navigationMenuElementFocus[i].addEventListener("click", (event) => {
          activateMenuLink(navigationMenuElementFocus, event.target); 
     });
}

// scroll handler

let linksDestination = document.getElementsByClassName("linkLoc"); 
let links = document.getElementsByClassName("navigation__menu__list__link"); 
let positionsList = []; 
let linkHrefs = []; 

for(let i = 0; i < links.length; i++){
     let link = links[i]; 
     linkHrefs.push(link.getAttribute("href")); 
}
for(let i = 0; i < linksDestination.length; i++){ 
     let linkDestination = linksDestination[i];  

     positionsList.push(linkDestination.offsetTop); 
}

positionsList.push(document.body.clientHeight); 

let pairListStart = []; 
let pairListEnd = []; 

for(let i =0; i < positionsList.length-1;i++) 
{
     let currentElementPosition = positionsList[i];
     let nextElementPosition = positionsList[i+1];

     pairListStart.push(currentElementPosition); 
     pairListEnd.push(nextElementPosition); 
}

function myScrollFunction(positionY)  
{
     for(let i = 0; i < pairListStart.length; i++) { 
          if(positionY >= pairListStart[i] && positionY < pairListEnd[i]) {

               let allLinks = document.getElementsByClassName("navigation__menu__list__link");
               let elementToActive = document.querySelector('.navigation__menu__list__link[href="'+linkHrefs[i]+'"]'); 
               
               activateMenuLink(allLinks, elementToActive); 

               break;
          }
     }
}

// hide navbar when scrolling

let lastScroll = 0;

window.addEventListener('scroll', () => {
     
     let navbar = document.getElementsByClassName("navigation") [0];
     const currentScroll = window.pageYOffset;

     if (currentScroll == 0){
          navbar.classList.remove("navigation__slideup");
     }
     if (currentScroll > lastScroll && !navbar.classList.contains("navigation__slideup")){
          navbar.classList.remove("navigation__slidedown");
          navbar.classList.add("navigation__slideup");
     } else if(currentScroll < lastScroll && navbar.classList.contains("navigation__slideup")){
          navbar.classList.remove("navigation__slideup");
          navbar.classList.add("navigation__slidedown");
     }
     lastScroll = currentScroll;

     let currentPos = window.scrollY; 
     let visibleY = currentPos+100; 
     myScrollFunction(visibleY); 

     let displayArrowToTop = heroSection[0].offsetTop / 2;
     if (currentPos >= displayArrowToTop ) {
          arrowToTop.classList.remove('hidden');
     } else {
          arrowToTop.classList.add('hidden');
     };
     
});

if(window.location.hash == "")
{
     myScrollFunction(window.scrollY);
}

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
const currentModalHeader = document.querySelector('.modal__title');
const currentModalText = document.querySelector('.modal__text');
const modalLabel = document.querySelector(".modal__label");
const modalPermission = document.querySelector(".modal__permission")
const playGameButton = document.querySelector(".modal__play__game")

modalSubmit.addEventListener('click', checkEmail);
playGameButton.addEventListener('click', showGame);
 
function checkEmail(event) {
    event.preventDefault();
    const emailValue = (email.value.trim()).toLowerCase();
    if (emailValue === '' || !emailReg.test(emailValue)) {
        emailErrorText.classList.add('error');
        email.classList.add('error');
    }
    else {
        localStorage.setItem('email', emailValue);
          currentModalHeader.innerText = "Dziękujemy.";
          currentModalText.innerText = "Mamy dla Ciebie niespodziankę! Wczuj się w Vitamena i zagraj w naszą krótką grę.";
          currentModalText.style.margin = "0px";
          modalSubmit.classList.add("hidden__form");
          email.classList.add("hidden__form");
          modalPermission.classList.add("hidden__form");
          modalLabel.classList.add("hidden__form");
          playGameButton.classList.add("active"); 
    }
}

form.addEventListener('focusin', (event) => {
    email.classList.remove("error");
    emailErrorText.classList.remove("error");
  });

  function openGame() {
       const canvas = document.querySelector('.canvas');
       canvas.classList.remove('hidden');
      }


function showGame() {
     event.preventDefault();
     openGame();
     closeModal();
}

form.addEventListener('focusin', (event) => {   
    email.classList.remove("error");
    emailErrorText.classList.remove("error");
  });
