import type { Event } from '../types/Event'
import type { Entity } from 'prismarine-entity'

const event: Event = {
    name: 'entityMoved',
    async execute(bot, entity: Entity) {
        if (entity.type !== 'projectile') return

        const projectile = bot.state.shotProjectiles.get(entity.id)

        if (!projectile) return

        const timeSinceLastUpdate = Date.now() - projectile.lastUpdate

        if (timeSinceLastUpdate > 600) {
            // If the projectile hasn't moved in 600ms, we know its not moving anymore
            bot.state.shotProjectiles.delete(entity.id)
            return
        }

        bot.state.shotProjectiles.set(entity.id, {
            attacker: projectile.attacker,
            lastUpdate: Date.now()
        })
    }
}

export default event
