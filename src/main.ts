import { retry, throwError, timer } from "rxjs";
import { exponentialBackOff } from "./backoff.retry";
import { NoConnectionError, ServiceUnavailableError } from "./errors";
import { getSomething, whenBackOnline } from "./request";
import "./style.css";

getSomething()
    .pipe(
        retry({
            delay: (error) =>
                error instanceof NoConnectionError
                    ? whenBackOnline()
                    : throwError(() => error),
        }),
        retry({
            count: 4,
            delay: (error, retryCount) =>
                error instanceof ServiceUnavailableError
                    ? exponentialBackOff({ retryCount, base: 2 })
                    : throwError(() => error),
        })
    )
    .subscribe(console.log);
