import { Bot } from 'mineflayer'

export function stop(bot: Bot) {
    bot.pathfinder.stop()
    bot.clearControlStates()
    bot.stopDigging()
    bot.deactivateItem()
}
