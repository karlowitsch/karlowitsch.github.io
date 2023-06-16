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

$(document).ready(function() {
    rollButton = document.getElementById("rollButton");

});

function changeImage() {
    rollButton.disabled = true;
    var element = document.getElementById("overlayText");
    if (element !== null) {
    // Das Element mit der angegebenen ID existiert
    element.remove();
    } else {
    // Das Element mit der angegebenen ID existiert nicht
    console.log("Das Element existiert nicht.");
}

    var homeGal = document.getElementById("homeGal");
    var imgA = homeGal.getElementsByTagName("img")[0];
    var imgB = homeGal.getElementsByTagName("img")[1];
    var imgC = homeGal.getElementsByTagName("img")[2];
    var images = ["img/img_monkey_1.png", "img/img_monkey_2.png", "img/img_monkey_3.png"]; // Liste der Bildquellen
  
    var intervalA = setInterval(function() {
        imgA.src = images[currentIndexA];
        currentIndexA = (currentIndexA + 1) % images.length;
    }, 50); // Ändern Sie den Wert hier, um die Geschwindigkeit anzupassen (100 Millisekunden = 0,1 Sekunden)

    setTimeout(function() {
        clearInterval(intervalA); // Stoppen des Intervalls nach 3 Sekunden
        var randomIndex = Math.floor(Math.random() * images.length);
        imgA.src = images[randomIndex];
        currentIndexA = images.indexOf(images[randomIndex]);
    }, 1500); // Ändern Sie den Wert hier, um die Dauer anzupassen (3000 Millisekunden = 3 Sekunden)

        var intervalB = setInterval(function() {
        imgB.src = images[currentIndexB];
        currentIndexB = (currentIndexB + 1) % images.length;
    }, 55); // Ändern Sie den Wert hier, um die Geschwindigkeit anzupassen (100 Millisekunden = 0,1 Sekunden)
  
    setTimeout(function() {
        clearInterval(intervalB); // Stoppen des Intervalls nach 3 Sekunden
        var randomIndex = Math.floor(Math.random() * images.length);
        imgB.src = images[randomIndex];
        currentIndexB = images.indexOf(images[randomIndex]);
    }, 2000); // Ändern Sie den Wert hier, um die Dauer anzupassen (3000 Millisekunden = 3 Sekunden)

        var intervalC = setInterval(function() {
        imgC.src = images[currentIndexC];
        currentIndexC = (currentIndexC + 1) % images.length;
    }, 60); // Ändern Sie den Wert hier, um die Geschwindigkeit anzupassen (100 Millisekunden = 0,1 Sekunden)
  
    setTimeout(function() {
        
    rollButton = document.getElementById("rollButton");
        clearInterval(intervalC); // Stoppen des Intervalls nach 3 Sekunden
        var randomIndex = Math.floor(Math.random() * images.length);
        imgC.src = images[randomIndex];
        currentIndexC = images.indexOf(images[randomIndex]);

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
            changeImage();
        });
        idgaf.addEventListener('click', function(event) {
            event.preventDefault();
            overlayText.remove();
            rollButton.disabled = false;
        });
    }, 2500); // Ändern Sie den Wert hier, um die Dauer anzupassen (3000 Millisekunden = 3 Sekunden)

    window.onscroll = function() {
        var overlayText = document.getElementById("overlayText");
        if (overlayText !== null) {
            overlayText.remove();
            rollButton.disabled = false;
        } else {
            console.log(overlayText);
        }
    };
}
