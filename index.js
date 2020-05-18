const cookie = document.querySelector('.cookie');
const cookieButton = document.querySelector('.cookie__button');


function showCookie(name) {
     if (document.cookie !== "") {
          const cookies = document.cookie.split(' ');
          for (let i = 0; i < cookies.length; i++) {
               const cookieName = cookies[i].split('=')[0];
               const cookieValue = cookies[i].split('=')[1];
               if (cookieName === name) {
                    return cookieValue;
               }
          }
     }
}
const cookieAcceptValue = showCookie("cookieAccept");

setTimeout(() => {
     if (cookieAcceptValue !== "yes"){
          cookie.classList.remove('hidden');
     }
}, 1500);
cookieButton.addEventListener('click', () => {
document.cookie = "cookieAccept=yes";
cookie.classList.add('hidden');
})


const burger = document.querySelector('.navigation__burger');
const navigationCheckbox = document.querySelector('#burger__checkbox');
const navigationMenu = document.querySelector('.navigation__menu');

burger.addEventListener('click', () => {
     if (!burger.classList.contains('open')) {
          navigationCheckbox.setAttribute('disabled', 'disabled');
          navigationMenu.classList.add('navigation__menu--open');
          burger.classList.add('open');
          console.log(burger)
     } else {
          burger.classList.remove('open');
          navigationMenu.classList.remove('navigation__menu--open');
          setTimeout(() => {
               navigationMenu.classList.add('navigation__menu');
          }, 1000);
     }
})

navigationMenu.addEventListener('click', () => {
     if (navigationMenu.classList.contains('navigation__menu--open')) {
          burger.classList.remove('open');
          navigationMenu.classList.remove('navigation__menu--open');
          setTimeout(() => {
               navigationMenu.classList.add('navigation__menu');
          }, 1000);
     }
})