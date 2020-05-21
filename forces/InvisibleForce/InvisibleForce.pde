// Solution to Ex. 2.3
// apply force that pushes back from the canvas border

Mover[] movers = new Mover[10];

PVector wallForce;

void setup() {
    size(640, 360);
    for (int i = 0; i < movers.length; i++) {
	movers[i] = new Mover(random(1, 5), random(width), height / 2);
    }
    wallForce = new PVector(0,10);
}

void draw() {
    background(155);

    for (Mover m : movers) {
	PVector gravity = new PVector(0, -0.1);

	m.applyForce(gravity);

    	if (mousePressed) {
	    PVector wind = new PVector(map(noise(random(10000)), 0, 1, 0, 5), 0);
    	    m.applyForce(wind);
    	}
	m.update();
	m.render();
	m.checkBorders(wallForce);
    }
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
	moverWidth = 15;
	moverHeight = 15;
    }

    void checkBorders(PVector f) {
	if (location.x > width) {
	    location.x = width;
	    velocity.x *= -1;
	} else if (location.x < 0) {
	    location.x = 0;
	    velocity.x *= -1;
	}

	if (location.y > height) {
	    location.y = height;
	    velocity.y *= -1;
	} else if (location.y < moverHeight) {
	    //location.y = moverHeight;
	    //velocity.y *= -1;
	    applyForce(f);
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
	ellipse(location.x, location.y, mass * moverWidth, mass * moverHeight);
    }
}
