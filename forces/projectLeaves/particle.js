Particle = function(x, y) {
  this.location = createVector(295, 150);
  this.velocity = createVector(0, 0); 
  this.acceleration = createVector(0, 0);
  this.target = createVector(x, y);
  this.maxSpeed = 20;
  this.maxForce = 0.5;
  this.img = loadImage('./leaf.png');
  this.G = 5;
  this.mass = 1;
}

Particle.prototype.update = function() {
  this.location.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.acceleration.mult(0);
}

Particle.prototype.steer = function() {
  let arrive = this.arrive(this.target);
  this.applyForce(arrive);
}

Particle.prototype.arrive = function(target) {
  let desired = p5.Vector.sub(target, this.location);
  let distance = desired.mag();
  let speed = this.maxSpeed;

  if (distance < 100) {
    speed = map(distance, 0, 100, 0, this.maxSpeed);
  }
  desired.setMag(speed);
  let steering = p5.Vector.sub(desired, this.velocity);
  steering.limit(this.maxForce);
  return steering;
}

//Vector -> Vector
Particle.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target, this.location);
  desired.setMag(this.maxSpeed);
  let steering = p5.Vector.sub(desired, this.velocity);
  steering.limit(this.maxForce);
  return steering;
}

Particle.prototype.applyForce = function(force) {
  force.limit(0.5);
  this.acceleration.add(force);
  this.velocity.limit(10);
}

Particle.prototype.render = function() {
  stroke(255);
  image(this.img, this.location.x, this.location.y);
}

Particle.prototype.repel = function(p) {
  let force = p5.Vector.sub(this.location, p.location);
  let distance = force.mag();

  let strength = (this.G * this.mass * this.mass) / (distance * distance);
  force.normalize();
  force.mult(strength);
  return force;
}
