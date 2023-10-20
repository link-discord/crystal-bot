import type { Bot } from 'mineflayer'
import type { Command } from './Command'
import type { ProjectileInfo } from './ProjectileInfo'

export interface CrystalBot extends Bot {
    commands: Map<string, Command>
    state: {
        shotProjectiles: Map<number, ProjectileInfo>
        oldHealth: number
        tookDamage: boolean
    }
}
