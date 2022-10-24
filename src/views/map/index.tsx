import React, {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {Bounds, OrbitControls, PerspectiveCamera} from '@react-three/drei'
import {Button} from '@mui/material'
import Map from './map'
import THREE, {Vector3} from "three";
import * as TWEEN from "@tweenjs/tween.js";
import animate from "./animate";

export const MapComponent = ({positions}: { positions: EntitiesPayload }) => {
  const [perspective, setPerspective] = React.useState<'2d' | '3d'>('2d')
  const perspectiveCamera = React.useRef<any>(null)

  function switchPerspective() {
    const camera: THREE.PerspectiveCamera = perspectiveCamera.current

    /**
     * we don't need to animate if it's going from 2d to 3d.
     * in the future we will animate it to a fixed position/rotation.
     */
    if (perspective === '2d') {
      return setPerspective('3d')
    }

    setPerspective('2d')

    // *** WITHOUT ANIMATION
    camera.position.set(0, 100, 0)
    camera.lookAt(new Vector3(0, 0, 0))

    /**
     * NOTE: if you use this sometimes scene disappears
     * camera.rotation.set(0, 0, 0)
     */

    // TODO achieve the same effect with animation.
    // *** WITH ANIMATION

    // const position = {x: camera.position.x, y: camera.position.y, z: camera.position.z};
    // const positionTween = new TWEEN.Tween(position)
    //   .to({x: 0, y: 100, z: 0})
    //   .easing(TWEEN.Easing.Linear.None)
    //   .onUpdate(() => {
    //     camera.position.set(position.x, position.y, position.z)
    //     }
    //   );
    // positionTween.start();


  }

  animate((time) => {
    TWEEN.update(time);
  });

  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera ref={perspectiveCamera} position={[0, 100, 0]} zoom={1} makeDefault/>
          <OrbitControls enabled={perspective === '3d'} makeDefault/>
          <Bounds clip>
            <Map entities={positions}/>
          </Bounds>
        </Suspense>
        <ambientLight/>
      </Canvas>
      <Button variant='outlined' onClick={switchPerspective} className='!absolute bottom-16 right-16 bg-black z-10'>
        {perspective}
      </Button>
    </>
  )
}
