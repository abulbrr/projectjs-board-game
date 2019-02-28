var HeroesFactory = function(type, player) {
  var hero = null;
  switch (type) {
    case HEROES.KNIGHT:
      hero = new Knight(player);
      break;
    case HEROES.DWARF:
      hero = new Dwarf(player);
      break;
    case HEROES.ELF:
      hero = new Elf(player);
      break;

    default:
      break;
  }
  return hero;
};
