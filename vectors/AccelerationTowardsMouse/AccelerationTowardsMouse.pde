// Exercise 1.8
// Implement Acceleration towards the mouse location

Mover m;

PVector maxDir;
float maxMag;

void setup() {
    size(640, 360);
    m = new Mover(width/2, height/2, -10, 10);

    maxDir = PVector.add(new PVector(0,0), new PVector(width, height));
    maxMag = maxDir.mag();
}

void draw() {
    background(150);
    //stroke(0);
    //rotate(maxDir.heading());
    //line(0,0,maxMag,0);
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
    float gravity;

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
	stroke(255);
	ellipse(location.x, location.y, 15, 15);
    }

    void move() {
	PVector mouse = new PVector(mouseX, mouseY);
	//PVector direction = PVector.sub(mouse, location);
	acceleration = PVector.sub(mouse, location);

	gravity = (maxMag - acceleration.mag()) / maxMag;
	acceleration.normalize();
	acceleration.mult(gravity);
	//acceleration = direction;

	velocity.add(acceleration);
	velocity.limit(7);
	location.add(velocity);
	println(acceleration);
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
