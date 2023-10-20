import chalk from 'chalk'

class Logger {
    enableDebug: boolean = false

    public info(message: unknown): void {
        console.log(chalk.blue('[INFO]'), message)
    }

    public error(message: string): void {
        console.log(chalk.red('[ERROR]'), message)
    }

    public warn(message: string): void {
        console.log(chalk.yellow('[WARN]'), message)
    }

    public debug(message: string): void {
        if (this.enableDebug) console.log(chalk.green('[DEBUG]'), message)
    }
}

const logger = new Logger()

export { logger }
