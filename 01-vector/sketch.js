class PVector {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
  }
}

var position = new PVector(100, 100);
var verocity = new PVector(1, 3.3);

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);

  position.add(verocity)

  if ((position.x > width) || (position.x < 0)) {
    verocity.x = verocity.x * -1
  }
  if ((position.y > height) || (position.y < 0)) {
    verocity.y = verocity.y * -1
  }

  stroke(0);
  fill(175);
  ellipse(position.x, position.y, 16, 16);
}
