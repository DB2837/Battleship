class Square {
  static id = 0;
  static status = { empty: "empty", occupied: "occupied", hit: "hit" };

  constructor() {
    this.status = Square.status.empty;
    this.id = ++Square.id;
  }

  setStatusOccupied() {
    this.status = Square.status.occupied;
  }

  setStatusHit() {
    this.status = Square.status.hit;
  }
}

export default Square;
