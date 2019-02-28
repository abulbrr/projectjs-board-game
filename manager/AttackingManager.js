AttackManager = {};

AttackManager.board = null;
AttackManager.currentPlayer = null;
AttackManager.squaresList = null;
AttackManager.attackSquares = 0;
AttackManager.attackingSquare = null;

AttackManager.init = function(board, currentPlayer) {
  console.log("Attack manager init");
  this.board = board;
  this.currentPlayer = currentPlayer;
  this.squaresList = this.board.getSquaresList();
};

AttackManager.clicked = function(element) {
  let attacked = false;
  this.board.setMode(MODES.ATTACKING);

  console.log(element.x + " , " + element.y);
  if (!element.hasHero()) {
    this.attackingSquare = null;
    this.resetColors();
    return;
  }

  if (element.isObstacle && this.isAttackable(element)) element.hero = null;
  if (element.color == "pink" && this.attackingSquare != null) {
    this.attack(this.attackingSquare.hero, element.hero);
    attacked = true;
  }
  this.attackingSquare = null;
  this.resetColors();

  if (!attacked && this.currentPlayer.isCurrentPlayersHero(element.hero)) {
    this.attackingSquare = element;
    this.attackSquares = element.hero.atkSquares;
    this.setPossibleMoves();
  }
  element.color = "purple";
};

AttackManager.setPossibleMoves = function() {
  let possibleMovesList = this.squaresList.filter(
    s =>
      Math.abs(this.attackingSquare.x - s.x) <= this.attackSquares &&
      this.attackingSquare.y == s.y
  );
  let possibleMovesList2 = this.squaresList.filter(
    s =>
      Math.abs(this.attackingSquare.y - s.y) <= this.attackSquares &&
      this.attackingSquare.x == s.x
  );

  possibleMovesList2.forEach(s => {
    if (s.hasHero()) s.color = "pink";
    else s.color = "red";
  });
  possibleMovesList.forEach(s => {
    if (s.hasHero()) s.color = "pink";
    else s.color = "red";
  });
};

AttackManager.resetColors = function() {
  this.board.reset();
};

AttackManager.isAttackable = function(attacked) {
  return (
    (Math.abs(this.attackingSquare.x - attacked.x) <= this.attackSquares &&
      this.attackingSquare.y == attacked.y) ||
    (Math.abs(this.attackingSquare.y - attacked.y) <= this.attackSquares &&
      this.attackingSquare.x == attacked.x)
  );
};

AttackManager.attack = function(attacker, hero) {
  let diceSum = this.diceGame(hero);
  if (diceSum == hero.health) {
    return;
  }

//   if(diceSum == )
};

AttackManager.diceGame = function(hero) {
  let dice = Math.floor(Math.random() * 7) + 1;
  dice += Math.floor(Math.random() * 7) + 1;
  dice += Math.floor(Math.random() * 7) + 1;
  return dice;
};
