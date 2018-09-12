import World from '../world/World';
import Sprites from '../sprites/Sprites';
import Size from '../../helpers/Size';

export default class FloorRenderer {
    private context: CanvasRenderingContext2D;
    private floorSpprite?: HTMLCanvasElement;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        this.context.drawImage(
            this.floorSpprite ? this.floorSpprite : this.getFloorSprite(world),
            world.walkingArea.x,
            world.walkingArea.y,
        );
    }

    private getFloorSprite(world: World): HTMLCanvasElement {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = world.walkingArea.width;
        canvas.height = world.walkingArea.height;

        const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

        context.imageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;

        const tilesCount: Size = {
            width: world.walkingArea.width / spriteRenderSize.width +1,
            height: world.walkingArea.height / spriteRenderSize.height +1,
        };

        for (let i = 0; i < tilesCount.width; i++) {
            for (let j = 0; j < tilesCount.height; j++) {
                context.drawImage(
                    Sprites.floor[Math.random() < 0.6 ? 1 : (Math.random() * 4)|0],
                    i*spriteRenderSize.width,
                    j*spriteRenderSize.height,
                    spriteRenderSize.width,
                    spriteRenderSize.height,
                )
            }
        }

        this.floorSpprite = canvas;

        return canvas;
    }
}

const spriteRenderSize: Size = {
    width: 50,
    height: 50,
};
