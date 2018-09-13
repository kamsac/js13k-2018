import Point from '../helpers/Point';
import AABB from '../helpers/AABB';
import Size from '../helpers/Size';
import World from './World';

export default abstract class WorldObject {
    public world: World;
    public position: Point;
    public collisionMask: Size;

    constructor(options: WorldObjectOptions) {
        this.world = options.world;
        this.position = options.position;
        this.collisionMask = options.collisionMask;
    }

    public getAABB(AABBOptions: AABBOptions = {}): AABB {
        const position: Point = AABBOptions.targetPosition ? AABBOptions.targetPosition : this.position;

        if (AABBOptions.roundPositions) {
            return {
                x: Math.round(position.x - this.collisionMask.width / 2),
                y: Math.round(position.y - this.collisionMask.height / 2),
                width: this.collisionMask.width,
                height: this.collisionMask.height,
            }
        }

        return {
            x: position.x - this.collisionMask.width / 2,
            y: position.y - this.collisionMask.height / 2,
            width: this.collisionMask.width,
            height: this.collisionMask.height,
        }
    }
}

interface WorldObjectOptions {
    world: World;
    position: Point;
    collisionMask: Size;
}

interface AABBOptions {
    targetPosition?: Point,
    roundPositions?: boolean,
}
