class Player {

  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.charWidth = 20;
    this.charHeight = 40;
  }

  render = function() {
    noStroke();
    fill(255);
    rect(this.location.x, this.location.y, this.charWidth, this.charHeight);
  }
}
