import Slider from '@mui/material/Slider'
import React, { Suspense, useLayoutEffect, useRef } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AnalyticsContext from '@components/analytics/detailed'
import { Canvas } from '@react-three/fiber'
import { Bounds, OrbitControls, OrthographicCamera, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Vector3 } from 'three'

export default function SpaghettiMap({ heatMapPoint }: { heatMapPoint: any }) {
  return (
    <div className='mt-4'>
      <Typography variant='h6'>Spaghetti Map</Typography>
      <p>Visualization of the walkways</p>

      <AnalyticsContext.Consumer>
        {({ spaghetti }) => (
          <div>
            {spaghetti.show && (
              <>
                <div className='flex items-center mt-4'>
                  <Slider
                    className='!w-60 !mr-6'
                    value={spaghetti.lineWidth}
                    onChange={(event: any) => {
                      const value = event.target.value as number
                      spaghetti.setLineWidth(value)
                    }}
                  />

                  <TextField
                    type='number'
                    label='Line Width'
                    variant='outlined'
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    value={spaghetti.lineWidth}
                    onChange={(event: any) => {
                      const value = event.target.value as number
                      spaghetti.setLineWidth(value)
                    }}
                  ></TextField>
                </div>
                <Canvas style={{ height: 500 }}>
                  <Suspense fallback={null}>
                    <OrthographicCamera position={[0, 0, 1]} zoom={800} makeDefault />
                    <OrbitControls enableRotate={false} />
                    <Bounds clip>
                      <SpaghettiRender heatMapPoint={heatMapPoint} />
                    </Bounds>
                  </Suspense>
                  <ambientLight />
                </Canvas>
              </>
            )}
            <Button onClick={() => spaghetti.setShow(!spaghetti.show)} className='!mt-4' variant='outlined'>
              Show
            </Button>
          </div>
        )}
      </AnalyticsContext.Consumer>
    </div>
  )
}

const SpaghettiRender = ({ heatMapPoint }: { heatMapPoint: any }) => {
  const mapTexture = useTexture('/images/map.png')

  return (
    <>
      <mesh>
        <planeGeometry args={[1, 0.333]} />
        <meshStandardMaterial map={mapTexture} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.5, 0, 0.1]}>
        {heatMapPoint.map((point, index) => {
          if (heatMapPoint[index + 1] === undefined) return <></>
          const nextPoint = heatMapPoint[index + 1]

          return (
            <Line
              key={index}
              start={new Vector3(point[0] / 100, point[1] / 100, 0)}
              end={new Vector3(nextPoint[0] / 100, nextPoint[1] / 100, 0)}
            />
          )
        })}
      </mesh>
    </>
  )
}

function Line({ start, end }) {
  const ref = useRef<any>()
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map(point => new THREE.Vector3(...point)))
  }, [start, end])

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color='red' />
    </line>
  )
}
