import InputBinding from './InputBinding';

export default interface AllInputBindings {
    [actionNameHax: string]: InputBinding;
    moveForward: InputBinding;
    moveBackward: InputBinding;
    strafeLeft: InputBinding;
    strafeRight: InputBinding;
    rotateLeft: InputBinding;
    rotateRight: InputBinding;
    shoot: InputBinding;
}
