import type { Event } from '../types/Event'

const event: Event = {
    name: 'health',
    execute(bot) {
        bot.state.tookDamage = bot.health < bot.state.oldHealth

        setTimeout(() => {
            if (bot.state.tookDamage) bot.state.tookDamage = false
        }, 100)

        bot.state.oldHealth = bot.health

        if (!bot.state.tookDamage) return

        // check if there is a trident nearby and check who it is from
        // since tridents don't despawn this is an edge case scenario and has to be accounted for
        const trident = Object.values(bot.entities).filter(
            (e) => e.type === 'projectile' && e.name === 'trident'
        )

        if (trident.length === 0) return

        for (const entity of trident) {
            const projectile = bot.state.shotProjectiles.get(entity.id)

            if (!projectile) return

            const archer = projectile.username
            const pn = entity.displayName

            return bot.chat(`I got hit by ${archer}'s ${pn}.`)
        }
    }
}

export default event
