import type { Command } from '../types/Command'
import type { EquipmentDestination } from 'mineflayer'

const EquipmentDestinations = ['hand', 'head', 'torso', 'legs', 'feet', 'off-hand']

const command: Command = {
    name: 'equip',
    execute(bot, username, args) {
        if (!args[0] || args[0] === 'armor') {
            // @ts-ignore
            bot.armorManager.equipAll()
        } else if (args[0]) {
            const item = bot.inventory.items().find((item) => item.name === args[0])

            if (!item) {
                bot.chat('Item not found.')
                return
            }

            // check if args[1] is a valid EquipmentDestination

            if (args[1] && !EquipmentDestinations.includes(args[1])) {
                bot.chat('Invalid equipment destination.')
                return
            }

            if (args[1]) void bot.equip(item, args[1] as EquipmentDestination)
            else void bot.equip(item, 'hand')
        }
    }
}

export default command
