class Triangle {

  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }

  display() {
    triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
  }

  hasCommonPoints(t) {
    return (
      this.p1.equals(t.p1) || this.p1.equals(t.p2) || this.p1.equals(t.p3) ||
      this.p2.equals(t.p1) || this.p2.equals(t.p2) || this.p2.equals(t.p3) ||
      this.p3.equals(t.p1) || this.p3.equals(t.p2) || this.p3.equals(t.p3));
  }
}

class Circle {

  constructor(origin, radius) {
    this.origin = origin;
    this.radius = radius;
  }

  display() {
    ellipse(this.origin.x, this.origin.y, 2 * this.radius, 2 * this.radius);
  }
}

class DelaunayTriangles {
  static getCircumscribedCircle(triangle) {
    let x1 = triangle.p1.x;
    let y1 = triangle.p1.y;
    let x2 = triangle.p2.x;
    let y2 = triangle.p2.y;
    let x3 = triangle.p3.x;
    let y3 = triangle.p3.y;

    let c = 2.0 * ((x2 - x1) * (y3 - y1) - (y2 - y1)(x3 - x1));
    let x = ((y3 - y1) * (x2 * x2 - x1 * x1 + y2 * y2 - y1 * y1)
      + (y1 - y2) * (x3 * x3 - x1 * x1 + y3 * y3 - y1 * y1)) / c;
    let y = ((x1 - x3) * (x2 * x2 - x1 * x1 + y2 * y2 - y1 * y1)
      + (x2 - x1) * (x3 * x3 - x1 * x1 + y3 * y3 - y1 * y1)) / c;
    let origin = createVector(x, y);
    let radius = p5.Vector.dist(origin, t1.p1);

    return new Circle(origin, radius);
  }
}
