import type { Event } from '../types/Event'
import { logger } from '../utils/logger'
import { stop } from '../utils/stop'

const event: Event = {
    name: 'death',
    execute (bot) {
        logger.info('Bot has died.')
        stop(bot)
    }
}

export default event