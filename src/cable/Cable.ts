import WorldObject from '../world/WorldObject';
import World from '../world/World';
import Point from '../../helpers/Point';

export default class Cable extends WorldObject {
    public health: number;
    public maxHealth: number;

    constructor(options: CableOptions) {
        super({
            world: options.world,
            position: options.position,
            collisionMask: {
                width: options.angle === 'vertical' ? cableDepth : options.length,
                height: options.angle === 'horizontal' ? cableDepth : options.length,
            },
        });

        this.maxHealth = 100;
        this.health = this.maxHealth;
    }

    public getBitten() {
        this.health -= 10;
        if (this.health < 0) {
            this.health = 0;
        }
    }
}

const cableDepth: number = 6;

interface CableOptions {
    world: World;
    position: Point,
    angle: 'vertical' | 'horizontal',
    length: number,
}