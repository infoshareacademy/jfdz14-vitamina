const mainScreen = document.querySelector('.canvas');
const secondScreen = document.querySelector('.game__box');

class Food {
     positionX = 10;
     positionY = 5;
     number = 0;

     createFoodContainer() {
          this.food = document.createElement('div');
          secondScreen.appendChild(this.food);
     }

     randomPosition() {
          this.positionY = Math.random() * 80;
          this.food.style.bottom = this.positionY + 2 +"%";
          this.positionY; // dlaczego tak ^ ??
     }

     runToLeft() {
          setInterval(() => {
               if (this.positionX > 95) { // removing = from >=
                    this.food.remove();
               }
               if (this.positionX <= 100) {
                    this.food.style.left = this.positionX + "%";
                    this.positionX += .4;

                    // console.log(this.positionY + "||" + this.positionX)
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
          } else if (number > 20 && number < 50){ // 50 jest nieużywane
               this.food.classList.add('game__box--goodfood');
               this.food.style.backgroundImage = goodFood[choiceFood];
          } else {
               this.food.style.backgroundImage = ''; // a czemu puste? One wciąż lecą 
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
     positionX = 100;
     positionY = 0;
     width = 51; // dajmy mu większą szerokość dla łątwiejszego sterowania?
     height = 120;

     createHumanElement() {
          this.human = document.createElement('div');
          this.human.classList.add('human');
          secondScreen.appendChild(this.human);

          // //adding a "food catcher"
          // this.maw = document.createElement('div');
          // this.maw.classList.add("maw")
          // this.human.appendChild(this.maw);
     }
     humanMove() {
          let sreenTopPosition = secondScreen.offsetTop;

          this.positionY = event.clientY - sreenTopPosition - this.width / 2;

          if (this.positionY >= 395) {
               this.positionY = 395; //zmieniona bo był clip za ramy (zmienic min wysokosc spawnu zarcia?)
          }
          if (this.positionY <= 30 ) { 
               this.positionY = 30; //zmienione na przestrzen na staty
          }
          this.human.style.top = this.positionY + 'px';

          // console.log(this.positionY + "||" + this.positionX) // remove later
     }
     humanPositionY() {
          this.human.addEventListener('mousemove', () => this.humanMove());
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

let food = new Food();

// -----------------------------------------------------------------------------------

let lives = 5;
let time = 0;
let score = 0;

let timer = document.querySelector(".game__timer");

timer.textContent = time;

const removeHeart = () => {
     const hearts = document.querySelector(".game__lives");
     
     console.log(hearts.lastChild)
          
     hearts.lastChild.remove();   // działa co drugi raz? WTF
}

const gameTime = () => {
          setInterval( () => {
               time += 0.1;   

               return (Math.round((time + Number.EPSILON) * 100) / 100)
          }, 100)
     }

const gameScore = () => {
     return score += 1;   // start z 1 ??? ;/
}

const updateStats = () => { //niepotrzebne?
     
     gameTime()
     removeHeart()
}

const gameStop = () => {

}

const detectDevouring = () => {
     if (food.positionX == human.positionX && food.positionY >= human.positionY - 30 || food.positionY <= human.positionY + 30) {
          if (food.number > 20 && food.number < 50) { // >=  czy >
               gameScore()
          } else if (food.number >50 && food.number < 80) {
               removeHeart();
               if (removeHeart() = undefined) {
                    gameStop(); // nie wiem, czy to tu?
               }
          }
          return score;       
     }
     return score;
}

detectDevouring();


// dodajmy max-width lub costam bo background sie przycina przy wiekszych 1x1









// --- \/ test \/ ---


// --- \/ test \/ ---
        //  console.log(maw.positionY) // remove later