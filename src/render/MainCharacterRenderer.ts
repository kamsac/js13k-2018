import MainCharacter from '../main-character/MainCharacter';
import AABB from '../../helpers/AABB';
import Size from '../../helpers/Size';
import {mainCharacter} from '../sprites/Sprites';

export default class MainCharacterRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(player: MainCharacter) {
        const playerAABB: AABB = player.getAABB({roundPositions: true});
        this.context.fillStyle = 'tomato';
        this.context.fillRect(playerAABB.x, playerAABB.y|0, playerAABB.width, playerAABB.height);
        const spriteSize: Size = {
            width: 64,
            height: 64,
        };
        this.context.drawImage(
            mainCharacter,
            (player.position.x - spriteSize.width/2)|0,
            (player.position.y - spriteSize.height + playerAABB.height/2)|0,
            (spriteSize.width)|0,
            (spriteSize.height)|0,
        )
    }
}
