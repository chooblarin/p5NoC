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

  static div(v, n) {
    return new PVector(v.x / n, v.y / n);
  }
}

class Mover {

  constructor(x, y, vx, vy) {
    this.position = new PVector(x, y);
    this.verocity = new PVector(vx, vy);
    this.acceleration = new PVector(-0.001, 0.01);
    this.mass = 1;
    this.topSpeed = 10;
  }

  applyForce(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.verocity.add(this.acceleration);
    this.position.add(this.verocity);
    this.acceleration.mult(0);
  }

  checkEdges() {
    if (width < this.position.x) {
      this.position.x = width;
      this.verocity.x *= -1;
    } else if (this.position.x < 0) {
      this.verocity.x *= -1;
      this.position.x = 0;
    }

    if (height < this.position.y) {
      this.verocity.y *= -1;
      this.position.y = height;
    }
  }

  display() {
    stroke(0);
    fill(175);
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  }
}

var wind;
var gravity;
var m;

function setup() {
  createCanvas(640, 360);
  wind = new PVector(0.01, 0);
  gravity = new PVector(0, 0.1);
  m = new Mover(30, 30, 0, 0);
}

function draw() {
  background(255);
  m.applyForce(wind);
  m.applyForce(gravity);
  m.update();
  m.checkEdges();
  m.display();
}
