import type { CrystalBot } from '../types/CrystalBot'
import type { Command } from '../types/Command'
import { readdir } from 'fs/promises'
import { logger } from '../utils/logger'

export async function loadCommands(bot: CrystalBot) {
    logger.debug('Loading commands...')

    const commandFiles = await readdir('./src/commands')
    const commands = new Map()

    for (const file of commandFiles) {
        const command: Command = require(`../commands/${file}`).default
        commands.set(command.name, command)
        logger.debug(`Loaded command: ${command.name}`)
    }

    logger.debug(`Loaded ${commandFiles.length} commands.`)

    bot.commands = commands
}
