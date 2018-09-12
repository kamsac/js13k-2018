import mainCharacterSprites from './mainCharacterSprites';
import {createSprite} from './sprite-loaders';
import cableSprites from './cableSprites';
import floorTileSprites from './floorSprite';
import computerSprites from './computerSprites';

const insectWalking1 = require('./images/Insect-walking-1.png');
const insectWalking2 = require('./images/Insect-walking-2.png');
const insectDead = require('./images/Insect-dead.png');

const flyswat = require('./images/Flyswat.png');

const insect = {
    alive: [
        createSprite(insectWalking1),
        createSprite(insectWalking2),
    ],
    dead: createSprite(insectDead),
};

const Sprites = {
    character: mainCharacterSprites,
    insect,
    flyswat: createSprite(flyswat),
    computer: computerSprites,
    cable: cableSprites,
    floor: floorTileSprites,
};

export default Sprites;
