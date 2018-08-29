import Size from "../../helpers/Size";
import MainCharacter from "../main-character/MainCharacter";
import World from "../world/World";
import AABB from "../../helpers/AABB";

export const canvasSize: Size = {
    width: 800,
    height: 600,
};

export default class GameRenderer {
    public canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;

    public constructor() {
        this.createCanvas();
        this.setResolution(canvasSize);
        this.attachCanvas();
    }

    public render(world: World): void {
        this.clearCanvas();
        this.renderPlayer(world.player);
    }

    private renderPlayer(player: MainCharacter) {
        const playerAABB: AABB = player.getAABB();
        this.context.fillStyle = 'tomato';
        this.context.fillRect(playerAABB.x, playerAABB.y, playerAABB.width, playerAABB.height);
    }

    private clearCanvas(): void {
        this.context.setTransform(1,0,0,1,0,0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = '#344';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private setResolution(dimensions: Size) {
        this.canvas.width = dimensions.width;
        this.canvas.height = dimensions.height;
    }

    private createCanvas(): void {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;
    }

    private attachCanvas(): void {
        document.body.appendChild(this.canvas);
    }
}
