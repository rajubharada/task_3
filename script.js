// Variables for game state
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("resetBtn");

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Update the game status message
function updateStatus(message) {
  statusDisplay.textContent = message;
}

// Check for a win or a draw
function checkGameResult() {
  let roundWon = false;

  // Check each winning condition
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    updateStatus(`Player ${currentPlayer} Wins!`);
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    updateStatus("It's a Draw!");
    gameActive = false;
    return;
  }

  // Switch to the next player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`Player ${currentPlayer}'s Turn`);
}

// Handle cell click
function handleCellClick(event) {
  const cellIndex = event.target.getAttribute("data-index");

  // If cell is already taken or game is inactive, ignore the click
  if (board[cellIndex] !== "" || !gameActive) {
    return;
  }

  // Update board state and UI
  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  // Check the game result
  checkGameResult();
}

// Reset the game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => (cell.textContent = ""));
  updateStatus("Player X's Turn");
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

// Initial status
updateStatus("Player X's Turn");
