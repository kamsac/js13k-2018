import Size from '../../helpers/Size';
import {createSprite, createSpriteOutOfSpritesheet, getSpritesheetAabbTile} from './sprite-loaders';

const cableHorizontalSpritesheet = require('./images/CableSpritesheet-horizontal.png');
const cableVerticalSpritesheet = require('./images/CableSpritesheet-vertical.png');

export const cableSpriteSize: Size = {
    width: 20,
    height: 4,
};

const cableSpriteSizeRotated: Size = {
    width: 4,
    height: 20,
};

const damageSteps: number = 5;

const cableSprites: ComputerSprites = {
    horizontal: [],
    vertical: [],
};

const imageHorizontal: HTMLImageElement = createSprite(cableHorizontalSpritesheet, () => {
    for (let damageStepIndex = 0; damageStepIndex < damageSteps; damageStepIndex++) {
        cableSprites.horizontal.push(
            createSpriteOutOfSpritesheet(
                imageHorizontal,
                getSpritesheetAabbTile(0, damageStepIndex, cableSpriteSize),
            ),
        );
    }
});
const imageVertical: HTMLImageElement = createSprite(cableVerticalSpritesheet, () => {
    for (let damageStepIndex = 0; damageStepIndex < damageSteps; damageStepIndex++) {
        cableSprites.vertical.push(
            createSpriteOutOfSpritesheet(
                imageVertical,
                getSpritesheetAabbTile(damageStepIndex, 0, cableSpriteSizeRotated),
            ),
        );
    }
});

interface ComputerSprites {
    horizontal: HTMLCanvasElement[],
    vertical: HTMLCanvasElement[],
}

export default cableSprites;
