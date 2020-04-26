// Exercise 1.4
// Use Gaussian distribution to generate splatters around the canvas
// as well as their color palette

import java.util.Random;

Random generator;

void setup() {
  size(640,360);
  generator = new Random();
  background(64, 167, 219);
}

void draw() {
    float num = (float) generator.nextGaussian();
    float standard_deviation = 250;
    float rgb_standard_deviation = 50;
    float meanx = 320;
    float meany = 180;
    float mean_col = 130;

    float x = standard_deviation * num + meanx;
    float y = standard_deviation * num + meany;
    float colr = rgb_standard_deviation * num + mean_col;
    float colg = rgb_standard_deviation * num + 20;
    float colb = rgb_standard_deviation * num + 70;

    noStroke();
    fill(colr, colg, colb, 20);
    for (int i = 0; i < 360; i++) {
    	// 3 first numbers are RGB and 4th is transparency
    	ellipse(x, i, 2, 2);
    }
}
