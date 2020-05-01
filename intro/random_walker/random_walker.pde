Walker w;
WalkerToTheRight wr;
WalkerDynamic wd;
WalkerGauss wg;
WalkerMonteCarlo wc;
WalkerNoise wn;

void setup() {
    size(800, 800);
    float xSpawn = randomGaussian();
    float ySpawn = randomGaussian();

    float sd = 400;
    float mean = width/2;
    xSpawn = (xSpawn * sd) + mean;
    ySpawn = (ySpawn * sd) + mean;

    wg = new WalkerGauss(xSpawn, ySpawn);
    wc = new WalkerMonteCarlo(xSpawn, ySpawn);
    wn = new WalkerNoise(-10, 10);
    background(255);
}

void draw() {
    wn.step();
    wn.render();
}
