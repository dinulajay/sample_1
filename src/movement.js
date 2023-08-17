export default class Movement {
  constructor(cursors, mainCharacter, playerDirection) {
    console.log("Movement OBJECT initialized");

    this.char = mainCharacter;

    this.cursors = cursors;

    this.playerDirection = playerDirection;

    // console.log(this)
  }

  movement() {
    this.char.setVelocityX(0);
    this.char.setVelocityY(0);

    if (this.cursors.left.isDown) {
      this.char.setVelocityX(-160);
      this.resetDirection("left");
      this.playerDirection["left"] = 1;
    }
    if (this.cursors.right.isDown) {
      this.char.setVelocityX(160);
      this.resetDirection("right");
      this.playerDirection["right"] = 1;
    }
    if (this.cursors.up.isDown) {
      this.char.setVelocityY(-160);
      this.resetDirection("up");
      this.playerDirection["up"] = 1;
    }
    if (this.cursors.down.isDown) {
      this.char.setVelocityY(160);
      this.resetDirection("down");
      this.playerDirection["down"] = 1;
    }
  }

  resetDirection(exclude) {
    Object.keys(this.playerDirection).forEach((key) => {
      if (key !== exclude) this.playerDirection[key] = 0;
    });
  }

  changeAnim() {
    Object.keys(this.cursors).forEach((key) => {
      if (this.cursors[key].isUp) {
        // this.playerDirection["idle"] = 1;
      }
    });

    Object.keys(this.playerDirection).forEach((key) => {
      if (this.playerDirection[key]) this.char.play(`player_${key}`, true);
    });
  }

  makeIdle() {}
}
