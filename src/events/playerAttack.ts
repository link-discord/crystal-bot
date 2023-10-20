import type { Event } from '../types/Event'
import type { Entity } from 'prismarine-entity'
import { logger } from '../utils/logger'

const event: Event = {
    name: 'botAttacked',
    execute: async (bot, entity: Entity) => {
        logger.debug(`I got hit by ${entity.username || entity.displayName}`)

        const player = bot.players[entity.username!]

        if (player && player.gamemode === 1) return

        const sword = bot.inventory.items().find((item) => item.name.includes('sword'))
        const axe = bot.inventory.items().find((item) => item.name.includes('axe'))

        if (sword) await bot.equip(sword, 'hand')
        else if (axe) await bot.equip(axe, 'hand')
        else return

        void bot.swordpvp.attack(entity)
    }
}

export default event
