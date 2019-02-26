function $(query) {
  return document.querySelector(query);
}

var CanvasManager = {};

var elvesButton = $("#ELF");
var knightsButton = $("#knight");
var dwarfsButton = $("#dwarf");

CanvasManager.canvas = null;
CanvasManager.context = null;
CanvasManager.currentMode = MODES.adding;
CanvasManager.board = null;
CanvasManager.players = [];
CanvasManager.currentPlayer = null;
CanvasManager.currentAddingHero = null;

CanvasManager.init = function(element) {
  this.canvas = document.getElementById(element);
  this.context = this.canvas.getContext("2d");
  this.context.font = "25px Arial";
  this.canvas.textAlign = "center";

  CanvasManager.board = new Board(0, 0, this.canvas.width, canvas.height);
  this.board.init();
  this.players.push(new Player(PLAYERS.PLAYER_ONE));
  this.players.push(new Player(PLAYERS.PLAYER_TWO));

  this.setCurrentPlayer();

  this.players.forEach(player => player.createHeroes());

  this.board.render(this.context, this.currentPlayer.getId());
};

CanvasManager.addHero = function(hero) {
  this.currentPlayer.prepareHero(hero);
};

CanvasManager.process = function(x, y) {
  this.board.select(x, y);
  switch (this.currentMode) {
    case MODES.adding:
      if (
        this.currentAddingHero != null &&
        this.board.selectedSquare.isCurrentPlayerTeritory()
      ) {
        this.board.addHero(this.currentAddingHero);
        this.currentPlayer.putHeroInHeroesList(this.currentAddingHero);
        PubSub.publish(Events.HERO_ADDED, {
          hero: this.currentAddingHero,
          boardSquare: this.board.selectedSquare
        });

        this.currentAddingHero = null;
      }
      break;
    case MODES.moving:

    default:
      break;
  }

  this.board.render(this.context);
};

CanvasManager.render = function() {
  this.board.render(this.context);
};

CanvasManager.changeMode = function(change) {
  if (change == MODES.END_TURN) {
    this.setCurrentPlayer();
    PubSub.publish(Events.ON_PLAYER_CHANGE, this.currentPlayer);
    PubSub.publish(Events.ON_MODE_CHANGE, MODES.NORMAL);
  } else {
    CanvasManager.currentMode = change;
    PubSub.publish(Events.ON_MODE_CHANGE, change);
  }

  this.render();
};

CanvasManager.setCurrentPlayer = function() {
  if (this.currentPlayer == null || this.currentPlayer == PLAYERS.PLAYER_TWO)
    this.currentPlayer = this.players[0];
  else this.currentPlayer = this.players[1];

  PubSub.publish(Events.ON_PLAYER_CHANGE, this.currentPlayer);
};

CanvasManager.setCurrentAddingHero = function(hero) {
  this.currentAddingHero = this.currentPlayer.prepareHero(hero);
};

// event listeners
CanvasManager.onStart = function(callback) {
  this.canvas.addEventListener("mousedown", callback);
};

CanvasManager.onProcess = function(callback) {
  this.canvas.addEventListener("mousemove", callback);
};

CanvasManager.onFinish = function(callback) {
  this.canvas.addEventListener("mouseup", callback);
};

// modes manager.
PubSub.subscribe(Events.ON_MODE_CHANGE, mode => {
  $("#currentMode").innerHTML = mode;
});

PubSub.subscribe(Events.ON_PLAYER_CHANGE, player => {
  $("#currentPlayer").innerHTML = player ? "Player A" : "Player B";
});

PubSub.subscribe(Events.ON_HEROES_COUNT_CHANGE, function() {
  if (CanvasManager.currentPlayer == null) return;

  elvesButton.innerHTML = `Elves: ${CanvasManager.currentPlayer.getHeroesCount(
    HEROES.ELF
  )}`;
  knightsButton.innerHTML = `Knights: ${CanvasManager.currentPlayer.getHeroesCount(
    HEROES.KNIGHT
  )}`;
  dwarfsButton.innerHTML = `dwarfs: ${CanvasManager.currentPlayer.getHeroesCount(
    HEROES.DWARF
  )}`;
});

PubSub.subscribe(Events.ON_HERO_ADDED_TO_BOARD, function() {
  CanvasManager.currentAddingHero = null;
});
