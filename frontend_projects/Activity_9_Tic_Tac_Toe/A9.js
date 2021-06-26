let xClass = "X";
let oClass = "O";
//created a variable for .x and .o from the css so it's not that confusing in using here
let isXTurn = true;
//automatically let isOTurn = false;
let cells = document.querySelectorAll('.cell');
//querySelector() = get the first element in the document with that id/class
//querySelectorAll() = get all elements in the document with that id/class
let winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let board = document.getElementById('board');
let popUp = document.getElementById('popUp');
let popUpTwo = document.getElementById('popUpTwo');
let winMessage = document.getElementById('winMessage');
let storage = document.getElementById('storage');
let xWinNotif = "Player X Wins!";
let oWinNotif = "Player O Wins!";
let drawNotif = "It's a draw!";
let oP = 0;
let xP = 0;
let dP = 0;
//you need to place the oP, xP, dP as a global variable so it won't restart
let xPoints = document.getElementById('xPoints');
let drawPoints = document.getElementById('drawPoints');
let oPoints = document.getElementById('oPoints');
let moveHistory = [
    ['', '', '',
    '', '', '',
    '', '', '',]
];
//created an array that will contain all the move history
let prevCount = 1
//need to set this as 1, you will use this to subtract on the .length of the moveHistory array

startGame()
//need to run startGame function upon opening the browser

function startGame() {
    moveHistory = [
        ['','','',
        '', '','',
        '', '', '']
    ];
    //you need to reset the history logged
    prevCount = 1;
    //this one as well needs reset because of the -- and ++
    console.log(moveHistory);
    //you need to place it here so it resets the moveHistory
    cells.forEach(function (cell, index) {
    //.forEach = Running the function through each cell one by one
    //the second parameter is always for the index
        cell.addEventListener('click', playerClick, { once: true })
        //format of addEventListener = where.addEventListerner(eventString, function, options)"
        //putting an addEventListener in each cell
        //once:true = evenListener will only run once
        cell.addEventListener('click', function (e) {
        //creating and appending a new <p> element
        //function (e) - through the event
        //you need to add "once:true" again to avoid repetition
            let moveLog = document.createElement('p')
            moveLog.innerText = "Player " + currentClass + " marked #" + index + " cell";
            storage.appendChild(moveLog);
        }, { once: true })
    })
    hoverNewBoard()
    clearBoard()
}

function playerClick(e) {
//"e" is event - running the function from an event
    let targetedCell = e.target
    //telling you the location of the cell and targeting it and running the eventListener
    if (isXTurn) {
        currentClass = xClass;
    } else {
        currentClass = oClass;
    }
    // if else - if it's x's turn, we return xClass, if not return oClass
    placeMark(targetedCell, currentClass)
    //placemark - knowing which cell you are on and what class was put in
    let filledCount = 0;
    cells.forEach(function (cell) {
    //for each cell, if it contains a currentClass it will add +1
        if (cell.classList.contains(xClass) || cell.classList.contains(oClass)) {
            filledCount++;
        }
    })
    if (checkWin(currentClass)) {
        endGame(false)
    //if it's true it will move down the code, otherwise it'll stop
    } else if (filledCount == 9) {
    //if filled count ==9 the game ends
        endGame(true)
    //is a function
    }
    logMove(targetedCell)
    changeTurns()
    hoverNewBoard()
}

function placeMark(targetedCell, currentClass) {
    targetedCell.classList.add(currentClass)
}
//classList.add = add '"currentClass" in the "targetedCell" - adding a class in the element

//output is either true or false
function checkWin(currentClass) {
//you need to put the currentClass in the parameter so you know who's turn it is
    return winningCombination.some(function (combination) {
    //.some = looping through all the winning combination, if it hits true, it will stop and give you a boolean true
        return combination.every(function (index) {
        //.every = kinda like the opposite, will loop through each index inside each winningCombination array and will stop if it encounters false and returne a boolean false
            return cells[index].classList.contains(currentClass)
            //checking if a cell .contains a currentClass
        })
    })
}

//only use .value if you are going to get the value of the element, numbers doesn't need it
function endGame(draw) {
    if (draw) {
        winMessage.innerText = drawNotif
        dP++;
        drawPoints.innerText = dP;
    } else {
        if (isXTurn) {
            winMessage.innerText = xWinNotif;
            xP++;
            xPoints.innerText = xP;
        } else {
            winMessage.innerText = oWinNotif
            oP++;
            oPoints.innerText = oP;
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

function logMove(targetCell) {
    //whenever you playerClick, you log it to moveHistory and identify the cell
    const indexOfTargetCell = Array.from(cells).indexOf(targetCell);
    //.from = creating a duplicated array of .cell=cells
    //.indexOf = searches the array for the specified item, and returns its index
    //getting index number only, to put a class
    //inivisible board and cells (logic)
    const newArray = Array.from(moveHistory[moveHistory.length - 1]);
    //duplicate the latest array logged
    if (isXTurn) {
        newArray[indexOfTargetCell] = xClass;
    } else {
        newArray[indexOfTargetCell] = oClass;
    }
    moveHistory.push(newArray);
    //putting class on the indexOfTargetedCell
}

function prevMove(){
    //let prevCount = 1
    //let moveHistory = [
        //['', '', '',
        //'', '', '',
        //'', '', '',]
    //];
    prevCount++;
    // [a, b, c]=.length=3, onlick -1=prevCount = [a, b, c]=.lenght=2
    let currentHistory = moveHistory[moveHistory.length - prevCount];
    currentHistory.forEach(function(move, index){
        const currentCell = cells[index];
        currentCell.classList.remove(xClass);
        currentCell.classList.remove(oClass);
        //removing class
        if (move == xClass) {
            currentCell.classList.add(xClass);
        } else if (move == oClass) {
            currentCell.classList.add(oClass);
        }
    })
}

function nextMove(){
    prevCount--;
    const currentHistory = moveHistory[moveHistory.length - prevCount];
    currentHistory.forEach(function(move, index){
        const currentCell = cells[index];
        currentCell.classList.remove(xClass);
        currentCell.classList.remove(oClass);
        if (move == xClass) {
            currentCell.classList.add(xClass);
        } else if (move == oClass) {
            currentCell.classList.add(oClass);
        }
    })
}