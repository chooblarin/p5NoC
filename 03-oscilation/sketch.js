var angle = 0;
var angleVel = 0.1;
var amplitude = 100;

function setup() {
  createCanvas(360, 360);
  frameRate(24);
}

function draw() {
  background(255);

  var a = angle
  for (var x = 0; x <= width; x += 24) {
    var y = amplitude * sin(a);
    ellipse(x, y + height / 2, 48, 48);
    a += angleVel;
  }
  angle += angleVel;
}
