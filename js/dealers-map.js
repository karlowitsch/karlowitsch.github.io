const svgNamespace = "http://www.w3.org/2000/svg";
const dealersMapSection = document.getElementById('dealers-map-section');
const dealersMap = dealersMapSection.querySelector('#dealers-map');
const dealersMapImage = dealersMapSection.querySelector('#dealers-map object');
const dealersHeadlineBox = document.querySelector('.headline-box');
const spotHeadline = dealersMapSection.querySelector('.spot-headline');
const dealersStageSection = document.getElementById('dealers-stage-section');
const backToMapLink = document.getElementById('back-to-map-link'); // "Back"-Linkconst
const majorDealersWrapper = document.getElementById('major-dealers-wrapper');
const dealersStage = document.getElementById('dealers-stage');
const dealersStageSubline = document.getElementById('dealers-stage-subline');
const dynamicStage = document.querySelector('.dynamicStage');
const dynamicStageCountries = document.getElementById('dynamic-stage-countries');
const dynamicStageDealers = document.getElementById('dynamic-stage-dealers');
const areaTemplate = document.getElementById("area-template");

let currentArea;
let currentCountry;
let areaData;
let countryData;

let dealersMapRule = null;

document.addEventListener('DOMContentLoaded', function() {
    const targetStylesheets = [document.styleSheets[3], document.styleSheets[4]];

    for (let stylesheet of targetStylesheets) {
        try {
            const rules = stylesheet.cssRules || stylesheet.rules;
            for (let rule of rules) {
                if (rule.selectorText === '#dealers-map') {
                    dealersMapRule = rule;
                    //console.log('ID gefunden:', dealersMapRule.cssText);
                    return; // Suche beenden, sobald die Regel gefunden wurde
                }
            }
        } catch (e) {
            console.warn('Konnte Stylesheet nicht lesen:', e);
        }
    }

    console.log('ID nicht gefunden');
});



templateTesting();
function templateTesting(){
}



fetch('json/dealers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        if (!dealersMap) {
            console.error('Element mit ID "dealers-hero-map" nicht gefunden');
            return;
        }

        const areaFragment = document.createDocumentFragment();

        data.forEach(area => {
            //spotHeadline.innerHTML = area.name;

            // Markierungen für das Gebiet
            const mapAreaSpot = document.createElement('div');
            mapAreaSpot.classList.add('map-spot', 'map-area', 'map-link');
            mapAreaSpot.id = `map-area-${area.abbreviation}`;

            updateCSS({
                [`#${mapAreaSpot.id}`]: {'width': `${area['spot-metrics'].width}`, 'aspect-ratio': `${area['spot-metrics'].aspectRatio}`, 'left': `${area['spot-metrics'].left}`, 'bottom': `${area['spot-metrics'].bottom}`}
            });

            // Erstes SVG für das Bild erstellen
            const svgImg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgImg.classList.add("map-spot-img-svg");

            const useImg = document.createElementNS("http://www.w3.org/2000/svg", "use");
            useImg.setAttribute(`href`, `img/svg/map/map-area-img-${area.abbreviation}.svg#img-symbol-${area.abbreviation}`);
            svgImg.appendChild(useImg);

            // Zweites SVG für den Link erstellen
            const svgLink = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgLink.classList.add("map-spot-link-svg");

            const link = document.createElementNS("http://www.w3.org/2000/svg", "a");
            link.href = "#";
            link.classList.add("map-spot-link");
            link.id = `map-spot-link-${area.abbreviation}`;

            const useLink = document.createElementNS("http://www.w3.org/2000/svg", "use");
            useLink.setAttribute(`href`, `img/svg/map/map-area-link-${area.abbreviation}.svg#link-symbol-${area.abbreviation}`);

            link.appendChild(useLink);
            svgLink.appendChild(link);
            
            mapAreaSpot.appendChild(svgImg);
            mapAreaSpot.appendChild(svgLink);

            areaFragment.appendChild(mapAreaSpot);
        });
        
        dealersMap.appendChild(areaFragment);


        // event listener map-spots (use)
        dealersMap.addEventListener('click', (event) => {
            if (event.target.closest('div').classList.contains('map-area')) {
                event.preventDefault(); // Verhindert den Linksprung

                currentArea = event.target.closest('div');
                areaData = data.find(area => area.abbreviation === currentArea.id.replace('map-area-', ''));

                handleArea();
            }
        });
        dynamicStageCountries.addEventListener('click', (event) => {
            if (event.target.tagName === 'IMG') {
                event.preventDefault(); // Verhindert den Linksprung

                countryData = areaData.items.find(country => country.abbreviation === event.target.src.split('/').pop().split('.')[0]);

                handleCountry();
            }
        });
        // event listener back-to-map-link
        if (backToMapLink) {
            backToMapLink.addEventListener('click', (event) => {
                event.preventDefault();
        
                if(countryData){
                    updateCSS({
                        '.map-country' : {'opacity': '0'},
                    });
                    handleArea();
                    countryData = null;
                    setTimeout(() => {
                        currentCountry.remove();
                    }, 500);
                }else{
                    handleWorld();
                    areaData = null;
                }
            });
        }
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });



