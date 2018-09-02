import Point from '../../helpers/Point';
import WorldObject from '../world/WorldObject';
import World from '../world/World';
import intersectAABB from '../../helpers/intersectAABB';

export default class Flyswat extends WorldObject {
    public isHitting: boolean;
    private lastHit: number;
    private hitCooldown: number;

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
    }

    public update(): void {
        this.position = this.world.player.position.addVector(this.world.player.forward.multiply(this.world.player.collisionMask.width*3));

        if (this.world.tick - this.lastHit > 2) {
            this.isHitting = false;
        }
    }

    public hit(): void {
        if (this.world.tick - this.lastHit > this.hitCooldown) {
            this.isHitting = true;
            this.world.insects.forEach((insect) => {
                if (intersectAABB(insect.getAABB(), this.getAABB())) {
                    insect.kill();
                }
            });
            this.lastHit = this.world.tick;
        }
    }
}
