import { delay, Observable, of, tap, timer } from "rxjs";
import { NoConnectionError, ServiceUnavailableError } from "./errors";

interface Response {
    data: any;
}

let lastRequestTime = Date.now();
const formatter = new Intl.NumberFormat("es-ES", {
    style: "unit",
    unit: "millisecond",
});

let online = false;

export function getSomething(): Observable<Response> {
    return of({ data: "something" }).pipe(
        delay(100),
        tap(() => {
            if (online === false) {
                throw new ServiceUnavailableError();
            }
        }),
        tap({
            subscribe: () => {
                const elapsedTime = formatter.format(
                    Date.now() - lastRequestTime
                );
                console.log(
                    `Iniciando peticion (ultima: hace ${elapsedTime}) `
                );
            },
            error: () => (lastRequestTime = Date.now()),
        })
    );
}

export function whenBackOnline(): Observable<any> {
    return timer(5000).pipe(
        tap(() => {
            online = true;
            console.log("back online");
        })
    );
}
