class Point{
    private x: number;
    private y: number;
}

class Shape{
    private points: Point[];
    private IsFill: boolean;

    constructor(points: Point[]){
        this.points = points;
        this.IsFill = false;
    }
}

class DragAndDropApp{
    
}

new DragAndDropApp();