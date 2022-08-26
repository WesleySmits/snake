import Food from './Food';
import GameLoop from './Loop';
import Snake from './Snake';
import { Observer } from './types/ObserverPattern';
import { getPropertyValue, randomCoordinate } from './utils';

export interface Coordinate {
    x: number;
    y: number;
}

export enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right'
}

export const styles = {
    gameFill: getPropertyValue('--game-background'),
    gameStroke: getPropertyValue('--game-border'),
    snakeFill: getPropertyValue('--snake-background'),
    snakeStroke: getPropertyValue('--snake-border'),
    foodFill: getPropertyValue('--food-background'),
    foodStroke: getPropertyValue('--food-border')
};

class Game implements Observer {
    public canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

    public context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    #score = 0;

    get score(): number {
        return this.#score;
    }

    set score(value: number) {
        this.#score = value;
        this.#scoreElement.innerText = this.score.toString();
        this.snake.onScore();
    }

    public snake = new Snake([
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 },
        { x: 170, y: 200 },
        { x: 160, y: 200 }
    ]);

    public food = new Food([randomCoordinate(0, this.canvas.width, this.canvas.height)]);

    public loop;

    #scoreElement = document.getElementById('score') as HTMLElement;

    constructor() {
        this.loop = GameLoop.getInstance();

        this.#setEventListeners();
        this.loop.attach(this);
    }

    public update(): void {
        if (this.#isEatingFood()) {
            this.#onScore();
        }
    }

    public gameOver(): void {
        GameLoop.destroyInstance();
        // eslint-disable-next-line no-alert
        alert('Game Over');
    }

    #isEatingFood(): boolean {
        const head = this.snake.coordinates[0];
        return head.x === this.food.coordinates[0].x && head.y === this.food.coordinates[0].y;
    }

    #onScore(): void {
        this.food.generate(this.canvas);
    }

    #setEventListeners(): void {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    if (this.loop.direction === Direction.Down) return;
                    this.loop.direction = Direction.Up;
                    break;
                case 'ArrowDown':
                    if (this.loop.direction === Direction.Up) break;
                    this.loop.direction = Direction.Down;
                    break;
                case 'ArrowLeft':
                    if (this.loop.direction === Direction.Right) break;
                    this.loop.direction = Direction.Left;
                    break;
                case 'ArrowRight':
                    if (this.loop.direction === Direction.Left) break;
                    this.loop.direction = Direction.Right;
                    break;
                default:
                    break;
            }
        });
    }
}

export const game = new Game();
