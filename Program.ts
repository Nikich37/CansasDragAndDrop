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
        this.IsFill = false;
    }

    
}


class DragAndDropApp{
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
            context.lineTo(shape.points[0].x, shape.points[0].y);
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
            this.y = e.offsetY - this.canvas.offsetTop;
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

new DragAndDropApp();