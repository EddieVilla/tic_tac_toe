const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let totNumCells = 16;
let gameState = Array(totNumCells).fill(null);

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute('data-index');

  if (gameState[cellIndex] || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== null)) {
    message.textContent = 'It\'s a tie!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameState = Array(totNumCells).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = `Player ${currentPlayer}'s turn`;
  board.innerHTML = '';
  createBoard();
}

function createBoard() {
  for (let i = 0; i < totNumCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
}

resetButton.addEventListener('click', resetGame);

// Initialize game
resetGame();
