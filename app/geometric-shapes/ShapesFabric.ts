import {Point} from './Point.js'
import { Polygon } from "./Polygon.js";
import { Rectangle } from "./Rectangle.js"
import { Circle } from './Circle.js';

class ShapesFabric{
    public CreateRectangle( weight: number, height: number): Rectangle{
        return new Rectangle(weight, height);
    }

    public CreatePolygon(points: Point[]): Polygon{
        let polygon: Polygon = new Polygon(points);
        return polygon;
    }

    public CreateCircle(radius: number){
        return new Circle(radius);
    }
}

export {ShapesFabric};