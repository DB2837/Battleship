import Ship from "./ship";
import Square from "./square";

class Gameboard {
  static id = 0;
  constructor(dimension) {
    this.id = Gameboard.id++;
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
      return false;
    if (
      direction === "vertical" &&
      coordinate.x + shipLength > this.board.length
    )
      return false;
    if (
      coordinate.x < 0 ||
      coordinate.y < 0 ||
      coordinate.x > this.dimension - 1 ||
      coordinate.y > this.dimension - 1
    )
      return false;

    switch (direction) {
      case "horizontal": {
        for (let i = 0; i < shipLength; i++) {
          if (
            this.board[coordinate.x][coordinate.y + i].status === "occupied"
          ) {
            return false;
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
        return true;
      }

      case "vertical": {
        for (let i = 0; i < shipLength; i++) {
          if (
            this.board[coordinate.x + i][coordinate.y].status === "occupied"
          ) {
            return false;
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
        return true;
      }
    }
  }

  emptyShipContainer() {
    this.shipContainer = [];
  }

  placeRandomShip(ship) {
    const x = Math.floor(Math.random() * (this.dimension + 1));
    const y = Math.floor(Math.random() * (this.dimension + 1));
    const vertical = Math.random() > 0.5;
    ship.coordinate = { x, y };
    if (vertical) {
      ship.direction = "vertical";
    } else {
      ship.direction = "horizontal";
    }

    const isPlaced = this.placeShip(
      ship.direction,
      ship.coordinate,
      ship.body.length
    );

    if (!isPlaced) {
      this.placeRandomShip(ship);
    }
  }

  placeRandomFleet(shipsArray) {
    for (const ship of shipsArray) {
      this.placeRandomShip(ship);
    }
  }

  reciveAttack(coordinate) {
    if (
      this.board[coordinate.x][coordinate.y].status === "hit" ||
      this.board[coordinate.x][coordinate.y].status === "hitAndOccupied"
    )
      return;
    if (this.board[coordinate.x][coordinate.y].status === "occupied") {
      this.board[coordinate.x][coordinate.y].setStatusHitAndOccupied();
      this.shipContainer.forEach((ship, index) => {
        if (ship.isSunk()) {
          this.shipContainer.splice(index, 1);
        }
      });
    } else this.board[coordinate.x][coordinate.y].setStatusHit();
  }
}

export default Gameboard;
