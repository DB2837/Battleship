class Player {
  static type = { human: "human", AI: "AI" };

  constructor() {
    this.playerType = Player.type.human;
    this.isMyTurn = true;
  }

  switchTurn() {
    this.isMyTurn = !this.isMyTurn;
  }

  setPlayerToAI() {
    this.playerType = Player.type.AI;
  }

  attack(gameboard, coordinate) {
    if (this.playerType === "human" && this.isMyTurn) {
      this.switchTurn();
      gameboard.reciveAttack(coordinate);
      return;
    }

    if (this.playerType === "AI" && this.isMyTurn) {
      this.switchTurn();

      const randomSquare = Math.floor(
        Math.random() * (this.freeSquares.length - 1)
      );

      const selectedSquare = this.freeSquares.splice(randomSquare, 1);

      if (selectedSquare[0].id > 9) {
        const x = +selectedSquare[0].id.toString()[0];
        const y = +selectedSquare[0].id.toString()[1];

        gameboard.reciveAttack({ x, y });
      } else {
        const x = 0;
        const y = +selectedSquare[0].id.toString()[0];

        gameboard.reciveAttack({ x, y });
      }

      return;
    }
  }
}

export default Player;
