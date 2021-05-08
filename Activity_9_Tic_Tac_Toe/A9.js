//created a variable for .x and .o from the css so it's not that confusing in using here
//automatically let isOTurn = false;
//querySelector() = get the first element in the document with that id/class
//querySelectorAll() = get all elements in the document with that id/class
let xClass = "X";
let oClass = "O";
let isXTurn = true;
let cells = document.querySelectorAll('.cell')
let winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let board = document.getElementById('board')
let popUp = document.getElementById('popUp')
let popUpTwo = document.getElementById('popUpTwo')
let winMessage = document.getElementById('winMessage')
let storage = document.getElementById('storage');

//need to run startGame function upon opening the browser
//.forEach = Running the function through each cell one by one
//the second parameter is always for the index
//format of addEventListener = where.addEventListerner(eventString, function, options)"
//putting an addEventListener in each cell
//once:true = evenListener will only run once
//line 37 - creating and appending a new <p> element, function (e) - through the event and you need to add "once:true" again to avoid repetition
startGame()

function startGame() {
    cells.forEach(function (cell, index) {
        cell.addEventListener('click', playerClick, { once: true })
        cell.addEventListener('click', function (e) {
            let moveLog = document.createElement('p')
            moveLog.innerText = "Player " + currentClass + " selected the " + index + " box";
            storage.appendChild(moveLog);
        }, { once: true })
    })
    hoverNewBoard()
    clearBoard()
}

//"e" is event - running the function from an event
//let targetedCell = e.target - telling you the location of the cell and targeting it and running the eventListener
// if else - if it's x's turn, we return xClass, if not return oClass
//placemark - knowing which cell you are on and what class was put in
//line 61 - for each cell, if it contains a currentClass it will add +1
//line 67 - if it's true it will move down the code, otherwise it'll stop
//line 68 - is a function
//line 70 - if filled count ==9 the game ends
function playerClick(e) {
    let targetedCell = e.target
    if (isXTurn) {
        currentClass = xClass;
    } else {
        currentClass = oClass;
    }
    placeMark(targetedCell, currentClass)
    let filledCount = 0;
    cells.forEach(function (cell) {
        if (cell.classList.contains(xClass) || cell.classList.contains(oClass)) {
            filledCount++;
        }
    })
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (filledCount == 9) {
        endGame(true)
    }
    changeTurns()
    hoverNewBoard()
}

//classList.add = add '"currentClass" in the "targetedCell" - adding a class in the element
function placeMark(targetedCell, currentClass) {
    targetedCell.classList.add(currentClass)
}

//you need to put the currentClass in the parameter so you know who's turn it is
//.some = looping through all the winning combination, if it hits true, it will stop and give you a boolean true
//.every = kinda like the opposite, will loop through each index inside each winningCombination array and will stop if it encounters false and returne a boolean false
//line 91 = checking if a cell .contains a currentClass
//output is either true or false
function checkWin(currentClass) {
    return winningCombination.some(function (combination) {
        return combination.every(function (index) {
            return cells[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winMessage.innerText = `It's a draw!`
    } else {
        if (isXTurn) {
            winMessage.innerText = `Player X Wins!`
        } else {
            winMessage.innerText = `Player O Wins!`
        }
    }
    popUp.classList.add('show')
    popUpTwo.classList.add('show')
}

//if isXTurn is false it's O's turn, otherwise it's X's
function changeTurns() {
    if (isXTurn) {
        isXTurn = false;
    } else {
        isXTurn = true;
    }
}

//clearing the class in the .board first before allowing the turn to add .x or .o
function hoverNewBoard() {
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    if (isXTurn) {
        board.classList.add(xClass)
    }
    else {
        board.classList.add(oClass)
    }
}

//remove everything
function clearBoard() {
    cells.forEach(function (cell) {
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
    })
    popUp.classList.remove('show')
    popUpTwo.classList.remove('show')
    storage.innerHTML = ""
}