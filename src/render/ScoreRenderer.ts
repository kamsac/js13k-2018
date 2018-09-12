import World from '../world/World';
import {canvasSize} from './GameRenderer';

export default class ScoreRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        this.drawInfoBox();

        this.context.font = 'bold 42px monospace';
        this.context.textAlign = 'left';
        this.context.fillStyle = '#fff';
        this.context.lineWidth = 1;

        this.context.fillText(`Score: ${world.score}`, scoreTextLeftMargin, scoreTextTopMargin);
        this.context.fillText(`Hit streak: x${world.flyswat.hitStreak}`, hitStreakTextRightMargin, hitStreakTextTopMargin);
        this.context.fillText(`High score: ${world.game.highScore}`, highScoreTextLeftMargin, highScoreTextTopMargin);
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
}

const infoBoxHeight: number = 120;

const scoreTextTopMargin: number = 50;
const scoreTextLeftMargin: number = 60;

const hitStreakTextTopMargin: number = 50;
const hitStreakTextRightMargin: number = 400;

const highScoreTextTopMargin: number = 100;
const highScoreTextLeftMargin: number = 60;
