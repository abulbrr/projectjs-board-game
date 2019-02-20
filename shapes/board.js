const COLUMNS = 9;
const ROWS = 7;
const FIELDS = {
  UP: 0,
  BATTLE: 1,
  DOWN: 2
};
var Board = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.boardSquaresList = [];
  this.selectedSquare = null;
  this.name = "board";
};

Board.prototype.init = function() {
  let squareWidth = this.width / COLUMNS;
  let squareHeight = this.height / ROWS;
  let color = null;
  let field = null;
  for (let x = 0; x < COLUMNS; x++) {
    for (let y = 0; y < ROWS; y++) {
      if ((x - y) % 2 == 0) {
        color = "#616f39";
      } else {
        color = "#3e432e";
      }
      switch (y) {
        case 0:
        case 1:
          field = FIELDS.UP;
          break;
        case 2:
        case 3:
        case 4:
          field = FIELDS.BATTLE;
          color = "#000000";
          break;
        case 5:
        case 6:
          field = FIELDS.DOWN;
          break;
        default:
          break;
      }
      this.boardSquaresList.push(
        new BoardSquare(
          x * squareWidth,
          y * squareHeight,
          squareWidth,
          squareHeight,
          color,
          field
        )
      );
    }
  }
};

Board.prototype.render = function(context) {
  for (let index = 0; index < this.boardSquaresList.length; index++) {
    const element = this.boardSquaresList[index];
    element.render(context);
  }
};

Board.prototype.select = function(x, y) {
  if (this.selectedSquare != null) {
    this.selectedSquare.isSelected = false;
  }
  for (let index = 0; index < this.boardSquaresList.length; index++) {
    const element = this.boardSquaresList[index];
    if (element.contains(x, y)) {
      this.selectedSquare = element;
      element.isSelected = true;
      console.log(element.field);
      return element;
    }
  }
  return false;
};
