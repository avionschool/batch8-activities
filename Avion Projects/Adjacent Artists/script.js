// TASTEDIVE
const TASTEDIVE_KEY = `416207-Adjacent-53G7VTDP`;
var artistString = "";
var results; // initialize variable to contain JSON objects

// MUSIC DOM
const burgerMenu = document.querySelector('.burger');
const burgerNav = document.querySelector('.burger-nav');
const inputMusic = document.querySelector('#search-music'); 
const inputMusicButton = document.querySelector('#search-music-btn');
const cards = document.querySelector('.cards');
const resultsMessage = document.querySelector('.results-message');
const modalLoading = document.querySelector('.modal-loading');
const scrollTopButton = document.querySelector('.scroll-top');

// Query Functionality
inputMusic.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        if (inputMusic.value === "") {
            e.preventDefault();
        } else {
            buildPageMusic();
        }
    }
});

inputMusicButton.addEventListener('click', function(e) {
    if (inputMusic.value === "") {
        e.preventDefault();
    } else {
        buildPageMusic();
    }
});

// Scroll to Top functionality
window.onscroll = function () {toggleScrollTop()};
scrollTopButton.onclick = function () {scrollToTop()};

// Functions
function buildPageMusic() {
    artistString = inputMusic.value; // change query string
    loading();
    generateSimilarArtistsScript(); // generate script
}

function loading() {
    modalLoading.classList.remove('hide');
}

async function generateSimilarArtistsScript() {
    let s = document.createElement("script");
    s.src = `https://tastedive.com/api/similar?q=${artistString}&k=${TASTEDIVE_KEY}&limit=10&type=music&verbose=1&callback=getSimilarArtists`;
    document.body.appendChild(s);
}

function getSimilarArtists(responseObject) {
    results = responseObject; // store in global
    createCards(results);
} 

function createCards(obj) {
    cards.innerHTML = ""; // Reset
    let section = "";

    for (let i = 0; i < obj.Similar.Results.length; i++) {
        let ARTIST_NAME = obj.Similar.Results[i].Name;
        let SEARCH_QUERY = ARTIST_NAME.replaceAll(" ", "+");
        let DESCRIPTION = obj.Similar.Results[i].wTeaser;
        let WIKI_LINK = obj.Similar.Results[i].wUrl;
        let YOUTUBE_LINK = obj.Similar.Results[i].yUrl;

        section += `        
        <div class="results-container">
            <div class="results-name">${ARTIST_NAME}</div>
            <div class="results-video-container">
                <iframe class="results-video" width="420" height="315"
                src="${YOUTUBE_LINK}" loading="lazy">
                </iframe>
            </div>
            <div class="result-buttons">
                <a href="${WIKI_LINK}" target="_blank"><button class="result-button fa-wikipedia-w">Wikipedia</button></a>
                <a href="https://www.youtube.com/results?search_query=${SEARCH_QUERY}" target="_blank"><button class="result-button fa-youtube">YouTube</button></a>
            </div>
            <div class="results-snippet truncate-overflow">${DESCRIPTION}</div>
        </div>`
    }

    cards.innerHTML = section;
    modalLoading.classList.add('hide'); // remove loading modal
    resultsMessage.classList.remove('hide'); // display results message
    if (obj.Similar.Results.length == 0) {
        resultsMessage.textContent = `No results found for "${obj.Similar.Info[0].Name}":`;
    } else {
        resultsMessage.textContent = `Showing results for "${obj.Similar.Info[0].Name}":`;
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function toggleScrollTop() {
    // when user scrolls down 20px from document, show button
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        scrollTopButton.classList.add('showBtn');
    } else {
        scrollTopButton.classList.remove('showBtn');
    }
}

// function addWikiLink() {
//     let ele = [...document.querySelectorAll('.results-snippet')];
//     ele.forEach(function(item) {
//         item.addEventListener('click', function() {
//             item.previousElementSibling.children[0].click();
//         })
//     })
// }

function toggleBurgerMenu() {
    burgerMenu.classList.toggle('change');
    burgerNav.classList.toggle('burger-nav-shown');
}