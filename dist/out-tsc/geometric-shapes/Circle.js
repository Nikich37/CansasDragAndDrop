var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Point } from './Point.js';
import { Shape } from './Shape.js';
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(radius) {
        var _this = _super.call(this, "Circle", [new Point(0, 0)]) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.drawShape = function (context) {
        context.beginPath();
        context.arc(this.points[0].x, this.points[0].y, this.radius, 0, 2 * Math.PI, false);
        if (this.isFill) {
            context.fillStyle = '#FF0000';
            context.fill();
            context.stroke();
        }
        else {
            context.stroke();
        }
    };
    Circle.prototype.isInShape = function (x, y) {
        var result = false;
        var deltaX = x - this.points[0].x;
        var deltaY = y - this.points[0].y;
        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) < this.radius) {
            result = true;
        }
        return result;
    };
    Circle.prototype.upperPointY = function () { return this.points[0].y - this.radius; };
    Circle.prototype.leftPointX = function () { return this.points[0].x - this.radius; };
    Circle.prototype.lowerPointY = function () { return this.points[0].y + this.radius; };
    Circle.prototype.rightPointX = function () { return this.points[0].x + this.radius; };
    Circle.prototype.getPointsForUpdateStatus = function () {
        var points = [];
        for (var i = 0; i < 32; i++) {
            var x = this.points[0].x + this.radius * Math.cos(i * 2 / 32 * Math.PI);
            var y = this.points[0].y + this.radius * Math.sin(i * 2 / 32 * Math.PI);
            points.push(new Point(x, y));
        }
        return points;
    };
    return Circle;
}(Shape));
export { Circle };
