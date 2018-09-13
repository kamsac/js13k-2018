import MainCharacter from '../main-character/MainCharacter';
import AABB from '../helpers/AABB';
import Size from '../helpers/Size';
import Direction from '../helpers/Direction';
import mainCharacterSprites, {playerSpriteSize} from '../sprites/mainCharacterSprites';

export default class MainCharacterRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(player: MainCharacter): void {
        const playerAABB: AABB = player.getAABB({roundPositions: true});

        this.drawShadow(player, playerAABB);
        this.drawCharacter(player, playerRenderSize, playerAABB);
    }

    private drawCharacter(player: MainCharacter, spriteSize: Size, playerAABB: AABB): void {
        const direction: Direction = player.forward.direction();
        const animationFrame: number = player.velocity.length() < 0.05 ? 0 : (player.distanceTraveled/25 % 4)|0;

        this.context.drawImage(
            mainCharacterSprites[direction][animationFrame],
            (player.position.x - spriteSize.width/2),
            (player.position.y - spriteSize.height + playerAABB.height/2 - player.positionZ),
            (spriteSize.width),
            (spriteSize.height),
        );
    }

    private drawShadow(player: MainCharacter, playerAABB: AABB): void {
        this.context.beginPath();
        this.context.ellipse(
            (player.position.x)|0,
            (player.position.y + playerAABB.height/2 - playerAABB.height/2)|0,
            (playerAABB.width)|0,
            (playerAABB.width/1.5)|0,
            0,
            0,
            Math.PI*2,
        );
        this.context.fillStyle = 'rgba(0,0,0,0.2)';
        this.context.fill();
    }
}

export const playerRenderSize: Size = {
    width: playerSpriteSize.width * 2,
    height: playerSpriteSize.height * 2,
}
