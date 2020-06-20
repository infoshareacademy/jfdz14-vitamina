const mainScreen = document.querySelector('.canvas');
const secondScreen = document.querySelector('.game__box');

let closeFood = [] ;

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
                                   //dodawanie punktow
                                   // console.log('good food was eaten')
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

          if (number > 50 && number < 80) {
               this.foodType = "bad";
               this.food.classList.add('game__box--badfood');
               this.food.style.backgroundImage = badFood[choiceFood];
          } else if (number > 20 && number < 50){
               this.foodType = "good";
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
          let screenLeftPosition = secondScreen.offsetLeft;

          this.positionY = event.clientY - sreenTopPosition - this.width / 2;
          this.positionX = event.clientX - screenLeftPosition - this.height / 2;

          if (this.positionY >= 400) {
               this.positionY = 400;
          }
          if (this.positionY <= 1 ) {
               this.positionY = 1;
          }
          console.log("WTF NOOBS");
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
          };
     }

}

// touch movement for Vitamen
document.addEventListener('touchstart', function(touchScreen) {
     clientX = touchScreen.touches[0].clientX;
     clientY = touchScreen.touches[0].clientY;

     let humanRect = human.human.getBoundingClientRect();

     if (clientX > humanRect.left && clientX < humanRect.right && clientY < humanRect.bottom && clientY > humanRect.top) {
         document.addEventListener('touchmove', function(touchMove){

               let availableHeight = document.querySelector(".game__box").getBoundingClientRect().height;

               let movementY = touchMove.touches[0].clientY;
               
               movementY = movementY - document.querySelector(".game__box").offsetTop;
               
               let faceHeight = humanRect.height;

               let minTop = availableHeight*0.0555;
               let maxTop = availableHeight-faceHeight;

               if(movementY > minTop && movementY < maxTop)
               {
                    human.human.style.top = movementY + 'px';
               }
               else if(movementY > maxTop)
               {
                    human.human.style.top = maxTop + 'px';
               }
               else if(movementY < minTop)
               {
                    human.human.style.top = minTop + 'px';
               }
         })
     }
}, false);

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
               newValue = 100;
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

function isLandscapeOriented()
{
     let windowWidth = window.innerWidth;
     let windowHeight = window.innerHeight;

     if(windowWidth > windowHeight)
     {
          return true;
     }

     return false;
}

const checkWidthGame = function() {

     let nonLandscapeWarning = document.querySelector("#non-landscape-warning");
     let gameDiv = document.querySelector(".game__box");

     if(isLandscapeOriented()) {
          nonLandscapeWarning.style.display = "none";
          gameDiv.style.display = "block";
     }
     else {
          gameDiv.style.display = "none";
          nonLandscapeWarning.style.display = "block";
     }
}
checkWidthGame();
document.body.onresize = function() {
     checkWidthGame();
}
