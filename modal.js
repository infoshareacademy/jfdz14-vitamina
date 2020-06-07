/* modal window */

const modalWindow = document.querySelector('.modal__overlay');
const closeButton = document.querySelector('.modal__close');

setTimeout(showModal, 7000);

function closeModal() {
    modalWindow.classList.remove("active");
}
function showModal() {
    modalWindow.classList.add("active");
}
function outsideClick(event) {
    if (event.target == modalWindow) {
        closeModal();
    }
  }
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

/* email validation*/

const email = document.querySelector('.modal__email');
const form = document.querySelector('.modal__form');
const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailErrorText = document.querySelector('.modal__email__error__text');
const modalSubmit = document.querySelector('.modal__submit');

modalSubmit.addEventListener('click', checkEmail)
 
function checkEmail(event) {
    event.preventDefault();
    const emailValue = (email.value.trim()).toLowerCase();
    if (emailValue === '' || !emailReg.test(emailValue)) {
        emailErrorText.classList.add('error');
        email.classList.add('error');
    }
    else {
        localStorage.setItem('email', emailValue);
        window.open("/game.html"); /*tutaj jakis odpalacz gry*/
        closeModal();
    }
}

form.addEventListener('focusin', (event) => {   
    email.classList.remove("error");
    emailErrorText.classList.remove("error");
  });