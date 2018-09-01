const mainCharacterDownSprite = require('./MainCharacter-down.png');

function createSprite(sprite: string): HTMLImageElement {
    const image = new Image();
    image.src = sprite;
    return image;
}

export const mainCharacter = createSprite(mainCharacterDownSprite);
