//perform on load and window resize 
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);

//dynamic font size
function adjustFontSize() {
  const parentWidth = document.body.clientWidth;
  const h1 = document.querySelector('h1');
  const subline = document.getElementById('subline');
  
  h1.style.fontSize = Math.min(Math.max(parentWidth / 10, 60), 110) + 'px';
  subline.style.fontSize = Math.min(Math.max(parentWidth / 20, 30), 35) + 'px';

}

//GALLERY DYNAMICS
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
  
  //homeLink
  homeLink.addEventListener('click', function(event) {
    event.preventDefault();     
    if (activeLink === homeLink) {
      //same
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
      
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      activeLink = homeLink;
      activeLink.classList.add('active');
      home.style.height = '100vh'; 
    }
  });
  //GALLERY_link
  galLink.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      if (activeLink === link) {
        //same
        startScreen();
        home.scrollIntoView({ behavior: 'smooth' });
      }else{
        //new
        if (activeLink !== null) {
          if(activeLink.matches('#homeLink')){
            home.style.height = '67vh';
          }else if(activeLink.matches('#projects a')){
            const activeH2 = activeLink.querySelector('h2');
            activeH2.style.fontSize = '4vh';  
            activeH2.style.alignSelf = 'flex-end';
          }
          activeLink.classList.remove('active');
        }
        activeLink = link;
        activeLink.classList.add('active');
        projects.style.height = '100vh';
        projects.scrollIntoView({ behavior: 'smooth' });
        const activeH2 = activeLink.querySelector('h2');
        activeH2.style.fontSize = '11vh';
        activeH2.style.alignSelf = 'center';
      }
    });
  });
  
  //headLogo_link
  headLogo.addEventListener('click', function(event) {
    event.preventDefault();
    startScreen();
    home.scrollIntoView({ behavior: 'smooth' });
  });
  //contactLink
  contactLink.addEventListener('click', function(event) {
    event.preventDefault();
    startScreen();
    contact.scrollIntoView({ behavior: 'smooth' });
  });
  
  //STARTSCREEN
  function startScreen() {
    if (activeLink !== null) {
      activeLink.classList.remove('active');
    }
    activeLink = null;
    home.style.height = '67vh';
    projects.style.height = '33vh';
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
