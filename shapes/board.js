const COLUMNS = 9;
const ROWS = 7;

const TURNS = {
  PLAYER1: 0,
  PLAYER2: 1
};
var Board = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.boardSquaresList = [];
  this.selectedSquare = null;
  this.name = "board";
  this.mode = MODES.NORMAL;
};

Board.prototype.init = function() {
  let squareWidth = this.width / COLUMNS;
  let squareHeight = this.height / ROWS;
  let color = null;
  let field = null;
  for (let x = 0; x < COLUMNS; x++) {
    for (let y = 0; y < ROWS; y++) {
      switch (y) {
        case 0:
        case 1:
          field = FIELDS.PLAYER_ONE;
          break;
        case 2:
        case 3:
        case 4:
          field = FIELDS.BATTLE_FIELD;
          break;
        case 5:
        case 6:
          field = FIELDS.PLAYER_TWO;
          break;
        default:
          break;
      }
      this.boardSquaresList.push(
        new BoardSquare(x, y, squareWidth, squareHeight, field, "test")
      );
    }
  }

  this.createObstacles();
};

Board.prototype.render = function(context, curplayerId) {
  for (let index = 0; index < this.boardSquaresList.length; index++) {
    const element = this.boardSquaresList[index];
    element.render(context, curplayerId);
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
      PubSub.publish(Events.ON_HERO_ADDED_TO_BOARD, this.currentAddingHero);
    }
  }
};

Board.prototype.createObstacles = function() {
  for (let index = 0; index < 5; index++) {
    let randomX = Math.floor(Math.random() * 9);
    let randomY = Math.floor(Math.random() * 2) + 3;
    let selectedElement = this.boardSquaresList.find(
      m => m.x == randomX && m.y == randomY
    );

    if (selectedElement == undefined) {
      console.log(randomX + " , " + randomY);
      return;
    }

    selectedElement.makeObstacle();
  }
};
