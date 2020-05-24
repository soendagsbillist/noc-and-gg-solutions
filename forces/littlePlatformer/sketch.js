let character;

function setup() {
  createCanvas(800, 800);
  character = new Player(width/2, height/2);
}

function draw() {
  background(155);
  character.render();

}