async function handleArea(){

    await loadStageItems(areaData);

    updateCSS({
        '.headline-box': {'pointer-events': 'none', 'opacity': '0'},
        '.map-spot-link use': {'pointer-events': 'none'},
        [`#${currentArea.id}`] : {'opacity': '0.7'},
        '#major-dealers-wrapper': { 'pointer-events': 'none', 'opacity': '0'},
        '#dynamic-stage-dealers': {'pointer-events': 'none', 'opacity': '0'}
    });
    requestAnimationFrame(() => {
        updateCSS({
            '#dealers-map': {/*'will-change': 'transform',*/ 'transform': `translate3d(${areaData.transform3d.translate3d}) scale3d(${areaData.transform3d.scale3d})`}
        });
    });

    document.querySelectorAll('.map-area').forEach(spot => {
        if (spot !== currentArea) {
            updateCSS({
                [`#${spot.id}`] : {'opacity': '0.05'}
            });
        }
    });

    setTimeout(async() => {
        dynamicStageDealers.innerHTML = '';
        spotHeadline.textContent = areaData.name;
        updateCSS({
            '.spot-headline': {'opacity': '1'},
            '#back-to-map-link': { 'pointer-events': 'auto', 'opacity': '1'},
            '#dynamic-stage-countries': {'pointer-events': 'auto', 'opacity': '1'},
        });
    }, 250);
    setTimeout(async() => {
        updateCSS({
            //'#dealers-map': {'will-change': `auto`}
        });
    }, 500);
}

async function handleCountry(){

    //await loadStageItems(countryData);
    await setupCountry();

    updateCSS({
        '.spot-headline': {'opacity': '0'},
        [`#${currentArea.id}`] : {'opacity': '0.05'},
        '.map-country' : {'opacity': '1'},
        '#dynamic-stage-countries': {'pointer-events': 'none', 'opacity': '0'},
    });
    requestAnimationFrame(() => {
        updateCSS({
            '#dealers-map': {/*'will-change': 'transform',*/ 'transform': `translate3d(${countryData.transform3d.translate3d}) scale3d(${countryData.transform3d.scale3d})`}
        });
    });
    setTimeout(async() => {
        dynamicStageCountries.innerHTML = '';
        spotHeadline.textContent = countryData.name;
        updateCSS({
            '.spot-headline': {'opacity': '1'},
            '#back-to-map-link': { 'pointer-events': 'auto', 'opacity': '1'},
            '#dynamic-stage-dealers': {'pointer-events': 'auto', 'opacity': '1'},
        });
    }, 250);
    setTimeout(async() => {
        updateCSS({
            //'#dealers-map': {'will-change': `auto`}
        });
    }, 500);
}

function handleWorld(){
    updateCSS({
        '#dealers-stage-section': {'height': `38.2vh`},
        '.spot-headline': {'opacity': '0'},
        '#back-to-map-link': { 'pointer-events': 'none', 'opacity': '0'},
        '#dynamic-stage-countries': {'pointer-events': 'none', 'opacity': '0'},
        '.map-area': {'opacity': `0.8`},
        //'#dealers-map': {'will-change': `transform`, 'transform': `translate(0, 0) scale(1)`},
    });
    requestAnimationFrame(() => {
        updateCSS({
            '#dealers-map': {/*'will-change': 'transform',*/ 'transform': `translate3d(0, 0, 0) scale3d(1, 1, 1)`}
        });
    });

    document.querySelectorAll('.map-area').forEach(spot => {
        
        updateCSS({
            [`#${spot.id}`] : {'opacity': '0.7'}
        }); 
    });

    setTimeout(async() => {
        dynamicStageCountries.innerHTML = '';
        spotHeadline.textContent = '';

        updateCSS({
            '.headline-box': {'pointer-events': 'auto', 'opacity': '1'},
            '.map-spot-link use': {'pointer-events': 'auto'},
            '#major-dealers-wrapper': { 'pointer-events': 'auto', 'opacity': '1'},
        });
    }, 250);
    setTimeout(async() => {
        updateCSS({
            //'#dealers-map': {'will-change': `auto`}
        });
    }, 500);
}



