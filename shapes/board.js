const COLUMNS = 9;
const ROWS = 7;

var Board = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.boardSquaresList = [];
  this.selectedSquare = null;
  this.name = "board";
  this.mode = MODES.NORMAL;
  this.availableFields = null;
};

Board.prototype.getSquaresList = function() {
  return this.boardSquaresList;
};

Board.prototype.setMode = function(mode) {
  this.mode = mode;
};

Board.prototype.setDefaultColor = function(square) {
  let isLight = (square.y - square.x) % 2 == 0;

  switch (square.y) {
    case 0:
    case 1:
      color = isLight ? "white" : "gold";
      break;
    case 2:
    case 3:
    case 4:
      color = "#a67c00";
      break;
    case 5:
    case 6:
      color = isLight ? "white" : "gold";
      break;
    default:
      break;
  }
  square.color = color;
};

Board.prototype.reset = function() {
  let squareWidth = this.width / COLUMNS;
  let squareHeight = this.height / ROWS;
  let color = null;
  let field = null;
  for (let i = 0; i < this.boardSquaresList.length; i++) {
    let square = this.boardSquaresList[i];
    this.setDefaultColor(square);
    if (!square.hasHero()) square.text = "";
  }
};

Board.prototype.init = function() {
  this.subscribe();
  let squareWidth = this.width / COLUMNS;
  let squareHeight = this.height / ROWS;
  let color = null;
  let field = null;
  for (let x = 0; x < COLUMNS; x++) {
    for (let y = 0; y < ROWS; y++) {
      let isLight = (y - x) % 2 == 0;
      switch (y) {
        case 0:
        case 1:
          color = isLight ? "white" : "gold";
          field = FIELDS.PLAYER_ONE;
          break;
        case 2:
        case 3:
        case 4:
          color = "#a67c00";
          field = FIELDS.BATTLE_FIELD;
          break;
        case 5:
        case 6:
          field = FIELDS.PLAYER_TWO;
          color = isLight ? "white" : "gold";
          break;
        default:
          break;
      }
      this.boardSquaresList.push(
        new BoardSquare2(x, y, squareWidth, squareHeight, "", color)
      );
    }
  }

  this.createObstacles();
};

Board.prototype.prepareAddingSquares = function() {
  for (let index = 0; index < this.boardSquaresList.length; index++) {
    const element = this.boardSquaresList[index];
    if (this.availableFields.includes(element.y)) {
      element.color = "red";
      element.text = "";
    } else {
      element.color = "yellow";
      element.text = "X";
    }
  }
};
Board.prototype.render = function(context) {
  if (this.mode == MODES.ADDING) this.prepareAddingSquares();
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
      return element;
    }
  }
  return false;
};

Board.prototype.addHero = function(hero) {
  if (this.selectedSquare != null) {
    if (
      this.selectedSquare.isObstacle == false &&
      this.selectedSquare.hero == null &&
      this.selectedSquare.isCurrentPlayerTeritory()
    ) {
      this.selectedSquare.setHero(hero);
    }
  }
};

Board.prototype.createObstacles = function() {
  let obstNum = Math.floor(Math.random() * 6) + 1;
  for (let index = 0; index < obstNum; index++) {
    let randomX = Math.floor(Math.random() * 9);
    let randomY = Math.floor(Math.random() * 2) + 3;
    let selectedElement = this.boardSquaresList.find(
      m => m.x == randomX && m.y == randomY
    );

    if (selectedElement == undefined) {
      console.log(randomX + " , " + randomY);
      return;
    }
    selectedElement.addHero(new Obstacle());
  }
};

Board.prototype.subscribe = function() {
  PubSub.subscribe(Events.ON_PLAYER_CHANGE, data => {
    this.mode = data.mode;
    this.availableFields = data.fields;
  });
};
