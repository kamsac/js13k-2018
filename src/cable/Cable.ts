import WorldObject from '../world/WorldObject';
import World from '../world/World';
import Point from '../../helpers/Point';
import Computer from './Computer';

export default class Cable extends WorldObject {
    public health: number;
    public maxHealth: number;
    public computers: Computer[];

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
        this.computers = options.computers;
    }

    public getBitten(): void {
        this.health -= 10;
        if (this.health < 0) {
            this.health = 0;
        }
    }

    public triggerRipPluginOutOfSockets(): void {
        this.computers.forEach((computer) => {
            computer.ripThePlugOutOfSocket();
        });
    }
}

const cableDepth: number = 6;

interface CableOptions {
    world: World;
    position: Point,
    angle: 'vertical' | 'horizontal',
    length: number,
    computers: Computer[],
}