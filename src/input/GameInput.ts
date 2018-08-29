import AllInputBindings from './AllInputBindings';

export default interface GameInput {
    readonly bindings: AllInputBindings;
    update: () => void;
}
