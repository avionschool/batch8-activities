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
let historyArr,prevMoveArr = [];

// triggers when an individual cell gets clicked
const cellClicked = (e) => {
  cellId = e.target.id; 
  switchPlayer();
  updatePlayerText();
  e.target.textContent = currentPlayer;
  prevMoveArr.push(cellId);
  // historyArr.push(cellId);
  console.log(prevMoveArr);
};

// displays previous move
prevMove = () => {
  let lastItem = prevMoveArr[prevMoveArr.length-1]
  prevMoveArr.splice(-1,1);
  // console.log(document.getElementById(`${lastItem}`));
  document.getElementById(`${lastItem}`).innerText = null;
  console.log(prevMoveArr); 
};

// switches X to O, vice-versa then updates value of variable currentPlayer
switchPlayer = () => {
  currentPlayer = currentPlayer === O ? X : O;
};

checkWinner = () => {

};

// updates who's currently playing - dependent on switchPlayer function
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

