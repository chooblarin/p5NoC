class Vehicle {

  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();

    this.r = 3.0;
    // this.maxSpeed = 4;
    this.maxSpeed = map(random(), 0, 1, 4, 7);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.position);
    desired.setMag(0.3);
    this.applyForce(desired);
  }

  isDead() {
    return width < this.position.x;
  }

  display() {
    var theta = this.velocity.heading() + PI / 2;
    fill(175);
    stroke(0);

    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}

class Path {

  constructor() {
    this.radius = 20;
    this.start = createVector(0, height * 2 / 3);
    this.end = createVector(width, height * 1 / 3);
  }

  display() {
    strokeWeight(2 * this.radius);
    stroke(0, 60);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    strokeWeight(1);
    stroke(0);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}

var path;
var vehicles;
var debug = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  path = new Path();
  vehicles = [];
}

function draw() {
  background(255);

  path.display();

  vehicles.forEach(function (veh) {
    var f = createVector(0.1, 0);
    veh.applyForce(f);

    veh.update();
    veh.display();

    var predict = createVector(veh.velocity.x, veh.velocity.y);
    predict.setMag(25);
    predict.add(veh.position);
    var a = p5.Vector.sub(predict, path.start);
    var b = p5.Vector.sub(path.end, path.start);
    b.normalize();
    b.setMag(a.dot(b));
    var normalPoint = p5.Vector.add(path.start, b);

    var dist = p5.Vector.dist(predict, normalPoint);
    var isInPath = dist < path.radius;

    b.setMag(25);
    var target = p5.Vector.add(normalPoint, b);
    if (!isInPath) {
      veh.seek(target);
    }

    if (debug) {
      ellipse(predict.x, predict.y, 5, 5);
      line(predict.x, predict.y, normalPoint.x, normalPoint.y);
      ellipse(normalPoint.x, normalPoint.y, 5, 5);
      if (isInPath) {
        fill(0);
      } else {
        fill(255, 0, 0);
      }
      ellipse(target.x, target.y, 5, 5);
    }
  });

  // Remove dead vehicle

  for (var i = vehicles.length - 1; 0 <= i; i--) {
    var veh = vehicles[i];
    if (veh.isDead()) {
      vehicles.splice(i, 1);
    }
  }
}

function mouseClicked() {
  var startY = map(random(), 0, 1, 0.1 * height, 0.9 * height);
  var vehicle = new Vehicle(0, startY);
  vehicles.push(vehicle);
}

function keyPressed() {
  if (32 == keyCode) {
    debug = !debug;
  }
}
