import {Point} from './Point.js'
import {Shape} from './Shape.js';

class Polygon extends Shape{
    shapeType: string = "Polygon";

    constructor(points: Point[]){
        super(points);
    }

    public drawShape(context: CanvasRenderingContext2D){
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach(function(value){
            let point: Point = value;
            context.lineTo(point.x, point.y);
        });
        context.lineTo(this.points[0].x, this.points[0].y);
        if (this.IsFill == true){
            context.fillStyle = '#FF0000';
            context.fill();
            context.stroke();
            }
        else{
            context.stroke();
        }
        context.closePath();
    }
}

export {Polygon}