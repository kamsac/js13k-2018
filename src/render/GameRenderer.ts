import Size from '../../helpers/Size';
import World from '../world/World';
import AABB from '../../helpers/AABB';
import MainCharacterRenderer from './MainCharacterRenderer';
import FlyswatRenderer, {isFlyswatBehindPlayer} from './FlyswatRenderer';
import InsectsRenderer from './InsectsRenderer';
import CablesRenderer from './CablesRenderer';
import ScoreRenderer from './ScoreRenderer';
import ComputersRenderer from './ComputersRenderer';
import GameOverRenderer from './GameOverRenderer';
import Game, {GameState} from '../Game';
import SplashScreenRenderer from './SplashScreenRenderer';

export const canvasSize: Size = {
    width: 800,
    height: 600,
};

export default class GameRenderer {
    private game: Game;
    public canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;

    private mainCharacterRenderer: MainCharacterRenderer;
    private flyswatRenderer: FlyswatRenderer;
    private insectsRenderer: InsectsRenderer;
    private cablesRenderer: CablesRenderer;
    private computersRenderer: ComputersRenderer;
    private scoreRenderer: ScoreRenderer;
    private gameOverRenderer: GameOverRenderer;
    private splashScreenRenderer: SplashScreenRenderer;

    public constructor(game: Game) {
        this.game = game;

        this.createCanvas();
        this.attachCanvas();

        this.mainCharacterRenderer = new MainCharacterRenderer(this.context);
        this.flyswatRenderer = new FlyswatRenderer(this.context);
        this.insectsRenderer = new InsectsRenderer(this.context);
        this.cablesRenderer = new CablesRenderer(this.context);
        this.computersRenderer = new ComputersRenderer(this.context);
        this.scoreRenderer = new ScoreRenderer(this.context);
        this.gameOverRenderer = new GameOverRenderer(this.context);
        this.splashScreenRenderer = new SplashScreenRenderer(this.context);
    }

    public render(world: World): void {
        if (world.game.state === GameState.SplashScreen) {
            this.splashScreenRenderer.render(world.game);

            return;
        }

        this.clearCanvas();

        this.setHitShakeEffect(world);

        this.renderWalls(world.roomWalls);
        this.cablesRenderer.render(world);
        this.computersRenderer.render(world);
        this.insectsRenderer.render(world);
        this.scoreRenderer.render(world);

        if (isFlyswatBehindPlayer(world.player)) {
            this.flyswatRenderer.render(world);
            this.mainCharacterRenderer.render(world.player);
        } else {
            this.mainCharacterRenderer.render(world.player);
            this.flyswatRenderer.render(world);
        }

        if (this.game.state === GameState.GameOver) {
            this.gameOverRenderer.render(world);
        }
    }

    private renderWalls(walls: AABB[]) {
        this.context.fillStyle = '#211';
        walls.forEach((wall) => {
            this.context.fillRect(wall.x, wall.y, wall.width, wall.height);
        });
    }

    private setHitShakeEffect(world: World): void {
        const maxStrength: number = 10;
        const shakeTimeInTicks: number = 10;
        const ticksSinceLastHit: number = (world.tick - world.flyswat.lastHit);
        const shakeProgress: number = 1 - Math.min(ticksSinceLastHit, shakeTimeInTicks) / shakeTimeInTicks;

        function getRandomOffset(): number {
            return (Math.random()*maxStrength - maxStrength/2) * shakeProgress;
        }

        this.context.translate(getRandomOffset(), getRandomOffset());
    }

    private clearCanvas(): void {
        this.context.setTransform(1,0,0,1,0,0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = '#466';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private createCanvas(): void {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')!;

        this.canvas.width = canvasSize.width;
        this.canvas.height = canvasSize.height;

        this.context.imageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
    }

    private attachCanvas(): void {
        document.body.appendChild(this.canvas);
    }
}
