const statusDisplay = document.querySelector(".game-status");

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

let bot = "O";
let human = "X";

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function botPlays() {
  while (currentPlayer === bot && gameActive) {
    let availableChoices = [];
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] !== "X" && gameState[i] !== "O") {
        availableChoices.push(i);
      }
    }
    let canWin = false;
    let canDeny = false;
    let winChoice;
    let denyChoice;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];

      if (a === bot && b === bot && c !== human) {
        winChoice = winCondition[2];
        canWin = true;

        console.log(`can pick winning choice`);

        break;
      } else if (b === bot && c === bot && a !== human) {
        winChoice = winCondition[0];
        canWin = true;

        console.log(`can pick winning choice`);

        break;
      } else if (a === bot && c === bot && b !== human) {
        winChoice = winCondition[1];
        canWin = true;

        console.log(`can pick winning choice`);

        break;
      }
      if (!canWin) {
        if (a === human && b === human && c !== bot) {
          denyChoice = winCondition[2];
          canDeny = true;

          console.log(`can deny the player`);

          break;
        } else if (b === human && c === human && a !== bot) {
          denyChoice = winCondition[0];
          canDeny = true;

          console.log(`can deny the player`);

          break;
        } else if (a === human && c === human && b !== bot) {
          denyChoice = winCondition[1];
          canDeny = true;

          console.log(`can deny the player`);

          break;
        }
      }
    }

    if (canWin) {
      console.log(`picked the winning choice`);
      document.querySelector(`[data-cell-index="${winChoice}"`).click();
    } else if (canDeny) {
      console.log(`denied the player from winning`);
      document.querySelector(`[data-cell-index="${denyChoice}"`).click();
    } else {
      choice =
        availableChoices[Math.floor(Math.random() * availableChoices.length)];

      console.log(`available choices: ${availableChoices}`);
      console.log(`picked ${choice}`);

      document.querySelector(`[data-cell-index="${choice}"`).click();
    }
  }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
  botPlays();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;

  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game-restart")
  .addEventListener("click", handleRestartGame);
