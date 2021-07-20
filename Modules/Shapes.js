"use strict";
exports.__esModule = true;
exports.Shape = exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;
var Shape = /** @class */ (function () {
    function Shape(points) {
        this.points = points;
        this.IsFill = false;
    }
    return Shape;
}());
exports.Shape = Shape;
