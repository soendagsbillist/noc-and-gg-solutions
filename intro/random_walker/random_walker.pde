Walker w;
WalkerToTheRight wr;

void setup() {
    size(400, 400);
    w = new Walker(width/2, height/2);
    wr = new WalkerToTheRight(width/2, height/2);
    background(0);
}

void draw() {
    w.step();
    w.render();
}
