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
var DragAndDropApp = /** @class */ (function () {
    function DragAndDropApp() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        this.shapes = [
            new Shape([new Point(100, 100), new Point(200, 200), new Point(100, 200)]),
            new Shape([new Point(100, 250), new Point(300, 250), new Point(300, 400), new Point(100, 400)]),
            new Shape([new Point(100, 450), new Point(300, 520), new Point(300, 550), new Point(200, 535), new Point(100, 570)])
        ];
        this.canvas = canvas;
        this.context = context;
        this.redraw(context);
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
    return DragAndDropApp;
}());
new DragAndDropApp();
