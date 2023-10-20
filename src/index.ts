import type { CrystalBot } from './types/CrystalBot'
import { createBot } from 'mineflayer'
import { awaitSpawn } from './utils/awaitSpawn'
import { loadCommands } from './loaders/commands'
import { loadEvents } from './loaders/events'
import { logger } from './utils/logger'

// Will print any debug messages, otherwise they will be hidden
logger.enableDebug = true

// variables for the reconnecting system
const maxTries = 5
let tries = 0

async function run() {
    console.clear()

    const bot = createBot({
        username: 'CrystalBot',
        host: '172.28.112.1',
        port: 25565,
        auth: 'offline'
    }) as CrystalBot

    bot.loadPlugin(require('mineflayer-pathfinder').pathfinder)
    bot.loadPlugin(require('mineflayer-auto-eat').plugin)
    bot.loadPlugin(require('mineflayer-armor-manager'))

    bot.commands = new Map()
    bot.state = {
        shotProjectiles: new Map(),
        oldHealth: 0,
        tookDamage: false
    }

    // We need to add this event before loading commands and events
    // So this event isnt gonna be in the events folder
    bot.on('end', (reason) => {
        logger.warn(`Bot disconnected: ${reason}`)

        if (tries >= maxTries) {
            logger.error('Max tries reached. Exiting...')
            process.exit(1)
        }

        logger.info(`Reconnecting in 5 seconds... (${++tries}/${maxTries})`)
        setTimeout(run, 5000)
    })

    logger.info('Waiting for bot to spawn...')

    await awaitSpawn(bot)
    await loadCommands(bot)
    await loadEvents(bot)

    bot.state.oldHealth = bot.health

    logger.info('Bot is ready!')
}

void run()
