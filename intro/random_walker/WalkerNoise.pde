// Ex. 1.7 Create a random walker which step length is generated
// withh Perlin Noise
class WalkerNoise {
    float xpos, ypos;
    float prevX, prevY;

    float stepX, stepY;

    float xoff, yoff;

    float maxStep, minStep;

    WalkerNoise(float minStep_, float maxStep_) {
	xpos = width/2;
	ypos = height/2;

	minStep = minStep_;
	maxStep = maxStep_;
	xoff = 0;
	yoff = 10000;
    }

    void render() {
	// call to refresh bacground and avoid traces
	// background(255);
	stroke(0);
	ellipse(xpos, ypos, 16, 16);
	//line(prevX, prevY, xpos, ypos);
    }

    void step() {
	prevX = xpos;
	prevY = ypos;

	// xpos = map(noise(xoff), 0, 1, 0, width);
	// ypos = map(noise(yoff), 0, 1, 0, height);

	// map(value, current min, current max, new min, new max)
	float stepsizeX = map(noise(xoff), 0, 1, minStep, maxStep);
	float stepsizeY = map(noise(yoff), 0, 1, minStep, maxStep);
	println(stepsizeX);

	stepX *= stepsizeX;
	stepY *= stepsizeY;

	xoff += 0.01;
	yoff += 0.01;

	xpos += stepsizeX;
	ypos += stepsizeY;

	xpos = constrain(xpos, 8, width-8);
	ypos = constrain(ypos, 8, height-8);
    }
}
