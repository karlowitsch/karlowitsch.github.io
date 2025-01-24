document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    const serviceLink = header.querySelector('a[href="service.html"]');
    const main = document.querySelector('main');
    const allContents = main.querySelectorAll('.section-content, .faq-content');
    const sectionContents = main.querySelectorAll('.section-content');
    const faqContents = main.querySelectorAll('.faq-content');
    const sectionToggles = main.querySelectorAll('.section-toggle');
    const faqToggles = main.querySelectorAll('.faq-toggle');

    let content;
    let faqExpand = false;
    const paddingHeight = 45;

    window.addEventListener('resize', function () {
        updateHeights(content);
    });

    sectionToggles.forEach(toggle => { //SECTION TOGGLES-----------------------------------------------------------------
        toggle.addEventListener('click', function (event) {
            event.preventDefault();

            if(faqExpand){
                faqExpand = false;
                content.expand = false;
                
                content.style.height = 0;

                sectionContents[0].style.height = sectionContents[0].clientHeight + 'px';
                sectionContents[0].clientHeight;
            }

            content = this.nextElementSibling;

            sectionContents.forEach(element => {
                if (element !== content) {
                    element.expand = false;

                    element.style.height = 0;
                    element.style.padding = 0;
                }
            });

            if (content.expand === true){ // Collapse
                content.expand = false;

                content.style.height = 0; 
                content.style.padding = '0 0';

                scrollTo(allContents[0].parentNode);

            }else{  // Expand
                content.expand = true;

                content.style.height = content.scrollHeight + paddingHeight * 2 + 'px';
                content.style.padding = `${paddingHeight}px 0`;

                scrollTo(content.parentNode);
            }
        });
    });
    faqToggles.forEach(toggle => { //FAQ TOGGLES-------------------------------------------------------------------------
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            
            if(!faqExpand){
                faqExpand = true;

                sectionContents[0].style.height = 'auto';
                sectionContents[0].style.padding = `${paddingHeight}px 0`;
            }

            content = this.nextElementSibling;

            faqContents.forEach(element => {
                if (element !== content) {
                    element.expand = false;

                    element.style.height = 0;
                }
            });

            if (content.expand === true){  // FAQ Collapse
                content.expand = false;

                content.style.height = 0;

            }else{  // FAQ Expand
                content.expand = true;

                content.style.height = content.scrollHeight + 'px';
            }
        });
    });
    
    serviceLink.addEventListener('click', function (event) { 
        event.preventDefault();

        if(faqExpand){
            faqExpand = false;
            
            sectionContents[0].style.height = sectionContents[0].clientHeight + 'px';
            sectionContents[0].clientHeight;
        }

        allContents.forEach(element => { // All Collapse
            if(element.clientHeight !== 0){
                element.expand = false;

                element.style.height = 0;
                element.style.padding = 0;
            }
        });
        
        scrollTo(document.body);
    });

    function scrollTo(element) {
        const duration = 300;
        const startPosition = window.scrollY;
        const startTime = performance.now();
    
        function animation(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
    
            const parentTop = element.getBoundingClientRect().top + window.scrollY;
            const targetPosition = element === document.body ? parentTop : parentTop - headerHeight + 1;
            const distance = targetPosition - startPosition;
    
            // Lineare Berechnung der aktuellen Scrollposition
            const currentScrollPosition = startPosition + (distance * progress);
    
            window.scrollTo(0, currentScrollPosition);
    
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
    
        requestAnimationFrame(animation);
    }
    
        
    function updateHeights(content) {
        if(content && faqExpand === false && content.expand === true){

            content.style.height = 'auto';
            content.clientHeight;

            content.style.height = content.clientHeight + 'px';

        }else if(content){

            allContents[0].style.height = 'auto';
            content.style.height = 'auto';
            content.clientHeight;

            allContents[0].style.height = allContents[0].clientHeight + 'px';
            content.style.height = content.clientHeight + 'px';
        }
    }
});