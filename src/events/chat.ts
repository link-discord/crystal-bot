import type { Event } from '../types/Event'
import { logger } from '../utils/logger'

const event: Event = {
    name: 'chat',
    execute(bot, username: string, message: string) {
        if (username === bot.username) return

        const prefix = 'c!'

        if (!message.startsWith(prefix)) return

        const args = message.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift()!.toLowerCase()

        const command = bot.commands.get(commandName)

        if (!command) return

        try {
            logger.debug(`${username} executed command: ${commandName}`)
            void command.execute(bot, username, args)
        } catch (error) {
            logger.error(`Error executing command: ${error}`)
        }
    }
}

export default event
