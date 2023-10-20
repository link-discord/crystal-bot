import type { Bot } from 'mineflayer'
import type { Entity } from 'prismarine-entity'
import type { Item } from 'prismarine-item'

declare module 'mineflayer' {
    interface Bot {
        bloodhound: {
            yawCorrelationEnabled: boolean
        }
    }

    interface BotEvents {
        onCorrelateAttack: (attacker: Entity, victim: Entity, weapon: Item | null) => void
    }
}

interface BotEvent {
    entity: Entity
    time: number
    used: boolean
}

const maxMeleeDist: number = 6
const maxDeltaTime: number = 10
const maxDeltaYawPer: number = 10
const maxAgeCleanup: number = 20
const maxEventsSizeCleanup: number = 10

function inject(bot: Bot) {
    const lastHurts: BotEvent[] = []
    const lastAttacks: BotEvent[] = []

    bot.bloodhound = {
        yawCorrelationEnabled: true
    }

    function calculateAttackYaw(attacker: Entity, victim: Entity): number {
        let yaw: number = Math.atan2(
            victim.position.z - attacker.position.z,
            -(victim.position.x - attacker.position.x)
        )

        yaw += Math.PI / 2

        if (yaw < 0) yaw += 2 * Math.PI

        return yaw
    }

    function testAttackYaw(attacker: Entity, victim: Entity): boolean {
        const deltaAttackYawPer: number = Math.abs(
            ((calculateAttackYaw(attacker, victim) - attacker.yaw) / (2 * Math.PI)) * 100
        )

        return deltaAttackYawPer < maxDeltaYawPer
    }

    function cleanupEvents(events: BotEvent[]): void {
        const minTime: number = new Date().getTime() - maxAgeCleanup * 1000 // Calculate the minimum time in milliseconds

        for (let i: number = events.length - 1; i >= 0; i--) {
            if (events[i].time < minTime) {
                events.splice(i, 1)
            }
        }
    }

    function cleanUsedEvents(events: BotEvent[]): void {
        for (let i: number = events.length - 1; i >= 0; i--) {
            if (events[i].used) {
                events.splice(i, 1)
            }
        }
    }

    function correlateAttack(hurtIndex: number, attackIndex: number): void {
        const hurt: BotEvent = lastHurts[hurtIndex]
        const attack: BotEvent = lastAttacks[attackIndex]
        const deltaTime: number = Math.abs(hurt.time - attack.time)

        if (deltaTime > maxDeltaTime) return

        const meleeDist: number = hurt.entity.position.distanceTo(attack.entity.position)

        if (meleeDist > maxMeleeDist) return

        const weapon: Item = attack.entity.heldItem

        if (
            bot.bloodhound.yawCorrelationEnabled === true &&
            testAttackYaw(attack.entity, hurt.entity)
        ) {
            bot.emit('onCorrelateAttack', attack.entity, hurt.entity, weapon)
            lastHurts[hurtIndex].used = true
            lastAttacks[attackIndex].used = true
        } else {
            bot.emit('onCorrelateAttack', attack.entity, hurt.entity, weapon)
            lastHurts[hurtIndex].used = true
            lastAttacks[attackIndex].used = true
        }
    }

    function correlateAttacks(): void {
        if (lastHurts.length > maxEventsSizeCleanup) cleanupEvents(lastHurts)
        if (lastAttacks.length > maxEventsSizeCleanup) cleanupEvents(lastAttacks)
        if (lastHurts.length === 0 || lastAttacks.length === 0) return

        for (let hurtIndex: number = 0; hurtIndex < lastHurts.length; hurtIndex++) {
            if (lastHurts[hurtIndex].used) continue

            for (let attackIndex: number = 0; attackIndex < lastAttacks.length; attackIndex++) {
                if (lastAttacks[attackIndex].used) continue

                correlateAttack(hurtIndex, attackIndex)
            }
        }

        cleanUsedEvents(lastHurts)
        cleanUsedEvents(lastAttacks)
    }

    function makeEvent(entity: Entity, time: number): BotEvent {
        return { entity, time, used: false }
    }

    bot.on('entityHurt', function (entity) {
        const time = new Date().getTime()
        lastHurts.push(makeEvent(entity, time))
        correlateAttacks()
    })

    bot.on('entitySwingArm', function (entity) {
        const time = new Date().getTime()
        lastAttacks.push(makeEvent(entity, time))
        correlateAttacks()
    })
}

export default inject
