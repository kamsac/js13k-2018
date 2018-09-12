import {canvasSize} from './GameRenderer';
import Game, {splashScreenForcedCooldown} from '../Game';

export default class SplashScreenRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(game: Game): void {
        if (game.tick % 5 === 0) {
            this.context.fillStyle = '#fff';
            this.context.fillRect(0, 0, canvasSize.width, canvasSize.height);
            this.context.textAlign = 'center';

            this.context.font = 'bold 52px monospace';
            this.drawTitleText(
                'Ｓｅｒｖｉｃｅ Ｐｒｏｖｉｄｅｒ',
                canvasSize.width / 2,
                canvasSize.height / 4,
            );

            if (game.tick > splashScreenForcedCooldown) {
                this.context.font = 'bold 42px monospace';
                this.context.strokeStyle = '#000';
                this.context.lineWidth = 1;
                this.context.strokeText(
                    'Press spacebar to start.',
                    canvasSize.width / 2,
                    canvasSize.height * 4 / 5,
                );
            }
        }
    }

    private drawTitleText(
        text: string,
        x: number,
        y: number,
    ): void {
        if (Math.random() < 0.9) {
            this.context.lineWidth = 6;
            this.context.strokeStyle = Math.random() < 0.9 ? 'rgba(0,255,0,0.5)' : 'rgba(255,0,0,0.5)';
            this.context.strokeText(
                text,
                x + Math.random() * shakeStrength - shakeStrength / 2,
                y + Math.random() * shakeStrength - shakeStrength / 2,
            );
        }

        this.context.lineWidth = 3;
        this.context.strokeStyle = '#000';
        this.context.strokeText(text, x, y);
    }
}

const shakeStrength: number = 3;
