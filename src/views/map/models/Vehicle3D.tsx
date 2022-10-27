import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Forklift_main_0: THREE.Mesh
    Forklift_Console_0: THREE.Mesh
    Forklift_Seat_2_0: THREE.Mesh
    Forklift_Seat_0: THREE.Mesh
    Forklift_SteeringWheel_0: THREE.Mesh
    Forklift_Poles_0: THREE.Mesh
    Forklift_ForkliftRoof_0: THREE.Mesh
    Forklift_Forklift_1_0: THREE.Mesh
    Forklift_Forklift_2_0: THREE.Mesh
    Forklift_Forklift_3_0: THREE.Mesh
    Forklift_Wheels_0: THREE.Mesh
    Forklift_WheelRim_0: THREE.Mesh
    Forklift_Grid_0: THREE.Mesh
    Forklift_Handle_0: THREE.Mesh
    Forklift_Seatrest_0: THREE.Mesh
  }
  materials: {
    main: THREE.MeshStandardMaterial
    Console: THREE.MeshStandardMaterial
    Seat_2: THREE.MeshStandardMaterial
    Seat: THREE.MeshStandardMaterial
    SteeringWheel: THREE.MeshStandardMaterial
    Poles: THREE.MeshStandardMaterial
    ForkliftRoof: THREE.MeshStandardMaterial
    Forklift_1: THREE.MeshStandardMaterial
    Forklift_2: THREE.MeshStandardMaterial
    Forklift_3: THREE.MeshStandardMaterial
    Wheels: THREE.MeshStandardMaterial
    WheelRim: THREE.MeshStandardMaterial
    Grid: THREE.MeshStandardMaterial
    Handle: THREE.MeshStandardMaterial
    Seatrest: THREE.MeshStandardMaterial
  }
}

export default function Vehicle3D(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/forklift.glb') as unknown as GLTFResult

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.Forklift_main_0.geometry} material={materials.main} />
            <mesh geometry={nodes.Forklift_Console_0.geometry} material={materials.Console} />
            <mesh geometry={nodes.Forklift_Seat_2_0.geometry} material={materials.Seat_2} />
            <mesh geometry={nodes.Forklift_Seat_0.geometry} material={materials.Seat} />
            <mesh geometry={nodes.Forklift_SteeringWheel_0.geometry} material={materials.SteeringWheel} />
            <mesh geometry={nodes.Forklift_Poles_0.geometry} material={materials.Poles} />
            <mesh geometry={nodes.Forklift_ForkliftRoof_0.geometry} material={materials.ForkliftRoof} />
            <mesh geometry={nodes.Forklift_Forklift_1_0.geometry} material={materials.Forklift_1} />
            <mesh geometry={nodes.Forklift_Forklift_2_0.geometry} material={materials.Forklift_2} />
            <mesh geometry={nodes.Forklift_Forklift_3_0.geometry} material={materials.Forklift_3} />
            <mesh geometry={nodes.Forklift_Wheels_0.geometry} material={materials.Wheels} />
            <mesh geometry={nodes.Forklift_WheelRim_0.geometry} material={materials.WheelRim} />
            <mesh geometry={nodes.Forklift_Grid_0.geometry} material={materials.Grid} />
            <mesh geometry={nodes.Forklift_Handle_0.geometry} material={materials.Handle} />
            <mesh geometry={nodes.Forklift_Seatrest_0.geometry} material={materials.Seatrest} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/forklift.glb')
