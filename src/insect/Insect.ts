import WorldObject from '../world/WorldObject';
import Point from '../../helpers/Point';
import World from '../world/World';
import Vector from '../../helpers/Vector';
import Size from '../../helpers/Size';
import intersectAABB from '../../helpers/intersectAABB';

export default class Insect extends WorldObject {
    public isAlive: boolean;
    private velocity: Vector;
    private forward: Vector;
    private ticksSinceMoveChange: number;
    private ticksToMoveChange: number;
    private wantsToMove: boolean;
    public animationFrame: number;

    constructor(world: World) {
        const collisionMask: Size = {
            width: 12,
            height: 12,
        };
        super({
            world,
            position: new Point(
                Math.random() * (world.walkingArea.width-collisionMask.width) + (world.walkingArea.x+collisionMask.width/2),
                Math.random() * (world.walkingArea.height-collisionMask.height) + (world.walkingArea.y+collisionMask.height/2),
            ),
            collisionMask,
        });

        this.isAlive = true;
        this.velocity = new Vector(0, 0);
        this.forward = new Vector(1, 0);
        this.ticksSinceMoveChange = 0;
        this.wantsToMove = false;
        this.ticksToMoveChange = this.getRandomTicksToMoveChange();
        this.animationFrame = 0;
    }

    public update(): void {
        if (this.isAlive) {
            this.ticksSinceMoveChange++;
            if (this.ticksSinceMoveChange > this.ticksToMoveChange) {
                this.ticksSinceMoveChange = 0;
                this.wantsToMove = !this.wantsToMove;
                this.ticksToMoveChange = this.getRandomTicksToMoveChange();
                this.forward = this.getRandomDirection().normalized();
            }

            if (this.wantsToMove) {
                this.velocity = this.forward.multiply(1);

                const targetPosition: Point = this.position.addVector(this.velocity);
                const targetPositionX: Point = new Point(targetPosition.x, this.position.y);
                const targetPositionY: Point = new Point(this.position.x, targetPosition.y);
                this.world.roomWalls.forEach((wall) => {
                    if (intersectAABB(this.getAABB({targetPosition: targetPositionX}), wall)) {
                        this.velocity.x = 0;
                    }
                    if (intersectAABB(this.getAABB({targetPosition: targetPositionY}), wall)) {
                        this.velocity.y = 0;
                    }
                });
                this.position = this.position.addVector(this.velocity);

                if (this.world.tick % 5 === 0) {
                    this.animationFrame = (this.animationFrame + 1) % animationFrames;
                }
            }
        }
    }

    public kill(): void {
        if (this.isAlive) {
            this.isAlive = false;
            this.velocity = this.velocity.multiply(0);

            this.world.score += 10;

            this.world.spawnInsect();
        }
    }

    private getRandomDirection(): Vector {
        return this.forward.rotate(Math.random()*Math.PI*2);
    }

    private getRandomTicksToMoveChange(): number {
        return Math.random()*120;
    }
}

const animationFrames: number = 2;
