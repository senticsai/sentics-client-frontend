import React, {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {Bounds, PresentationControls, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {Button} from "@mui/material";
import Map from './map';


export const MapComponent = ({positions}: { positions: EntitiesPayload }) => {
  const [dimension, setDimension] = React.useState<'2d' | '3d'>("2d");

  function switchPerspective() {
    setDimension(dimension === '2d' ? '3d' : '2d');
  }


  return (
    <>
      <Canvas flat camera={{zoom: 4, position: [10, 150, 0], rotation: [-Math.PI / 2, 0, Math.PI / 2]}}>
      <PerspectiveCamera position={[0,0,0]}>
          <Suspense fallback={null}>
            <Bounds clip>
              <Map perspective={dimension} entities={positions}/>
            </Bounds>
          </Suspense>
          <ambientLight/>
        <OrbitControls enabled={dimension === '3d'} makeDefault={true}/>
      </PerspectiveCamera>
      </Canvas>
      <Button variant="outlined" onClick={switchPerspective}
              className="!absolute bottom-16 right-16 bg-black z-10">{dimension}</Button>
    </>
  )
}
