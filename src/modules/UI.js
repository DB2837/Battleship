class UI {
  static generateSquare() {
    const square = document.createElement("div");
    square.classList.add("square-item");

    /* square.addEventListener(
      "onmouseover",
      (e) => {
        console.log(e.target);
      },
      { capture: true }
    ); */

    return square;
  }

  static createShip(length) {
    const ship = document.createElement("div");
    ship.setAttribute("draggable", true);
    ship.classList.add("ship-item");
    ship.classList.add(`number-${length}`);

    for (let i = 0; i < length; i++) {
      const square = UI.generateSquare();
      square.dataset.index = i;
      /*  square.setAttribute("draggable", true); */
      ship.appendChild(square);
    }

    function dragStart(e) {
      console.log("dragStart");
      console.log(e.target);
      setTimeout(() => {
        this.classList.add("invisible");
      }, 0);
    }

    function dragEnd() {
      console.log("dragEnd");
      this.classList.remove("invisible");
    }

    ship.addEventListener("dragstart", dragStart);
    ship.addEventListener("dragend", dragEnd);

    return ship;
  }

  static createGrid(dim) {
    const board = document.createElement("section");
    board.classList.add("game-board");

    const root = document.documentElement;
    root.style.setProperty("--columnsTimeRowNumber", dim);

    for (let i = 0; i < dim ** 2; i++) {
      const square = UI.generateSquare();
      square.dataset.id = i + 1;
      board.appendChild(square);
    }

    /* function dragOver(e) {
      e.preventDefault();
      console.log("dragOver");
    }

    function dragEnter(e) {
      e.preventDefault();
      console.log("dragEnter");
    }

    function dragLeave() {
      console.log("dragLeave");
    }

    function dragDrop(e) {
      console.log("dragDrop");
      console.log(e.target);
    }

    board.addEventListener("dragover", dragOver);
    board.addEventListener("dragenter", dragEnter);
    board.addEventListener("dragleave", dragLeave);
    board.addEventListener("drop", dragDrop);
 */
    return board;
  }

  static askShipPosition(length) {
    const x = +prompt(
      `insert row coordinate (0-9) for ship whit ${length} squares length : `,
      ""
    );
    const y = +prompt(
      `insert column coordinate (0-9) for ship whit ${length} squares length: `,
      ""
    );

    let direction = prompt(
      'insert "1" to place the ship horizontally, "0" to place it vertically: ',
      ""
    );

    if (direction === "0") direction = "vertical";
    direction = "horizontal";

    const coordinate = { x, y };

    return { direction, coordinate };
  }

  /* static createShip(board, length) {
    const shipInfo = UI.askShipPosition(length);
    console.log(shipInfo.direction);
    console.log(shipInfo.coordinate);
    console.log(length);
    board.placeShip(shipInfo.direction, shipInfo.coordinate, length);
  } */

  static renderShipsOnGrid(board) {
    board.shipContainer.forEach((ship) => {
      for (let i = 0; i < ship.body.length; i++) {
        const square = document.querySelector(`[data-id='${ship.body[i].id}']`);
        square.style.backgroundColor = "green";
      }
    });
  }
}

export default UI;
