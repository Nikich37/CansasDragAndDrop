class Point{
    public x: number;
    public y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}

class Shape{
    public points: Point[];
    public IsFill: boolean;

    constructor(points: Point[]){
        this.points = points;
        this.IsFill = true;
    }

    
}

let x = 0;
let y = 0;
let oldX = 0;
let oldY = 0;
class DragAndDropApp{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private drag: boolean;
    private shapes: Shape[];
    private oldPoints: Point[];

    private indexDragShape: number;
    private clickX: number;
    private clickY: number;

    constructor(){
        let canvas = document.getElementById('canvas') as
                    HTMLCanvasElement;
        let context = canvas.getContext("2d");

        this.shapes = [
            new Shape([new Point(100, 100), new Point(200,200), new Point(100, 200)]),
            new Shape([new Point(100, 250), new Point(300,250), new Point(300, 400), new Point (100, 400)]),
            new Shape([new Point(100, 450), new Point(300,520), new Point(300, 550), new Point (200, 535), new Point (100, 570)])
        ]
        this.oldPoints = this.shapes[0].points;

        this.canvas = canvas;
        this.context = context;

        this.redraw(context);
        this.createUserEvents();
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
            context.lineTo(shape.points[shape.points.length - 1].x, shape.points[shape.points.length - 1].y);
            if (shape.IsFill == true){
                context.fillStyle = '#FF0000';
                context.fill();
                }
            else{
                context.stroke();
            }
            context.closePath();
        });
    }

    public IsShape(x: number, y: number): boolean{
        let result: boolean = false;
        let index: number = 0;
        this.shapes.forEach(function (value){
            let shape: Shape = value;
            let j: number = shape.points.length - 1;
            for (let i: number = 0; i < shape.points.length; i++) {
                if ( (shape.points[i].y < y && shape.points[j].y >= y || shape.points[j].y < y && shape.points[i].y >= y) &&
                (shape.points[i].x + (y - shape.points[i].y) / (shape.points[j].y - shape.points[i].y) * (shape.points[j].x - shape.points[i].x) < x) ){
                result = !result;
                }
                j = i;
            }
            if (result == true){
                this.indexDragShape = index; 
            }
            index++;
        });
        return result;
    }

    public WhichShape(x: number, y: number): number{
        let result: boolean = false;
        let index: number = 0;
        this.shapes.forEach(function (value){
            let shape: Shape = value;
            let j: number = shape.points.length - 1;
            for (let i: number = 0; i < shape.points.length; i++) {
                if ( (shape.points[i].y < y && shape.points[j].y >= y || shape.points[j].y < y && shape.points[i].y >= y) &&
                (shape.points[i].x + (y - shape.points[i].y) / (shape.points[j].y - shape.points[i].y) * (shape.points[j].x - shape.points[i].x) < x) ){
                result = !result;
                }
                j = i;
            }
            if (result == true){
                this.indexDragShape = index; 
            }
            index++;
        });
        return index;
    }

    private createUserEvents() {
        let canvas = this.canvas;
    
        canvas.addEventListener("mousedown", e => {
            x = e.offsetX;
            y = e.offsetY;
            
            if (this.IsShape(x, y)){
            this.drag = true;
            this.oldPoints = this.shapes[0].points;
            }
        });
        canvas.addEventListener("mousemove", e =>{
            if (this.drag){
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                for (let i = 0; i < this.shapes[0].points.length; i++){
                this.shapes[0].points[i].x = this.oldPoints[i].x + x - oldX;
                this.shapes[0].points[i].y = this.oldPoints[i].y + y - oldY;
                }
                this.redraw(this.context);
                x = e.offsetX;
                y = e.offsetY;
            }
        });
        canvas.addEventListener("mouseup", e =>{
            if (this.drag){
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                for (let i = 0; i < this.shapes[0].points.length; i++){
                    this.shapes[0].points[i].x = this.oldPoints[i].x + x - oldX;
                    this.shapes[0].points[i].y = this.oldPoints[i].y + y - oldY;
                }
                this.redraw(this.context);
                x = 0;
                y = 0;
                this.drag = false;
            }
        });
    
    }
}

    

new DragAndDropApp();