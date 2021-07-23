import { Point } from './Point.js';
import { Shape } from './Shape.js';
import { Utils } from '../Utils.js';

class Polygon extends Shape {

    constructor(shapeId: number, points: Point[]) {
        super(shapeId, points);
    }

    public draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach(function (value) {
            let point: Point = value;
            context.lineTo(point.x, point.y);
        });
        context.lineTo(this.points[0].x, this.points[0].y);
        context.stroke();
        if (this.isFill) {
            this.fill(context);
        }
        context.closePath();
    }

    public contains(x: number, y: number): boolean {
        return Utils.isInPolygon(this.points, x, y);
    }

    public upperPointY(): number {
        return Utils.pointsUpperY(this.points);
    }
    public leftPointX(): number {
        return Utils.pointsLeftX(this.points);
    }
    public lowerPointY(): number {
        return Utils.pointsLowerY(this.points);
    }
    public rightPointX(): number {
        return Utils.pointsRightX(this.points);
    }

    public getPointsForUpdateStatus(): Point[]{
        let points: Point[] = [];
        for (let i = 0; i < this.points.length; i++){
            let deltaX: number;
            let deltaY: number;
            points.push(new Point(this.points[i].x, this.points[i].y));
        }
        return points;
    }
}

export { Polygon }