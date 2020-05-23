// 2. 10 Mutual Attraction

Mover[] movers = new Mover[50];

void setup() {
    colorMode(HSB);
    size(1200, 800);

    for (int i = 0; i < movers.length; i++) {
     	movers[i] = new Mover(random(2, 6), random(width + 50), random(height));
    }
}

void draw() {
    background(220);

    for (Mover m : movers) {
    	for (Mover n : movers) {
	    if (m != n) {
		PVector gravitationalAttraction = n.attract(m);
		m.applyForce(gravitationalAttraction);
	    }
	}
	m.update();
	m.render();
	m.checkBorders();
    }
}
class Mover {
    PVector location;
    PVector velocity;
    PVector acceleration;
    float mass;
    float moverWidth, moverHeight;
    float G;
    int colour;

    Mover(float mass_, float xpos, float ypos) {
	location = new PVector(xpos, ypos);
	velocity = new PVector(0, 0);
	acceleration = new PVector(0, 0);
	mass = mass_;
	moverWidth = 15;
	moverHeight = 15;
	G = 0.3;
	colour = floor(random(300));
    }

    void checkBorders() {
	if (location.x > width - moverWidth) {
	    location.x = width - moverWidth;
	    velocity.x *= -1;
	} else if (location.x < 0) {
	    location.x = 0;
	    velocity.x *= -1;
	}

	if (location.y > height - moverHeight) {
	    location.y = height - moverHeight;
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
	noStroke();
	fill(colour, 150, 200);
	ellipse(location.x, location.y, mass * moverWidth, mass * moverHeight);
    }

    PVector attract(Mover m) {
	PVector force = PVector.sub(location, m.location);
	float distance = force.mag();
	distance = constrain(distance, 5.0, 25.0);

	float strength = (G * mass * m.mass) / (distance * distance);
	force.normalize();
	force.mult(strength);
	return force;
    }
}
