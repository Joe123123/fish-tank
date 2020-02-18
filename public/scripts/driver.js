$(() => {
  window.fishtank = new Fishtank("fishtank"); // making it global to make debugging 1% easier.  shhhh.
  window.fishtank.registerSpecies(
    Shark,
    BiteFish,
    TimidFish,
    SwitchFish,
    GoFish
  ); // chance of spawn from low to high
  var starter = new Starter({
    tank: window.fishtank, // look, it's Dependency Injection!  Pretend you care!
    position: new Vector(0, 0)
  });
});
