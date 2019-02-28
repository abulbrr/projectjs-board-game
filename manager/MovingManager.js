MovingManager = {};

MovingManager.board = null;
MovingManager.currentPlayer = null;
MovingManager.squaresList = null;
MovingManager.heroSpeed = 0;
MovingManager.movingFromSquare = null;

MovingManager.reset = function() {
  MovingManager.currentPlayer = null;
  MovingManager.squaresList = null;
  MovingManager.heroSpeed = 0;
  MovingManager.movingFromSquare = null;
  this.resetColors();
};

MovingManager.init = function(board, currentPlayer) {
  console.log("moving manager init");
  this.board = board;
  this.currentPlayer = currentPlayer;
  this.squaresList = this.board.getSquaresList();
};

MovingManager.clicked = function(element) {
  let moved = false;
  this.board.setMode(MODES.MOVING);

  if (element.color == "orange" && this.movingFromSquare != null) {
    if (!element.hasHero() || !element.hero.isObstacle) {
      let tempHero = this.movingFromSquare.hero;
      this.movingFromSquare.hero = null;
      element.addHero(tempHero);
    }
    moved = true;
  }
  this.movingFromSquare = null;
  this.resetColors();
  if (element.hero == null) return;

  if (!moved && this.currentPlayer.isCurrentPlayersHero(element.hero)) {
    this.movingFromSquare = element;
    this.heroSpeed = element.hero.speed;
    this.setPossibleMoves();
  }
  element.color = "purple";
  return moved;
};

MovingManager.setPossibleMoves = function() {
  let possibleMovesList = this.squaresList.filter(
    s =>
      !s.hasHero() &&
      Math.abs(this.movingFromSquare.x - s.x) +
        Math.abs(this.movingFromSquare.y - s.y) <=
        this.heroSpeed
  );

  possibleMovesList.forEach(s => {
    s.color = "orange";
  });
};

MovingManager.resetColors = function() {
  this.board.reset();
};
