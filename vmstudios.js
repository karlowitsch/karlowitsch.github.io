
//perform on load and window resize 
window.addEventListener('load', adjustFontScale);
window.addEventListener('resize', adjustFontScale);
window.addEventListener('resize', adjustImgScale);

var image = document.querySelector('#hero');

// Scroll-Event hinzufügen
window.addEventListener('scroll', function() {
  // Scroll-Position ermitteln
  var scrollPosition = window.pageYOffset;

  // Position des Bildes basierend auf der Scroll-Position anpassen
  image.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
});

//dynamic font scale
function adjustFontScale() {
  const parentWidth = document.body.clientWidth;
  const h1 = document.querySelector('h1');
  const subline = document.getElementById('subline');
  
  h1.style.fontSize = Math.min(Math.max(parentWidth / 10, 130), 230) + 'px';
  subline.style.fontSize = Math.min(Math.max(parentWidth / 20, 30), 35) + 'px';
} 

//dynamic img scale
function adjustImgScale() {
  const home = document.getElementById('home');
  const home_img = document.getElementById('home_img');
  const img = document.querySelector('#home_img img');
  const childHeight = img.getBoundingClientRect().height;
  if(home.style.height === '100vh'){
    home_img.style.height = childHeight + "px";
  }
}

//ALL LINK DYNAMICS
$(document).ready(function() {
  const h1 = document.getElementsByTagName('h1')[0];
  const h2 = document.getElementsByTagName('h2');
  const home = document.getElementById('home');
  const homeLink = document.querySelector('#home a');
  const projects = document.getElementById('projects');
  const galLink = document.querySelectorAll('#projects a');
  let activeLink = null;
  const headLogo = document.querySelector('header nav figure a');
  const contactLink = document.querySelector('header nav ul li a');
  const contact = document.getElementById('contact');
  const home_img = document.getElementById('home_img');
  const img = document.querySelector('#home_img img');
  const home_txt = document.getElementById('home_txt');

  //HOME LINK
  homeLink.addEventListener('click', function(event) {
    event.preventDefault();     
    if (activeLink === homeLink) {
      //same
      setTimeout(() => {
        home.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      startScreen();
    }else{
      //new
      if (activeLink !== null) {
        if (activeLink.matches('.link')){
          projects.style.height = '33vh';
          const activeH2 = activeLink.querySelector('h2');
          activeH2.style.fontSize = '4vh';  
          activeH2.style.alignSelf = 'flex-end';
        }
        activeLink.classList.remove('active');
      }
      setTimeout(() => {
        home.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      activeLink = homeLink;
      activeLink.classList.add('active');
      home.style.height = '100vh'; 
      const childHeight = img.getBoundingClientRect().height;
      home_img.style.height = childHeight + "px";
      home_txt.style.height = '200px';
    }
  });
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
        }else if(activeLink === homeLink){
          //homeLink active
          home.style.height = '67vh';
          home_img.style.height = '0px';
          home_txt.style.height = '0px';
          activeLink.classList.remove('active');
          activeLink = link;
          activeLink.classList.add('active'); 
          projects.style.height = '100vh';
          const activeH2 = activeLink.querySelector('h2');
          activeH2.style.fontSize = '11vh';
          activeH2.style.alignSelf = 'center';
          setTimeout(() => {
            projects.scrollIntoView({ behavior: 'smooth' });
          }, 300); 
        }else{
          //other galLink active
          const activeH2 = activeLink.querySelector('h2');
          activeH2.style.fontSize = '4vh';
          activeLink.classList.remove('active');
          activeLink = link;
          activeLink.classList.add('active');
          const newActiveH2 = activeLink.querySelector('h2');
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
        const activeH2 = activeLink.querySelector('h2');
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
    home.style.height = '67vh';
    projects.style.height = '33vh';
    home_img.style.height = '0px';
    home_txt.style.height = '0px';
    for (let i = 0; i < h2.length; i++) {
      h2[i].style.fontSize = '4vh';
      h2[i].style.alignSelf = 'flex-end';
    }
  }
});


//undrag vids
document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('video, h1');

  elements.forEach(function(element) {
    element.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });
    element.addEventListener('mousedown', function(e) {
      e.preventDefault();
    });
  });
});
