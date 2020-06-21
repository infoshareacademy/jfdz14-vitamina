const canvas = document.querySelector('.canvas');
const mainScreen = document.querySelector('.game__box');
const gameStats = document.querySelector('.game__stats');
const closeWindow = document.querySelector('.close__window');


const gameOverScreen = document.querySelector('.game__over__screen');
const finalScoreDiv = document.querySelector('.final__score');
const bestScoreDiv = document.querySelector('.best__score');
const buttonNewGame = document.querySelector('.button-new');

let closeFood = [];
let score = 0;

function removeFromCloseFood(food) {
     for( var i = 0; i < closeFood.length; i++) {
          if ( closeFood[i] === food) { 
               closeFood.splice(i, 1); 
               i--; 
          }
     }
}
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
          this.positionY = Math.random() * 75;
          this.food.style.bottom = this.positionY + "%";
          this.positionY;

     }

     runToRight() {

          this.runningInterval = 
               setInterval(() => {
                    if (this.positionX >= 95) {

                         let foodRect = this.food.getBoundingClientRect();
                         let humanRect = human.human.getBoundingClientRect();

                         if(foodRect.top > humanRect.top 
                              && foodRect.bottom < humanRect.bottom)
                         {
                              if (this.foodType == 'good') {
                                   // console.log('good food was eaten')  // wykomentowane
                                   scoreValue.increaseScore(1)  // replace one with variable and add difficulty setting?
                              } else if(this.foodType == 'bad') {

                                   myProgressBar.consumeFood(-20); 
                              }
                         }

                         clearInterval(this.runningInterval);

                         removeFromCloseFood(this.food);
                         this.food.remove();

                         if(this.openedMouth && closeFood.length == 0)
                         {
                              human.humanCloseMouth();
                         }
                         
                    }
                    if (this.positionX <= 100) {
                         this.food.style.left = this.positionX + "%";
                         this.positionX += difficulty.multiplierSpeed; //added multiplier
                         
                         if(this.positionX > 90 && !this.openedMouth)
                         {
                              let foodRect = this.food.getBoundingClientRect();
                              let humanRect = human.human.getBoundingClientRect();


                              if(foodRect.top > humanRect.top 
                                   && foodRect.bottom < humanRect.bottom)
                              {
                                   closeFood.push(this.food);

                                   human.humanOpenMouth();
                                   this.openedMouth = true;
                              }
                         }
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

          if (number > 50 && number < 100) {
               this.foodType = "bad";
               this.food.classList.add('game__box--badfood');
               this.food.classList.add("game--food")
               this.food.style.backgroundImage = badFood[choiceFood];
          } else if (number > 0 && number <= 50){
               this.foodType = "good";
               this.food.classList.add('game__box--goodfood');
               this.food.classList.add("game--food")
               this.food.style.backgroundImage = goodFood[choiceFood];
          }
     }

     initializeFood() {
          this.createFoodContainer();
          this.foodsTypeRandom();
          this.randomPosition();
          this.runToRight();
     }

     removeFood(food) {
          setTimeout(() => {
               this.food.remove();
          }, 100)
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
          }
          if (this.positionY <= 20) {
               this.positionY = 20;
          }
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
               // console.log("Opening mouth");   //wykomentowane
          };
     }
    removeHuman() {
          this.human.remove();
     }
}
const showFirstScreen = () => {
     mainScreen.style.backgroundImage = 'url(./game_image/screen-1.svg)';
     gameStats.classList.add('hidden');

     const buttonDiffEasy = document.createElement('button');
     buttonDiffEasy.classList.add('game__button--easy');
     buttonDiffEasy.textContent = "Easy mode";
     mainScreen.appendChild(buttonDiffEasy);

     const buttonDiffHard = document.createElement('button');
     buttonDiffHard.classList.add('game__button--hard');
     buttonDiffHard.innerText = "Hard mode";
     mainScreen.appendChild(buttonDiffHard);


     //        --- difficulty settings: --- 
     buttonDiffEasy.addEventListener("click", () => {
          buttonDiffEasy.classList.add('button-pressed');
          buttonDiffHard.classList.remove("button-pressed")

          difficulty.difficultySetting = "easy"
          difficulty.changeMultiplier();

          // difficulty.logDiffValues(); // remove later

          buttonDiffEasy.remove(); 
          buttonDiffHard.remove(); 

          startGame(); 
     })
     buttonDiffHard.addEventListener("click", () => {
          buttonDiffHard.classList.add('button-pressed');
          buttonDiffEasy.classList.remove("button-pressed")

          difficulty.difficultySetting = "hard";
          difficulty.changeMultiplier();

          // difficulty.logDiffValues(); // remove later

          buttonDiffEasy.remove();
          buttonDiffHard.remove();

          startGame();
     })

     closeWindow.addEventListener('click', closeCanvas )
}

