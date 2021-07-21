import {Point} from './Point.js'
import {Shape} from './Shape.js';

class Polygon extends Shape{
    shapeType: string = "Polygon";
    constructor(points: Point[]){
        super(points);
    }
}

export {Polygon}