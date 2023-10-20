import type { Bot } from 'mineflayer'
import type { Entity } from 'prismarine-entity'
import type { Command } from './Command'
import type { ProjectileInfo } from './ProjectileInfo'

declare module 'mineflayer' {
    interface BotEvents {
        playerAttack: (attacker: Entity) => Promise<void> | void
    }
}

export interface CrystalBot extends Bot {
    commands: Map<string, Command>
    state: {
        shotProjectiles: Map<number, ProjectileInfo>
        oldHealth: number
        tookDamage: boolean
    }
}