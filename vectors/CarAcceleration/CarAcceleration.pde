// Ex. 1.5 Create a simulation of a car (or runner) that accelerates
// when you press the up key and brakes when you press the down key.

Car c;
boolean keepPressed = true;

void setup() {
    size(640, 360, P3D);
    c = new Car(width/2, height/2, 20, 20, 1.01, 0.5); 
}

void draw() {
    c.render();
    c.checkBorder();
    keyPressed();
}

class Car {
    PVector location;
    PVector velocity;
    PVector acceleration;
    //float deceleration;
    PVector deceleration;
    int rectWidth, rectHeight;

    Car(float xpos_, float ypos_, int rw, int rh, float ax, float yx) {
	location = new PVector(xpos_, ypos_);
	velocity = new PVector(1,1);
	acceleration = new PVector(ax,yx);
	//deceleration = 0.9;
	deceleration = new PVector(ax/20, yx/20);
	rectWidth = rw;
	rectHeight = rh;
    }

    void render() {
	background(150);
	rect(location.x, location.y, rectWidth, rectHeight);
	stroke(255);
    }

    void accelerate() {
	velocity.add(acceleration);
	location.add(velocity);
	println(velocity);
	velocity.limit(2);
    }

    void decelerate() {
	// dumpening approach for now
	// would be neat to work it out with a linear deceleration
	// in all of the directions, now problem seems to be checkingBorders that
	// changes to acceleration value to negative, need to add proper ranges and
	// variables to check to if conditions
	// also contrain for 0 min brings negative velocity value (moving in the
	//opposite directions) instantly back to 0 with deceleration
	velocity.mult(0.9);
	location.add(velocity);
	//if (velocity.x > 0 || velocity.y > 0) {
	//     velocity.sub(deceleration);
	//     location.add(velocity);
	//} else if (velocity.x < 0 || velocity.y < 0){
	//     velocity.add(deceleration.mult(-1));
	///     location.sub(velocity);
	//     println(velocity);
	//    velocity.mult(-0.9);
	//    location.add(velocity);
	// }
	//velocity.x = constrain(velocity.x, 0, 2);
	//velocity.y = constrain(velocity.y, 0, 2);
    }

    void checkBorder() {
	if ((location.x > width-20 && acceleration.x > 0)
	        || (location.x < 0 && acceleration.x < 0)) {
	    acceleration.x *= -1;
	}
	if ((location.y < 0 && acceleration.y < 0)
	        || (location.y > height-20 && acceleration.y > 0)) {
	    acceleration.y *= -1;
	}
    }
}

void keyPressed() {
    if(keyCode == 38) {
	c.accelerate();
	keepPressed = false;
    } else if(keyCode == 40) {
	c.decelerate();
    }
}

void keyReleased() {
    keepPressed = true;
}
