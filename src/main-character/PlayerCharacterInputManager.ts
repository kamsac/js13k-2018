import GameInput from '../input/GameInput';
import Locator from '../Locator';
import MainCharacter from './MainCharacter';
import {GameState} from '../Game';

export default class PlayerCharacterInputManager {
    private gameInput: GameInput = Locator.getGameInput();

    public update(character: MainCharacter): void {
        if (character.world.game.state !== GameState.Gameplay) {
            return;
        }

        if (this.gameInput.bindings.attack.pressed) {
            character.attack();
        }

        if (character.isInMidAir()) {
            return;
        }

        if (this.gameInput.bindings.moveUp.pressed) {
            character.moveUp();
        }
        if (this.gameInput.bindings.moveDown.pressed) {
            character.moveDown();
        }
        if (this.gameInput.bindings.moveLeft.pressed) {
            character.moveLeft();
        }
        if (this.gameInput.bindings.moveRight.pressed) {
            character.moveRight();
        }

        if (this.gameInput.bindings.jump.pressed) {
            character.jump();
        }
    }
}
