const dataReload = document.querySelectorAll("[data-reload]");

const htmlTag = document.querySelectorAll("html")

let langButton = document.querySelector(".page__version__button");

langButton.addEventListener("click", () => {

    if (document.documentElement.lang == "pl") {

        document.documentElement.setAttribute('lang', "en");
        document.querySelector(".lang-version").innerText = "PL"
        changeToEnglish();

    } else if (document.documentElement.lang == "en") {
        // document.documentElement.setAttribute('lang', "pl");
        // document.querySelector(".lang-version").innerText = "EN"
        reloadPage();
    }
})
   
const reloadPage = () => {
    location.reload();
}

// const reloadContent = () => {

//     for (i = 0; i <= dataReload.length; i++) {
//         dataReload[i].onclick = function() {
//             location.reload(true);
//         };
//     };
// }

const changeToEnglish = () => {

    if (document.documentElement.lang == "en") {

        // MODAL
        document.querySelector("#modal-text-1").innerText = "Be first";
        document.querySelector("#modal-text-2").innerHTML = "Sign up to our newsletter and be the first to find out about <b> VITAMINA's </b> launch date";
        document.querySelector("#modal-text-input").placeholder = "Please type in your email address";

        document.querySelector("#modal-text-button").innerText = "Sign up"     
        document.querySelector("#modal-text-game-button").innerText = "Play the game"
        document.querySelector("#modal-text-incorrect-email").innerText = "Incorrect email address"
        document.querySelector("#modal-text-nospam").innerHTML = "<b>Psst!</b> Just like you, we don't like spam. Which is why we will email you only once on launch day"
        document.querySelector("#modal-text-permission").innerText = "By signing up to this newsletter you give us persmission to process your personal data"

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

        // ADDITIONAL FEATURES:
        document.querySelector("#add-features-journal").innerText = "Meal journal";
        document.querySelector("#add-features-journal-content").innerText = "The basis of quality nutrition is a throughout diet, which lets people change their eating habits step by step. Diet analysis is a feature which can verify whether your dieting habits are worth keeping or if they should be changed. You will be able to input your eaten meals using a ready-to-use database containing multiple products and recipes; this database will also let you check the amount of calories you consume. You will also be able to add ingredients currently available to you to a list. Thanks to your meal journal, as well as a questionnaire which you will fill out when you sign up we will be able to analyze your diet and evaluate it in terms of calorific content, nutritional value (including proteins, carbs and fats as well as micro-, macro elements and vitamins). We will also check if your diet is varied enough and if you need a small adjustment or a total revolution! ";
        document.querySelector("#add-features-diet").innerText = "Diet for you";
        document.querySelector("#add-features-diet-content").innerText = "After analyzing your meal journal we will provide you with a template diet (designed with your lifestyle and dietary requirements in mind) which you will be able to modify using our app, as well as an ingredient/shopping list for the coming week. Did we mention that you can modify this list to exclude certain foods from ever appearing on it? Because you can! Oh, we will also be available (on Facebook or via email) and ready to answer any and all questions you might have.";
        document.querySelector("#add-features-hydration").innerText = "Hydration";
        document.querySelector("#add-features-hydration-content").innerText = "Hydration has an impact not only on our physical condition but also our mental wellbeing and performance. Our feature reminds you to drink enough liquids. We do so by first calculating your daily requirements, based on the questionnaire we mentioned before. After that you will be able to mark the volume and type of liquids drunk during the day. You will also be able to check your daily/weekly and monthly consumption data. Your body WILL thank you for it! ";
        document.querySelector("#add-features-sleep").innerText = "Healthy sleep";
        document.querySelector("#add-features-sleep-content").innerText = "Another very factor influencing well being is sleep. Our app helps to educate you in healthy sleep practices and helps you turn that knowledge into healthy habits. One of the key features is the ability to play a short meditation designed to make falling asleep easier right before you go to sleep. Another one is its ability to monitor your sleep and choose the right moment (when your sleep is lightest and the impact of waking up the smallest) to wake you up (and avoid unnecessary shock associated with waking up). ";
        document.querySelector("#add-features-activity").innerText = "Physical activity";
        document.querySelector("#add-features-activity-content").innerText = "You will be given access to a daily activity journal, which you can use to store information about your daily training, its length, intensity, types of exercises done, etc. It will allow you to check the amount of calories burnt as well as track your progress on a multitude of graphs. You will also receive feedback designed to keep your motivation up.";
        document.querySelector("#add-features-calories").innerText = "Calorie counter";
        document.querySelector("#add-features-calories-content").innerText = "Everybody is different. That means that everybody requires an individual approach. After you fill out our starter questionnaire (regarding your physical traits, your lifestyle, habits, preferences and most importantly - Goals) you will be given a personalized nutrition plan. We will also teach you how to plan your own meals, as well as how to put together healthy meals using recommended super-healthy ingredients.";
        document.querySelector("#add-features-practices").innerText = "Good practices";
        document.querySelector("#add-features-practices-content").innerText = "Healthy nutritional habits are the foundation of a healthy diet. Which is why it's so important to know which products are the healthiest and what are the better alternatives to some other, less healthy foods, among other things. Our articles are also a great source of advice on how to prepare meals using super foods so that they can retain all of their pro-health characteristics. Last but not least, you will be given access to a knowledge database containing info on healthy lifestyle and answers to the FAQ. ";
        document.querySelector("#add-features-menu").innerText = "Seasonal menu";
        document.querySelector("#add-features-menu-content").innerText = "Missing those sweet, sweet seasonal products and meals? We miss them too! This is why we make sure to let you know when to start expecting them in stores as well as how best to include them in your diet. Learn new recipes and bring your seasonal meal planning to a whole new level.";

        // ABOUT US:
        document.querySelector("#about-us-title").innerText = "Get to know us better";
        document.querySelector("#about-us-content").innerText = "We live in a world where many people struggle with health problems, lack of time and/or motivation and so on. Which is why, in response to increasing demand, we decided to create a tool to help you control your diet and training and to help you maintain your motivation and physical and mental wellbeing.";
        document.querySelector("#about-us-content-2").innerText = "Our mission is to inspire people to commit to a healthy lifestyle while at the same time delivering a product based on newest technologies. We want to convince you that a healthy lifestyle can be simple, quick and inexpensive."
        document.querySelector("#about-us-content-3").innerText = "It is (that) simple. Let's make it happen!"       
        document.querySelector("#about-us-founders").innerText = "Vitamina Founders";

        // OUR WORK & TEAM & FOOTER
        document.querySelector("#products").innerText = "Our other products";

        document.querySelector("#team-header").innerText = "Meet our team";

        document.querySelector("#policy").innerText = "Privacy policy";
        document.querySelector("#terms").innerText = "Terms and Conditions";

        //GAME- PAGE:
        document.querySelector("#game-button").innerText = "Play the game";
        
        //GAME-Proper:

        document.querySelector("#game-proper-score").innerHTML = "Wynik: <span class=\"score__counter\"></span>";
        document.querySelector("#game-proper-endscreen").innerText = "Vitamen ate too much junk food and now his stomach aches. Does anyone have any mint tea?";

        // endscreen done
        // game wip!

        // document.querySelector("#").innerText = "";
    }
}