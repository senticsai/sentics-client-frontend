import { DoubleSide, Shape } from 'three'
import React from 'react'
import Entities from './entities'
import { getSize } from '../../helpers/getSize'

// TODO get this from api in the future
const mapPoints = [
  [1.42, 0.0],
  [1.42, 53.6],
  [0.0, 54.97],
  [0.0, 75.16],
  [-1.53, 75.16],
  [-1.53, 83.46],
  [26.22, 55.49],
  [26.22, 0.0],
  [10.69, 0.0],
  [10.69, 1.037],
  [4.85, 1.037],
  [4.85, 0.0],
  [1.42, 0.0]
]

function Map({ entities, perspective }: { entities: EntitiesPayload; perspective: '2d' | '3d' }) {
  const shape = new Shape()

  mapPoints.reverse()

  mapPoints.forEach((point, index) => {
    if (index === 0) {
      shape.moveTo(point[0], point[1])
    } else {
      shape.lineTo(point[0], point[1])
    }
  })

  const extrudeSettings = {
    curveSegments: 1,
    steps: 1,
    depth: 0.5,
    bevelEnabled: false
  }

  const [x, y] = getSize(mapPoints)

  return (
    <>
      {/* Reference for coordinate
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color='#ff0000' />
      </mesh>
       */}
      <mesh position={[-x / 2, 0, -y / 2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <extrudeBufferGeometry attach='geometry' args={[shape, extrudeSettings]} />
          <meshStandardMaterial side={DoubleSide} />
        </mesh>
        <Entities entities={entities} />
      </mesh>
    </>
  )
}

export default Map
