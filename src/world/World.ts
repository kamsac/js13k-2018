import Size from '../../helpers/Size';
import {canvasSize} from '../render/GameRenderer';
import MainCharacter from '../main-character/MainCharacter';
import AABB from '../../helpers/AABB';

export const worldSize: Size = canvasSize;

export default class World {
    public player: MainCharacter;
    public roomWalls: AABB[];

    public constructor() {
        this.player = new MainCharacter(this);
        this.roomWalls = this.getRoomWalls();
    }

    public update(): void {
        this.player.update();
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
