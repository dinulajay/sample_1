export default class Scoring {
  constructor(player, trees, container, time) {
    console.log("Scoring OBJECT initialized");

    this.player = player;

    this.trees = trees;

    this.points = 0;

    this.container = container;

    this.time = time;

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.onEvent,
      callbackScope: this,
      repeat: 100
    });

    this.timedEvent.paused = true;

    this.current = { health: 5 };
  }

  score() {
    this.trees.forEach((tree) => {
      tree.setScale(3);
    });

    if (
      this.player.body.touching.left ||
      this.player.body.touching.right ||
      this.player.body.touching.up ||
      this.player.body.touching.down
    ) {
      this.trees.forEach((tree) => {
        this.checkBoundaries(tree);
      });
    } else {
      this.timedEvent.paused = true;
    }

    this.container.data.values.health = this.current.health;
  }

  onEvent() {
    this.current.health--;
    if (this.current.health === 0) {
      this.current.destroy();
      this.points++;
    }
  }

  checkBoundaries(tree) {
    const boundingBox = {
      x1: tree.x - 36,
      y1: tree.y - 45,
      x2: tree.x + 36,
      y2: tree.y + 45
    };

    let player_x = this.player.x;
    let player_y = this.player.y;

    if (this.player.body.touching.left) {
      player_x = this.player.x - 24;
    } else if (this.player.body.touching.right) {
      player_x = this.player.x + 24;
    } else if (this.player.body.touching.up) {
      player_y = this.player.y - 24;
    } else if (this.player.body.touching.down) {
      player_y = this.player.y + 24;
    }

    if (
      boundingBox.x1 < player_x &&
      boundingBox.y1 < player_y &&
      boundingBox.x2 > player_x &&
      boundingBox.y2 > player_y
    ) {
      this.current = tree;
      this.timedEvent.paused = false;
      tree.setScale(4);
    }
  }
}
