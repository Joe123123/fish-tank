class Shark extends BiteFish {
  constructor(options) {
    super(options);
    this.imageUri = "/images/huge-shark.png";
    this.isShark = true; // identify shark
    this.height = 80; // bigger size
    this.width = 120; // bigger size
  }
  update(t) {
    if (this.outOfBounds(this.tank.getBounds())) {
      this.kill();
    } else {
      for (var i = 0; i < this.calcPhysicsTicks(t); i++) {
        this.updateOneTick();
      }
    }
    // find fish in range 50
    let arr = this.tank.getProximateDenizens(this.position, 50);
    for (let item of arr) {
      if (!item.isShark && !item.isUneatable) {
        item.kill();
        // if kill more than 10
        if (++this.killed > 10) {
          this.kill();
        }
      }
      // if two sharks meet
      if (item.isShark && item !== this) {
        item.killed > this.killed ? item.kill() : this.kill();
      }
    }
  }
  makeNewVelocity(minMag) {
    // lower speed than normal fish
    this.swimVelocity = this.generateSwimVelocity(50, minMag || 0);
    this.timeUntilSpeedChange = randRangeInt(20);
  }
}
