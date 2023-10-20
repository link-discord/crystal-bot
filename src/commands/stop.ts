import type { Command } from '../types/Command'
import { stop } from '../utils/stop'

const command: Command = {
    name: 'stop',
    execute(bot) {
        stop(bot)
        bot.chat('Stopped.')
    }
}

export default command