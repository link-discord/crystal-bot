import type { Command } from '../types/Command'

const command: Command = {
    name: 'equip',
    execute(bot, username, args) {
        if (args[0] === 'armor') {
            // @ts-ignore
            bot.armorManager.equipAll()
        }
    }
}

export default command
