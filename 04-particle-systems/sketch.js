var particles = [];

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);
  var particle = new Particle(new PVector(width / 2, 40));
  particles.push(particle);

  particles = particles.filter(function(p) {
    return !p.isDead();
  });
    particles.forEach(function(p) {
    p.run();    
  });
}
