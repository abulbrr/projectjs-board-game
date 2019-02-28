CanvasManager = {};

CanvasManager.canvas = null;
CanvasManager.context = null;
CanvasManager.board = null;

CanvasManager.init = function(element) {
  this.canvas = document.getElementById(element);
  this.context = this.canvas.getContext("2d");
  this.context.font = "25px Arial";
  this.canvas.textAlign = "center";

  this.board = new Board(0, 0, this.canvas.width, this.canvas.height);
  this.board.init();

  this.board.render(this.context);
};

CanvasManager.getBoard = function() {
  return this.board;
};

CanvasManager.render = function() {
  this.board.render(this.context);
};

// event listeners
CanvasManager.onStart = function(callback) {
  this.canvas.addEventListener("mousedown", callback);
};

CanvasManager.getSelected = function(x, y) {
  return this.board.select(x, y);
};
