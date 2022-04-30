import "./style.css";
import Square from "./modules/square";
import Ship from "./modules/ship";
import Gameboard from "./modules/gameboard";
import Player from "./modules/player";
import UI from "./modules/UI";
import dragNdrop from "./modules/dragNdrop";

const gridsContainer = document.querySelector(".grids-container");
const shipsContainer = document.querySelector(".ships-container");
const container = document.querySelector(".container");
const startGameBtn = document.querySelector("#start-game");
const startNewGame = document.querySelector("#new-game");
const autoPlaceFleet = document.querySelector("#auto-place");
const overlay = document.querySelector(".overlay");

const gridPlayerOne = UI.createGrid(10);
const gridPlayerTwo = UI.createGrid(10);
gridsContainer.appendChild(gridPlayerOne);
gridsContainer.appendChild(gridPlayerTwo);
gridPlayerTwo.style.display = "none";
/* startGameBtn.style.display = "none"; */

const ship1 = UI.createShip(5);
const ship2 = UI.createShip(4);
const ship3 = UI.createShip(3);
const ship4 = UI.createShip(3);
const ship5 = UI.createShip(2);

const PlayerOneBoard = new Gameboard(10);
const PlayerTwoBoard = new Gameboard(10);

const ships = [ship1, ship2, ship3, ship4, ship5];

dragNdrop(ships, gridPlayerOne, PlayerOneBoard);

UI.inizializeShipContainer(ships, container);

const shipItems = document.querySelectorAll(".ship-item-horizontal");
const directionBtn = document.querySelector("#direction");
directionBtn.addEventListener("click", () => {
  shipItems.forEach((shipItem) => {
    shipItem.classList.toggle("ship-item-horizontal");
    shipItem.classList.toggle("ship-item-vertical");

    if (shipItem.classList.contains("ship-item-vertical")) {
      shipItem.dataset.direction = "vertical";
    } else shipItem.dataset.direction = "horizontal";
  });

  container.classList.toggle("container-horizontal");
  container.classList.toggle("container-vertical");
});

autoPlaceFleet.addEventListener("click", (e) => {
  UI.initializeBoard(PlayerOneBoard, gridPlayerOne);
  shipsContainer.style.display = "none";
  startGameBtn.style.display = "block";
  container.innerHTML = "";
});

startGameBtn.addEventListener("click", (e) => {
  if (container.children.length !== 0) return;
  UI.initializeBoard(PlayerTwoBoard, gridPlayerTwo);
  e.target.style.display = "none";
  shipsContainer.style.display = "none";
  gridPlayerTwo.style.display = "grid";
});

const playerOne = new Player();
const playerTwo = new Player();
playerTwo.setPlayerToAI();
UI.setAIpossibleChoices(PlayerOneBoard, playerTwo);

gridPlayerTwo.addEventListener("click", (e) => {
  if (!playerOne.isMyTurn || e.target.dataset.isEmpty === "not-empty") return;

  const coordinate = (e.target.dataset.id / 10).toString();
  const x = +coordinate[0];
  const y = +coordinate[2] ? (undefined ? 0 : +coordinate[2]) : 0;
  e.target.dataset.isEmpty = "not-empty";

  playerOne.attack(PlayerTwoBoard, { x, y });
  UI.renderVisualEffects(PlayerTwoBoard, gridPlayerTwo);
  const winner = UI.checkForWinner(PlayerOneBoard, PlayerTwoBoard, overlay);
  if (winner) return;

  setTimeout(() => {
    playerTwo.attack(PlayerOneBoard);
    UI.renderVisualEffects(PlayerOneBoard, gridPlayerOne);
    UI.checkForWinner(PlayerOneBoard, PlayerTwoBoard, overlay);

    playerOne.switchTurn();
    playerTwo.switchTurn();
  }, 900);
});

startNewGame.addEventListener("click", () => {
  overlay.style.display = "none";
  shipsContainer.style.display = "grid";
  startGameBtn.style.display = "block";
  UI.startNewGame(
    PlayerOneBoard,
    PlayerTwoBoard,
    gridPlayerOne,
    gridPlayerTwo,
    container
  );
  UI.inizializeShipContainer(ships, container);
  playerOne.isMyTurn = true;
});
