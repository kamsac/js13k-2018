import Size from '../../helpers/Size';
import Direction from '../../helpers/Direction';
import {createSprite, createSpriteOutOfSpritesheet, getSpritesheetAabbTile} from './sprite-loaders';

const mainCharacterSpritesheet = require('./images/MainCharacterSpritesheet.png');

export const playerSpriteSize: Size = {
    width: 14,
    height: 27,
};

const spritesheetDirections: Direction[] = ['down', 'up', 'left', 'right'];
const animationFramesPerDirection: number = 4;

const mainCharacterSprites: MainCharacterSprites = {
    up: [],
    down: [],
    left: [],
    right: [],
};

const image: HTMLImageElement = createSprite(mainCharacterSpritesheet, () => {
    spritesheetDirections.forEach((direction, directionIndex) => {
        for (let animationFrameIndex = 0; animationFrameIndex < animationFramesPerDirection; animationFrameIndex++) {
            mainCharacterSprites[direction].push(
                createSpriteOutOfSpritesheet(
                    image,
                    getSpritesheetAabbTile(animationFrameIndex, directionIndex, playerSpriteSize),
                ),
            );
        }
    });
});

interface MainCharacterSprites {
    up: HTMLCanvasElement[],
    down: HTMLCanvasElement[],
    left: HTMLCanvasElement[],
    right: HTMLCanvasElement[],
}

export default mainCharacterSprites;
