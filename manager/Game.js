GameManager = {};

GameManager.players = [];
GameManager.canvas;

GameManager.currentModeManager;
GameManager.currentPlayer;

GameManager.mode = MODES.ADDING;

GameManager.restart = function() {
  this.players = [];

  this.currentPlayer = null;

  AddingManager.restart();
};

GameManager.init = function(width, height) {
  this.canvas = CanvasManager;
  this.canvas.init("canvas");
  this.canvas.onStart(this.clicked);
  this.subscribe();

  this.board = this.canvas.getBoard();

  this.players.push(new Player(PLAYERS.PLAYER_A, "red", [0, 1]));
  this.players.push(new Player(PLAYERS.PLAYER_B, "green", [5, 6]));
  this.players.forEach(player => player.createHeroes());
  this.currentPlayer = this.players[0];

  ManagersFactory(MODES.ADDING);
};

GameManager.subscribe = function() {
  PubSub.subscribe(Events.ADDING_FINISHED, () => {
    ManagersFactory(MODES.GAMEPLAY);
    this.canvas.render();
  });

  PubSub.subscribe(Events.ON_PLAYER_CHANGE, () => {
    GameManager.canvas.render();
  });
};
GameManager.getPlayersData = function() {
  return this.currentModeManager.players;
};

GameManager.clicked = function(e) {
  var x = e.layerX;
  var y = e.layerY;
  let selectedSquare = GameManager.canvas.getSelected(x, y);
  if (selectedSquare.hasHero() && !selectedSquare.hero.isObstacle) {
    PubSub.publish(Events.CURRENT_HERO_CHANGED, selectedSquare.hero);
    PubSub.publish(
      Events.CURRENT_HERO_HEALTH_CHANGED,
      selectedSquare.hero.health
    );
  }
  GameManager.currentModeManager.clicked(GameManager.canvas.getSelected(x, y));
  GameManager.canvas.render();
};

ManagersFactory = function(mode) {
  switch (mode) {
    case MODES.ADDING:
      GameManager.currentModeManager = AddingManager;
      break;
    case MODES.GAMEPLAY:
      GameManager.currentModeManager = GameplayManager;
      break;
    default:
      break;
  }

  GameManager.currentModeManager.init(GameManager.board, GameManager.players);
};
