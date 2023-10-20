import type { Entity } from 'prismarine-entity'
import type { Event } from '../types/Event'
import { logger } from '../utils/logger'

const event: Event = {
    name: 'onCorrelateAttack',
    execute(bot, attacker: Entity, victim: Entity) {
        logger.debug(`Someone got attacked`)
        
        if (victim.type === 'player' && victim.username === bot.username) {
            bot.emit('botAttacked', attacker)
        }
    }
}

export default event
