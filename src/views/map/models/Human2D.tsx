import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function Human2D({ rotation }: { rotation: [number, number, number] }) {
  const human2d = useTexture('/models/human2d.png')

  return (
    <mesh rotation={rotation}>
      <boxGeometry args={[2, 2, 0.1]} />
      <meshStandardMaterial color='green' map={human2d} transparent side={THREE.DoubleSide} />
    </mesh>
  )
}

export default Human2D
