import Square from "./square";
import Ship from "./ship";

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
      square.style.backgroundColor = "mediumspringgreen";
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
          ].style.backgroundColor = "mediumspringgreen";
        }

        if (gameboard.board[i][j].status === "empty") {
          DOMboard.children[
            +[i.toString() + j.toString()]
          ].style.backgroundColor = "white";
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

  static emptyBoard(gameboard, DOMboard) {
    for (let i = 0; i < gameboard.dimension; i++) {
      for (let j = 0; j < gameboard.dimension; j++) {
        gameboard.board[i][j].status = "empty";

        delete DOMboard.children[+[i.toString() + j.toString()]].dataset
          .isEmpty;
      }
    }
  }

  static inizializeShipContainer(shipsArray, container) {
    for (let i = 0; i < container.children.length; i++) {
      container.children[i].remove();
    }

    for (let i = 0; i < shipsArray.length; i++) {
      container.appendChild(shipsArray[i]);
    }
  }

  static initializeBoard(playerBoard, playerDOMboard) {
    UI.emptyBoard(playerBoard, playerDOMboard);

    const myShip1 = new Ship(2);
    const myShip2 = new Ship(3);
    const myShip3 = new Ship(3);
    const myShip4 = new Ship(4);
    const myShip5 = new Ship(5);

    const myShips = [myShip1, myShip2, myShip3, myShip4, myShip5];

    playerBoard.placeRandomFleet(myShips);
    UI.renderVisualEffects(playerBoard, playerDOMboard);
  }

  static startNewGame(
    gameboardOne,
    gameboardTwo,
    gridPlayerOne,
    gridPlayerTwo,
    shipsContainer
  ) {
    gameboardOne.emptyShipContainer();
    gameboardTwo.emptyShipContainer();

    gridPlayerTwo.style.display = "none";
    UI.emptyBoard(gameboardOne, gridPlayerOne);
    UI.emptyBoard(gameboardTwo, gridPlayerTwo);
    UI.renderVisualEffects(gameboardOne, gridPlayerOne);
    UI.renderVisualEffects(gameboardTwo, gridPlayerTwo);
    shipsContainer.parentElement.style.display = "grid";

    for (let i = 0; i < shipsContainer.children.length; i++) {
      shipsContainer.children[i].classList.remove("invisible");
    }
  }

  static checkForWinner(gameboardOne, gameboardTwo, overlay) {
    if (gameboardOne.shipContainer.length === 0) {
      overlay.style.display = "flex";
      overlay.querySelector("h2").textContent = "";
      overlay.querySelector("h2").textContent = "You Lose!";

      return true;
    } else if (gameboardTwo.shipContainer.length === 0) {
      overlay.style.display = "flex";
      overlay.querySelector("h2").textContent = "";
      overlay.querySelector("h2").textContent = "You Win!";

      return true;
    }

    return false;
  }
}

export default UI;
