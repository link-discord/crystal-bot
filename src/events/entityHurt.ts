import type { Entity } from 'prismarine-entity'
import type { Event } from '../types/Event'

const event: Event = {
    name: 'entityHurt',
    async execute(bot, hurtEntity: Entity) {

        if (hurtEntity.type !== 'player') return

        bot.once('entityGone', (entity) => {
            const distance = hurtEntity.position.distanceTo(entity.position)

            if (entity.type !== 'projectile' || distance > 3.5) return

            const projectile = bot.state.shotProjectiles.get(entity.id)

            if (!projectile) return

            bot.emit('playerAttacked', hurtEntity, projectile.attacker)
            bot.state.shotProjectiles.delete(entity.id)
        })
    }
}

export default event
