import { Point } from './geometric-shapes/Point.js';
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.getPointsForRectangle = function (weight, height) {
        var leftPointX = 0;
        var upperPointY = 0;
        var rightPointX = leftPointX + weight;
        var lowerPointY = upperPointY + height;
        var points = [new Point(leftPointX, upperPointY),
            new Point(rightPointX, upperPointY), new Point(rightPointX, lowerPointY),
            new Point(leftPointX, lowerPointY)];
        return points;
    };
    return Utils;
}());
export { Utils };
