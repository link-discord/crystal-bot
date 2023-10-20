import type { CrystalBot } from '../types/CrystalBot'
import type { Event } from '../types/Event'
import { readdir } from 'fs/promises'
import { logger } from '../utils/logger'

export async function loadEvents(bot: CrystalBot) {
    logger.debug('Loading events...')

    const eventFiles = await readdir('./src/events')
    const events = new Map()

    for (const file of eventFiles) {
        const event: Event = require(`../events/${file}`).default
        events.set(event.name, event)

        if (event.once) bot.once(event.name, (...args: any[]) => event.execute(bot, ...args))
        else bot.on(event.name, (...args: any[]) => event.execute(bot, ...args))

        logger.debug(`Loaded event: ${event.name}`)
    }

    logger.debug(`Loaded ${eventFiles.length} events.`)
}
