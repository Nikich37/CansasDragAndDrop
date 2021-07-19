var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Shape = /** @class */ (function () {
    function Shape(points) {
        this.points = points;
        this.IsFill = true;
    }
    return Shape;
}());
var x = 0;
var y = 0;
var oldX = 0;
var oldY = 0;
var DragAndDropApp = /** @class */ (function () {
    function DragAndDropApp() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        this.shapes = [
            new Shape([new Point(100, 100), new Point(200, 200), new Point(100, 200)]),
            new Shape([new Point(100, 250), new Point(300, 250), new Point(300, 400), new Point(100, 400)]),
            new Shape([new Point(100, 450), new Point(300, 520), new Point(300, 550), new Point(200, 535), new Point(100, 570)])
        ];
        this.oldPoints = this.shapes[0].points;
        this.canvas = canvas;
        this.context = context;
        this.redraw(context);
        this.createUserEvents();
    }
    DragAndDropApp.prototype.redraw = function (context) {
        this.shapes.forEach(function (value) {
            var shape = value;
            context.beginPath();
            context.moveTo(shape.points[0].x, shape.points[0].y);
            shape.points.forEach(function (value) {
                var point = value;
                context.lineTo(point.x, point.y);
            });
            context.lineTo(shape.points[shape.points.length - 1].x, shape.points[shape.points.length - 1].y);
            if (shape.IsFill == true) {
                context.fillStyle = '#FF0000';
                context.fill();
            }
            else {
                context.stroke();
            }
            context.closePath();
        });
    };
    DragAndDropApp.prototype.IsShape = function (x, y) {
        var result = false;
        var index = 0;
        this.shapes.forEach(function (value) {
            var shape = value;
            var j = shape.points.length - 1;
            for (var i = 0; i < shape.points.length; i++) {
                if ((shape.points[i].y < y && shape.points[j].y >= y || shape.points[j].y < y && shape.points[i].y >= y) &&
                    (shape.points[i].x + (y - shape.points[i].y) / (shape.points[j].y - shape.points[i].y) * (shape.points[j].x - shape.points[i].x) < x)) {
                    result = !result;
                }
                j = i;
            }
            if (result == true) {
                this.indexDragShape = index;
            }
            index++;
        });
        return result;
    };
    DragAndDropApp.prototype.WhichShape = function (x, y) {
        var result = false;
        var index = 0;
        this.shapes.forEach(function (value) {
            var shape = value;
            var j = shape.points.length - 1;
            for (var i = 0; i < shape.points.length; i++) {
                if ((shape.points[i].y < y && shape.points[j].y >= y || shape.points[j].y < y && shape.points[i].y >= y) &&
                    (shape.points[i].x + (y - shape.points[i].y) / (shape.points[j].y - shape.points[i].y) * (shape.points[j].x - shape.points[i].x) < x)) {
                    result = !result;
                }
                j = i;
            }
            if (result == true) {
                this.indexDragShape = index;
            }
            index++;
        });
        return index;
    };
    DragAndDropApp.prototype.createUserEvents = function () {
        var _this = this;
        var canvas = this.canvas;
        canvas.addEventListener("mousedown", function (e) {
            x = e.offsetX;
            y = e.offsetY;
            if (_this.IsShape(x, y)) {
                _this.drag = true;
                _this.oldPoints = _this.shapes[0].points;
            }
        });
        canvas.addEventListener("mousemove", function (e) {
            if (_this.drag) {
                _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                for (var i = 0; i < _this.shapes[0].points.length; i++) {
                    _this.shapes[0].points[i].x = _this.oldPoints[i].x + x - oldX;
                    _this.shapes[0].points[i].y = _this.oldPoints[i].y + y - oldY;
                }
                _this.redraw(_this.context);
                x = e.offsetX;
                y = e.offsetY;
            }
        });
        canvas.addEventListener("mouseup", function (e) {
            if (_this.drag) {
                _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                for (var i = 0; i < _this.shapes[0].points.length; i++) {
                    _this.shapes[0].points[i].x = _this.oldPoints[i].x + x - oldX;
                    _this.shapes[0].points[i].y = _this.oldPoints[i].y + y - oldY;
                }
                _this.redraw(_this.context);
                x = 0;
                y = 0;
                _this.drag = false;
            }
        });
    };
    return DragAndDropApp;
}());
new DragAndDropApp();
