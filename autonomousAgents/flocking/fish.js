const Vec2D = toxi.geom.Vec2D
const Rect = toxi.geom.Rect;
const VerletParticle = toxi.physics2d.VerletParticle2D;

// Num, Num, Toxi.physics2d.VerletPhysics2d(), Bool -> Fish()
Fish = function(x, y, p_, predator_) {
  this.predator = predator_;
  this.right = true;
  this.location = createVector(random(x), random(y));
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector();
  this.p = p_;

  this.maxSpeed = 1;
  this.maxForce = 0.1;
  this.radius = 3;
  this.zeroVector = createVector();

  // head
  //___________________________________________
  translate(this.location.x, this.location.y);
  if (this.predator){
    this.leftHead = new Particle(0, 4);
    this.rightHead = new Particle(10, 4);
    this.leftTopHead = new Particle(2, -2);
    this.rightTopHead = new Particle(8, -2);
  } else {
    this.leftHead = new Particle(0, 2);
    this.rightHead = new Particle(5, 2);
    this.leftTopHead = new Particle(1, -1);
    this.rightTopHead = new Particle(4, -1);
  }
  // this.leftHead = new Particle(this.location.x, this.location.y);
  // this.rightHead = new Particle(this.location.x + 5, this.location.y);
  // this.leftTopHead = new Particle(this.location.x + 1, this.location.y - 1);
  // this.rightTopHead = new Particle(this.location.x + 4, this.location.y - 1);

  this.leftHead.lock();
  this.rightHead.lock();
  this.leftTopHead.lock();
  this.rightTopHead.lock();

  this.p.addParticle(this.leftHead);
  this.p.addParticle(this.rightHead);
  this.p.addParticle(this.leftTopHead);
  this.p.addParticle(this.rightTopHead);
  //___________________________________________

  // body
  //___________________________________________

  if (this.predator) {
    this.leftBody = new Particle(2, 16);
    this.rightBody = new Particle(8, 16);
  } else {
    this.leftBody = new Particle(1, 8);
    this.rightBody = new Particle(4, 8);
  }
  // this.leftBody = new VerletParticle(new Vec2D(this.location.x + 1, this.location.y + 8));
  // this.rightBody = new VerletParticle(new Vec2D(this.location.x + 4, this.location.y + 8));

  this.p.addParticle(this.leftBody);
  this.p.addParticle(this.rightBody);
  //___________________________________________

  // tail
  //___________________________________
  if (this.predator) {
    this.tail = new Particle(5, 30);
  } else {
    this.tail = new Particle(2.5, 15);
  }
  //this.tail = new VerletParticle(new Vec2D(this.location.x + 2.5, this.location.y + 15));
  this.p.addParticle(this.tail);
  //___________________________________

  //joints
  //___________________________________
  //this.headBodyConnectionLeft = physics.VerletSpring2D(this.leftHead,this.rightHead,50,0.01);

  this.headBodyConnectionLeft = new toxi.physics2d.VerletSpring2D(this.leftHead, this.leftBody,5,0.01);
  this.headBodyConnectionRight = new toxi.physics2d.VerletSpring2D(this.rightHead, this.rightBody,5,0.01);
  this.p.addSpring(this.headBodyConnectionLeft);
  this.p.addSpring(this.headBodyConnectionRight);
  // physics.addSpring(headBodyConnectionLeft);
  // physics.addSpring(headBodyConnectionRight);

  this.bodyConnection = new toxi.physics2d.VerletSpring2D(this.leftBody,this.rightBody,5,0.01);
  this.p.addSpring(this.bodyConnection);
  // physics.addSpring(bodyConnection);

  this.bodyTailConnectionLeft = new toxi.physics2d.VerletSpring2D(this.leftBody,this.tail,10,0.009);
  this.p.addSpring(this.bodyTailConnectionLeft);
  this.bodyTailConnectionRight = new toxi.physics2d.VerletSpring2D(this.rightBody,this.tail,10,0.009);
  this.p.addSpring(this.bodyTailConnectionRight);
  //___________________________________

  //this.headBodyConnectionRight = physics.VerletSpring2D(rightHead,rightBody,50,0.01);
  //physics.addParticle(this.leftHead);
  //physics.addParticle(this.rightHead);
}

