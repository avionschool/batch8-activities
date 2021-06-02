// MODAL FORM CONTENT //
// DOM Selectors //
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');
const content = document.querySelector('.content');
const formGridSize = document.querySelector('#form-grid-size');
const formFirstMove = document.querySelector('#form-first-move');
const formOpponentSelection = document.querySelector('#form-opponent-selection');
const playersMarks = document.querySelector('#form-players-marks');
const opponentsMarks = document.querySelector('#form-opponents-marks');
const formSubmitBtn = document.querySelector('.form-submit');

// Emoji Buttons
const emojiBtns = [...document.querySelectorAll('.emoji-btn')];
let emojis = ["😅", "🥳", "😎", "🥰", "🤡", "👻", "👽", "🤟", "🦶", "👨‍🏫", 
              "👧", "👩‍🎤", "🎅", "🧞‍♂️", "🧟‍♂️", "🕺", "🎩", "👑", "🦹🏼‍♀️", "👵🏻", 
              "🦉", "🦜", "💣", "📖", "🎲", "🍔", "🦡", "🌸", "🥶", "🤖"];

// Add randomize emoji to button
emojiBtns.forEach(function(item) {
    item.addEventListener('click', randomEmoji)
});

function randomEmoji() {
    let i = Math.floor(Math.random()*emojis.length);
    let sib = this.previousElementSibling;
    sib.value = emojis[i];
}

// Before Modal Submission: Validate if inputs are 1 character or an Emoji
function validateCharOrEmoji(node) {
    let char = node.value;
    if (char.length === 1) {
        return true;
    } else if (/\p{Extended_Pictographic}/u.test(char)) {
        return true; // tests if emoji and return true if so
    } else {
        return false;
    }
}

// Re-allowed Impossible AI. Made faster by alpha-beta pruning and limited node depth search
// ComputerDifficulty: Impossible only available on 3x3 grid
// Disables opponent selection if gridSize larger than 3 (selectedIndex 0) is selected
// formGridSize.addEventListener('change', function() {
//     if (this.selectedIndex !==0) {
//         formOpponentSelection.selectedIndex = 0;
//         formOpponentSelection[2].disabled = true;
//         formOpponentSelection[2].title = "Disabled due to slow computation";
//         formOpponentSelection.classList.add('pointer-events');
//     } else {
//         formOpponentSelection[2].disabled = false;
//         formOpponentSelection.classList.remove('pointer-events');
//         formOpponentSelection[2].title = "";
//     }
// })

// Button on submit
formSubmitBtn.addEventListener('click', function(e) {
    if (playersMarks.value === opponentsMarks.value) {
        alert('Player 1 and Opponent Marks must be different.');
        e.preventDefault();
    }
    else if (!(validateCharOrEmoji(playersMarks) && validateCharOrEmoji(opponentsMarks))) {
        alert('Please choose one valid character/emoji.');
        e.preventDefault();
    } else {
        // create grid, hide/unhide content, change text
        initializeContent();
    }
});

// MAIN CONTENT //
// DOM Selectors
const title = document.querySelector('.title');
const titleDesc = document.querySelector('.title-desc');
const gridContainer = document.querySelector('.grid-container');
const p1Desc = document.querySelectorAll('.content-desc.p1')[0];
const p1Wins = document.querySelectorAll('.content-wins-text.p1')[0];
const p2Title = document.querySelectorAll('.content-title.p2')[0];
const p2Avatar = document.querySelectorAll('.content-avatar.p2')[0];
const p2Desc = document.querySelectorAll('.content-desc.p2')[0];
const p2Wins = document.querySelectorAll('.content-wins-text.p2')[0];
const contentMessage = document.querySelector('.content-message');
const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const resetBtn = document.querySelector('.reset');
const totalResetBtn = document.querySelector('.total-reset');

// Global variables
let gridSize;
let xName = "Player 1";
let oName;
let xInput; // X will be the maximizer ++
let oInput; // O will be the minimizer --
let isXFirst;
let isComputerActive;
let computerDifficulty;
let isGridLocked = false;
let xWins = 0;
let oWins = 0;
let currentMark; // whether it's X or O's turn
let currentPlayerMessage; // used to display player turn
let turnNo = 0; // used as index for gridHistory
let turnFinished; // to be set later for max gridHistory index for prev/next buttons
let isGameActive = true;
let gridHistory = [];
let gridBoard; // 1d array of grid
let grid2D; // 2d array of grid

