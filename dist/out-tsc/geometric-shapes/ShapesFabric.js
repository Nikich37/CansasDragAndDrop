import { Polygon } from "./Polygon.js";
import { Rectangle } from "./Rectangle.js";
import { Circle } from './Circle.js';
var ShapesFabric = /** @class */ (function () {
    function ShapesFabric() {
    }
    ShapesFabric.prototype.CreateRectangle = function (weight, height) {
        return new Rectangle(weight, height);
    };
    ShapesFabric.prototype.CreatePolygon = function (points) {
        return new Polygon(points);
    };
    ShapesFabric.prototype.CreateCircle = function (radius) {
        return new Circle(radius);
    };
    return ShapesFabric;
}());
export { ShapesFabric };
