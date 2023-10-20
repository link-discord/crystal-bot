import type { Bot } from 'mineflayer'
import type { Item } from 'prismarine-item'
import type { Entity } from 'prismarine-entity'
import type { Command } from './Command'
import type { ProjectileInfo } from './ProjectileInfo'

declare module 'mineflayer' {
    interface BotEvents {
        playerAttacked: (victim: Entity, attacker: Entity) => Promise<void> | void
    }
}

export interface CrystalBot extends Bot {
    commands: Map<string, Command>
    state: {
        shotProjectiles: Map<number, ProjectileInfo>
        owner: string
    }
}