import type { Vec3 } from 'vec3'
import type { Entity } from 'prismarine-entity'

export interface ProjectileInfo {
    attacker: Entity
    lastPosition: Vec3
    lastUpdate: number
}