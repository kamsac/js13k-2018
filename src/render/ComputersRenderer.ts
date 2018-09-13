import World from '../world/World';
import AABB from '../helpers/AABB';
import Sprites from '../sprites/Sprites';
import Computer from '../cable/Computer';
import {ComputerSpriteIndex} from '../sprites/computerSprites';
import SimpleAngle from "../helpers/SimpleAngle";

export default class ComputersRenderer {
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        world.computers.forEach((computer) => {
            const computerAABB: AABB = computer.getAABB({roundPositions: true});
            const computerAngle: SimpleAngle = (
                computer.facingDirection === 'left' || computer.facingDirection === 'right'
            ) ? 'vertical' : 'horizontal';

            const isBlinking: boolean = (computer.world.tick / 5) % 2 === 0 && Math.random() < 0.3;
            const computerSpriteIndex: number = computer.isConnected
                ? isBlinking
                    ? ComputerSpriteIndex.Off
                    : ComputerSpriteIndex.Green
                : ComputerSpriteIndex.Red;

            this.context.drawImage(
                Sprites.computer[computerAngle][computerSpriteIndex],
                (computer.position.x - spriteRenderSizeByAngle[computerAngle].width/2),
                (computer.position.y - spriteRenderSizeByAngle[computerAngle].height + computerAABB.height/2),
                spriteRenderSizeByAngle[computerAngle].width,
                spriteRenderSizeByAngle[computerAngle].height,
            );

            this.drawStatusLight(computer, computerAngle, isBlinking);
        });
    }

    private drawStatusLight(computer: Computer, angle: SimpleAngle, isBlinking: boolean): void {
        const lightColor = computer.isConnected
            ? isBlinking
                ? 'transparent'
                : 'rgba(0,255,0,0.2)'
            : 'rgba(255, 0,0,0.2)';
        const gradient: CanvasGradient = this.context.createRadialGradient(
            computer.position.x,
            computer.position.y + statusLightSpriteYOffsetByAngle[angle],
            1,
            computer.position.x,
            computer.position.y + statusLightSpriteYOffsetByAngle[angle],
            statusLightSize,
        );
        gradient.addColorStop(0, lightColor);
        gradient.addColorStop(1, 'transparent');
        this.context.fillStyle = gradient;
        this.context.fillRect(
            computer.position.x - statusLightSize,
            computer.position.y - statusLightSize + statusLightSpriteYOffsetByAngle[angle],
            statusLightSize * 2,
            statusLightSize * 2,
        );
    }
}

const spriteRenderSizeByAngle = {
    horizontal: {
        width: 40,
        height: 24,
    },
    vertical: {
        width: 16,
        height: 46,
    }
};

const statusLightSize: number = 50;
const statusLightSpriteYOffsetByAngle = {
    horizontal: -5,
    vertical: -15,
}