Fish.prototype.render = function(obj) {
  theta = this.velocity.heading() + PI / 2;

  if (this.predator) {
    fill(115, 59, 3);
  } else {
    fill(254, 142, 33);
  }
  push();
  translate(obj.location.x, obj.location.y);

  rotate(theta);
  noStroke();
  beginShape();
  curveVertex(this.rightHead.x, this.rightHead.y);
  curveVertex(this.rightHead.x, this.rightHead.y);
  curveVertex(this.rightTopHead.x, this.rightTopHead.y);
  curveVertex(this.leftTopHead.x, this.leftTopHead.y);
  curveVertex(this.leftHead.x, this.leftHead.y);
  curveVertex(this.leftHead.x, this.leftHead.y);
  endShape();
  beginShape();
  vertex(this.rightHead.x, this.rightHead.y);
  vertex(this.rightBody.x, this.rightBody.y);
  vertex(this.leftBody.x, this.leftBody.y);
  vertex(this.leftHead.x, this.leftHead.y);
  endShape();
  beginShape();
  vertex(this.rightBody.x, this.rightBody.y);
  vertex(this.leftBody.x, this.leftBody.y);
  vertex(this.tail.x, this.tail.y);
  vertex(this.rightBody.x, this.rightBody.y);
  vertex(this.tail.x, this.tail.y);
  endShape();
  beginShape();
  vertex(this.tail.x, this.tail.y);
  vertex(this.tail.x-1, this.tail.y+1.5);
  vertex(this.tail.x+1.5, this.tail.y+1.5);
  endShape(CLOSE);
  //this.leftHead.display();
  //this.rightHead.display();
  //this.leftBody.display();
  //this.rightBody.display();
  //this.tail.display();
  pop();
}

Fish.prototype.locomotion = function() {
  if (this.predator) {
    if (this.right && this.rightBody.x < 7) {
      this.rightBody.x += random(0.5, 0.6);
    } else if (!this.right) {
      this.leftBody.x -= random(0.4, 0.5);
    }
    if (this.rightBody.x > 7 && this.right) {
      this.right = false;
    } else if (this.leftBody.x < -1) {
      this.right = true;
    }
  } else {
    if (this.right && this.rightBody.x < 7) {
      this.rightBody.x += random(0.25, 0.3);
    } else if (!this.right) {
      this.leftBody.x -= random(0.25, 0.3);
    }
    if (this.rightBody.x > 7 && this.right) {
      this.right = false;
    } else if (this.leftBody.x < -1) {
      this.right = true;
    }
  }
}

Fish.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxSpeed);
  this.location.add(this.velocity);
  this.acceleration.mult(0);
}

Fish.prototype.wrapBorders = function() {
  if (this.location.x < -this.radius) this.location.x = width+this.radius;
  if (this.location.y < -this.radius) this.location.y = height+this.radius;
  if (this.location.x > width+this.radius) this.location.x = -this.radius;
  if (this.location.y > height+this.radius) this.location.y = -this.radius;
}

Fish.prototype.applyForce = function(force) {
  this.acceleration.add(force);
}

Fish.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target, this.location);
  desired.normalize();
  desired.mult(this.maxSpeed);

  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxForce);
  return steer;
}

Fish.prototype.hunt = function(target) {
  let desired = p5.Vector.sub(target, this.location);
  desired.normalize();
  desired.mult(5);

  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(0.01);
  return steer;
}

Fish.prototype.flee = function(target) {
  let desired = p5.Vector.sub(target, this.location);
  desired.normalize();
  desired.mult(5);

  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxForce);
  return steer.mult(-1);
}


Fish.prototype.align = function(boids) {
  let neighbordist = 50;
  let total = 0;
  let sum = createVector();

  boids.forEach(boid => {
    let distance = p5.Vector.dist(this.location, boid.location);
    if (distance > 0 && distance < neighbordist) {
      sum.add(boid.velocity);
      total++;
    }
  });

  if (total > 0) {
    sum.div(total);
    sum.normalize();
    sum.mult(this.maxSpeed);

    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return this.zeroVector;
  }
}

Fish.prototype.cohesion = function(boids) {
  let neighbordist = 50;
  let total = 0;
  let sum = createVector();

  boids.forEach(boid => {
    let distance = p5.Vector.dist(this.location, boid.location);
    if (distance > 0 && distance < neighbordist) {
      sum.add(boid.location);
      total++;
    }
  });

  if (total > 0) {
    sum.div(total);
    return this.seek(sum);
  } else {
    return this.zeroVector;
  }
}

Fish.prototype.separate = function(boids) {
  let desiredSeparation = 50;
  let total = 0;
  let sum = createVector();
  let steer = createVector();
  boids.forEach(boid => {
    let distance = p5.Vector.dist(this.location, boid.location);
    if (distance > 0 && distance < desiredSeparation) {
      let diff = p5.Vector.sub(this.location, boid.location);
      diff.normalize();
      diff.div(distance*distance);

      sum.add(diff);
      total++;
    }
  });

  if (total > 0) {
    sum.div(total);
    sum.normalize();
    sum.setMag(this.maxSpeed);
    steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxForce);
  }

  return steer;
}

Fish.prototype.applyBehavior = function(boids) {
  let alignment = this.align(boids);
  let coh = this.cohesion(boids);
  let separation = this.separate(boids);

  alignment.mult(0.4);
  coh.mult(0.05);
  separation.mult(0.3);

  this.applyForce(alignment);
  this.applyForce(coh);
  this.applyForce(separation);
}

class Particle extends toxi.physics2d.VerletParticle2D {
  constructor(x, y) {
    super(x, y);
  }

  display() {
    stroke(0);
    ellipse(this.x, this.y, 16, 16);
  }
}
