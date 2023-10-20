import type { Event } from '../types/Event'
import type { Entity } from 'prismarine-entity'

const event: Event = {
    name: 'entityMoved',
    async execute(bot, entity: Entity) {
        if (entity.type !== 'projectile') return

        const projectile = bot.state.shotProjectiles.get(entity.id)

        if (!projectile) return

        const timeSinceLastUpdate = Date.now() - projectile.lastUpdate
        const currentDistance = entity.position.distanceTo(bot.entity.position)
        const previousDistance = projectile.lastPosition.distanceTo(bot.entity.position)

        // if the distance got bigger we know the projectile is moving away from us
        // so we can remove it from the map because it doesn't matter anymore
        if (currentDistance > previousDistance) {
            setTimeout(() => {
                bot.state.shotProjectiles.delete(entity.id)
            }, 100)

            return
        } else if (timeSinceLastUpdate > 600) {
            // If the projectile hasn't moved in 600ms, we know its not moving anymore
            bot.state.shotProjectiles.delete(entity.id)
            return
        }

        bot.state.shotProjectiles.set(entity.id, {
            attacker: projectile.attacker,
            lastUpdate: Date.now(),
            lastPosition: entity.position.clone()
        })
    }
}

export default event
