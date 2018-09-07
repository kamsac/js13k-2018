import MainCharacter from '../main-character/MainCharacter';
import AABB from '../../helpers/AABB';
import Size from '../../helpers/Size';
import Sprites from '../sprites/Sprites';
import Direction from '../../helpers/Direction';

export default class MainCharacterRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(player: MainCharacter): void {
        const playerAABB: AABB = player.getAABB({roundPositions: true});

        this.drawShadow(player, playerAABB);
        this.drawCharacter(player, playerSpriteSize, playerAABB);
    }

    private drawCharacter(player: MainCharacter, spriteSize: Size, playerAABB: AABB): void {
        const direction: Direction = player.forward.direction();

        this.context.drawImage(
            Sprites.mainCharacter[direction],
            (player.position.x - spriteSize.width/2)|0,
            (player.position.y - spriteSize.height + playerAABB.height/2 - player.positionZ)|0,
            (spriteSize.width)|0,
            (spriteSize.height)|0,
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

export const playerSpriteSize: Size = {
    width: 64,
    height: 64,
};
