import type { Event } from '../types/Event'
import type { Entity } from 'prismarine-entity'

const event: Event = {
    name: 'entityGone',
    async execute(bot, entity: Entity) {
        if (entity.type !== 'projectile') return

        const projectile = bot.state.shotProjectiles.get(entity.id)

        if (!projectile) return

        const pn = entity.displayName
        const archer = projectile.username

        await bot.waitForTicks(1)

        if (bot.state.tookDamage) { 
            bot.emit('playerAttack', entity)
            bot.chat(`I got hit by ${archer}'s ${pn}`) 
        }

        bot.state.shotProjectiles.delete(entity.id)
    }
}

export default event