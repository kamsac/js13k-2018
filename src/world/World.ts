import Size from '../../helpers/Size';
import {canvasSize} from '../render/GameRenderer';
import MainCharacter from '../main-character/MainCharacter';

export const worldSize: Size = canvasSize;

export default class World {
    public player: MainCharacter;

    public constructor() {
        this.player = new MainCharacter();
    }

    public update(): void {
        this.player.update();
    }
}
