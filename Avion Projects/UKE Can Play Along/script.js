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

async function getChords() {
    let response = await fetch(requestURL_Ukulele, {mode: 'cors'});
    if (response.ok) {
        var responseBody = await response.json;
        console.log(responseBody[0]);
        console.log(responseBody[0][3]); // gets URL of mini?
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



// chordsBtn.addEventListener('click', function() {
//     rootChord = chordsList.value;

//     }
// })