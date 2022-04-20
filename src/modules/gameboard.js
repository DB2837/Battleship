import Ship from "./ship";
import Square from "./square";

class Gameboard {
  constructor(dimension) {
    this.dimension = dimension;
    this.shipContainer = [];
    this.board = [];
    for (let i = 0; i < dimension; i++) {
      this.board[i] = [];
      for (let j = 0; j < dimension; j++) {
        this.board[i][j] = new Square();
      }
    }
  }

  placeShip(direction, coordinate, shipLength) {
    if (
      direction === "horizontal" &&
      coordinate.y + shipLength > this.board.length
    )
      return;
    if (
      direction === "vertical" &&
      coordinate.x + shipLength > this.board.length
    )
      return;
    if (
      coordinate.x < 0 ||
      coordinate.y < 0 ||
      coordinate.x > this.dimension - 1 ||
      coordinate.y > this.dimension - 1
    )
      return;

    switch (direction) {
      case "horizontal":
        {
          for (let i = 0; i < shipLength; i++) {
            if (
              this.board[coordinate.x][coordinate.y + i].status === "occupied"
            ) {
              return;
            }
          }

          const ship = new Ship(shipLength);
          for (let i = 0; i < shipLength; i++) {
            ship.body[i] = this.board[coordinate.x][coordinate.y + i];
            ship.body[i].setStatusOccupied();
          }

          ship.coordinate = coordinate;
          ship.direction = direction;
          this.shipContainer.push(ship);
        }

        break;
      case "vertical":
        {
          for (let i = 0; i < shipLength; i++) {
            if (
              this.board[coordinate.x + i][coordinate.y].status === "occupied"
            ) {
              return;
            }
          }

          const ship = new Ship(shipLength);
          for (let i = 0; i < shipLength; i++) {
            ship.body[i] = this.board[coordinate.x + i][coordinate.y];
            ship.body[i].setStatusOccupied();
          }
          ship.coordinate = coordinate;
          ship.direction = direction;
          this.shipContainer.push(ship);
        }

        break;
    }
  }

  placeShipsRandom() {}

  reciveAttack(coordinate) {
    if (this.board[coordinate.x][coordinate.y].status === "hit") return;
    this.board[coordinate.x][coordinate.y].setStatusHit();
    this.shipContainer.forEach((ship, index) => {
      if (ship.isSunk()) {
        this.shipContainer.splice(index, 1);
      }
    });
  }
}

export default Gameboard;
