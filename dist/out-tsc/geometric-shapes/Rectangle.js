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
    function Rectangle(shapeId, width, height) {
        return _super.call(this, shapeId, Utils.getPointsForRectangle(width, height)) || this;
    }
    Rectangle.prototype.draw = function (context) {
        var width = this.rightPointX() - this.leftPointX();
        var height = this.lowerPointY() - this.upperPointY();
        context.beginPath();
        context.rect(this.leftPointX(), this.upperPointY(), width, height);
        context.strokeRect(this.leftPointX(), this.upperPointY(), width, height);
        if (this.isFill) {
            this.fill(context);
        }
        context.closePath();
    };
    Rectangle.prototype.contains = function (x, y) {
        return Utils.isInRectangle(this.points, x, y);
    };
    Rectangle.prototype.upperPointY = function () {
        return Utils.pointsUpperY(this.points);
    };
    Rectangle.prototype.leftPointX = function () {
        return Utils.pointsLeftX(this.points);
    };
    Rectangle.prototype.lowerPointY = function () {
        return Utils.pointsLowerY(this.points);
    };
    Rectangle.prototype.rightPointX = function () {
        return Utils.pointsRightX(this.points);
    };
    Rectangle.prototype.getPointsForUpdateStatus = function () {
        return this.points;
    };
    return Rectangle;
}(Shape));
export { Rectangle };
