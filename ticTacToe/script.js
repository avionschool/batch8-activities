// variables
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
const turnMessage = document.querySelector('[turn-message');
let circleTurn
var currentClass;

const move = [''];

const myHistory = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

//next and previous buttons
const prev = document.getElementById('prevButton');
const next = document.getElementById('nextButton');
const storePrev = [];
const storeNext = [];
const movePrev = [];
const moveNext = [];
// const getCellLoc = 




// functions

startGame()

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick (e) {
    const cell = e.target;
    const classList = cell.classList;
    const getNode = classList[1];
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false); 
    } else if (isDraw()) {
        endGame(true);
    }
    swapTurns();
    setBoardHoverClass();
    storePrev.push(getNode); // to store variable same check
    movePrev.push(classList[2])

}


function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    turnMessage.removeAttribute('innerText'); // need to work on
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS);
    })
}

function placeMark (cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns () {
    circleTurn = !circleTurn;
    if (circleTurn) {
        turnMessage.innerText = 'o turn'; 
    } else {
        turnMessage.innerText = 'x turn';
    }
}

function setBoardHoverClass () {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => { // to loop in all combination
        return combination.every(index => { // while looping it checks if it has the same class.
            return cellElements[index].classList.contains(currentClass); // it checks what index the class is.
        })
    })
}

// events of next and prev

prev.addEventListener('click', (e) => {
    if (storePrev.length !=0) {
        let lastMove = storePrev[storePrev.length - 1];
        let targetCell = cellElements[lastMove];
        let lastPlayer = movePrev[movePrev.length - 1];
        targetCell.classList.remove(targetCell.classList[2]);
        storeNext.push(lastMove); // was able to store
        storePrev.pop();
        moveNext.push(lastPlayer);
        movePrev.pop();

        console.log(lastPlayer)
    }
})

next.addEventListener('click', () => {
    if (storeNext.length != 0) {
        let lastMove = storeNext[storeNext.length -1]; 
        let targetCell = cellElements[lastMove]; 
        let lastPlayer = moveNext[moveNext.length - 1];
        targetCell.classList.add(moveNext[moveNext.length - 1]);
        storePrev.push(lastMove);
        storeNext.pop();
        movePrev.push(lastPlayer);
        moveNext.pop();

        console.log(cellElements)
    } else {

    }
})