import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Ground } from './Ground';
import { Car } from './Car';
import { Rings } from './Rings';
import { Boxes } from './Boxes';
import './App.css';
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer } from '@react-three/postprocessing';
import {BlendFunction} from "postprocessing"

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>
      <color args={[0, 0, 0]} attach='background' />
      <CubeCamera resolution={512} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>
      <Rings />
      <Boxes/>
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
       <Ground />
        <EffectComposer>
          <DepthOfField focusDistance={0.0035} focalLength={0.05} bokehScale={3} height={480}/>
          <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3}
          width={400}
          height={400}
          kernelSize={5}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.025}
          />
          <ChromaticAberration 
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
          />
        </EffectComposer>
      {/* <mesh>
      <boxGeometry args={[1,1,1]}/>
      <meshLambertMaterial color={'red'} />
    </mesh> */}
    </>
  );
}
function App() {
  return (
    <Suspense >
      <Canvas shadows linear gl={{antialias: true}}>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
