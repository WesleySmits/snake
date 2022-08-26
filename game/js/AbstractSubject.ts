import { Observer, Subject } from './types/ObserverPattern';

abstract class AbstractSubject implements Subject {
    #observers: Observer[] = [];

    public get observers(): Observer[] {
        return this.#observers;
    }

    public attach(observer: Observer): void {
        if (this.#observers.includes(observer)) {
            return;
        }

        this.#observers.push(observer);
    }

    public detach(observer: Observer): void {
        this.#observers = this.#observers.filter((o) => o !== observer);
    }

    public notify(): void {
        for (const observer of this.#observers) {
            observer.update(this);
        }
    }
}

export default AbstractSubject;
