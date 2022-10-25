import {DoubleSide, Shape} from 'three'
import React, {useEffect} from 'react'
import Entities from './entities'
import {getSize} from '../../helpers/getSize'
import * as THREE from 'three'
import {useFrame} from '@react-three/fiber'
import {degToRad} from 'three/src/math/MathUtils'

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

function Map({entities, perspective}: { entities: EntitiesPayload; perspective: '2d' | '3d' }) {
  const shape = new Shape(mapPoints.map(([x, y]) => new THREE.Vector2(x, y)))
  const [animationState, setAnimationState] = React.useState(0)
  const [currentAnimation, setCurrentAnimation] = React.useState('idle')

  useFrame(({camera}) => {
    if (animationState > 1) return;

    if (currentAnimation === '2d') {
      camera.position.lerp(new THREE.Vector3(0, 100, 0), 0.1)
      camera.lookAt(new THREE.Vector3(0, 0, -degToRad(0.01)))
      setAnimationState(animationState + 0.005)
    } else if (currentAnimation === '3d') {
      camera.position.lerp(new THREE.Vector3(0, 100, 100), 0.15)
      camera.lookAt(new THREE.Vector3(0, 0, -degToRad(0.01)))
      setAnimationState(animationState + 0.05)
    }

  })

  useEffect(() => {
    setAnimationState(0)
    setCurrentAnimation(perspective)
  }, [perspective])

  const extrudeSettings = {
    curveSegments: 1,
    steps: 1,
    depth: 0.5,
    bevelEnabled: false
  }

  const [x, y] = getSize(mapPoints)

  return (
    <>
      {/*<mesh>*/}
      {/*  <sphereGeometry args={[1, 32, 32]} />*/}
      {/*  <meshStandardMaterial color='green' />*/}
      {/*</mesh>*/}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[-(x / 2), 0, -(y / 2)]}>
          <extrudeBufferGeometry attach='geometry' args={[shape, extrudeSettings]}/>
          <meshStandardMaterial side={DoubleSide}/>
          <Entities entities={entities}/>
        </mesh>
      </mesh>
    </>
  )
}

export default Map
