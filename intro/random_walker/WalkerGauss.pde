//Ex. 1.5
// The lengt of a step is determined by normal distribution as well as
// the directin and starting point on the canvas

class WalkerGauss {
    float xpos, ypos;

    WalkerGauss (float xpos_, float ypos_) {
	xpos = xpos_;
	ypos = ypos_;
    }

    void render() {
	stroke(255);
	point(xpos, ypos);
    }

    void step() {
	float choice = randomGaussian();
	float stepSize = randomGaussian();
	float stepX = randomGaussian();
	float stepY = randomGaussian();

	float sd = 1;
	float mean = 0.5;

	stepSize = (stepSize * sd) + mean;
	choice = (choice * sd) + mean;

	stepX *= stepSize;
	stepY *= stepSize;

	if (choice < 0.5) {
	    xpos += stepX;
	} else {
	    ypos += stepY;
	}

	xpos = constrain(xpos, 0, width-1);
	ypos = constrain(ypos, 0, height-1);
	
    }
}