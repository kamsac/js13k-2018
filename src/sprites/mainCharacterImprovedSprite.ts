import Size from '../../helpers/Size';
import Direction from '../../helpers/Direction';
import {createSprite, createSpriteOutOfSpritesheet, getCharacterSpritesheetAabbTile} from './sprite-loaders';

const mainCharacterImprovedSpritesheet = require('./images/MainCharacterImprovedSpritesheet.png');

export const playerSpriteSize: Size = {
    width: 14,
    height: 27,
};

const spritesheetDirections: Direction[] = ['down', 'up', 'left', 'right'];
const animationFramesPerDirection: number = 4;

const mainCharacterImprovedSprites: MainCharacterImprovedSprite = {
    up: [],
    down: [],
    left: [],
    right: [],
};

const image: HTMLImageElement = createSprite(mainCharacterImprovedSpritesheet, () => {
    spritesheetDirections.forEach((direction, directionIndex) => {
        for (let animationFrameIndex = 0; animationFrameIndex < animationFramesPerDirection; animationFrameIndex++) {
            mainCharacterImprovedSprites[direction].push(
                createSpriteOutOfSpritesheet(
                    image,
                    getCharacterSpritesheetAabbTile(animationFrameIndex, directionIndex),
                ),
            );
        }
    });
});

interface MainCharacterImprovedSprite {
    up: HTMLCanvasElement[],
    down: HTMLCanvasElement[],
    left: HTMLCanvasElement[],
    right: HTMLCanvasElement[],
}

export default mainCharacterImprovedSprites;
