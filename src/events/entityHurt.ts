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

        // check if there is a projectile nearby and sort them by distance
        const nearbyProjectiles = Object.values(bot.entities)
            .filter((entity) => entity.type === 'projectile')
            .filter((entity) => entity.position.distanceTo(hurtEntity.position) < 3.5)
            .sort(
                (a, b) => {
                    const distanceA = a.position.distanceTo(hurtEntity.position)
                    const distanceB = b.position.distanceTo(hurtEntity.position)

                    return distanceA - distanceB
                }
            )

        if (nearbyProjectiles.length) {
            const projectile = nearbyProjectiles[0]
            const projectileInfo = bot.state.shotProjectiles.get(projectile.id)

            if (!projectileInfo) return

            bot.emit('playerAttacked', hurtEntity, projectileInfo.attacker)
            bot.state.shotProjectiles.delete(projectile.id)
        }
    }
}

export default event
