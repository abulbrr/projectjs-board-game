var Player = function(id) {
  this.id = id;
  this.health = 100;
  this.UnassignedHeroes = [];
  this.heroes = [];
  this.currentHero = null;
};

Player.prototype.getHeroesCount = function(type) {
  return this.UnassignedHeroes.filter(hero => hero.type == type).length;
};

Player.prototype.prepareHero = function(hero) {
  this.currentHero = this.takeHero(hero);
  return this.currentHero;
};

Player.prototype.createHeroes = function() {
  this.addHero(new HeroesFactory(HEROES.KNIGHT));
  this.addHero(new HeroesFactory(HEROES.KNIGHT));
  this.addHero(new HeroesFactory(HEROES.DWARF));
  this.addHero(new HeroesFactory(HEROES.DWARF));
  this.addHero(new HeroesFactory(HEROES.ELF));
  this.addHero(new HeroesFactory(HEROES.ELF));
};

Player.prototype.putHeroInHeroesList = function(hero) {
  this.heroes.push(hero);
  // var tempHero = this.currentHero;

  // this.currentHero = null;

  // return tempHero;
};

Player.prototype.getCurrentHero = () => {
  return this.currentHero;
};

Player.prototype.getId = () => {
  return this.id;
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
  PubSub.publish(Events.ON_HEROES_COUNT_CHANGE);
};
