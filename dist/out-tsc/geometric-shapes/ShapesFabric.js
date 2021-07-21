import { Polygon } from "./Polygon.js";
import { Rectangle } from "./Rectangle.js";
var ShapesFabric = /** @class */ (function () {
    function ShapesFabric() {
    }
    ShapesFabric.prototype.CreateRectangle = function (weight, height) {
        return new Rectangle(weight, height);
    };
    ShapesFabric.prototype.CreatePolygon = function (points) {
        var polygon = new Polygon(points);
        return polygon;
    };
    return ShapesFabric;
}());
export { ShapesFabric };
