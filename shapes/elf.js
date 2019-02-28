var Elf = function(player) {
  this.type = HEROES.ELF;
  this.id = HEROES.ELF + Utils.getUniqueId();
  this.player = player;
  this.name = "E";
  this.atk = 6;
  this.def = 1;
  this.health = 10;
  this.atkSquares = 3;
  this.speed = 3;
};
