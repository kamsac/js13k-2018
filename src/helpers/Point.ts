import Vector from './Vector';

export default class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public addVector(vector: Vector): Point {
        return new Point(
            this.x + vector.x,
            this.y + vector.y,
        );
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}
