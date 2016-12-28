
var movers = [];
var liquid;

function setup() {
  createCanvas(640, 360);

  for (var i = 0; i < 10; i++) {
    var m = new Mover(i * width / 10, 0, Math.random(0.1, 5));
    movers.push(m);
  }
  liquid = new Liquid(0, height / 2, width, height / 2, 0.01);
}

function draw() {
  background(255);

  liquid.display();

  movers.forEach(function (m) {

    if (liquid.contains(m)) {
      liquid.drag(m);
    }

    var g = new PVector(0, 0.5 * m.mass);
    m.applyForce(g);
    m.update();
    m.display();
    m.checkEdges();
  });
}
