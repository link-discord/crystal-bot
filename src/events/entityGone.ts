import type { Event } from '../types/Event'
import type { Entity } from 'prismarine-entity'
import { stop } from '../utils/stop'

const event: Event = {
    name: 'entityGone',
    execute(bot, entity: Entity) {
        const target = bot.swordpvp.target
        
        if (target && target.id === entity.id) stop(bot)
    }
}

export default event
