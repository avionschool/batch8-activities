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
            section += `<a href="${WIKI_LINK}" target="_blank"><button class="result-button fa-wikipedia-w"></button></a>`;
        }

        // Add youtube search button and description
        section += `
                <a href="https://www.youtube.com/results?search_query=${VALID_SEARCH}" target="_blank"><button class="result-button fa-youtube"></button></a>
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

let podcastJSON = {
    "Similar": {
        "Info": [
            {
                "Name": "Call Her Daddy",
                "Type": "podcast",
                "wTeaser": "Andrew Santino (born October 16, 1983) is an American stand-up comedian, actor and podcaster known for television series and films such as Sin City Saints, The Disaster Artist, Mixology, and I'm Dying Up Here.On I'm Dying Up Here, he played one of the main roles, Bill Hobbs, a talented, popular comedian who sabotages himself with a bitter attitude and negative outlook on life. Currently he stars in the series Dave, which tells the fictionalized story of rapper Lil Dicky. Santino portrays Dave's roommate and manager. In 2017, he released 'Home Field Advantage' a Showtime special. He also played a recurring character in the NBC drama This Is Us, a producer of the fictional sitcom The Manny. Santino produces and hosts a podcast, Whiskey Ginger, where he interviews friends in the entertainment industry as they reflect on their past while sipping whiskey. Santino attended Arizona State University. In 2020, Santino began co-hosting the Bad Friends podcast with Bobby Lee and Bad Friend Rudy.",
                "wUrl": "https://en.wikipedia.org/wiki/Andrew_Santino",
                "yUrl": "https://www.youtube-nocookie.com/embed/tCZO9QXvBRg",
                "yID": "tCZO9QXvBRg"
            }
        ],
        "Results": [
            {
                "Name": "Chicks In The Office",
                "Type": "podcast",
                "wTeaser": "The 2018 People's Choice Awards, officially the 2018 E! People's Choice Awards, were held on November 11, 2018, to honor the best in pop culture for 2018.This ceremony, the 44th edition of the People's Choice Awards, marked a change of network from CBS to E!, after E!'s acquisition of the awards from Procter & Gamble, and the ceremony's move from January to November.The first round of nominees was announced on September 5, 2018, with the finalists named on September 24. Winners are listed first and in boldface.",
                "wUrl": "https://en.wikipedia.org/wiki/44th_People%27s_Choice_Awards",
                "yUrl": "https://www.youtube-nocookie.com/embed/-yk6Mupqqr0",
                "yID": "-yk6Mupqqr0"
            },
            {
                "Name": "Girls Gotta Eat",
                "Type": "podcast",
                "wTeaser": "Internet culture, or cyberculture, is a culture that describes the many manifestations of the use of computer networks for communication, entertainment, and business, and recreation. Some features of Internet culture include online communities, gaming, social media, and more, as well as topics related to identity and privacy. Due to the internet’s large scale use and adoption, the impacts of internet culture on society and non-digital cultures have been widespread. Additionally, because of the all encompassing nature of the internet and internet culture, different facets of internet culture are often studied individually rather than holistically, such as social media, gaming, specific communities, and more.",
                "wUrl": "https://en.wikipedia.org/wiki/Wikipedia:AfC_sorting/Culture/Internet_culture",
                "yUrl": "https://www.youtube-nocookie.com/embed/IIv1GkcqakQ",
                "yID": "IIv1GkcqakQ"
            },
            {
                "Name": "Too Tired To Be Crazy With Violet Benson",
                "Type": "podcast",
                "wTeaser": "",
                "wUrl": null,
                "yUrl": null,
                "yID": null
            },
            {
                "Name": "Schnitt Talk",
                "Type": "podcast",
                "wTeaser": "\"S.L.U.T.\" (an acronym for \"sweet, little, unforgettable thing\") is a song by American singer Bea Miller. Hollywood Records released it on October 6, 2017 as a single for her third extended play (EP) Chapter Three: Yellow (2017). It also serves as the second single for her second studio album Aurora (2018).\"S.L.U.T.\" was included in the song list of the video game Just Dance 2019 (2018). The song's title was expanded to \"Sweet Little Unforgettable Thing\" in the game, likely to be more kid-friendly.“S.L.U.T.” is used as the outro song for the Barstool Sports podcast Schnitt Talk.\"S.L.U.T.\" is a song about female empowerment. In an interview with Teen Vogue, Miller said that she was inspired to write the song when someone commented on a picture she posted of herself to slut-shame her. \nMiller's co-writer looked up the word 'slut' on the Urban Dictionary and one of the definitions defined it as an acronym for \"Sweet, little, unforgettable thing\". Miller thought that women feel better hearing this and said that \"when women are called a slut for absolutely no reason\", the song will make them feel better about themselves.",
                "wUrl": "https://en.wikipedia.org/wiki/S.L.U.T._(song)",
                "yUrl": "https://www.youtube-nocookie.com/embed/zQUVuGWt0sA",
                "yID": "zQUVuGWt0sA"
            },
            {
                "Name": "U Up?",
                "Type": "podcast",
                "wTeaser": "Emily Axford is an American actress, writer and producer. She is best known for her various roles in CollegeHumor videos, her role as Emily on the truTV comedy, Adam Ruins Everything, based on the CollegeHumor series of the same name, and for her role on the Pop TV original Hot Date, co-starring with her husband, Brian Murphy. Axford and Murphy co-wrote HEY, U UP? (For a Serious Relationship): How to Turn Your Booty Call into Your Emergency Contact, a satirical relationship advice book that was published in 2018.Axford grew up in the suburbs of Albany, New York. She went on to study at George Washington University, where she studied Religion and graduated in 2007. At George Washington University, she was a part of the co-ed improv troupe, ReceSs. After college, Axford studied at Upright Citizens Brigade in New York City and then Los Angeles.",
                "wUrl": "https://en.wikipedia.org/wiki/Emily_Axford",
                "yUrl": "https://www.youtube-nocookie.com/embed/wx6Y3eTjKtc",
                "yID": "wx6Y3eTjKtc"
            },
            {
                "Name": "Fantasy Football Factory",
                "Type": "podcast",
                "wTeaser": "",
                "wUrl": null,
                "yUrl": "https://www.youtube-nocookie.com/embed/ukBG5O3UOYU",
                "yID": "ukBG5O3UOYU"
            },
            {
                "Name": "Comments By Celebs",
                "Type": "podcast",
                "wTeaser": "Comments by Celebs, or CBC, is a brand consisting of several social media accounts and a weekly podcast created by Emma Diamond and Julie Kramer that focuses on pop culture and entertainment news. The brand curates a collection of social media interactions between celebrities, emphasizing lighthearted interactions while trying to humanize celebrities. The account gained popularity through Instagram, although they also have Twitter, and Facebook accounts.Comments by Celebs was co-founded by Diamond and Kramer in April 2017. At the time, Instagram had recently changed its algorithm so that comments from verified accounts were visible first. This led Kramer and Diamond to create an Instagram account featuring a variety of comments and social media interactions between celebrities. Comments by Celebs' popularity grew after Kelly Ripa mentioned the account on the air on her show Live with Kelly and Ryan. In early 2018, they also added a watermark to their posts, which they claim helped to grow the account. The company is based in New York City and Kramer and Diamond work out of the WeWork spaces in the city.",
                "wUrl": "https://en.wikipedia.org/wiki/Comments_by_Celebs",
                "yUrl": "https://www.youtube-nocookie.com/embed/OR2wjOWdQZk",
                "yID": "OR2wjOWdQZk"
            },
            {
                "Name": "Hard Factor",
                "Type": "podcast",
                "wTeaser": "The following is a list of daily news podcasts, organized by type (original podcast or repackaged media) and then by country. It represents a small subset of news podcasts that release an episode every day, sometimes with the exception of weekends or holidays.",
                "wUrl": "https://en.wikipedia.org/wiki/List_of_daily_news_podcasts",
                "yUrl": "https://www.youtube-nocookie.com/embed/44noEyvb5Rg",
                "yID": "44noEyvb5Rg"
            },
            {
                "Name": "Crime Junkie",
                "Type": "podcast",
                "wTeaser": "Crime Junkie is a true crime podcast hosted by Ashley Flowers and Brit Prawat, based in Indianapolis, Indiana. As of September 15, 2020, the show has released 153 episodes.In a Q&A with Inside Radio, Flowers said that she and Prawat, her co-host, have been friends since birth. Flowers and Prawat, born on the same day, became friends through their mothers and grew up together; both became interested in true crime. Flowers said, \"[You] can probably thank my mom for that, because I grew up reading Nancy Drew [and] Agatha Christie.\"After joining the board of directors for Crime Stoppers of Central Indiana, Flowers hosted Murder Monday, a 20-minute show on RadioNOW 100.9 in Indianapolis. The show lasted a year, and was intended as promotion for Crime Stoppers to \"improve the organization’s standing with a younger audience.\" According to Flowers on WTHR, the name Crime Junkie came to her when she started working at Crime Stoppers. She felt that there weren't enough podcasts and decided to create one that she herself would enjoy.",
                "wUrl": "https://en.wikipedia.org/wiki/Crime_Junkie_Podcast",
                "yUrl": "https://www.youtube-nocookie.com/embed/UDlc3p-KI1c",
                "yID": "UDlc3p-KI1c"
            },
            {
                "Name": "The Corp",
                "Type": "podcast",
                "wTeaser": "2006 (MMVI) was a common year starting on Sunday of the Gregorian calendar, the 2006th year of the Common Era (CE) and Anno Domini (AD) designations, the 6th  year of the 3rd millennium, the 6th  year of the 21st century, and the  7th   year of the 2000s decade. 2006 was designated as the International Year of Deserts and Desertification and the International Asperger's Year. ",
                "wUrl": "https://en.wikipedia.org/wiki/Wikipedia:Stub_types_for_deletion/Log/Deleted/February_2006",
                "yUrl": "https://www.youtube-nocookie.com/embed/LMx1IUnOt70",
                "yID": "LMx1IUnOt70"
            }
        ]
    }
}
createCards(podcastJSON);