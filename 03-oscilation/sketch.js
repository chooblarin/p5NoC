var oscs = [];

function setup() {
  createCanvas(640, 360);

  for (var i = 0; i < 10; i++) {
    var osc = new Oscillator();
    oscs.push(osc);
  }
}

function draw() {
  background(255);

  oscs.forEach(function (o) {
    o.oscillate();
    o.display();
  });
}
