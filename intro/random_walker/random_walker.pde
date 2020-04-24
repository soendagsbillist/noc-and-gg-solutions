Walker w;

void setup() {
    size(400, 400);
    w = new Walker(width/2, height/2);
    background(0);
}

void draw() {
    w.step();
    w.render();
}
