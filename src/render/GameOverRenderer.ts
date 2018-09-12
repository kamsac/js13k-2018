import World from '../world/World';
import {canvasSize} from './GameRenderer';
import AABB from '../../helpers/AABB';
import drawTable, {TableRowData} from './drawTable';
import Point from '../../helpers/Point';

export default class GameOverRenderer {
    private context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        const aabb: AABB = {
            x: 0,
            y: canvasSize.height/2 - infoBoxHeight/2 + infoBoxTopMargin,
            width: canvasSize.width,
            height: infoBoxHeight,
        };

        this.drawInfoBox(aabb);

        this.context.fillStyle = '#fff';
        this.context.lineWidth = 1;

        this.drawHeader(aabb);
        this.drawSummary(aabb, world);
        this.drawScores(aabb, world);
        this.drawStats(aabb, world);
    }

    private drawInfoBox(aabb: AABB): void {
        this.context.fillStyle = 'rgba(136, 170, 170, 0.5)';
        this.context.strokeStyle = '#000';
        this.context.lineWidth = 4;

        this.context.fillRect(aabb.x, aabb.y, aabb.width, aabb.height);
        this.context.strokeRect(aabb.x, aabb.y, aabb.width, aabb.height);
    }

    private drawScores(aabb: AABB, world: World): void {
        const tableData: TableRowData[] = [
            {
                key: 'SCORE',
                value: world.score + '',
            },
            {
                key: 'HIGH SCORE',
                value: world.game.highScore + '',
            }
        ];

        drawTable(
            this.context,
            tableData,
            new Point(aabb.x + scoresTextMarginLeft, aabb.y + scoresTextMarginTop),
            32,
            48,
        );
    }

    private drawStats(aabb: AABB, world: World): void {
        const tableData: TableRowData[] = [
            {
                key: 'BEST HIT STREAK',
                value: `x${world.flyswat.highestHitStreak}`,
            },
            {
                key: 'FLYSWATTER HITS',
                value: `${world.flyswat.timesHit}`,
            },
            {
                key: 'FLYSWATTER ACCURACY',
                value: `${~~(world.flyswat.timesHit / world.flyswat.timesUsed * 100)}%`,
            },
            {
                key: 'JUMPS',
                value: `${world.player.timesJumped}`,
            },
            {
                key: 'CABLE TREADS',
                value: `${world.cableTreads}`,
            },
            {
                key: 'CABLE BUG BITES',
                value: `${world.cableBites}`,
            },
            {
                key: 'STEPS TRAVELED',
                value: `${~~(world.player.distanceTraveled / 40)}`,
            },
        ];

        drawTable(
            this.context,
            tableData,
            new Point(aabb.x + statsTextMarginLeft, aabb.y + statsTextMarginTop),
            24,
            24,
        );
    }

    private drawSummary(aabb: AABB, world: World) {
        this.context.font = 'bold 32px monospace';
        this.context.textAlign = 'center';

        this.context.fillText(
            `CONNECTION KEPT INTACT FOR: ${~~(world.ticksSurvivedFor / world.game.ticksPerSecond)} SECONDS`,
            canvasSize.width/2,
            aabb.y + aabb.height - headerFontSize/2,
        );
    }

    private drawHeader(aabb: AABB): void {
        this.context.font = 'bold 42px monospace';
        this.context.textAlign = 'center';

        this.context.fillText('GAME OVER', canvasSize.width/2, aabb.y + headerFontSize);
    }
}

const infoBoxHeight: number = 300;
const infoBoxTopMargin: number = 50;

const headerFontSize: number = 42;

const scoresTextMarginTop: number = headerFontSize * 2.1;
const scoresTextMarginLeft: number = 30;

const statsTextMarginTop: number = scoresTextMarginTop - 5;
const statsTextMarginLeft: number = 400;
