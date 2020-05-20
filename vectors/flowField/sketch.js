// Ex. generate flow field with Perlin noise, so it resembles spring
// Following is my take on spring rainbow, chaotic, but still spring-ish :)
// Perlin noise flow fields are generated before draw() to minimize costs
// The idea is influenced by Coding Train Challenge #24 and developed further
// following my preferences

const step = 20;

const increment = 0.01;

var flowfields = [];

function setup() {
  createCanvas(800,800);
  colorMode(HSB, 100);
  background(255);

  cols = height/step;
  rows = width/step;

  orange = generateParticles(100);
  green = generateParticles(100);
  yellow = generateParticles(100);
  blue = generateParticles(100);
  purple = generateParticles(100);
  pink = generateParticles(100);

  flowfield = new Flowfield();
  for(i = 0; i < 6; i++) {
    flowfields[i] = flowfield.createFlowfield(random(100, 1000));
  }
}

function draw() {
  drawParticles(orange, 9, 70, flowfields[0]);
  drawParticles(green, 28, 50, flowfields[1]);
  drawParticles(yellow, 16, 70, flowfields[2]);
  drawParticles(blue, 58, 70, flowfields[3]);
  drawParticles(purple, 76, 70, flowfields[4]);
  drawParticles(pink, 88, 40, flowfields[5]);
}

function Particle() {
  this.location = createVector(random(width), random(height));
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.topSpeed = 10;

  this.prevLocation = this.location.copy();

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

// Col -> Img of line
  this.render = function(col, sat) {
    alpha(50);
    stroke(col, sat,200);
    //stroke(this.h, 255, 255, 25);
    this.brightness = this.brightness + 1;
    if (this.brightness > 100) {
      this.brightness = 40;
    }
    //stroke(0,5);
    strokeWeight(3);
    //point(this.location.x, this.location.y);
    line(this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y);
    this.updateLocation();
  }

  //PVector[] -> PVector[]
  // take vectors of flowfield and apply it as a force
  // to the vectors of particles
  this.follow = function(direction) {
    var x = floor(this.location.x / step);
    var y = floor(this.location.y / step);
    var index = x + y * cols;

    force = direction[index]; 

    this.applyForce(force);
  }

  this.updateLocation = function() {
    this.prevLocation.x = this.location.x;
    this.prevLocation.y = this.location.y;
  }

  this.checkBorders = function() {
    if (this.location.x < 0 ) {
      this.location.x = width;
      this.updateLocation();
    } 
    if (this.location.x > width ) {
      this.location.x = 0;
      this.updateLocation();
    } 
    if (this.location.y < 0 ) {
      this.location.y = height;
      this.updateLocation();
    } 
    if (this.location.y > height) {
      this.location.y = 0;
      this.updateLocation();
    } 
  }
}


function Flowfield() {
  // yOffset -> Flowfield
  this.createFlowfield = function(yOffset) {
    zoff = 0;
    var flowfield = [];
    flowfield = new Array(cols * rows);
    yoff = yOffset;
    for (y = 0; y < rows; y++) {
      xoff = 0;
      yoff += increment;
      for (x = 0; x < cols; x++) {
	index = x + y * cols;

	push();
	translate(x*step,y*step);
	angle = map(noise(xoff,yoff,zoff),0,1,0,180);
	//angle = noise(xoff,yoff);
	direction = p5.Vector.fromAngle(angle);
	flowfield[index] = direction;
	rotate(direction.heading());
	pop();
	xoff += increment;
      }
      zoff+=0.000019;
    }
    return flowfield;
  }
}

//Particle[] Colour Saturation Flowfield -> Img of Particle[]
drawParticles = function(array, col, sat, flow) {
  testParticles = [];
  
  for (i = 0; i < array.length; i++) {
    array[i].checkBorders();
    array[i].render(col, sat);
    array[i].update();
    array[i].follow(flow);
  }
}

//Size -> Particle[]
generateParticles = function(size) {
  particles = [];
  for(i = 0; i < size; i++) {
    particles[i] = new Particle();
  }
  return particles;
}
