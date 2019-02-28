HealingManager = {};

HealingManager.board = null;
HealingManager.currentPlayer = null;
HealingManager.squaresList = null;

HealingManager.reset = function() {
  this.resetColors();
};
HealingManager.init = function(board, currentPlayer) {
  console.log("Healing manager init");
  this.board = board;
  this.currentPlayer = currentPlayer;
  this.squaresList = this.board.getSquaresList();
  this.setPossibleMoves();
};

HealingManager.clicked = function(element) {
  let healed = false;
  this.board.setMode(MODES.HEALING);

  if (!element.hasHero() || element.hero.isObstacle) {
    this.resetColors();
    return healed;
  }

  if (!healed && this.currentPlayer.isCurrentPlayersHero(element.hero)) {
    this.heal(element.hero);
    healed = true;
  } else {
    this.resetColors();
  }
  element.color = "purple";
  return healed;
};

HealingManager.setPossibleMoves = function() {
  let possibleMovesList = this.squaresList.filter(
    s =>
      s.hasHero() &&
      !s.hero.isObstacle &&
      s.hero.player.id == this.currentPlayer.id
  );
  console.log(possibleMovesList);

  possibleMovesList.forEach(s => {
    s.color = "red";
  });
};

HealingManager.resetColors = function() {
  this.board.reset();
};

HealingManager.heal = function(hero) {
  let diceSum = this.diceGame();
  hero.health += diceSum;
};

HealingManager.diceGame = function() {
  var dice = 0;
  var temp;
  do {
    temp = Math.floor(Math.random() * 7) + 1;
    dice += temp;
  } while (temp % 2 == 0);

  return dice;
};
