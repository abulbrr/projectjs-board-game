var player = function(id) {
  this.id = name;
  this.health = 100;
  this.heroes = [];
  this.currentHero = null;
};

player.prototype.prepareHero = function(hero) {
  console.log(this.heroes);
  this.currentHero = new HeroesFactory(hero);
};

player.prototype.putHero = function() {
  this.heroes.push(this.currentHero);
  var tempHero = this.currentHero;
  this.currentHero = null;

  return tempHero;
};

player.prototype.getCurrentHero = function() {
  return this.currentHero;
};

player.prototype.getId = function() {
  return this.id;
};
