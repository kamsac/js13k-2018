import PlayerCharacterInputManager from './PlayerCharacterInputManager';
import Point from '../helpers/Point';
import Vector from '../helpers/Vector';
import World, {worldSize} from '../world/World';
import intersectAABB from '../helpers/intersectAABB';
import WorldObject from '../world/WorldObject';
import Cable from '../cable/Cable';
import {SOUND_NAMES} from '../sound/SoundPlayer';
import getSoundPan from '../helpers/getSoundPan';
import {GameState} from '../Game';

export default class MainCharacter extends WorldObject {
    private inputManager: PlayerCharacterInputManager;
    private inputVelocity: Vector;
    public velocity: Vector;
    public position: Point;
    public positionZ: number;
    public velocityZ: number;
    public forward: Vector;
    public distanceTraveled: number;
    public timesJumped: number;

    constructor(world: World) {
        super({
            world,
            position: new Point(worldSize.width/2, worldSize.height/2),
            collisionMask: {
                width: 16,
                height: 16,
            },
        });

        this.inputManager = new PlayerCharacterInputManager();
        this.inputVelocity = new Vector(0, 0) ;
        this.velocity = new Vector(0, 0);
        this.position = new Point(worldSize.width/2, worldSize.height/2);
        this.forward = new Vector(0, 1);
        this.positionZ = 0;
        this.velocityZ = 0;
        this.distanceTraveled = 0;
        this.timesJumped = 0;
    }

    public update(): void {
        this.inputVelocity = this.inputVelocity.multiply(0);
        this.inputManager.update(this);

        this.velocity = this.velocity.add(this.inputVelocity);
        if (!this.isInMidAir()) {
            this.velocity = this.velocity.multiply(MOVEMENT_DUMP);
        }
        this.velocityZ -= gravity;

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

        if (this.positionZ < 0) {
            this.positionZ = 0;
            this.velocityZ = 0;
        }

        if (this.world.game.state === GameState.Gameplay) {
            this.distanceTraveled += this.isInMidAir() ? this.velocity.length() / 2 : this.velocity.length();
        }

        if (!this.isInMidAir()) {
            this.world.cables.forEach((cable) => {
                if (intersectAABB(this.getAABB(), cable.getAABB())) {
                    this.fallOverCable(cable);
                }
            });
        }

        this.positionZ += this.velocityZ;
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
        if (!this.isInMidAir()) {
            if (this.velocityZ === 0) {
                this.world.game.soundPlayer.playSound(SOUND_NAMES.Jump, {
                    pan: getSoundPan(this.position),
                });
                this.timesJumped++;
                this.velocityZ = jumpForce;
            }
        }
    }

    public isInMidAir(): boolean {
        return this.positionZ > 0;
    }

    public attack(): void {
        this.world.flyswat.hit();
    }

    public fallOverCable(cable: Cable): void {
        cable.getSteppedOnByMainCharacter();
        this.velocity = this.forward.multiply(1.5);
        this.velocityZ = jumpForce / 2;
    }
}

const MOVEMENT_ACCELERATION: number = 0.4;
const MOVEMENT_DUMP: number = 0.9;

const gravity: number = 0.1;
const jumpForce: number = 2;
