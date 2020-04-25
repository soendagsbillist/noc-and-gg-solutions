// Exercise 1.3
// Create random walker that dynamically  responds to the ppositio
// of the mouse

class WalkerDynamic {
    int xpos, ypos;

    WalkerDynamic (int xpos_, int ypos_) {
	xpos = xpos_;
	ypos = ypos_;
    }

    void render() {
	stroke(255);
	point(xpos, ypos);
    }

// somehow ypos++ step moves walker down and y-- up
    void step() {
	float choice = random(1);

	if ((xpos < mouseX) & (choice < 0.5)) { // 50%
	    xpos++;
	} else if (choice < 0.6) { // 10%
	    xpos--;
	} else if ((ypos < mouseY) & (choice < 0.9)) { // 30%
	    ypos++;
	} else { //10%
	    ypos--;
	}
    }
}