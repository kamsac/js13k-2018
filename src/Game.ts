import Stats from 'stats.js';
import KeyboardAndMouseGameInput from './input/KeyboardAndMouseGameInput';
import Locator from './Locator';
import GameRenderer from './render/GameRenderer';
import GameInput from './input/GameInput';
import World from './world/World';
import SoundPlayer, {SOUND_NAMES} from './sound/SoundPlayer';

export default class Game {
    public readonly ticksPerSecond: number;
    private readonly tickTime: number; // ms
    private lastTickTime: number; // ms
    private currentUpdateLag: number; // ms
    private readonly maxUpdateLag: number; // ms
    private fpsStats!: Stats;
    private world: World;
    private readonly gameRenderer: GameRenderer;
    private readonly gameInput: GameInput;
    private tick: number;
    public state: GameState;
    private lastStateChange: number;
    public soundPlayer: SoundPlayer;

    public constructor() {
        this.ticksPerSecond = 60;
        this.tickTime = 1000 / this.ticksPerSecond;
        this.lastTickTime = 0;
        this.currentUpdateLag = 0;
        this.maxUpdateLag = 500;
        this.gameRenderer = new GameRenderer(this);
        this.gameInput = new KeyboardAndMouseGameInput(this.gameRenderer.canvas);
        Locator.provideGameInput(this.gameInput);
        this.tick = 0;
        this.state = GameState.Gameplay;
        this.lastStateChange = 0;
        this.soundPlayer = new SoundPlayer();
        this.world = new World(this);
        this.initFpsStats();
        this.requestNextFrame();

        this.playMusic();
    }

    public restartWorld(): void {
        this.setState(GameState.Gameplay);
        this.world = new World(this);
    }

    public setState(state: GameState): void {
        if (this.state !== state) {
            this.state = state;
            this.lastStateChange = this.tick;
        }
    }

    private requestNextFrame(): void {
        window.requestAnimationFrame((timestamp: number) => { this.gameLoop(timestamp); });
    }

    private gameLoop(time: number): void {
        this.fpsStats.begin();
        const tickDeltaTime: number = Math.min(this.maxUpdateLag, time - this.lastTickTime);
        this.currentUpdateLag += tickDeltaTime;

        while (this.currentUpdateLag > this.tickTime) {
            this.currentUpdateLag -= this.tickTime;
            this.update(this.tickTime / 1000);
        }
        this.render();
        this.lastTickTime = time;
        this.fpsStats.end();
        this.requestNextFrame();
    }

    private update(deltaTimeInSeconds: number): void {
        this.tick++;
        this.world.update();
        this.gameInput.update();

        if (this.state === GameState.GameOver) {
            if (
                this.tick - this.lastStateChange > gameOverForcedCooldown &&
                (
                    this.gameInput.bindings.attack.pressed ||
                    this.gameInput.bindings.jump.pressed
                )
            )
                this.restartWorld();
        }
    }

    private render(): void {
        this.gameRenderer.render(this.world);
    }

    private initFpsStats(): void {
        this.fpsStats = new Stats();
        this.fpsStats.showPanel(0);
        document.body.appendChild(this.fpsStats.dom);
    }

    private playMusic(): void {
        addEventListener(
            'keypress',
            () => {
                // ready for chrome
                const haxDelay: number = 1000;
                window.setTimeout(() => {
                    this.soundPlayer.playSound(SOUND_NAMES.GameplayMusic, {loop: true});
                }, haxDelay);
            },
            {
                once: true,
            },
        );
    }
}

export enum GameState {
    SplashScreen,
    Gameplay,
    GameOver,
}

const gameOverForcedCooldown: number = 90;
