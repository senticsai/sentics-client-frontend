import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei'
import { Button } from '@mui/material'
import Map from './map'

export const MapComponent = ({ positions }: { positions: EntitiesPayload }) => {
  const [dimension, setDimension] = React.useState<'2d' | '3d'>('2d')

  function switchPerspective() {
    setDimension(dimension === '2d' ? '3d' : '2d')
  }

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          {dimension === '3d' ? (
            <PerspectiveCamera zoom={2} position={[0, 150, 0]} makeDefault />
          ) : (
            <OrthographicCamera zoom={10} position={[0, 10, 0]} makeDefault />
          )}
          <OrbitControls maxPolarAngle={dimension === '2d' ? 0 : undefined} />
          <Bounds clip>
            <Map perspective={dimension} entities={positions} />
          </Bounds>
        </Suspense>
        <ambientLight />
      </Canvas>
      <Button variant='outlined' onClick={switchPerspective} className='!absolute bottom-16 right-16 bg-black z-10'>
        {dimension}
      </Button>
    </>
  )
}
