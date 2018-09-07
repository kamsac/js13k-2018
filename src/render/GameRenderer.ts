import Size from '../../helpers/Size';
import World from '../world/World';
import AABB from '../../helpers/AABB';
import MainCharacterRenderer from './MainCharacterRenderer';
import FlyswatRenderer, {isFlyswatBehindPlayer} from './FlyswatRenderer';
import InsectsRenderer from './InsectsRenderer';
import CablesRenderer from './CablesRenderer';
import ScoreRenderer from './ScoreRenderer';

export const canvasSize: Size = {
    width: 800,
    height: 600,
};

export default class GameRenderer {
    public canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;

    private mainCharacterRenderer: MainCharacterRenderer;
    private flyswatRenderer: FlyswatRenderer;
    private insectsRenderer: InsectsRenderer;
    private cablesRenderer: CablesRenderer;
    private scoreRenderer: ScoreRenderer;

    public constructor() {
        this.createCanvas();
        this.attachCanvas();

        this.mainCharacterRenderer = new MainCharacterRenderer(this.context);
        this.flyswatRenderer = new FlyswatRenderer(this.context);
        this.insectsRenderer = new InsectsRenderer(this.context);
        this.cablesRenderer = new CablesRenderer(this.context);
        this.scoreRenderer = new ScoreRenderer(this.context);
    }

    public render(world: World): void {
        this.clearCanvas();

        this.renderWalls(world.roomWalls);
        this.cablesRenderer.render(world);
        this.insectsRenderer.render(world);
        this.scoreRenderer.render(world);

        if (isFlyswatBehindPlayer(world.player)) {
            this.flyswatRenderer.render(world);
            this.mainCharacterRenderer.render(world.player);
        } else {
            this.mainCharacterRenderer.render(world.player);
            this.flyswatRenderer.render(world);
        }
    }

    private renderWalls(walls: AABB[]) {
        this.context.fillStyle = '#211';
        walls.forEach((wall) => {
            this.context.fillRect(wall.x, wall.y, wall.width, wall.height);
        });
    }

    private clearCanvas(): void {
        this.context.setTransform(1,0,0,1,0,0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = '#466';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private createCanvas(): void {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;

        this.canvas.width = canvasSize.width;
        this.canvas.height = canvasSize.height;

        this.context.imageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
    }

    private attachCanvas(): void {
        document.body.appendChild(this.canvas);
    }
}
