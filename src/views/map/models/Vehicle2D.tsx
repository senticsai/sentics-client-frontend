import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function Vehicle2D({ rotation }: { rotation: [number, number, number] }) {
  const vehicle2d = useTexture('/models/vehicle2d.png')

  return (
    <mesh rotation={rotation}>
      <boxGeometry args={[2, 2, 0.01]} />
      <meshStandardMaterial color='red' map={vehicle2d} transparent side={THREE.DoubleSide} />
    </mesh>
  )
}

export default Vehicle2D
