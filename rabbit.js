//import { greet } from './variables.js';

// Aufruf der Funktion
//const greeting = greet('Max');
//console.log(greeting);

//perform on load and window resize 

let headLogo;
let loginLink;
let login;
let contactLink;
let home;
let subline;
let h2;
let activeH2;
let newActiveH2;
let projects;
let galLink;
let contact;
let elements;

let activeLink;



//ALL LINK DYNAMICS
$(document).ready(function() {
  home = document.getElementById('home');
  h2 = document.getElementsByTagName('h2');
  projects = document.getElementById('projects');
  galLink = document.querySelectorAll('#projects a');
  headLogo = document.querySelector('header nav figure a');
  loginLink = document.getElementById('loginLink');
  login = document.getElementById('login');
  contactLink = document.querySelector('#contactLink');
  contact = document.getElementById('contact');
  activeLink = null;

  //GALLERY_link
  galLink.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      if (activeLink !== null) {  
        //IF NOT NULL  
        if (activeLink === link) {  
          //same galLink active
          home.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            startScreen();
          }, 400);
        }else{
          //other galLink active
          activeH2 = activeLink.querySelector('h2');
          activeH2.style.fontSize = '4vh';
          activeLink.classList.remove('active');
          activeLink = link;
          activeLink.classList.add('active');
          newActiveH2 = activeLink.querySelector('h2');
          newActiveH2.style.fontSize = '11vh';
          newActiveH2.style.alignSelf = 'center';
        }
      }else{
        activeLink = link;
        activeLink.classList.add('active');
        setTimeout(() => {
          projects.scrollIntoView({ behavior: 'smooth' });
        }, 300); 
        projects.style.height = '100vh';
        activeH2 = activeLink.querySelector('h2');
        activeH2.style.fontSize = '11vh';
        activeH2.style.alignSelf = 'center';
      }
    });
  });
  
  //headLogo_link
  headLogo.addEventListener('click', function(event) {
    event.preventDefault();
    if(document.documentElement.scrollTop === 0){
      startScreen();
    }else{
      home.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        startScreen();
      }, 400); 
    }
  });
  //loginForm exit
  window.onclick = function(event) {
    if (event.target === login) {
      login.style.display = "none";
      login.removeAttribute('target');
    }
  }
  window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') { // Escape-Taste
      login.style.display = "none";
      login.removeAttribute('target');
    }
  });
  //contactLink
  contactLink.addEventListener('click', function(event) {
    event.preventDefault();
    if(activeLink !== null){
      startScreen();
      setTimeout(() => {
        contact.scrollIntoView({ behavior: 'smooth' });
      }, 300); 
    }else{
      contact.scrollIntoView({ behavior: 'smooth' });
    }
  });

  //STARTSCREEN
  function startScreen() {
    if (activeLink !== null) {
      activeLink.classList.remove('active');
    }
    activeLink = null;
    projects.style.height = '33vh';
    for (let i = 0; i < h2.length; i++) {
      h2[i].style.fontSize = '4vh';
      h2[i].style.alignSelf = 'flex-end';
    }
  }
});


//undrag vids
document.addEventListener('DOMContentLoaded', function() {
  elements = document.querySelectorAll('.galLink, img, h1');

  elements.forEach(function(element) {
    element.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });
    element.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });
  });
});