async function setupCountry() {

    currentCountry = document.createElement('div');
    currentCountry.id = `map-country-${countryData.abbreviation}`;
    currentCountry.classList.add('map-spot', 'map-country');

    updateCSS({
        [`#${currentCountry.id}`]: {'width': `${countryData['spot-metrics'].width}`, 'aspect-ratio': `${countryData['spot-metrics'].aspectRatio}`, 'left': `${countryData['spot-metrics'].left}`, 'bottom': `${countryData['spot-metrics'].bottom}`}
    });

    // SVG für das Bild erstellen
    const svgImg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgImg.classList.add("map-spot-img-svg");

    const useImg = document.createElementNS("http://www.w3.org/2000/svg", "use");
    useImg.setAttribute(`href`, `img/svg/map/map-country-img-${countryData.abbreviation}.svg#img-symbol-${countryData.abbreviation}`);
    svgImg.appendChild(useImg);
    
    currentCountry.appendChild(svgImg);
    dealersMap.appendChild(currentCountry);

    // Warten auf das Laden des Bildes
    await new Promise((resolve, reject) => {
        useImg.onload = resolve;
        useImg.onerror = reject;
    });
}

async function loadStageItems(data) {
    // Leeren Sie den dynamicStage

    const fragment = document.createDocumentFragment();
    const imagePromises = [];

    data.items.forEach(item => {
        const img = new Image();
        const imgPromise = new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
        imagePromises.push(imgPromise);

        img.src = item.img;

        const dynamicStageItem = document.createElement('a');
        dynamicStageItem.setAttribute("href", "#");
        dynamicStageItem.classList.add('dynamic-stage-item');
        
        if (data.hasOwnProperty('img')) {
            dynamicStageItem.classList.add('dynamic-stage-item-dealer');
        }

        dynamicStageItem.appendChild(img);
        
        fragment.appendChild(dynamicStageItem);
    });

    if (!data.hasOwnProperty('img')) {
        dynamicStageCountries.appendChild(fragment);
    }else{
        dynamicStageDealers.appendChild(fragment);
    }

    // Warten Sie, bis alle Bilder geladen sind
    Promise.all(imagePromises)
        .then(() => {
            // Alle Bilder sind geladen, jetzt können wir die scrollHeight berechnen
            requestAnimationFrame(() => {
                if (!data.hasOwnProperty('img')) {
                    updateCSS({
                        '#dealers-stage-section': {'height': `${dynamicStageCountries.scrollHeight + dealersStageSubline.offsetHeight}px`},
                    });
                }else{
                    updateCSS({
                        '#dealers-stage-section': {'height': `${dynamicStageDealers.scrollHeight + dealersStageSubline.offsetHeight}px`},
                    });
                }
            });
        })
        .catch(error => {
            console.error("Ein Fehler ist beim Laden der Bilder aufgetreten:", error);
        });
}


function updateCSS(rules) {
    const styleSheets = Array.from(document.styleSheets);
    
    Object.entries(rules).forEach(([selector, properties]) => {
      let ruleFound = false;
      
      for (let sheet of styleSheets) {
        const cssRules = Array.from(sheet.cssRules || sheet.rules);
        const existingRule = cssRules.find(rule => rule.selectorText === selector);
        
        if (existingRule) {
          Object.entries(properties).forEach(([property, value]) => {
            existingRule.style[property] = value;
          });
          ruleFound = true;
          break;
        }
      }
      
      if (!ruleFound) {
        const newRule = `${selector} { ${Object.entries(properties).map(([prop, val]) => `${prop}: ${val};`).join(' ')} }`;
        document.styleSheets[0].insertRule(newRule, document.styleSheets[0].cssRules.length);
      }
    });
  }
