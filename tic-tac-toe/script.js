// global variables
const cellsArr  = Array.from(document.getElementsByClassName('cell'));
let playerText = document.querySelector('h2');
const O = "O";
const X = "X";
let currentPlayer,nextPlayer = X;
let cellId;
let lastChar;
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
let prevMoveArr = [];
let nextMoveArr = [];
let charsArrPrev = [];
let charsArrNext = [];


// triggers when an individual cell gets clicked
const cellClicked = (e) => {
  cellId = e.target.id; 
  switchPlayer();
  updatePlayerText();

  e.target.textContent = currentPlayer;
  prevMoveArr.push(cellId);
  charsArrPrev.push(currentPlayer);

  pushToBoard();
  checkWinner();

};

// populates board array upon click
pushToBoard = () => {
  let delArr = []; // used so item on orig. array won't be emptied
  switch ( cellId ) {
    case '0':
      boardArr[0].splice(0,1) //deletes item on position [0][0]
      delArr = boardArr[0].splice(0,0, currentPlayer) //replaces the item that was deleted
      break;
    case '1':
      boardArr[0].splice(1,1)
      delArr = boardArr[0].splice(1,0, currentPlayer)
      break;
    case '2':
      boardArr[0].splice(2,1)
      delArr = boardArr[0].splice(2,0, currentPlayer)
      break;
    case '3':
      boardArr[1].splice(0,1)
      delArr = boardArr[1].splice(0,0, currentPlayer)
      break;
    case '4':
      boardArr[1].splice(1,1)
      delArr = boardArr[1].splice(1,0, currentPlayer)
      break;
    case '5':
      boardArr[1].splice(2,1)
      delArr = boardArr[1].splice(2,0, currentPlayer)
      break;
    case '6':
      boardArr[2].splice(0,1)
      delArr = boardArr[2].splice(0,0, currentPlayer)
      break;
    case '7':
      boardArr[2].splice(1,1)
      delArr = boardArr[2].splice(1,0, currentPlayer)
      break;
    default:
      boardArr[2].splice(2,1)
      delArr = boardArr[2].splice(2,0, currentPlayer)
      break;
  }

}

// board array cheat-sheet
// first row : [0][0],[0][1],[0][2]
// 2nd row : [1][0], [1][1], [1][2]
// 3rd row : [2][0], [2][1], [2][2]

let boardArr = [
  ['0','1','2'],
  ['3','4','5'],
  ['6','7','8']
];
checkWinner = () => {
  console.table(boardArr)

  let i = 0;
  let tempArr = [];

  // first row
  // iterated using while-loop
  while (i < 1) {
    let j = 0;
    while ( j < boardArr[i].length) {
      boardArr[i][0] === boardArr[i][j] ? tempArr.push(boardArr[i][j]) : null ;
      j++;
    }
    tempArr.length == 3 ? alert(boardArr[i][0] + ' wins!') : null ; 
  i++;
  }

  // second row
  // iterated using do-while-loop
  do {
    let j = 0;
    do {
      boardArr[i][0] === boardArr[i][j] ? tempArr.push(boardArr[i][j]) : null ;
      j++;
    } while ( j < boardArr[i].length-1);
    tempArr.length == 3 ? alert(boardArr[i][0] + ' wins!') : null ; 
    i++;
  } while ( i > 0 && i < 2 );

};

checkWinner();


// hide and shows previous and next button
showHideButton = () => {

  prevMoveArr.length != 0 ? document.querySelector('.buttons').style.visibility = "visible" : document.querySelector('.buttons').style.visibility = 'hidden' ;

  nextMoveArr.length != 0 ?  document.getElementById("next-button").style.visibility = "visible" : document.getElementById("next-button").style.visibility = "hidden";
};

// displays previous move
prevMove = () => {
  // gets index of previous move array's last item
  let lastItem = prevMoveArr[prevMoveArr.length-1]

  // removes last item from previous move array 
  // Syntax: (index,howMany) -1 index for last item
  prevMoveArr.splice(-1,1);


  // get last item of characters previous array to be used by show next move function
  lastChar = charsArrPrev[charsArrPrev.length-1];

  // adds last item to characters next array
  charsArrNext.push(lastChar);

  // empties the content of individual based on which was the last item of previous array
  document.getElementById(`${lastItem}`).textContent = null;

  nextMoveArr.push(lastItem);
  
  // removes last item of characters previous array 
  charsArrPrev.splice(-1,1);

  showHideButton();

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
  
  nextMoveArr.splice(-1,1);
  showHideButton();

  document.getElementById(`${nextItem}`).textContent = lastChar;

  // removes last item of characters next array
  charsArrNext.splice(-1,1);
  
};

// switches X to O, vice-versa then updates value of variable currentPlayer
switchPlayer = () => {
  currentPlayer = currentPlayer === O ? X : O;
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

// Calling the functions
drawBoard();

