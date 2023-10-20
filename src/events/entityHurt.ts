import type { Event } from '../types/Event'
import type { Entity } from 'prismarine-entity'
import { stop } from '../utils/stop'

const event: Event = {
    name: 'entityHurt',
    async execute(bot, entity: Entity) {
        if (
            entity.type === 'player' &&
            bot.swordpvp.target &&
            bot.swordpvp.target.username === entity.username
        )
            stop(bot)

        if (entity.type !== 'projectile') return

        const projectile = bot.state.shotProjectiles.get(entity.id)

        if (!projectile) return

        await Bun.sleep(50)

        bot.emit('botAttacked', projectile.attacker)
        bot.state.shotProjectiles.delete(entity.id)
    }
}

export default event
