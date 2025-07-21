const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let board = [];
const gameBoard = document.getElementById('game-board');
const status = document.getElementById('status');

function createBoard() {
  gameBoard.innerHTML = '';
  board = [];

  for (let row = 0; row < ROWS; row++) {
    const rowArr = [];
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      gameBoard.appendChild(cell);
      rowArr.push(null);
    }
    board.push(rowArr);
  }

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.addEventListener('click', handleClick));
}

function handleClick(e) {
  const col = parseInt(e.target.dataset.col);
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
      cell.classList.add(currentPlayer);

      if (checkWin(row, col)) {
        status.innerHTML = `🏆 <strong>${capitalize(currentPlayer)} Wins!</strong>`;
        disableBoard();
      } else if (isBoardFull()) {
        status.innerHTML = `⚖️ It's a Draw!`;
      } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        status.innerHTML = currentPlayer === 'red' ? '🔴 Red\'s Turn' : '🟡 Yellow\'s Turn';
      }
      break;
    }
  }
}

function checkWin(row, col) {
  return (
    checkDirection(row, col, -1, 0) + checkDirection(row, col, 1, 0) > 2 ||
    checkDirection(row, col, 0, -1) + checkDirection(row, col, 0, 1) > 2 ||
    checkDirection(row, col, -1, -1) + checkDirection(row, col, 1, 1) > 2 ||
    checkDirection(row, col, -1, 1) + checkDirection(row, col, 1, -1) > 2
  );
}

function checkDirection(row, col, rowDir, colDir) {
  let count = 0;
  let r = row + rowDir;
  let c = col + colDir;
  while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
    count++;
    r += rowDir;
    c += colDir;
  }
  return count;
}

function isBoardFull() {
  return board.every(row => row.every(cell => cell !== null));
}

function disableBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.replaceWith(cell.cloneNode(true))); // removes listeners
}

function resetGame() {
  currentPlayer = 'red';
  status.innerHTML = '🔴 Red\'s Turn';
  createBoard();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

createBoard();
