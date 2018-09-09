import Size from '../../helpers/Size';
import {canvasSize} from '../render/GameRenderer';
import MainCharacter from '../main-character/MainCharacter';
import AABB from '../../helpers/AABB';
import Flyswat from '../flyswat/Flyswat';
import Insect from '../insect/Insect';
import Cable from '../cable/Cable';
import Point from '../../helpers/Point';
import CableBuilder from '../cable/CableBuilder';
import Game from '../Game';
import Computer from "../cable/Computer";

export const worldSize: Size = canvasSize;

export default class World {
    public game: Game;
    public tick: number;
    public player: MainCharacter;
    public roomWalls: AABB[];
    public flyswat: Flyswat;
    public walkingArea: AABB;
    public insects: Insect[];
    public cables: Cable[];
    public computers: Computer[];
    public score: number;

    public constructor(game: Game) {
        this.game = game;
        this.tick = 0;
        this.player = new MainCharacter(this);
        this.flyswat = new Flyswat(this);

        this.walkingArea = this.getWallkingArea();
        this.roomWalls = this.getRoomWalls();
        this.insects = [];
        this.cables = [];
        this.computers = [];
        this.score = 0;

        for (let i = 0; i < 4; i++) {
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
        this.cables.forEach((cable) => {
            cable.update();
        });
    }

    public spawnInsect(): void {
        this.insects.push(new Insect(this));
    }

    private spawnCables(): void {
        const cableBuilder: CableBuilder = new CableBuilder(this);

        const cable1Computers: Computer[] = [
            new Computer(this, this.getWalkingAreaPoint(new Point(0, 200)), 'right'),
            new Computer(this, this.getWalkingAreaPoint(new Point(300, 0)), 'down'),
        ];
        const cable1: Cable[] = cableBuilder.createCables(
            [
                new Point(0, 200),
                new Point(50, 200),
                new Point(100, 200),
                new Point(100, 150),
                new Point(150, 150),
                new Point(150, 100),
                new Point(200, 100),
                new Point(250, 100),
                new Point(300, 100),
                new Point(300, 50),
                new Point(300, 0),
            ],
            cable1Computers,
        );

        const cable2Computers: Computer[] = [
            new Computer(this, this.getWalkingAreaPoint(new Point(200, 0)), 'down'),
            new Computer(this, this.getWalkingAreaPoint(new Point(300, 400)), 'up'),
        ];
        const cable2: Cable[] = cableBuilder.createCables(
            [
                new Point(200, 0),
                new Point(200, 50),
                new Point(200, 100),
                new Point(200, 150),
                new Point(200, 200),
                new Point(250, 200),
                new Point(250, 250),
                new Point(250, 300),
                new Point(250, 350),
                new Point(300, 350),
                new Point(300, 400),
            ],
            cable2Computers,
        );

        const cable3Computers: Computer[] = [
            new Computer(this, this.getWalkingAreaPoint(new Point(200, 400)), 'up'),
            new Computer(this, this.getWalkingAreaPoint(new Point(660, 150)), 'left'),
        ];
        const cable3: Cable[] = cableBuilder.createCables(
            [
                new Point(200, 400),
                new Point(200, 350),
                new Point(200, 300),
                new Point(250, 300),
                new Point(300, 300),
                new Point(350, 300),
                new Point(400, 300),
                new Point(400, 250),
                new Point(450, 250),
                new Point(450, 200),
                new Point(450, 150),
                new Point(500, 150),
                new Point(550, 150),
                new Point(600, 150),
                new Point(660, 150),
            ],
            cable3Computers,
        );

        const cable4Computers: Computer[] = [
            new Computer(this, this.getWalkingAreaPoint(new Point(600, 400)), 'up'),
            new Computer(this, this.getWalkingAreaPoint(new Point(0, 300)), 'right'),
        ];
        const cable4: Cable[] = cableBuilder.createCables(
            [
                new Point(600, 400),
                new Point(600, 350),
                new Point(550, 350),
                new Point(500, 350),
                new Point(450, 350),
                new Point(400, 350),
                new Point(350, 350),
                new Point(350, 300),
                new Point(350, 250),
                new Point(300, 250),
                new Point(250, 250),
                new Point(200, 250),
                new Point(150, 250),
                new Point(100, 250),
                new Point(100, 300),
                new Point(50, 300),
                new Point(0, 300),
            ],
            cable4Computers,
        );

        const cable5Computers: Computer[] = [
            new Computer(this, this.getWalkingAreaPoint(new Point(500, 0)), 'down'),
            new Computer(this, this.getWalkingAreaPoint(new Point(660, 250)), 'left'),
        ];
        const cable5: Cable[] = cableBuilder.createCables(
            [
                new Point(500, 0),
                new Point(500, 50),
                new Point(500, 100),
                new Point(500, 150),
                new Point(500, 200),
                new Point(500, 250),
                new Point(550, 250),
                new Point(600, 250),
                new Point(660, 250),
            ],
            cable5Computers,
        );

        this.cables.push(
            ...cable1,
            ...cable2,
            ...cable3,
            ...cable4,
            ...cable5
        );
        this.computers.push(
            ...cable1Computers,
            ...cable2Computers,
            ...cable3Computers,
            ...cable4Computers,
            ...cable5Computers
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

    private getWalkingAreaPoint(point: Point): Point {
        return new Point(
            point.x + this.walkingArea.x,
            point.y + this.walkingArea.y,
        );
    }
}

const wallDepth: number = 10;
const topMargin: number = 160;
const leftMargin: number = 60;
const rightMargin: number = 60;
const bottomMargin: number = 20;
