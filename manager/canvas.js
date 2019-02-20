var CanvasManager = {};

CanvasManager.canvas = null;
CanvasManager.context = null;
CanvasManager.layerShapeCollection = [];
CanvasManager.shapeReference = null;
CanvasManager.board = null;
CanvasManager.init = function(element) {
  this.canvas = document.getElementById(element);
  this.context = this.canvas.getContext("2d");

  CanvasManager.board = new Board(0, 0, this.canvas.width, canvas.height);
  this.board.init();
  this.board.render(this.context);
};

CanvasManager.process = function(x, y) {
  this.board.select(x, y);
  this.board.render(this.context);
};
CanvasManager.push = function(element) {};

CanvasManager.isShapeActive = function() {};

CanvasManager.getActiveShape = function() {};

CanvasManager.render = function() {};

CanvasManager.renderFinish = function() {};

CanvasManager.onStart = function(callback) {
  this.canvas.addEventListener("mousedown", callback);
};

CanvasManager.onProcess = function(callback) {
  this.canvas.addEventListener("mousemove", callback);
};

CanvasManager.onFinish = function(callback) {
  this.canvas.addEventListener("mouseup", callback);
};
