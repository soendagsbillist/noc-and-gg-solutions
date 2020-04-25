class Walker {
    int xpos, ypos;

    Walker(int xpos_, int ypos_) {
	xpos = xpos_;
	ypos = ypos_;
    }

    void render() {
	stroke(255);
	point(xpos, ypos);
    }

    void step() {
	float stepx = random(-1, 2);
	float stepy = random(-1, 2);
	xpos += stepx;
	ypos += stepy;
    }
}
