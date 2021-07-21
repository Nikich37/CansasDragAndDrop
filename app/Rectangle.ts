import {Point} from './Point.js'
import {Shape} from './Shape.js';

class Rectangle extends Shape{
    shapeType: string = "Rectangle";
    constructor(points: Point[]){
        super(points);
    }
}

export {Rectangle};