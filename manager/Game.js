GameManager = {};

GameManager.players = [];
GameManager.canvas;

GameManager.currentModeManager;
GameManager.currentPlayer;

GameManager.mode = MODES.ADDING;

GameManager.init = function(width, height) {
  this.canvas = CanvasManager;
  this.canvas.init("canvas");
  this.canvas.onStart(this.clicked);
  this.subscribe();

  this.board = this.canvas.getBoard();

  this.players.push(new Player(PLAYERS.PLAYER_ONE, "red", [0, 1]));
  this.players.push(new Player(PLAYERS.PLAYER_TWO, "green", [5, 6]));
  this.players.forEach(player => player.createHeroes());
  this.currentPlayer = this.players[0];

  ManagersFactory(MODES.ADDING);

  //   PubSub.publish(Events.ON_HEROES_COUNT_CHANGE);
};

GameManager.subscribe = function() {
  PubSub.subscribe(Events.ADDING_FINISHED, () => {
    ManagersFactory(MODES.GAMEPLAY);
    this.canvas.render();
  });

  PubSub.subscribe(Events.ON_PLAYER_CHANGE, () => {
    console.log("player changed");
    GameManager.canvas.render();
  });
};

GameManager.clicked = function(e) {
  var x = e.layerX;
  var y = e.layerY;
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