const human = new Human(20);

const startGame = () => {
     mainScreen.style.backgroundImage = 'url(./game_image/screen-2.svg)';
     gameStats.classList.remove('hidden');
     scoreValue.resetScore();
     myProgressBar.resetProgressBar();

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
     timer = new Timer();
     timer.startTimer();
     finalScoreDiv.innerText = scoreValue.value; // final score here??
     if (gameOverScreen.classList.contains("active")){
          gameOverScreen.classList.remove("active");
     }
     if (mainScreen.classList.contains("hidden")){
          mainScreen.classList.remove("hidden");
     }

     difficulty.logDiffValues(); // wykomentuj

}

const newGame = showFirstScreen();

class progressBar {
     constructor(element, initialValue = 0){
          this.valueElement = element.querySelector('.progress__bar__value');
          this.fillElement = element.querySelector('.progress__bar__fill');

          this.setValue(initialValue);

     }
     setValue(newValue) {
          if (newValue < 0) {
               newValue = 0;
          }
          if(newValue > 100) {
               newValue = 100;
          }
          if(newValue == 0) {
               gameOver();
          }

          this.value = newValue;
          this.update();
     }
     consumeFood(changeBy)
     {
          let currentValue = this.value;
          let newValue = currentValue + changeBy;
          this.setValue(newValue);
     }
     update() {
          const progressBarPercentage = this.value + '%';
          this.fillElement.style.width = progressBarPercentage;
          this.valueElement.textContent = progressBarPercentage; 
     }

     resetProgressBar() {
          this.setValue(100);
     }
}

let myProgressBar = new progressBar(document.querySelector('.progress__bar'), 100);

