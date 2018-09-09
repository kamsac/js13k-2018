import World from '../world/World';
import {canvasSize} from './GameRenderer';
import AABB from '../../helpers/AABB';

export default class GameOverRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        const aabb: AABB = {
            x: 0,
            y: canvasSize.height/2 - infoBoxHeight/2,
            width: canvasSize.width,
            height: infoBoxHeight,
        };

        this.drawInfoBox(aabb);

        this.context.fillStyle = '#fff';
        this.context.lineWidth = 1;

        this.drawHeader(aabb);
        this.drawStats(aabb, world);
    }

    private drawInfoBox(aabb: AABB): void {
        this.context.fillStyle = 'rgba(136, 170, 170, 0.9)';
        this.context.strokeStyle = '#000';
        this.context.lineWidth = 4;

        this.context.fillRect(aabb.x, aabb.y, aabb.width, aabb.height);
        this.context.strokeRect(aabb.x, aabb.y, aabb.width, aabb.height);
    }

    private drawStats(aabb: AABB, world: World): void {
        this.context.font = 'bold 32px monospace';
        this.context.textAlign = 'left';

        const lines: string[] = [
            `Score: ${world.score}`,
            `Highest hit streak: x${world.flyswat.highestHitStreak}`,
            `Connection kept intact for: ${~~(world.ticksSurvivedFor / world.game.ticksPerSecond)}s`,
        ];

        lines.forEach((line, index) => {
            const y: number = aabb.y + statsTextMarginTop + lineHeight*(index+1);
            this.context.fillText(line, statsTextMarginLeft, y);
            this.context.strokeText(line, statsTextMarginLeft, y);
        });
    }

    private drawHeader(aabb: AABB): void {
        this.context.font = 'bold 42px monospace';
        this.context.textAlign = 'center';

        const y: number = aabb.y + lineHeight;
        const x: number = canvasSize.width/2;
        const text: string = 'GAME OVER';
        this.context.fillText(text, x, y);
        this.context.strokeText(text, x, y);
    }
}

const infoBoxHeight: number = 200;

const lineHeight: number = 42;

const statsTextMarginTop: number = lineHeight;
const statsTextMarginLeft: number = 60;
