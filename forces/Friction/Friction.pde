// Solution to Ex. 2.4, .6
// Implement drag force that is also dependent on the surface area of an object

Mover[] movers = new Mover [10];
Block b;

void setup() {
    size(1200, 800);

    for (int i = 0; i < movers.length; i++) {
     	movers[i] = new Mover(random(2, 6), random(width + 50), 0);
    }
    b = new Block(0, height/2, width, height/2, 0.5);
}

void draw() {
    background(135);

    for (Mover m : movers) {
	if (m.isInside(b)) {
	    m.drag(b);
	}

	float ma = 0.1 * m.mass;
	PVector gravity = new PVector(0, ma);

	m.applyForce(gravity);
	m.update();
	m.render();
	m.checkBorders();
    }
    b.render();
}
class Mover {
    PVector location;
    PVector velocity;
    PVector acceleration;
    float mass;
    float moverWidth, moverHeight;

    Mover(float mass_, float xpos, float ypos) {
	location = new PVector(xpos, ypos);
	velocity = new PVector(0, 0);
	acceleration = new PVector(0, 0);
	mass = mass_;
	moverWidth = random(1, 15);
	moverHeight = 15;
    }

    void checkBorders() {
	if (location.x > width - moverWidth * mass) {
	    location.x = width - moverWidth * mass;
	    velocity.x *= -1;
	} else if (location.x < 0) {
	    location.x = 0;
	    velocity.x *= -1;
	}

	if (location.y > height - moverHeight * mass) {
	    location.y = height - moverHeight * mass;
	    velocity.y *= -1;
	} else if (location.y < 0) {
	    location.y = 0;
	    velocity.y *= -1;
	}
    }

    void applyForce(PVector force) {
	PVector f = PVector.div(force, mass);
	acceleration.add(f);
    }

    void update() {
	velocity.add(acceleration);
	location.add(velocity);
	acceleration.mult(0);
    }

    void render() {
	stroke(255);
	rect(location.x, location.y, mass * moverWidth, mass * moverHeight);
    }

    boolean isInside(Block b) {
	if (location.x > b.location.x
	    && location.x < b.location.x + b.w
	    && location.y < b.location.y + b.h
	    && location.y > b.location.y) {
	    return true;
	} else {
	    return false;
	}
    }

    void drag(Block b) {
	float speed = velocity.mag();
	float surfaceScaled = moverWidth * 0.05;
	float dragMagnitude = b.coefficient * speed * speed * surfaceScaled;

	PVector drag = velocity.copy();
	drag.mult(-1);
	drag.normalize();
	println(drag);

	drag.mult(dragMagnitude);

	applyForce(drag);
    }
}

class Block {
    PVector location;
    float w,h;
    float coefficient;

    Block(float x, float y, float width, float height, float c) {
	location = new PVector(x, y);
	w = width;
	h = height;
	coefficient = c;
    }

    void render() {
	noStroke();
	fill(175, 40);
	rect(location.x, location.y, w,  h);
    }
}
