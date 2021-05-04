// DOM Selectors
const titleDesc = document.querySelector('.title-desc');

const gridContainer = document.querySelector('.grid-container');

const p1Title = document.querySelectorAll('.content-title.p1')[0];
const p1Desc = document.querySelectorAll('.content-desc.p1')[0];
const p2Title = document.querySelectorAll('.content-title.p2')[0];
const p2Desc = document.querySelectorAll('.content-desc.p2')[0];

const contentMessage = document.querySelector('.content-message');

    // buttons
    const previousBtn = document.querySelector('.previous');
    const nextBtn = document.querySelector('.next');
    const resetBtn = document.querySelector('.reset');

// Global variables
let gridSize;
let xName = "Player 1";
let oName;
let xInput;
let oInput;
let currentMark;
let currentPlayerMessage;
let turnNo = 0; // used as index for board states saved in 2D array
let turnFinished; // max array index for prev/next buttons
let gameActive = true;
let gridHistory = [
    [
    ["","",""],
    ["","",""],
    ["","",""]
    ]
];

// MODAL FORM CONTENT //
// DOM Selectors //
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');
const content = document.querySelector('.content');
const formGridSize = document.querySelector('#form-grid-size');
const formOpponentSelection = document.querySelector('#form-opponent-selection');
const playersMarks = document.querySelector('#form-players-marks');
const opponentsMarks = document.querySelector('#form-opponents-marks');
const formSubmitBtn = document.querySelector('.form-submit');

// Validate if 1 character or an Emoji
function validateCharOrEmoji(node) {
    let char = node.value;
    if (char.length === 1) {
        return true;
    } else if (/\p{Extended_Pictographic}/u.test(char)) {
        return true; // tests if emoji and return true is so
    } else {
        return false;
    }
}

// Button on submit
formSubmitBtn.addEventListener('click', function(e) {
    if (playersMarks.value === opponentsMarks.value) {
        alert('Player 1 and Opponent Marks must be different');
        e.preventDefault();
    }
    else if (!(validateCharOrEmoji(playersMarks) && validateCharOrEmoji(opponentsMarks))) {
        alert('Please only choose 1 character');
        e.preventDefault();
    } else {
        // Assign variables
        gridSize = formGridSize.value; 
        oName = formOpponentSelection.value;
        xInput = playersMarks.value;
        oInput = opponentsMarks.value;
        currentMark = xInput;
        currentPlayerMessage = `${xName} (${xInput})`;
        initializeContent();
    }
});


let emojis = ["😅", "🥳", "😎", "🥰", "🤡", "👻", "👽", "🤟", "🦶", "👨‍🏫", "👧", "👩‍🎤", "🎅", "🧞‍♂️", "🧟‍♂️", "🕺", "🎩", "👑", "🦹🏼‍♀️", "👵🏻", "🦉", "🦜", "💣", "📖", "🎲", "🍔", "🦡", "🌸"];

// MAIN CONTENT //
// Initialize content after modal submission
function initializeContent() {

    // Change text based on inputs
    titleDesc.textContent = `${xInput}'s and the ${oInput}'s`;
    p1Desc.textContent = `${xInput}'s`;
    p2Desc.textContent = `${oInput}'s`;

    // Hide/Unhide
    modal.classList.add('hide');
    modalContainer.classList.add('hide');
    content.classList.remove('hide');

    // Creation
    createGrid(gridSize);
    addMainFunction();
}

// Create Grid
function createGrid(num) {
    gridContainer.innerHTML = createDivs(num);
    gridContainer.style.cssText = `grid-template-columns: repeat(${num}, 1fr); grid-template-rows: repeat(${num}, 1fr);`
}

function createDivs(num) {
    var divHTML = "";
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            divHTML += `<div class="grid-item hover" data-row="${i}" data-col="${j}"></div>`;
        }
    }
    return divHTML;
};

// Add click event on grid items
function addMainFunction() {
    const gridItems = [...gridContainer.querySelectorAll('div')]; // Array/Nodelist of the grid items
    gridItems.forEach(function(item) {
        item.textContent = "";
        item.classList.add('hover');
        item.addEventListener('click', stampMark);
    });
}

// Remove click event and hover class on grid items
function removeMainFunction() {
    const gridItems = [...gridContainer.querySelectorAll('div')]; // Array/Nodelist of the grid items
    gridItems.forEach(function(item) {
        // remove clickEvent
        item.removeEventListener('click', stampMark);
        // remove hover class
        if (item.textContent === "") {
            item.classList.remove('hover');
        }
    });
}

