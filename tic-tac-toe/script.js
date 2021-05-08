// global variables
const cellsArr = Array.from(document.getElementsByClassName('cell'));
let playerText = document.querySelector('h2');
const O = 'O';
const X = 'X';
let currentPlayer,
  nextPlayer = X;
let cellId;
let lastChar;
let xWins;
let prevMoveArr = [];
let nextMoveArr = [];
let charsArrPrev = [];
let charsArrNext = [];
let boardArr = [
  ['0', '1', '2'],
  ['3', '4', '5'],
  ['6', '7', '8'],
];

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
  switch (cellId) {
    case '0':
      boardArr[0].splice(0, 1); //deletes item on position [0][0]
      delArr = boardArr[0].splice(0, 0, currentPlayer); //replaces the item that was deleted
      break;
    case '1':
      boardArr[0].splice(1, 1);
      delArr = boardArr[0].splice(1, 0, currentPlayer);
      break;
    case '2':
      boardArr[0].splice(2, 1);
      delArr = boardArr[0].splice(2, 0, currentPlayer);
      break;
    case '3':
      boardArr[1].splice(0, 1);
      delArr = boardArr[1].splice(0, 0, currentPlayer);
      break;
    case '4':
      boardArr[1].splice(1, 1);
      delArr = boardArr[1].splice(1, 0, currentPlayer);
      break;
    case '5':
      boardArr[1].splice(2, 1);
      delArr = boardArr[1].splice(2, 0, currentPlayer);
      break;
    case '6':
      boardArr[2].splice(0, 1);
      delArr = boardArr[2].splice(0, 0, currentPlayer);
      break;
    case '7':
      boardArr[2].splice(1, 1);
      delArr = boardArr[2].splice(1, 0, currentPlayer);
      break;
    default:
      boardArr[2].splice(2, 1);
      delArr = boardArr[2].splice(2, 0, currentPlayer);
      break;
  }
};

checkWinner = () => {
  // showHidePrev = () => {
  //   console.log('Show');
  // };
  // playerText.textContent === 'X wins' ? showHidePrev() : null;

  // console.table(boardArr);

  let player;
  let isDraw = false;

  // first row
  // iterated using while-loop
  let i = 0;
  let score = 0;
  player = boardArr[i][0];
  while (i < 1) {
    let j = 0;
    while (j < boardArr[i].length) {
      boardArr[i][0] === boardArr[i][j] ? score++ : null;
      j++;
    }
    score == 3 ? (playerText.textContent = `${player} wins!`) : null;
    i++;
  }

  // second row
  // iterated using do-while-loop
  score = 0; // resets score back to zero
  player = boardArr[i][0];
  do {
    let j = 0;
    do {
      boardArr[i][0] === boardArr[i][j] ? score++ : null;
      j++;
    } while (j < boardArr[i].length);
    score == 3 ? (playerText.textContent = `${player} wins!`) : null;
    i++;
  } while (i > 0 && i < 2);

  // third row
  // iterated using for-loop
  score = 0;
  player = boardArr[i][0];
  for (let i = 2; i < 3 && i > 1; i++) {
    for (let j = 0; j < boardArr[i].length; j++) {
      boardArr[i][0] === boardArr[i][j] ? score++ : null;
    }
    score == 3 ? (playerText.textContent = `${player} wins!`) : null;
  }

  // first column
  score = 0;
  player = boardArr[0][0];
  // console.log(boardArr[0][1]);
  for (let i = 0; i < boardArr.length; i++) {
    boardArr[0][0] === boardArr[i][0] ? score++ : null;
  }
  score == 3 ? (playerText.textContent = `${player} wins!`) : null;

  // second column
  score = 0;
  player = boardArr[0][1];
  for (let i = 0; i < boardArr.length; i++) {
    let j = 1;
    boardArr[0][1] === boardArr[i][j] ? score++ : null;
  }
  score == 3 ? (playerText.textContent = `${player} wins!`) : null;

  // third column
  score = 0;
  player = boardArr[0][2];
  for (let i = 0; i < boardArr.length; i++) {
    j = 2;
    boardArr[0][2] === boardArr[i][j] ? score++ : null;
  }
  score == 3 ? (playerText.textContent = `${player} wins!`) : null;

  // diagonal 1
  score = 0;
  i = 0;
  while (i < 2) {
    j = 0;
    while (j < 2) {
      // console.log(boardArr[i][j]);
      j++;
    }
    i++;
  }

  // i = 0;
  // let ctr = 0;
  // while (i < boardArr.length) {
  //   let j = 0;
  //   while (j < boardArr.length) {
  //     boardArr[i][j].includes('X') || boardArr[i][j].includes('O') ? ctr++ : null;
  //   }
  // }
  // ctr == 9 ? (isDraw = true) : (isDraw = false);
  // console.log(isDraw);
};

