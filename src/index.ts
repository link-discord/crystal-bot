import type { CrystalBot } from './types/CrystalBot'
import { createBot } from 'mineflayer'
import { awaitSpawn } from './utils/awaitSpawn'
import { loadCommands } from './loaders/commands'
import { loadEvents } from './loaders/events'
import { logger } from './utils/logger'
import { plugin } from 'mineflayer-auto-eat'
import { pathfinder } from 'mineflayer-pathfinder'
import { bloodhound } from '@miner-org/bloodhound'
import armorManager from 'mineflayer-armor-manager'
import pvp from '@nxg-org/mineflayer-custom-pvp'

const autoEat = plugin

// Will print any debug messages, otherwise they will be hidden
logger.enableDebug = true

// variables for the reconnecting system
const maxTries = 5
let tries = 0

async function run() {
    console.clear()

    const bot = createBot({
        username: Bun.env.MC_USERNAME as string,
        host: Bun.env.MC_HOST,
        port: Number(Bun.env.MC_PORT),
        auth: Bun.env.MC_AUTH as any,
        version: Bun.env.MC_VERSION,
    }) as unknown as CrystalBot

    bot.loadPlugin(bloodhound)
    bot.loadPlugin(pvp)
    bot.loadPlugin(pathfinder)
    bot.loadPlugin(autoEat)
    bot.loadPlugin(armorManager)

    bot.commands = new Map()
    bot.state = { owner: Bun.env.MC_OWNER as string }

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

    logger.info('Bot is ready!')
}

void run()
