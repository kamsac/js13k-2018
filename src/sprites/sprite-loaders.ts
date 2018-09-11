import AABB from '../../helpers/AABB';
import {playerSpriteSize} from './mainCharacterImprovedSprite';

// class SpriteLoader {
//     public createSpriteOutOfSpritesheet(image: HTMLImageElement, aabb: AABB): HTMLCanvasElement {
//         const canvas: HTMLCanvasElement = document.createElement('canvas');
//         canvas.width = aabb.width;
//         canvas.height = aabb.height;
//
//         const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
//         context.drawImage(
//             image,
//             aabb.x, aabb.y, aabb.width, aabb.height,
//             0, 0, aabb.width, aabb.height,
//         );
//
//         this.handleOnLoad();
//
//         return canvas;
//     }
//
//     public getCharacterSpritesheetAabbTile(x: number, y: number): AABB {
//         return {
//             x: playerSpriteSize.width * x,
//             y: playerSpriteSize.height * y,
//             width: playerSpriteSize.width,
//             height: playerSpriteSize.height,
//         }
//     }
//
//     public createSprite(sprite: string, callback?: () => void): HTMLImageElement {
//         const image = new Image();
//         image.onload = () => this.handleOnLoad(callback);
//         image.src = sprite;
//         return image;
//     }
//
//     private handleOnLoad(callback?: () => void): void {
//         imagesReady++;
//         if (callback) {
//             callback();
//         }
//         if (imagesReady === allSpritesCount) {
//             window.dispatchEvent(imagesReadyEvent);
//         }
//     }
// }
//
// const TheSpriteLoader = new SpriteLoader();
// export default TheSpriteLoader;

export function createSpriteOutOfSpritesheet(image: HTMLImageElement, aabb: AABB): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = aabb.width;
    canvas.height = aabb.height;

    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    context.drawImage(
        image,
        aabb.x, aabb.y, aabb.width, aabb.height,
        0, 0, aabb.width, aabb.height,
    );

    handleOnLoad();

    return canvas;
}

export function getCharacterSpritesheetAabbTile(x: number, y: number): AABB {
    return {
        x: playerSpriteSize.width * x,
        y: playerSpriteSize.height * y,
        width: playerSpriteSize.width,
        height: playerSpriteSize.height,
    }
}

export function createSprite(sprite: string, callback?: () => void): HTMLImageElement {
    const image = new Image();
    image.onload = () => handleOnLoad(callback);
    image.src = sprite;
    return image;
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
