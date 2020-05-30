let windowWidth = 800;
let windowHeight = 300;
let font;
let leaves = [];

function fontRead(){
    fontReady = true;
}

function preload() {
  font = loadFont('./AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //textFont('Arial');

  let points = font.textToPoints('effectvoll', 100, 200, 150);

  points.forEach(pt => {
    let leaf = new Particle(pt.x, pt.y);
    leaves.push(leaf);
  });

}

function draw() {
  background(50);
   
  leaves.forEach(leaf => {
    leaf.render();
    leaf.update();
    leaf.steer();
  });
  mousePressed();
  mouseReleased();
}

function mousePressed(event) {
  if (event !== undefined) {
    console.log(event.type);
  }
}

function mouseReleased(event) {
  if (event !== undefined) {
    console.log(event.type);
  }
}