// Initialize content after modal submission
function initializeContent() {
    // Assign variables
    gridSize = formGridSize.value; 
    isXFirst = formFirstMove.value;
    oName = formOpponentSelection.value;
    xInput = playersMarks.value;
    oInput = opponentsMarks.value;
    currentMark = xInput;
    (oName === "Player 2") ? isComputerActive = false : isComputerActive = true;
    computerDifficulty = (oName.includes('Random')) ? "Random" : "Impossible";

    // Change text based on inputs
    if (parseInt(gridSize) !== 3) {title.textContent = `Tic-Tac-Toe ${gridSize}x${gridSize}`};
    titleDesc.textContent = `${xInput}'s and the ${oInput}'s`;
    p2Title.textContent = oName;
    p1Desc.textContent = `${xInput}'s`;
    if (isComputerActive) {p2Avatar.style.backgroundImage = "url(assets/feathericons/monitor.svg)"};
    p2Desc.textContent = `${oInput}'s`;
    currentPlayerMessage = `${xName} (${xInput})`;

    // Hide/Unhide
    modal.classList.add('hide');
    modalContainer.classList.add('hide');
    content.classList.remove('hide');

    // Creation
    createGrid(gridSize);
    addMainFunction();
    createBoardInstance(); // push empty board to gridHistory
    if (isXFirst == 0) { // switch to let O go first
        oPlayerMovesFirst();
    };
}

function oPlayerMovesFirst() {
    switchStates();
        if (isComputerActive) {
            isGridLocked = true;
            setTimeout(function() {
                computerMark();
                isGridLocked = false;
            }, 1000); // let computer move after animation duration
        }
}

function createGrid(num) {
    // Creates grid board
    gridContainer.innerHTML = createDivs(num);
    let fontSize;
    if (parseInt(num) === 3) {fontSize = 13}
        else if (parseInt(num) === 5) {fontSize = 8}
        else {fontSize = 6};
    gridContainer.style.cssText = `grid-template-columns: repeat(${num}, 1fr); 
                                   grid-template-rows: repeat(${num}, 1fr); 
                                   font-size: ${fontSize}vmin;`
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

function addMainFunction() {
    // Add click event and hover class on grid items
    const gridItems = [...gridContainer.querySelectorAll('div')]; // Array/Nodelist of the grid items
    gridItems.forEach(function(item) {
        item.textContent = "";
        item.classList.add('hover'); // add hover class
        item.addEventListener('click', stampMark); // add clickEvent
    });
}

function removeMainFunction() {
    // Remove click event and hover class on grid items
    const gridItems = [...gridContainer.querySelectorAll('div')]; // Array/Nodelist of the grid items
    gridItems.forEach(function(item) {
        item.removeEventListener('click', stampMark); // remove clickEvent
        if (item.textContent === "") { // remove hover class
            item.classList.remove('hover');
        }
    });
}

// Main function
function stampMark() {
    if (isGridLocked) return; // flag to prevent click events during opponent timeout
    // function will run only if textContent contains nothing 
    if (this.textContent === "") {
        // modify board
        this.textContent = currentMark;
        this.classList.toggle('hover');
        turnNo++;

        createBoardInstance(); // create and save board state in 2D array
        checkDraw(); // check if draw
        let winStatus = evaluateBoard(grid2D, 0); // check if win (returns + or - number for wins)      
        if (winStatus !== 0) {endGameOnWin()}; // if win modify game message and win counter
        switchStates(); // switch states

        // if game has ended, disable click events, set max prev/next index, show prev/next buttons, 
        // and disable next button
        if (isGameActive === false) {
            removeMainFunction();
            turnFinished = turnNo; // set max array index for prev/next buttons
            previousBtn.classList.remove('hide');
            nextBtn.classList.remove('hide');
            nextBtn.disabled = true;
            nextBtn.classList.add('disabled');
        }

        // If opponent is a computer, do computer's turn
        if (isGameActive === true && isComputerActive === true) {
            contentMessage.textContent = `Computer is thinking`;
            isGridLocked = true; // prevent click events during timeout
            setTimeout(function() {
                computerMark();
                isGridLocked = false; // set flag to false after timeout
            }, 300);
        }
    }
}

function computerMark() {
    const gridItems = [...gridContainer.querySelectorAll('div')]; // Array/Nodelist of the grid items
    const gridItems2D = create2DArray(gridItems);

    if (computerDifficulty === "Random") {
        // AI: Random
        // computer chooses a grid to mark randomly    
        let indexes = [...gridItems.keys()]; // convert gridItems to an array of its index equiv
        let emptyIndexes = indexes.filter(index => gridItems[index].textContent === ""); // create new array of indexes that pass the test
        let selectedIndex = emptyIndexes[Math.floor(Math.random()*emptyIndexes.length)]; // get a random no text gridItem
        let randomGridItem = gridItems[selectedIndex];

        // modify board
        randomGridItem.textContent = currentMark;
        randomGridItem.classList.toggle('hover');
        turnNo++;
    } else {
        // AI: Impossible 
        let coordinates = findBestPlay(grid2D).coordinates;
        gridItems2D[coordinates[0]][coordinates[1]].textContent = currentMark;
        gridItems2D[coordinates[0]][coordinates[1]].classList.toggle('hover');
        turnNo++;
    }

    createBoardInstance(); // create and save board state in 2D array
    checkDraw(); // check if draw
    let winStatus = evaluateBoard(grid2D, 0); // check if win (returns + or - number for wins)      
    if (winStatus !== 0) {endGameOnWin()}; // if win modify game message and win counter        
    switchStates(); // switch states

    // if game has ended, disable click events, set max prev/next index, show prev/next buttons, 
    // and disable next button
    if (isGameActive === false) {
        removeMainFunction();
        turnFinished = turnNo; // set max array index for prev/next buttons
        previousBtn.classList.remove('hide');
        nextBtn.classList.remove('hide');
        nextBtn.disabled = true;
        nextBtn.classList.add('disabled');
    }
}

function createBoardInstance() {
    // create and save board state in 2D array
    gridBoard = createGridArrayInstance(); // get board instance
    grid2D = create2DArray(gridBoard); // create 2D array
    gridHistory.push(grid2D); // push instance into gridHistory
}


function createGridArrayInstance() {
    // takes current board and returns a 1D array
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
        newArr.push(arrCopy.splice(0,gridSize)); // create 1D array by splicing 3 items at a time and push into 2D array
    };
    return newArr;
}

