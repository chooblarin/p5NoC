class PVector {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
  }

  sub(v) {
    this.x = this.x - v.x;
    this.y = this.y - v.y;
  }

  mult(n) {
    this.x = this.x * n;
    this.y = this.y * n;
  }

  div(n) {
    this.x = this.x / n;
    this.y = this.y / n;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    var m = this.mag();
    if (0 != m) {
      this.div(m)
    }
  }

  limit(max) {
    if (max < this.mag()) {
      this.normalize();
      this.mult(max);
    }
  }

  static add(v1, v2) {
    return new PVector(v1.x + v2.x, v1.y + v2.y);
  }

  static sub(v1, v2) {
    return new PVector(v1.x - v2.x, v1.y - v2.y);
  }

  static mult(v, n) {
    return new PVector(v.x * n, v.y * n);
  }

  static div(v, n) {
    return new PVector(v.x / n, v.y / n);
  }
}

class Particle {

  constructor(position) {
    this.acceleration = new PVector(0, 0);
    var vx = 2.0 * Math.random() - 1.0;
    var vy = - 2.0 * Math.random();
    this.velocity = new PVector(vx, vy);
    this.position = position;
    this.mass = 1;
    this.lifespan = 255.0;
  }

  applyForce(f) {
    this.acceleration.add(PVector.div(f, this.mass));
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2.0;
  }

  display() {
    var alpha = this.lifespan;
    stroke(0, alpha);
    fill(0, alpha);
    ellipse(this.position.x, this.position.y, 8, 8);
  }

  isDead() {
    return this.lifespan < 0.0;
  }
}

class Repeller {

  constructor(x, y) {
    this.position = new PVector(x, y);
    this.r = 30;
    this.strength = 100;
  }

  repel(particle) {
    var dir = PVector.sub(this.position, particle.position);
    var d = dir.mag();
    d = constrain(d, 5, 100);
    dir.normalize();
    var force = -1 * this.strength / (d * d);
    dir.mult(force);
    return dir;
  }

  display() {
    stroke(0);
    fill(20, 100);
    var size = this.r * 2;
    ellipse(this.position.x, this.position.y, size, size);
  }
}

class ParticleSystem {

  constructor(origin) {
    this.origin = origin;
    this.particles = [];
  }

  generateParticle() {
    var p = new Particle(new PVector(this.origin.x, this.origin.y));
    this.particles.push(p);
  }

  applyForce(f) {
    this.particles.forEach(function (p) {
      p.applyForce(f);
    });
  }

  applyRepeller(r) {
    this.particles.forEach(function (p) {
      var f = r.repel(p);
      p.applyForce(f);
    });
  }

  run() {
    this.particles = this.particles.filter(function (p) {
      return !p.isDead();
    });
    this.particles.forEach(function (p) {
      p.run();
    });
  }
}
