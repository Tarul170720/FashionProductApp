import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion } from 'framer-motion';
// ---------- T-Shirt Model ----------
const TshirtModeFront = () => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/models/Tshirtfront.glb");

  // useFrame((state, delta) => {
  //   ref.current.rotation.y += delta * 0.5;
  // });

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={[4, 4, 4]}
      position={[0, -2, 0]}
      rotation={[0, Math.PI/4, 0]}
    />
  );
};
const TshirtModeBack = () => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/models/Tshirtback.glb");

  // useFrame((state, delta) => {
  //   ref.current.rotation.y += delta * 0.5;
  // });

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={[4, 4, 4]}
      position={[0, -2, 0]}
      rotation={[0, -Math.PI/2, 0]}
    />
  );
};
const TshirtModel = () => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, "/models/Tshirt.glb");

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5;
  });

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={[5, 5, 5]}
      position={[1.5,-1, 0]}
    />
  );
};
// ---------- Top + Skirt Model ----------
const TopFront = () => {
  const ref = useRef();
  const gltf = useLoader(
    GLTFLoader,
    "/models/topfront.glb"  // ★ FIXED: Use the correct model path
  );



  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={[4, 4, 4]}
      position={[0, -5, 0]}
      rotation={[0, Math.PI/4, 0]}
    />
  );
};
const TopBack = () => {
  const ref = useRef();
  const gltf = useLoader(
    GLTFLoader,
    "/models/topback.glb"  // ★ FIXED: Use the correct model path
  );



  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={[4, 4, 4]}
      position={[0, -5, 0]}
      rotation={[0, -Math.PI/2, 0]}
    />
  );
};
const Top = () => {
  const ref = useRef();
  const gltf = useLoader(
    GLTFLoader,
    "/models/top.glb"  // ★ FIXED: Use the correct model path
  );
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5;
  });


  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={[5, 5, 5]}
      position={[1.5, -4.8, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
};
export default function HelloPageCanvas() {
  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        justifyContent: "center",
       alignItems: "center",
       flexDirection: "column",
      
      }}
    >
     
      <motion.div
      initial={{ opacity: 0, y: -20 }} // Initial state: invisible and slightly down
      animate={{ opacity: 1, y: 0 }} // Animate to: visible and at original position
      transition={{ duration: 5.5 }} // Animation duration
      style={{
        display: "flex",
     //  border:"2px solid black",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        
      }}>
        
      {/* LEFT Canvas */}
      <div style={{
        display: "flex",
       //border:"2px solid black",
        justifyContent: "center",
        flexDirection: "column",
        
      }}>
        
      <Canvas
        style={{
          height: "400px",
          width: "400px",
         margin:"0px",
          overflow: "hidden",
        }}
        camera={{ position: [1.5, 1, 6], fov: 42, rotation: [0, 0, 0] }}
      >
        

        <directionalLight intensity={1.2} position={[3, 3, 3]} />
        <ambientLight intensity={0.5} />

        <TshirtModel />
      </Canvas>
      </div>
      
      <div style={{
        display: "flex",
       //border:"2px solid black",
        justifyContent: "justify",
        flexDirection: "column",
        alignItems: "justify",
        gap:"70px",
      }}>
        <div style={{
        display: "flex",
       border:"1px solid white",
        justifyContent: "start",
        flexDirection: "column",
        alignItems: "center",
         margin:"0px"
      }}>
        
     <Canvas
        style={{
          height: "100px",
          width: "100px",
          
          overflow: "hidden",
        }}
        camera={{ position: [8, 1, 6], fov: 20 }}
      >
        <Stars
          radius={150}
          depth={80}
          count={5000}
          factor={3}
          saturation={0}
          fade
        />

        <directionalLight intensity={1.2} position={[3, 3, 3]} />
        <ambientLight intensity={0.5} />

        <TshirtModeFront />
      </Canvas>
      <h5 style={{color:"white"}}>Front</h5>
      </div>
      <div style={{
        display: "flex",
       border:"1px solid white",
        justifyContent: "end",
        flexDirection: "column",
        alignItems: "center",
        margin:"0px"
      }}>
      <Canvas
        style={{
          height: "100px",
          width: "100px",
          
          overflow: "hidden",
        }}
        camera={{ position: [8, 1, 6], fov: 20}}
      >


        <directionalLight intensity={1.2} position={[3, 3, 3]} />
        <ambientLight intensity={0.5} />

        <TshirtModeBack />
      </Canvas>
      <h5 style={{color:"white"}}>Back</h5>
      </div>
      </div>
      </motion.div>
      {/* RIGHT Canvas */}
            <motion.div
      initial={{ opacity: 0, y: 20 }} // Initial state: invisible and slightly down
      animate={{ opacity: 1, y: 0 }} // Animate to: visible and at original position
      transition={{ duration: 5.5 }} // Animation duration
       style={{
        display: "flex",
    //   border:"2px solid black",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        
      }}>
        
      {/* LEFT Canvas */}
      <div style={{
        display: "flex",
      // border:"2px solid black",
        justifyContent: "center",
        flexDirection: "column",
        
      }}>
        
      <Canvas
        style={{
          height: "400px",
          width: "400px",
         margin:"0px",
          overflow: "hidden",
        }}
        camera={{ position: [1.5, 1, 6], fov: 42, rotation: [0, 0, 0] }}
      >


        <directionalLight intensity={1.2} position={[3, 3, 3]} />
        <ambientLight intensity={0.5} />

        <Top />
      </Canvas>
      </div>
      
      <div style={{
        display: "flex",
      // border:"2px solid black",
        justifyContent: "justify",
        flexDirection: "column",
        alignItems: "justify",
        gap:"70px",
      }}>
        <div style={{
        display: "flex",
       border:"1px solid white",
        justifyContent: "start",
        flexDirection: "column",
        alignItems: "center",
         margin:"0px"
      }}>
        
     <Canvas
        style={{
          height: "100px",
          width: "100px",
          
          overflow: "hidden",
        }}
        camera={{ position: [8, 1, 6], fov: 20 }}
      >


        <directionalLight intensity={1.2} position={[3, 3, 3]} />
        <ambientLight intensity={0.5} />

        <TopFront />
      </Canvas>
      <h5 style={{color:"white"}}>Front</h5>
      </div>
      <div style={{
        display: "flex",
       border:"1px solid white",
        justifyContent: "end",
        flexDirection: "column",
        alignItems: "center",
        margin:"0px"
      }}>
      <Canvas
        style={{
          height: "100px",
          width: "100px",
          
          overflow: "hidden",
        }}
        camera={{ position: [8, 1, 6], fov: 20}}
      >
      

        <directionalLight intensity={1.2} position={[3, 3, 3]} />
        <ambientLight intensity={0.5} />

        <TopBack />
      </Canvas>
      <h5 style={{color:"white"}}>Back</h5>
      </div>
      </div>
      </motion.div>

    </div>
  );
}