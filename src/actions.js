export default class Actions {
  constructor(cursors, mainCharacter, playerDirection) {
    console.log("Actions OBJECT initialized");

    this.char = mainCharacter;

    this.cursors = cursors;

    this.playerDirection = playerDirection;
  }

  axe(playerDirection) {
    if (this.cursors.space.isDown) {
      Object.keys(playerDirection).forEach((key) => {
        playerDirection[key] = 0;
      });

      this.char.play("player_axing", true);
    } else if (this.cursors.space.isUp) {
    }
  }
}
