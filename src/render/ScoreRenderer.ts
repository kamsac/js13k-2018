import World from '../world/World';
import {canvasSize} from './GameRenderer';

export default class ScoreRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        this.drawInfoBox();
        this.drawScoreText(world);
    }

    private drawInfoBox(): void {
        this.context.fillStyle = '#8aa';
        this.context.strokeStyle = '#000';
        this.context.lineWidth = 4;
        this.context.fillRect(0, 0, canvasSize.width, infoBoxHeight);
        this.context.beginPath();
        this.context.moveTo(0, infoBoxHeight);
        this.context.lineTo(canvasSize.width, infoBoxHeight);
        this.context.stroke();
    }

    private drawScoreText(world: World): void {
        this.context.font = 'bold 64px monospace';
        this.context.textAlign = 'left';
        this.context.fillStyle = '#fff';
        this.context.lineWidth = 3;
        const scoreText: string = `Score: ${world.score}`;
        this.context.fillText(scoreText, scoreTextLeftMargin, scoreTextTopMargin);
        this.context.strokeText(scoreText, scoreTextLeftMargin, scoreTextTopMargin);
    }
}

const infoBoxHeight: number = 120;
const scoreTextTopMargin: number = 80;
const scoreTextLeftMargin: number = 60;