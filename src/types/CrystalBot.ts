import type { Bot } from 'mineflayer'
import type { Command } from './Command'

export interface CrystalBot extends Bot {
    commands: Map<string, Command>
    state: {
        owner: string
    }
}