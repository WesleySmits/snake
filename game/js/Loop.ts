import AbstractSubject from './AbstractSubject';
import { Direction, game, styles } from './Game';

export default class GameLoop extends AbstractSubject {
    #direction: Direction = Direction.Right;

    get direction(): Direction {
        return this.#direction;
    }

    set direction(value: Direction) {
        this.#direction = value;
    }

    static #timeout: number | null;

    static instance: GameLoop | undefined;

    public static getInstance(): GameLoop {
        if (!this.instance) {
            this.instance = new GameLoop();
            this.instance.#init();
        }

        return this.instance;
    }

    public static destroyInstance(): void {
        delete this.instance;

        if (!this.#timeout) {
            return;
        }

        window.clearInterval(this.#timeout);
    }

    #init(): void {
        GameLoop.#timeout = window.setInterval(this.#loop.bind(this), 100);
    }

    #loop(): void {
        this.#clearCanvas();
        this.notify();
    }

    #clearCanvas(): void {
        game.context.fillStyle = styles.gameFill;
        game.context.strokeStyle = styles.gameStroke;
        game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
        game.context.strokeRect(0, 0, game.canvas.width, game.canvas.height);
    }
}
