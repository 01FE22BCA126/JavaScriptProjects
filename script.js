const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'red'; 
let gameBoard = Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null));

function createBoard() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            board.appendChild(cell);
        }
    }
}

function resetBoard() {
    currentPlayer = 'red';
    gameBoard = Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null));
    board.innerHTML = ''; // Clear the board
    createBoard();
    message.innerText = ''; // Clear the message
    board.addEventListener('click', handleClick); // Re-enable click after reset
}

function checkWin() {
    // Check rows
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row][col + 1] === currentPlayer &&
                gameBoard[row][col + 2] === currentPlayer &&
                gameBoard[row][col + 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check columns
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 7; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row + 1][col] === currentPlayer &&
                gameBoard[row + 2][col] === currentPlayer &&
                gameBoard[row + 3][col] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check diagonals (top-left to bottom-right)
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row + 1][col + 1] === currentPlayer &&
                gameBoard[row + 2][col + 2] === currentPlayer &&
                gameBoard[row + 3][col + 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    // Check diagonals (bottom-left to top-right)
    for (let row = 3; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                gameBoard[row][col] === currentPlayer &&
                gameBoard[row - 1][col + 1] === currentPlayer &&
                gameBoard[row - 2][col + 2] === currentPlayer &&
                gameBoard[row - 3][col + 3] === currentPlayer
            ) {
                return true;
            }
        }
    }

    return false;
}

function checkDraw() {
    return gameBoard.every(row => row.every(cell => cell !== null));
}

function handleClick(event) {
    const col = event.target.dataset.col;
    if (col === undefined) return;

    const row = findAvailableRow(parseInt(col, 10));
    if (row === -1) return;

    // Update the game state with the current player's color
    gameBoard[row][col] = currentPlayer;

    // Color the correct cell in the lowest available row
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    cell.style.backgroundColor = currentPlayer;

    // Check if the current move wins the game
    if (checkWin()) {
        message.innerText = `${currentPlayer.toUpperCase()} wins!`;
        board.removeEventListener('click', handleClick); // Disable further clicks
    } else if (checkDraw()) {
        message.innerText = 'It\'s a draw!';
        board.removeEventListener('click', handleClick); // Disable further clicks
    } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red'; // Switch player
    }
}

function findAvailableRow(col) {
    for (let row = 5; row >= 0; row--) {
        if (gameBoard[row][col] === null) {
            return row; // Return the first empty row from the bottom
        }
    }
    return -1; // Return -1 if column is full
}

// Initialize the game
createBoard();
board.addEventListener('click', handleClick);
resetBtn.addEventListener('click', resetBoard);
