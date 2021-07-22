import {Point} from './geometric-shapes/Point.js'

class Utils{

    public static getPointsForRectangle(weight: number, height: number): Point[]{
        let leftPointX: number = 0;
        let upperPointY: number = 0;
        let rightPointX: number = leftPointX + weight;
        let lowerPointY: number = upperPointY + height;
        let points = [new Point(leftPointX, upperPointY), 
        new Point(rightPointX, upperPointY), new Point(rightPointX, lowerPointY),
        new Point(leftPointX, lowerPointY)];
        return points;
    }
}

export {Utils};