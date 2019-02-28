var Player = function(id, color, field) {
  this.field = field;
  this.color = color;
  this.id = id;
  this.health = 100;
  this.UnassignedHeroes = [];
  this.heroes = [];
  this.currentHero = null;
  this.points = 0;
  this.deadHeroes = [];
};

Player.prototype.getHeroesCount = function(type) {
  return this.UnassignedHeroes.filter(hero => hero.type == type).length;
};

Player.prototype.prepareHero = function(hero) {
  this.currentHero = this.takeHero(hero);
  return this.currentHero;
};

Player.prototype.isCurrentPlayersHero = function(hero) {
  let h = this.heroes.find(h => h.id == hero.id);
  return h != undefined;
};

Player.prototype.createHeroes = function() {
  this.addHero(new HeroesFactory(HEROES.KNIGHT, this));
  this.addHero(new HeroesFactory(HEROES.KNIGHT, this));
  this.addHero(new HeroesFactory(HEROES.DWARF, this));
  this.addHero(new HeroesFactory(HEROES.DWARF, this));
  this.addHero(new HeroesFactory(HEROES.ELF, this));
  this.addHero(new HeroesFactory(HEROES.ELF, this));
};

Player.prototype.putHeroInHeroesList = function(hero) {
  this.heroes.push(hero);
};

Player.prototype.getCurrentHero = () => {
  return this.currentHero;
};

Player.prototype.getId = () => {
  return this.id;
};
Player.prototype.killHero = function(hero) {
  this.deadHeroes.push(hero);
  let tempHero = this.heroes.find(h => h.id == hero.id);
  let index = this.heroes.indexOf(tempHero);
  if (index != -1) this.heroes.splice(index, 1);
};

Player.prototype.takeHero = function(hero) {
  console.log(hero);
  let tempHero = this.UnassignedHeroes.find(h => h.type == hero);
  let index = this.UnassignedHeroes.indexOf(tempHero);
  if (index != -1) this.UnassignedHeroes.splice(index, 1);

  PubSub.publish(Events.ON_HEROES_COUNT_CHANGE);
  return tempHero;
};

Player.prototype.addHero = function(hero) {
  this.UnassignedHeroes.push(hero);
};
