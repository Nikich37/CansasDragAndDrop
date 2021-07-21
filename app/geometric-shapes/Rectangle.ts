import {Point} from './Point.js';
import {Shape} from './Shape.js';
import {Utils} from '../Utils.js';

class Rectangle extends Shape{
    shapeType: string = "Rectangle";

    constructor(width: number, height: number){
        super(Utils.getPointsForRectangle(width, height));
    }

    public drawShape(context: CanvasRenderingContext2D){
        let width: number = Utils.findRightPointX(this.points) - 
        Utils.findLeftPointX(this.points);
        let height: number = Utils.findLowerPointY(this.points) -
        Utils.findUpperPointY(this.points);
        if (this.IsFill){
            context.fillStyle = '#FF0000';
            context.fillRect(Utils.findLeftPointX(this.points), 
            Utils.findUpperPointY(this.points), width, height);
            context.strokeRect(Utils.findLeftPointX(this.points), 
            Utils.findUpperPointY(this.points), width, height);
        }
        else{
            context.strokeRect(Utils.findLeftPointX(this.points), 
            Utils.findUpperPointY(this.points), width, height);
        }
    }
}

export {Rectangle};