import type { Event } from '../types/Event'
import type { Entity } from 'prismarine-entity'

const event: Event = {
    name: 'entitySpawn',
    async execute(bot, entity: Entity) {
        // check if the entity is a projectile like an arrow and see from who it was shot from
        // we get the closest player to the entity and check who shot the arrow
        if (entity.type !== 'projectile') return

        // go through bot.entites and sort by closest distance to the entity
        const closestPlayer = Object.values(bot.entities)
            .filter((e) => e.type === 'player')
            .sort((a, b) => {
                const distanceA = a.position.distanceTo(entity.position)
                const distanceB = b.position.distanceTo(entity.position)

                return distanceA - distanceB
            })[0]

        // If we can't find the closest player, return
        if (closestPlayer == undefined || !closestPlayer.username) return

        // Add the projectile to the map
        bot.state.shotProjectiles.set(entity.id, {
            username: closestPlayer.username,
            lastUpdate: Date.now(),
            lastPosition: entity.position
        })
    }
}

export default event
