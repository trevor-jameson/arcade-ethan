/* - create an empty Tic-Tac-Toe board and set the current player to 'X'
- get all the clickable spots on the game board from the HTML document
- Define a function to switch between players 'X' and 'O'
- define a function to update the visual board:
a. For every place on the game board, put the matching symbol from the board data
b. Get rid of old classes on the spot
c. Put 'x' or 'o' class on the spot based on what's in it
-make a function to see if someone won:
a. List all ways to win (rows, columns, diagonals)
b. For each way to win, see if all places have the same symbol and aren't empty
c. If there's a winning way, mark the winner and put 'win' class on winning places
-Make a function to see if it's a tie (all places are full)
-Make a function to start the game over:
a. Clear the board
b. Make 'X' go first
c. Reset winner and make the board look right
-Make a function for when a place is clicked:
a. Find which place was clicked and its spot number
b. If the place has a symbol or someone already won, don't do anything
c. Put the current player's symbol in the clicked place on the board
d. Make the board look right
e. See if there's a winner or a tie
f. If there's a winner or tie, show a message and start over
g. If no one won or tied, let the next player go
-make each place on the board clickable*/

// Make an empty Tic-Tac-Toe board and set first player to 'X'
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let winner = null;

// Get all the places on the game board
const spots = document.querySelectorAll('.spot');

// REVIEW: Nice, clean helper function that has a clear purpose
// Function to change the current player
function switchPlayer() {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
}

// Function to update the game board
function updateBoard() {
  for (let i = 0; i < spots.length; i++) {
    let spot = spots[i];
    let boardValue = board[i];
    spot.textContent = boardValue;
    spot.classList.remove('x', 'o', 'win');
    
    if (boardValue === 'X') {
      spot.classList.add('x');
    } else if (boardValue === 'O') {
      spot.classList.add('o');
    }
  }
}

// Function to check if there is a winner
function checkWin() {
  const winPositions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < winPositions.length; i++) {
    const [a, b, c] = winPositions[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      winner = board[a];
      
      spots[a].classList.add('win');
      spots[b].classList.add('win');
      spots[c].classList.add('win');
      
      return winner;
    }
  }

  return null;
}

// Function to check if the game is a tie
function checkTie() {
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      return false;
    }
  }

  return true;
}

// Function to restart the game
function restart() {
  for (let i = 0; i < board.length; i++) {
    board[i] = '';
  }

  currentPlayer = 'X';
  winner = null;
  updateBoard();
}

// Function to handle clicks on the game board
function handleClick(event) {
  const spot = event.target;
  const index = spot.getAttribute('id');

  if (board[index] || winner) {
    return;
  }

  board[index] = currentPlayer;
  updateBoard();

  const gameWinner = checkWin();
  if (gameWinner) {
    winner = gameWinner;
  } else if (checkTie()) {
    winner = 'tie';
  }

  if (winner) {
    if (winner === 'tie') {
      alert('It\'s a tie!');
    } else {
      alert(`${winner} wins!`);
    }
    restart();
    return;
  }

  switchPlayer();
}

for (let i = 0; i < spots.length; i++) {
  spots[i].addEventListener('click', handleClick);
}
