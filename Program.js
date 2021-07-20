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
        this.IsFill = false;
    }
    return Shape;
}());
var DragAndDropApp = /** @class */ (function () {
    function DragAndDropApp() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        this.shapes = [
            new Shape([new Point(100, 100), new Point(200, 200), new Point(100, 200)]),
            new Shape([new Point(100, 250), new Point(300, 250), new Point(300, 400), new Point(100, 400)]),
            new Shape([new Point(100, 450), new Point(300, 520), new Point(300, 550), new Point(200, 535), new Point(100, 570)])
        ];
        this.indexDragShape = -1;
        this.drag = false;
        this.x = 0;
        this.y = 0;
        this.oldX = 0;
        this.oldY = 0;
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
            context.lineTo(shape.points[0].x, shape.points[0].y);
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
        var finalResult = false;
        this.shapes.forEach(function (value) {
            result = false;
            var shape = value;
            var j = shape.points.length - 1;
            for (var i = 0; i < shape.points.length; i++) {
                if ((shape.points[i].y < y && shape.points[j].y >= y || shape.points[j].y < y && shape.points[i].y >= y) &&
                    (shape.points[i].x + (y - shape.points[i].y) / (shape.points[j].y - shape.points[i].y) * (shape.points[j].x - shape.points[i].x) < x)) {
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
                if ((shape.points[i].y < y && shape.points[j].y >= y || shape.points[j].y < y && shape.points[i].y >= y) &&
                    (shape.points[i].x + (y - shape.points[i].y) / (shape.points[j].y - shape.points[i].y) * (shape.points[j].x - shape.points[i].x) < x)) {
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
    DragAndDropApp.prototype.createUserEvents = function () {
        var _this = this;
        var canvas = this.canvas;
        canvas.addEventListener("mousedown", function (e) {
            _this.x = e.pageX - _this.canvas.offsetLeft;
            _this.y = e.offsetY - _this.canvas.offsetTop;
            if (_this.drag == false) {
                _this.oldX = e.pageX - _this.canvas.offsetLeft;
                _this.oldY = e.pageY - _this.canvas.offsetTop;
            }
            if (_this.IsShape(_this.x, _this.y) && _this.drag == false) {
                _this.shapes.push(new Shape([new Point(500, 200), new Point(700, 200), new Point(600, 300)]));
                _this.redraw(_this.context);
                _this.drag = true;
                _this.indexDragShape = _this.WhichShape(_this.x, _this.y);
                _this.oldPoints = _this.shapes[_this.indexDragShape].points;
            }
        });
        canvas.addEventListener("mousemove", function (e) {
            if (_this.drag) {
                _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                _this.x = e.pageX - _this.canvas.offsetLeft;
                _this.y = e.pageY - _this.canvas.offsetTop;
                for (var i = 0; i < _this.shapes[_this.indexDragShape].points.length; i++) {
                    _this.shapes[_this.indexDragShape].points[i].x = _this.oldPoints[i].x + _this.x - _this.oldX;
                    _this.shapes[_this.indexDragShape].points[i].y = _this.oldPoints[i].y + _this.y - _this.oldY;
                }
                _this.oldX = _this.x;
                _this.oldY = _this.y;
                _this.redraw(_this.context);
            }
        });
        canvas.addEventListener("mouseup", function (e) {
            if (_this.drag) {
                _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                for (var i = 0; i < _this.shapes[_this.indexDragShape].points.length; i++) {
                    _this.shapes[_this.indexDragShape].points[i].x = _this.oldPoints[i].x + _this.x - _this.oldX;
                    _this.shapes[_this.indexDragShape].points[i].y = _this.oldPoints[i].y + _this.y - _this.oldY;
                }
                _this.redraw(_this.context);
                _this.x = 0;
                _this.y = 0;
                _this.oldX = 0;
                _this.oldY = 0;
                _this.indexDragShape = -1;
                _this.drag = false;
            }
        });
    };
    return DragAndDropApp;
}());
new DragAndDropApp();
