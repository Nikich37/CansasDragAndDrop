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
import { Shape } from './Shape.js';
import { Utils } from '../Utils.js';
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(width, height) {
        return _super.call(this, "Rectangle", Utils.getPointsForRectangle(width, height)) || this;
    }
    Rectangle.prototype.drawShape = function (context) {
        var width = this.rightPointX() - this.leftPointX();
        var height = this.lowerPointY() - this.upperPointY();
        if (this.isFill) {
            context.fillStyle = '#FF0000';
            context.fillRect(this.leftPointX(), this.upperPointY(), width, height);
            context.strokeRect(this.leftPointX(), this.upperPointY(), width, height);
        }
        else {
            context.strokeRect(this.leftPointX(), this.upperPointY(), width, height);
        }
    };
    Rectangle.prototype.isInShape = function (x, y) {
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
    Rectangle.prototype.upperPointY = function () {
        var upperPointY = this.points[0].y;
        for (var i = 0; i < this.points.length; i++) {
            if (upperPointY > this.points[i].y) {
                upperPointY = this.points[i].y;
            }
        }
        return upperPointY;
    };
    Rectangle.prototype.leftPointX = function () {
        var leftPointX = this.points[0].x;
        for (var i = 0; i < this.points.length; i++) {
            if (leftPointX > this.points[i].x) {
                leftPointX = this.points[i].x;
            }
        }
        return leftPointX;
    };
    Rectangle.prototype.lowerPointY = function () {
        var lowerPointY = this.points[0].y;
        for (var i = 0; i < this.points.length; i++) {
            if (lowerPointY < this.points[i].y) {
                lowerPointY = this.points[i].y;
            }
        }
        return lowerPointY;
    };
    Rectangle.prototype.rightPointX = function () {
        var rightPointX = this.points[0].x;
        for (var i = 0; i < this.points.length; i++) {
            if (rightPointX < this.points[i].x) {
                rightPointX = this.points[i].x;
            }
        }
        return rightPointX;
    };
    Rectangle.prototype.getPointsForUpdateStatus = function () {
        return this.points;
    };
    return Rectangle;
}(Shape));
export { Rectangle };
