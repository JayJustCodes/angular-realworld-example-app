import { Injectable, isDevMode } from "@angular/core";
import { LogLevel } from "./../enums/log-level.enum";

@Injectable({
    providedIn: "root",
})
export class LoggingService {
    private logToConsole(message: string, data: any, level: LogLevel): void {
        const logMessage = `[${level}] ${message}`;
        switch (level) {
            case LogLevel.DEBUG:
                console.debug(logMessage, data);
                break;
            case LogLevel.INFO:
                console.info(logMessage, data);
                break;
            case LogLevel.WARN:
                console.warn(logMessage, data);
                break;
            case LogLevel.ERROR:
                console.error(logMessage, data);
                break;
            default:
                console.log(logMessage, data);
        }
    }

    log(message: string, data?: any, level: LogLevel = LogLevel.INFO): void {
        if (isDevMode()) {
            this.logToConsole(message, data, level);
        }
    }

    debug(message: string, data?: any): void {
        this.log(message, data, LogLevel.DEBUG);
    }

    info(message: string, data?: any): void {
        this.log(message, data, LogLevel.INFO);
    }

    warn(message: string, data?: any): void {
        this.log(message, data, LogLevel.WARN);
    }

    error(message: string, data?: any): void {
        this.log(message, data, LogLevel.ERROR);
    }
}
