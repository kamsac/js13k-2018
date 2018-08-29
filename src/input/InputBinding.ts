export default interface InputBinding {
    assignedKeys: string[];
    pressed: boolean | number;
    lastChange: number;
    actionName: string;
}
