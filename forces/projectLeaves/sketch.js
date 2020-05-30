let windowWidth = 800;
let windowHeight = 300;
let font;
let leaf;

function fontRead(){
    fontReady = true;
}

function preload() {
  font = loadFont('./AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);

  leaf = new Particle();
  //textFont('Arial');

  let points = font.textToPoints('effectvoll', 100, 200, 150);

  points.forEach(pt => {
    leaf.render(pt.x, pt.y);
  });
}

function draw() {

}


Particle = function() {
  this.location = createVector(0,0);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
}

Particle.prototype.render = function(x,y) {
  stroke(255);
  //strokeWeight(7);
  //point(thix.location.x, this.location.y);
  ellipse(x,y,5,5);
}
