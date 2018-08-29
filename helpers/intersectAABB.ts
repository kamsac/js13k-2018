import AABB from './AABB';

export default function intersectAABB(box1: AABB, box2: AABB): boolean {
    return (
        box1.x < box2.x + box2.width &&
        box1.x + box1.width > box2.x &&
        box1.y < box2.y + box2.height &&
        box1.height + box1.y > box2.y
    );
}
