class Starter extends Denizen {
  constructor(options) {
    super(options);
    this.imageUri = "/images/volcano.jpg";
    this.position.y += this.height;
    this.isUneatable = true; // uneatable item
  }

  update() {
    // auto generate seed when denizens smaller than 30
    if (Object.keys(this.tank.denizens).length < 30) {
      this.onClick();
    }
    // no physics for Starter
  }

  onClick(event) {
    var xVel = randRangeInt(-300, 300);
    var yVel = 400 - Math.abs(xVel);
    var s = new Seed({
      tank: this.tank,
      position: this.position,
      velocity: new Vector(xVel, yVel),
      type: this.tank.getRandomSpecies()
    });
  }
}
