//import { greet } from './variables.js';

// Aufruf der Funktion
//const greeting = greet('Max');
//console.log(greeting);

//perform on load and window resize 

let rollButton;
var currentIndexA = 0;
var currentIndexB = 1;
var currentIndexC = 2;
var overlayText;
var homeGal;
var homeGalImgs;

$(document).ready(function() {
    rollButton = document.getElementById("rollButton");
    homeGal = document.getElementById("homeGal");
    homeGalImgs = homeGal.getElementsByTagName('img');
    homeText = document.getElementById('homeText');

});
function checkBefore(){

    if(document.documentElement.scrollTop !== 0){
        setTimeout(() => {
            home.scrollIntoView({ behavior: 'smooth' });
            expandHome();
            calcGame();
        }, 300); 
    }else{
        expandHome();
        calcGame();
    }
}
function calcGame() {
    rollButton.disabled = true;
    var element = document.getElementById("overlayText");
    if (element !== null) {
    // Das Element mit der angegebenen ID existiert
        element.remove();
    } else {
    // Das Element mit der angegebenen ID existiert nicht
        console.log("Das Element existiert nicht.");
    }
    var imgA = homeGal.getElementsByTagName("img")[0];
    var imgB = homeGal.getElementsByTagName("img")[1];
    var imgC = homeGal.getElementsByTagName("img")[2];
    var images = ["img/img_monkey_1.png", "img/img_monkey_2.png", "img/img_monkey_3.png"];
  
    var intervalA = setInterval(function() {
        imgA.src = images[currentIndexA];
        currentIndexA = (currentIndexA + 1) % images.length;
    }, 50);

    setTimeout(function() {
        clearInterval(intervalA);
    }, Math.floor(Math.random() * 101) + 1450);

        var intervalB = setInterval(function() {
        imgB.src = images[currentIndexB];
        currentIndexB = (currentIndexB + 1) % images.length;
    }, 55);
  
    setTimeout(function() {
        clearInterval(intervalB);
    }, Math.floor(Math.random() * 101) + 1950);

        var intervalC = setInterval(function() {
        imgC.src = images[currentIndexC];
        currentIndexC = (currentIndexC + 1) % images.length;
    }, 60);
  
    setTimeout(function() {
        clearInterval(intervalC);
        makeOverlay();
    },Math.floor(Math.random() * 101) + 2450);

    window.onscroll = function() {
        var overlayText = document.getElementById("overlayText");
        if (overlayText !== null) {
            overlayText.remove();
            rollButton.disabled = false;
            collapseHome();
        }else {
            console.log(overlayText);
        }
    };
}
function expandHome(){
    home.style.height = '100vh';
    homeGal.style.height = '27vw';
    for (var i = 0; i < homeGalImgs.length; i++) {
        homeGalImgs[i].style.height = '100%';
    }
    homeText.style.height = 'auto';
}
function collapseHome(){
    home.style.height = '67vh';
    homeGal.style.height = '0';
    for (var i = 0; i < homeGalImgs.length; i++) {
        homeGalImgs[i].style.height = '0';
    }
    homeText.style.height = '0';
}
function makeOverlay(){
    setTimeout(function() {
        var overlayText = document.createElement("div");
        overlayText.id = "overlayText";
        overlayText.style.display = "flex";
        overlayText.style.flexDirection = "column";
        overlayText.style.justifyContent = "center";
        overlayText.style.alignItems= "center";
        overlayText.style.position = "fixed";
        overlayText.style.top = "50%";
        overlayText.style.left = "50%";
        overlayText.style.transform = "translate(-50%, -50%)";
        overlayText.style.background = "rgba(0, 0, 0, 0.7)";
        overlayText.style.color = "white";
        overlayText.style.width = "100vw";
        overlayText.style.height = "100vh";
        overlayText.style.fontFamily = "Arial, sans-serif";
        overlayText.style.fontSize = "70px";
        overlayText.style.zIndex = "99999";
        overlayText.style.textAlign = "center";

        if(currentIndexA === currentIndexB && currentIndexB === currentIndexC){
            overlayText.innerHTML = "YOU WIN!" + '<button id="tryAgain">TRY AGAIN</button>' + '<button id="idgaf">IDGAF</button>';
        }else{
            overlayText.innerHTML = 'You lose.' + '<button id="tryAgain">TRY AGAIN</button>' + '<button id="idgaf">IDGAF</button>';
        }
        document.body.appendChild(overlayText);

        var tryButton = document.getElementById('tryAgain');
        tryAgain.style.marginTop = '50px';
        tryAgain.style.padding = '20px 0';
        tryAgain.style.width= '200px';

        var idgaf = document.getElementById('idgaf');
        idgaf.style.marginTop = '20px';
        idgaf.style.padding = '20px 0';
        idgaf.style.width= '200px';

        tryButton.addEventListener('click', function(event) {
            event.preventDefault();
            overlayText.remove();
            calcGame();
        });
        idgaf.addEventListener('click', function(event) {
            event.preventDefault();
            overlayText.remove();
            rollButton.disabled = false;
            collapseHome();
        });
    }, 350);

}