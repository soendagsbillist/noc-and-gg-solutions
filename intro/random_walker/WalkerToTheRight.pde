// Exercise 1.1
// Create random walker that tends to go down and to the right

class WalkerToTheRight {
    int xpos, ypos;

    WalkerToTheRight(int xpos_, int ypos_) {
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

	if (choice < 0.5) { // 50%
	    xpos++;
	} else if (choice < 0.6) { // 10%
	    xpos--;
	} else if (choice < 0.9) { // 30%
	    ypos++;
	} else { //10%
	    ypos--;
	}
    }
}