import { Point } from './Point.js';
import { Shape } from './Shape.js';
import { Utils } from '../Utils.js';

class Rectangle extends Shape {
    
    constructor(width: number, height: number) {
        super("Rectangle", Utils.getPointsForRectangle(width, height));
    }

    public drawShape(context: CanvasRenderingContext2D) {
        let width: number = this.rightPointX() - this.leftPointX();
        let height: number = this.lowerPointY() - this.upperPointY();
        if (this.isFill) {
            context.fillStyle = '#FF0000';
            context.fillRect(this.leftPointX(), this.upperPointY(),
                width, height);
            context.strokeRect(this.leftPointX(),
                this.upperPointY(), width, height);
        }
        else {
            context.strokeRect(this.leftPointX(), this.upperPointY(),
                width, height);
        }
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
        for (let i = 0; i < this.points.length; i++) {
            if (upperPointY > this.points[i].y) {
                upperPointY = this.points[i].y;
            }
        }
        return upperPointY;
    }
    public leftPointX(): number {
        let leftPointX: number = this.points[0].x;
        for (let i = 0; i < this.points.length; i++) {
            if (leftPointX > this.points[i].x) {
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
        for (let i = 0; i < this.points.length; i++) {
            if (rightPointX < this.points[i].x) {
                rightPointX = this.points[i].x;
            }
        }
        return rightPointX;
    }

    public getPointsForUpdateStatus(): Point[]{
        return this.points;
    }
}

export { Rectangle };