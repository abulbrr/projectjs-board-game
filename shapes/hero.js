var HeroesFactory = function(type) {
  var hero = null;
  switch (type) {
    case "knight":
      hero = new Knight();
      break;
    case "dwarf":
      hero = new Dwarf();
      break;
    case "elf":
      hero = new Elf();
      break;

    default:
      break;
  }
  return hero;
};
