import {Point} from './Point.js'

abstract class Shape{
  public points: Point[];
  public IsFill: boolean;

  constructor(points: Point[]){
      this.points = points;
      this.IsFill = false;
  }

  public drawShape(context: CanvasRenderingContext2D){
    
  }
}

export {Shape};
