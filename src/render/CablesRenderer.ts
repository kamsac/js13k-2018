import World from '../world/World';
import AABB from '../../helpers/AABB';
import Sprites from '../sprites/Sprites';
import Size from '../../helpers/Size';
import SimpleAngle from '../../helpers/SimpleAngle';

export default class CablesRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        world.cables.forEach((cable) => {
            const aabb: AABB = cable.getAABB();
            const destroyed: number = 1 - (cable.health / cable.maxHealth);
            const destroyIndexMax: number = 4;
            const destroyIndex: number = (destroyIndexMax * destroyed)|0;
            const angle: SimpleAngle = cable.angle;

            const renderAabb: AABB = angle === 'horizontal'
                ?
                {
                    x: aabb.x,
                    y: aabb.y - spriteVsCollisionPadding,
                    width: spriteRenderSize.width,
                    height: spriteRenderSize.height + spriteVsCollisionPadding,
                }
                :
                {
                    x: aabb.x - spriteVsCollisionPadding,
                    y: aabb.y,
                    width: spriteRenderSize.height! + spriteVsCollisionPadding,
                    height: spriteRenderSize.width!,
                };

            this.context.drawImage(
                Sprites.cable[angle][destroyIndex],
                renderAabb.x|0,
                renderAabb.y|0,
                renderAabb.width|0,
                renderAabb.height|0,
            );

            const damageIndicatorProgress: number = Math.min((world.tick - cable.lastDamageTick) / cableDamageIndicatorDuration, 1);
            this.context.fillStyle = `rgba(255,0,0,${(1-damageIndicatorProgress)/2})`;
            this.context.fillRect(
                renderAabb.x|0,
                renderAabb.y|0,
                renderAabb.width|0,
                renderAabb.height|0,
            );
        });
    }
}

const spriteVsCollisionPadding: number = 1;
const spriteRenderSize: Size = {
    width: 50,
    height: 8,
};
const cableDamageIndicatorDuration: number = 100;
