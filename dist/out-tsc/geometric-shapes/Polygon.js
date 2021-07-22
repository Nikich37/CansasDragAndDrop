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
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    function Polygon(points) {
        return _super.call(this, "Polygon", points) || this;
    }
    Polygon.prototype.drawShape = function (context) {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach(function (value) {
            var point = value;
            context.lineTo(point.x, point.y);
        });
        context.lineTo(this.points[0].x, this.points[0].y);
        if (this.isFill == true) {
            context.fillStyle = '#FF0000';
            context.fill();
            context.stroke();
        }
        else {
            context.stroke();
        }
        context.closePath();
    };
    Polygon.prototype.isInShape = function (x, y) {
        var result = false;
        var j = this.points.length - 1;
        for (var i = 0; i < this.points.length; i++) {
            if ((this.points[i].y < y && this.points[j].y > y ||
                this.points[j].y < y && this.points[i].y > y) &&
                (this.points[i].x + (y - this.points[i].y) /
                    (this.points[j].y - this.points[i].y) *
                    (this.points[j].x - this.points[i].x) < x)) {
                result = !result;
            }
            j = i;
        }
        return result;
    };
    Polygon.prototype.upperPointY = function () {
        var upperPointY = this.points[0].y;
        for (var i = 0; i < this.points.length; i++) {
            if (upperPointY > this.points[i].y) {
                upperPointY = this.points[i].y;
            }
        }
        return upperPointY;
    };
    Polygon.prototype.leftPointX = function () {
        var leftPointX = this.points[0].x;
        for (var i = 0; i < this.points.length; i++) {
            if (leftPointX > this.points[i].x) {
                leftPointX = this.points[i].x;
            }
        }
        return leftPointX;
    };
    Polygon.prototype.lowerPointY = function () {
        var lowerPointY = this.points[0].y;
        for (var i = 0; i < this.points.length; i++) {
            if (lowerPointY < this.points[i].y) {
                lowerPointY = this.points[i].y;
            }
        }
        return lowerPointY;
    };
    Polygon.prototype.rightPointX = function () {
        var rightPointX = this.points[0].x;
        rightPointX.toFixed;
        for (var i = 0; i < this.points.length; i++) {
            if (rightPointX < this.points[i].x) {
                rightPointX = this.points[i].x;
            }
        }
        return rightPointX;
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
