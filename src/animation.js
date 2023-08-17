export default class Anime {
  constructor(anims) {
    console.log("animation OBJECT initialized");

    this.anims = anims;
  }

  create() {
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("tree", { frames: [0] }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: "cutdown",
      frames: this.anims.generateFrameNumbers("tree", { frames: [0, 1] }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: "bar",
      frames: this.anims.generateFrameNumbers("healthBar", {
        frames: [0, 1, 2, 3, 4, 5]
      }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: "player_idle",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0]
      }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: "player_down",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [0, 1, 2, 3]
      }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: "player_up",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [4, 5, 6, 7]
      }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: "player_left",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [8, 9, 10, 11]
      }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: "player_right",
      frames: this.anims.generateFrameNumbers("player", {
        frames: [12, 13, 14, 15]
      }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: "player_axing",
      frames: this.anims.generateFrameNumbers("actions", {
        frames: [9, 10]
      }),
      frameRate: 5,
      repeat: -1
    });
  }
}
