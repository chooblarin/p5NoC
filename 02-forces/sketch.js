
var wind;
var gravity;
var m;

function setup() {
  createCanvas(640, 360);
  wind = new PVector(0.01, 0);
  gravity = new PVector(0, 0.1);
  m = new Mover(30, 30, 0, 0);
}

function draw() {
  background(255);
  m.applyForce(wind);
  m.applyForce(gravity);
  m.update();
  m.checkEdges();
  m.display();
}
