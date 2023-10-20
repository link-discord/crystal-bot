import { Bot } from 'mineflayer'

export function stop(bot: Bot) {
    bot.pathfinder.stop()
    bot.swordpvp.stop()
    bot.bowpvp.stop()
    bot.clearControlStates()
    bot.stopDigging()
    bot.deactivateItem()
}
