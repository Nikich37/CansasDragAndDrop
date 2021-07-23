var Shape = /** @class */ (function () {
    function Shape(shapeId, points) {
        this.shapeId = shapeId;
        this.points = points;
        this.isFill = false;
    }
    Shape.prototype.upperPointY = function () { return null; };
    Shape.prototype.leftPointX = function () { return null; };
    Shape.prototype.lowerPointY = function () { return null; };
    Shape.prototype.rightPointX = function () { return null; };
    Shape.prototype.draw = function (context) { };
    Shape.prototype.contains = function (x, y) { return null; };
    Shape.prototype.getPointsForUpdateStatus = function () { return null; };
    Shape.prototype.fill = function (context) {
        context.fillStyle = '#FF0000';
        context.fill();
    };
    Shape.prototype.updateStatusShape = function (shapes) {
        var firstFlag = false;
        ;
        var secondFlag = false;
        ;
        var self = this;
        var selfPoints = this.getPointsForUpdateStatus();
        shapes.forEach(function (value) {
            var points = value.getPointsForUpdateStatus();
            if (self.shapeId != value.shapeId) {
                for (var i = 0; i < points.length; i++) {
                    if (self.contains(points[i].x, points[i].y)) {
                        firstFlag = true;
                    }
                }
                for (var i = 0; i < selfPoints.length; i++) {
                    if (value.contains(selfPoints[i].x, selfPoints[i].y)) {
                        secondFlag = true;
                    }
                }
            }
        });
        if (firstFlag || secondFlag) {
            self.isFill = true;
        }
        else {
            self.isFill = false;
        }
    };
    return Shape;
}());
export { Shape };
