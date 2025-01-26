const cells = document.querySelectorAll('td');
let currentPlayer = 'X';
let gameActive = true;

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (cell.textContent !== '' || !gameActive) {
        return;
    }

    cell.textContent = currentPlayer;
    if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
        gameActive = false;
    } else if (checkDraw()) {
        alert('It\'s a draw!');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent && 
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}
