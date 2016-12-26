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
}

class Mover {

  constructor(x, y, vx, vy) {
    this.position = new PVector(x, y);
    this.verocity = new PVector(vx, vy);
    this.acceleration = new PVector(-0.001, 0.01);
    this.topSpeed = 10;
  }

  update() {
    var mouse = new PVector(mouseX, mouseY);
    var dir = PVector.sub(mouse, this.position);

    dir.normalize();
    dir.mult(0.5);

    this.acceleration = dir;

    this.verocity.add(this.acceleration);
    this.verocity.limit(this.topSpeed);

    this.position.add(this.verocity);
  }

  checkEdges() {
    if (width < this.position.x) {
      this.position.x = 0
    } else if (this.position.x < 0) {
      this.position.x = width
    }

    if (height < this.position.y) {
      this.position.y = 0
    } else if (this.position.y < 0) {
      this.position.y = height
    }
  }

  display() {
    stroke(0);
    fill(175);
    ellipse(this.position.x, this.position.y, 16, 16);
  }
}

var movers = []

function setup() {
  createCanvas(640, 360);

  for (var i = 0; i < 10; i++) {
    var x = Math.random() * width;
    var y = Math.random() * height;
    var vx = 0;
    var vy = 0;
    var mover = new Mover(x, y, vx, vy);
    movers.push(mover);
  }
}

function draw() {
  background(255);

  movers.forEach(function(m) {
    m.update();
    m.checkEdges();
    m.display();
  });
}
