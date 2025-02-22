export class Logger {
    private static prefix = "[EducApp]";

    static info(message: string, ...args: any[]): void {
        console.log(`${this.prefix} INFO: ${message}`, ...args);
    }

    static warn(message: string, ...args: any[]): void {
        console.warn(`${this.prefix} WARN: ${message}`, ...args);
    }

    static error(message: string, error?: Error, ...args: any[]): void {
        console.error(`${this.prefix} ERROR: ${message}`, error || "", ...args);
    }
}

export default Logger;