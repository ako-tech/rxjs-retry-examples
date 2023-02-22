import { Observable, timer } from "rxjs";

type BackoffDelayFn = (error: any, retryCount: number) => Observable<number>;

interface BackoffConfig {
    initialOffset: number;
    base: number;
}

export function exponentialBackOff({
    initialOffset = 1000,
    base = 2,
}: BackoffConfig): BackoffDelayFn {
    return (_, retryCount) =>
        timer(initialOffset * Math.pow(base, retryCount - 1));
}
