var particleSystem;

function setup() {
  createCanvas(640, 360);

  particleSystem = new ParticleSystem(new PVector(width / 2, 20));
}

function draw() {
  background(255);
  particleSystem.generateParticle();
  particleSystem.run();
}
