import { Coordinate } from './Game';

export function getPropertyValue(property: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(property);
}

export function randomCoordinate(min: number, maxWidth: number, maxHeight: number): Coordinate {
    return {
        x: Math.round((Math.random() * (maxWidth - min) + min) / 10) * 10,
        y: Math.round((Math.random() * (maxHeight - min) + min) / 10) * 10
    };
}
