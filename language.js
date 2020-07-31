const dataReload = document.querySelectorAll("[data-reload");

const htmlTag = document.querySelectorAll("html")

// let language = {
//     pl: {
//         // is filling this even necessary?
//     },

//     en: {
        
//     }
// };

let langButton = document.querySelector(".page__version__button");

langButton.addEventListener("click", () => {

    if (document.documentElement.lang == "pl") {

        document.documentElement.setAttribute('lang', "en");
        document.querySelector(".lang-version").innerText = "PL"

        changeToEnglish();

    } else if (document.documentElement.lang == "en") {

        document.documentElement.setAttribute('lang', "pl");
        document.querySelector(".lang-version").innerText = "EN"

        reloadPage();
    }
})
   
const reloadPage = () => {
    location.reload();
}

const changeToEnglish = () => {

    if (document.documentElement.lang == "en") {

        //modal
        document.querySelector("#modal-text-1").innerText = "Be first";
        document.querySelector("#modal-text-2").innerHTML = "Sign up to our newsletter and be the first to find out about <b> VITAMINA's </b> launch date";
        document.querySelector("#modal-text-input").innerText = "Please type in your email address";
                                                                    // fix above ^

        document.querySelector("#modal-text-button").innerText = "Sign up"     
        document.querySelector("#modal-text-game-button").innerText = "Play the game"
        document.querySelector("#modal-text-incorrect-email").innerText = "Incorrect email address"
        document.querySelector("#modal-text-nospam").innerText = "Just like you, we don't like spam. Which is why we will email you only once on launch day"
        document.querySelector("#modal-text-permission").innerText = "By signing up to this newsletter you give us persmission to process your personal data"

        // GAME

        // COOKIES
        document.querySelector("#cookie-info").innerHTML = "We use our own cookies as well as third party websites to show you ads based on content you've seen. By navigating the website you agree to their use on our part. You can change cookie settings or disable them at any time. To learn more please read our <a class=\"cookie__box__description--link\" id=\"cookie-policy\" href=\"#\">Cookie Policy</a>"; 
        document.querySelector("#cookie-agreement").innerText = "I agree";

        // NAV
        document.querySelector("#philosophy").innerText = "Our philosophy";
        document.querySelector("#add-features").innerText = "Additional features";
        document.querySelector("#mission").innerText = "Our mission";
        document.querySelector("#other-products").innerText = "Other products";
        document.querySelector("#team").innerText = "Our team";

        // HERO
        document.querySelector("#hero__subtitle-one").innerText = "Vitamina. Revolutionizing your health.";
        document.querySelector("#hero__subtitle-two").innerText = "Time to get healthy.";
        document.querySelector("#hero__subtitle-three").innerText = "Vitamina. Revolutionizing your health.";
        document.querySelector("#hero__subtitle-four").innerText = "Time to get healthy.";
        document.querySelector("#hero__subtitle-five").innerText = "Vitamina. Revolutionizing your health.";
        document.querySelector("#hero__subtitle-six").innerText = "Time to get healthy.";        
        
        // FEATURES:
        document.querySelector("#features-diet").innerText = "Diet";
        document.querySelector("#features-diet-info").innerText = "Our app provides personalized dietary suggestions based on your weekly meal journal.";
        document.querySelector("#features-vitality").innerText = "Vitality";
        document.querySelector("#features-vitality-info").innerText = "Our lifestyle often impacts our mental health. We make sure that your lifestyle introduces only positive changes in your life.";
        document.querySelector("#features-figure").innerText = "Body figure";
        document.querySelector("#features-figure-info").innerText = "After analyzing your lifestyle our app will provide you with a personalized training plan.";
        document.querySelector("#features-habits").innerText = "Habits";
        document.querySelector("#features-habits-info").innerText = "Keeping healthy habits is just as important as introducing them in the first place. We will make sure that you continue to do so.";

        document.querySelector("#").innerText = "";


        // FIX alt attributes toooooo...






        document.querySelector("#").innerText = "";


        //pattern
        // document.querySelector("#").innerText = "";
        // document.querySelector("#").innerText = "";









        // document.querySelector("#philosophy").innerText = "Our philosophy";
        // document.querySelector("#addFeatures").innerText = "Additional features";
        // document.querySelector("#mission").innerText = "Additional features";
        // document.querySelector("#otherProducts").innerText = "Our mission";
        // document.querySelector("#team").innerText = "Other products";
    }
}