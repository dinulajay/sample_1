import "./styles.css";
import Movement from "./movement.js";
import Animation from "./animation.js";
import Actions from "./actions.js";
import Scoring from "./scoring.js";

class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("map", "assets/map_1.png");
    this.load.image("kitten", "assets/kitten_1.png");
    this.load.image("block", "assets/block.png");

    //Tree
    this.load.spritesheet("tree", "assets/spritesheet.png", {
      frameWidth: 24,
      frameHeight: 30
    });

    //Player
    this.load.spritesheet("player", "assets/Basic Charakter Spritesheet.png", {
      frameWidth: 48,
      frameHeight: 48
    });

    //HealthBar
    this.load.spritesheet("healthBar", "assets/health_bar.png", {
      frameWidth: 5,
      frameHeight: 1
    });

    this.load.spritesheet("actions", "assets/Basic Charakter Actions.png", {
      frameWidth: 48,
      frameHeight: 48
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.add.image(400, 300, "map");

    this.playerDirection = { up: 0, down: 0, right: 0, left: 0, idle: 1 };

    this.animation = new Animation(this.anims);

    this.animation.create();

    // cody.play("cutdown");

    const trees = this.createTrees();

    const healthBars = [];

    const player = this.physics.add.sprite(500, 300, "player");
    // player.displayWidth = 48;
    // player.displayHeight = 48;

    // console.log(player)
    player.setScale(3);

    // Code refactoring needed
    player.setSize(14, 14, true);

    const container = this.add.image(300, 300, "block");
    container.visible = false;
    var text = this.add.text(50, 500, "", {
      font: "25px Sans",
      fill: "#000000"
    });

    // instructions_1
    this.add.text(50, 25, "CUT DOWN ALL THE TREES", {
      font: "25px Courier",
      fill: "#000000"
    });

    // instructions_2
    this.add.text(50, 550, "Push against the trees to cut them", {
      font: "25px Sans",
      fill: "#000000"
    });

    //  Store some data about this Gem:
    container.setData({
      health: 10
    });

    //  Whenever a data value is updated the `changedata` event is fired and we listen for it:
    container.on("changedata", function (gameObject, key, value) {
      text.setText(["health: " + container.getData("health")]);
    });

    this.move = new Movement(this.cursors, player, this.playerDirection);

    this.actions = new Actions(this.cursors, player);

    this.scoring = new Scoring(player, trees, container, this.time);

    this.graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0xaa0000 },
      fillStyle: { color: 0x0000aa }
    });

    trees.forEach((tree) => {
      this.physics.add.collider(player, tree);

      // healthBars.push(

      // );

      // this.graphics.fillRectShape(
      //   new Phaser.Geom.Rectangle(tree.x - 36 - 24, tree.y - 45 - 24, 10, 10)
      // );
    });
  }

  update(time, delta) {
    this.move.movement();

    this.move.changeAnim();

    this.actions.axe(this.playerDirection);

    this.scoring.score();
  }

  createTrees() {
    const trees = [];

    for (let step_1 = 100; step_1 < 500; step_1 += 100) {
      for (let step_2 = 125; step_2 < 500; step_2 += 100) {
        const tree = this.add.sprite(step_1, step_2, "tree").setScale(3);
        this.physics.add.existing(tree, true);
        tree.health = 5;
        trees.push(tree);
      }
    }

    return trees;
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
      // gravity: { y: 300 }
    }
  }
};

const game = new Phaser.Game(config);
