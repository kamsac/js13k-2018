import World from '../world/World';
import AABB from '../../helpers/AABB';
import Sprites from '../sprites/Sprites';
import Point from '../../helpers/Point';
import MainCharacter from '../main-character/MainCharacter';
import {playerSpriteSize} from './MainCharacterRenderer';
import Direction from '../../helpers/Direction';

export default class FlyswatRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        const aabb: AABB = world.flyswat.getAABB();

        this.renderCrosshair(aabb);

        this.renderFlyswat(world, aabb, world.flyswat.isHitting);
    }

    private renderCrosshair(aabb: AABB): void {
        this.context.fillStyle = 'rgba(0,0,0,0.15)';
        this.context.fillRect(aabb.x, aabb.y, aabb.width, aabb.height);
    }

    private renderFlyswat(world: World, aabb: AABB, isHitting: boolean): void {
        const playerHandPosition: Point = getPlayerRightHandPosition(world.player);
        const inMidairOffset: number = isHitting ? 0 : -flyswatMidairHeight - world.player.positionZ;

        this.context.lineWidth = 2;
        this.context.strokeStyle = '#120f0c';
        this.context.beginPath();
        this.context.moveTo(playerHandPosition.x, playerHandPosition.y);
        this.context.lineTo(world.flyswat.position.x, world.flyswat.position.y + inMidairOffset);

        this.context.stroke();
        this.context.drawImage(Sprites.flyswat, aabb.x, aabb.y + inMidairOffset, aabb.width, aabb.height);
    }
}

function getPlayerRightHandPosition(player: MainCharacter): Point {
    let centerOff: Point = new Point(0, 16);
    switch (player.forward.direction()) {
        case 'up':
            centerOff.x = 10;
            break;
        case 'right':
            centerOff.x = -4;
            break;
        case 'down':
            centerOff.x = -10;
            break;
        case 'left':
            centerOff.x = 4;
            break;
    }

    return new Point(
        player.position.x + centerOff.x,
        player.position.y - playerSpriteSize.height/2 - player.positionZ + centerOff.y,
    );
}

export function isFlyswatBehindPlayer(player: MainCharacter): boolean {
    const direction: Direction = player.forward.direction();
    return (direction === 'up' || direction === 'left');
}

const flyswatMidairHeight: number = 20;
