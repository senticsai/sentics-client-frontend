import React, { Suspense } from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import { Bounds, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Button } from '@mui/material'
import Map from './map'

export const MapComponent = ({ positions }: { positions: EntitiesPayload }) => {
  const [perspective, setPerspective] = React.useState<'2d' | '3d'>('2d')
  const [rotation, setRotation] = React.useState(1)
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
            <Map entities={positions} perspective={perspective} rotation={rotation} />
          </Bounds>
        </Suspense>
        <ambientLight />
      </Canvas>
      <section className='!absolute bottom-0 right-4 z-10'>
        <div className="flex flex-row gap-4">
          <Button variant='outlined' onClick={switchPerspective}>
            {perspective}
          </Button>
          <Button variant='outlined' onClick={() => {setRotation(rotation + 1)}}>
            Rotate
          </Button>
        </div>
      </section>
    </>
  )
}
