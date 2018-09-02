import WorldObject from '../world/WorldObject';
import World from '../world/World';
import Point from '../../helpers/Point';

export default class Cable extends WorldObject {
    public health: number;

    constructor(options: CableOptions) {
        super({
            world: options.world,
            position: options.position,
            collisionMask: {
                width: options.angle === 'vertical' ? cableDepth : options.length,
                height: options.angle === 'horizontal' ? cableDepth : options.length,
            },
        });

        this.health = 100;
    }
}

const cableDepth: number = 10;

interface CableOptions {
    world: World;
    position: Point,
    angle: 'vertical' | 'horizontal',
    length: number,
}