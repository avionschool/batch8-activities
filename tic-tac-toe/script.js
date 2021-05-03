const cells  = Array.from(document.getElementsByClassName('cell'));
const O = "O";
const X = "X";
let currentPlayer = O;

const cellClicked = (e) => {
  const id = e.target.id; 
  switchPlayer();
  e.target.innerText = currentPlayer;
};

switchPlayer = () => {
  currentPlayer = currentPlayer === O ? X : O;
};

drawBoard = () => {
  cells.forEach((cell, index) => {
    cell.addEventListener('click', cellClicked)
    
  });
};

drawBoard();

