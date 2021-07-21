import {Point} from './Point.js'
import { Polygon } from "./Polygon.js";
import { Rectangle } from "./Rectangle.js"

class ShapesFabric{
    public CreateRectangle( weight: number, height: number): Rectangle{
        let leftPointX: number = 0;
        let upperPointY: number = 0;
        let rightPointX: number = leftPointX + weight;
        let lowerPointY: number = upperPointY + height;
        let rectangle: Rectangle = new Rectangle([new Point(leftPointX, upperPointY), 
        new Point(rightPointX, upperPointY), new Point(rightPointX, lowerPointY),
        new Point(leftPointX, lowerPointY)]);
        return rectangle;
    }

    public CreatePolygon(points: Point[]): Polygon{
        let polygon: Polygon = new Polygon(points);
        return polygon;
    }
}

export {ShapesFabric};