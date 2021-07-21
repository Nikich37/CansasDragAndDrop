import { Point } from './geometric-shapes/Point.js';
import { ShapesFabric } from './geometric-shapes/ShapesFabric.js';
import { Utils } from './Utils.js';
var DragAndDropApp = /** @class */ (function () {
    function DragAndDropApp() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        var shapesFabric = new ShapesFabric;
        this.shapes = [
            shapesFabric.CreateRectangle(50, 50),
            shapesFabric.CreateRectangle(100, 100),
            shapesFabric.CreateRectangle(150, 150),
            shapesFabric.CreatePolygon([new Point(100, 450), new Point(300, 520),
                new Point(300, 550), new Point(200, 535), new Point(100, 570)]),
            shapesFabric.CreatePolygon([new Point(100, 450), new Point(300, 520),
                new Point(300, 550), new Point(200, 535), new Point(100, 570)])
        ];
        this.makeShapesFreely();
        this.indexDragShape = -1;
        this.drag = false;
        this.x = 0;
        this.y = 0;
        this.oldX = 0;
        this.oldY = 0;
        this.canvas = canvas;
        this.context = context;
        this.indexesShapesFilled = [];
        this.draw();
        this.createUserEvents();
    }
    DragAndDropApp.prototype.makeShapesFreely = function () {
        var lastLowerPointY = 50;
        var leftSidePointX = 50;
        var deltaY = 0;
        var deltaX = 0;
        for (var i = 0; i < this.shapes.length; i++) {
            var upperPointY = Utils.findUpperPointY(this.shapes[i].points);
            var leftPointX = Utils.findLeftPointX(this.shapes[i].points);
            deltaY = upperPointY - lastLowerPointY;
            deltaX = leftPointX - leftSidePointX;
            for (var j = 0; j < this.shapes[i].points.length; j++) {
                this.shapes[i].points[j].y -= deltaY;
                this.shapes[i].points[j].x -= deltaX;
            }
            lastLowerPointY = Utils.findLowerPointY(this.shapes[i].points) + 20;
        }
    };
    DragAndDropApp.prototype.updateStatusShapes = function () {
        for (var i = 0; i < this.shapes.length; i++) {
            var flagIsShape = false;
            for (var j = 0; j < this.shapes[i].points.length; j++) {
                if (this.IsPointInShape(this.shapes[i].points[j].x, this.shapes[i].points[j].y, i)) {
                    var index = this.InWhichShape(this.shapes[i].points[j].x, this.shapes[i].points[j].y, i);
                    this.shapes[i].IsFill = true;
                    this.shapes[index].IsFill = true;
                    this.indexesShapesFilled.push(index);
                    flagIsShape = true;
                }
                else if (!flagIsShape &&
                    this.indexesShapesFilled.indexOf(i) == -1) {
                    this.shapes[i].IsFill = false;
                }
            }
        }
        this.indexesShapesFilled = [];
    };
    DragAndDropApp.prototype.IsPointInShape = function (x, y, indexShape) {
        var result = false;
        var finalResult = false;
        var index = 0;
        this.shapes.forEach(function (value) {
            result = false;
            var shape = value;
            var j = shape.points.length - 1;
            for (var i = 0; i < shape.points.length; i++) {
                if ((indexShape != index) && (shape.points[i].y < y &&
                    shape.points[j].y >= y || shape.points[j].y < y &&
                    shape.points[i].y >= y) &&
                    (shape.points[i].x + (y - shape.points[i].y) /
                        (shape.points[j].y - shape.points[i].y) *
                        (shape.points[j].x - shape.points[i].x) < x)) {
                    result = !result;
                }
                j = i;
            }
            if (result) {
                finalResult = true;
            }
            index++;
        });
        return finalResult;
    };
    DragAndDropApp.prototype.InWhichShape = function (x, y, indexShape) {
        var result = false;
        var index = 0;
        var finalIndex = 0;
        this.shapes.forEach(function (value) {
            result = false;
            var shape = value;
            var j = shape.points.length - 1;
            for (var i = 0; i < shape.points.length; i++) {
                if ((indexShape != index) && (shape.points[i].y < y &&
                    shape.points[j].y >= y || shape.points[j].y < y &&
                    shape.points[i].y >= y) &&
                    (shape.points[i].x + (y - shape.points[i].y) /
                        (shape.points[j].y - shape.points[i].y) *
                        (shape.points[j].x - shape.points[i].x) < x)) {
                    result = !result;
                }
                j = i;
            }
            if (result) {
                finalIndex = index;
            }
            index++;
        });
        return finalIndex;
    };
    DragAndDropApp.prototype.IsShape = function (x, y) {
        var result = false;
        var finalResult = false;
        this.shapes.forEach(function (value) {
            result = false;
            var shape = value;
            var j = shape.points.length - 1;
            for (var i = 0; i < shape.points.length; i++) {
                if ((shape.points[i].y < y && shape.points[j].y >= y ||
                    shape.points[j].y < y && shape.points[i].y >= y) &&
                    (shape.points[i].x + (y - shape.points[i].y) /
                        (shape.points[j].y - shape.points[i].y) *
                        (shape.points[j].x - shape.points[i].x) < x)) {
                    result = !result;
                }
                j = i;
            }
            if (result) {
                finalResult = true;
            }
        });
        return finalResult;
    };
    DragAndDropApp.prototype.WhichShape = function (x, y) {
        var result = false;
        var index = 0;
        var finalIndex = 0;
        this.shapes.forEach(function (value) {
            result = false;
            var shape = value;
            var j = shape.points.length - 1;
            for (var i = 0; i < shape.points.length; i++) {
                if ((shape.points[i].y < y && shape.points[j].y >= y ||
                    shape.points[j].y < y && shape.points[i].y >= y) &&
                    (shape.points[i].x + (y - shape.points[i].y) /
                        (shape.points[j].y - shape.points[i].y) *
                        (shape.points[j].x - shape.points[i].x) < x)) {
                    result = !result;
                }
                j = i;
            }
            if (result) {
                finalIndex = index;
            }
            index++;
        });
        return finalIndex;
    };
    DragAndDropApp.prototype.draw = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var context = this.context;
        this.shapes.forEach(function (value) {
            value.drawShape(context);
        });
    };
    DragAndDropApp.prototype.createUserEvents = function () {
        var canvas = this.canvas;
        var self = this;
        function redraw() {
            if (self.drag) {
                for (var i = 0; i < self.shapes[self.indexDragShape].points.length; i++) {
                    self.shapes[self.indexDragShape].points[i].x = self.oldPoints[i].x +
                        self.x - self.oldX;
                    self.shapes[self.indexDragShape].points[i].y = self.oldPoints[i].y +
                        self.y - self.oldY;
                }
                self.oldX = self.x;
                self.oldY = self.y;
                console.log("redraw");
                self.draw();
                self.requestRedrawId = requestAnimationFrame(redraw);
            }
        }
        canvas.onmousedown = function (e) {
            self.x = e.pageX - self.canvas.offsetLeft;
            self.y = e.pageY - self.canvas.offsetTop;
            self.oldX = e.pageX - self.canvas.offsetLeft;
            self.oldY = e.pageY - self.canvas.offsetTop;
            if (self.IsShape(self.x, self.y)) {
                self.drag = true;
                self.indexDragShape = self.WhichShape(self.x, self.y);
                self.oldPoints = self.shapes[self.indexDragShape].points;
            }
            canvas.onmousemove = function (e) {
                self.x = e.pageX - self.canvas.offsetLeft;
                self.y = e.pageY - self.canvas.offsetTop;
            };
            redraw();
        };
        canvas.onmouseup = function (e) {
            canvas.onmousemove = null;
            if (self.drag) {
                for (var i = 0; i < self.shapes[self.indexDragShape].points.length; i++) {
                    self.shapes[self.indexDragShape].points[i].x = self.oldPoints[i].x +
                        self.x - self.oldX;
                    self.shapes[self.indexDragShape].points[i].y = self.oldPoints[i].y +
                        self.y - self.oldY;
                }
                self.drag = false;
            }
            self.updateStatusShapes();
            self.draw();
            self.x = 0;
            self.y = 0;
            self.oldX = 0;
            self.oldY = 0;
            self.indexDragShape = -1;
            if (self.requestRedrawId) {
                cancelAnimationFrame(self.requestRedrawId);
            }
        };
    };
    return DragAndDropApp;
}());
export { DragAndDropApp };
