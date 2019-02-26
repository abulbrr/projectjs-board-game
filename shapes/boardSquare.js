var BoardSquare = function(x, y, width, height, field) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.field = field;
  this.color = null;
  this.name = null;
  this.hero = null;
  this.mode = MODES.NORMAL;
  this.currentPlayer;
  this.isObstacle = false;
  this.currentPlayerTeritory = false;
  this.subscribe();
};

BoardSquare.prototype.render = function(context, curplayerId) {
  context.beginPath();

  console.log(this.mode);

  if (this.isObstacle) {
    this.fillStyle = "black";
    this.draw(context, "");
    return;
  }

  var text = "";
  let index = this.x - this.y;
  switch (this.mode) {
    case MODES.adding:
      console.log("mode adding rendering");
      if (this.currentPlayerTeritory) {
        this.color = "grey";
      } else {
        this.color = "red";
        text = " X";
      }
      break;
    case MODES.moving:

    case MODES.NORMAL:
    default:
      if (this.field == FIELDS.BATTLE_FIELD) this.color = "#5b446a";
      else if (index % 2 == 0) this.color = "#616f39";
      else this.color = "#3e432e";

      break;
  }
  if (this.isSelected) {
    context.fillStyle = "red";
  } else {
    context.fillStyle = this.color;
  }
  if (this.hero != null) {
    text = this.hero.name;
  }

  this.draw(context, text);
};

BoardSquare.prototype.draw = function(context, text) {
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
  context.fillText(text, mappedX, mappedY, this.width);
  context.closePath();
};

BoardSquare.prototype.contains = function(mouseX, mouseY) {
  let mappedX = this.x * this.width;
  let mappedY = this.y * this.height;
  let containsX = mouseX > mappedX && mouseX < mappedX + this.width;
  let containsY = mouseY > mappedY && mouseY < mappedY + this.height;

  return containsX && containsY;
};

BoardSquare.prototype.removeHero = function() {
  this.hero = null;
};

BoardSquare.prototype.setHero = function(hero) {
  if (this.isObstacle == false) this.hero = hero;
};

BoardSquare.prototype.makeObstacle = function() {
  this.isObstacle = true;
};

BoardSquare.prototype.isCurrentPlayerTeritory = function() {
  return this.currentPlayerTeritory;
};

BoardSquare.prototype.subscribe = function() {
  PubSub.subscribe(Events.ON_PLAYER_CHANGE, player => {
    if (
      (this.field == FIELDS.PLAYER_ONE && player.id == PLAYERS.PLAYER_ONE) ||
      (this.field == FIELDS.PLAYER_TWO && player.id == PLAYERS.PLAYER_TWO)
    ) {
      this.currentPlayerTeritory = true;
    } else this.currentPlayerTeritory = false;

    this.currentPlayer = player;
  });

  PubSub.subscribe(Events.ON_MODE_CHANGE, mode => {
    console.log("mode changed");
    this.mode = mode;
  });
};
