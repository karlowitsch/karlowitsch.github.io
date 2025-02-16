const svgNamespace = "http://www.w3.org/2000/svg";
const dealersMapSection = document.getElementById('dealers-map-section');
const dealersMap = dealersMapSection.querySelector('#dealers-map');
const dealersMapImg = dealersMapSection.querySelector('#dealers-map-img');
const dealersHeadlineBox = document.querySelector('.headline-box');
const spotHeadline = dealersMapSection.querySelector('.spot-headline');
const dealersStageSection = document.getElementById('dealers-stage-section');
const backToMapLink = document.getElementById('back-to-map-link'); // "Back"-Linkconst
const majorDealersWrapper = document.getElementById('major-dealers-wrapper');
const dealersStageSubline = document.getElementById('dealers-stage-subline');
const dynamicDealersStage = document.getElementById('dynamic-dealers-stage');

let currentArea;
let currentCountry;
let currentView = "map";

fetch('json/dealers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        console.log(spotHeadline);
        if (!dealersMap) {
            console.error('Element mit ID "dealers-hero-map" nicht gefunden');
            return;
        }

        const areaFragment = document.createDocumentFragment();

        data.forEach(area => {
            //spotHeadline.innerHTML = area.name;

            // Markierungen für das Gebiet
            const mapAreaSpot = document.createElement('div');
            mapAreaSpot.classList.add('map-spot', 'map-area');
            mapAreaSpot.id = `map-area-${area.abbreviation}`;
            mapAreaSpot.style.width = area['spot-metrics'].width;
            mapAreaSpot.style.aspectRatio = area['spot-metrics'].aspectRatio;
            mapAreaSpot.style.left = area['spot-metrics'].left;
            mapAreaSpot.style.bottom = area['spot-metrics'].bottom;

            // Erstes SVG für das Bild erstellen
            const svgImg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgImg.classList.add("map-spot-img-svg");

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
            
            mapAreaSpot.appendChild(svgLink);

            areaFragment.appendChild(mapAreaSpot);
        });
        
        dealersMap.appendChild(areaFragment);

        // event listener map-spots (use)
        dealersMap.addEventListener('click', (event) => {
            if (event.target.tagName.toLowerCase() === 'use') {
                event.preventDefault(); // Verhindert den Linksprung

                console.log(event.target);

                if(event.target.closest('div').classList.contains('map-area')){

                    currentArea = event.target.closest('div');

                    const areaData = data.find(area => area.abbreviation === currentArea.id.replace('map-area-', ''));

                    styleAreaView(areaData);
                }
            }
        });
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

// event listener back-to-map-link
if (backToMapLink) {
    backToMapLink.addEventListener('click', (event) => {
        event.preventDefault();

        // Zurücksetzen der Karte
        dealersMap.style.transform = `translate(0, 0) scale(1) `;

        if (backToMapLink) {
            backToMapLink.style.opacity = '0';
            backToMapLink.style.pointerEvents = 'none';
        }
        if(currentCountry){
            currentCountry = 0;
        }else{
            currentArea = 0;
        }

    });
}
function styleAreaView(areaData){
    if (backToMapLink) {
        backToMapLink.style.opacity = '1';
        backToMapLink.style.pointerEvents = 'auto';
    }
    if (areaData) {
        // map opacity and map area transform
        requestAnimationFrame(() => {
            dealersMap.style.transform = `scale(${areaData.transform.scale}) translate(${areaData.transform.translateX}, ${areaData.transform.translateY})`;
        });
    }
    currentView = "area";
}