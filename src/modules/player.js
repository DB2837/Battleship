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
      gameboard.reciveAttack(coordinate);
      return;
    }
  }
}

export default Player;
