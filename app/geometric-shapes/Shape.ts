import { Point } from "./Point.js"

abstract class Shape {

  public isFill: boolean;
  public points: Point[];
  public shapeId: number;

  constructor(shapeId: number, points: Point[]) {
    this.shapeId = shapeId;
    this.points = points;
    this.isFill = false;
  }

  public upperPointY(): number { return null; }
  public leftPointX(): number { return null; }
  public lowerPointY(): number { return null; }
  public rightPointX(): number { return null; }
  public draw(context: CanvasRenderingContext2D) { }
  public contains(x: number, y: number): boolean { return null; }
  public getPointsForUpdateStatus(): Point[] { return null; }
  public fill(context: CanvasRenderingContext2D) {
    context.fillStyle = '#FF0000';
    context.fill();
  }

  public updateStatusShape(shapes: Shape[]) {
    let firstFlag: boolean = false;;
    let secondFlag: boolean = false;;
    let self = this;
    let selfPoints = this.getPointsForUpdateStatus();

    shapes.forEach(function (value) {
      let points = value.getPointsForUpdateStatus();
      if (self.shapeId != value.shapeId) {
        for (let i = 0; i < points.length; i++) {
          if (self.contains(points[i].x, points[i].y)) {
            firstFlag = true;
          }
        }
        for (let i = 0; i < selfPoints.length; i++) {
          if (value.contains(selfPoints[i].x, selfPoints[i].y)) {
            secondFlag = true;
          }
        }
      }
    });
    if (firstFlag || secondFlag) {
      self.isFill = true;
    }
    else {
      self.isFill = false;
    }
  }
}

export { Shape };