// main tictactoe function
function stampMark() {
    // function will run only if textContent contains nothing 
    if (this.textContent === "") {
        // modify board
        this.textContent = currentMark;
        this.classList.toggle('hover');
        turnNo++;

        // create and save board state in 2D array
        let gridBoard = createGridArrayInstance();
        let grid2D = create2DArray(gridBoard);
        gridHistory.push(grid2D);

        // check if draw
        checkDraw();

        // check if win
        checkWin(gridBoard);

        // switch states
        switchStates();

        // if game has ended, disable click events, set max prev/next index, show prev/next buttons, 
        // and disable next button
        if (gameActive === false) {
            removeMainFunction();
            turnFinished = turnNo; // set max array index for prev/next buttons
            previousBtn.classList.remove('hide');
            nextBtn.classList.remove('hide');
            nextBtn.disabled = true;
        }
    }
}

// Establish win conditions
let winningIndexes = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function checkWin(gridBoard) {
    // checks if win and shows message
    // Establish variables
    // xInput = "🎩";
    // let xCodePoint = xInput.codePointAt(); // Value of 3 X's in a row
    // let xCharCode = xInput.charCodeAt();
    // console.log(xCodePoint, xCharCode);
    // let oCodePoint = oInput.codePointAt(); // Value of 3 X's in a row
    // let oCharCode = oInput.charCodeAt();
    // console.log(oCodePoint,oCharCode);
    let win1 = xInput+xInput+xInput; // 3 X's in a row
    let win2 = oInput+oInput+oInput; // 3 O's in a row
    for (let i of winningIndexes) {
        // create 3char string to compare with winning condition 
        let extractedGridItems = "";
        for (let j = 0; j < gridSize; j++) {
            let index = i[j];
            extractedGridItems += gridBoard[index];
        }
        // check for winning condition
        if (extractedGridItems === win1 || extractedGridItems === win2) {
            gameActive = false;
            contentMessage.textContent = `${currentPlayerMessage} Wins!`
            return true;
        } 
    }
}

function checkDraw() {
    if (turnNo === gridSize**2) {
        contentMessage.textContent = `Game ended in a draw!`;
        gameActive = false;
        return true;
    }
}

function switchStates() {
    // changes currentMark global variable
    if (gameActive === true) {
        currentMark = (currentMark === xInput) ? oInput : xInput;
        currentPlayerMessage = (currentMark === xInput) ? `${xName} (${xInput})` : `${oName} (${oInput})`;
        contentMessage.textContent = `It's ${currentPlayerMessage}'s turn`
    }
}

function createGridArrayInstance() {
    // takes current board and returns 1 array of 9 textContent of grid item
    // e.g. ["", "", "", "", "", "O", "X", "", ""]
    const gridItems = [...gridContainer.querySelectorAll('div')]; // Array/Nodelist of the grid items
    return gridItems.map(function(item) {
        return item.textContent;
    })
}

function create2DArray(arr) {
    // takes 1D array and turns into 2D array
    let arrCopy = [...arr]; // shallow copy
    let newArr = [];
    while(arrCopy.length) {
        newArr.push(arrCopy.splice(0,gridSize))
    };
    return newArr;
}

// Buttons: DOM and functions
previousBtn.addEventListener('click', previousBoardState);
nextBtn.addEventListener('click', nextBoardState);
resetBtn.addEventListener('click', resetBoard);

function previousBoardState() {
    nextBtn.disabled = false;
    turnNo--;
    createBoardStateFrom2DArray();
    if (turnNo === 0) {
        previousBtn.disabled = true;
    }
}

function nextBoardState() {
    previousBtn.disabled = false;
    turnNo++
    createBoardStateFrom2DArray();
    if (turnNo === turnFinished) {
        nextBtn.disabled = true;
    }
}

function createBoardStateFrom2DArray() {
    const gridItems = [...gridContainer.querySelectorAll('div')]; // Array/Nodelist of the grid items
    let arr2D = gridHistory[turnNo];

    gridItems.forEach(function(item) {
        let row = item.getAttribute('data-row');
        let col = item.getAttribute('data-col');
        item.textContent = arr2D[row][col];
    });
}

function resetBoard() {
    currentMark = xInput;
    turnNo = 0;
    gameActive = true;
    gridHistory = [
        [
        ["","",""],
        ["","",""],
        ["","",""]
        ]
    ];
    addMainFunction();
    contentMessage.textContent = `Player 1 goes first`;
    previousBtn.classList.add('hide');
    nextBtn.classList.add('hide');
}