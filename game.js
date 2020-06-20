// MIKOLAJ GAME JS
const canvas = document.querySelector('.canvas');
const mainScreen = document.querySelector('.game__box');
const gameStats = document.querySelector('.game__stats');

const gameOverScreen = document.querySelector('.game__over__screen');
const finalScoreDiv = document.querySelector('.final__score');
const buttonNewGame = document.querySelector('.game__button');

// let closeFood = [];
let score = 0;

// function removeFromCloseFood(food) {
//      for( var i = 0; i < closeFood.length; i++) {
//           if ( closeFood[i] === food) { 
//                closeFood.splice(i, 1); 
//                i--; 
//           }
//      }
// }

class Food {
     positionX = 10;
     positionY = 5;

     openedMouth = false;
     runningInterval = null;
     foodType = null;
     score = 0;

     createFoodContainer() {
          this.food = document.createElement('div');
          mainScreen.appendChild(this.food);
     }

     randomPosition() {
          this.positionY = Math.random() * 80;
          this.food.style.bottom = this.positionY + "%";
          this.positionY;
     }

     runToRight() {
          this.runningInterval = setInterval(() => {

               if (this.positionX >= 95) {
                    let foodRect = this.food.getBoundingClientRect();
                    let humanRect = human.human.getBoundingClientRect();

                    if(foodRect.top > humanRect.top && foodRect.bottom < humanRect.bottom) {
                         if (this.foodType == 'good') {
                              scoreValue.increaseScore(1);
                         } else if(this.foodType == 'bad') {
                              myProgressBar.consumeFood(-20);
                         };
                    };

                    this.food.remove();
                    clearInterval(this.runningInterval);
                    // removeFromCloseFood(this.food);

                    if(this.openedMouth) {
                         human.humanCloseMouth();
                    };
               }

               if (this.positionX <= 100) {
                    this.food.style.left = this.positionX + "%";
                    this.positionX += difficulty.multiplierSpeed;

                    if(this.positionX > 90 && !this.openedMouth) {
                         let foodRect = this.food.getBoundingClientRect();
                         let humanRect = human.human.getBoundingClientRect();

                         if(foodRect.top > humanRect.top && foodRect.bottom < humanRect.bottom) {
                              // closeFood.push(this.food);
                              human.humanOpenMouth();
                              this.openedMouth = true;
                         };
                    };
               };
          }, 50);
     }

     foodsTypeRandom() {
          const badFood = [
               'url(./game_image/burger.svg)',
               'url(./game_image/pizza.svg)',
               'url(./game_image/frytki.svg)',
          ];
          const goodFood = [
               'url(./game_image/jablko.svg)',
               'url(./game_image/marchewka.svg)',
               'url(./game_image/brokul.svg)',
          ];
          let choiceFood = Math.floor(Math.random() * badFood.length);
          let number = Math.random() * 100;

          if (number > 50 && number < 100) {
               this.foodType = "bad";
               this.food.classList.add("game--food");
               this.food.style.backgroundImage = badFood[choiceFood];
          } else if (number > 0 && number <= 50){
               this.foodType = "good";
               this.food.classList.add("game--food");
               this.food.style.backgroundImage = goodFood[choiceFood];
          };
     }

     initializeFood() {
          this.createFoodContainer();
          this.foodsTypeRandom();
          this.randomPosition();
          this.runToRight();
     }

     removeFood() {
          setTimeout(() => {
               this.food.remove();
          }, 100);
          clearInterval(this.runningInterval);
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
          };
          if (this.positionY <= 0 ) {
               this.positionY = 0;
          };

          this.human.style.top = this.positionY + 'px';
     }

     humanPositionY() {
          this.human.addEventListener('mousemove', () => this.humanMove());
     }

     humanCloseMouth() {
          if (this.human.classList.contains('active')) {
               this.human.classList.remove('active');
          };
     }

     humanOpenMouth() {
          if (!this.human.classList.contains('active')) { 
               this.human.classList.add('active');
               console.log("Opening mouth");
          };
     }

    removeHuman() {
          this.human.remove();
     }
}

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
          };
     }

     stopTimer() {
          clearInterval(this.timerInterval);
          this.timerDiv.innerText = null;
     }

     resetTimer() {
          clearInterval(this.timerInterval);
          this.totalSeconds = 0;
          this.seconds = 0;
          this.minutes = 0;
          this.timerDiv.innerText = 'Czas: 00:00';
     }
}

function resetGame() {
     human.removeHuman();
     timer.stopTimer();
     food.removeFood(food);
     clearInterval(foodInterval);
}


function showFirstScreen() {
     mainScreen.style.backgroundImage = 'url(./game_image/screen-2.svg)';
     gameStats.classList.add('hidden');

     const buttonDiffEasy = document.querySelector('.game__button--easy');
     buttonDiffEasy.classList.remove('hidden');
     buttonDiffEasy.textContent = "Easy mode";

     const buttonDiffHard = document.querySelector('.game__button--hard');
     buttonDiffHard.classList.remove('hidden');
     buttonDiffHard.innerText = "Hard mode";

     //        --- difficulty settings: ---
     buttonDiffEasy.addEventListener("click", () => {
          difficulty.difficultySetting = "easy"
          difficulty.changeMultiplier();

          buttonDiffEasy.classList.add('hidden');
          buttonDiffHard.classList.add('hidden');

          startGame();
     })

     buttonDiffHard.addEventListener("click", () => {
          difficulty.difficultySetting = "hard";
          difficulty.changeMultiplier();

          buttonDiffEasy.classList.add('hidden');
          buttonDiffHard.classList.add('hidden');

          startGame();
     })
}

