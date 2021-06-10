// BORED API
let BORED_REQUEST_URL = 'https://www.boredapi.com/api/activity/';

// TASTEDIVE
const TASTEDIVE_KEY = `416207-Adjacent-53G7VTDP`;
let tastediveQueryString = `https://tastedive.com/api/similar?q=paramore&k=${TASTEDIVE_KEY}&limit=5&type=music`

// GIPHY API
const GIPHY_KEY = 'nM6rnu9l0SLCubKWxTqyDCTHDD1ir0Yk';
let queryString = "";

// DOM
const img = document.querySelector('#img');
const activity = document.querySelector('#activity');
const generateButton = document.querySelector('#generate-button');

generateButton.addEventListener('click', generateActivity);

// FUNCTIONS
async function retrieveGIPHY() {
    await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_KEY}&s=${queryString}&weirdness=0`, {mode: 'cors'})
    .then(function(response) {
    return response.json();
    })
    .then(function(response) {
    console.log(response);
    img.src = response.data.images.original.url;
    });
}

async function generateActivity() {
    let response = await fetch(BORED_REQUEST_URL);
    if (response.ok) {
        var responseBody = await response.json();
        activity.textContent = responseBody.activity;
        queryString = responseBody.activity;
        queryString = queryString.replaceAll(" ", "+"); // replace spaces with valid search characters
        retrieveGIPHY();
    } else {
        alert("HTTP-Error: " + response.status);
    }
}