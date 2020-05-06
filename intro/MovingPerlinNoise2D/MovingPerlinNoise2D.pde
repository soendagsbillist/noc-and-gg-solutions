// Ex. 1.9 add 3rd dimension to the Perlin noise()
// and increment it to create a moving effect

float zoff = 0.0;
float moving = 0;
float increment = 0.1;
float density = 5;

void setup() {
    size(800, 800);
    noStroke();
    frameRate(15);
}

void draw() {
    moving -= 0.04;
    float zoff = moving;
    float yoff = 0;

    for (int y = 0; y < height; y += density) {
	float xoff = 0;
	yoff += increment;

	for (int x = 0; x < width; x += density) {
	    float r = map(noise(xoff, yoff, zoff), 0, 1, 0, 255);

	    fill(r, 180, 255);
	    rect(x,y, density, density);
	    xoff += increment;
	}
    }
}
