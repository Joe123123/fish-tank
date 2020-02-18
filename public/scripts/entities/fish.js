class Fish extends Denizen {
  constructor(options) {
    super(options);
    this.imageUri = "/images/moving-gold.gif";
    this.maxSwimSpeed = 100;
    this.makeNewVelocity();
    this.isTasty = true; // normal fush born tasty
  }

  generateSwimVelocity(max, min) {
    if (min && min > max) {
      min = 0;
    }
    var newSpeed = new Vector(
      randRangeInt(-max, max),
      randRangeInt(-max / 2, max / 2)
    );
    while (min && newSpeed.magnitude() < min) {
      newSpeed = new Vector(
        randRangeInt(-max, max),
        randRangeInt(-max / 2, max / 2)
      );
    }
    return newSpeed;
  }

  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S);
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
  }

  makeNewVelocity(minMag) {
    this.swimVelocity = this.generateSwimVelocity(
      this.maxSwimSpeed,
      minMag || 0
    );
    this.timeUntilSpeedChange = randRangeInt(5);
  }
  update(t) {
    if (this.outOfBounds(this.tank.getBounds())) {
      this.kill();
    } else {
      for (var i = 0; i < this.calcPhysicsTicks(t); i++) {
        this.updateOneTick();
      }
    }
  }
}
