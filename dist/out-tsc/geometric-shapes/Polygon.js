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
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    function Polygon(points) {
        var _this = _super.call(this, points) || this;
        _this.shapeType = "Polygon";
        return _this;
    }
    Polygon.prototype.drawShape = function (context) {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach(function (value) {
            var point = value;
            context.lineTo(point.x, point.y);
        });
        context.lineTo(this.points[0].x, this.points[0].y);
        if (this.IsFill == true) {
            context.fillStyle = '#FF0000';
            context.fill();
            context.stroke();
        }
        else {
            context.stroke();
        }
        context.closePath();
    };
    return Polygon;
}(Shape));
export { Polygon };
