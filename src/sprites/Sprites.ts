const mainCharacterUpSprite = require('./MainCharacter-up.png');
const mainCharacterDownSprite = require('./MainCharacter-down.png');
const mainCharacterLeftSprite = require('./MainCharacter-left.png');
const mainCharacterRightSprite = require('./MainCharacter-right.png');
const insectWalking1 = require('./Insect-walking-1.png');
const insectWalking2 = require('./Insect-walking-2.png');
const insectDead = require('./Insect-dead.png');


function createSprite(sprite: string): HTMLImageElement {
    const image = new Image();
    image.src = sprite;
    return image;
}

const mainCharacter = {
    up: createSprite(mainCharacterUpSprite),
    down: createSprite(mainCharacterDownSprite),
    left: createSprite(mainCharacterLeftSprite),
    right: createSprite(mainCharacterRightSprite),
};

const insect = {
    alive: [
        createSprite(insectWalking1),
        createSprite(insectWalking2),
    ],
    dead: createSprite(insectDead),
};

const Sprites = {
    mainCharacter,
    insect,
};

export default Sprites;
