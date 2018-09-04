import Point from '../../helpers/Point';
import Cable from './Cable';
import World from '../world/World';

export default class CableBuilder {
    private world: World;

    constructor(world: World) {
        this.world = world;
    }

    public createCables(points: Point[]): Cable[] {
        if (points.length < 2) {
            return [];
        }

        const cables: Cable[] = [];

        for (let i = 1; i < points.length; i++) {
            const previousPoint: Point = points[i-1];
            const currentPoint: Point = points[i];
            const middlePosition: Point = middleOflineSegment(previousPoint, currentPoint);

            const isVertical: boolean = (previousPoint.x === currentPoint.x);

            cables.push(
                new Cable({
                    world: this.world,
                    position: this.getWalkingAreaPoint(middlePosition),
                    angle: isVertical ? 'vertical' : 'horizontal',
                    length: lengthOfLineSegment(previousPoint, currentPoint),
                }),
            );
        }

        return cables;
    }

    private getWalkingAreaPoint(point: Point): Point {
        return new Point(
            point.x + this.world.walkingArea.x,
            point.y + this.world.walkingArea.y,
        );
    }
}

function middleOflineSegment(point1: Point, point2: Point): Point {
    return new Point(
        (point1.x + point2.x) / 2,
        (point1.y + point2.y) / 2,
    );
}

function lengthOfLineSegment(point1: Point, point2: Point): number {
    return Math.hypot(point1.x - point2.x, point1.y - point2.y);
}
