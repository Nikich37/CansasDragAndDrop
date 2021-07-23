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
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    function Polygon(shapeId, points) {
        return _super.call(this, shapeId, points) || this;
    }
    Polygon.prototype.draw = function (context) {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach(function (value) {
            var point = value;
            context.lineTo(point.x, point.y);
        });
        context.lineTo(this.points[0].x, this.points[0].y);
        context.stroke();
        if (this.isFill) {
            this.fill(context);
        }
        context.closePath();
    };
    Polygon.prototype.contains = function (x, y) {
        return Utils.isInPolygon(this.points, x, y);
    };
    Polygon.prototype.upperPointY = function () {
        return Utils.pointsUpperY(this.points);
    };
    Polygon.prototype.leftPointX = function () {
        return Utils.pointsLeftX(this.points);
    };
    Polygon.prototype.lowerPointY = function () {
        return Utils.pointsLowerY(this.points);
    };
    Polygon.prototype.rightPointX = function () {
        return Utils.pointsRightX(this.points);
    };
    Polygon.prototype.getPointsForUpdateStatus = function () {
        var points = [];
        for (var i = 0; i < this.points.length; i++) {
            var deltaX = void 0;
            var deltaY = void 0;
            points.push(new Point(this.points[i].x, this.points[i].y));
        }
        return points;
    };
    return Polygon;
}(Shape));
export { Polygon };
