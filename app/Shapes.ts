class Point{
  private _x: number;
  private _y: number;

  get x(){
      return this._x;
  }
  get y(){
      return this._y;
  }
  set x(value){
      this._x = value;
  }
  set y(value){
      this._y = value;
  }

  constructor(x: number, y: number){
      this._x = x;
      this._y = y;
  }
}

abstract class Shape{
  private _points: Point[];
  private _IsFill: boolean;

  get points(){
      return this._points;
  }
  get IsFill(){
      return this._IsFill;
  }
  set IsFill(bool){
      this._IsFill = bool;
  }

  constructor(points: Point[]){
      this._points = points;
      this._IsFill = false;
  }
}

class Triangle extends Shape{
    shapeType: string = "Triangle";
    constructor(points: Point[]){
        super(points);
    }
}

class Rectangle extends Shape{
    shapeType: string = "Rectangle";
    constructor(points: Point[]){
        super(points);
    }
}

class Polygon extends Shape{
    shapeType: string = "Polygon";
    constructor(points: Point[]){
        super(points);
    }
}
export { Point, Shape, Rectangle, Triangle, Polygon };
