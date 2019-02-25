var Player = function(id) {
  this.id = id;
  this.health = 100;
  this.heroes = [];
  this.currentHero = null;
  // this.createHeroes();
};

Player.prototype.getHerosCount = type => {};

Player.prototype.prepareHero = hero => {
  this.currentHero = hero;
};

Player.prototype.createHeroes = () => {
  this.heroes.push(new HeroesFactory(HEROES.KNIGHT));
  this.heroes.push(new HeroesFactory(HEROES.KNIGHT));
  this.heroes.push(new HeroesFactory(HEROES.DWARF));
  this.heroes.push(new HeroesFactory(HEROES.DWARF));
  this.heroes.push(new HeroesFactory(HEROES.ELF));
  this.heroes.push(new HeroesFactory(HEROES.ELF));
};

Player.prototype.putHero = () => {
  this.heroes.push(this.currentHero);
  var tempHero = this.currentHero;
  this.currentHero = null;

  return tempHero;
};

Player.prototype.getCurrentHero = () => {
  return this.currentHero;
};

Player.prototype.getId = () => {
  return this.id;
};
