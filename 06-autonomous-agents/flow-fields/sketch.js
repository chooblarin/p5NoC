class FlowField {

  constructor(resolution) {
    this.resolution = resolution;

    this.cols = width / resolution;
    this.rows = height / resolution;

    var fields = [];

    var xoff = 0;
    for (var i = 0; i < this.cols; i++) {
      var yoff = 0;
      var row = [];
      for (var j = 0; j < this.rows; j++) {
        var theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        var v = createVector(cos(theta), sin(theta));
        row.push(v);
        yoff += 0.1;
      }
      fields.push(row);
      xoff += 0.1;
    }
    this.fields = fields;
  }

  lookup(pos) {
    var col = Math.floor(constrain(pos.x / this.resolution, 0, this.cols - 1));
    var row = Math.floor(constrain(pos.y / this.resolution, 0, this.rows - 1));
    var v = this.fields[col][row]
    return createVector(v.x, v.y);
  }

  display() {
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        var v = this.fields[i][j];
        var theta = v.heading();
        push();
        var len = this.resolution;
        translate(i * len + len / 2, j * len + len / 2);
        rotate(theta);
        stroke(0, 40);
        line(-len / 2, 0, len / 2, 0);
        line(len / 2, 0, len / 2 - 5, 3);
        line(len / 2, 0, len / 2 - 5, - 3);
        pop();
      }
    }
  }
}

class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();

    this.r = 3.0;
    this.maxSpeed = 4;
  }

  checkEdge() {
    var pos = this.position;
    if (pos.x < 0) {
      this.position.x = width;
    } else if (width < pos.x) {
      this.position.x = 0;
    }
    if (pos.y < 0) {
      this.position.y = height;
    } else if (height < pos.y) {
      this.position.y = 0;
    }
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

var flowField;
var vehicle;

function setup() {
  createCanvas(640, 320);
  flowField = new FlowField(20);
  vehicle = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(255);
  flowField.display();

  vehicle.update();
  vehicle.checkEdge();
  vehicle.display();

  var vec = flowField.lookup(vehicle.position);
  vehicle.applyForce(vec);
}
