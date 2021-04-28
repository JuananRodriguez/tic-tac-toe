const PLAYER1 = {
  name: "PLAYER1",
  markClassName: "circle-mark",
};

const PLAYER2 = {
  name: "PLAYER2",
  markClassName: "square-mark",
};

let markPositions = [[], [], []];
let currentPlayer;
let cellsInDOM;
const totalNumNeed = 3;

function setEvents() {
  cellsInDOM = document.getElementsByClassName("cell");
  for (let i = 0; cellsInDOM.length > i; i++) {
    const col = Math.floor(i / totalNumNeed);
    const row = i - totalNumNeed * col;
    markPositions[col][row] = undefined;
    cellsInDOM[i].addEventListener("click", () =>
      selectCellForCurrentPlayer({ cellNode: cellsInDOM[i], col, row })
    );
  }
}

function createCurrentPlayerMarkNode() {
  var markContainer = document.createElement("DIV");
  markContainer.classList.add(currentPlayer.markClassName);
  return markContainer;
}

function selectCellForCurrentPlayer({ cellNode, col, row }) {
  if (!cellNode.classList.contains("disabled")) {
    cellNode.classList.add("disabled");
    const markNode = createCurrentPlayerMarkNode();
    cellNode.appendChild(markNode);
    markPositions[col][row] = currentPlayer.name;
    calcResult();
    changePlayerTurn();
  }
}

function calcResult() {
  let matches = 0;
  const currentPlayerValue = currentPlayer.name;

  function checkAdjacentCells({ colIndex, rowIndex, value, direction }) {
    if (
      (direction === "vertical" || !direction) &&
      markPositions[colIndex + 1] &&
      markPositions[colIndex + 1][rowIndex] === currentPlayerValue
    ) {
      matches++;
      checkAdjacentCells({
        colIndex: colIndex + 1,
        rowIndex,
        value,
        direction: "vertical",
      });
    } else if (
      (direction === "horizontal" || !direction) &&
      markPositions[colIndex] &&
      markPositions[colIndex][rowIndex + 1] === currentPlayerValue
    ) {
      matches++;
      checkAdjacentCells({
        colIndex,
        rowIndex: rowIndex + 1,
        value,
        direction: "horizontal",
      });
    } else if (
      (direction === "diagonal-right" || !direction) &&
      markPositions[colIndex + 1] &&
      markPositions[colIndex + 1][rowIndex + 1] === currentPlayerValue
    ) {
      matches++;
      checkAdjacentCells({
        colIndex: colIndex + 1,
        rowIndex: rowIndex + 1,
        value,
        direction: "diagonal-right",
      });
    } else if (
      (direction === "diagonal-left" || !direction) &&
      markPositions[colIndex + 1] &&
      markPositions[colIndex + 1][rowIndex - 1] === currentPlayerValue
    ) {
      matches++;
      checkAdjacentCells({
        colIndex: colIndex + 1,
        rowIndex: rowIndex - 1,
        value,
        direction: "diagonal-left",
      });
    }
  }

  const currentPlayerIsWinner = markPositions.some((col, colIndex) => {
    return col.some((cell, rowIndex) => {
      if (markPositions[colIndex][rowIndex] === currentPlayerValue) {
        matches = 1;
        checkAdjacentCells({ colIndex, rowIndex, value: currentPlayerValue });
        return matches === totalNumNeed;
      }
    });
  });

  if (currentPlayerIsWinner) {
    alert("Ha ganado el jugador", currentPlayer.name);
  }

  if (cellsInDOM.length === document.querySelectorAll(".cell.disabled").length)
    alert("Empate");
}

function changePlayerTurn() {
  currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
}

function initGame() {
  currentPlayer = PLAYER1;
  setEvents();
}

document.addEventListener("DOMContentLoaded", initGame);
