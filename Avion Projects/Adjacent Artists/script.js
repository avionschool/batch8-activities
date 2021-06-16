// TASTEDIVE
const TASTEDIVE_KEY = `416207-Adjacent-53G7VTDP`;
var searchQuery = ""; // store search query
var results; // initialize variable to contain JSON objects

// MUSIC DOM
// Create reference object
// key (Music, Movies, TV Shows, Podcasts, Games) returns an object with values for editing the webpage
let referenceObject = {
    "Music": {
        "name": "Music",
        "type": "music",
        "typeComparison": "music",
        "message": "Artist",
        "subMessage": "artists"
    },
    "Movies": {
        "name": "Movies",
        "type": "movies",
        "typeComparison": "movie",
        "message": "Movie",
        "subMessage": "movies"
    },
    "TV Shows": {
        "name": "TV Shows",
        "type": "shows",
        "typeComparison": "show",
        "message": "TV show",
        "subMessage": "TV shows"
    },
    "Podcasts": {
        "name": "Podcasts",
        "type": "podcasts",
        "typeComparison": "podcast",
        "message": "Podcast",
        "subMessage": "podcast"
    },
    "Games": {
        "name": "Games",
        "type": "games",
        "typeComparison": "game",
        "message": "Game",
        "subMessage": "games"
    }
}
let currentSessionSearch = {}; // store recent search calls for each section
let currentSelection = "Music"; // track which section to show user

const burgerMenu = document.querySelector('.burger');
const burgerNav = document.querySelector('.burger-nav');
const burgerNavItems = [...burgerNav.children];
const webNav = document.querySelector('.web-nav');
const webNavItems = [...webNav.children];
const spanMessage = document.querySelector('#message-type');
const spanMainMessage = document.querySelector('#span-main');
const spanSubMessage = document.querySelector('#span-sub'); 
const inputQuery = document.querySelector('#search-query'); 
const inputQueryButton = document.querySelector('#search-query-btn');
const cards = document.querySelector('.cards');
const resultsMessage = document.querySelector('.results-message');
const modalLoading = document.querySelector('.modal-loading');
const scrollTopButton = document.querySelector('.scroll-top');

// Burger Nav Item Functionality
burgerNavItems.forEach(function(item, index) {
    item.addEventListener('click', function() {
        burgerNavItems.forEach(function(item) {item.classList.remove('active')});
        webNavItems.forEach(function(item) {item.classList.remove('active')});
        item.classList.add('active');
        webNavItems[index].classList.add('active');
        switchSections(item.textContent); // build page
    })
});

// Web Nav Item Functionality
webNavItems.forEach(function(item, index) {
    item.addEventListener('click', function() {
        burgerNavItems.forEach(function(item) {item.classList.remove('active')});
        webNavItems.forEach(function(item) {item.classList.remove('active')});
        item.classList.add('active');
        burgerNavItems[index].classList.add('active');
        switchSections(item.textContent);
    })
});

// Query Functionality
inputQuery.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        if (inputQuery.value === "") {
            e.preventDefault();
        } else {
            buildPageFromQuery();
        }
    }
});

inputQueryButton.addEventListener('click', function(e) {
    if (inputQuery.value === "") {
        e.preventDefault();
    } else {
        buildPageFromQuery();
    }
});

// Scroll to Top functionality
window.onscroll = function () {toggleScrollTop()};
scrollTopButton.onclick = function () {scrollToTop()};

// Functions
function switchSections(sectionName) {
    // Edit span messages
    let table = referenceObject[sectionName]; // acquire key value reference table
    let typeComparison = table.typeComparison; // acquire type for comparison
    let storedJSONObject = currentSessionSearch[typeComparison]; // acquire stored JSON object
    let storedType;
    if (storedJSONObject !== undefined) {
        storedType = storedJSONObject.Similar.Info[0].Type;
    }
    spanMessage.textContent = table.name;
    spanMainMessage.textContent = table.message; 
    spanSubMessage.textContent = table.subMessage;

    // Build cards, if saved object matches with section name
    // else reset cards
    if (storedType === typeComparison) {
        createCards(storedJSONObject);
    } else {
        cards.innerHTML = "";
        resultsMessage.classList.add('hide'); // hide results message
    }

    inputQuery.value = ""; // reset query bar
    toggleBurgerMenu(); // close side bar
}

