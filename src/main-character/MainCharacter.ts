import PlayerCharacterInputManager from './PlayerCharacterInputManager';
import Point from '../../helpers/Point';
import Vector from '../../helpers/Vector';
import World, {worldSize} from '../world/World';
import AABB from '../../helpers/AABB';
import Size from '../../helpers/Size';
import intersectAABB from "../../helpers/intersectAABB";

const MOVEMENT_ACCELERATION: number = 0.4;
const MOVEMENT_DUMP: number = 0.9;

export default class MainCharacter {
    public world: World;
    private inputManager: PlayerCharacterInputManager;
    private inputVelocity: Vector;
    private velocity: Vector;
    public position: Point;
    public forward: Vector;
    private mask: Size;

    constructor(world: World) {
        this.world = world;
        this.inputManager = new PlayerCharacterInputManager();
        this.inputVelocity = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.position = new Point(worldSize.width/2, worldSize.height/2);
        this.forward = new Vector(0, 1);
        this.mask = {
            width: 16,
            height: 16,
        };
    }

    public update(): void {
        this.inputVelocity = this.inputVelocity.multiply(0);
        this.inputManager.update(this);

        this.velocity = this.velocity.add(this.inputVelocity);
        this.velocity = this.velocity.multiply(MOVEMENT_DUMP);

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

        const isCharacterStopped: boolean = (this.velocity.x === 0 && this.velocity.y === 0);
        if (!isCharacterStopped) {
            this.forward = this.velocity.normalized();
        }
        this.position = this.position.addVector(this.velocity);
    }

    public moveUp(): void {
        this.inputVelocity = this.inputVelocity.add(new Vector(0, -MOVEMENT_ACCELERATION));
    }

    public moveDown(): void {
        this.inputVelocity = this.inputVelocity.add(new Vector(0, MOVEMENT_ACCELERATION));
    }

    public moveLeft(): void {
        this.inputVelocity = this.inputVelocity.add(new Vector(-MOVEMENT_ACCELERATION, 0));
    }

    public moveRight(): void {
        this.inputVelocity = this.inputVelocity.add(new Vector(MOVEMENT_ACCELERATION, 0));
    }

    public jump(): void {
        console.log('jump');
    }

    public attack(): void {
        console.log('attack');
    }

    getAABB(AABBOptions: AABBOptions = {}): AABB {
        const position: Point = AABBOptions.targetPosition ? AABBOptions.targetPosition : this.position;

        if (AABBOptions.roundPositions) {
            return {
                x: Math.round(position.x - this.mask.width / 2),
                y: Math.round(position.y - this.mask.height / 2),
                width: this.mask.width,
                height: this.mask.height,
            }
        }

        return {
            x: position.x - this.mask.width / 2,
            y: position.y - this.mask.height / 2,
            width: this.mask.width,
            height: this.mask.height,
        }
    }
}

interface AABBOptions {
    targetPosition?: Point,
    roundPositions?: boolean,
}
