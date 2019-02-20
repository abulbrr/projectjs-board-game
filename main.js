function $(query) {
  return document.querySelector(query);
}

CanvasManager.init("canvas");

CanvasManager.onStart(function(e) {
  // console.log("mouse down");
  var x = e.layerX;
  var y = e.layerY;

  CanvasManager.process(x, y);
});

CanvasManager.onProcess(function(e) {
  // if (!CanvasManager.isShapeActive()) return;
  // console.log("move move while shape");
  // CanvasManager.getActiveShape().finish(e.layerX, e.layerY);
  // CanvasManager.render();
});

CanvasManager.onFinish(function(e) {
  // CanvasManager.renderFinish();
});
