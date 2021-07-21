import {Point} from './Point.js'

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
}

export {Utils};