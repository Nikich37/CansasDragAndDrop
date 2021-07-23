var Shape = /** @class */ (function () {
    function Shape(shapeType, points) {
        Shape.counterShapes++;
        this.shapeType = shapeType;
        this.points = points;
        this.isFill = false;
        this.shapeId = Shape.counterShapes;
    }
    Shape.prototype.upperPointY = function () { return null; };
    Shape.prototype.leftPointX = function () { return null; };
    Shape.prototype.lowerPointY = function () { return null; };
    Shape.prototype.rightPointX = function () { return null; };
    Shape.prototype.drawShape = function (context) { };
    Shape.prototype.isInShape = function (x, y) { return null; };
    Shape.prototype.getPointsForUpdateStatus = function () { return null; };
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
                    if (self.isInShape(points[i].x, points[i].y)) {
                        firstFlag = true;
                    }
                }
                for (var i = 0; i < selfPoints.length; i++) {
                    if (value.isInShape(selfPoints[i].x, selfPoints[i].y)) {
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
