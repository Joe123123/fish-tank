class BiteFish extends Fish {
  constructor(options) {
    super(options);
    this.imageUri = "/images/bite-fish.gif";
    this.isTasty = false;
    this.killed = 0;
  }
  update(t) {
    if (this.outOfBounds(this.tank.getBounds())) {
      this.kill();
    } else {
      for (var i = 0; i < this.calcPhysicsTicks(t); i++) {
        this.updateOneTick();
      }
    }
    let arr = this.tank.getProximateDenizens(this.position, 20);
    for (let item of arr) {
      if (item.isTasty) {
        item.kill();
        if (++this.killed > 5) {
          this.kill();
        }
      }
    }
  }
}
