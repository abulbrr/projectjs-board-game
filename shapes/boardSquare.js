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
};

BoardSquare.prototype.render = function(context, curplayerId) {
  let index = Math.round(this.x / this.width - this.y / this.height);
  context.beginPath();
  switch (this.mode) {
    case MODES.NORMAL:
      if (index % 2 == 0) {
        this.color = "#616f39";
      } else {
        this.color = "#3e432e";
      }
      if (this.field == FIELDS.BATTLE_FIELD) {
        this.color = "#5b446a";
      }
      //   switch (this.field) {
      //     case FIELDS.PLAYER_ONE:
      //     case FIELDS.PLAYER_TWO:
      //       break;
      //     case FIELDS.BATTLE_FIELD:
      //       this.color = "#5b446a";
      //     default:
      //       break;
      // }

      break;
    case MODES.adding:
    //       if (curplayerId == PLAYERS.PLAYER_ONE) {
    //           FIELDS.
    //       } else {
    //       }
    //     case MODES.attack:
    //     case MODES.move:
    //     default:
    //       break;
    //   }
  }
  if (this.isSelected) {
    context.fillStyle = "white";
  } else {
    context.fillStyle = this.color;
  }

  if (this.hero != null) {
    this.color = "red";
    context.strokeStyle = "green";
    var text = this.hero.name;
  } else {
    this.color = "black";
    text = "";
    context.strokeStyle = "white";
  }

  context.rect(this.x, this.y, this.width, this.height);
  context.fill();
  context.stroke();
  context.fillStyle = "red";

  context.fillText(text, this.x + 10, this.y + 50, this.width);
  context.closePath();
};

BoardSquare.prototype.contains = function(mouseX, mouseY) {
  let containsX = mouseX > this.x && mouseX < this.x + this.width;
  let containsY = mouseY > this.y && mouseY < this.y + this.height;

  return containsX && containsY;
};

BoardSquare.prototype.removeHero = function() {
  this.hero = null;
};

BoardSquare.prototype.setHero = function(hero) {
  this.hero = hero;
};
