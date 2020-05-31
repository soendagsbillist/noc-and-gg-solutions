let windowWidth = 1600;
let windowHeight = 600;
let font;
let leaves = [];
let mouseEvent = false;
let w;
let radius, angle;
let flowfields = [];

function preload() {
  font = loadFont('./assets/iAWriterDuoS-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  w = createVector(0, 0);
  angle = 0;
  bg = loadImage("./assets/bg.png");
  image(bg, 0, 0);

  let points = font.textToPoints('effectvoll', 0, 200, 150);
  pt = new Particle(0, 200);

  points.forEach(pt => {
    let leaf = new Particle(pt.x, pt.y);
    leaves.push(leaf);
    let windForce = createWind(w);
    let force = windForce.next().value;
    flowfields.push(force);
  });
}

function draw() {
  background(img);
   
  leaves.forEach(leaf => {
    leaf.render();
    leaf.update();
  });
  
  if(mouseEvent) {
    const windP = createWind(w);
    let forceP = windP.next().value;

    leaves.forEach(leaf => {
      w.add(0, random(-3, 4));
      leaf.applyForce(forceP.add(w));
      leaves.forEach(l => {
	if (leaf != l) {
	  let repelling = l.repel(leaf);
	  leaf.applyForce(repelling);
	}
      })
    });
  } else {
    pt.steer();
     leaves.forEach(leaf => {
       leaf.steer();
     });
  }
}

function mousePressed(event) {
  if (event !== undefined) {
    mouseEvent = true;
  }
}

function mouseReleased(event) {
  if (event !== undefined) {
    mouseEvent = false;
  }
}

// Vector -> Vector
// takes vector force of wind
// changes it and returns destination vector
// to be appliead as a force to give particles
// a direction to move.

function *createWind(wind_) {
  let inc = 0.1;
  let target = createVector(1600, 200);

  while(true) {
    wind_.y = map(sin(angle), -1, 1, -600, 600);
    angle += inc;
    wind_.x = 700;

    target.normalize();
    yield target;
  }
}
