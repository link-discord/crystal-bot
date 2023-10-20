import type { CrystalBot } from './types/CrystalBot'
import { createBot } from 'mineflayer'
import { awaitSpawn } from './utils/awaitSpawn'
import { loadCommands } from './loaders/commands'
import { loadEvents } from './loaders/events'
import { logger } from './utils/logger'
import { plugin } from 'mineflayer-auto-eat'
import { pathfinder } from 'mineflayer-pathfinder'
import bloodHound from './bloodHound'
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
        username: 'CrystalBot',
        host: Bun.env.MC_HOST,
        port: Number(Bun.env.MC_PORT),
        auth: 'offline'
    }) as unknown as CrystalBot

    bot.loadPlugin(bloodHound)
    bot.loadPlugin(pvp)
    bot.loadPlugin(pathfinder)
    bot.loadPlugin(autoEat)
    bot.loadPlugin(armorManager)

    bot.commands = new Map()
    bot.state = { 
        shotProjectiles: new Map(), 
        owner: Bun.env.MC_OWNER as string
    }

    // for whatever reason mineflayer doesn't fire the entityHurt event properly anymore
    // so this code is gonna be a workaround for that
    bot._client.on('damage_event', (packet) => {
        const entity = bot.entities[packet.entityId]

        if (!entity) return

        bot.emit('entityHurt', entity)
    })

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
