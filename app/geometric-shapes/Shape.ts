import { Point } from "./Point.js"

abstract class Shape {
  public isFill: boolean;
  public shapeType: string;
  public points: Point[];
  public shapeId: number;
  public static counterShapes: number;

  constructor(shapeType: string, points: Point[]) {
    Shape.counterShapes++;
    this.shapeType = shapeType;
    this.points = points;
    this.isFill = false;
    this.shapeId = Shape.counterShapes;

  }

  public upperPointY(): number { return null; }
  public leftPointX(): number { return null; }
  public lowerPointY(): number { return null; }
  public rightPointX(): number { return null; }
  public drawShape(context: CanvasRenderingContext2D) { }
  public isInShape(x: number, y: number): boolean { return null; }
  public updateStatusShape(shapes: Shape[]) {
    let firstFlag: boolean = false;;
    let secondFlag: boolean = false;;
    let self = this;
    let selfPoints = this.getPointsForUpdateStatus();

    shapes.forEach(function (value) {
      let points = value.getPointsForUpdateStatus();
      if (self.shapeId != value.shapeId) {
        for (let i = 0; i < points.length; i++) {
          if (self.isInShape(points[i].x, points[i].y)) {
            firstFlag = true;
          }
        }
        for (let i = 0; i < selfPoints.length; i++) {
          if (value.isInShape(selfPoints[i].x, selfPoints[i].y)) {
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
  public getPointsForUpdateStatus(): Point[] { return null; }
}

export { Shape };
