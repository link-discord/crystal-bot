import { Command } from '../types/Command'
import { logger } from '../utils/logger'
import { goals } from 'mineflayer-pathfinder'

const { GoalXZ, GoalNear, GoalY } = goals

const command: Command = {
    name: 'goto',
    execute(bot, username, args) {
        const [x, y, z] = args.map(Number)

        // check if the arguments are valid
        // also check if they are numbers

        if (args.length === 0) {
            bot.chat('Please specify coordinates.')
        } else if (args.length === 1) {
            if (isNaN(x)) {
                bot.chat('Please specify a valid number.')
                return
            }

            bot.pathfinder.setGoal(new GoalY(y))
            bot.chat(`Going to y level ${y}`)
            logger.debug(`Going to y level ${y}`)
        } else if (args.length === 2) {
            if (isNaN(x) || isNaN(z)) {
                bot.chat('Please specify valid numbers.')
                return
            }

            bot.pathfinder.setGoal(new GoalXZ(x, z))
            bot.chat(`Going to ${x} ${z}`)
            logger.debug(`Going to ${x} ${z}`)
        } else if (args.length === 3) {
            if (isNaN(x) || isNaN(y) || isNaN(z)) {
                bot.chat('Please specify valid numbers.')
                return
            }

            bot.pathfinder.setGoal(new GoalNear(x, y, z, 1))
            bot.chat(`Going to ${x} ${y} ${z}`)
            logger.debug(`Going to ${x} ${y} ${z}`)
        }
    }
}

export default command
