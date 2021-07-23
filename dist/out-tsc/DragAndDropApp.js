import { Point } from './geometric-shapes/Point.js';
import { ShapesFabric } from './geometric-shapes/ShapesFabric.js';
var DragAndDropApp = /** @class */ (function () {
    function DragAndDropApp() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        var shapesFabric = new ShapesFabric;
        this.shapes = [
            shapesFabric.CreateRectangle(50, 50),
            shapesFabric.CreateCircle(50),
            shapesFabric.CreateRectangle(150, 150),
            shapesFabric.CreateCircle(100),
            shapesFabric.CreatePolygon([new Point(100, 450), new Point(300, 520),
                new Point(300, 550), new Point(200, 535), new Point(100, 570)]),
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
        this.draw();
        this.createUserEvents();
    }
    DragAndDropApp.prototype.makeShapesFreely = function () {
        var lastLowerPointY = 50;
        var leftSidePointX = 50;
        var deltaY = 0;
        var deltaX = 0;
        for (var i = 0; i < this.shapes.length; i++) {
            var upperPointY = this.shapes[i].upperPointY();
            var leftPointX = this.shapes[i].leftPointX();
            deltaY = upperPointY - lastLowerPointY;
            deltaX = leftPointX - leftSidePointX;
            for (var j = 0; j < this.shapes[i].points.length; j++) {
                this.shapes[i].points[j].y -= deltaY;
                this.shapes[i].points[j].x -= deltaX;
            }
            lastLowerPointY = this.shapes[i].lowerPointY() + 20;
        }
    };
    DragAndDropApp.prototype.updateStatusShapes = function () {
        for (var i = 0; i < this.shapes.length; i++) {
            this.shapes[i].updateStatusShape(this.shapes);
        }
    };
    DragAndDropApp.prototype.IsShape = function (x, y) {
        var result = false;
        var finalResult = false;
        this.shapes.forEach(function (value) {
            result = false;
            var shape = value;
            result = shape.contains(x, y);
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
            result = shape.contains(x, y);
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
            value.draw(context);
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
                var shape = self.shapes[self.indexDragShape];
                self.shapes.splice(self.indexDragShape, 1);
                self.shapes.push(shape);
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
