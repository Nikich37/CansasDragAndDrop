import {Point} from './geometric-shapes/Point.js'

class Utils{

    public static findLowerPointY(points: Point[]): number{
        let lowerPointY: number = points[0].y;
        for (let i = 0; i < points.length; i++){
            if (lowerPointY < points[i].y){
                lowerPointY = points[i].y;
            }
        }
        return lowerPointY;
    }

    public static findUpperPointY(points: Point[]): number{
        let upperPointY: number = points[0].y;
        for (let i = 0; i < points.length; i++){
            if (upperPointY > points[i].y){
                upperPointY = points[i].y;
            }
        }
        return upperPointY;
    }

    public static findLeftPointX(points: Point[]): number{
        let leftPointX: number = points[0].x;
        for (let i = 0; i < points.length; i++){
            if (leftPointX > points[i].x){
                leftPointX = points[i].x;
            }
        }
        return leftPointX;
    }

    public static findRightPointX(points: Point[]): number{
        let rightPointX: number = points[0].x;
        for (let i = 0; i < points.length; i++){
            if (rightPointX < points[i].x){
                rightPointX = points[i].x;
            }
        }
        return rightPointX;
    }

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