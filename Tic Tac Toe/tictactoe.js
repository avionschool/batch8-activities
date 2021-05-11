const DIAMETER = 100;
const SCL = 0.8;

let w, h, d; // the d is the diagonal length of board

let cells = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

let moves = 9
let player = 'X';
let nextPlayer = 'O';
let info;

function mousePressed() {
		// MouseEvent clientX Property
		// Output the coordinates of the mouse pointer when the mouse button is clicked on the board
	    // when the mouse is in the top/bottom or left/right portion of the board
		// if X and Y coordinates are > 0 and < board width & height
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		let row = (mouseX - mouseX % w) / w;
		let col = (mouseY - mouseY % h) / h;

		//initiate 'X' and 'O' symbols when clicked
		if (cells[col][row] == null) {
			cells[col][row] = player;
			player = nextPlayer;
			nextPlayer = cells[col][row];
			moves--;
		}

	// moves history
	//  for (i = 0; i < cells.length; i++) {
	// 	console.log(cells);
	// 	}
	}
}

function hidePrevnext() {
	//hide previous & next buttons on page load
	document.getElementById('previous').style.visibility = 'hidden';
	document.getElementById('next').style.visibility = 'hidden';
}

// Reset the game
function resetGame() {
	cells = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	];
	moves = 9;
	player = 'X';
	nextPlayer = 'O';
	loop();

	// hide previous & next buttons on reset
	var hidden = false;
    hidden = !hidden;
    	if(hidden) {
            document.getElementById('previous').style.visibility = 'hidden';
			document.getElementById('next').style.visibility = 'hidden';
        } 
		else {
			document.getElementById('previous').style.visibility = 'visible';
			document.getElementById('next').style.visibility = 'visible';
        }
}

// Get Winner
function checkWinner() {
	// let x, y;
	// Diagonal winner
	// checking array indexes until it fulfills the condition
	stroke(255, 0, 0); // line color (used P5.js library, full set of drawing functionality and for creative coding)
	if (equals3(cells[0][0], cells[1][1], cells[2][2])) {
		winner = cells[0][0];
		line(w / 2, h / 2, w * 2.5, h * 2.5);  	 // line that strikes out the X or O symbols if a player wins 
		document.getElementById('previous').style.visibility = 'visible';  // Show previous & next buttons if a player wins
		document.getElementById('next').style.visibility = 'visible';
		return true;
	}

	if (equals3(cells[0][2], cells[1][1], cells[2][0])) {
		winner = cells[0][2];
		line(w * 2.5, h / 2, w / 2, h * 2.5);
		document.getElementById('previous').style.visibility = 'visible';
		document.getElementById('next').style.visibility = 'visible';
		return true;
	}

	for (let i = 0; i < 3; i++) {	
		// Horizontal winner
		if (equals3(cells[i][0], cells[i][1], cells[i][2])) {
			winner = cells[i][0];
			line(w / 2, h * (i + 0.5), w * 2.5, h * (i + 0.5));
			document.getElementById('previous').style.visibility = 'visible';
			document.getElementById('next').style.visibility = 'visible';
			return true;
		}
		// Vertical winner
		if (equals3(cells[0][i], cells[1][i], cells[2][i])) {
			winner = cells[0][i];
			line(w * (i + 0.5), h / 2, w * (i + 0.5), h * 2.5);
			document.getElementById('previous').style.visibility = 'visible';
			document.getElementById('next').style.visibility = 'visible';
			return true;
		}
	}
	// checking if Draw
	if (moves == 0) {
		winner = 'Nobody';
		return true;
	}
	return false;
}

function equals3(a, b, c) {
	if (a == b && b == c && c != null) return true;
	else return false;
}

function draw() {
	background(0);
	drawLines();
	drawSymbols();
	info.innerHTML = "Next turn: " + player;
	if(checkWinner()) {
		info.innerHTML = winner + " Wins!";
		noLoop();
	}
}

// board settings
function setup() {
	createCanvas(700, 700);

	w = floor(width / 3);
	h = floor(height / 3);
	d = dist(0, 0, w, h) * SCL;

	info = document.getElementById("info");

	strokeWeight(20);
	noFill();
}

// board tiles\lines
function drawLines() {
	stroke(255);
	for (let i = 1; i < 3; i++) {
		line(w * i, 0, w * i, height);
		line(0, h * i, width, h * i);
	}
}

// drawing X & O symbols
function drawSymbols() {
	let x, y, t;
	stroke(255);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (cells[i][j] == 'X') {
				x = j * w;
				y = i * h;
				t = floor(d / sqrt(2));
				
				line(x + t, y + t, x + w - t, y + h - t);
				line(x + w - t, y + t, x + t, y + h - t);
			} 
			else if (cells[i][j] == 'O') {
				x = j * w + w / 2;
				y = i * h + h / 2;
				ellipse(x, y, DIAMETER, DIAMETER);
			} else {
				continue;
			}
		}
	}
}