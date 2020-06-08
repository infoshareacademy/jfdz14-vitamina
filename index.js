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

function activateMenuLink(allLinks, linkToActivate) { //funkcja dodajaca active do linkow  (pierwszy parametr lista wszystkich linkow, w drugim link ktory chce aktywowac)
     for(let i = 0; i < allLinks.length; i++){ //petla dla calej listy linkow

          let link = allLinks[i]; // element w tablicy all links

          if (link.classList.contains('active')) { //  jesli jest active to usuwamy
               link.classList.remove("active");
          }
     }

     if (!linkToActivate.classList.contains('active')) { // jesli nie zawiera active to dodajemy
          linkToActivate.classList.add("active");
     }

     let href = linkToActivate.getAttribute("href"); //pobieramy atrybut href (np #features) 

     window.history.pushState(href, "Vitamina - "+href, href); // dodajemy go to historii przegladarki- zmienia sie url bez reloadu
}

const navigationMenuContainer = document.querySelector(".navigation");
const navigationMenuElement = document.querySelector(".navigation__menu__list");
const navigationMenuElementFocus = document.querySelectorAll(".navigation__menu__list__link");

for (let i = 0; i < navigationMenuElementFocus.length; i++) {
          navigationMenuElementFocus[i].addEventListener("click", (event) => {
          activateMenuLink(navigationMenuElementFocus, event.target); //wywolujemy funkcje na kliku
     });
}

// scroll handler

let linksDestination = document.getElementsByClassName("linkLoc"); // zbieramy elementy majace klase linkLoc w HTML
let links = document.getElementsByClassName("navigation__menu__list__link"); 
let positionsList = []; // tworzymy pusta liste 
let linkHrefs = []; // tworzymy pusta liste hfefow

for(let i = 0; i < links.length; i++){
     let link = links[i]; // sprawdzamy kazdy element
     linkHrefs.push(link.getAttribute("href")); //  pushujemy hrefy do pustej listy 
}
for(let i = 0; i < linksDestination.length; i++){ // petla sprawdzajaca elementy z klasa linkLoc
     let linkDestination = linksDestination[i];  //sekcje docelowych miejsc do ktorych przekierowuja linki w navie

     positionsList.push(linkDestination.offsetTop); //  ile pikseli od gory dokumentu zaczyna sie ta sekcja
}

positionsList.push(document.body.clientHeight); //pushujemy cala wysokosc widoku, zeby ostatni element mial wartosc

let pairListStart = []; // pusta lista- poczatkowe pozycje elementow
let pairListEnd = []; // pusta liosta- koncowe pozycje elementow

// 200,500,600,2000, 3500


for(let i =0; i < positionsList.length-1;i++) // petla do generowania par pozycji
{
     let currentElementPosition = positionsList[i];
     let nextElementPosition = positionsList[i+1];

     pairListStart.push(currentElementPosition); // pozycja startowa elementu
     pairListEnd.push(nextElementPosition); // pozycja koncowa elementu
}

function myScrollFunction(positionY)  // funkcja dodajaca aktywna klase elementom, positionY- wysokosc scrolla
{
     for(let i = 0; i < pairListStart.length; i++) { // petla przez wszystkie poczatki elementow
          if(positionY >= pairListStart[i] && positionY < pairListEnd[i]) {

               let allLinks = document.getElementsByClassName("navigation__menu__list__link");
               let elementToActive = document.querySelector('.navigation__menu__list__link[href="'+linkHrefs[i]+'"]'); // wyszukanie elementu ktory bedziemy aktywowac (href ten sam przy iteracji)
               
               activateMenuLink(allLinks, elementToActive); // wywolanie funkcji dodawania klasy active

               break;
          }
     }
}

// hide navbar when scrolling

let navbarShowTimer = null; // timer ktory pokazuje navbara z opoznieniem  (poczatkowo zmienna jest pusta- funkcja nie istnieje)

window.addEventListener('scroll', () => { 
     
     let currentPos = window.scrollY; //zwraca jakas liczbe w px(ale nie ma jednostki)
     let visibleY = currentPos+100; // dodajemy 100 px do tej pozycji (jak jestesmy 100px przed rozpoczeciem elementu to zmienia sie aktywny element w navie)
     
     myScrollFunction(visibleY); //funkcja dajaca aktywna klase, w parametrze nadajemy wysokosc ktora sobie okreslilismy

     clearTimeout(navbarShowTimer); // czyscimy timer- zerujemy funkcje (navbarShowTimer)

     let navbar = document.getElementsByClassName("navigation")[0];

     if(!navbar.classList.contains("navigation__slideup")) // jezeli element nie ma klasy slideup to ja dodajemy przy kazdym scrollu
     {
          navbar.classList.add("navigation__slideup");
     }


     navbarShowTimer = window.setTimeout(() => {
          if(navbar.classList.contains("navigation__slideup")) // usuwamy klase slideup jesli element taka ma, jesli uplynie 300 msekund od zatrzymania scrolla
          {
               navbar.classList.remove("navigation__slideup");
          }
     }, 300);

});

/*
var elementsInNavbar = document.querySelectorAll(".navigation>*"); //dodajemy klase quick transition(plynnosc) do wszystkich elementow nava- krok wykonujemy tylko raz 

for(let i = 0; i < elementsInNavbar.length; i++)
{
     let element = elementsInNavbar[i];
     if(!element.classList.contains("quick-transition")) //sprawdzamy czy element ma quick transition, jak nie ma to dodajemy
     {
          element.classList.add("quick-transition");
     }
}
*/


if(window.location.hash == "") // jezeli uzytkownik wejdzie na strone bez zadnego hashtaga w linku to wywolujemy funkcje zmiany adresu url podczas zaladowania strony(#home)
{
     myScrollFunction(window.scrollY);
}
// #home dodany w index.html


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


