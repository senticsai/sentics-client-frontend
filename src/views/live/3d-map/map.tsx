import React from 'react'
import {Canvas} from '@react-three/fiber'
import {DoubleSide, Shape} from 'three'
import {PresentationControls} from "@react-three/drei";

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

function Map({positions}: { positions: PositionPayload }) {
  const shape = new Shape();

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

  return (
    <>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings]}/>
          <meshStandardMaterial side={DoubleSide}/>
        </mesh>
        <Positions positions={positions}/>
    </>
  )
}

function getMiddlePoint(points) {
  let x = 0;
  let y = 0;
  points.forEach((point) => {
    x += point[0];
    y += point[1];
  })

  return [x / points.length, y / points.length];
}

function Positions({positions}: { positions: PositionPayload }) {
  const positionsArray: NewPosition[] = [];

  for (const kind in positions) {

    for (const id in positions[kind]) {
      const position = positions[kind][id];
      positionsArray.push({
        kind,
        id,
        x: position.x,
        y: position.y,
        heading: position.heading,
        t: position.t
      });
    }
  }

  return <>
    {positionsArray.map((position) => {
      return <mesh position={[position.x, 0, position.y]} key={position.kind + position.id}>
        <boxGeometry attach="geometry" args={[1, 1, 1]}/>
        <meshStandardMaterial color={position.kind === 'vehicle' ? 'red' : 'blue'}/>
      </mesh>
    })}
  </>
}

export const MapComponent = ({positions}: { positions: PositionPayload }) => {
  return (
    <Canvas camera={
      {zoom: 4, position: [15, 150, 40], rotation: [-Math.PI / 2, 0, Math.PI / 2]}
    }>
      <PresentationControls />
      <Map positions={positions}/>
      <ambientLight/>
    </Canvas>
  )
}
