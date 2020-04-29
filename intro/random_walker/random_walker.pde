Walker w;
WalkerToTheRight wr;
WalkerDynamic wd;
WalkerGauss wg;
WalkerGauss wg1;

void setup() {
    size(800, 800);
    int xSpawn = Math.round(randomGaussian());
    int ySpawn = Math.round(randomGaussian());

    float sd = 400;
    float mean = width/2;
    xSpawn = Math.round(( xSpawn * sd ) + mean);
    ySpawn = Math.round((ySpawn * sd) + mean);

    w = new Walker(width/2, height/2);
    wr = new WalkerToTheRight(width/2, height/2);
    wd = new WalkerDynamic(width/2, height/2);
    wg = new WalkerGauss(xSpawn, ySpawn);
    wg1 = new WalkerGauss(xSpawn, ySpawn);
    background(0);
}

void draw() {
    wg.step();
    wg.render();
    wg1.step();
    wg1.render();
}
