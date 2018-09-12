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

        this.drawScoreText(world);
        this.drawHighScoreText(world);
        this.drawHitStreakText(world);
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
        const scoreText: string = `Score: ${world.score}`;
        this.context.fillText(scoreText, scoreTextLeftMargin, scoreTextTopMargin);
        this.context.strokeText(scoreText, scoreTextLeftMargin, scoreTextTopMargin);
    }

    private drawHitStreakText(world: World): void {
        const scoreText: string = `Hit streak: x${world.flyswat.hitStreak}`;
        this.context.fillText(scoreText, hitStreakTextRightMargin, hitStreakTextTopMargin);
        this.context.strokeText(scoreText, hitStreakTextRightMargin, hitStreakTextTopMargin);
    }

    private drawHighScoreText(world: World): void {
        const scoreText: string = `High score: ${world.game.highScore}`;
        this.context.fillText(scoreText, highScoreTextLeftMargin, highScoreTextTopMargin);
        this.context.strokeText(scoreText, highScoreTextLeftMargin, highScoreTextTopMargin);
    }
}

const infoBoxHeight: number = 120;

const scoreTextTopMargin: number = 50;
const scoreTextLeftMargin: number = 60;

const hitStreakTextTopMargin: number = 50;
const hitStreakTextRightMargin: number = 400;

const highScoreTextTopMargin: number = 100;
const highScoreTextLeftMargin: number = 60;
