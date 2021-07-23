import {Point} from './Point.js'
import { Polygon } from "./Polygon.js";
import { Rectangle } from "./Rectangle.js"
import { Circle } from './Circle.js';

class ShapesFabric{
    public CreateRectangle( weight: number, height: number): Rectangle{
        return new Rectangle(weight, height);
    }

    public CreatePolygon(points: Point[]): Polygon{
        return new Polygon(points);
    }

    public CreateCircle(radius: number): Circle{
        return new Circle(radius);
    }
}

export {ShapesFabric};