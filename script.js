let rocketsAsJson;
let main = document.getElementsByClassName('main');

async function loadRockets() {
    let url = `https://api.spacexdata.com/v4/rockets`;
    let rockets = await fetch(url);
    rocketsAsJson = await rockets.json();
    loadRocket()
}

function renderRocketPage() {
    for (let i = 0; i < main.length; i++) {
        const mainElement = main[i];
        mainElement.classList.add('d-none')
    }
    closeRocketDataCard();
    document.getElementById('rockets').classList.remove('d-none');
}

function renderMainPage() {
    for (let i = 0; i < main.length; i++) {
        const mainElement = main[i];
        mainElement.classList.add('d-none')
    }
    document.getElementById('main-page').classList.remove('d-none');
}

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

function createRocketDataCard(i, rocketsAsJson) {
    let dataLeft = document.getElementById('rocket-data-left');
    let dataRight = document.getElementById('rocket-data-right');
    emptyDataHtml(dataLeft, dataRight);
    fillRocketDataLeft(i, rocketsAsJson, dataLeft);

    openRocketDataCard();
}

// Empty Rocked Data Html

function emptyDataHtml(dataLeft, dataRight) {
    dataLeft.innerHTML = '';
    dataRight.innerHTML = '';
}

// Fill Rocket Data

function fillRocketDataLeft(i, rocketsAsJson, dataLeft) {
 
}

// Open Rocket Data Card

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

// Closes Rocket Data Card
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
    <button class="hover-background-animation link-1" onclick="createRocketDataCard('${i}', '${rocketsAsJson}'), showSlides(slideIndex)">Data</button>
</div>`
}