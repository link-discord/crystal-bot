import type { Entity } from 'prismarine-entity'
import type { Item } from 'prismarine-item'
import type { Event } from '../types/Event'
import { logger } from '../utils/logger'

const event: Event = {
    name: 'entityAttack',
    execute: async (bot, victim: Entity, attacker: Entity, weapon: Item | null) => {
        const protectedTargets = [bot.username, bot.state.owner]
        const attackerName = attacker.username ?? attacker.displayName
        const victimName = victim.username ?? victim.displayName

        if (attacker.username && protectedTargets.includes(attacker.username)) return
        else if (victim.type !== 'player') return
        else if (!protectedTargets.includes(victim.username as string)) return

        if (!weapon) logger.debug(`${attackerName} attacked ${victimName}!`)
        else logger.debug(`${attackerName} attacked ${victimName} with ${weapon.displayName}!`)

        const player = bot.players[attacker.username!]

        if (player && player.gamemode === 1) return

        const sword = bot.inventory.items().find((item) => item.name.includes('sword'))
        const axe = bot.inventory.items().find((item) => item.name.includes('axe'))

        if (sword) await bot.equip(sword, 'hand')
        else if (axe) await bot.equip(axe, 'hand')
        else return

        void bot.swordpvp.attack(attacker)
    }
}

export default event
