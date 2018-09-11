import AABB from '../../helpers/AABB';
import Size from '../../helpers/Size';

export function createSpriteOutOfSpritesheet(image: HTMLImageElement, tileAabb: AABB): HTMLCanvasElement {
    let canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = tileAabb.width;
    canvas.height = tileAabb.height;

    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    context.drawImage(
        image,
        tileAabb.x, tileAabb.y, tileAabb.width, tileAabb.height,
        0, 0, canvas.width, canvas.height,
    );

    handleOnLoad();

    return canvas;
}

export function createSprite(sprite: string, callback?: () => void): HTMLImageElement {
    const image = new Image();
    image.onload = () => handleOnLoad(callback);
    image.src = sprite;
    return image;
}

export function getSpritesheetAabbTile(x: number, y: number, size: Size): AABB {
    return {
        x: size.width * x,
        y: size.height * y,
        width: size.width,
        height: size.height,
    }
}

function handleOnLoad(callback?: () => void): void {
    imagesReady++;
    if (callback) {
        callback();
    }
    if (imagesReady === allSpritesCount) {
        window.dispatchEvent(imagesReadyEvent);
    }
}

const allSpritesCount: number = 7 + 4*4;
let imagesReady: number = 0;
const imagesReadyEvent: Event = new Event('imagesReady');
