function $(query) {
  return document.querySelector(query);
}

var elvesButton = $("#ELF");
var knightsButton = $("#knight");
var dwarfsButton = $("#dwarf");

GameManager.init();

function onFinishGameClicked() {
  PubSub.publish(Events.GAME_OVER);
}

function onRestartClicked() {
  $("#canvas").hidden = false;
  GameManager.restart();
  GameManager.init();
}

PubSub.subscribe(Events.ROUNDS_CHANGED, function(round) {
  $("#rounds").innerHTML = round;
});

PubSub.subscribe(Events.ON_MODE_CHANGE, function(mode) {
  $("#currentMode").innerHTML = mode;
});

PubSub.subscribe(Events.ON_PLAYER_CHANGE, function(player) {
  $("#currentPlayer").innerHTML = player.id;
});

PubSub.subscribe(Events.CURRENT_HERO_CHANGED, function(hero) {
  if (hero.id != undefined) $("#selectedHero").innerHTML = hero.id;
});

PubSub.subscribe(Events.CURRENT_HERO_HEALTH_CHANGED, function(health) {
  $("#selectedHeroHealth").innerHTML = health;
});

PubSub.subscribe(Events.GAME_OVER, function() {
  let players = GameManager.getPlayersData();
  $("#canvas").hidden = true;
  $("#end").innerHTML = `Player 1 : 
   points: ${players[0].points} 
   dead heroes:`;

  for (hero of players[0].deadHeroes) {
    $("#end").innerHTML += hero.id;
  }

  $("#end").innerHTML += `Player 2 : 
  points: ${players[1].points} 
  dead heroes:`;

  for (hero of players[1].deadHeroes) {
    $("#end").innerHTML += hero.id;
  }
});
