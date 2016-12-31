class Particle {

  constructor() {

    this.accel = 4000.0;
    this.damp = 0.00002;

    var x = random(width);
    var y = random(height);
    var vx = random(-this.accel / 2, this.accel / 2);
    var vy = random(-this.accel / 2, this.accel / 2);

    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.mult(this.damp);
  }
}

class Attractor {

  constructor(x, y) {
    var x = x || random(width);
    var y = y || random(height);
    this.position = createVector(x, y);
  }

  attract(p) {
    var vec = p5.Vector.sub(this.position, p.position);
    var distSq = vec.magSq();
    if (0.01 < distSq) { // avoid dividion by zero
        // accelerate towards attractor
        vec.mult(p.accel);
        vec.div(distSq);
        p.velocity.add(vec);
        p.update();
    }
  }
}

class ParticleSystem {

  constructor() {
    this.particles = [];
    this.attractors = [];
    this.numParticles = 10000;
    this.numAttractors = 8;
  }

  step() {
    stroke(0, 4);
    beginShape(POINTS);
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      for (var j = 0; j < this.attractors.length; j++) {
        this.attractors[j].attract(p);
      }
      p.update();
      vertex(p.position.x, p.position.y);
    }
    endShape();
  }

  scatter() {
    background(255);

    for (var i = 0; i < this.numAttractors; i++) {
      var a = new Attractor();
      this.attractors.push(a);
    }

    for (var i = 0; i < this.numParticles; i++) {
      var p = new Particle();
      this.particles.push(p);
    }
  }
}

var ps;

function setup() {
  createCanvas(708, 400);
  ps = new ParticleSystem();
  ps.scatter();
}

function draw() {
  ps.step();
}

function mouseClicked() {
  ps.scatter();
}

function keyPressed() {
  if (32 == keyCode) { // space key is pressed
     saveCanvas('canvas-demo', 'png');
  }
}
