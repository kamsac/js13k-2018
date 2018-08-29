import InputBinding from './InputBinding';

export default interface AllInputBindings {
    [actionNameHax: string]: InputBinding;
    moveUp: InputBinding;
    moveDown: InputBinding;
    moveLeft: InputBinding;
    moveRight: InputBinding;
    jump: InputBinding;
    attack: InputBinding;
}
