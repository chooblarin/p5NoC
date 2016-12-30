class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();

    this.r = 3.0;
    this.maxSpeed = 4;
    this.maxForce = 0.1;
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

  arrive(target) {
    var desired = p5.Vector.sub(target, this.position);
    var d = desired.mag();
    var l = 50;
    if (d < l) {
      var m = map(d, 0, l, 0, this.maxSpeed);
      desired.setMag(this.m);
    } else {
      desired.setMag(this.maxSpeed);
    }
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
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

var vehicle;

function setup() {
  createCanvas(640, 320);

  vehicle = new Vehicle(100, height / 2);
}

function draw() {
  background(255);

  vehicle.arrive(createVector(mouseX, mouseY));
  vehicle.update();
  vehicle.display();

  // draw target
  stroke(0);
  fill(0, 0);
  ellipse(mouseX, mouseY, 40, 40);
  line(mouseX - 50, mouseY, mouseX + 50, mouseY)
  line(mouseX, mouseY - 50, mouseX, mouseY + 50)
  fill(0, 20);
  ellipse(mouseX, mouseY, 100, 100);
  fill(0);
  ellipse(mouseX, mouseY, 6, 6);
}