// hide and shows previous and next button
showHideButton = () => {
  prevMoveArr.length != 0 ? (document.querySelector('.buttons').style.visibility = 'visible') : (document.querySelector('.buttons').style.visibility = 'hidden');

  nextMoveArr.length != 0 ? (document.getElementById('next-button').style.visibility = 'visible') : (document.getElementById('next-button').style.visibility = 'hidden');
};

// displays previous move
prevMove = () => {
  // gets index of previous move array's last item
  let lastItem = prevMoveArr[prevMoveArr.length - 1];

  // removes last item from previous move array
  // Syntax: (index,howMany) -1 index for last item
  prevMoveArr.splice(-1, 1);

  // get last item of characters previous array to be used by show next move function
  lastChar = charsArrPrev[charsArrPrev.length - 1];

  // logs every move
  console.log(`[ ${lastItem} , ${lastChar} ]`);

  // adds last item to characters next array
  charsArrNext.push(lastChar);

  // empties the content of individual based on which was the last item of previous array
  document.getElementById(`${lastItem}`).textContent = null;

  nextMoveArr.push(lastItem);

  // removes last item of characters previous array
  charsArrPrev.splice(-1, 1);

  showHideButton();
};

// displays next move

nextMove = () => {
  // get last item of next move array
  let nextItem = nextMoveArr[nextMoveArr.length - 1];

  // adds the last item to previous move array
  prevMoveArr.push(nextItem);

  // gets last item of characters next array
  lastChar = charsArrNext[charsArrNext.length - 1];

  // adds the last item of characters next array to characters previous array
  charsArrPrev.push(lastChar);

  // logs every move
  console.log(`[ ${nextItem} , ${lastChar} ]`);

  nextMoveArr.splice(-1, 1);
  showHideButton();

  document.getElementById(`${nextItem}`).textContent = lastChar;

  // removes last item of characters next array
  charsArrNext.splice(-1, 1);
};

// switches X to O, vice-versa then updates value of variable currentPlayer
switchPlayer = () => {
  currentPlayer = currentPlayer === O ? X : O;
};

// updates who's currently playing
updatePlayerText = () => {
  playerText.style.visibility = 'visible';
  currentPlayer === O ? (nextPlayer = X) : (nextPlayer = 0);
  playerText.textContent = `${nextPlayer}'s turn`;
};

// iterate cells array, so individual cells can be accessed using forEach loop
drawBoard = () => {
  cellsArr.forEach((cell, index) => {
    cell.addEventListener('click', cellClicked, { once: true });
    cell.textContent = '';
  });

  playerText.style.visibility = 'hidden';
  // hides prev and next button
  // document.querySelector('.buttons').style.visibility = 'hidden';
  // document.getElementById('next-button').style.visibility = 'hidden';
};

restartClicked = () => {
  drawBoard();
  prevMoveArr.splice(0, prevMoveArr.length);
  nextMoveArr.splice(0, nextMoveArr.length);
  charsArrPrev.splice(0, charsArrPrev.length);
  charsArrNext.splice(0, charsArrNext.length);
  console.clear();
  boardArr = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
  ];
};

// Calling the functions
drawBoard();

// event listeners
document.getElementById('restart-button').addEventListener('click', restartClicked);
