import { Coordinate } from './Game';
import GameLoop from './Loop';
import { Observer, Subject } from './types/ObserverPattern';

export default abstract class GameObject implements Observer {
    #coordinates: Array<Coordinate> = [];

    get coordinates(): Array<Coordinate> {
        return this.#coordinates;
    }

    set coordinates(value: Array<Coordinate>) {
        this.#coordinates = value;
    }

    #fillColor = '#ff0000';

    get fillColor(): string {
        return this.#fillColor;
    }

    set fillColor(value: string) {
        this.#fillColor = value;
    }

    #strokeColor = '#000000';

    get strokeColor(): string {
        return this.#strokeColor;
    }

    set strokeColor(value: string) {
        this.#strokeColor = value;
    }

    get loop(): GameLoop {
        return GameLoop.getInstance();
    }

    constructor(coordinates: Array<Coordinate>) {
        this.coordinates = coordinates;
    }

    abstract update(subject: Subject): void;

    abstract draw(context: CanvasRenderingContext2D): void;
}
