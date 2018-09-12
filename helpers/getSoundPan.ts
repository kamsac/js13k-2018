import Point from './Point';
import {worldSize} from '../src/world/World';

export default function getSoundPan(position: Point): number {
    return (position.x / worldSize.width) * 2 - 1;
}
