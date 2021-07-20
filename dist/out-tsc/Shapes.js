var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Shape = /** @class */ (function () {
    function Shape(points) {
        this.points = points;
        this.IsFill = false;
    }
    return Shape;
}());
export { Point, Shape };
