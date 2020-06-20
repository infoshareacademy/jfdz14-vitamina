const canvas = document.querySelector('.canvas');
const mainScreen = document.querySelector('.game__box');

const gameOverScreen = document.querySelector('.game__over__screen');
const finalScoreDiv = document.querySelector('.final__score');
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
          this.positionY = Math.random() * 80;
          this.food.style.bottom = this.positionY + 2 +"%";
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
                              // console.log("Eaten: "+this.foodType);
                              // // food was eaten

                              if (this.foodType == 'good') {
                                   console.log('good food was eaten')
                                   scoreValue.increaseScore(1)  // replace one with variable and add difficulty setting?
                              } else if(this.foodType == 'bad') {

                                   myProgressBar.consumeFood(-100); // junk food penalty
                                   // odejmowanie zycia
                                   // console.log ('bad food was eaten')
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
                         this.positionX += difficulty.multiplierSpeed; //added multiplier // NaN!!!
                         
                         if(this.positionX > 90 && !this.openedMouth)
                         {
                              //check if Y pos is same as human

                              let foodRect = this.food.getBoundingClientRect();
                              let humanRect = human.human.getBoundingClientRect();


                              if(foodRect.top > humanRect.top 
                                   && foodRect.bottom < humanRect.bottom)
                              {
                                   console.log(foodRect);
                                   console.log(humanRect);
     
                                   closeFood.push(this.food);

                                   human.humanOpenMouth();
                                   this.openedMouth = true;
                              }
                         }
                         //console.log("PosY: "+this.positionY+"New pos X: "+this.positionX);
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

          // if (number > 100) {                    // if changing food ratio is added
          //        number = 100;
          // }
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
          } // removed useless setting
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
          if (this.positionY <= 0 ) {
               this.positionY = 0;
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
               console.log("Opening mouth");
          };
     }
    removeHuman() {
          this.human.remove();
     }
}
const showFirstScreen = () => {
     mainScreen.style.backgroundImage = 'url(./game_image/screen-2.svg)';

     // const buttonStart = document.createElement('button');
     // buttonStart.classList.add('button-start');
     // buttonStart.setAttribute("disabled", "")
     // buttonStart.textContent = 'start';
     // mainScreen.appendChild(buttonStart);

     // buttonStart.addEventListener('click', () => {
     //      // buttonStart.remove();
     //      buttonDiffEasy.remove();
     //      buttonDiffHard.remove();          
     // })
     
     const buttonDiffEasy = document.createElement('button');
     buttonDiffEasy.classList.add('button-diff-easy');
     // buttonDiffEasy.classList.add('button-pressed')
     buttonDiffEasy.textContent = "Easy mode";
     mainScreen.appendChild(buttonDiffEasy);

     const buttonDiffHard = document.createElement('button');
     buttonDiffHard.classList.add('button-diff-hard');
     buttonDiffHard.innerText = "Hard mode";
     mainScreen.appendChild(buttonDiffHard);

     //        --- difficulty settings: --- 
     buttonDiffEasy.addEventListener("click", () => {
          buttonDiffEasy.classList.add('button-pressed');
          buttonDiffHard.classList.remove("button-pressed")

          difficulty.difficultySetting = "easy"
          difficulty.changeMultiplier();

          difficulty.logDiffValues(); // remove later

          buttonDiffEasy.remove(); //added after buttonStart removal
          buttonDiffHard.remove(); //added after buttonStart removal

          startGame(); //added after buttonStart removal
     })

     buttonDiffHard.addEventListener("click", () => {
          buttonDiffHard.classList.add('button-pressed');
          buttonDiffEasy.classList.remove("button-pressed")

          difficulty.difficultySetting = "hard";
          difficulty.changeMultiplier();

          difficulty.logDiffValues(); // remove later

          buttonDiffEasy.remove(); //added after buttonStart removal
          buttonDiffHard.remove(); //added after buttonStart removal

          startGame(); //added after buttonStart removal
     })
}

