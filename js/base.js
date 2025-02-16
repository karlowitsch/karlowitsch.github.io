const toggleLink = document.getElementById('header-nav__item-toggle');
const menu = document.getElementById('header-nav__item-pages');
const menuIconA = toggleLink.querySelector('#menu-icon-a');
const menuIconB = toggleLink.querySelector('#menu-icon-b');
const menuIconC = toggleLink.querySelector('#menu-icon-c');
const mediaQuery = window.matchMedia('(min-width: 1025px)');
let toggleOn = false;

window.addEventListener('scroll', updateHeaderOpacity);
window.addEventListener('load', updateHeaderOpacity); // Initialisierung beim Laden der Seite

function updateHeaderOpacity() {
    var scrollPosition = window.scrollY; // Aktuelle Scroll-Position
    var header = document.querySelector('#header-background');

    // Berechne die Transparenz basierend auf der Scroll-Position
    var opacity = Math.max(scrollPosition / 300, 0.00); // Opazität sinkt von 1 bis 0.00 bei 300px Scrollen

    // Setze die Opazität direkt
    header.style.opacity = opacity;
}

// Event-Listener für Scroll und Seitenladen hinzufügen
window.addEventListener('scroll', updateHeaderOpacity);
window.addEventListener('load', updateHeaderOpacity); // Initialisierung beim Laden der Seite

toggleLink.addEventListener('click', function(event) {
    event.preventDefault(); 
    
    if (toggleOn === false) {
        menu.style.pointerEvents = 'auto';
        menu.style.opacity = 1;
        mobileMenuOn();
    } else {
        menu.style.pointerEvents = 'none';
        menu.style.opacity = 0;
        mobileMenuOff();
    }
});

function mobileMenuOn(){
    menuIconA.id = 'menu-icon-a-on';
    menuIconB.id = 'menu-icon-b-on';
    menuIconC.id = 'menu-icon-c-on';
    toggleOn = true;
}
function mobileMenuOff(){
    menuIconA.id = 'menu-icon-a';
    menuIconB.id = 'menu-icon-b';
    menuIconC.id = 'menu-icon-c';
    toggleOn = false;
}

function handleScreenChange(e) {
    if (e.matches) {
        menu.style.pointerEvents = 'auto';
        menu.style.opacity = 1;
        mobileMenuOff();
    }else{
        menu.style.pointerEvents = 'none';
        menu.style.transition = 'none';
        requestAnimationFrame(() => {
            menu.style.opacity = 0;
            
            requestAnimationFrame(() => {
                menu.style.transition = 'opacity 0.3s ease';
            });
        });
    }
}
mediaQuery.addEventListener('change', handleScreenChange);
handleScreenChange(mediaQuery); // Initialer Check

document.addEventListener("DOMContentLoaded", function() {
    var lazyElements = document.querySelectorAll(".lazy");
    
    var observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded");
          observer.unobserve(entry.target);
        }
      });
    });
  
    lazyElements.forEach(function(element) {
      observer.observe(element);
    });
});
