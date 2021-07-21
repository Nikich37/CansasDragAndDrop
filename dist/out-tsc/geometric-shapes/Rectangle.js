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
        var _this = _super.call(this, Utils.getPointsForRectangle(width, height)) || this;
        _this.shapeType = "Rectangle";
        return _this;
    }
    Rectangle.prototype.drawShape = function (context) {
        var width = Utils.findRightPointX(this.points) -
            Utils.findLeftPointX(this.points);
        var height = Utils.findLowerPointY(this.points) -
            Utils.findUpperPointY(this.points);
        if (this.IsFill) {
            context.fillStyle = '#FF0000';
            context.fillRect(Utils.findLeftPointX(this.points), Utils.findUpperPointY(this.points), width, height);
            context.strokeRect(Utils.findLeftPointX(this.points), Utils.findUpperPointY(this.points), width, height);
        }
        else {
            context.strokeRect(Utils.findLeftPointX(this.points), Utils.findUpperPointY(this.points), width, height);
        }
    };
    return Rectangle;
}(Shape));
export { Rectangle };
