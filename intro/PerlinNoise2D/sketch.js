// Ex. use multiplesamples of Perlin Noise samples
// Extra - combine with a random walker that draws lines
// across the canvas
let walker;

function setup() {
  createCanvas(640, 640);
  background(255);
  colorMode(RGB);
  frameRate(25);
  xoff = 0;
  yoff = 0;
  walker = new Walker(-100,100);


  noStroke();

  //yellow
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      bright = map(noise(xoff, yoff),0,1,0,255);
      noiseDetail(8, 0.7);
      fill(255, 255, bright, 255);
      rect(y, x, 1, 1);
      xoff += 0.01;
    }
    xoff = 0;
    yoff += 0.01;
  }
  //pink
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      bright = map(noise(xoff,yoff),0,1,0,200);
      noiseDetail(8, 0.7);
      fill(255, bright,255, 5);
      rect(y, x, 200, 200);
      xoff+= 0.01;
    }
    xoff = 0;
    yoff += 0.01;
  }
}

function draw() {

    walker.step();
    walker.render();

}
class Walker {
  constructor(minStep_, maxStep_){
    this.xpos = width/2;
    this.ypos = height/2;
    this.prevX = width/2;
    this.prevY = height/2;
    this.minStep = minStep_;
    this.maxStep = maxStep_;
    this.xoff = 0;
    this.yoff = 10000;
  }

  render() {
    stroke(255,255,75);
    fill(255,255,75);
    line(this.prevX, this.prevY, this.xpos, this.ypos);
  }

  montecarlo() {
    while (true) {
      var r1 = random(1);
      var probability = r1 * r1;
      var r2 = random(1);

      if (r2 < probability) {
	return r1;
      }
    }
  }

  step() {
    this.prevX = this.xpos;
    this.prevY = this.ypos;

    var stepSize = this.montecarlo() * 50;

    var stepX = random(-stepSize, stepSize);
    var stepY = random(-stepSize, stepSize);

    this.xoff += 0.01;
    this.yoff += 0.01;

    this.xpos += stepX;
    this.ypos += stepY;

    this.xpos = constrain(this.xpos,8,width-8);
    this.ypos = constrain(this.ypos,8,height-8);
  }
}
