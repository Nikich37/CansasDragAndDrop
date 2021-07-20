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

class Shape{
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
export { Point, Shape };
