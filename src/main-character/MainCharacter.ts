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
    private position: Point;
    private mask: Size;

    constructor(world: World) {
        this.world = world;
        this.inputManager = new PlayerCharacterInputManager();
        this.inputVelocity = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.position = new Point(worldSize.width/2, worldSize.height/2);
        this.mask = {
            width: 40,
            height: 40,
        };
    }

    public update(): void {
        this.inputVelocity = this.inputVelocity.multiply(0);
        this.inputManager.update(this);

        this.velocity = this.velocity.add(this.inputVelocity);
        this.velocity = this.velocity.multiply(MOVEMENT_DUMP);

        const targetPosition: Point = this.position.addVector(this.velocity);
        this.world.roomWalls.forEach((wall) => {
            if (intersectAABB(this.getAABB(targetPosition), wall)) {
                this.velocity = this.velocity.multiply(0);
            }
        })

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

    getAABB(targetPosition?: Point): AABB {
        const position: Point = targetPosition ? targetPosition : this.position;
        return {
            x: position.x - this.mask.width / 2,
            y: position.y - this.mask.height / 2,
            width: this.mask.width,
            height: this.mask.height,
        }
    }
}
