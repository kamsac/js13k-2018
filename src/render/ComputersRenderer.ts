import World from '../world/World';
import AABB from '../../helpers/AABB';
import Sprites from '../sprites/Sprites';
import Size from '../../helpers/Size';
import Computer from '../cable/Computer';

export default class ComputersRenderer {
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public render(world: World): void {
        world.computers.forEach((computer) => {
            const computerAABB: AABB = computer.getAABB({roundPositions: true});
            const computerDirection: 'vertical' | 'horizontal' = (
                computer.facingDirection === 'left' || computer.facingDirection === 'right'
            ) ? 'vertical' : 'horizontal';
            this.context.drawImage(
                Sprites.computer[computerDirection],
                (computer.position.x - spriteSize.width/2),
                (computer.position.y - spriteSize.height + computerAABB.height/2),
                (spriteSize.width),
                (spriteSize.height),
            );

            this.drawStatusLight(computer);
        });
    }

    private drawStatusLight(computer: Computer): void {
        const isBlinking: boolean = (computer.world.tick / 5) % 2 === 0 && Math.random() < 0.3;
        this.context.fillStyle = computer.isConnected
            ? isBlinking
                ? 'black'
                : 'lime'
            : 'red';
        this.context.fillRect(
            computer.position.x - statusLightSize/2,
            computer.position.y - statusLightSize/2 - 10,
            statusLightSize,
            statusLightSize,
        );
    }
}

const spriteSize: Size = {
    width: 42,
    height: 42,
};

const statusLightSize: number = 5;