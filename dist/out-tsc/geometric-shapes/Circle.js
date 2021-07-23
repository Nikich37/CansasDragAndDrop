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
import { Utils } from '../Utils.js';
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(shapeId, radius) {
        var _this = _super.call(this, shapeId, [new Point(0, 0)]) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.draw = function (context) {
        context.beginPath();
        context.arc(this.points[0].x, this.points[0].y, this.radius, 0, 2 * Math.PI, false);
        context.stroke();
        if (this.isFill) {
            this.fill(context);
        }
        context.closePath();
    };
    Circle.prototype.contains = function (x, y) {
        return Utils.isInCircle(this.points, this.radius, x, y);
    };
    Circle.prototype.upperPointY = function () {
        return Utils.circleUpperY(this.points, this.radius);
    };
    Circle.prototype.leftPointX = function () {
        return Utils.circleLeftX(this.points, this.radius);
    };
    Circle.prototype.lowerPointY = function () {
        return Utils.circleLowerY(this.points, this.radius);
    };
    Circle.prototype.rightPointX = function () {
        return Utils.circleRightX(this.points, this.radius);
        ;
    };
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
