import type { Entity } from 'prismarine-entity'
import type { Event } from '../types/Event'

const event: Event = {
    name: 'onCorrelateAttack',
    execute(bot, attacker: Entity, victim: Entity) {
        if (victim.type === 'player') {
            bot.emit('playerAttacked', victim, attacker)
        }
    }
}

export default event
