// Exercise 1.6
// Implement Acceleration according to Perlin noise

Mover m;

void setup() {
    size(640, 360);
    m = new Mover(width/2, height/2, -10, 10);
}

void draw() {
    m.render();
    m.move();
    m.checkBorders();
}

class Mover {

    PVector location;
    PVector velocity;
    PVector acceleration;
    float topspeed;
    float xoff, yoff;
    float minStep, maxStep;
    float step;

    Mover(float xpos_, float ypos_, float minStep_, float maxStep_) {
	location = new PVector(xpos_, ypos_);
	velocity = new PVector(0,0);
	topspeed = 2;

	xoff = 0;
	yoff = 10000;

	minStep = minStep_;
	maxStep = maxStep_;
    }

    void render() {
	background(150);
	stroke(255);
	ellipse(location.x, location.y, 15, 15);
    }

    void move() {
	acceleration = new PVector(map(noise(xoff), 0, 1, minStep, maxStep),
				   map(noise(yoff), 0, 1, minStep, maxStep));
	yoff += 0.01;
	xoff += 0.01;

	velocity.add(acceleration);
	velocity.limit(topspeed);
	location.add(velocity);
    }

    void checkBorders() {
	if (location.x > width) {
	    location.x = 0;
	} else if (location.x < 0){
	    location.x = width;
	}

	if (location.y > height) {
	    location.y = 0;
	} else if (location.y < 0){
	    location.y = height;
	}
    }
}
