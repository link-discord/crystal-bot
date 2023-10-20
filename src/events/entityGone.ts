import type { Event } from '../types/Event'
import type { Entity } from 'prismarine-entity'

const event: Event = {
    name: 'entityGone',
    async execute(bot, entity: Entity) {
        if (entity.type !== 'projectile') return

        const projectile = bot.state.shotProjectiles.get(entity.id)

        if (!projectile) return

        await Bun.sleep(50)

        if (bot.state.tookDamage) bot.emit('playerAttack', projectile.attacker)

        bot.state.shotProjectiles.delete(entity.id)
    }
}

export default event
