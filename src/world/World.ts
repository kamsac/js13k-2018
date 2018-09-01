import Size from '../../helpers/Size';
import {canvasSize} from '../render/GameRenderer';
import MainCharacter from '../main-character/MainCharacter';
import AABB from '../../helpers/AABB';
import Flyswat from '../flyswat/Flyswat';

export const worldSize: Size = canvasSize;

export default class World {
    public tick: number;
    public player: MainCharacter;
    public roomWalls: AABB[];
    public flyswat: Flyswat;

    public constructor() {
        this.tick = 0;
        this.player = new MainCharacter(this);
        this.roomWalls = this.getRoomWalls();
        this.flyswat = new Flyswat(this);
    }

    public update(): void {
        this.tick++;
        this.player.update();
        this.flyswat.update();
    }

    private getRoomWalls(): AABB[] {
        const depth: number = 20;
        const topMargin: number = 120;
        const leftMargin: number = 60;
        const rightMargin: number = 60;
        const bottomMargin: number = 60;
        return [
            { // left
                x: leftMargin,
                y: topMargin,
                width: depth,
                height: worldSize.height - topMargin - bottomMargin,
            },
            { // top
                x: leftMargin,
                y: topMargin,
                width: worldSize.width - leftMargin - rightMargin,
                height: depth,
            },
            { // right
                x: worldSize.width - rightMargin - depth,
                y: topMargin,
                width: depth,
                height: worldSize.height - topMargin - bottomMargin,
            },
            { // bottom
                x: leftMargin,
                y: worldSize.height - bottomMargin - depth,
                width: worldSize.width - leftMargin - rightMargin,
                height: depth,
            }
        ];
    }
}
