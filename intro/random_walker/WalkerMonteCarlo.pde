
//Ex. 1.6
// The length of a step is determined by a custom probability distribution

import java.util.Random;

class WalkerMonteCarlo {
    float xpos, ypos;
    float prevX, prevY;
    Random generator;

    WalkerMonteCarlo (float xpos_, float ypos_) {
	xpos = xpos_;
	ypos = ypos_;
    }

    void render() {
	stroke(255);
	// point(xpos, ypos);
	line(prevX, prevY, xpos, ypos);
    }

    float montecarlo() {
	while (true) {

	    // float r1 = random(low, high);
	    float r1 = random(1);
	    // float probability = r1;
	    float probability = r1 * r1;
	    // float probability = pow(1.0 - r1,8);
	    // float r2 = random(low, high);
	    float r2 = random(1);

	    if (r2 < probability) {
		return r1;
	    }
	}
    }

    void step() {
	prevX = xpos;
	prevY = ypos;

	float stepSize = montecarlo() * 10;

	// float stepX = randomGaussian();
	// float stepY = randomGaussian();
	float stepX = random(-stepSize, stepSize);
	float stepY = random(-stepSize, stepSize);

	float sd = 1;
	float mean = 0.5;

	xpos += stepX;
	ypos += stepY;

	xpos = constrain(xpos, 0, width-1);
	ypos = constrain(ypos, 0, height-1);
	
    }
}
