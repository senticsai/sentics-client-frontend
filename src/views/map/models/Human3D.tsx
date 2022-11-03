/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: reissigaa (https://sketchfab.com/reissigaa)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/low-poly-guy-with-bones-with-animation-walking-b78d92daa91f4e54ac7e5f8ea6ae49e4
title: Low Poly Guy With Bones with Animation (Walking)
*/

import * as THREE from 'three'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { Group } from 'three'

type GLTFResult = GLTF & {
  nodes: {
    Object_14: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    ['Scene_-_Root']: THREE.MeshStandardMaterial
  }
}

type ActionName = 'Armature|ArmatureAction'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Human3D(props: JSX.IntrinsicElements['group']) {
  const group = useRef<Group>() as MutableRefObject<Group>
  const { nodes, materials, animations } = useGLTF('/models/human3d.glb') as unknown as GLTFResult
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    materials['Scene_-_Root'].color = new THREE.Color(0xff0000)
    actions['Armature|ArmatureAction']?.play()
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Sketchfab_Scene'>
        <group name='Sketchfab_model' rotation={[-Math.PI / 2, 0, 0]}>
          <group name='ba4fa6c45e8145ff9a36d192816748eafbx' rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name='Object_2'>
              <group name='RootNode'>
                <group name='Light' position={[407.62, 590.39, -100.55]} rotation={[1.89, 0.88, -2.05]} scale={100}>
                  <group name='Object_5' rotation={[Math.PI / 2, 0, 0]}>
                    <group name='Object_6' />
                  </group>
                </group>
                <group name='Camera' position={[0, 264.45, 1783.58]} rotation={[0, 1.57, 0]} scale={100}>
                  <group name='Object_8' />
                </group>
                <group name='Cube' position={[0, 104.41, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={22.42} />
                <group name='Armature' rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name='Object_11'>
                    <primitive object={nodes._rootJoint} />
                    <group name='Object_13' position={[0, 104.41, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={22.42} />
                    <skinnedMesh
                      name='Object_14'
                      geometry={nodes.Object_14.geometry}
                      material={materials['Scene_-_Root']}
                      skeleton={nodes.Object_14.skeleton}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/human3d.glb')
