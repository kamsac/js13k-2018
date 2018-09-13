import WorldObject from '../world/WorldObject';
import World from '../world/World';
import Point from '../../helpers/Point';
import Computer from './Computer';
import {GameState} from '../Game';
import SimpleAngle from '../../helpers/SimpleAngle';
import {SOUND_NAMES} from '../sound/SoundPlayer';
import getSoundPan from '../../helpers/getSoundPan';

export default class Cable extends WorldObject {
    public health: number;
    public maxHealth: number;
    public computers: Computer[];
    public angle: SimpleAngle;

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
        this.angle = options.angle;
    }

    public update(): void {
        if (this.health <= 0) {
            this.disconnectComputers();
        }
    }

    public getBitten(): void {
        this.health -= 10;
        if (this.health < 0) {
            this.health = 0;
        }
        this.world.cableBites++;
        this.world.game.soundPlayer.playSound(SOUND_NAMES.Bite, {
            pan: getSoundPan(this.position),
            volume: 1,
        });
    }

    public getSteppedOnByMainCharacter(): void {
        this.health -= 25;
        if (this.health < 0) {
            this.health = 0;
        }
        this.world.cableTreads++;
        this.world.game.soundPlayer.playSound(SOUND_NAMES.Bite, {
            pan: getSoundPan(this.position),
            volume: 1,
        });
    }

    public disconnectComputers(): void {
        this.computers.forEach((computer) => {
            computer.isConnected = false;
        });

        this.world.game.setState(GameState.GameOver);
    }
}

const cableDepth: number = 6;

interface CableOptions {
    world: World;
    position: Point,
    angle: SimpleAngle,
    length: number,
    computers: Computer[],
}
