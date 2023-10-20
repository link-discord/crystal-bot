import type { Event } from '../types/Event'

const event: Event = {
    name: 'entityHurt',
    async execute(bot, entity) {
        if (entity.type !== 'player' || entity.username !== bot.username) return

        bot.once('entityGone', (entity) => {
            const distance = bot.entity.position.distanceTo(entity.position)

            console.log(distance)

            if (entity.type !== 'projectile' || distance > 3.5) return

            const projectile = bot.state.shotProjectiles.get(entity.id)

            if (!projectile) return

            bot.emit('botAttacked', projectile.attacker)
            bot.state.shotProjectiles.delete(entity.id)
        })
    }
}

export default event
