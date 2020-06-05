// Ex. 3.3 steering controls
// Press D to turn clockwise
// and A for the opposide direction
Vehicle v;
Direction d;
boolean isPressed = false;

void setup() {
    size(940, 990);
    v = new Vehicle();
    d = new Direction();
}

void draw() {
    background(150);

    d.control();
    d.rotation();
    d.render();

    PVector dir = PVector.sub(d.giveDirection(), v.location);
    dir.normalize();

    v.render();
    v.update();
    v.applyForce(dir);
}

class Vehicle {
    PVector location;
    PVector velocity;
    PVector acceleration;

    float angle;

    Vehicle() {
	location = new PVector(width/2, height/2);
	velocity = new PVector(0,0);
	acceleration = new PVector(0,0);
	angle = velocity.heading();
    }

    void render() {

	// PVector.heading is equivalent of arctangent function
	float angle = velocity.heading();

	noStroke();
	fill(255);
	pushMatrix();
	rectMode(CENTER);
	translate(location.x,location.y);
	rotate(angle);
	rect(0, 0, 30, 10);
	popMatrix();
    }

    void update() {
	location.add(velocity) ;
	velocity.add(acceleration);
	acceleration.mult(0);
    }

    void applyForce(PVector force) {
	acceleration.add(force);
	velocity.limit(2);
    }
}

 void keyPressed() {
     d.control();
 }

void keyReleased() {
    isPressed = false;
}

class Direction {
    PVector location;
    PVector polarLocation;
    float radius;
    float theta;

    Direction() {
	location = new PVector(width/2, height/2);
	polarLocation = new PVector(0, 0);
	radius = 1000;
	theta = PI / 4;
    }

    void rotation() {
	polarLocation.x = radius * cos(theta);
	polarLocation.y = radius * sin(theta);
    }

    void control() {
	if (keyCode == 68 && keyPressed) {
	    theta += 0.3;
	} else if (keyCode == 65 && keyPressed) {
	    theta -= 0.3;
	}
    }

    PVector giveDirection() {
	PVector dir = PVector.add(polarLocation, location);
	return dir;
    }

    void render() {
	noStroke();
	fill(0);
	ellipse(polarLocation.x + location.x, polarLocation.y + location.y, 16, 16);
    }
}

