//Ex. 1.3 bouncing ball in 3d space that jumps around a box 
float rx, ry, rz;
Ball b;

void setup() {
    size(640, 360, P3D);
    b = new Ball(120, 100, 0, 1,0.3,0.2);
}

void draw() {
    pushMatrix();
    translate(width/2,height/2,0);
    rotateCanvas();

    b.render();
    b.step();
    b.checkBorder();

    noFill();
    stroke(255);
    box(200, 200, 200);
    popMatrix();
}

void rotateCanvas () {
    rx += 0.001;
    ry += 0.0005;
    rx += 0.006;
    rotateX(rx);
    rotateY(ry);
    rotateZ(rz);

}

class Ball {
    PVector location;
    PVector velocity;
    PVector acceleration;

    Ball(float xpos_, float ypos_, float zpos_, float ax, float ay, float az) {
	location = new PVector(xpos_, ypos_, zpos_);
	velocity = new PVector(0,0,0);
	acceleration = new PVector(ax,ay,az);
    }

    void render() {
	background(150);
	pushMatrix();
	translate(location.x, location.y, location.z);
	sphere(10);
	stroke(255);
	popMatrix();
    }

    void step() {
	velocity.add(acceleration);
	location.add(velocity);
	velocity.limit(2);
    }

    void checkBorder() {
	if ((location.x > 90 && acceleration.x > 0) || (location.x < -90 && acceleration.x < 0)) {
	    acceleration.x *= -1;
	}
	if ((location.y < -90 && acceleration.y < 0) || (location.y > 90 && acceleration.y > 0)) {
	    acceleration.y *= -1;
	}
	if ((location.z < -90 && acceleration.z < 0) || (location.z > 90 && acceleration.z > 0)){
	    acceleration.z *= -1;
	}
    }
}
