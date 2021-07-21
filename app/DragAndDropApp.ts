import { Shape } from './geometric-shapes/Shape.js';
import { Point } from './geometric-shapes/Point.js'
import { ShapesFabric } from './geometric-shapes/ShapesFabric.js'
import { Utils } from './Utils.js';

class DragAndDropApp {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private drag: boolean;
    private shapes: Shape[];
    private oldPoints: Point[];
    private indexesShapesFilled: number[];
    private indexDragShape: number;
    private x: number;
    private y: number;
    private oldX: number;
    private oldY: number;
    private requestRedrawId;

    constructor() {
        let canvas = document.getElementById('canvas') as
            HTMLCanvasElement;
        let context = canvas.getContext("2d");
        let shapesFabric: ShapesFabric = new ShapesFabric;

        this.shapes = [
            shapesFabric.CreateRectangle(50, 50),
            shapesFabric.CreateRectangle(100, 100),
            shapesFabric.CreateRectangle(150, 150),
            shapesFabric.CreatePolygon([new Point(100, 450), new Point(300, 520),
            new Point(300, 550), new Point(200, 535), new Point(100, 570)]),
            shapesFabric.CreatePolygon([new Point(100, 450), new Point(300, 520),
            new Point(300, 550), new Point(200, 535), new Point(100, 570)])
        ]
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

    private makeShapesFreely() {
        let lastLowerPointY: number = 50;
        let leftSidePointX: number = 50;
        let deltaY: number = 0;
        let deltaX: number = 0;

        for (let i = 0; i < this.shapes.length; i++) {
            let upperPointY = Utils.findUpperPointY(this.shapes[i].points);
            let leftPointX = Utils.findLeftPointX(this.shapes[i].points);
            deltaY = upperPointY - lastLowerPointY;
            deltaX = leftPointX - leftSidePointX;

            for (let j = 0; j < this.shapes[i].points.length; j++) {
                this.shapes[i].points[j].y -= deltaY;
                this.shapes[i].points[j].x -= deltaX;
            }
            lastLowerPointY = Utils.findLowerPointY(this.shapes[i].points) + 20;

        }

    }

    private updateStatusShapes() {
        for (let i = 0; i < this.shapes.length; i++) {
            let flagIsShape: boolean = false;

            for (let j = 0; j < this.shapes[i].points.length; j++) {
                if (this.IsPointInShape(this.shapes[i].points[j].x,
                    this.shapes[i].points[j].y, i)) {

                    let index = this.InWhichShape(this.shapes[i].points[j].x,
                        this.shapes[i].points[j].y, i);
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
    }

    private IsPointInShape(x: number, y: number, indexShape: number) {
        let result: boolean = false;
        let finalResult = false;
        let index = 0;
        this.shapes.forEach(function (value) {
            result = false;
            let shape: Shape = value;
            let j: number = shape.points.length - 1;
            for (let i: number = 0; i < shape.points.length; i++) {
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
    }

    private InWhichShape(x: number, y: number, indexShape: number) {
        let result: boolean = false;
        let index: number = 0;
        let finalIndex: number = 0;
        this.shapes.forEach(function (value) {
            result = false;
            let shape: Shape = value;
            let j: number = shape.points.length - 1;
            for (let i: number = 0; i < shape.points.length; i++) {
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
    }

    private IsShape(x: number, y: number): boolean {
        let result: boolean = false;
        let finalResult = false;
        this.shapes.forEach(function (value) {
            result = false;
            let shape: Shape = value;
            let j: number = shape.points.length - 1;
            for (let i: number = 0; i < shape.points.length; i++) {
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
    }

    private WhichShape(x: number, y: number): number {
        let result: boolean = false;
        let index: number = 0;
        let finalIndex: number = 0;
        this.shapes.forEach(function (value) {
            result = false;
            let shape: Shape = value;
            let j: number = shape.points.length - 1;
            for (let i: number = 0; i < shape.points.length; i++) {
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
    }

    private draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let context = this.context;
        this.shapes.forEach(function (value) {
            value.drawShape(context);
        });
    }

    private createUserEvents() {
        let canvas = this.canvas;
        let self = this;

        function redraw() {
            if (self.drag) {
                for (let i = 0; i < self.shapes[self.indexDragShape].points.length; i++) {
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

        canvas.onmousedown = function (e){
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
            }
            redraw();
        }

    
        canvas.onmouseup = function (e) {
            canvas.onmousemove = null;
            if (self.drag) {
                for (let i = 0; i < self.shapes[self.indexDragShape].points.length; i++) {
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
            if (self.requestRedrawId){
                cancelAnimationFrame(self.requestRedrawId);
            }
        }
    }
}

export { DragAndDropApp };
