import Size from '../helpers/Size';
import {createSprite, createSpriteOutOfSpritesheet, getSpritesheetAabbTile} from './sprite-loaders';

const computerHorizontalSpritesheet = require('./images/ComputerSpritesheet-horizontal.png');
const computerVerticalSpritesheet = require('./images/ComputerSpritesheet-vertical.png');

export const computerSpriteSize: Size = {
    width: 20,
    height: 12,
};

const computerSpriteSizeRotated: Size = {
    width: 8,
    height: 23,
};

const computerSprites: ComputerSprites = {
    horizontal: [],
    vertical: [],
};

const imageHorizontal: HTMLImageElement = createSprite(computerHorizontalSpritesheet, () => {
    for (let i = 0; i < 3; i++) {
        computerSprites.horizontal.push(
            createSpriteOutOfSpritesheet(
                imageHorizontal,
                getSpritesheetAabbTile(0, i, computerSpriteSize),
            ),
        );
    }
});
const imageVertical: HTMLImageElement = createSprite(computerVerticalSpritesheet, () => {
    for (let i = 0; i < 3; i++) {
        computerSprites.vertical.push(
            createSpriteOutOfSpritesheet(
                imageVertical,
                getSpritesheetAabbTile(i, 0, computerSpriteSizeRotated),
            ),
        );
    }
});

export enum ComputerSpriteIndex {
    Off,
    Green,
    Red,
}

interface ComputerSprites {
    horizontal: HTMLCanvasElement[],
    vertical: HTMLCanvasElement[],
}

export default computerSprites;
