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
let historyArr = [];

// triggers when an individual cell gets clicked
const cellClicked = (e) => {
  cellId = e.target.id; 
  switchPlayer();
  updatePlayerText();
  e.target.textContent = currentPlayer;
  prevMoveArr.push(cellId);
  historyArr.push(cellId);
};

// displays previous move
prevMove = () => {
  // gets index of previous move array's last item
  let lastItem = prevMoveArr[prevMoveArr.length-1]

  // removes last item from previous move array 
  // Syntax: (index,howMany) -1 index for last item
  prevMoveArr.splice(-1,1);

  // empties the content of individual based on which was the last item of previous array
  document.getElementById(`${lastItem}`).textContent = null;
  nextMoveArr.push(lastItem);
  console.log("prevMoveArr:" + prevMoveArr);
};

// displays next move

nextMove = () => {
  // console.log("history: " + historyArr);

  // let nextItem = prevMoveArr.length;

  // nextItem ++;
  // for-loop to iterate items of history array
  // for (let i = nextItem ; i < historyArr.length; i++) {
    // const element = array[index];
    // console.log(nextItem);
    
  // }

  // console.log(historyArr[nextItem]);
  // document.getElementById(`${nextItem}`).textContent = "Z";
  console.log("nextMoveArr:" + nextMoveArr);
 
  // get last item of next move array
  let nextItem = nextMoveArr[nextMoveArr.length-1];
  console.log(nextItem);

  nextMoveArr.splice(-1,1);
  console.log(currentPlayer);
  document.getElementById(`${nextItem}`).textContent = currentPlayer;
  switchPlayer();

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

