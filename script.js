const statusDisplay = document.querySelector(".game-status");

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

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
  let canWin = false;
  while (currentPlayer === "O" && gameActive) {
    let avaliableChoices = [];
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] !== "X" && gameState[i] !== "O") {
        avaliableChoices.push(i);
      }
    }
    let winChoice;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];

      if (a === "O" && b === "O" && c !== "X") {
        winChoice = winCondition[2];
        canWin = true;
        /*
        console.log(winCondition);
        console.log(`winning choice avaliable picked ${choice}`);
        */
        break;
      } else if (b === "O" && c === "O" && a !== "X") {
        winChoice = winCondition[0];
        canWin = true;
        /*
        console.log(winCondition);
        console.log(`winning choice avaliable picked ${choice}`);
        */
        break;
      } else if (a === "O" && c === "O" && b !== "X") {
        winChoice = winCondition[1];
        canWin = true;
        /*
        console.log(winCondition);
        console.log(`winning choice avaliable picked ${choice}`);
        */
        break;
      }
      //console.log("no winning choice");
    }

    if (canWin) {
      document.querySelector(`[data-cell-index="${winChoice}"`).click();
    } else {
      choice =
        avaliableChoices[Math.floor(Math.random() * avaliableChoices.length)];
      console.log(avaliableChoices);
      console.log(choice);
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
