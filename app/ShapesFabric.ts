import { Shape, Point } from "./Shapes.js";

class ShapesFabric{
    public CreateRectangle(leftPointX: number, upperPointY: number, 
    height: number, weight: number): Shape{
        let rightPointX: number = leftPointX + weight;
        let lowerPointY: number = upperPointY + height;
        let rectangle: Shape = new Shape([new Point(leftPointX, upperPointY), 
        new Point(rightPointX, upperPointY), new Point(rightPointX, lowerPointY),
        new Point(leftPointX, lowerPointY)]);
        return rectangle;
    }

    public CreateTriangle(upperPointX: number, upperPointY: number, 
        height: number, base: number): Shape{
        let leftPointX: number = upperPointX - base/2;
        let rightPointX: number = upperPointX + base/2;
        let lowerPointY: number = upperPointY + height;
        let triangle: Shape = new Shape([new Point(upperPointX, upperPointY),
        new Point(rightPointX, lowerPointY), new Point(leftPointX, lowerPointY)]);
        return triangle;
    }

    public CreatePolygon(points: Point[]): Shape{
        let polygon: Shape = new Shape(points);
        return polygon;
    }
}

export {ShapesFabric};