import Square from "./square";

class UI {
  static boardCounter = 0;

  static generateSquare() {
    const square = document.createElement("div");
    square.classList.add("square-item");

    return square;
  }

  static createShip(length) {
    const ship = document.createElement("div");
    ship.dataset.direction = "horizontal";
    ship.setAttribute("draggable", true);
    ship.classList.add("ship-item-horizontal");

    for (let i = 0; i < length; i++) {
      const square = UI.generateSquare();
      square.dataset.index = i;
      square.style.backgroundColor = "green";
      ship.appendChild(square);
    }

    return ship;
  }

  static createGrid(dim) {
    const board = document.createElement("section");
    board.dataset.id = UI.boardCounter;
    board.classList.add("game-board");

    const root = document.documentElement;
    root.style.setProperty("--columnsTimeRowNumber", dim);

    for (let i = 0; i < dim ** 2; i++) {
      const square = UI.generateSquare();
      square.dataset.id = i;
      square.dataset.board = UI.boardCounter;
      board.appendChild(square);
    }

    ++UI.boardCounter;

    return board;
  }

  static setAIpossibleChoices(gameboard, AIplayer) {
    let freeSquares = [];
    for (let i = 0; i < gameboard.dimension; i++) {
      for (let j = 0; j < gameboard.dimension; j++) {
        freeSquares.push(gameboard.board[i][j]);
      }
    }

    AIplayer.freeSquares = freeSquares;
  }

  static renderVisualEffects(gameboard, DOMboard) {
    for (let i = 0; i < gameboard.dimension; i++) {
      for (let j = 0; j < gameboard.dimension; j++) {
        if (gameboard.board[i][j].status === "occupied" && gameboard.id === 1) {
          DOMboard.children[
            +[i.toString() + j.toString()]
          ].style.backgroundColor = "white";
        }
        if (gameboard.board[i][j].status === "occupied" && gameboard.id === 0) {
          DOMboard.children[
            +[i.toString() + j.toString()]
          ].style.backgroundColor = "green";
        }

        if (gameboard.board[i][j].status === "hit") {
          DOMboard.children[
            +[i.toString() + j.toString()]
          ].style.backgroundColor = "gray";
        }
        if (gameboard.board[i][j].status === "hitAndOccupied") {
          DOMboard.children[
            +[i.toString() + j.toString()]
          ].style.backgroundColor = "red";
        }
      }
    }
  }
}

export default UI;
