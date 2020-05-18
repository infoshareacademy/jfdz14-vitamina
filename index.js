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