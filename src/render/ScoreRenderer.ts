import World from '../world/World';
import {canvasSize} from './GameRenderer';

export default class ScoreRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        this.context.font = '48px Lucida Console, Monaco5, monospace';
        this.context.fillStyle = 'white';
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fillText(`${world.score}`, canvasSize.width / 2, 80);
        this.context.strokeText(`${world.score}`, canvasSize.width / 2, 80);
    }
}
