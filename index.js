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
const burgerInput = document.querySelector('.navigation__burger__checkbox');
const burger = document.querySelector('.navigation__burger');
const navigationMenu = document.querySelector('.navigation__menu');

burger.addEventListener('click', () => {
     burgerInput.checked = true;
     console.log(burgerInput.checked)
     if (!navigation.classList.contains('active')) {
          navigation.classList.add('active');
     } else {
          navigation.classList.remove('active');
     }
})

// scroll handler

const links = document.querySelectorAll('.navigation__menu__list__link');
const pageSection = document.querySelectorAll('section');
const headerSection = [...pageSection].filter((section) => section.getAttribute('id'))
const nav = document.getElementsByClassName('navigation');
let navOffsetHeight = nav[0].offsetHeight;

// window.addEventListener('load', () => links.forEach((link) => link.removeAttribute('href')));

links.forEach((link, index) => {
     link.addEventListener('click', () => {
          link.removeAttribute('href');
          navigation.classList.remove('active');
          let sectionOffsetTop = headerSection[index].offsetTop;
          let scrollTo = sectionOffsetTop - navOffsetHeight;
          window.scrollTo({
               top: scrollTo,
               behavior: 'smooth'
          });
     });
})

