var Knight = function(player) {
  this.type = HEROES.KNIGHT;
  this.id = HEROES.KNIGHT + Utils.getUniqueId();
  this.player = player;
  this.name = "K";
  this.atk = 8;
  this.def = 3;
  this.health = 15;
  this.atkSquares = 1;
  this.speed = 1;
};
