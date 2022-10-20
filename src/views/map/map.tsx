import React, {Suspense, useEffect} from 'react'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
import {DoubleSide, Shape} from 'three'
import {Bounds, PresentationControls} from "@react-three/drei";
import {Button} from "@mui/material";
import Entities from "./entities";

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
];

function Map({entities, dimension}: { entities: EntitiesPayload, dimension: '2d' | '3d' }) {
  const shape = new Shape();
  const {camera} = useThree();
  const middlePoint = getMiddlePoint(mapPoints);


  useEffect(() => {
    if (dimension === '2d') {
      camera.position.set(0, 150, 0);
      camera.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
      camera.zoom = 4;

    }

    if (dimension === '3d') {
      camera.position.set(0, 0, 150);
      camera.rotation.set(0, 0, 0);
      camera.zoom = 4;
      camera.lookAt(0, 0, 0);

    }
  }, [dimension])

  mapPoints.reverse();

  mapPoints.forEach((point, index) => {
    if (index === 0) {
      shape.moveTo(point[0], point[1]);
    } else {
      shape.lineTo(point[0], point[1]);
    }
  });

  const extrudeSettings = {
    curveSegments: 1,
    steps: 1,
    depth: .5,
    bevelEnabled: false
  }

  const [x, y] = getSize(mapPoints);

  return (
    <>
      <mesh position={[-x/2, 0, -y/2]}>
        <mesh rotation={[Math.PI / 2, 0, 0,]}>
          <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings]}/>
          <meshStandardMaterial side={DoubleSide}/>
        </mesh>
        <Entities entities={entities}/>
      </mesh>
    </>
  )
}

function getSize(points) {
  const x = points.map(point => point[0]);
  const y = points.map(point => point[1]);

  return [Math.max(...x) - Math.min(...x), Math.max(...y) - Math.min(...y)];
}

function getMiddlePoint(points) {
  const x = points.map(point => point[0]);
  const y = points.map(point => point[1]);

  return [(Math.max(...x) + Math.min(...x)) / 2, (Math.max(...y) + Math.min(...y)) / 2];
}

export const MapComponent = ({positions}: { positions: EntitiesPayload }) => {
  const [dimension, setDimension] = React.useState<'2d' | '3d'>("2d");

  function switchDimensions() {
    setDimension(dimension === '2d' ? '3d' : '2d');
  }

  const middlePoint = getMiddlePoint(mapPoints);


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
