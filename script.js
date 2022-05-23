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

function createRocketDataCard(i) {
    let dataLeft = document.getElementById('rocket-data-left');
    let dataRight = document.getElementById('rocket-data-right');
    emptyDataHtml(dataLeft, dataRight);
    fillRocketDataLeft(i, dataLeft);

    openRocketDataCard();
}

// Empty Rocked Data Html

function emptyDataHtml(dataLeft, dataRight) {
    dataLeft.innerHTML = '';
    dataRight.innerHTML = '';
}

// Fill Rocket Data

function fillRocketDataLeft(i, dataLeft) {
    dataLeft.innerHTML += createrocketDataLeftHtml(i);
    createslideshow(i);
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
                <img src="${picture}" style="width:100%">
            </div>`;
        dotContainer.innerHTML += /*html*/ `
            <span class="dot" onclick="currentSlide(${i + 1})"></span>`;
    }
    imgContainer.innerHTML += /*html*/ `
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>`;
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