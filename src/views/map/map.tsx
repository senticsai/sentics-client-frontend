import { DoubleSide, Shape } from 'three'
import React from 'react'
import Entities from './entities'
import { getSize } from '../../helpers/getSize'
import * as THREE from "three";

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

function Map({ entities }: { entities: EntitiesPayload }) {
  const shape = new Shape(mapPoints.map(([x, y]) => new THREE.Vector2(x, y)))


  const extrudeSettings = {
    curveSegments: 1,
    steps: 1,
    depth: 0.5,
    bevelEnabled: false
  }

  const [x, y] = getSize(mapPoints)

  return (
    <>
      <mesh rotation={[ 0, Math.PI / 2, 0]}>
        <mesh rotation={[ Math.PI / 2, 0, 0]} position={[-(x / 2), 0,-(y/2)]}>
          <extrudeBufferGeometry attach='geometry' args={[shape, extrudeSettings]} />
          <meshStandardMaterial side={DoubleSide} />
        </mesh>
        <Entities entities={entities} />
      </mesh>
    </>
  )
}

export default Map
