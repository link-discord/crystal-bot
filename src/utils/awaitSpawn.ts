import { Bot } from 'mineflayer'

export function awaitSpawn(bot: Bot) {
    return new Promise<void>((resolve) => {
        bot.once('spawn', resolve)
    })
}
