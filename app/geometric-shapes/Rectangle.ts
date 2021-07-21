import {Point} from './Point.js';
import {Shape} from './Shape.js';
import {Utils} from '../Utils.js';

class Rectangle extends Shape{
    shapeType: string = "Rectangle";
    private getPoints(weight: number, height: number): Point[]{
        let leftPointX: number = 0;
        let upperPointY: number = 0;
        let rightPointX: number = leftPointX + weight;
        let lowerPointY: number = upperPointY + height;
        let points = [new Point(leftPointX, upperPointY), 
        new Point(rightPointX, upperPointY), new Point(rightPointX, lowerPointY),
        new Point(leftPointX, lowerPointY)];
        return points;
    }

    constructor(weight: number, height: number){
        super(Utils.getPointsForRectangle(weight, height));
    }
}

export {Rectangle};