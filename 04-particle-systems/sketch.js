var particleSystem;
var repeller;

function setup() {
  createCanvas(640, 360);

  particleSystem = new ParticleSystem(new PVector(width / 2, 100));
  repeller = new Repeller(width / 2 - 20, height / 2);
}

function draw() {
  background(255);
  particleSystem.generateParticle();
  var g = new PVector(0, 0.05);
  particleSystem.applyForce(g);
  particleSystem.applyRepeller(repeller);
  particleSystem.run();
  repeller.display();
}
