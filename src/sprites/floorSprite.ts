import Size from '../../helpers/Size';
import {createSprite, createSpriteOutOfSpritesheet, getSpritesheetAabbTile} from './sprite-loaders';

const floorSpritesheet = require('./images/FloorSpritesheet.png');

export const floorTileSize: Size = {
    width: 16,
    height: 16,
};

const floorTileSprites: HTMLCanvasElement[] = [];

const image: HTMLImageElement = createSprite(floorSpritesheet, () => {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            floorTileSprites.push(
                createSpriteOutOfSpritesheet(
                    image,
                    getSpritesheetAabbTile(i, j, floorTileSize),
                ),
            );
        }
    }
});

export default floorTileSprites;
