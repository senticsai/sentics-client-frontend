import React from 'react'
import { degToRad } from 'three/src/math/MathUtils'
import Human2D from './models/Human2D'
import Human3D from './models/Human3D'
import Vehicle2D from './models/Vehicle2D'
import Vehicle3D from './models/Vehicle3D'

function Positions({ entities, perspective }: { entities: EntitiesPayload; perspective: '2d' | '3d' }) {
  const entitiesArray: NewPosition[] = []

  for (const kind in entities) {
    for (const id in entities[kind]) {
      const entity = entities[kind][id]
      entitiesArray.push({
        kind,
        id,
        x: entity.x,
        y: entity.y,
        heading: entity.heading,
        t: entity.t
      })
    }
  }

  return (
    <>
      {entitiesArray.map(position => {
        if (position.kind === 'human') {
          return (
            <mesh position={[position.x, position.y, -0.4]} key={position.kind + position.id}>
              {perspective === '2d' ? <Human2D rotation={[0, 0, Math.PI / 2]} /> : <Human3D />}
            </mesh>
          )
        } else
          return (
            <mesh position={[position.x, position.y, 0]} key={position.kind + position.id}>
              {perspective === '2d' ? (
                <Vehicle2D rotation={[0, 0, degToRad(90)]} />
              ) : (
                <Vehicle3D rotation={[degToRad(270), degToRad(270), 0]} scale={0.004} />
              )}
            </mesh>
          )
      })}
    </>
  )
}

export default Positions
