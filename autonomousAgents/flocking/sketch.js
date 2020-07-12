// Ex.: create a flocking(schooling) simulation of fish, that includes at least
// one predator fish in a "tank". Work is based on "Boids" algorithm
// by Craig Reynolds and coding challange #124 by Daniel Shiffman
// Following is my attempt to create a picture, that depicts formation of schools,
// optimized by using quadtreee data structure.

let flock = [];
let physics;
const VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
const GravityBehavior = toxi.physics2d.behaviors.GravityBehavior;
let qt;
let predator;
const fleeingDistance = 60;
const fishAmount = 225;

function setup() {
  physics = new toxi.physics2d.VerletPhysics2D();
  createCanvas(windowWidth, windowHeight);
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));
  physics.setWorldBounds(new Rect(-30, -10, width, height));

  for (let i = 0; i < fishAmount; i++) {
    flock.push(new Fish(random(width), random(height), physics, false));
  }

  predator = new Fish(random(width), random(height), physics, true);
}

function draw() {
  let boundary = new Rectangle(width/2, height/2, width/2, height/2);
  qt = new QuadTree(boundary, 4);
  background(0, 47, 75);
  physics.update();
  let target = createVector(pmouseX, pmouseY);
  predator.render(predator);
  predator.update();
  predator.wrapBorders();
  predator.locomotion();
  flock.forEach(boid => {
    let range = new Rectangle(boid.location.x, boid.location.y, 70, 70);
    let points = [];
    qt.query(range, points);
    if (points) {
      let fishes = points.map(p => p.userData);
      if (fishes.length > 0) {
	let attraction = predator.hunt(fishes[0].location);
	predator.applyForce(attraction);
      }
    }
    qt.insert(new Point(boid.location.x, boid.location.y, boid));
  })

  flock.forEach(boid => {
    boid.render(boid);
    boid.update();
    boid.locomotion();
    boid.wrapBorders();
    let range = new Rectangle(boid.location.x, boid.location.y, 50, 50);
    let points = [];
    qt.query(range, points);
    if (points) {
      let fishes = points.map(p => p.userData);
      boid.applyBehavior(fishes);
      let dist = p5.Vector.dist(boid.location, predator.location);
      if (dist < fleeingDistance) {
	let fleeing = boid.flee(predator.location);
	boid.applyForce(fleeing);
      }
    }
    qt.insert(new Point(boid.location.x, boid.location.y, boid));
  })
}
