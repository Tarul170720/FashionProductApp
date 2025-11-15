import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion } from 'framer-motion';
function StarCanvas() {
  return (
    <div>
      <Canvas
        style={{
          height: "200px",
          width: "200px",
          margin: "0px",
          overflow: "hidden",
        }}
        camera={{ position: [0, 0, 1], fov: 60 }}
      >
        <Stars
          radius={50}
          depth={20}
          count={3000}
          factor={2}
          saturation={0}
          fade={false}
        />

        <ambientLight intensity={0.2} />
        <directionalLight intensity={0.5} position={[5, 5, 5]} />
      </Canvas>
    </div>
  );
}

export default StarCanvas;
