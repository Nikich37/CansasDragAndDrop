var Point = /** @class */ (function () {
    function Point(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: false,
        configurable: true
    });
    return Point;
}());
var Shape = /** @class */ (function () {
    function Shape(points) {
        this._points = points;
        this._IsFill = false;
    }
    Object.defineProperty(Shape.prototype, "points", {
        get: function () {
            return this._points;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Shape.prototype, "IsFill", {
        get: function () {
            return this._IsFill;
        },
        set: function (bool) {
            this._IsFill = bool;
        },
        enumerable: false,
        configurable: true
    });
    return Shape;
}());
export { Point, Shape };
