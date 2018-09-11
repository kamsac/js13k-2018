export default function drawImage(context: CanvasRenderingContext2D, image: HTMLCanvasElement, x: number, y: number, scale: number, rotation: number): void {
    context.setTransform(scale, 0, 0, scale, x, y);
    context.rotate(rotation);
    context.drawImage(image, -image.width / 2, -image.height / 2);
}
