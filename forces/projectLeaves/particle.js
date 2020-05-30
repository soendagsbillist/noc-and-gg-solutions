Particle = function(x, y) {
  this.location = createVector(random(width), random(height));
  //this.velocity = createVector(0, 0);
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector(0, 0);
  this.target = createVector(x, y);
  this.maxSpeed = 5;
  this.maxForce = 0.3;
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
  this.acceleration.add(force);
}

Particle.prototype.render = function() {
  stroke(255);
  //strokeWeight(7);
  //point(thix.location.x, this.location.y);
  ellipse(this.location.x, this.location.y, 5, 5);
}
