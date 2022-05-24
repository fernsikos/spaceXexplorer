let rocketsAsJson;
let main = document.getElementsByClassName('main');
let rocketIds = []; //'Name': 'Id',
let rocketsToSearch = [0];

function init() {
    loadRockets();
}

// Load Rocket API
async function loadRockets() {
    let url = `https://api.spacexdata.com/v4/rockets`;
    let rockets = await fetch(url);
    rocketsAsJson = await rockets.json();
    fillRockedIds();
    loadRocket();
    document.getElementById('main-page').classList.add('fade-in');
}

// Saves Rocked Id´s and Names
function fillRockedIds() {
    for (let i = 0; i < rocketsAsJson.length; i++) {
        const rocket = rocketsAsJson[i];
        let rocketName = rocket['name'];
        let rocketId = rocket['id'];
        rocketIds[rocketName] = rocketId;
    }
}

// Load Each Rocket
function loadRocket() {
    document.getElementById('rockets-container').innerHTML = '';
    for (let i = 0; i < rocketsAsJson.length; i++) {
        const rocket = rocketsAsJson[i];
        createRocketCard(rocket, i);
    }
}

function createRocketCard(rocket, i) {
    let rocketName = rocket['name'];
    let rocketImages = rocket['flickr_images'];
    let rocketDescription = rocket['description'];
    let container = document.getElementById('rockets-container');
    container.innerHTML += createRocketChardHTML(rocketName, rocketImages, rocketDescription, i);
}

// Create Rocket Data Card
function createRocketDataCard(i) {
    let dataLeft = document.getElementById('rocket-data-left');
    let dataRight = document.getElementById('rocket-data-right');
    emptyDataHtml(dataLeft, dataRight);
    fillRocketDataLeft(i, dataLeft);
    fillRocketDataRight(i, dataRight);

    openRocketDataCard();
}

// Empty Rocket Data Html
function emptyDataHtml(dataLeft, dataRight) {
    dataLeft.innerHTML = '';
    dataRight.innerHTML = '';
}

// Fill Rocket Data Html
function fillRocketDataLeft(i, dataLeft) {
    dataLeft.innerHTML += createrocketDataLeftHtml(i);
    createslideshow(i);
}

function fillRocketDataRight(i, dataRight) {
    let rocket = rocketsAsJson[i];
    let firstFlight = rocket['first_flight'];
    let height = rocket['height']['meters'];
    let diameter = rocket['diameter']['meters'];
    let mass = rocket['mass']['kg'];
    let engines = rocket['engines']['numer'];
    let costPerLaunch = rocket['cost_per_launch'];
    let successRate = rocket['success_rate_pct'];
    let active = rocket['active'];
    let payloadWeights = rocket['payload_weights'];
    dataRight.innerHTML += createRocketDataRightHtml(firstFlight, height, diameter, mass, engines, costPerLaunch, successRate, active, payloadWeights);
    fillPayloadWeights(payloadWeights);
}

function fillPayloadWeights(payloadWeights) {
    for (let i = 0; i < payloadWeights.length; i++) {
        const payloadWeight = payloadWeights[i];
        let payloadId = payloadWeight['id'];
        let weight = payloadWeight['kg'];
        let container = document.getElementById('payloadWeigths');
        container.innerHTML += createPayloadHtml(payloadId, weight);
    }
}

// Create Slideshow
function createslideshow(i) {
    let imgContainer = document.getElementById('slideshow-container');
    let dotContainer = document.getElementById('dot-container');
    let pictures = rocketsAsJson[i]['flickr_images'];
    for (let i = 0; i < pictures.length; i++) {
        const picture = pictures[i];
        imgContainer.innerHTML += /*html*/ `
            <div class="mySlides fade">
                <img src="${picture}" onerror='this.onerror = null; this.src="img/Fallback.jpeg"' ">
            </div>`;
        dotContainer.innerHTML += /*html*/ `
            <span class="dot" onclick="currentSlide(${i + 1})"></span>`;
    }
    imgContainer.innerHTML += /*html*/ `
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>`;
}

// Launch Page

function selctRocketsToSearch(id) {
    fillRocketsToSearchArray(id);
    selctIconBackgroundAnimation();
}

// Checks Items in Array
function fillRocketsToSearchArray(id) {
    if (id === 0) {
        rocketsToSearch = [0];
    } else if (rocketsToSearch.includes(id) === false) {
        rocketsToSearch.push(id);
        if (rocketsToSearch.includes(0)) {
            rocketsToSearch.splice(0, 1)
        }
    } else {
        rocketsToSearch.splice(rocketsToSearch.indexOf(id), 1)
        if (rocketsToSearch.length < 1) {
            rocketsToSearch = [0];
        }
    }
}

