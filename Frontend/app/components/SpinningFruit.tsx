"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const fruitFiles = [
    "/apple.glb",
    "/banana.glb",
    "/grape.glb",
    "/cabbage.glb",
];




const FruitRandomiser = () => {
    const meshRef = useRef<any>(null);

    const randomPath = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * fruitFiles.length);
        return fruitFiles[randomIndex];

    }, []);



    const { scene } = useGLTF(randomPath);

    const autoScale = useMemo(() => {
        const box = new THREE.Box3().setFromObject(scene);
        const size = new THREE.Vector3();
        box.getSize(size);

        const maxDimension = Math.max(size.x, size.y, size.z);
        const targetSize = 3.0;
        return targetSize / maxDimension;
    }, [scene]);

    useFrame((state, delta) => {
        if (meshRef.current) {
           // meshRef.current.rotation.x += delta;
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <group ref={meshRef} position={[0, 0, 0]}>
            <Center>
                <primitive
                    ref={meshRef}
                    object={scene}
                    scale={autoScale}
                    position={[0, 0, 0]}
                
                />
            </Center>
        </group>
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