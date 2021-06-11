// TASTEDIVE
const TASTEDIVE_KEY = `416207-Adjacent-53G7VTDP`;
var artistString = "";
var results; // initialize variable to contain JSON objects

// MUSIC DOM
const inputMusic = document.querySelector('#search-music'); 
const inputMusicButton = document.querySelector('#search-music-btn');
const cards = document.querySelector('.cards');
const resultsMessage = document.querySelector('.results-message');
const modalLoading = document.querySelector('.modal-loading');

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

// Functions
function buildPageMusic() {
    artistString = inputMusic.value; // change query string
    loading();
    resultsMessage.classList.remove('hide');
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
        let DESCRIPTION = obj.Similar.Results[i].wTeaser;
        let WIKI_LINK = obj.Similar.Results[i].wUrl;
        let YOUTUBE_LINK = obj.Similar.Results[i].yUrl;

        section += `        
        <div class="results-container">
            <div class="results-name"><a href="${WIKI_LINK}" target="_blank">${ARTIST_NAME}</a></div>
            <div class="results-video-container">
                <iframe class="results-video" width="420" height="315"
                src="${YOUTUBE_LINK}" loading="lazy">
                </iframe>
            </div>
            <div class="results-snippet truncate-overflow">${DESCRIPTION}</div>
        </div>`
    }

    cards.innerHTML = section;
    modalLoading.classList.add('hide'); // remove loading modal
}