import type { CrystalBot } from './CrystalBot'

export interface Command {
    name: string
    execute: (
        bot: CrystalBot,
        username: string,
        args: string[]
    ) => Promise<void> | void
}
