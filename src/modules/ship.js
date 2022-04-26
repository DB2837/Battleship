class Ship {
  constructor(length) {
    this.coordinate = {};
    this.direction = "";
    this.body = [];

    for (let i = 0; i < length; i++) {
      this.body.push("");
    }
  }

  isSunk() {
    return this.body.every((element) => element.status === "hitAndOccupied");
  }
}

export default Ship;
