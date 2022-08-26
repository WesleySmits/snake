import { Coordinate, Direction, game, styles } from './Game';
import GameObject from './GameObject';
import GameLoop from './Loop';

export default class Snake extends GameObject {
    #velocity = 10;

    get velocity(): number {
        return this.#velocity;
    }

    set velocity(value: number) {
        this.#velocity = value;
    }

    constructor(coordinates: Array<Coordinate>) {
        super(coordinates);

        this.fillColor = styles.snakeFill;
        this.strokeColor = styles.snakeStroke;

        this.loop.attach(this);
    }

    public move(direction: Direction): void {
        const head = this.coordinates[0];
        const newHead = {
            x: head.x,
            y: head.y
        };

        switch (direction) {
            case Direction.Right:
                newHead.x += this.velocity;
                break;
            case Direction.Left:
                newHead.x -= this.velocity;
                break;
            case Direction.Up:
                newHead.y -= this.velocity;
                break;
            case Direction.Down:
                newHead.y += this.velocity;
                break;
            default:
                break;
        }

        this.coordinates.unshift(newHead);
        this.coordinates.pop();
    }

    public draw(context: CanvasRenderingContext2D): void {
        this.coordinates.forEach((coordinate) => {
            context.fillStyle = this.fillColor;
            context.strokeStyle = this.strokeColor;

            context.fillRect(coordinate.x, coordinate.y, 10, 10);
            context.strokeRect(coordinate.x, coordinate.y, 10, 10);
        });
    }

    public checkCollision(width: number, height: number): boolean {
        return this.#isEatingItself() || this.#isEatingWall(width, height);
    }

    public update(subject: GameLoop): void {
        this.move(subject.direction);
        this.draw(game.context);

        if (this.checkCollision(game.canvas.width, game.canvas.height)) {
            game.gameOver();
        }
    }

    onScore(): void {
        this.coordinates.push({
            x: this.coordinates[this.coordinates.length - 1].x,
            y: this.coordinates[this.coordinates.length - 1].y
        });
    }

    #isEatingItself(): boolean {
        const head = this.coordinates[0];
        return this.coordinates
            .slice(1)
            .some((coordinate) => coordinate.x === head.x && coordinate.y === head.y);
    }

    #isEatingWall(width: number, height: number): boolean {
        const head = this.coordinates[0];
        return head.x < 0 || head.x > width || head.y < 0 || head.y > height;
    }
}
