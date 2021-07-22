import { Point } from './Point.js';
import { Shape } from './Shape.js';

class Circle extends Shape {
    private radius: number;
    constructor(radius: number) {
        super("Circle", [new Point(0, 0)]);
        this.radius = radius;
    }

    public drawShape(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.points[0].x, this.points[0].y, this.radius, 0, 2 * Math.PI, false);
        if (this.isFill) {
            context.fillStyle = '#FF0000';
            context.fill();
            context.stroke();
        }
        else {
            context.stroke()
        }
    }

    public isInShape(x: number, y: number): boolean {
        let result: boolean = false;
        let deltaX: number = x - this.points[0].x;
        let deltaY: number = y - this.points[0].y;
        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) < this.radius) {
            result = true;
        }
        return result;
    }

    public upperPointY(): number { return this.points[0].y - this.radius; }
    public leftPointX(): number { return this.points[0].x - this.radius; }
    public lowerPointY(): number { return this.points[0].y + this.radius; }
    public rightPointX(): number { return this.points[0].x + this.radius; }

    public getPointsForUpdateStatus(): Point[]{
        let points: Point[] = [];
        for (let i = 0; i < 32; i++){
            let x = this.points[0].x + this.radius * Math.cos(i * 2/32*Math.PI);
            let y = this.points[0].y + this.radius * Math.sin(i * 2/32*Math.PI);
            points.push(new Point(x, y));
        }

        return points;
    }
}

export { Circle };