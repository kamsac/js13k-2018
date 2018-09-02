import World from '../world/World';
import AABB from '../../helpers/AABB';

export default class CablesRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        world.cables.forEach((cable) => {
            const aabb: AABB = cable.getAABB();
            this.context.fillStyle = cable.health ? 'black' : 'red';
            this.context.fillRect(aabb.x, aabb.y, aabb.width, aabb.height);
        });
    }
}
