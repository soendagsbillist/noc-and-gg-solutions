// Ex.: create fireworks simulation based on coding train challenge #27
// Following is my take on creating fireworks shaped in a heart-like form

let fireworks = new Set();
let explosions = new Set();
let gravity;
let stars = [];
let flickering = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.1);
  background(0);

  for (i=0; i<200; i++) {
    const star = createVector(random(width), random(height));
    stars.push(star);
  }
}
function draw() {
  colorMode(RGB);

  stars.forEach(star => {
    stroke(255, flickering);
    strokeWeight(2);
    point(star.x, star.y);

    if (flickering > 50) flickering = 0;
    flickering += 1;
  });

  background(0, 0, 0, 20);


  if (random(1) < 0.01) {
    fireworks.add(new Particle(createVector(random(width), height)));
  };

  fireworks.forEach(firework => {
    firework.update();
    firework.applyForce(gravity);
    firework.render();

    if (firework.isExploded()) {
      fireworks.delete(firework);

      explosions.add(new Firework(createVector(firework.location.x, firework.location.y), 0));
      explosions.forEach(expl => {
	if (!expl.isExploded) {
	  expl.explode();
	}
      })
    };
 });

  explosions.forEach(expl => {
    expl.run(gravity);
    if (expl.isFaded()) {
      explosions.delete(expl);
    }
  })
}
