import { Point } from './geometric-shapes/Point.js'

class Utils {

    public static getPointsForRectangle(weight: number, height: number): Point[] {
        let leftPointX: number = 0;
        let upperPointY: number = 0;
        let rightPointX: number = leftPointX + weight;
        let lowerPointY: number = upperPointY + height;
        let points = [new Point(leftPointX, upperPointY),
        new Point(rightPointX, upperPointY), new Point(rightPointX, lowerPointY),
        new Point(leftPointX, lowerPointY)];
        return points;
    }

    public static isInRectangle(points: Point[], x: number, y: number): boolean {
        if (x > this.pointsLeftX(points) && x < this.pointsRightX(points) &&
            y > this.pointsUpperY(points) && y < this.pointsLowerY(points)) {
            return true;
        }
        return false;
    }
    public static isInPolygon(points: Point[], x: number, y: number): boolean {
        let result: boolean = false;
        let j: number = points.length - 1;
        for (let i: number = 0; i < points.length; i++) {
            if ((points[i].y < y && points[j].y > y ||
                points[j].y < y && points[i].y > y) &&
                (points[i].x + (y - points[i].y) /
                    (points[j].y - points[i].y) *
                    (points[j].x - points[i].x) < x)) {
                result = !result;
            }
            j = i;
        }
        return result;
    }
    public static isInCircle(points: Point[], radius: number,
        x: number, y: number): boolean {
        let result: boolean = false;
        let deltaX: number = x - points[0].x;
        let deltaY: number = y - points[0].y;
        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) < radius) {
            result = true;
        }
        return result;
    }

    public static pointsUpperY(points: Point[]): number {
        let upperPointY: number = points[0].y;
        for (let i = 0; i < points.length; i++) {
            if (upperPointY > points[i].y) {
                upperPointY = points[i].y;
            }
        }
        return upperPointY;
    }
    public static pointsLowerY(points: Point[]): number {
        let lowerPointY: number = points[0].y;
        for (let i = 0; i < points.length; i++) {
            if (lowerPointY < points[i].y) {
                lowerPointY = points[i].y;
            }
        }
        return lowerPointY;
    }
    public static pointsLeftX(points: Point[]): number {
        let leftPointX: number = points[0].x;
        for (let i = 0; i < points.length; i++) {
            if (leftPointX > points[i].x) {
                leftPointX = points[i].x;
            }
        }
        return leftPointX;
    }
    public static pointsRightX(points: Point[]): number {
        let rightPointX: number = points[0].x;
        for (let i = 0; i < points.length; i++) {
            if (rightPointX < points[i].x) {
                rightPointX = points[i].x;
            }
        }
        return rightPointX;
    }

    public static circleUpperY(points: Point[], radius: number): number {
        return points[0].y - radius;
    }
    public static circleLowerY(points: Point[], radius: number): number {
        return points[0].y + radius;
    }
    public static circleLeftX(points: Point[], radius: number): number {
        return points[0].x - radius;
    }
    public static circleRightX(points: Point[], radius: number): number {
        return points[0].x + radius;
    }
}

export { Utils };