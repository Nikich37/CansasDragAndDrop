import { Point } from './Point.js';
import { Shape } from './Shape.js';

class Polygon extends Shape {

    constructor(points: Point[]) {
        super("Polygon", points);
    }

    public drawShape(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach(function (value) {
            let point: Point = value;
            context.lineTo(point.x, point.y);
        });
        context.lineTo(this.points[0].x, this.points[0].y);
        if (this.isFill == true) {
            context.fillStyle = '#FF0000';
            context.fill();
            context.stroke();
        }
        else {
            context.stroke();
        }
        context.closePath();
    }

    public isInShape(x: number, y: number): boolean {
        let result: boolean = false;
        let j: number = this.points.length - 1;
        for (let i: number = 0; i < this.points.length; i++) {
            if ((this.points[i].y < y && this.points[j].y > y ||
                this.points[j].y < y && this.points[i].y > y) &&
                (this.points[i].x + (y - this.points[i].y) /
                    (this.points[j].y - this.points[i].y) *
                    (this.points[j].x - this.points[i].x) < x)) {
                result = !result;
            }
            j = i;
        }
        return result;
    }

    public upperPointY(): number {
        let upperPointY: number = this.points[0].y;
        for (let i = 0; i < this.points.length; i++){
            if (upperPointY > this.points[i].y){
                upperPointY = this.points[i].y;
            }
        }
        return upperPointY;
    }
    public leftPointX(): number {
        let leftPointX: number = this.points[0].x;
        for (let i = 0; i < this.points.length; i++){
            if (leftPointX > this.points[i].x){
                leftPointX = this.points[i].x;
            }
        }
        return leftPointX;
    }
    public lowerPointY(): number {
        let lowerPointY: number = this.points[0].y;
        for (let i = 0; i < this.points.length; i++) {
            if (lowerPointY < this.points[i].y) {
                lowerPointY = this.points[i].y;
            }
        }
        return lowerPointY;
    }
    public rightPointX(): number {
        let rightPointX: number = this.points[0].x;
        rightPointX.toFixed
        for (let i = 0; i < this.points.length; i++){
            if (rightPointX < this.points[i].x){
                rightPointX = this.points[i].x;
            }
        }
        return rightPointX;
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