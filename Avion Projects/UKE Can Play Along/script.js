const YOUTUBE_API = "AIzaSyB_jAbHPK6lUMiJOA335o1znxplW92hw_0";
const UKULELE_CHORDS_API = "91b1ee033b3b64774a413beb10e3d571";

let typeChord = "major";
let rootChord = "C";
let requestURL_test = 'https://www.boredapi.com/api/activity/';
let requestURL_Ukulele = `https://ukulele-chords.com/get?ak=${UKULELE_CHORDS_API}&r=${rootChord}&typ=${typeChord}`;

// let request = new XMLHttpRequest();
// request.open('GET', requestURL_Ukulele);
// request.responseType = "document"; // response is an XML document
// request.send();
// request.onload = function() {
//     const chordInfo = request.response;
//     console.log(chordInfo[3]); // gets the mini chord diagram?
// }

// MAIN UKULELE
async function getUkuleleChords() {
    let response = await fetch(requestURL_Ukulele, {mode: 'cors'});
    if (response.ok) {
        var responseBody = await response.json();
        console.log(responseBody[0]);
        console.log(responseBody[0][3]); // gets URL of mini?
    } else {
        alert("HTTP-Error: " + response.status);
    }
} // DOESN'T WORK; CORS POLICY

// ANOTHER TEST
fetch(requestURL_Ukulele)
  .then(response => response.json())
  .then(data => console.log(data));


// TEST URL : WORKS
async function testing() {
    let response = await fetch(requestURL_test);
    if (response.ok) {
        var responseBody = await response.json();
        console.log(responseBody);
        console.log(responseBody.activity);
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

// const response = fetch(requestURL_Ukulele, {
//     method: 'GET',
//     mode: 'no-cors'
// });

// CHORDS SECTION
const chordsSection = document.querySelector('#chords-section');
const chordsList = document.querySelector('#chords-list');
const chordsBtn = document.querySelector('#chords-btn');