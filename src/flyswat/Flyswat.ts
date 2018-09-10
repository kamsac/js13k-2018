import Point from '../../helpers/Point';
import WorldObject from '../world/WorldObject';
import World, {worldSize} from '../world/World';
import intersectAABB from '../../helpers/intersectAABB';
import {SOUND_NAMES} from "../sound/SoundPlayer";

export default class Flyswat extends WorldObject {
    public isHitting: boolean;
    public lastHit: number;
    private hitCooldown: number;
    public hitStreak: number;
    public highestHitStreak: number;

    constructor(world: World) {
        super({
            world,
            position: new Point(0, 0),
            collisionMask: {
                width: world.player.collisionMask.width * 1.5,
                height: world.player.collisionMask.height * 1.5,
            }
        });
        this.hitCooldown = 60;
        this.lastHit = 0;
        this.isHitting = false;
        this.hitStreak = 0;
        this.highestHitStreak = 0;
    }

    public update(): void {
        this.position = this.world.player.position.addVector(this.world.player.forward.multiply(this.world.player.collisionMask.width*3));

        if (this.world.tick - this.lastHit > 10) {
            this.isHitting = false;
        }
    }

    public hit(): void {
        if (this.world.tick - this.lastHit > this.hitCooldown) {
            this.world.game.soundPlayer.playSound(SOUND_NAMES.Hit, {
                pan: (this.position.x / worldSize.width) * 2 - 1,
            });
            let killedAnything = false;
            this.isHitting = true;
            this.world.insects.forEach((insect) => {
                if (intersectAABB(insect.getAABB(), this.getAABB())) {
                    insect.kill();
                    killedAnything = true;
                }
            });
            this.lastHit = this.world.tick;

            if (!killedAnything) {
                this.resetHitStreak();
            }

            this.hitCooldown = killedAnything ? 30 : 60;
        }
    }

    public increaseHitStreak(): void {
        this.hitStreak += 1;
        this.highestHitStreak = this.hitStreak > this.highestHitStreak ? this.hitStreak : this.highestHitStreak;
    }

    public resetHitStreak(): void {
        this.hitStreak = 0;
    }

    public addKillScore() {
        this.world.score += hitScoreBase + hitStreakBonus * (this.hitStreak-1);
    }
}

const hitScoreBase: number = 10;
const hitStreakBonus: number = 5;
