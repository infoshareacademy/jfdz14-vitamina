const canvas = document.querySelector('.canvas');
const mainScreen = document.querySelector('.game__box');

const gameOverScreen = document.querySelector('.game__over__screen');
const finalScoreDiv = document.querySelector('.final__score');
const buttonPlayAgain = document.querySelector('.button-playAgain');
const buttonRanking = document.querySelector('.button-ranking')

class Food {
     positionX = 10;
     positionY = 5;

     createFoodContainer() {
          this.food = document.createElement('div');
          mainScreen.appendChild(this.food);
     }

     randomPosition() {
          this.positionY = Math.random() * 80;
          this.food.style.bottom = this.positionY + 2 +"%";
          this.positionY;
     }

     runToLeft() {
          setInterval(() => {
               if (this.positionX >= 95) {
                    this.food.remove();
               }
               if (this.positionX <= 100) {
                    this.food.style.left = this.positionX + "%";
                    this.positionX += .4;
               }
          }, 50);
     }
   
     foodsTypeRandom() {
          const badFood = [
               'url(./game_image/burger.svg)',
               'url(./game_image/pizza.svg)',
               'url(./game_image/frytki.svg)',
          ]
          const goodFood = [
               'url(./game_image/jablko.svg)',
               'url(./game_image/marchewka.svg)',
               'url(./game_image/brokul.svg)',
          ]
          let choiceFood = Math.floor(Math.random() * badFood.length);
          let number = Math.random() * 100;

          if (number > 50 && number < 80) {
               this.food.classList.add('game__box--badfood');
               this.food.style.backgroundImage = badFood[choiceFood];
          } else if (number > 20 && number < 50){
               this.food.classList.add('game__box--goodfood');
               this.food.style.backgroundImage = goodFood[choiceFood];
          } else {
               this.food.style.backgroundImage = '';
          };
     }

     initializeFood() {
          this.createFoodContainer();
          this.foodsTypeRandom();
          this.randomPosition();
          this.runToLeft();
     }
}
class Human {
     positionX = 0;
     positionY = 0;
     width = 51;
     height = 120;

     createHumanElement() {
          this.human = document.createElement('div');
          this.human.classList.add('human');
          mainScreen.appendChild(this.human);
     }
     humanMove() {
          let sreenTopPosition = mainScreen.offsetTop;

          this.positionY = event.clientY - sreenTopPosition - this.width / 2;

          if (this.positionY >= 395) {
               this.positionY = 395;
          }
          if (this.positionY <= 1 ) {
               this.positionY = 1;
          }
          this.human.style.top = this.positionY + 'px';
     }
     humanPositionY() {
          this.human.addEventListener('mousemove', () => this.humanMove());
     }
     removeHuman() {
          this.human.remove();
     }
}
const showFirstScreen = () => {
     mainScreen.style.backgroundImage = 'url(./game_image/screen-2.svg)';
     const buttonStart = document.createElement('button');
     buttonStart.classList.add('button-start');
     buttonStart.textContent = 'start';
     mainScreen.appendChild(buttonStart);

     buttonStart.addEventListener('click', () => {
          buttonStart.remove();
          startGame();
     })
}

const human = new Human();

const startGame = () => {
     mainScreen.style.backgroundImage = 'url(./game_image/screen-1.svg)';
     const randomFoodCreate = () => {
          dupa2 = setInterval(() => {
               food = new Food();
               food.initializeFood();
          }, 1000);
     }
     /*const human = new Human();*/
     human.createHumanElement();
     human.humanPositionY();
     randomFoodCreate();
     timer = new Timer();
     timer.startTimer();
     finalScoreDiv.innerText = null;
     if (gameOverScreen.classList.contains("active")){
          gameOverScreen.classList.remove("active");}


     /*do usuniecia */
     const buttonStart = document.createElement('button');
     buttonStart.classList.add('button-start');
     buttonStart.textContent = 'koniec';
     mainScreen.appendChild(buttonStart);
     buttonStart.addEventListener('click', () => {
          buttonStart.remove();
          gameOver();
     })
/*koniec usuniecia*/
}

const newGame = showFirstScreen();

class Timer {
     constructor() {
          this.timerDiv = document.querySelector('.timer');
          this.totalSeconds = 0;
          this.seconds = 0;
          this.minutes = 0;
     }
     startTimer() {
          this.timerInterval= setInterval(() => {
               this.totalSeconds++;
               this.seconds = this.padTimer(this.totalSeconds % 60);
               this.minutes = this.padTimer(parseInt(this.totalSeconds / 60));
               this.timerDiv.innerText = 'Czas: ' + this.minutes + ':' + this.seconds;
          }, 1000)
     }
     padTimer(timeValue) {
          let time = timeValue + '';
          if (time.length < 2){
                return '0' + time;
           } else { 
                return time;
          }
     }
     stopTimer() {
          clearInterval(this.timerInterval);
          this.timerDiv.innerText = null;
     }
}

const gameOver = () => {
     human.removeHuman();
     timer.stopTimer();
     showGameOverScreen();
}

const showGameOverScreen = () => {
     mainScreen.style.backgroundImage = 'url(./game_image/screen-3.svg)';
     gameOverScreen.classList.add("active");
     finalScoreDiv.innerText = 'Czas: ' + timer.minutes + ':' + timer.seconds + ' Punkty: ';

     buttonRanking.addEventListener('click', () => {
          alert('cos ranking')
     })

     buttonPlayAgain.addEventListener('click', () => {
          startGame();
     })
}






















/*const timer = new Timer();*/


/*const timerDiv = document.querySelector('.timer');
let totalSeconds = 0;
let seconds = 0;
let minutes = 0;
/*
const timer = () => {
    dupa = setInterval(() => {
          totalSeconds++;
          seconds = padTimer(totalSeconds % 60);
          minutes = padTimer(parseInt(totalSeconds / 60));
          timerDiv.innerText = 'Czas: ' + minutes + ':' + seconds;
     }, 1000)
}
const padTimer = (timeValue) => {
         let time = timeValue + '';
         if (time.length < 2){
               return '0' + time;
          } else { 
               return time;
         }
}
*/
