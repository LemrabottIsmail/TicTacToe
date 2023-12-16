const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartButton");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let running = false;

let startTime;
let timerInterval;

function startTimer() {
  startTime = new Date().getTime();
  const element = document.getElementById("timer");
  console.log(element.querySelector("#time"));
  timerInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const minutes = Math.floor(elapsedTime / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    element.querySelector("#time").innerHTML = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  startTimer();
  statusText.textContent = `${currPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  } else {
    updateCell(this, cellIndex);
    checkWinner();
  }
}

function updateCell(cell, index) {
  options[index] = currPlayer;
  cell.textContent = currPlayer;
}

function changePlayer() {
  console.log("changing player");
  currPlayer = currPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currPlayer} wins`;
    stopTimer();
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    stopTimer();
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  startTimer();
  options = ["", "", "", "", "", "", "", "", ""];
  currPlayer = "X";
  cells.forEach((cell) => (cell.textContent = ""));
  statusText.textContent = `${currPlayer}'s turn`;
  running = true;
}
