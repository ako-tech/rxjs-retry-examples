import { Observable, timer } from "rxjs";

type BackoffDelayFn = (error: any, retryCount: number) => Observable<number>;

export function exponentialBackOff(base: number): BackoffDelayFn {
    const factorToMs = 1000;
    return (_, retryCount) =>
        timer(Math.pow(base, retryCount - 1) * factorToMs);
}
