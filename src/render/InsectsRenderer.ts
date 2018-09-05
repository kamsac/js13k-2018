import World from '../world/World';
import AABB from '../../helpers/AABB';
import Sprites from '../sprites/Sprites';

export default class InsectsRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        world.insects.forEach((insect) => {
            const aabb: AABB = insect.getAABB();
            if (insect.isAlive) {
                this.context.drawImage(Sprites.insect.alive[insect.animationFrame], aabb.x, aabb.y, aabb.width, aabb.height);
            } else {
                this.context.globalAlpha = 0.6;
                this.context.drawImage(Sprites.insect.dead, aabb.x, aabb.y, aabb.width, aabb.height);
                this.context.globalAlpha = 1;
            }
        });
    }
}