// Animations
// Show Rocket Page Animation
function showRocketPage() {
    for (let i = 0; i < main.length; i++) {
        const mainElement = main[i];
        mainElement.classList.remove('fade-in')
        setTimeout(() => {
            mainElement.classList.add('d-none')
        }, 500);
    };
    closeRocketDataCard();
    setTimeout(() => {
        document.getElementById('rockets').classList.remove('d-none');
    }, 500);
    setTimeout(() => {
        document.getElementById('rockets').classList.add('fade-in');
    }, 550);

}

// Show Main Page Animation
function showMainPage() {
    for (let i = 0; i < main.length; i++) {
        const mainElement = main[i];
        mainElement.classList.remove('fade-in');
        setTimeout(() => {
            mainElement.classList.add('d-none')
        }, 500);
    };
    setTimeout(() => {
        document.getElementById('main-page').classList.remove('d-none');
    }, 500);
    setTimeout(() => {
        document.getElementById('main-page').classList.add('fade-in');
    }, 550);
}

// Open Rocket Data Card Animation
function openRocketDataCard(i) {
    document.getElementById('rockets-container').classList.add('fade-out');
    setTimeout(() => {
        document.getElementById('rockets-container').classList.add('d-none');
        document.getElementById('rocket-data').classList.remove('d-none');
    }, 500);
    setTimeout(() => {
        document.getElementById('rocket-data').classList.add('fade-in');
    }, 800);
}

// Closes Rocket Data Card Animation
function closeRocketDataCard() {
    document.getElementById('rocket-data').classList.remove('fade-in');
    setTimeout(() => {
        document.getElementById('rocket-data').classList.add('d-none');
        document.getElementById('rockets-container').classList.remove('d-none');
    }, 500);
    setTimeout(() => {
        document.getElementById('rockets-container').classList.remove('fade-out');
    }, 800);
}

// Background Selectanimation Lauch Page
function selctIconBackgroundAnimation() {
    let toggleAllOff = document.getElementsByClassName('select-rocket-card');
    for (let i = 0; i < toggleAllOff.length; i++) {
        const element = toggleAllOff[i];
        element.classList.remove('select-rocket-card-active');
    }
    for (let i = 0; i < rocketsToSearch.length; i++) {
        const idIndex = rocketsToSearch[i];
        document.getElementById('rocket-' + idIndex).classList.add('select-rocket-card-active');
    }
    
}

// SLideshow Start
let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
// Slideshow End

// HTML Templates

function createRocketChardHTML(rocketName, rocketImages, rocketDescription, i) {
    return /*html*/ `
    <div class="rocket-card">
        <div class="rocket-card-top">
            <h2>${rocketName}</h2>
            <img src="${rocketImages[0]}" onerror='this.onerror = null; this.src="img/Fallback.jpeg"' alt="">
            <span>${rocketDescription}</span>
        </div>
    <button class="hover-background-animation link-1" onclick="createRocketDataCard('${i}'), showSlides(slideIndex)">Data</button>
</div>`
}

function createrocketDataLeftHtml(i) {
    return /*html*/ `
    <h2>${rocketsAsJson[i]['name']}</h2>
    <div class="slideshow-container" id="slideshow-container"></div>
    <div id="dot-container" style="text-align:center"></div>
    `;
}

function createRocketDataRightHtml(firstFlight, height, diameter, mass, engines, costPerLaunch, successRate, active, payloadWeights) {
    return /*html*/ `
    <h3>Data</h3>
    <table>
        <tr class="rockets-row">
            <td class="rockets-data-name">First flight:</td>
            <td class="rockets-data-value">${firstFlight}</td>
        </tr>
        <tr class="rockets-row">
            <td class="rockets-data-name">Height:</td>
            <td class="rockets-data-value">${height}m</td>
        </tr>
        <tr class="rockets-row">
            <td class="rockets-data-name">Diameter:</td>
            <td class="rockets-data-value">${diameter}m</td>
        </tr>
        <tr class="rockets-row">
            <td class="rockets-data-name">Mass:</td>
            <td class="rockets-data-value">${mass}kg</td>
        </tr>
        <tr class="rockets-row">
            <td class="rockets-data-name">Engines:</td>
            <td class="rockets-data-value">${engines}</td>
        </tr>
        <tr class="rockets-row">
            <td class="rockets-data-name">Cost Per Launch:</td>
            <td class="rockets-data-value">${costPerLaunch}$</td>
        </tr>
        <tr class="rockets-row">
            <td class="rockets-data-name">Success Rate:</td>
            <td class="rockets-data-value">${successRate}%</td>
        </tr>
        <tr class="rockets-row">
            <td class="rockets-data-name">In Use:</td>
            <td class="rockets-data-value">${active}</td>
        </tr>
    </table>
    <h4>Payload Weights</h4>
    <table id="payloadWeigths">
    </table>
    <button class="hover-background-animation link-2" onclick="closeRocketDataCard()">Back</button>`;
}

function createPayloadHtml(payloadId, weight) {
    return /*html*/ `
    <tr class="rockets-row">
        <td class="rockets-data-name">${payloadId}:</td>
        <td class="rockets-data-value">${weight}kg</td>
    </tr>`
}