import World from '../world/World';
import AABB from '../../helpers/AABB';

export default class FlyswatRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        const aabb: AABB = world.flyswat.getAABB();

        this.renderCrooshair(aabb);

        if (world.flyswat.isHitting) {
            this.context.fillStyle = 'tomato';
            this.context.fillRect(aabb.x, aabb.y, aabb.width, aabb.height);
        }
    }

    public renderCrooshair(aabb: AABB): void {
        this.context.fillStyle = 'rgba(255,64,64,0.5)';
        this.context.fillRect(aabb.x, aabb.y, aabb.width, aabb.height);
    }
}
