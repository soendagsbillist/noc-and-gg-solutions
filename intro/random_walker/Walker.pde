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
	int choice = int(random(4));
	if (choice == 0) {
	    xpos++;
	} else if (choice == 1) {
	    xpos--;
	} else if (choice == 2) {
	    ypos--;
	} else if (choice == 3) {
	    ypos++;
	}
    }
}
