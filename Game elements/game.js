const mainScreen = document.querySelector('.canvas');
const secondScreen = document.querySelector('.game__box');

let closeFood = [] ;

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

     createFoodContainer() {
          this.food = document.createElement('div');
          secondScreen.appendChild(this.food);
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

                                   myProgressBar.consumeFood(-5);
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
                         this.positionX += .4;
                         
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

          if (number > 50 && number < 100) {
               this.foodType = "bad";
               this.food.classList.add('game__box--badfood');
               this.food.style.backgroundImage = badFood[choiceFood];
          } else if (number > 0 && number <= 50){
               this.foodType = "good";
               this.food.classList.add('game__box--goodfood');
               this.food.style.backgroundImage = goodFood[choiceFood];
          } // removed useless setting
     }

     initializeFood() {
          this.createFoodContainer();
          this.foodsTypeRandom();
          this.randomPosition();
          this.runToRight();
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
          secondScreen.appendChild(this.human);
     }
     humanMove() {
          let sreenTopPosition = secondScreen.offsetTop;

          this.positionY = event.clientY - sreenTopPosition - this.width / 2;

          if (this.positionY >= 395) {
               this.positionY = 395;
          }
          if (this.positionY <= 30 ) {
               this.positionY = 30;
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
          console.log("Trying to open mouth");


          if (!this.human.classList.contains('active')) { 
               this.human.classList.add('active');
               console.log("Opening mouth");

          };
     }
}



const randomFoodCreate = () => {
     setInterval(() => {
          let food = new Food();
          food.initializeFood();
     }, 1000);
}

const human = new Human();

human.createHumanElement();
human.humanPositionY();
randomFoodCreate();

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
               newValue = 100; //is this needed? or will go back to 100 again if it drops below 0?
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
          console.log(this.value)  // how is this.value not a number?!?!?!?!?!?!?! REEEEEEEEEEE
     }
}

let scoreValue = new ScoreCounter(document.querySelector(".score__counter"), 0)



class Difficulty {
     
}

//-----------
// let time = 0;

// let timer = document.querySelector(".game__timer");

// timer.textContent = time;


// const gameTime = () => {
//           setInterval( () => {
//                time += 0.1;   

//                return (Math.round((time + Number.EPSILON) * 100) / 100)
//           }, 1500)
//  }