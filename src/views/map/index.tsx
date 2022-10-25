import React, { Suspense } from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import { Bounds, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Button } from '@mui/material'
import Map from './map'

export const MapComponent = ({ positions }: { positions: EntitiesPayload }) => {
  const [perspective, setPerspective] = React.useState<'2d' | '3d'>('2d')
  const perspectiveCamera = React.useRef<any>(null)

  function switchPerspective() {
    if (perspective === '2d') {
      return setPerspective('3d')
    }
    setPerspective('2d')
  }

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera ref={perspectiveCamera} position={[0, 0, 0]} zoom={1} makeDefault />
          <OrbitControls enabled={perspective === '3d'} />
          <Bounds clip>
            <Map entities={positions} perspective={perspective} />
          </Bounds>
        </Suspense>
        <ambientLight />
      </Canvas>
      <Button variant='outlined' onClick={switchPerspective} className='!absolute bottom-16 right-16 bg-black z-10'>
        {perspective}
      </Button>
    </>
  )
}
