import React, { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bounds, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Button } from '@mui/material'
import Map from './map'
import FlipVertical from 'mdi-material-ui/FlipVertical'
import FlipHorizontal from 'mdi-material-ui/FlipHorizontal'

export const MapComponent = ({ positions }: { positions: EntitiesPayload }) => {
  const [perspective, setPerspective] = React.useState<'2d' | '3d'>('2d')
  const [flip, setFlip] = React.useState({ x: 1, y: 1, z: 1 })
  const [rotation, setRotation] = React.useState(1)
  const perspectiveCamera = React.useRef<any>(null);


  function switchPerspective() {
    if (perspective === '2d') {
      return setPerspective('3d')
    }
    setPerspective('2d')
  }

  function handleFlip(side: string) {
    if (side === 'x')
      setFlip({ ...flip, x: -flip.x })
    else if (side === 'y')
      // unsafe
      setFlip({ ...flip, y: -flip.y })
    else if (side === 'z')
      setFlip({ ...flip, z: -flip.z })
  }

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera ref={perspectiveCamera} position={[0, 0, 0]} zoom={1} makeDefault />
          <OrbitControls enabled={perspective === '3d'} />
          <Bounds clip>
            <Map entities={positions} flip={flip} perspective={perspective} rotation={rotation} />
          </Bounds>
        </Suspense>
        <ambientLight />
      </Canvas>
      <section className='!absolute bottom-0 right-4 z-10'>
        <div className="flex flex-row gap-4">
          <Button variant='outlined' onClick={switchPerspective}>
            {perspective}
          </Button>
          <Button variant='outlined' onClick={() => { handleFlip('x') }}>
            <FlipVertical />
          </Button>
          <Button variant='outlined' onClick={() => { handleFlip('z') }}>
            <FlipHorizontal />
          </Button>
          <Button variant='outlined' onClick={() => { setRotation(rotation + 1) }}>
            Rotate
          </Button>
        </div>
      </section>
    </>
  )
}
