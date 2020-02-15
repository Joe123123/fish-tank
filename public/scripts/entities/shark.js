class Shark extends BiteFish {
  constructor(options) {
    super(options);
    this.imageUri = "/images/huge-shark.png";
    this.isShark = true;
    this.height = 80;
    this.width = 120;
  }
  update(t) {
    if (this.outOfBounds(this.tank.getBounds())) {
      this.kill();
    } else {
      for (var i = 0; i < this.calcPhysicsTicks(t); i++) {
        this.updateOneTick();
      }
    }
    let arr = this.tank.getProximateDenizens(this.position, 50);
    for (let item of arr) {
      if (!item.isShark && !item.isUneatable) {
        item.kill();
        if (++this.killed > 10) {
          this.kill();
        }
      }
      if (item.isShark && item !== this) {
        item.killed > this.killed ? item.kill() : this.kill();
      }
    }
  }
  makeNewVelocity(minMag) {
    this.swimVelocity = this.generateSwimVelocity(50, minMag || 0);
    this.timeUntilSpeedChange = randRangeInt(20);
  }
}