const human = new Human();
let timer = new Timer();


const startGame = () => {
     mainScreen.style.backgroundImage = 'url(./game_image/screen-1.svg)';
     gameStats.classList.remove('hidden');
     scoreValue.resetScore();
     timer.resetTimer();
     // resetGame();

     const randomFoodCreate = () => {
          foodInterval = setInterval(() => {
               food = new Food();
               food.initializeFood();
          }, difficulty.multiplierFoodSpawn);
     }

     human.createHumanElement();
     human.humanPositionY();
     randomFoodCreate();

     difficulty.changeMultiplier()  // added
     timer.startTimer();

     finalScoreDiv.innerText = scoreValue.value;

     // if (gameOverScreen.classList.contains("active")){
     //      gameOverScreen.classList.remove("active");
     // }
     // if (mainScreen.classList.contains("hidden")){
     //      mainScreen.classList.remove("hidden");
     // }
}

const newGame = showFirstScreen();

class progressBar {
     constructor(element, initialValue = 0){
          this.valueElement = element.querySelector('.progress__bar__value');
          this.fillElement = element.querySelector('.progress__bar__fill');

          this.setValue(initialValue);

     }

     setValue(newValue) {
          // if (newValue < 0) {
          //      newValue = 0;
          // };
          // if(newValue > 100) {
          //      newValue = 100;
          // }
          if(newValue == 0) {
               gameOver();
          };

          this.value = newValue;
          this.update();
     }

     consumeFood(changeBy){
          let currentValue = this.value;
          let newValue = currentValue + changeBy;
          this.setValue(newValue);
     }

     update() {
          const progressBarPercentage = this.value + '%';
          this.fillElement.style.width = progressBarPercentage;
          this.valueElement.textContent = progressBarPercentage; 
     }
}

let myProgressBar = new progressBar(document.querySelector('.progress__bar'), 100);


class ScoreCounter {

     constructor(scoreCounter, initialValue) {
          this.scoreCounter = document.querySelector(".score__counter");
          this.initialValue = scoreCounter.innerText = initialValue;

          this.setScore(initialValue);
     }

     setScore(scoreValue) {
          this.value = scoreValue;
          this.update();
     }

     increaseScore(changeValue) {
          let currentValue = this.value;
          let scoreValue = currentValue + changeValue;
          this.setScore(scoreValue);
     }

     update() {
          this.scoreCounter.innerText = this.value;
          console.log(this.value);
     }

     resetScore() {
          this.setScore(0);
     }
}

let scoreValue = new ScoreCounter(document.querySelector(".score__counter"), 0)

class Difficulty {

     constructor(initialValue, difficultySetting) {
          this.difficultySetting = difficultySetting;
          this.initialValue = initialValue;

     }

     changeMultiplier() {
          if (this.difficultySetting == "easy") {
               this.multiplier = 1.25;
               this.getMultipliers();
          } else if (this.difficultySetting == "hard"){
               this.multiplier = 1.75;
               this.getMultipliers();
          };
     }

     getRatio() {
          return this.multiplierFoodRatio = this.initialValue * this.multiplier;
     }

     getSpawn() {
          return this.multiplierFoodSpawn = this.initialValue / this.multiplier;
     }

     getSpeed() {
          return this.multiplierSpeed = 0.4 * this.multiplier;
     }

     getMultipliers() {
          this.getRatio();
          this.getSpawn();
          this.getSpeed();
     }
}

let difficulty = new Difficulty(1000, "easy");
difficulty.getMultipliers();

class Ranking {

     constructor(time, score) {
          this.currentTime = time;
          this.playerScore = score;
     }

     recordedScore = {};
     

     getScores () {
          this.currentTime = new Date().toLocaleString();
          this.playerScore = scoreValue.value;
     }

     updateScore() {

          this.getScores();

          this.recordedScore = {
               time: this.currentTime,
               score: this.playerScore
          }

          this.logInfo()
     } 

     logInfo() {
          console.log(this.recordedScore)
     }

     getLocalInfo() {
          this.storedInfo = localStorage.getItem("Best score")
          this.parsedInfo = JSON.parse(this.storedInfo)
     
          return this.parsedInfo
     } //ok

     storeInfo() {
          this.bestScore = "Best score";

          console.log(`parsed: ${this.parsedInfo} & ${this.recordedScore.score}`)


          if (this.parsedInfo.score < this.recordedScore.score) {
               localStorage.setItem(this.bestScore, JSON.stringify(this.recordedScore))
          } // konsola zwraca [object Object], ale działać działa - zwiększa score w LS          
     }          

     // displayRanking() {

     // }
}

const ranking = new Ranking();
ranking.getLocalInfo()

function gameOver() {
     human.removeHuman();
     timer.stopTimer();
     food.removeFood();
     clearInterval(foodInterval);
     // mainScreen.classList.add("hidden");
     showGameOverScreen();

     ranking.updateScore();
     ranking.getLocalInfo();
     ranking.storeInfo();
}

function showGameOverScreen() {
     gameStats.classList.add('hidden');
     mainScreen.style.backgroundImage = 'url(./game_image/screen-3.svg)';
     gameOverScreen.classList.add("active");

     finalScoreDiv.innerText = `Czas: ${timer.minutes}:${timer.seconds} Punkty: ${scoreValue.value}`;

     buttonNewGame.addEventListener('click', () => {
          gameOverScreen.classList.remove("active");
          // mainScreen.classList.remove("hidden");
          showFirstScreen();
     })
}