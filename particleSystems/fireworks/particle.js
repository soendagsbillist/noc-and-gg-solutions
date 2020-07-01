Particle = function(location) {
  this.location = location;
  this.velocity = createVector(random(-1, 1), random(-8, -12));
  this.acceleration = createVector(0, 0);
}

Particle.prototype.update = function() {
  this.location.add(this.velocity);
  this.velocity.add(this.acceleration);
  this.acceleration.mult(0);
}

Particle.prototype.applyForce = function(force) {
  //force.limit(0.5);
  this.acceleration.add(force);
  //this.velocity.limit(10);
}

Particle.prototype.render = function() {
  stroke(200);
  strokeWeight(3);
  point(this.location.x, this.location.y);
}

Particle.prototype.isExploded = function() {
  if (this.velocity.y >= 0) {
    return true;
  }
}
