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
            const destroyed: number = 1 - (cable.health / cable.maxHealth);
            const percent: number = destroyed * 50;

            this.context.fillStyle = `hsl(0, 100%, ${percent}%)`;
            this.context.fillRect(aabb.x, aabb.y, aabb.width, aabb.height);
        });
    }
}
