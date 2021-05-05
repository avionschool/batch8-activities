// variables
const cellsArr  = Array.from(document.getElementsByClassName('cell'));
const O = "O";
const X = "X";
let currentPlayer,nextPlayer = X;
let playerText = document.querySelector('h2');
let cellId;
const winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let xArr = [0, 1, 2];
let prevMoveArr = [];
let nextMoveArr = [];
let charsArrPrev = [];
let charsArrNext = [];
let lastChar;

// triggers when an individual cell gets clicked
const cellClicked = (e) => {
  cellId = e.target.id; 
  switchPlayer();
  updatePlayerText();
  e.target.textContent = currentPlayer;
  prevMoveArr.push(cellId);
  charsArrPrev.push(currentPlayer);
};

// hide and shows previous and next button
showHideButton = () => {
  prevMoveArr.length != 0 ?  document.querySelector(".buttons").style.display = "inline" : document.querySelector(".buttons").style.display = "none" ;
  nextMoveArr.length != 1 ?  document.getElementById("next-button").style.display = "inline" : document.getElementById("next-button").style.display = "none";
};

// displays previous move
prevMove = () => {
  // gets index of previous move array's last item
  let lastItem = prevMoveArr[prevMoveArr.length-1]

  // removes last item from previous move array 
  // Syntax: (index,howMany) -1 index for last item
  // console.log('lastItem: ' + lastItem);
  prevMoveArr.splice(-1,1);


  // get last item of characters previous array to be used by show next move function
  lastChar = charsArrPrev[charsArrPrev.length-1];

  // adds last item to characters next array
  charsArrNext.push(lastChar);

  // empties the content of individual based on which was the last item of previous array
  document.getElementById(`${lastItem}`).textContent = null;

  // showHideButton();
  nextMoveArr.push(lastItem);
  
  // removes last item of characters previous array 
  charsArrPrev.splice(-1,1);
};

// displays next move

nextMove = () => { 
  // get last item of next move array
  let nextItem = nextMoveArr[nextMoveArr.length-1];

  // adds the last item to previous move array
  prevMoveArr.push(nextItem);

  // gets last item of characters next array
  lastChar = charsArrNext[charsArrNext.length-1];

  // adds the last item of characters next array to characters previous array
  charsArrPrev.push(lastChar);
  
  // showHideButton();
  nextMoveArr.splice(-1,1);
  document.getElementById(`${nextItem}`).textContent = lastChar;

  // removes last item of characters next array
  charsArrNext.splice(-1,1);
  
};

// switches X to O, vice-versa then updates value of variable currentPlayer
switchPlayer = () => {
  currentPlayer = currentPlayer === O ? X : O;
};

checkWinner = () => {

};

// updates who's currently playing
updatePlayerText = () => {
  currentPlayer === O ? nextPlayer = X : nextPlayer = 0;
  playerText.textContent = `${nextPlayer}'s turn`
}

// iterate cells array, so individual cells can be accessed using forEach loop
drawBoard = () => {
  cellsArr.forEach((cell, index) => {
    cell.addEventListener('click', cellClicked, {once: true})
  });
};

drawBoard();

