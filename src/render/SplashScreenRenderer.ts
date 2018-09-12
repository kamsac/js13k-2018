import {canvasSize} from './GameRenderer';
import Game, {splashScreenForcedCooldown} from '../Game';
import drawTable from '../../helpers/drawTable';
import Point from '../../helpers/Point';

export default class SplashScreenRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(game: Game): void {
        if (game.tick % 5 === 0) {
            this.context.fillStyle = '#8aa';
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
                this.context.fillStyle = 'rgba(255,255,255,0.8)';
                this.context.lineWidth = 1;
                this.context.fillText(
                    'Press spacebar to start.',
                    canvasSize.width / 2,
                    canvasSize.height * 4 / 5,
                );
                this.context.strokeText(
                    'Press spacebar to start.',
                    canvasSize.width / 2,
                    canvasSize.height * 4 / 5,
                );
            }

            this.drawControls();
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

    private drawControls(): void {
        this.context.fillStyle = '#fff';
        const position: Point = new Point(
            170,
            canvasSize.height * 0.5,
        );
        this.context.font = 'bold 24px monospace';
        this.context.fillText('Controls:', 232, position.y - 42);
        drawTable(
            this.context,
            [
                {
                    key: 'Movement',
                    value: 'WASD, ZQSD, arrows',
                },
                {
                    key: 'Jump',
                    value: 'spacebar, RMB',
                },
                {
                    key: 'Use flyswatter',
                    value: 'shift, LMB',
                },
            ],
            position,
            24,
            32
        );
    }
}

const shakeStrength: number = 3;
