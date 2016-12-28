var pendulum;

function setup() {
  createCanvas(360, 360);
  var origin = new PVector(width / 2, 20);
  pendulum = new Pendulum(origin, 125);
}

function draw() {
  background(255);
  pendulum.update();
  pendulum.display();
}
