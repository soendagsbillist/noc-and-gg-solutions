Walker w;

void setup() {
    size(640, 360);
    w = new Walker(width/2, height/2);
}

void draw() {
    w.render();
    w.step();
}

class Walker {
    int xpos, ypos;
    PVector location;

    Walker(float xpos_, float ypos_) {
	location = new PVector(xpos_, ypos_);
    }

    void render() {
	stroke(255);
	point(location.x, location.y);
    }

    void step() {
	float stepx = random(-1, 1);
	float stepy = random(-1, 1);
	location.x += stepx;
	location.y += stepy;
    }
}
