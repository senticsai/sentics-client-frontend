import {DoubleSide, Shape} from "three";
import {useThree} from "@react-three/fiber";
import React, {useEffect} from "react";
import Entities from "./entities";
import {getSize} from "../../helpers/getSize";


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
];

function Map({entities, perspective}: { entities: EntitiesPayload, perspective: '2d' | '3d' }) {
  const shape = new Shape();
  const {camera} = useThree();


  // TODO import max 2.5mb model
  // const gltf = useLoader(GLTFLoader, '../models/map.gltf')

  useEffect(() => {
    if (perspective === '2d') {
      camera.position.set(0, 150, 0);
      camera.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
      camera.zoom = 4;

    }

    if (perspective === '3d') {
      camera.position.set(0, 0, 150);
      camera.rotation.set(0, 0, 0);
      camera.zoom = 4;
      camera.lookAt(0, 0, 0);

    }
  }, [perspective])

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
      {/*{perspective === '2d' ? (*/}
        <mesh position={[-x / 2, 0, -y / 2]}>
          <mesh rotation={[Math.PI / 2, 0, 0,]}>
            <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings]}/>
            <meshStandardMaterial side={DoubleSide}/>
          </mesh>
          <Entities entities={entities}/>

        </mesh>
      {/*) : (*/}
      {/*  <mesh>*/}
      {/*    <primitive position={[-x / 2, 0, 0]} object={gltf.scene}/>*/}
      {/*    <mesh position={[-x / 2, 0, -y / 2]} >*/}
      {/*      <Entities entities={entities}/>*/}
      {/*    </mesh>*/}
      {/*  </mesh>*/}
      {/*)*/}
      {/*}*/}
    </>
  )
}

export default Map;
