import type { Vec3 } from 'vec3'
import type { Entity } from 'prismarine-entity'

export interface ProjectileInfo {
    attacker: Entity
    lastUpdate: number
}