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

const nav = document.getElementsByClassName('navigation');
const navigation = nav[0];
const navigationMenu = document.querySelector('.navigation__menu');
const links = document.querySelectorAll('.navigation__menu__list__link');

const burgerInput = document.querySelector('.navigation__burger__checkbox');
const burger = document.querySelector('.navigation__burger');
const logo = document.querySelector('.navigation__logo');

const pageSection = document.querySelectorAll('section');
const headersSections = [...pageSection].filter((section) => section.getAttribute('id'))


burger.addEventListener('click', () => {
     burgerInput.checked = true;
     if (!navigation.classList.contains('active')) {
          navigation.classList.add('active');
     } else {
          navigation.classList.remove('active');
     }
})


let timeoutID;

document.addEventListener('scroll', () => {
          navigation.classList.remove('navigation--scale');
          navigationMenu.classList.remove('nav--scale');
          logo.classList.remove('nav--scale');
          burger.classList.remove('nav--scale');
          clearTimeout(timeoutID);

          timeoutID = setTimeout(() => {
               navigation.classList.add('navigation--scale');
               navigationMenu.classList.add('nav--scale');
               logo.classList.add('nav--scale');
               burger.classList.add('nav--scale');
               }, 8000);
})

navigation.addEventListener('mouseover', () => {
     clearTimeout(timeoutID);
     navigation.classList.remove('navigation--scale');
     navigationMenu.classList.remove('nav--scale');
     logo.classList.remove('nav--scale');
     burger.classList.remove('nav--scale');
})

links.forEach((link, index) => {
     link.addEventListener('click', () => {
          const navOffsetHeight = navigation.offsetHeight;
          const sectionOffsetTop = headersSections[index].offsetTop;
          link.removeAttribute('href');
          navigation.classList.remove('active');
          location.hash = headersSections[index].id;

         let scrollTo = sectionOffsetTop - navOffsetHeight;
          window.scrollTo({
               top: scrollTo,
               behavior: 'smooth'
          });
          console.log(window.pageYOffset)
     });
})

