var Obstacle = function() {
  this.color = "black";
  this.name = "O";
  this.type = "obstacle";
  this.id = "obstacle" + Utils.getUniqueId();
  this.isObstacle = true;
};
