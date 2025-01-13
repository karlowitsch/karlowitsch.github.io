const toggleLink = document.getElementById('header-nav__item-toggle');
const menu = document.getElementById('header-nav__item-pages');
const menuIconA = toggleLink.querySelector('#menu-icon-a');
const menuIconB = toggleLink.querySelector('#menu-icon-b');
const menuIconC = toggleLink.querySelector('#menu-icon-c');
const mediaQuery = window.matchMedia('(min-width: 1025px)');
let toggleOn = false;


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
