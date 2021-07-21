import { Point } from './Point.js';
import { Polygon } from "./Polygon.js";
import { Rectangle } from "./Rectangle.js";
var ShapesFabric = /** @class */ (function () {
    function ShapesFabric() {
    }
    ShapesFabric.prototype.CreateRectangle = function (weight, height) {
        var leftPointX = 0;
        var upperPointY = 0;
        var rightPointX = leftPointX + weight;
        var lowerPointY = upperPointY + height;
        var rectangle = new Rectangle([new Point(leftPointX, upperPointY),
            new Point(rightPointX, upperPointY), new Point(rightPointX, lowerPointY),
            new Point(leftPointX, lowerPointY)]);
        return rectangle;
    };
    ShapesFabric.prototype.CreatePolygon = function (points) {
        var polygon = new Polygon(points);
        return polygon;
    };
    return ShapesFabric;
}());
export { ShapesFabric };
