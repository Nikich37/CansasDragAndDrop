import { Shape, Point } from "./Shapes.js";
var ShapesFabric = /** @class */ (function () {
    function ShapesFabric() {
    }
    ShapesFabric.prototype.CreateRectangle = function (leftPointX, upperPointY, height, weight) {
        var rightPointX = leftPointX + weight;
        var lowerPointY = upperPointY + height;
        var rectangle = new Shape([new Point(leftPointX, upperPointY),
            new Point(rightPointX, upperPointY), new Point(rightPointX, lowerPointY),
            new Point(leftPointX, upperPointY)]);
        return rectangle;
    };
    ShapesFabric.prototype.CreateTriangle = function (upperPointX, upperPointY, height, base) {
        var leftPointX = upperPointX - base / 2;
        var rightPointX = upperPointX + base / 2;
        var lowerPointY = upperPointY + height;
        var triangle = new Shape([new Point(upperPointX, upperPointY),
            new Point(rightPointX, lowerPointY), new Point(leftPointX, lowerPointY)]);
        return triangle;
    };
    ShapesFabric.prototype.CreatePolygon = function (points) {
        var polygon = new Shape(points);
        return polygon;
    };
    return ShapesFabric;
}());
export { ShapesFabric };
