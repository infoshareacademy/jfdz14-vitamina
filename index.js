const navigation = document.querySelector('.navigation');
const burger = document.querySelector('.navigation__burger');
const burgerLines = document.querySelectorAll('.navigation__burger--line');
const navigationCheckbox = document.querySelector('#burger__checkbox');
const navigationMenu = document.querySelector('.navigation__menu');


burger.addEventListener('click', () => {
     if (!burgerLines[0].classList.contains('burger__active--one')) {
          navigationMenu.classList.remove('navigation__menu--close');
          navigationMenu.classList.add('navigation__menu--open');
          navigationCheckbox.setAttribute('disabled', 'disabled');
          burgerLines[0].classList.add('burger__active--one');
          burgerLines[1].classList.add('burger__active--two');
          burgerLines[2].classList.add('burger__active--three');
     } else 
     if (burgerLines[0].classList.contains('burger__active--one')) {
          burgerLines[0].classList.remove('burger__active--one');
          burgerLines[1].classList.remove('burger__active--two');
          burgerLines[2].classList.remove('burger__active--three');
          navigationMenu.classList.remove('navigation__menu--open');
          navigationMenu.classList.add('navigation__menu--close');
          setTimeout(() => {
               navigationMenu.classList.add('navigation__menu');
               navigationMenu.classList.remove('navigation__menu--close');
          }, 1000);
     }
})

navigationMenu.addEventListener('click', () => {
     if (navigationMenu.classList.contains('navigation__menu--open')) {
          navigationMenu.classList.remove('navigation__menu--open');
          navigationMenu.classList.add('navigation__menu--close');
          burgerLines[0].classList.remove('burger__active--one');
          burgerLines[1].classList.remove('burger__active--two');
          burgerLines[2].classList.remove('burger__active--three');
          navigationCheckbox.removeAttribute('disabled');
          setTimeout(() => {
               navigationMenu.classList.add('navigation__menu');
               navigationMenu.classList.remove('navigation__menu--close');
          }, 1000);
     }
})