function evaluateBoard(board, depth) {
    // used to check Winner of current board state
    // board requires 2D array of board
    // depth represents nodeHeight (for minimax function)
    // checks for victory and 
    // returns a number that is + (X wins), - (O Wins), or 0 (No Winner Yet)

    // Uses the concept of magic squares to check whether a win has occurred
    let xWinEquivalent = gridSize * xInput.codePointAt(0); // Value of n X's in a row
    let oWinEquivalent = gridSize * oInput.codePointAt(0); // Value of n O's in a row
    let extractedCharacters = 0;
    // check rows
    for (let rx = 0; rx < gridSize; rx++) {
        extractedCharacters = 0;
        for (let ry = 0; ry < gridSize; ry++) {
            extractedCharacters += board[rx][ry].codePointAt(0);
        }
        if (extractedCharacters === xWinEquivalent) {
            return +100 - depth;
        } else if (extractedCharacters === oWinEquivalent) {
            return -100 + depth;
        }
    }

    // check cols
    for (let cx = 0; cx < gridSize; cx++) {
        extractedCharacters = 0;
        for (let cy = 0; cy < gridSize; cy++) {
            extractedCharacters += board[cy][cx].codePointAt(0);
        }
        if (extractedCharacters === xWinEquivalent) {
            return +100 - depth;
        } else if (extractedCharacters === oWinEquivalent) {
            return -100 + depth;
        }
    }

    // check first diag
    extractedCharacters = 0;
    for (let i = 0; i < gridSize; i++) {
        extractedCharacters += board[i][i].codePointAt(0);
    }
    if (extractedCharacters === xWinEquivalent) {
        return +100 - depth;
    } else if (extractedCharacters === oWinEquivalent) {
        return -100 + depth;
    }

    // check second diag
    extractedCharacters = 0;
    for (let j = 0; j < gridSize; j++) {
        extractedCharacters += board[(gridSize-1)-j][j].codePointAt(0);
    }
    if (extractedCharacters === xWinEquivalent) {
        return +100 - depth;
    } else if (extractedCharacters === oWinEquivalent) {
        return -100 + depth;
    }

    // else if no wins, return 0
    return 0;
}

function endGameOnWin() {
    // ends game and modifies message and win counter
    isGameActive = false;
    contentMessage.textContent = `${currentPlayerMessage} Wins!`;
    (currentMark === xInput) ? xWins++ : oWins++;
    p1Wins.textContent = xWins;
    p2Wins.textContent = oWins;
}

function checkDraw() {
    // ends game if turnNo reaches max gridSize
    if (turnNo === gridSize**2) {
        contentMessage.textContent = `Game ended in a draw!`;
        isGameActive = false;
        return true;
    }
}

function switchStates() {
    // changes currentMark global variable
    if (isGameActive === true) {
        currentMark = (currentMark === xInput) ? oInput : xInput;
        currentPlayerMessage = (currentMark === xInput) ? `${xName} (${xInput})`:`${oName} (${oInput})`;
        contentMessage.textContent = `It's ${currentPlayerMessage}'s turn`
    }
}

// Content buttons: DOM and functions
previousBtn.addEventListener('click', previousBoardState);
nextBtn.addEventListener('click', nextBoardState);
resetBtn.addEventListener('click', resetBoard);
totalResetBtn.addEventListener('click', resetPage);

