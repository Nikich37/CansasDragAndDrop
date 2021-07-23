import { Point } from './Point.js';
import { Shape } from './Shape.js';
import { Utils } from '../Utils.js';

class Circle extends Shape {

    private radius: number;

    constructor(shapeId: number, radius: number) {
        super(shapeId, [new Point(0, 0)]);
        this.radius = radius;
    }

    public draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.points[0].x, this.points[0].y, this.radius, 0, 2 * Math.PI, false);
        context.stroke()
        if (this.isFill) {
            this.fill(context);
        }
        context.closePath();
    }

    public contains(x: number, y: number): boolean {
        return Utils.isInCircle(this.points, this.radius, x, y);
    }

    public upperPointY(): number {
        return Utils.circleUpperY(this.points, this.radius);
    }
    public leftPointX(): number { 
        return Utils.circleLeftX(this.points, this.radius);
     }
    public lowerPointY(): number { 
        return Utils.circleLowerY(this.points, this.radius);
     }
    public rightPointX(): number { 
        return Utils.circleRightX(this.points, this.radius);;
     }

    public getPointsForUpdateStatus(): Point[] {
        let points: Point[] = [];
        for (let i = 0; i < 32; i++) {
            let x = this.points[0].x + this.radius * Math.cos(i * 2 / 32 * Math.PI);
            let y = this.points[0].y + this.radius * Math.sin(i * 2 / 32 * Math.PI);
            points.push(new Point(x, y));
        }
        return points;
    }
}

export { Circle };