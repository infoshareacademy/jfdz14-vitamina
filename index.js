const cookie = document.querySelector('.cookie__hiden');
const cookieButton = document.querySelector('.cookie__button');
setTimeout(() => {
     cookie.classList.remove('cookie__hiden');
     cookie.classList.add('cookie');
}, 1000);
cookieButton.addEventListener('click', () => {
     cookie.classList.remove('cookie');
     cookie.classList.add('cookie__hiden');
})



const navigation = document.querySelector('.navigation');
const burger = document.querySelector('.navigation__burger');
const burgerLines = document.querySelectorAll('.navigation__burger--line');
const navigationCheckbox = document.querySelector('#burger__checkbox');
const navigationMenu = document.querySelector('.navigation__menu');

burger.addEventListener('click', () => {
     if (!burgerLines[0].classList.contains('burger__active--one')) {
          navigationCheckbox.setAttribute('disabled', 'disabled');
          navigationMenu.classList.remove('navigation__menu--close');
          navigationMenu.classList.add('navigation__menu--open');
          burgerLines[0].classList.add('burger__active--one');
          burgerLines[1].classList.add('burger__active--two');
          burgerLines[2].classList.add('burger__active--three');
     } else if (burgerLines[0].classList.contains('burger__active--one')) {
          burgerLines[0].classList.remove('burger__active--one');
          burgerLines[1].classList.remove('burger__active--two');
          burgerLines[2].classList.remove('burger__active--three');
          navigationMenu.classList.add('navigation__menu--close');
          navigationMenu.classList.remove('navigation__menu--open');
          setTimeout(() => {
               navigationMenu.classList.remove('navigation__menu--close');
               navigationMenu.classList.add('navigation__menu');
          }, 1000);
     }
})

navigationMenu.addEventListener('click', () => {
     if (navigationMenu.classList.contains('navigation__menu--open')) {
          burgerLines[0].classList.remove('burger__active--one');
          burgerLines[1].classList.remove('burger__active--two');
          burgerLines[2].classList.remove('burger__active--three');
          navigationMenu.classList.remove('navigation__menu--open');
          navigationMenu.classList.add('navigation__menu--close');
          setTimeout(() => {
               navigationMenu.classList.remove('navigation__menu--close');
               navigationMenu.classList.add('navigation__menu');
          }, 1000);
     }
})

