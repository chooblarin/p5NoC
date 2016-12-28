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

class Mover {

  constructor(x, y, m) {
    this.position = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0.0, 0.0);
    this.mass = m;

    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0.001;
  }

  applyForce(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.aVelocity += this.aAcceleration;
    this.angle += this.aVelocity;

    this.acceleration.mult(0);
  }

  checkEdges() {
    if (width < this.position.x) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }

    if (height < this.position.y) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }

  display() {
    stroke(0);
    fill(175);
    rectMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    var size = this.mass * 16
    rect(0, 0, size, size);
    pop();
  }
}

class Oscillator {

  constructor() {
    this.angle = new PVector(0, 0);

    var vx = 0.05 * Math.random() - 0.05;
    var vy = 0.05 * Math.random() - 0.05
    this.velocity = new PVector(vx, vy);
    this.amplitude = new PVector(Math.random() * width / 2, Math.random() * height / 2);
  }

  oscillate() {
    this.angle.add(this.velocity);
  }

  display() {
    var x = sin(this.angle.x) * this.amplitude.x;
    var y = sin(this.angle.y) * this.amplitude.y;

    push();
    translate(width / 2, height / 2);
    stroke(0);
    fill(175);

    line(0, 0, x, y);
    ellipse(x, y, 16, 16);
    pop();
  }
}
