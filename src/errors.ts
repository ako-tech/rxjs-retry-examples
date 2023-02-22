export class NoConnectionError extends Error {
    message = "Not Connnected";
}
export class ServiceUnavailableError extends Error {
    message = "503 Service Unavailable";
}
