var BoardSquare2 = function(x, y, width, height, text, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.text = text;
  this.hero = null;
};

BoardSquare2.prototype.render = function(context) {
  if (this.hero != null) {
    if (this.hero.isObstacle == true) this.color = "black";
    if (this.hero != null && !this.hero.isObstacle) {
      this.text = this.hero.name + this.hero.player.id;
    }
  }
  context.beginPath();
  context.fillStyle = this.color;
  context.rect(
    this.x * this.width,
    this.y * this.height,
    this.width,
    this.height
  );
  context.fill();
  context.stroke();
  let mappedX = this.x * this.width + 10;
  let mappedY = this.y * this.height + 50;

  context.fillStyle = "black";
  context.fillText(this.text, mappedX, mappedY, this.width);
  context.closePath();
};

BoardSquare2.prototype.contains = function(mouseX, mouseY) {
  let mappedX = this.x * this.width;
  let mappedY = this.y * this.height;
  let containsX = mouseX > mappedX && mouseX < mappedX + this.width;
  let containsY = mouseY > mappedY && mouseY < mappedY + this.height;

  return containsX && containsY;
};

BoardSquare2.prototype.addHero = function(hero) {
  if (this.hero == null) this.hero = hero;
};

BoardSquare2.prototype.hasHero = function() {
  return this.hero != null;
};
BoardSquare2.prototype.killHero = function() {
  this.hero = null;
};
