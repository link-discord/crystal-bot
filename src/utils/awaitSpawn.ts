import type { CrystalBot } from '../types/CrystalBot'

export function awaitSpawn(bot: CrystalBot) {
    return new Promise<void>((resolve) => {
        bot.once('spawn', resolve)
    })
}
