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
          return console.log("navigation should go up")
     } else if(currentScroll < lastScroll && navbar.classList.contains("navigation__slideup")){
          navbar.classList.remove("navigation__slideup");
          navbar.classList.add("navigation__slidedown");
          return console.log("navigation should go down")
     }
     lastScroll = currentScroll;

     let currentPos = window.scrollY; 
     let visibleY = currentPos+100; 
     myScrollFunction(visibleY); 
     clearTimeout(navbarShowTimer);
});

if(window.location.hash == "")
{
     myScrollFunction(window.scrollY);
}

// burger menu mobile

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


