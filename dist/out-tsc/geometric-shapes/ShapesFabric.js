import { Polygon } from "./Polygon.js";
import { Rectangle } from "./Rectangle.js";
import { Circle } from './Circle.js';
var ShapesFabric = /** @class */ (function () {
    function ShapesFabric() {
        this.shapesCounter = 0;
    }
    ShapesFabric.prototype.CreateRectangle = function (weight, height) {
        this.shapesCounter++;
        return new Rectangle(this.shapesCounter, weight, height);
    };
    ShapesFabric.prototype.CreatePolygon = function (points) {
        this.shapesCounter++;
        return new Polygon(this.shapesCounter, points);
    };
    ShapesFabric.prototype.CreateCircle = function (radius) {
        this.shapesCounter++;
        return new Circle(this.shapesCounter, radius);
    };
    return ShapesFabric;
}());
export { ShapesFabric };
