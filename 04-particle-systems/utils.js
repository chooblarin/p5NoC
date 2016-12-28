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
    this.acceleration = new PVector(0, 0.05);
    var vx = 2.0 * Math.random() - 1.0;
    var vy = - 2.0 * Math.random();
    this.velocity = new PVector(vx, vy);
    this.position = position;
    this.lifespan = 255.0;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
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
