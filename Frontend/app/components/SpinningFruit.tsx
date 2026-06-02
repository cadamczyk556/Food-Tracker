"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const fruitFiles = [
    "/apple.glb",
    "/banana.glb",
    "/grape.glb"
];




const FruitRandomiser = () => {
    const meshRef = useRef<any>(null);

    const randomPath = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * fruitFiles.length);
        return fruitFiles[randomIndex];

    }, []);



    const { scene } = useGLTF(randomPath);

    // Rotate the fruit continuously    todo: check if roatating on x and y axis is good
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta;
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <primitive
            ref={meshRef}
            object={scene}
            scale={2}
            position={[0, -1, 0]}
        
        />
    );


};



export default function SpinningFruit() {
    return (
        <Canvas>

            <ambientLight intensity={0.5}/>
            <directionalLight position={[2, 2, 2]} intensity={2}/>
            <Suspense fallback={null}>
                 <FruitRandomiser/>
            </Suspense>
           

        </Canvas>



    );
}


fruitFiles.forEach((path) => useGLTF.preload(path));