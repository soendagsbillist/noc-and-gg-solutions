let windowWidth = 1600;
let windowHeight = 800;
let font;
let leaves = [];
let mouseEvent = false;
let w;
let radius, angle;
let flowfields = [];

function preload() {
  font = loadFont('./AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  w = createVector(0, 0);
  angle = 0;

  //textFont('Arial');

  let points = font.textToPoints('effectvoll', 100, 200, 150);
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
  background(50);
   
  leaves.forEach(leaf => {
    leaf.render();
    leaf.update();
  });
  
  if(mouseEvent) {
    const windP = createWind(w);
    let forceP = windP.next().value;

    leaves.forEach(leaf => {
      w.add(0, random(2));
      leaf.applyForce(forceP.add(w));
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

// Wind -> Target
// takes wind vector, modifies it and returns
// target direction
function *createWind(wind_) {
  let inc = 0.1;
  let target = createVector(1600, 200);

  while(true) {
    wind_.y = map(sin(angle), -1, 1, -800, 800);
    angle += inc;
    wind_.x = 700;

    target.normalize();
    yield target;
  }
}