function previousBoardState() {
    nextBtn.disabled = false;
    nextBtn.classList.remove('disabled');
    previousBtn.classList.remove('disabled');
    turnNo--;
    createBoardStateFrom2DArray();
    if (turnNo === 0) {
        previousBtn.disabled = true;
        previousBtn.classList.add('disabled');
    }
}

function nextBoardState() {
    previousBtn.disabled = false;
    previousBtn.classList.remove('disabled');
    nextBtn.classList.remove('disabled');
    turnNo++;
    createBoardStateFrom2DArray();
    if (turnNo === turnFinished) {
        nextBtn.disabled = true;
        nextBtn.classList.add('disabled');}
}

function createBoardStateFrom2DArray() {
    const gridItems = [...gridContainer.querySelectorAll('div')]; // Array/Nodelist of the grid items
    let arr2D = gridHistory[turnNo]; // access board state based on turnNo(acting as index)

    // modify DOM based on saved board state
    gridItems.forEach(function(item) {
        let row = item.getAttribute('data-row');
        let col = item.getAttribute('data-col');
        item.textContent = arr2D[row][col];
    });
}

function resetBoard() {
    isGameActive = true;
    if (currentMark === xInput) { // if x wins; let o go first next
        oPlayerMovesFirst();
    } else { // else if o wins; let x go first next
        currentMark = xInput;
        contentMessage.textContent = `Player 1 goes first`;
    }
    turnNo = 0;
    addMainFunction();
    gridHistory = []; // reset gridHistory
    createBoardInstance(); // and push empty board as its first index
    
    previousBtn.classList.add('hide');
    previousBtn.classList.remove('disabled');
    previousBtn.disabled = false;
    nextBtn.classList.add('hide');
}

function resetPage() {
    window.location = window.location;
}

// MINIMAX ALGORITHM
// Reference: https://www.freecodecamp.org/news/minimax-algorithm-guide-how-to-create-an-unbeatable-ai/

function getAllEmptyCellsCoordinates(board) {
    // returns 1D array of coordinates
    let arr = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] == "") {
                arr.push([i,j]);
            }
        }
    }
    return arr;
}

// return an object containing coordinates and score properties
function minimax(board, depth, currentMark) {
    let emptyCells = getAllEmptyCellsCoordinates(board);

    // check terminal state
    let score = evaluateBoard(board, depth);
    if (score !== 0) {
        return {score}; // wins
    } else if (emptyCells.length === 0) {
        return {score: 0}; // draws
    }

    // stop search at node depth for bigger grid Sizes
    // for a 5x5 grid; It will take 25*24*23*22*21 game combinations (depth up to 5)
    // for a 7x7 grid it will take 49*48*47*46*45 game combinations (depth up to 5)
    if (gridSize == 5 && depth == 4) return {score};
    if (gridSize == 7 && depth == 4) return {score};

    // testing grid states
    let allTestPlayInfos = []; // will contain object prodiving coordinates of best play and its score

    // loop through all empty indexes to test them
    for (let i = 0; i < emptyCells.length; i++) {
        let currentTestPlayInfo = {}; // storing this test to hold coordinates AND score
        let xCoordinate = emptyCells[i][0];
        let yCoordinate = emptyCells[i][1];
        currentTestPlayInfo.coordinates = [xCoordinate, yCoordinate]; // save coordinates
        
        board[xCoordinate][yCoordinate] = currentMark; // put X or O on the board

        // recursively run minimax with the new board and saves score
        if (currentMark === oInput) {
            let result = minimax(board, depth+1, xInput);
            currentTestPlayInfo.score = result.score;
        } else {
            let result = minimax(board, depth+1, oInput);
            currentTestPlayInfo.score = result.score;
        }

        // reset board 
        board[xCoordinate][yCoordinate] = "";
        allTestPlayInfos.push(currentTestPlayInfo);
    }

    // go through all scores and find the best
    let bestScoreIndex = null;
    if (currentMark === xInput) { // X the maximizer
        let bestScore = -Infinity;
        for (let i = 0; i < allTestPlayInfos.length; i++) {
            if (allTestPlayInfos[i].score > bestScore) {
                bestScore = allTestPlayInfos[i].score;
                bestScoreIndex = i;
            }
        }
    } else { // O the minimizer
        let bestScore = Infinity;
        for (let i = 0; i < allTestPlayInfos.length; i++) {
            if (allTestPlayInfos[i].score < bestScore) {
                bestScore = allTestPlayInfos[i].score;
                bestScoreIndex = i;
            }
        }
    }

    // return object with the best test-play score for the current player
    return allTestPlayInfos[bestScoreIndex];
}

function findBestPlay(board) {
    return minimax(board, 0, currentMark);
}