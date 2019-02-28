function $(query) {
  return document.querySelector(query);
}

var elvesButton = $("#ELF");
var knightsButton = $("#knight");
var dwarfsButton = $("#dwarf");

GameManager.init();

// CanvasManager.onStart(function(e) {
//   var x = e.layerX;
//   var y = e.layerY;

//   CanvasManager.process(x, y);
// });

function prepareHero(hero) {
  CanvasManager.setCurrentAddingHero(hero);
}

function changeMode(mode) {
  if (mode != MODES.adding) {
    elvesButton.disabled = true;
    knightsButton.disabled = true;
    dwarfsButton.disabled = true;
  }

  CanvasManager.changeMode(mode);
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
