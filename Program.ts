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

class DragAndDropApp{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private shapes: Shape[];

    constructor(){
        let canvas = document.getElementById('canvas') as
                    HTMLCanvasElement;
        let context = canvas.getContext("2d");

        this.shapes = [
            new Shape([new Point(100, 100), new Point(200,200), new Point(100, 200)]),
            new Shape([new Point(100, 250), new Point(300,250), new Point(300, 400), new Point (100, 400)]),
            new Shape([new Point(100, 450), new Point(300,520), new Point(300, 550), new Point (200, 535), new Point (100, 570)])
        ]

        this.canvas = canvas;
        this.context = context;

        this.redraw(context);
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
}

new DragAndDropApp();