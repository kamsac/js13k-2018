const mainCharacterDownSprite = require('./MainCharacter-down.png');

function createSprite(sprite: string): HTMLImageElement {
    const image = new Image(16, 16);
    image.src = sprite;
    image.style.width = '32px';
    image.style.height = '32px';
    return image;
}

export const mainCharacter = createSprite(mainCharacterDownSprite);
