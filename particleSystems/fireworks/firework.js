Firework = function (location, vel, hue_) {
  Particle.call(this, location);
  this.velocity = vel;
  this.explosions = new Set();
  this.fireworks = [];
  this.isExploded = false;
  this.faded = false;
  this.lifespan = 1;
  this.hue = hue_;
  this.randomForce = createVector(random(-0.01, 0.01), random(-0.01, 0.01));
}

Firework.prototype = Object.create(Particle.prototype);

Firework.prototype.isFaded = function() {
  this.lifespan -= 0.02;
  return this.lifespan <= 0;
}

Firework.prototype.explode = function() {
  for (i = 0; i < 60; i++) {
    this.fireworks.push(new Firework(createVector(this.location.x, this.location.y),
				     this.createHeart(i, 13), 0));
    this.fireworks.push(new Firework(createVector(this.location.x, this.location.y),
				     this.createHeart(i, 12), 25));
    this.fireworks.push(new Firework(createVector(this.location.x, this.location.y),
				     this.createHeart(i, 11), 50));
    this.fireworks.push(new Firework(createVector(this.location.x, this.location.y),
				     this.createHeart(i, 10), 100));
    this.fireworks.push(new Firework(createVector(this.location.x, this.location.y),
				     this.createHeart(i, 8), 150));
    this.fireworks.push(new Firework(createVector(this.location.x, this.location.y),
				     this.createHeart(i, 6), 200));
    this.fireworks.push(new Firework(createVector(this.location.x, this.location.y),
				     this.createHeart(i, 5), 280));
    this.isExploded = true;
  }
}

// returns a Vector object to draw a heart shape
Firework.prototype.createHeart = function(count, scale) {

  a = count;
  r = scale + random(10);

  heart = createVector();
  heart.x = (16 * pow(sin(a), 3)) / r;
  heart.y = (-1 * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a))) / r;
  a += 0.1;

  return heart;
}

Firework.prototype.render = function() {
  colorMode(HSB);
  noStroke();
  fill(this.hue, 190, 255, this.lifespan);
  ellipse(this.location.x, this.location.y, 2, 2);
  this.lifespan -= 0.002;
}

Firework.prototype.run = function(force) {
  this.fireworks.forEach(fw => {
    fw.update();
    fw.render();
    fw.applyForce(force);
    fw.applyForce(this.randomForce);
    fw.isFaded();
  });
}
