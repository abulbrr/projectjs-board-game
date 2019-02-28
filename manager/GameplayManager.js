var GameplayManager = {};

function $(query) {
  return document.querySelector(query);
}

var moveButton = $("#move");
var attackButton = $("#attack");
var healButton = $("#heal");
var endTurnButton = $("#endturn");

GameplayManager = {};

const GameplayModes = {
  MOVE: "move",
  ATTACK: "attack",
  HEAL: "heal",
  ENDTURN: "endTurn"
};

GameplayManager.board;
GameplayManager.players;
GameplayManager.currentPlayer;
GameplayManager.currentModeManager = null;
// GameplayManager.currentMode = null;

GameplayManager.init = function(board, players) {
  this.board = board;
  this.players = players;
  this.currentPlayer = this.players[0];

  moveButton.addEventListener("mousedown", GameplayManager.modeButtonClicked);
  attackButton.addEventListener("mousedown", GameplayManager.modeButtonClicked);
  healButton.addEventListener("mousedown", GameplayManager.modeButtonClicked);
  endTurnButton.addEventListener(
    "mousedown",
    GameplayManager.modeButtonClicked
  );
  this.board.setMode(MODES.NORMAL);
  this.board.reset();
};

GameplayManager.modeButtonClicked = function(e) {
  let mode = e.target.id;

  if (GameplayManager.currentMode == null) {
    GameplayModesFactory(mode);
  }
};

GameplayManager.clicked = function(element) {
  if (this.currentModeManager != null) this.currentModeManager.clicked(element);
};

GameplayManager.updateButtons = function() {};

GameplayManager.changePlayer = function() {
  if (this.currentPlayer == this.players[0])
    this.currentPlayer = this.players[1];
  else this.currentPlayer = this.players[0];
};

GameplayModesFactory = function(mode) {
  switch (mode) {
    case GameplayModes.MOVE:
      GameplayManager.currentModeManager = MovingManager;
      break;
    case GameplayModes.ATTACK:
      GameplayManager.currentModeManager = AttackManager;

    default:
      break;
  }
  GameplayManager.currentModeManager.init(
    GameplayManager.board,
    GameplayManager.currentPlayer
  );
};
