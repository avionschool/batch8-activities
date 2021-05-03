// Load functions on window start
window.onload = function() {
    createGrid(3);
    addMainFunction();
}

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
let xName = "Player 1";
let oName = "Player 2";
let xInput = "X";
let oInput = "O";
let currentMark = xInput;
let currentPlayerMessage = `${xName} (${xInput})`;
let turnNo = 0;
let gameActive = true;
let gridSize = 3;

// Change text based on inputs
titleDesc.textContent = `${xInput}'s and the ${oInput}'s`;
p1Desc.textContent = `${xInput}'s`;
p2Desc.textContent = `${oInput}'s`;

// Create Grid
function createGrid(num) {
    gridContainer.innerHTML = createDivs(num);
    gridContainer.style.cssText = "grid-template-columns: repeat(" + num + ", 1fr); grid-template-rows: repeat(" + num + ", 1fr);"
}

function createDivs(num) {
    var sq = num*num;
    var divHTML = "";
    for (let i = 0; i < sq; i++) {divHTML += `<div class="grid-item hover"></div>`}
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

        // get and save board state
        let gridBoard = createGridArrayInstance();

        // check if draw
        checkDraw();

        // check if win
        checkWin(gridBoard);

        // switch states
        switchStates();

        // if gameStatus is false, disable clicks
        if (gameActive === false) {
            removeMainFunction();
        }
    }
}

// Establish win conditions
let win1 = xInput+xInput+xInput; // 3 X's in a row
let win2 = oInput+oInput+oInput; // 3 O's in a row
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
    if (turnNo === 9) {
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

resetBtn.addEventListener('click', resetBoard);

function resetBoard() {
    currentMark = xInput;
    turnNo = 0;
    gameActive = true;
    addMainFunction();
    contentMessage.textContent = `Player 1 goes first`;
}

// UNUSED
function createMultiArray(arr) {
    // takes 1 array of 9 elements and turns into 1 array of 3 arrays with 3 items each
    let newArr = [];
    while(arr.length) {
        newArr.push(arr.splice(0,gridSize))
    };
    return newArr;
}

// TESTING
// let x = createGridArrayInstance();
// console.log(x);
// console.log(x[0]);