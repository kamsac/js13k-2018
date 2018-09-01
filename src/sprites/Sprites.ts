const mainCharacterUpSprite = require('./MainCharacter-up.png');
const mainCharacterDownSprite = require('./MainCharacter-down.png');
const mainCharacterLeftSprite = require('./MainCharacter-left.png');
const mainCharacterRightSprite = require('./MainCharacter-right.png');

function createSprite(sprite: string): HTMLImageElement {
    const image = new Image();
    image.src = sprite;
    return image;
}


export const mainCharacter = {
    up: createSprite(mainCharacterUpSprite),
    down: createSprite(mainCharacterDownSprite),
    left: createSprite(mainCharacterLeftSprite),
    right: createSprite(mainCharacterRightSprite),
};
