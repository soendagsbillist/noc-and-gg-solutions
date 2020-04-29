//Ex. 1.5
// The lengt of a step is determined by normal distribution as well as
// the directin and starting point on the canvas

import java.util.Random;

class WalkerGauss {
    int xpos, ypos;
    Random generator;

    WalkerGauss (int xpos_, int ypos_) {
	xpos = xpos_;
	ypos = ypos_;
    }

    void render() {
	stroke(255);
	point(xpos, ypos);
    }

    void step() {
	generator = new Random();
	
	float choice = (float) generator.nextGaussian();
	float stepSize = randomGaussian();
	float sd = 1;
	float mean = 0.5;

	stepSize = (stepSize * sd) + mean;
	
	choice = (choice * sd) + mean;


	if (choice < 0.5) {
	    xpos += stepSize;
	} else {
	    ypos += stepSize;
	}

	xpos = constrain(xpos, 0, width-1);
	ypos = constrain(ypos, 0, height-1);
	
    }
}