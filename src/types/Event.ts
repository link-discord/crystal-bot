import type { CrystalBot } from './CrystalBot'
import type { BotEvents } from 'mineflayer'

export interface Event {
    name: keyof BotEvents
    once?: boolean
    execute: (bot: CrystalBot, ...args: any[]) => Promise<void> | void
}
