// Ex. 1.10 Use the noise values as the elevations of a landscape.
// heavily inspired by coding challenge #11
// https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html
// terrain is generated to create a movig effect

int cols, rows;
int step = 30;
int terrainHeight = 1200;
int terrainWidth = 900;
float[][] terrain; 

float flying = 0; 

void setup() {
    size(800, 800, P3D);
    background(255);
    stroke(204, 255, 64);
    cols = terrainHeight/step;
    rows = terrainWidth/step;
    terrain = new float[cols][rows];
}

void draw() {
    background(255);
    //flying -= 0.06;
    //float yoff = flying;

    for (int y = 0; y < rows; y++ ) {
	float xoff = 0;
	yoff += 0.2;
	for (int x = 0; x < cols; x++) {
	    terrain[x][y] = map(noise(xoff, yoff), 1, 0, -150, 150);
	    xoff += 0.2;
	}
    }

    translate(0, height/2);
    rotateX(PI/4);
    translate(-width/3, -height/3);

    for (int y = 0; y < rows-1; y++ ) {
	beginShape(TRIANGLE_STRIP);
	for (int x = 0; x < cols; x++) {
	    vertex(x*step, y*step, terrain[x][y]);
	    vertex(x*step, (y+1)*step, terrain[x][y+1]);
	}
	endShape();
    }
}
