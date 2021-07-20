import {Point, Shape} from "./Shapes";

class DragAndDropApp{
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

    constructor(){
        let canvas = document.getElementById('canvas') as
                    HTMLCanvasElement;
        let context = canvas.getContext("2d");

        this.shapes = [
            new Shape([new Point(100, 100), new Point(200,200), new Point(100, 200)]),
            new Shape([new Point(100, 250), new Point(300,250), new Point(300, 400), new Point (100, 400)]),
            new Shape([new Point(100, 450), new Point(300,520), new Point(300, 550), new Point (200, 535), new Point (100, 570)])
        ]

        this.indexDragShape = -1;
        this.drag = false;
        this.x = 0;
        this.y = 0;
        this.oldX = 0;
        this.oldY = 0;
        this.canvas = canvas;
        this.context = context;
        this.indexesShapesFilled = [];
        this.redraw(context);
        this.createUserEvents();
    }

    private updateStatusShapes(){
        for (let i = 0; i < this.shapes.length; i++){
            let flagIsShape: boolean = false;
            
            for (let j = 0; j < this.shapes[i].points.length; j++){
                if (this.IsPointInShape(this.shapes[i].points[j].x, this.shapes[i].points[j].y, i)){

                    let index = this.InWhichShape(this.shapes[i].points[j].x, this.shapes[i].points[j].y, i);
                    this.shapes[i].IsFill = true;
                    this.shapes[index].IsFill = true;
                    this.indexesShapesFilled.push(index);
                    flagIsShape = true;
                }
                else if (!flagIsShape && this.indexesShapesFilled.indexOf(i) == -1){
                    this.shapes[i].IsFill = false;
                }
            }
        }
        this.indexesShapesFilled = [];
    }

    private redraw(context: CanvasRenderingContext2D){
        this.shapes.forEach(function (value){
            let shape: Shape = value;
            context.beginPath();
            context.moveTo(shape.points[0].x, shape.points[0].y);
            shape.points.forEach(function(value){
                    let point: Point = value;
                    context.lineTo(point.x, point.y);
                });
            context.lineTo(shape.points[0].x, shape.points[0].y);
            if (shape.IsFill == true){
                context.fillStyle = '#FF0000';
                context.fill();
                context.stroke();
                }
            else{
                context.stroke();
            }
            context.closePath();
        });
    }
    public IsPointInShape(x: number, y: number, indexShape: number){
        let result: boolean = false;
        let finalResult = false;
        let index = 0;
        this.shapes.forEach(function (value){
            result = false;
            let shape: Shape = value;
            let j: number = shape.points.length - 1;
            for (let i: number = 0; i < shape.points.length; i++) {
                if ( (indexShape != index) && (shape.points[i].y < y && shape.points[j].y >= y || shape.points[j].y < y && shape.points[i].y >= y) &&
                (shape.points[i].x + (y - shape.points[i].y) / (shape.points[j].y - shape.points[i].y) * (shape.points[j].x - shape.points[i].x) < x) ){
                result = !result;
                }
                j = i;
            }
            if (result){
                finalResult = true; 
            }
            index++;
        });
        return finalResult;
    }

    public InWhichShape(x: number, y: number, indexShape: number){
        let result: boolean = false;
        let index: number = 0;
        let finalIndex: number = 0;
        this.shapes.forEach(function (value){
            result = false;
            let shape: Shape = value;
            let j: number = shape.points.length - 1;
            for (let i: number = 0; i < shape.points.length; i++) {
                if ( (indexShape != index) && (shape.points[i].y < y && shape.points[j].y >= y || shape.points[j].y < y && shape.points[i].y >= y) &&
                (shape.points[i].x + (y - shape.points[i].y) / (shape.points[j].y - shape.points[i].y) * (shape.points[j].x - shape.points[i].x) < x) ){
                result = !result;
                }
                j = i;
            }
            if (result){
                finalIndex = index; 
            }
            index++;
        });
        return finalIndex;
    }

    public IsShape(x: number, y: number): boolean{
        let result: boolean = false;
        let finalResult = false;
        this.shapes.forEach(function (value){
            result = false;
            let shape: Shape = value;
            let j: number = shape.points.length - 1;
            for (let i: number = 0; i < shape.points.length; i++) {
                if ( (shape.points[i].y < y && shape.points[j].y >= y || shape.points[j].y < y && shape.points[i].y >= y) &&
                (shape.points[i].x + (y - shape.points[i].y) / (shape.points[j].y - shape.points[i].y) * (shape.points[j].x - shape.points[i].x) < x) ){
                result = !result;
                }
                j = i;
            }
            if (result){
                finalResult = true; 
            }
        });
        return finalResult;
    }

    public WhichShape(x: number, y: number): number{
        let result: boolean = false;
        let index: number = 0;
        let finalIndex: number = 0;
        this.shapes.forEach(function (value){
            result = false;
            let shape: Shape = value;
            let j: number = shape.points.length - 1;
            for (let i: number = 0; i < shape.points.length; i++) {
                if ( (shape.points[i].y < y && shape.points[j].y >= y || shape.points[j].y < y && shape.points[i].y >= y) &&
                (shape.points[i].x + (y - shape.points[i].y) / (shape.points[j].y - shape.points[i].y) * (shape.points[j].x - shape.points[i].x) < x) ){
                result = !result;
                }
                j = i;
            }
            if (result){
                finalIndex = index; 
            }
            index++;
        });
        return finalIndex;
    }

    private createUserEvents() {
        let canvas = this.canvas;
    
        canvas.addEventListener("mousedown", e => {
            this.x = e.pageX - this.canvas.offsetLeft;
            this.y = e.pageY - this.canvas.offsetTop;
            if (this.drag == false){
            this.oldX = e.pageX - this.canvas.offsetLeft;
            this.oldY = e.pageY - this.canvas.offsetTop;
            }
            
            
            if (this.IsShape(this.x, this.y) && this.drag == false){
            this.drag = true;
            this.indexDragShape = this.WhichShape(this.x, this.y);
            this.oldPoints = this.shapes[this.indexDragShape].points;
            }
        });

        canvas.addEventListener("mousemove", e =>{
            if (this.drag){
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.x = e.pageX - this.canvas.offsetLeft;
                this.y = e.pageY - this.canvas.offsetTop;
                for (let i = 0; i < this.shapes[this.indexDragShape].points.length; i++){
                this.shapes[this.indexDragShape].points[i].x = this.oldPoints[i].x + this.x - this.oldX;
                this.shapes[this.indexDragShape].points[i].y = this.oldPoints[i].y + this.y - this.oldY;
                }
                this.oldX = this.x;
                this.oldY = this.y;
                this.redraw(this.context);
                
            }
            
        });

        canvas.addEventListener("mouseup", e =>{
            if (this.drag){
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                for (let i = 0; i < this.shapes[this.indexDragShape].points.length; i++){
                    this.shapes[this.indexDragShape].points[i].x = this.oldPoints[i].x + this.x - this.oldX;
                    this.shapes[this.indexDragShape].points[i].y = this.oldPoints[i].y + this.y - this.oldY;
                }
                this.updateStatusShapes();
                this.redraw(this.context);
                this.x = 0;
                this.y = 0;
                this.oldX = 0;
                this.oldY = 0;
                this.indexDragShape = -1;
                this.drag = false;
            }
        });
    
    }
}

export {DragAndDropApp};