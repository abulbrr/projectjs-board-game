var HeroesFactory = function(type) {
  var hero = null;
  switch (type) {
    case HEROES.KNIGHT:
      hero = new Knight();
      break;
    case HEROES.DWARF:
      hero = new Dwarf();
      break;
    case HEROES.ELF:
      hero = new Elf();
      break;

    default:
      break;
  }
  return hero;
};
