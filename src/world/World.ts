import Size from '../../helpers/Size';
import {canvasSize} from '../render/GameRenderer';
import MainCharacter from '../main-character/MainCharacter';
import AABB from '../../helpers/AABB';
import Flyswat from '../flyswat/Flyswat';
import Insect from '../insect/Insect';

export const worldSize: Size = canvasSize;

export default class World {
    public tick: number;
    public player: MainCharacter;
    public roomWalls: AABB[];
    public flyswat: Flyswat;
    public walkingArea: AABB;
    public insects: Insect[];

    public constructor() {
        this.tick = 0;
        this.player = new MainCharacter(this);
        this.flyswat = new Flyswat(this);

        this.walkingArea = this.getWallkingArea();
        this.roomWalls = this.getRoomWalls();
        this.insects = [];

        for (let i = 0; i < 1; i++) {
            this.spawnInsect();
        }
    }

    public update(): void {
        this.tick++;
        this.insects.forEach((insect) => {
            insect.update();
        });
        this.player.update();
        this.flyswat.update();
    }

    public spawnInsect() {
        this.insects.push(new Insect(this));
    }

    private getWallkingArea(): AABB {
        return {
            x: leftMargin + wallDepth,
            y: topMargin + wallDepth,
            width: worldSize.width - leftMargin - rightMargin - wallDepth*2,
            height: worldSize.height - topMargin - bottomMargin - wallDepth*2,
        };
    }

    private getRoomWalls(): AABB[] {
        return [
            { // left
                x: leftMargin,
                y: topMargin,
                width: wallDepth,
                height: worldSize.height - topMargin - bottomMargin,
            },
            { // top
                x: leftMargin,
                y: topMargin,
                width: worldSize.width - leftMargin - rightMargin,
                height: wallDepth,
            },
            { // right
                x: worldSize.width - rightMargin - wallDepth,
                y: topMargin,
                width: wallDepth,
                height: worldSize.height - topMargin - bottomMargin,
            },
            { // bottom
                x: leftMargin,
                y: worldSize.height - bottomMargin - wallDepth,
                width: worldSize.width - leftMargin - rightMargin,
                height: wallDepth,
            }
        ];
    }
}

const wallDepth: number = 20;
const topMargin: number = 120;
const leftMargin: number = 60;
const rightMargin: number = 60;
const bottomMargin: number = 60;
