class TimidFish extends Fish {
  constructor(options) {
    super(options);
    this.imageUri = "/images/goldfish_PNG40.png";
    this.maxSwimSpeed = 500;
  }
  update(t) {
    if (this.outOfBounds(this.tank.getBounds())) {
      this.kill();
    } else {
      for (var i = 0; i < this.calcPhysicsTicks(t); i++) {
        this.updateOneTick();
      }
    }
    let arr = this.tank.getProximateDenizens(this.position, 60);
    if (arr.length > 2) {
      this.updateOneTick();
    }
  }
  updateOneTick() {
    var delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S);
    this.position.addMut(delta);
    this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S;
    if (this.timeUntilSpeedChange < 0) {
      this.makeNewVelocity();
    }
  }

  makeNewVelocity() {
    this.swimVelocity = this.generateSwimVelocity(
      this.maxSwimSpeed,
      this.maxSwimSpeed / 2
    );
    this.timeUntilSpeedChange = randRangeInt(10);
  }
}
