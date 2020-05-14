const przycisk1 = document.querySelectorAll('.hero__dots')[0]
const przycisk2 = document.querySelectorAll('.hero__dots')[1]
const przycisk3 = document.querySelectorAll('.hero__dots')[2]
const przyciski = document.querySelectorAll('.hero__dots')

const prev = document.querySelectorAll('.hero__arrow')[0]
const next = document.querySelectorAll('.hero__arrow')[1]

const tlo = document.querySelector('.hero__img')

const tytul = document.querySelector('.hero__title')
const text1 = "Stay healthy."
const text2 = "Stay happy."
const text3 = "Stay clean."

function myFunction1() {
    tlo.style.backgroundImage = "url('../image/hero/stay_healthy.jpg')"
    tytul.textContent = text1
}

function myFunction2() {
    tlo.style.backgroundImage = "url('../image/hero/stay_happy.jpg')"
    tytul.textContent = text2
}

function myFunction3() {
    tlo.style.backgroundImage = "url('../image/hero/stay_clean.jpg')"
    tytul.textContent = text3
}



const tab = [przycisk1, przycisk2, przycisk3]
const arr = [myFunction1, myFunction2, myFunction3]
let index = 0

prev.addEventListener('click', function() {
    prevSlide();
    resetTimer();
})

next.addEventListener('click', function() {
    nextSlide();
    resetTimer();
})

function prevSlide() {
    if(index==0){
        index=arr.length-1;
    }
    else{
        index--;
    }
    changeSlide();
}

function nextSlide() {
    if(index == arr.length-1) {
        index = 0;
    }
    else {
        index++;

    }
    changeSlide();
}

function changeSlide() {
    arr[index]()
    changeDot()
}

function changeDot() {
    if(index === 0) {
        dupa();
     } else if (index === 1) {
        dupa2()
     } else if (index === 2) {
        dupa3()
    }
}

function dupa() {
    tab[0].classList.add("active");
    tab[1].classList.remove("active");
    tab[2].classList.remove("active");
}

function dupa2() {
    tab[1].classList.add("active");
    tab[0].classList.remove("active");
    tab[2].classList.remove("active");
}
function dupa3() {
    tab[2].classList.add("active");
    tab[0].classList.remove("active");
    tab[1].classList.remove("active");
}


przycisk1.addEventListener('focus', function() {
    myFunction1();
    resetTimer();
    dupa();
})

przycisk2.addEventListener('focus', function() {
    myFunction2();
    resetTimer();
    dupa2();
})
przycisk3.addEventListener('focus', function() {
    myFunction3();
    resetTimer();
    dupa3();
})

function resetTimer(){
    clearInterval(timer);
}


function autoPlay(){
    nextSlide();
}

let timer=setInterval(autoPlay,2000);
