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
const arrowToTop = document.querySelector('.navigation__arrow');

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
arrowToTop.addEventListener('click', () => {
     window.scrollTo(0, 0);
})

let timeoutID;
let windowActualPositionY = window.pageYOffset;

document.addEventListener('scroll', () => {
          navigation.classList.remove('scale');
          navigationMenu.classList.remove('nav--scale');
          logo.classList.remove('nav--scale');
          burger.classList.remove('nav--scale');
          clearTimeout(timeoutID);

          timeoutID = setTimeout(() => {
               navigation.classList.add('scale');
               navigationMenu.classList.add('nav--scale');
               logo.classList.add('nav--scale');
               burger.classList.add('nav--scale');
               }, 3000);

          let displayArrowToTop = headersSections[0].offsetTop / 2;
          if (window.scrollY >= displayArrowToTop ) {
               arrowToTop.classList.remove('hidden');
          } else {
               arrowToTop.classList.add('hidden');
          };

          // let windowPositionY = window.scrollY;
          // const navOffsetHeight = navigation.offsetHeight;
          // headersSections.forEach((section, index) => {
          //      const sectionsOffsetPosition = headersSections[index].offsetTop;
          //      const sectionsHight = headersSections[index].offsetHeight;
          //      topPosition = sectionsOffsetPosition - navOffsetHeight;
          //      bottomPosition = sectionsOffsetPosition + sectionsHight;

          //      console.log(topPosition, bottomPosition)


          //      if (windowActualPositionY > topPosition && windowActualPositionY < bottomPosition ) {
          //           console.log(`mamy to ${links[index]}`)
          //           links[index].classList.add('navigation-look');
          //      } else {
          //           links[index].classList.remove('navigation-look');
          //      };
          // });


})

navigation.addEventListener('mouseover', () => {
     clearTimeout(timeoutID);
     navigation.classList.remove('scale');
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
     });
})


// /* working about selection link with scroll



     // windowActualPositionY = windowNextPositionY;


     // headersSections.forEach((section , index) => {
     //      const sectionHight = section.clientHeight;
     //      const sectionOffset = section.offsetTop;
     //      if (windowActualPositionY < sectionOffset && windowActualPositionY > sectionHight) {
     //           console.log(`jestem ${section}`)
     //           link.classList.add('');

     // };
     // });

// */
