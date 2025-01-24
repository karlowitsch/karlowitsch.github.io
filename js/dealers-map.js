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

            dealersMap.appendChild(mapAreaSpot);

            area.items.forEach(country => {
    
                // countries für das Gebiet
                const mapCountrySpot = document.createElement('div');
                mapCountrySpot.classList.add('map-spot', 'map-country');
                mapCountrySpot.id = `map-country-${country.abbreviation}`;
                mapCountrySpot.style.width = country['spot-metrics'].width;
                mapCountrySpot.style.aspectRatio = country['spot-metrics'].aspectRatio;
                mapCountrySpot.style.left = country['spot-metrics'].left;
                mapCountrySpot.style.bottom = country['spot-metrics'].bottom;
            
    
                // SVG für das Bild erstellen
                const svgImg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svgImg.classList.add("map-spot-img-svg");
    
                const useImg = document.createElementNS("http://www.w3.org/2000/svg", "use");
                useImg.setAttribute(`href`, `img/svg/map/map-country-img-${country.abbreviation}.svg#img-symbol-${country.abbreviation}`);
                svgImg.appendChild(useImg);
                
                mapCountrySpot.appendChild(svgImg);
    
                mapAreaSpot.appendChild(mapCountrySpot);
            });
        });

        // event listener map-spots (use)
        dealersMap.addEventListener('click', (event) => {
            if (event.target.tagName.toLowerCase() === 'use') {
                event.preventDefault(); // Verhindert den Linksprung

                console.log(event.target);

                if(event.target.closest('div').classList.contains('map-area')){

                    currentArea = event.target.closest('div');

                    const areaData = data.find(area => area.abbreviation === currentArea.id.replace('map-area-', ''));

                    styleAreaView(areaData);
                    loadCountryItems(areaData);
                }
            }
        });

        // event listener back-to-map-link
        if (backToMapLink) {
            backToMapLink.addEventListener('click', (event) => {
                event.preventDefault();

                if (majorDealersWrapper) {
                    dynamicDealersStage.style.opacity = '0';
                    dynamicDealersStage.style.pointerEvents = 'auto';
                    dealersStageSection.style.height = '38.2vh';
                    
                    setTimeout(() => {
                        dealersHeadlineBox.style.opacity = '1';
                        dealersHeadlineBox.style.pointerEvents = 'auto';

                        majorDealersWrapper.style.opacity = '1'; // dealers-stage au-wrapperf sichtbar setzen
                        majorDealersWrapper.style.pointerEvents = 'auto';

                        dynamicDealersStage.innerHTML = '';
                    }, 300);
                }

                spotHeadline.style.opacity = '0';

                // Alle spot-Links wieder interagierbar machen und sichtbar setzen
                /*document.querySelectorAll('.map-spot').forEach(spot => {
                    spot.style.opacity = '0.5';
                    spot.querySelector('.map-spot-link').style.pointerEvents = 'auto';
                });*/

                // Zurücksetzen der Karte
                dealersMapImg.style.opacity = '0.2';
                
                document.querySelectorAll('.map-area').forEach(spot => {
                    spot.style.opacity = '0.7';
                });

                currentArea.style.transform = ''; // Zurücksetzen der Transformationswerte
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
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });

function styleAreaView(areaData){

    // hide dealers-headline and major-dealers-wrapper
    dealersHeadlineBox.style.opacity = '0';
    dealersHeadlineBox.style.pointerEvents = 'none';

    if (majorDealersWrapper) {
        majorDealersWrapper.style.opacity = '0';
        majorDealersWrapper.style.pointerEvents = 'none';
    }
    // show dynamic-dealers-stage, spot-headline and back-to-map-link
    setTimeout(() => {
        dynamicDealersStage.style.opacity = '1';
        dynamicDealersStage.style.pointerEvents = 'auto';
        
        spotHeadline.style.opacity = '1';
        spotHeadline.textContent = areaData.name;

        if (backToMapLink) {
            backToMapLink.style.opacity = '1';
            backToMapLink.style.pointerEvents = 'auto';
        }
    }, 300);

    if (areaData) {

        // area-links nicht mehr interagierbar machen
        document.querySelectorAll('.map-spot').forEach(spot => {

            /*spot.querySelector('.map-spot-link').style.pointerEvents = 'none';
            spot.querySelector('use').style.pointerEvents = 'none';
            spot.querySelector('use').style.cursor = 'auto';*/

            if (spot !== currentArea && !currentArea.contains(spot)) {
                spot.style.opacity = '0.03';
            }
        });
        // map opacity and map area transform
        requestAnimationFrame(() => {
            dealersMapImg.style.opacity = '0.06';
            currentArea.closest('div').style.opacity = '0.8';
            currentArea.closest('div').style.zIndex= '999';
            currentArea.closest('div').style.transform = `scale(${areaData.transform.scale}) translate(${areaData.transform.translateX}, ${areaData.transform.translateY})`;
        });
    }

}
    
function loadCountryItems(areaData) {

    if (!areaData) {
        console.error(`No data found for spot`);
        return;
    }

    // kill dynamic-dealers-stage content
    dynamicDealersStage.innerHTML = '';

    // create containers
    areaData.items.forEach(country => {
        const img = document.createElement('img');
        img.src = country.img;

        const countryContainer = document.createElement('a');
        countryContainer.setAttribute("href", "#");
        countryContainer.classList.add('dynamic-country-item');
        countryContainer.appendChild(img);
        
        dynamicDealersStage.appendChild(countryContainer);
    });
    // dynamic-dealers-stage height change
    console.log(window.innerHeight * 0.382);
    console.log(dealersStageSection.scrollHeight);
    dealersStageSection.style.height = dealersStageSection.scrollHeight + 'px';
}