function buildPageFromQuery() {
    searchQuery = inputQuery.value; // change query string
    modalLoading.classList.remove('hide');
    generateSimilarArtistsScript(); // generate script
}

function generateSimilarArtistsScript() {
    // Using JSONP to use the API to avoid CORS header errors
    // Uses a callback function to obtain JSON
    // Limitation: No way to get HTTP error codes
    // Option to address limitation: ajax timeout using jquery
    let s = document.createElement("script");
    s.src = `https://tastedive.com/api/similar?q=${searchQuery}&k=${TASTEDIVE_KEY}&type=${referenceObject[currentSelection].type}&verbose=1&callback=getSimilarArtists`;
    document.body.appendChild(s);

    // Timeout: error handling defaults to 10 second timeout
    // window.setTimeout(function() {
    //     console.log('time');
    // }, 10000);
}

function getSimilarArtists(responseObject) {
    results = responseObject; // store in global
    currentSessionSearch[responseObject.Similar.Info[0].Type] = responseObject; // save object
    createCards(results);
} 

function createCards(obj) {
    cards.innerHTML = ""; // Reset
    let section = "";

    for (let i = 0; i < obj.Similar.Results.length; i++) {
        let QUERIED_NAME = obj.Similar.Results[i].Name;
        let VALID_SEARCH = QUERIED_NAME.replaceAll(" ", "+");
        let DESCRIPTION = obj.Similar.Results[i].wTeaser;
        let WIKI_LINK = obj.Similar.Results[i].wUrl;
        let YOUTUBE_LINK = obj.Similar.Results[i].yUrl;

        // Start Creation
        section += `        
        <div class="results-container">
            <div class="results-name">${QUERIED_NAME}</div>
            <div class="results-video-container">`;

        // If invalid youtube link, add error div, otherwise add iframe
        if (YOUTUBE_LINK == "" || YOUTUBE_LINK == null) {
            section += `
            <div class="results-video error-container">
                <img class="fa-exclamation-triangle-solid" src="assets/fontawesome/exclamation-triangle-solid.svg">
                <div class="results-error-header">Content not available</div>
                <div class="results-error-message">The requested data does not exist.</div>
            </div>`;
        } else {
            section += `
            <iframe class="results-video"
            src="${YOUTUBE_LINK}" loading="lazy">
            </iframe>`;
        }

        section += `
        </div>
        <div class="result-buttons">`;

        // If invalid wiki link, do not append wiki button
        if (WIKI_LINK == "" || WIKI_LINK == null) {
            section += ``;
        } else {
            section += `<a href="${WIKI_LINK}" target="_blank"><button class="result-button fa-wikipedia-w" title="Wikipedia Page"></button></a>`;
        }

        // Add youtube search button and description
        section += `
                <a href="https://www.youtube.com/results?search_query=${VALID_SEARCH}" target="_blank"><button class="result-button fa-youtube" title="Search YouTube"></button></a>
            </div>`;

        // Add description
        if (DESCRIPTION == null || DESCRIPTION == "") {
            section += `
                <div class="results-snippet unavailable">No Description available.</div>
            </div>`;
        } else {
            section += 
                `<div class="results-snippet truncate-overflow">${DESCRIPTION}</div>
            </div>`;
        }
    }

    cards.innerHTML = section;
    modalLoading.classList.add('hide'); // remove loading modal
    resultsMessage.classList.remove('hide'); // display results message
    modifyResultsMessage(obj);
}

function modifyResultsMessage(obj) {
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

function toggleBurgerMenu() {
    burgerMenu.classList.toggle('change');
    burgerNav.classList.toggle('burger-nav-shown');
}