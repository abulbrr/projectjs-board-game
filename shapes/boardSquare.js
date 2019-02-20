var BoardSquare = function(x, y, width, height, color, field) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.field = field;
  this.name = null;
  this.hero = null;
};

BoardSquare.prototype.render = function(context) {
  context.beginPath();
  if (this.isSelected) context.fillStyle = "white";
  else context.fillStyle = this.color;
  context.strokeStyle = "white";
  context.rect(this.x, this.y, this.width, this.height);
  context.fill();
  context.stroke();
  context.closePath();
};

BoardSquare.prototype.contains = function(mouseX, mouseY) {
  let containsX = mouseX > this.x && mouseX < this.x + this.width;
  let containsY = mouseY > this.y && mouseY < this.y + this.height;

  return containsX && containsY;
};
