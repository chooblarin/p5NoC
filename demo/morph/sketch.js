var circle = [];
var square = [];

var morph = [];

var state = false;

function setup() {
  createCanvas(640, 360);

  for (var i = 0; i < 360; i += 9) {
    var v = p5.Vector.fromAngle(radians(i) - PI * 3 / 4);
    v.mult(100);
    circle.push(v);
    morph.push(createVector());
  }

  // top
  for (var x = -50; x < 50; x += 10) {
    square.push(createVector(x, -50));
  }
  // right
  for (var y = -50; y < 50; y += 10) {
    square.push(createVector(50, y));
  }
  // bottom
  for (var x = 50; x > -50; x -= 10) {
    square.push(createVector(x, 50));
  }
  // left
  for (var y = 50; y > -50; y -= 10) {
    square.push(createVector(-50, y));
  }
}

function draw() {
  background(51);

  var totalDistance = 0;

  for (var i = 0; i < circle.length; i++) {
    var v1;
    if (state) {
      v1 = circle[i];
    } else {
      v1 = square[i];
    }

    var v2 = morph[i];
    v2.lerp(v1, 0.1);
    totalDistance += p5.Vector.dist(v1, v2);
  }

  if (totalDistance < 0.1) {
    state = !state;
  }

  translate(width / 2, height / 2);
  strokeWeight(4);
  beginShape();
  noFill();
  stroke(255);
  morph.forEach(function (m) {
    vertex(m.x, m.y);
  });
  endShape(CLOSE);
}

function keyPressed() {
  if (32 == keyCode) {
    state = !state;
  }
}
