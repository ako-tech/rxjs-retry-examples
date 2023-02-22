import { tap, timer } from "rxjs";
import "./style.css";

const source = timer(0, 1000).pipe(
    tap((count) => {
        if (count === 3) {
            throw new Error("La cuenta ha llegado a 3");
        }
    }),
    tap({
        subscribe: () => console.log("Se produce la subscripcion"),
        error: () => console.log("Se lanza el error"),
    })
);