const human = new Human();

/*human.createHumanElement();
human.humanPositionY();
randomFoodCreate();
*/
const startGame = () => {
     mainScreen.style.backgroundImage = 'url(./game_image/screen-1.svg)';
     const randomFoodCreate = () => {

          // let multiplierFoodSpawnHolder = difficulty.multiplierFoodSpawn;
          // console.log(difficulty.multiplierFoodSpawn);

          foodInterval = setInterval(() => {
               food = new Food();
               food.initializeFood();

               
               // console.log("Type of this.initialValue" + ": " + typeof difficulty.initialValue)
               // console.log("Type of this.multiplier" + ": " + typeof difficulty.multiplier)
               // console.log("Type of this.difficultySetting" + ": " + typeof difficulty.difficultySetting)

               // console.log("---")

               // console.log("Type of this.multiplierFoodRatio" + ": " + typeof difficulty.multiplierFoodRatio)
               // console.log("Type of this.multiplierFoodSpawn" + ": " + typeof difficulty.multiplierFoodSpawn)
               // console.log("Type of this.multiplierSpeed" + ": " + typeof difficulty.multiplierSpeed)
                 
               // console.log("----------------------------------------------------------")

          }, difficulty.multiplierFoodSpawn); // added difficulty multiplier

          // console.log(difficulty.multiplierFoodSpawn);     // HERE ITS NOT A NUMBER

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

     difficulty.logDiffValues();

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

class ScoreCounter {   
     // scoreValue = this.value <- to sobie tutaj jest

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
          this.setScore(scoreValue)
          // this.scoreCounter.value += changeValue; // hmm what the hell is this?
     }

     update() {
          this.scoreCounter.innerText = this.value;
          console.log(this.value);
     }

     // updateDifficulty()  {
     //      if (this.value % 15) {
     //           difficulty.multiplier += 0.05;

     //           console.log(difficulty.multiplier)
     //      }
     // }             // remove later???
}

let scoreValue = new ScoreCounter(document.querySelector(".score__counter"), 0)

class Difficulty {

     constructor(initialValue, difficultySetting) { // add initialValue
          
          this.difficultySetting = difficultySetting;
          this.initialValue = initialValue; 
          
          let multiplier = 1;
          
          let multiplierFoodRatio = 1;
          let multiplierFoodSpawn = 1;
          let multiplierSpeed = 0.4;
     }   

     changeMultiplier() {
          if (this.difficultySetting == "easy") {
               this.multiplier = 1.25;

               // let difficulty = new Difficulty(1000, "easy");

               this.getMultipliers();

          } else if (this.difficultySetting == "hard"){
               this.multiplier = 1.75;

               // let difficulty = new Difficulty(1000, "hard");

               this.getMultipliers();

          }
     }


     multiplierFoodRatio = this.initialValue * this.multiplier;
     multiplierFoodSpawn = this.initialValue / this.multiplier;
     multiplierSpeed = 0.4;                                               // is this even needed???

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

     // updateMultiplier() {
     //      if ()        
     // }
   
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

          console.log("Type of this.initialValue" + ": " + typeof this.initialValue)
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
     mainScreen.classList.add("hidden");
     showGameOverScreen();

     ranking.updateScore();
     ranking.getLocalInfo();
     ranking.storeInfo();
}

const showGameOverScreen = () => {
     mainScreen.style.backgroundImage = 'url(./game_image/screen-3.svg)';
     gameOverScreen.classList.add("active");
     finalScoreDiv.innerText = `Czas: ${timer.minutes}:${timer.seconds} Punkty: ${scoreValue.value}`;
     
     // może by to ^ jakoś ostylować?

     buttonNewGame.addEventListener('click', () => {
          gameOverScreen.classList.remove("active");
          mainScreen.classList.remove("hidden");

          // setTimeout \/
          showFirstScreen();
     })
}