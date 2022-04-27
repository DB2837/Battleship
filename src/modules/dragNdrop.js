import UI from "./UI";

function dragNdrop(ships, gameboard, board) {
  let index = 0;
  let myShip;

  ships.forEach((ship) => {
    ship.addEventListener("dragstart", () => {
      setTimeout(() => {
        myShip.classList.remove("invisible");
        ship.classList.add("invisible");
      }, 0);
    });
    ship.addEventListener("dragend", (e) => {
      myShip.classList.remove("invisible");
    });
    ship.addEventListener("mousedown", (e) => {
      index = +e.target.dataset.index;
      myShip = ship;
    });
  });

  gameboard.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  gameboard.addEventListener("dragenter", (e) => {
    e.preventDefault();
  });
  gameboard.addEventListener("drop", (e) => {
    /*  autoPlaceBtn.style.display = "none"; */
    console.log(myShip);
    let mulitply = 1;
    if (myShip.dataset.direction === "vertical") {
      mulitply = board.dimension;
    }

    let coordinate = (
      gameboard.children[e.target.dataset.id - mulitply * index].dataset.id / 10
    ).toString();

    const x = +coordinate[0];
    const y = +coordinate[2] ? (undefined ? 0 : +coordinate[2]) : 0;

    coordinate = { x, y };

    if (
      board.placeShip(
        myShip.dataset.direction,
        coordinate,
        myShip.children.length
      )
    ) {
      myShip.remove();
    }
    UI.renderVisualEffects(board, gameboard);
  });
}

export default dragNdrop;
