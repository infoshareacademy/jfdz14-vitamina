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
     if (!navigation.classList.contains('active')) {
          navigation.classList.add('active');
     } else {
          navigation.classList.remove('active');
     }
})

// scroll handler

const links = document.querySelectorAll('.navigation__menu__list__link');
const pageSection = document.querySelectorAll('section');
const headersSections = [...pageSection].filter((section) => section.getAttribute('id'))
const nav = document.getElementsByClassName('navigation');


let windowActualPositionY = window.pageYOffset;


window.addEventListener('scroll', () => {
     let windowNextPositionY = window.scrollY;
     if (windowActualPositionY <= windowNextPositionY) {
          navigation.classList.add('nav--hidden');
     } else {
          navigation.classList.remove('nav--hidden');
     };

     windowActualPositionY = windowNextPositionY;

     links.forEach((link, index) => {
          const navOffsetHeight = nav[0].offsetHeight;
          const sectionOffsetTop = headersSections[index].offsetTop;


          link.addEventListener('click', () => {
               link.removeAttribute('href');
               navigation.classList.remove('active');

               let scrollTo = sectionOffsetTop - navOffsetHeight;
               window.scrollTo({
                    top: scrollTo,
                    behavior: 'smooth'
               });

               location.hash = headerSection[index].id;
          });
          return sectionHight = sectionOffsetTop
     });
});



