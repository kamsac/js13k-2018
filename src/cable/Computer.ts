import Point from '../helpers/Point';
import Direction from '../helpers/Direction';
import WorldObject from '../world/WorldObject';
import World from '../world/World';

export default class Computer extends WorldObject {
    public isConnected: boolean;
    public facingDirection: Direction;

    constructor(world: World, position: Point, facingDirection: Direction) {
        super({
            world,
            position,
            collisionMask: {
                width: 32,
                height: 32,
            },
        });
        this.isConnected = true;
        this.facingDirection = facingDirection;
    }
}
