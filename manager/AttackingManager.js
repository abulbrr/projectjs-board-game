AttackManager = {};

AttackManager.board = null;
AttackManager.currentPlayer = null;
AttackManager.squaresList = null;
AttackManager.attackSquares = 0;
AttackManager.attackingSquare = null;

AttackManager.reset = function() {
  AttackManager.attackSquares = 0;
  AttackManager.attackingSquare = null;
  this.resetColors();
};

AttackManager.init = function(board, currentPlayer) {
  console.log("Attack manager init");
  this.board = board;
  this.currentPlayer = currentPlayer;
  this.squaresList = this.board.getSquaresList();
};

AttackManager.clicked = function(element) {
  let attacked = false;
  this.board.setMode(MODES.ATTACKING);

  if (!element.hasHero()) {
    this.attackingSquare = null;
    this.resetColors();
    return attacked;
  }

  if (element.hero.isObstacle && this.isAttackable(element)) element.killHero();
  if (element.color == "pink" && this.attackingSquare != null) {
    this.attack(this.attackingSquare, element);
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
  return attacked;
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
  if (this.board != null) this.board.reset();
};

AttackManager.isAttackable = function(attacked) {
  return (
    (Math.abs(this.attackingSquare.x - attacked.x) <= this.attackSquares &&
      this.attackingSquare.y == attacked.y) ||
    (Math.abs(this.attackingSquare.y - attacked.y) <= this.attackSquares &&
      this.attackingSquare.x == attacked.x)
  );
};

AttackManager.attack = function(attackerSquare, defenderSquare) {
  var attacker = attackerSquare.hero;
  var defender = defenderSquare.hero;

  let diceSum = this.diceGame();
  let attack = attacker.atk - defender.def;

  if (diceSum == defender.health) {
    console.log("attack failed");
    return;
  }
  // 3 smallest possible sum.
  if (diceSum == 3) {
    console.log("half attack");
    attack = attack / 2;
  }

  console.log("attack");

  defender.health -= attack;
  this.currentPlayer.points += attack;

  if (defender.health <= 0) {
    PubSub.publish(Events.ON_HEROES_COUNT_CHANGE);
    defender.player.killHero(defender);
    defenderSquare.killHero();
    if (defender.player.heroes.length == 0) {
      PubSub.publish(Events.GAME_OVER);
    }
  }
};

AttackManager.diceGame = function() {
  let dice = Math.floor(Math.random() * 7) + 1;
  dice += Math.floor(Math.random() * 7) + 1;
  dice += Math.floor(Math.random() * 7) + 1;
  return dice;
};
