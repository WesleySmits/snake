/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import { Coordinate, game, styles } from './Game';
import GameObject from './GameObject';
import { randomCoordinate } from './utils';

export default class Food extends GameObject {
    constructor(coordinates: Array<Coordinate>) {
        super(coordinates);
        this.loop.attach(this);
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = styles.foodFill;
        context.strokeStyle = styles.foodStroke;
        context.fillRect(this.coordinates[0].x, this.coordinates[0].y, 10, 10);
        context.strokeRect(this.coordinates[0].x, this.coordinates[0].y, 10, 10);
    }

    public generate(canvas: HTMLCanvasElement): void {
        this.coordinates[0] = randomCoordinate(0, canvas.width, canvas.height);
    }

    public update(): void {
        this.draw(game.context);
    }
}
