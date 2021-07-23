import { Point } from './Point.js';
import { Shape } from './Shape.js';
import { Utils } from '../Utils.js';

class Rectangle extends Shape {

    constructor(shapeId: number, width: number, height: number) {
        super(shapeId, Utils.getPointsForRectangle(width, height));
    }

    public draw(context: CanvasRenderingContext2D) {
        let width: number = this.rightPointX() - this.leftPointX();
        let height: number = this.lowerPointY() - this.upperPointY();
        context.beginPath();
        context.rect(this.leftPointX(), this.upperPointY(), width, height);
        context.strokeRect(this.leftPointX(), this.upperPointY(), width, height);
        if (this.isFill) {
            this.fill(context);
        }
        context.closePath();
    }

    public contains(x: number, y: number): boolean {
        return Utils.isInRectangle(this.points, x, y);
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
        return this.points;
    }
}

export { Rectangle };