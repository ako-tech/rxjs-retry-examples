import { Observable, timer } from "rxjs";

interface BackoffConfig {
    base: number;
    retryCount: number;
}

export function exponentialBackOff({
    retryCount,
    base = 2,
}: BackoffConfig): Observable<number> {
    const factorToMs = 1000;
    return timer(Math.pow(base, retryCount - 1) * factorToMs);
}
