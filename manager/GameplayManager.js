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
  ENDTURN: "endturn"
};

const managers = [MovingManager, AttackManager];

GameplayManager.rounds = 0;
GameplayManager.board;
GameplayManager.players;
GameplayManager.currentPlayer;
GameplayManager.currentModeManager = null;

GameplayManager.init = function(board, players) {
  this.board = board;
  this.players = players;
  this.currentPlayer = this.players[0];
  PubSub.publish(Events.ON_PLAYER_CHANGE, this.currentPlayer);

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
  GameplayModesFactory(mode);
};

GameplayManager.clicked = function(element) {
  if (this.currentModeManager != null)
    if (this.currentModeManager.clicked(element))
      this.currentModeManager = null;
};

GameplayManager.changePlayer = function() {
  if (this.currentPlayer == this.players[0])
    this.currentPlayer = this.players[1];
  else {
    this.currentPlayer = this.players[0];
    PubSub.publish(Events.ROUNDS_CHANGED, ++this.rounds);
  }

  PubSub.publish(Events.ON_PLAYER_CHANGE, this.currentPlayer);
  for (manager of managers) {
    manager.reset();
  }
};

GameplayModesFactory = function(mode) {
  PubSub.publish(Events.ON_MODE_CHANGE, mode);
  if (GameplayManager.currentModeManager != null)
    GameplayManager.currentModeManager.reset();
  switch (mode) {
    case GameplayModes.MOVE:
      GameplayManager.currentModeManager = MovingManager;
      moveButton.disabled = true;
      break;
    case GameplayModes.ATTACK:
      GameplayManager.currentModeManager = AttackManager;
      attackButton.disabled = true;
      break;
    case GameplayModes.HEAL:
      GameplayManager.currentModeManager = HealingManager;
      healButton.disabled = true;
      break;

    case GameplayModes.ENDTURN:
      GameplayManager.currentModeManager = null;
      GameplayManager.changePlayer();
      moveButton.disabled = false;
      attackButton.disabled = false;
      healButton.disabled = false;
      return;
    default:
      return;
  }
  GameplayManager.currentModeManager.init(
    GameplayManager.board,
    GameplayManager.currentPlayer
  );
};
