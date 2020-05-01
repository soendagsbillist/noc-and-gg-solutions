Walker w;
WalkerToTheRight wr;
WalkerDynamic wd;
WalkerGauss wg;
WalkerMonteCarlo wc;
WalkerTest wt;

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
    wt = new WalkerTest();
    background(0);
}

void draw() {
    wc.step();
    wc.render();
    wg.step();
    wg.render();
}
