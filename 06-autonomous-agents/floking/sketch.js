var flock;

function setup() {
  createCanvas(windowWidth, windowHeight);

  flock = new Flock();
  for (var i = 0; i < 150; i++) {
    flock.addBoid(new Boid(width / 2, height / 2));
  }
}

function draw() {
  background(255);
  flock.run();
}

function mouseClicked() {
  flock.addBoid(new Boid(mouseX, mouseY));
}
