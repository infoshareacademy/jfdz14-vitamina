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


const navigationMenuContainer = document.querySelector(".navigation");
const navigationMenuElement = document.querySelector(".navigation__menu__list");
const navigationMenuElementFocus = document.querySelector(".navigation__menu__list__link");

    
// navigationMenuElementFocus.addEventListener("click", () => {
//      navigationMenuElementFocus.classList.remove('link');
//      navigationMenuElementFocus.classList.add('active');
// });

for (let i = 0; i < navigationMenuElementFocus.length; i++) {
          navigationMenuElementFocus[i].addEventListener("click", () => {
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
     });
}


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


