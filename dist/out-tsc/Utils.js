import { Point } from './geometric-shapes/Point.js';
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.findLowerPointY = function (points) {
        var lowerPointY = points[0].y;
        for (var i = 0; i < points.length; i++) {
            if (lowerPointY < points[i].y) {
                lowerPointY = points[i].y;
            }
        }
        return lowerPointY;
    };
    Utils.findUpperPointY = function (points) {
        var upperPointY = points[0].y;
        for (var i = 0; i < points.length; i++) {
            if (upperPointY > points[i].y) {
                upperPointY = points[i].y;
            }
        }
        return upperPointY;
    };
    Utils.findLeftPointX = function (points) {
        var leftPointX = points[0].x;
        for (var i = 0; i < points.length; i++) {
            if (leftPointX > points[i].x) {
                leftPointX = points[i].x;
            }
        }
        return leftPointX;
    };
    Utils.findRightPointX = function (points) {
        var rightPointX = points[0].x;
        for (var i = 0; i < points.length; i++) {
            if (rightPointX < points[i].x) {
                rightPointX = points[i].x;
            }
        }
        return rightPointX;
    };
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
