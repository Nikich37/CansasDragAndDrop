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

export {Point, Shape}