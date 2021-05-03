// Load functions on window start
window.onload = function() {
    addMainFunction();
}

// DOM Selectors
const titleDesc = document.querySelector('.title-desc');

const gridContainer = document.querySelector('.grid-container');
const gridItems = [...gridContainer.querySelectorAll('div')]; // Array/Nodelist of the grid items

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
let xInput = "X";
let oInput = "O";
let currentPlayer = xInput;
let turnNo = 0;
let gameActive = true;

// Change text based on inputs
titleDesc.textContent = `${xInput}'s and the ${oInput}'s`;
p1Desc.textContent = `${xInput}'s`;
p2Desc.textContent = `${oInput}'s`;

// Add click event on grid items
function addMainFunction() {
    gridItems.forEach(function(item) {
        item.textContent = "";
        item.classList.add('hover');
        item.addEventListener('click', stampMark);
    });
}

// Remove click event and hover class on grid items
function removeMainFunction() {
    gridItems.forEach(function(item) {
        // remove clickEvent
        item.removeEventListener('click', stampMark);
        // remove hover class
        if (item.textContent === "") {
            item.classList.toggle('hover');
        }
    });
}

// main tictactoe function
function stampMark() {
    // function will run only if textContent contains nothing 
    if (this.textContent === "") {
        // modify board
        this.textContent = currentPlayer;
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

function checkWin(gridBoard) {
    // checks if win and shows message
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
    

    for (let i of winningIndexes) {
        // create 3char string to compare with winning condition 
        let extractedGridItems = "";
        for (let j = 0; j < 3; j++) {
            let index = i[j];
            extractedGridItems += gridBoard[index];
        }
        // check for winning condition
        if (extractedGridItems === win1 || extractedGridItems === win2) {
            gameActive = false;
            contentMessage.textContent = `${currentPlayer} Wins!`
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
    // changes currentPlayer global variable
    if (gameActive === true) {
        currentPlayer = (currentPlayer === xInput) ? oInput : xInput;
        contentMessage.textContent = `It's ${currentPlayer}'s turn`
    }
}

function createGridArrayInstance() {
    // takes current board and returns 1 array of 9 textContent of grid item
    // e.g. ["", "", "", "", "", "O", "X", "", ""]
    return gridItems.map(function(item) {
        return item.textContent;
    })
}

resetBtn.addEventListener('click', resetBoard);

function resetBoard() {
    currentPlayer = xInput;
    turnNo = 0;
    gameActive = true;
    addMainFunction();
    contentMessage.textContent = `It's ${currentPlayer}'s turn`
}

// UNUSED
function createMultiArray(arr) {
    // takes 1 array of 9 elements and turns into 1 array of 3 arrays with 3 items each
    let newArr = [];
    while(arr.length) {
        newArr.push(arr.splice(0,3))
    };
    return newArr;
}

// TESTING
// let x = createGridArrayInstance();
// console.log(x);
// console.log(x[0]);