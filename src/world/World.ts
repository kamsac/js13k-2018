import Size from '../../helpers/Size';
import {canvasSize} from '../render/GameRenderer';
import MainCharacter from '../main-character/MainCharacter';
import AABB from '../../helpers/AABB';
import Flyswat from '../flyswat/Flyswat';
import Insect from '../insect/Insect';
import Cable from '../cable/Cable';
import Point from '../../helpers/Point';

export const worldSize: Size = canvasSize;

export default class World {
    public tick: number;
    public player: MainCharacter;
    public roomWalls: AABB[];
    public flyswat: Flyswat;
    public walkingArea: AABB;
    public insects: Insect[];
    public cables: Cable[];

    public constructor() {
        this.tick = 0;
        this.player = new MainCharacter(this);
        this.flyswat = new Flyswat(this);

        this.walkingArea = this.getWallkingArea();
        this.roomWalls = this.getRoomWalls();
        this.insects = [];
        this.cables = [];

        for (let i = 0; i < 1; i++) {
            this.spawnInsect();
        }

        this.spawnCables();
    }

    public update(): void {
        this.tick++;
        this.insects.forEach((insect) => {
            insect.update();
        });
        this.player.update();
        this.flyswat.update();
    }

    public spawnInsect(): void {
        this.insects.push(new Insect(this));
    }

    private spawnCables(): void {
        const walkingArea: AABB = this.getWallkingArea();
        function getWalkingAreaPoint(point: Point): Point {
            return new Point(
                point.x + walkingArea.x + 20,
                point.y + walkingArea.y,
            );
        }

        this.cables.push(
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(50, 200)),
                angle: 'horizontal',
                length: 110,
            }),
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(150, 200)),
                angle: 'horizontal',
                length: 110,
            }),
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(200, 150)),
                angle: 'vertical',
                length: 110,
            }),
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(250, 100)),
                angle: 'horizontal',
                length: 110,
            }),
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(350, 100)),
                angle: 'horizontal',
                length: 110,
            }),
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(450, 100)),
                angle: 'horizontal',
                length: 110,
            }),
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(550, 100)),
                angle: 'horizontal',
                length: 110,
            }),
        );

        this.cables.push(
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(350, 300)),
                angle: 'vertical',
                length: 110,
            }),
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(400, 250)),
                angle: 'horizontal',
                length: 110,
            }),
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(450, 200)),
                angle: 'vertical',
                length: 110,
            }),
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(450, 100)),
                angle: 'vertical',
                length: 110,
            }),
        );

        this.cables.push(
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(100, 100)),
                angle: 'vertical',
                length: 110,
            }),
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(100, 200)),
                angle: 'vertical',
                length: 110,
            }),
            new Cable({
                world: this,
                position: getWalkingAreaPoint(new Point(100, 300)),
                angle: 'vertical',
                length: 110,
            }),
        );
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
