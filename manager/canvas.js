var CanvasManager = {};

CanvasManager.canvas = null;
CanvasManager.context = null;
CanvasManager.currentMode = MODES.adding;
CanvasManager.board = null;
CanvasManager.players = [];
CanvasManager.currentPlayer = null;
CanvasManager.currentAddingHero = null;

CanvasManager.init = function(element) {
  this.canvas = document.getElementById(element);
  this.context = this.canvas.getContext("2d");
  this.context.font = "25px Arial";
  this.canvas.textAlign = "center";

  this.players.push(new Player(PLAYERS.PLAYER_ONE));
  this.players.push(new Player(PLAYERS.PLAYER_TWO));
  this.currentPlayer = this.players[0];
  console.log(this.currentPlayer);

  CanvasManager.board = new Board(0, 0, this.canvas.width, canvas.height);
  this.board.init();
  this.board.render(this.context, this.currentPlayer.getId());
};

CanvasManager.addHero = function(hero) {
  this.currentPlayer.prepareHero(hero);
};

CanvasManager.process = function(x, y) {
  this.board.select(x, y);
  switch (this.currentMode) {
    case MODES.adding:
      if (this.currentPlayer.getCurrentHero() != null)
        this.board.addHero(this.currentPlayer.putHero());
      break;

    default:
      break;
  }

  this.board.render(this.context);
};

CanvasManager.render = function() {
  this.board.render(this.context);
};

CanvasManager.changeMode = change => {
  if (change == MODES.END_TURN) {
    // TODO:  change players
    PubSub.publish(Events.ON_PLAYER_CHANGE, this.currentPlayer);
    return;
  }
  CanvasManager.currentMode = change;
  PubSub.publish(Events.ON_MODE_CHANGE, change);
};

CanvasManager.setCurrentAddingHero = hero => {
  console.log(this.currentPlayer);
  // this.currentPlayer.prepareHero(hero);
};

// event listeners
CanvasManager.onStart = function(callback) {
  this.canvas.addEventListener("mousedown", callback);
};

CanvasManager.onProcess = function(callback) {
  this.canvas.addEventListener("mousemove", callback);
};

CanvasManager.onFinish = function(callback) {
  this.canvas.addEventListener("mouseup", callback);
};

// modes manager.
PubSub.subscribe(Events.ON_MODE_CHANGE, mode => {
  $("#currentMode").innerHTML = mode;
});

PubSub.subscribe(Events.ON_PLAYER_CHANGE, player => {
  $("#currentPlayer").innerHTML = player ? "Player A" : "Player B";
});
