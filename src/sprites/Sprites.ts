import mainCharacterSprites from './mainCharacterSprites';
import {createSprite} from './sprite-loaders';
import cableSprites from './cableSprites';

const insectWalking1 = require('./images/Insect-walking-1.png');
const insectWalking2 = require('./images/Insect-walking-2.png');
const insectDead = require('./images/Insect-dead.png');

const flyswat = require('./images/Flyswat.png');

const computerHorizontal = require('./images/Computer-horizontal.png');
const computerVertical = require('./images/Computer-vertical.png');

const insect = {
    alive: [
        createSprite(insectWalking1),
        createSprite(insectWalking2),
    ],
    dead: createSprite(insectDead),
};

const computer = {
    vertical: createSprite(computerVertical),
    horizontal: createSprite(computerHorizontal),
};

const Sprites = {
    character: mainCharacterSprites,
    insect,
    flyswat: createSprite(flyswat),
    computer,
    cable: cableSprites,
};

export default Sprites;
