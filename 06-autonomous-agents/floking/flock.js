class Boid {

  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    var angle = random(TWO_PI);
    this.velocity = createVector(cos(angle), sin(angle));

    this.position = createVector(x, y);
    this.r = 2.0;
    this.maxSpeed = 2;
    this.maxForce = 0.03;
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  flock(boids) {
    var sep = this.separate(boids);
    var ali = this.align(boids);
    var coh = this.cohesion(boids);

    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);

    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);

    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  render() {
    var theta = this.velocity.heading() + PI / 4;

    fill(200, 100);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    beginShape(TRIANGLES);
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape();
    pop();
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (width + this.r < this.position.x) this.position.x = -this.r;
    if (height + this.r < this.position.y) this.position.y = -this.r;
  }

  separate(boids) {
    var desiredSeparation = 25;
    var steer = createVector();
    var count = 0;

    var p = this.position;

    boids.forEach(function (b) {
      var dist = p5.Vector.dist(p, b.position);
      if (0 < dist && dist < desiredSeparation) {
        var diff = p5.Vector.sub(p, b.position);
        diff.normalize();
        diff.div(dist);
        steer.add(diff);
        count++;
      }
    });

    if (0 < count) {
      steer.div(count);
    }

    if (0 < steer.mag()) {
      steer.setMag(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  align(boids) {
    var neighborDist = 50;
    var sum = createVector();
    var count = 0;
    var p = this.position;

    boids.forEach(function (b) {
      var dist = p5.Vector.dist(p, b.position);
      if (0 < dist && dist < neighborDist) {
        sum.add(b.velocity);
        count++;
      }
    });

    if (0 < count) {
      sum.setMag(this.maxSpeed);
      var steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector();
    }
  }

  cohesion(boids) {
    var neighborDist = 50;
    var sum = createVector();
    var count = 0;
    var p = this.position;

    boids.forEach(function (b) {
      var dist = p5.Vector.dist(p, b.position);
      if (0 < dist && dist < neighborDist) {
        sum.add(b.velocity);
        count++;
      }
    });

    if (0 < count) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector();
    }
  }
}

class Flock {

  constructor() {
    this.boids = [];
  }

  run() {
    this.boids.forEach(function (b, _, arr) {
      b.run(arr);
    });
  }

  addBoid(boid) {
    this.boids.push(boid);
  }
}