class Timer {
     constructor() {
          this.timerDiv = document.querySelector('.timer');
          this.totalSeconds = 0;
          this.seconds = 0;
          this.minutes = 0;
     }
     startTimer() {
          this.timerInterval= setInterval(() => {
               this.seconds = this.padTimer(this.totalSeconds % 60);
               this.minutes = this.padTimer(parseInt(this.totalSeconds / 60));
               this.timerDiv.innerText = 'Czas: ' + this.minutes + ':' + this.seconds;
               ++this.totalSeconds;

               if (this.totalSeconds % 8 === 0) {
                    difficulty.updateMultiplier();
                    console.log(`Ticked 8 and multiplier = ${difficulty.multiplier} 
                    food speed: ${difficulty.multiplierSpeed}
                    food spawn ratio: ${difficulty.multiplierFoodSpawn}`)
               }
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

class ScoreCounter {   

     constructor(scoreCounter, initialValue) {
          this.scoreCounter = document.querySelector(".score__counter");
          this.initialValue = scoreCounter.innerText = initialValue;

          this.setScore(initialValue);
     }

     setScore(scoreValue) {
          this.value = Math.round(scoreValue * 100) / 100;
          this.update();
     }

     increaseScore(changeValue) {
          let currentValue = this.value;
          let scoreValue = currentValue + (changeValue * difficulty.multiplier);
          this.setScore(scoreValue);
     }

     update() {
          this.scoreCounter.innerText = this.value;
     }

     resetScore() {
          this.setScore(0);
     }
}

let scoreValue = new ScoreCounter(document.querySelector(".score__counter"), 0)

class Difficulty {

     constructor(initialValue, difficultySetting) { // added initialValue
          
          this.difficultySetting = difficultySetting;
          this.initialValue = initialValue; 
          
          let multiplier = 1;
          
          let multiplierFoodRatio = 1;
          let multiplierFoodSpawn = 1;
          let multiplierSpeed = 0.4;
     }   

     changeMultiplier() {
          if (this.difficultySetting == "easy") {
               this.multiplier = 1.5;
               this.getMultipliers();

          } else if (this.difficultySetting == "hard"){
               this.multiplier = 2; // modified multiplier
               this.getMultipliers();
          }
     }


     multiplierFoodRatio = this.initialValue * this.multiplier;
     multiplierFoodSpawn = this.initialValue / this.multiplier;
     multiplierSpeed = 0.4;

     getInitialValue() {
          return this.initialValue;
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
          this.getInitialValue()
          this.getRatio();
          this.getSpawn();
          this.getSpeed();
     }

     updateMultiplier() {
          this.multiplier += 0.05;    
          this.getMultipliers(); 
     }
   
     logDiffValues() {
          console.log("----------------------------------------------------------")
          console.log(`initialValue: ${this.initialValue}`)
          console.log(`multiplier: ${this.multiplier}`)
          console.log(`difficultySetting: ${this.difficultySetting}`)
          console.log("---")

          console.log(`multiplierFoodRatio: ${this.multiplierFoodRatio}`);
          console.log(`multiplierFoodSpawn: ${this.multiplierFoodSpawn}`);
          console.log(`multiplierSpeed: ${this.multiplierSpeed}`);        
          console.log("----------------------------------------------------------")

          // console.log("Type of this.initialValue" + ": " + typeof this.initialValue)
     }
     
     // updateDifficulty(multiplier)  {
     //        if (scoreValue.value % 15) {
     //        this.multiplier += 0.05;

     //        console.log(this.multiplier)
     //   }
     // }

     // scoreMultiplier = line 59;           
     // timer.totalSeconds
}

let difficulty = new Difficulty(1000, "easy");  //add math.round to values?

difficulty.getMultipliers();    // change later?

// difficulty.diffSetting();
// scoreValue.updateDifficulty();

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
     } // remove

     getLocalInfo() {
          this.grabbedInfo = JSON.parse(localStorage.getItem("Best score"));
     }

     storeInfo() {
          this.getLocalInfo();

          if (this.grabbedInfo == null) {
               localStorage.setItem("Best score", JSON.stringify(this.recordedScore))
          } else if (this.grabbedInfo.score < this.playerScore) {
               localStorage.setItem("Best score", JSON.stringify(this.recordedScore))
          }    
     }

     resetScore() {
          scoreValue.value = 0;
     }        

}
const removeFoodHard = () => {
     const badFoodHard = document.querySelectorAll('.game__box--badfood');
     const goodFoodHard = document.querySelectorAll('.game__box--goodfood');

     for(let i = 0; i < badFoodHard.length; i++) {
          badFoodHard[i].remove();
     }
     for(let i = 0; i < goodFoodHard.length; i++) {
          goodFoodHard[i].remove();
     }
}

const removeHumanHard = () => {
     const humanHard = document.querySelector('.human');
     humanHard.remove();
}

///Koniec rozmowy na czacie
///Wpisz wiadomość...



const ranking = new Ranking();
ranking.getLocalInfo()

const gameOver = () => {
     removeHumanHard();
     human.removeHuman();
     timer.stopTimer();
     food.removeFood();
     removeFoodHard();
     clearInterval(foodInterval);
     // mainScreen.classList.add("hidden");
     showGameOverScreen();

     ranking.updateScore();
     ranking.getLocalInfo();
     ranking.storeInfo();
}

const showGameOverScreen = () => {
     gameStats.classList.add('hidden');
     mainScreen.style.backgroundImage = 'url(./game_image/screen-3.svg)';
     gameOverScreen.classList.add("active");
     finalScoreDiv.innerText = `Czas: ${timer.minutes}:${timer.seconds} Punkty: ${scoreValue.value}`;
     bestScoreDiv.innerText = `Najlepszy wynik: `;
     closeWindow.classList.remove('hidden');

     closeWindow.addEventListener('click', () => {
          canvas.classList.add('hidden');
     })
     // może by to ^ jakoś ostylować?

     buttonNewGame.addEventListener('click', () => {
          gameOverScreen.classList.remove("active");
          // mainScreen.classList.remove("hidden");

          // setTimeout \/
          showFirstScreen();
     })
}

function closeCanvas() {
     canvas.classList.add('hidden');
}