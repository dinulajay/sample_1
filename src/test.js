class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.setBaseURL("https://labs.phaser.io");
    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("ground", "src/games/firstgame/assets/platform.png");
    this.load.image("star", "src/games/firstgame/assets/star.png");
    this.load.spritesheet("dude", "src/games/firstgame/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });

    // this.load.image("map", "assets/map_1.png");
    // this.load.image("kitten", "assets/kitten_1.png");
    // this.load.spritesheet("tree", "assets/spritesheet.png", {
    //   frameWidth: 24,
    //   frameHeight: 30
    // });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    // this.add.image(400, 300, "map");

    // this.tree = this.physics.add.image(200, 200, "tree").setScale(3);

    this.mainCharacter = this.physics.add.image(400, 300, "kitten");

    // this.mainCharacter_1 = this.physics.add.image(400, 100, "kitten");

    // this.mainCharacter.body.setCollideWorldBounds(true);

    // this.mainCharacter.setScale(3);

    this.add.image(400, 300, "sky");

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

    // platforms.create(600, 400, 'ground');
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');

    this.movingPlatform = this.physics.add.image(400, 400, "ground");

    this.movingPlatform.setImmovable(true);
    this.movingPlatform.body.allowGravity = false;
    this.movingPlatform.setVelocityX(50);

    this.player = this.physics.add.sprite(100, 450, "dude");

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    // for (const star of this.stars.getChildren())
    // {
    //     star.setBounceY(Math.FloatBetween(0.4, 0.8));
    // }

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.movingPlatform);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.stars, this.movingPlatform);
    this.physics.add.collider(this.player, this.mainCharacter);

    // this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
  }

  update() {
    //   if (this.cursors.left.isDown) {
    //     this.mainCharacter.x--;
    //   } else if (this.cursors.right.isDown) {
    //     this.mainCharacter.x++;
    //   }

    //   if (this.cursors.up.isDown) {
    //     this.mainCharacter.y--;
    //   } else if (this.cursors.down.isDown) {
    //     this.mainCharacter.y++;
    //   }

    const { left, right, up } = this.cursors;

    if (left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play("left", true);
    } else if (right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play("turn");
    }

    if (up.isDown) {
      this.player.setVelocityY(-330);
    }

    if (this.movingPlatform.x >= 500) {
      this.movingPlatform.setVelocityX(-50);
    } else if (this.movingPlatform.x <= 300) {
      this.movingPlatform.setVelocityX(50);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: Example,
  antialias: false,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
      // gravity: { y: 300 }
    }
  }
};

const game = new Phaser.Game(config);
