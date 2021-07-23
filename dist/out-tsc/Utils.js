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
    Utils.isInRectangle = function (points, x, y) {
        if (x > this.pointsLeftX(points) && x < this.pointsRightX(points) &&
            y > this.pointsUpperY(points) && y < this.pointsLowerY(points)) {
            return true;
        }
        return false;
    };
    Utils.isInPolygon = function (points, x, y) {
        var result = false;
        var j = points.length - 1;
        for (var i = 0; i < points.length; i++) {
            if ((points[i].y < y && points[j].y > y ||
                points[j].y < y && points[i].y > y) &&
                (points[i].x + (y - points[i].y) /
                    (points[j].y - points[i].y) *
                    (points[j].x - points[i].x) < x)) {
                result = !result;
            }
            j = i;
        }
        return result;
    };
    Utils.isInCircle = function (points, radius, x, y) {
        var result = false;
        var deltaX = x - points[0].x;
        var deltaY = y - points[0].y;
        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) < radius) {
            result = true;
        }
        return result;
    };
    Utils.pointsUpperY = function (points) {
        var upperPointY = points[0].y;
        for (var i = 0; i < points.length; i++) {
            if (upperPointY > points[i].y) {
                upperPointY = points[i].y;
            }
        }
        return upperPointY;
    };
    Utils.pointsLowerY = function (points) {
        var lowerPointY = points[0].y;
        for (var i = 0; i < points.length; i++) {
            if (lowerPointY < points[i].y) {
                lowerPointY = points[i].y;
            }
        }
        return lowerPointY;
    };
    Utils.pointsLeftX = function (points) {
        var leftPointX = points[0].x;
        for (var i = 0; i < points.length; i++) {
            if (leftPointX > points[i].x) {
                leftPointX = points[i].x;
            }
        }
        return leftPointX;
    };
    Utils.pointsRightX = function (points) {
        var rightPointX = points[0].x;
        for (var i = 0; i < points.length; i++) {
            if (rightPointX < points[i].x) {
                rightPointX = points[i].x;
            }
        }
        return rightPointX;
    };
    Utils.circleUpperY = function (points, radius) {
        return points[0].y - radius;
    };
    Utils.circleLowerY = function (points, radius) {
        return points[0].y + radius;
    };
    Utils.circleLeftX = function (points, radius) {
        return points[0].x - radius;
    };
    Utils.circleRightX = function (points, radius) {
        return points[0].x + radius;
    };
    return Utils;
}());
export { Utils };
