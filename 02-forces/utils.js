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
  }

  applyForce(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
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
    var size = this.mass * 24 + 12
    ellipse(this.position.x, this.position.y, size, size);
  }
}

class Liquid {

  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  contains(mover) {
    var p = mover.position;
    return this.x <= p.x && p.x <= (this.w - this.x) && this.y <= p.y && p.y < (this.h + this.y);
  }

  drag(m) {
    var speed = m.velocity.mag();
    var dragMagnitude = this.c * speed * speed;

    var d = PVector.mult(m.velocity, -1);
    d.normalize();
    d.mult(dragMagnitude);

    m.applyForce(d);
  }

  display() {
    noStroke();
    fill(175);
    rect(this.x, this.y, this.w, this.h);
  }
}
