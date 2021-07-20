import { Shape, Point, Triangle, Rectangle, Polygon } from "./Shapes.js";

class ShapesFabric{
    public CreateRectangle(leftPointX: number, upperPointY: number, 
    height: number, weight: number): Rectangle{
        let rightPointX: number = leftPointX + weight;
        let lowerPointY: number = upperPointY + height;
        let rectangle: Rectangle = new Rectangle([new Point(leftPointX, upperPointY), 
        new Point(rightPointX, upperPointY), new Point(rightPointX, lowerPointY),
        new Point(leftPointX, lowerPointY)]);
        return rectangle;
    }

    public CreateTriangle(upperPointX: number, upperPointY: number, 
        height: number, base: number): Shape{
        let leftPointX: number = upperPointX - base/2;
        let rightPointX: number = upperPointX + base/2;
        let lowerPointY: number = upperPointY + height;
        let triangle: Triangle = new Triangle([new Point(upperPointX, upperPointY),
        new Point(rightPointX, lowerPointY), new Point(leftPointX, lowerPointY)]);
        return triangle;
    }

    public CreatePolygon(points: Point[]): Shape{
        let polygon: Polygon = new Polygon(points);
        return polygon;
    }
}

export {ShapesFabric};