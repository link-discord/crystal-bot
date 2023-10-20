import type { Event } from '../types/Event'
import type { Entity } from 'prismarine-entity'

const event: Event = {
    name: 'playerAttack',
    execute: (bot, entity: Entity) => {
        bot.chat(`I got hit by ${entity.username}`)
    }
}

export default event