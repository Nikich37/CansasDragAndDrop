import { Shape } from './geometric-shapes/Shape.js';
import { Point } from './geometric-shapes/Point.js'
import { ShapesFabric } from './geometric-shapes/ShapesFabric.js'

class DragAndDropApp {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private drag: boolean;
    private shapes: Shape[];
    private oldPoints: Point[];
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
            shapesFabric.CreateCircle(50),
            shapesFabric.CreateRectangle(150, 150),
            shapesFabric.CreateCircle(100),
            shapesFabric.CreatePolygon([new Point(100, 450), new Point(300, 520),
            new Point(300, 550), new Point(200, 535), new Point(100, 570)]),
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

        this.draw();
        this.createUserEvents();
    }

    private makeShapesFreely() {
        let lastLowerPointY: number = 50;
        let leftSidePointX: number = 50;
        let deltaY: number = 0;
        let deltaX: number = 0;

        for (let i = 0; i < this.shapes.length; i++) {
            let upperPointY: number = this.shapes[i].upperPointY();
            let leftPointX: number = this.shapes[i].leftPointX();
    
            deltaY = upperPointY - lastLowerPointY;
            deltaX = leftPointX - leftSidePointX;

            for (let j = 0; j < this.shapes[i].points.length; j++) {
                this.shapes[i].points[j].y -= deltaY;
                this.shapes[i].points[j].x -= deltaX;
            }
            lastLowerPointY = this.shapes[i].lowerPointY() + 20;
        }
    }

    private updateStatusShapes() {
        for (let i = 0; i < this.shapes.length; i++) {
            this.shapes[i].updateStatusShape(this.shapes);
        }
    }

    private IsShape(x: number, y: number): boolean {
        let result: boolean = false;
        let finalResult = false;
        this.shapes.forEach(function (value) {
            result = false;
            let shape: Shape = value;
            result = shape.contains(x, y);
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
            result = shape.contains(x, y);
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
            value.draw(context);
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
                let shape = self.shapes[self.indexDragShape];
                self.shapes.splice(self.indexDragShape, 1);
                self.shapes.push(shape);
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
