Walker w;
WalkerToTheRight wr;
WalkerDynamic wd;

void setup() {
    size(400, 400);
    w = new Walker(width/2, height/2);
    wr = new WalkerToTheRight(width/2, height/2);
    wd = new WalkerDynamic(width/2, height/2);
    background(0);
}

void draw() {
    wd.step();
    wd.render();
}
