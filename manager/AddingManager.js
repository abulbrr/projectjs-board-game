function $(query) {
  return document.querySelector(query);
}

var elvesButton = $("#ELF");
var knightsButton = $("#knight");
var dwarfsButton = $("#dwarf");

AddingManager = {};

AddingManager.board;
AddingManager.players;
AddingManager.currentPlayer;
AddingManager.currentlyAddingHero = null;

AddingManager.restart = function() {
  elvesButton.style.display = "inline";
  knightsButton.style.display = "inline";
  dwarfsButton.style.display = "inline";
  this.updateButtons();
};
AddingManager.init = function(board, players) {
  this.board = board;
  this.players = players;
  this.changePlayer();

  this.renderBoard();

  this.updateButtons();
  elvesButton.addEventListener("mousedown", AddingManager.heroButtonClicked);
  knightsButton.addEventListener("mousedown", AddingManager.heroButtonClicked);
  dwarfsButton.addEventListener("mousedown", AddingManager.heroButtonClicked);
};

AddingManager.heroButtonClicked = function(e) {
  let type = e.target.id;

  if (AddingManager.currentlyAddingHero == null) {
    AddingManager.currentlyAddingHero = AddingManager.currentPlayer.takeHero(
      type
    );
    AddingManager.updateButtons();
  }
};

AddingManager.clicked = function(element) {
  //   console.log(this.currentPlayer.field);
  //   console.log(element.y);
  if (!this.currentPlayer.field.includes(element.y)) return;
  if (this.currentlyAddingHero != null && !element.hasHero()) {
    element.color = this.currentPlayer.color;
    element.text = this.currentlyAddingHero.name;
    element.hero = this.currentlyAddingHero;
    this.currentPlayer.putHeroInHeroesList(this.currentlyAddingHero);
    this.currentlyAddingHero = null;

    this.changePlayer();
  }
  this.updateButtons();
};

AddingManager.updateButtons = function() {
  elvesButton.innerHTML = `Elves: ${this.currentPlayer.getHeroesCount(
    HEROES.ELF
  )}`;
  knightsButton.innerHTML = `Knights: ${this.currentPlayer.getHeroesCount(
    HEROES.KNIGHT
  )}`;
  dwarfsButton.innerHTML = `dwarfs: ${this.currentPlayer.getHeroesCount(
    HEROES.DWARF
  )}`;

  if (
    // revert later
    // this.players[0].heroes.length == 6 &&
    // this.players[1].heroes.length == 6
    this.players[0].heroes.length == 1 &&
    this.players[1].heroes.length == 1
  ) {
    elvesButton.style.display = "none";
    knightsButton.style.display = "none";
    dwarfsButton.style.display = "none";

    PubSub.publish(Events.ADDING_FINISHED);
  }
};

AddingManager.changePlayer = function() {
  if (this.currentPlayer == this.players[0])
    this.currentPlayer = this.players[1];
  else this.currentPlayer = this.players[0];

  PubSub.publish(Events.ON_PLAYER_CHANGE, {
    fields: this.currentPlayer.field,
    mode: MODES.ADDING
  });
};

AddingManager.renderBoard = function() {};
