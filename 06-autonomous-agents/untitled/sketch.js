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
    var col = constrain(pos.x / this.resolution, 0, this.cols - 1);
    var row = constrain(pos.y / this.resolution, 0, this.rows - 1);
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
        line(-len / 2, 0, len / 2, 0);
        line(len / 2, 0, len / 2 - 5, 3);
        line(len / 2, 0, len / 2 - 5, - 3);
        pop();
      }
    }
  }
}

var flowField;

function setup() {
  createCanvas(640, 320);
  flowField = new FlowField(20);
}

function draw() {
  background(255);
  flowField.display();
}