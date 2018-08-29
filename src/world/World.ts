import Size from '../../helpers/Size';
import {canvasSize} from '../render/GameRenderer';

const worldSize: Size = canvasSize;

export default class World {
    public constructor() {

    }

    public update(): void {
        console.log('update world');
    }
}
