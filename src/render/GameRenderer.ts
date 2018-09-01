import Size from '../../helpers/Size';
import World from '../world/World';
import AABB from '../../helpers/AABB';
import MainCharacterRenderer from './MainCharacterRenderer';

export const canvasSize: Size = {
    width: 800,
    height: 600,
};

export default class GameRenderer {
    public canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;

    private mainCharacterRenderer: MainCharacterRenderer;

    public constructor() {
        this.createCanvas();
        this.attachCanvas();

        this.mainCharacterRenderer = new MainCharacterRenderer(this.context);
    }

    public render(world: World): void {
        this.clearCanvas();
        this.renderWalls(world.roomWalls);
        this.mainCharacterRenderer.render(world.player);
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
        this.context.fillStyle = '#344';
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
