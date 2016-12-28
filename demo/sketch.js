class Particle {

  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.accel = 4000.0;
    this.damp = 0.00002;

    this.vx = this.accel / 2 - Math.random() * this.accel;
    this.vy = this.accel / 2 - Math.random() * this.accel;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.vx *= this.damp;
    this.vy *= this.damp;
  }
}

class Attractor {

  constructor(x, y) {
    this.x = x || Math.random() * width;
    this.y = y || Math.random() * height;
  }

  attract(p) {
    var d2 = (this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y);
    if (0.01 < d2) { // avoid dividion by zero
        // accelerate towards attractor
        p.vx += p.accel * (this.x - p.x) / d2;
        p.vy += p.accel * (this.y - p.y) / d2;
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
        var a = this.attractors[j];
        a.attract(p);        
      }
      p.update();
      vertex(p.x, p.y);
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
