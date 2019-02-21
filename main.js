function $(query) {
  return document.querySelector(query);
}

CanvasManager.init("canvas");

CanvasManager.onStart(function(e) {
  var x = e.layerX;
  var y = e.layerY;

  CanvasManager.process(x, y);
});

function createHero(hero) {
  CanvasManager.addHero(hero);
}

// CanvasManager.onProcess(function(e) {
//   // if (!CanvasManager.isShapeActive()) return;
//   // console.log("move move while shape");
//   // CanvasManager.getActiveShape().finish(e.layerX, e.layerY);
//   // CanvasManager.render();
// });

// CanvasManager.onFinish(function(e) {
//   // CanvasManager.renderFinish();
// });
