class BiteFish extends Fish {
  constructor(options) {
    super(options);
    this.imageUri = "/images/moving-bite.gif";
    this.isTasty = false;
    this.killed = 0; // records num of killed
  }
  update(t) {
    if (this.outOfBounds(this.tank.getBounds())) {
      this.kill();
    } else {
      for (var i = 0; i < this.calcPhysicsTicks(t); i++) {
        this.updateOneTick();
      }
    }
    // test range 20
    let arr = this.tank.getProximateDenizens(this.position, 20);
    for (let item of arr) {
      // kill all tasty fish
      if (item.isTasty) {
        item.kill();
        if (++this.killed > 5) {
          this.kill();
        }
      }
    }
  }
}
