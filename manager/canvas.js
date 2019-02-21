var CanvasManager = {};

CanvasManager.canvas = null;
CanvasManager.context = null;
CanvasManager.mode = MODES.adding;
CanvasManager.board = null;
CanvasManager.players = [];
CanvasManager.currentPlayer = null;
CanvasManager.init = function(element) {
  this.canvas = document.getElementById(element);
  this.context = this.canvas.getContext("2d");
  this.context.font = "25px Arial";
  this.canvas.textAlign = "center";

  this.players.push(new player(PLAYERS.PLAYER_ONE));
  this.players.push(new player(PLAYERS.PLAYER_TWO));
  this.currentPlayer = this.players[0];

  CanvasManager.board = new Board(0, 0, this.canvas.width, canvas.height);
  this.board.init();
  this.board.render(this.context, this.currentPlayer.getId());
};

CanvasManager.addHero = function(hero) {
  this.currentPlayer.prepareHero(hero);
};

CanvasManager.process = function(x, y) {
  this.board.select(x, y);
  switch (this.mode) {
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

CanvasManager.onStart = function(callback) {
  this.canvas.addEventListener("mousedown", callback);
};

CanvasManager.onProcess = function(callback) {
  this.canvas.addEventListener("mousemove", callback);
};

CanvasManager.onFinish = function(callback) {
  this.canvas.addEventListener("mouseup", callback);
};
