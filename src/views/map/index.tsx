import React, {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {Bounds, PresentationControls} from "@react-three/drei";
import {Button} from "@mui/material";
import Map from './map';


export const MapComponent = ({positions}: { positions: EntitiesPayload }) => {
  const [dimension, setDimension] = React.useState<'2d' | '3d'>("2d");

  function switchDimensions() {
    setDimension(dimension === '2d' ? '3d' : '2d');
  }


  return (
    <>
      <Canvas flat camera={{zoom: 4, position: [0, 150, 0], rotation: [-Math.PI / 2, 0, Math.PI / 2]}}>
        <PresentationControls enabled={dimension === '3d'} global zoom={2}>
          <Suspense fallback={null}>
            <Bounds clip>
              <Map dimension={dimension} entities={positions}/>
            </Bounds>
          </Suspense>
          <ambientLight/>
        </PresentationControls>

      </Canvas>
      <Button variant="outlined" onClick={switchDimensions}
              className="!absolute bottom-16 right-16 bg-black z-10">{dimension}</Button>
    </>
  )
}
